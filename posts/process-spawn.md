---
title: "What executing an executable means"

description: ""

date: "2025-02-02"

draft: true

tags: []
---

So from various places for various reasons I've learned a bit about how process spawning on Linux works.
So I thought I'd write it all down to clarify what I know and maybe do some research in the process.

## Scope

This post is focused on what happens when a process wants to make another process.
It will not cover how shells parse out commands, how init systems work etc.

## Choose Your Syscall(s)

![Two wolves meme with Fork/Exec and Clone](/static/images/two-ways-of-spawning-processes.jpg)

When it comes to spawning a child process on Linux there are two general ways of doing it.

- call `fork` and then call `exec` in the child process
- call `clone`

Generally speaking you want to use `clone` due to `clone` being more flexible and allowing you to use fewer syscalls to achieve what you want.
