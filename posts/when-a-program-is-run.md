---
title: "When a program is run"

description: "but nobody observes it does it have side effects?"

date: "2025-05-14"

draft: true

tags: [how things work]
---

I don't know how much of what I know would be considered "interesting" or "enlightening" but in terms of what happens when a program stars on Linux I at least have some knowledge that a beginner wouldn't have.

So yeah if this article is boring or confusing apologies for that.

Also there's a lot of asterisks which I'm not going to elaborate on, just know that when there's an asterisk that means something is a bit of a half truth.

## What runs a program?

There are a couple of plausible sounding answers to this question.

1. Another program
2. The operating system

Both answers of course beg more questions, namely "what runs the first program?" and "what does that even mean?" respectively.

Both answers relate to something called the kernel.

## What's the kernel?

The (Linux) kernel is some\* of the code which allows for "normal" programs to not worry about various hard problems.
Hard problems including

- interfacing with the hardware
- storing data in a filesystem
- and virtualization/concurrency aka the subject of this post

To answer our 2 questions then, the kernel starts the first\* program and is realistically the only\* part of the operating system which can be differentiated from a normal program.

## Running a program

Lets say a program wants to run a program then.
There are a couple of ways for a program to do this depending on semantics.

### `exec` syscall

First off a program can just replace itself with a different program with the `exec` syscall.
This isn't very useful most of the time but there are some cases where this behavior is desirable, suid/sgid programs like `sudo` and `doas` and if I remember correctly [s6](https://skarnet.org/software/s6/) makes use of it when it's setup as the first program the system runs but I don't remember specifics.

In any case most of the time when a program runs another program it has other stuff it wants to do afterwards.

### `fork` syscall and then `exec` syscall

This is generally the model taught in operating systems classes where a process makes a duplicate of itself and then the duplicate morphs into the different program.
For real world usage though this isn't what's generally done.

### `clone` syscall

Instead the `clone` syscall is used for effieciency reasons alongside having more options for configuring the process that's spawned.
`clone` is also used for creating threads because for the kernel threads are just weird looking processes.

## Stepping through an example


