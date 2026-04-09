# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "bibtexparser>=1.4",
# ]
# ///
"""
Sync publications.bib → src/content/publications/{key}.json
                      → src/content/authors/{slug}.json

Run from repo root: uv run scripts/sync_publications.py

Each publication file is only written if its content has changed (or it doesn't
exist yet), so git diffs reflect actual changes and unchanged entries are left
untouched.

Author files are always regenerated from the full publication set, but extra
fields you add manually (e.g. "bio", "homepage") are preserved via merge.
"""

import json
import re
import sys
import unicodedata
from pathlib import Path

import bibtexparser
from bibtexparser.bparser import BibTexParser
from bibtexparser.customization import convert_to_unicode, author as split_authors

# ---------------------------------------------------------------------------
# Paths (relative to repo root)
# ---------------------------------------------------------------------------
ROOT = Path(__file__).parent.parent
BIB_FILE = ROOT / "publications.bib"
PUB_DIR = ROOT / "src" / "content" / "publications"
AUTH_DIR = ROOT / "src" / "content" / "authors"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(name: str) -> str:
    """'Andrés Goens' → 'andres-goens'"""
    nfd = unicodedata.normalize("NFD", name)
    ascii_name = "".join(c for c in nfd if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", "-", ascii_name.lower()).strip("-")


def venue_from_key(key: str) -> str:
    """'rossel_popl26' → "POPL'26"  (falls back to the raw key)"""
    parts = key.split("_")
    if len(parts) >= 2:
        m = re.match(r"^([a-zA-Z]+)(\d{2})$", parts[-1])
        if m:
            return f"{m.group(1).upper()}'{m.group(2)}"
    return key


def clean_braces(text: str) -> str:
    """Remove leftover LaTeX curly braces and normalize whitespace."""
    text = re.sub(r"[{}]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def parse_author_list(raw_authors: str) -> list[dict]:
    """
    Parse a 'First Last and First Last' author string into a list of
    {"name": "First Last", "slug": "first-last"} dicts.
    bibtexparser's split_authors customization returns 'Last, First' format;
    we convert back to 'First Last'.
    """
    # split_authors expects a record dict; simulate one
    record = {"author": raw_authors}
    split_authors(record)
    result = []
    for entry in record["author"]:
        entry = clean_braces(entry)
        if "," in entry:
            last, first = entry.split(",", 1)
            name = f"{first.strip()} {last.strip()}"
        else:
            name = entry.strip()
        if name:
            result.append({"name": name, "slug": slugify(name)})
    return result


def entry_to_pub(entry: dict) -> dict:
    """Convert a bibtexparser entry dict to our publication JSON schema."""
    key = entry["ID"]
    raw_authors = entry.get("author", "")
    authors = parse_author_list(raw_authors) if raw_authors else []

    return {
        "key": key,
        "title": clean_braces(entry.get("title", "")),
        "authors": authors,
        "abstract": clean_braces(entry.get("abstract", "")),
        "doi": entry.get("doi", ""),
        "url": entry.get("url", ""),
        "year": int(entry.get("year", 0)),
        "venue": venue_from_key(key),
        "type": entry.get("ENTRYTYPE", "misc"),
    }


def write_if_changed(path: Path, data: dict) -> str:
    """
    Serialise data as JSON and write to path only if content differs.
    Returns 'created', 'updated', or 'unchanged'.
    """
    content = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if path.exists():
        existing = path.read_text(encoding="utf-8")
        if existing == content:
            return "unchanged"
        path.write_text(content, encoding="utf-8")
        return "updated"
    path.write_text(content, encoding="utf-8")
    return "created"


def merge_author(path: Path, new_data: dict) -> str:
    """
    Write author JSON, preserving any extra fields already in the file
    (e.g. bio, homepage added manually).
    Returns 'created', 'updated', or 'unchanged'.
    """
    if path.exists():
        existing = json.loads(path.read_text(encoding="utf-8"))
        # Preserve extra keys, but always overwrite name + papers
        merged = {**existing, **new_data}
        return write_if_changed(path, merged)
    return write_if_changed(path, new_data)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    if not BIB_FILE.exists():
        sys.exit(f"Error: {BIB_FILE} not found. Run from the repo root.")

    PUB_DIR.mkdir(parents=True, exist_ok=True)
    AUTH_DIR.mkdir(parents=True, exist_ok=True)

    # Parse BibTeX with Unicode conversion
    parser = BibTexParser(common_strings=True)
    parser.customization = convert_to_unicode
    with BIB_FILE.open(encoding="utf-8") as fh:
        db = bibtexparser.load(fh, parser=parser)

    counts = {"created": 0, "updated": 0, "unchanged": 0}
    author_papers: dict[str, dict] = {}  # slug → {name, papers: [key, ...]}

    for entry in db.entries:
        pub = entry_to_pub(entry)
        path = PUB_DIR / f"{pub['key']}.json"
        status = write_if_changed(path, pub)
        counts[status] += 1
        if status != "unchanged":
            print(f"  [{status}] {pub['key']}")

        # Accumulate author → papers mapping
        for a in pub["authors"]:
            slug = a["slug"]
            if slug not in author_papers:
                author_papers[slug] = {"slug": slug, "name": a["name"], "papers": []}
            author_papers[slug]["papers"].append(pub["key"])

    print(
        f"\nPublications: {counts['created']} created, "
        f"{counts['updated']} updated, {counts['unchanged']} unchanged."
    )

    # Write author files
    auth_counts = {"created": 0, "updated": 0, "unchanged": 0}
    for slug, data in sorted(author_papers.items()):
        path = AUTH_DIR / f"{slug}.json"
        status = merge_author(path, data)
        auth_counts[status] += 1

    print(
        f"Authors:      {auth_counts['created']} created, "
        f"{auth_counts['updated']} updated, {auth_counts['unchanged']} unchanged."
    )


if __name__ == "__main__":
    main()
