---
title: "Two Papers Accepted at ASPLOS'27"
date: 2026-09-21
---

Two new papers from our group have been accepted at ASPLOS'27! 

In [Beyond the Fence: Sound Compilation for GPU and Heterogeneous CPU+GPU Systems](/publications/sprokholt_asplos27) we consider the problem of separate compilation to CPU+GPU systems in the context of weak shared-memory concurrency. While there are theoretical issues with the current compilation to NVIDIA GPUs and ARM+NVIDIA heterogeneous systems, we don't see these in practice. In the paper we explain how we propose to fix these.

In [Formalizing the User-Kernel Shared-Memory Boundary: The C/LKMM Compound Model](/publications/kapoor_asplos27) we also consider heterogeneous shared memory, this time at the software/operating system level. Since Linux has its own memory model distinct from C, userspace code communicating with kernel code (e.g. via eBPF) does not have well-defined memory semantics. We address this by proposing a compound C+Linux Kernel memory model.

Both papers are international collaborations, with researchers at the University of Utah, TU Delft, TU Munich, UC Santa Cruz, the University of St. Andrews and Google.
