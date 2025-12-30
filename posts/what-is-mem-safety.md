---
title: "What is memory safety?"

description: "Trying to answer this question and reaching a bad definition before getting bored and moving on"

date: "2025-12-30"

draft: false

tags: []
---

This post was written off the cuff and I'm putting even less than the minimal effort I put in revision normally so apologies if there's even more typos and the like than usual.

## Initial idea

So I was reading [a blog post](https://matklad.github.io/2025/12/30/memory-safety-is.html) and got as far as.

> Memory safety is a property of an implementation.

Before deciding I wanted to take a crack at thinking of my own definition before I continued reading.

Something is memory safe iff

1) Nonsensical pointers are never dereferenced (null counting as nonsensical for this point)
2) Memory Leaks only occur when they're intended

The points where this gets icky are around what it means for a pointer for be nonsensical aside from being null and what it means for a memory leak to be intended.

For pointers this is not trivial because of [pointer](https://www.ralfj.de/blog/2018/07/24/pointers-and-bytes.html) [providence](https://www.ralfj.de/blog/2020/12/14/provenance.html) alongside certain language memory layout invariants (such as alignment and type) causing not every memory address which points to some currently allocated memory to be sensical.

Memory leaks meanwhile can be intended when for example you have some global value(s) and/or buffers that are intended to stick around for the remainder of the program's runtime.

## Update after reading the rest of the blog post

I forgot about double free dammit.
Also it seems that null isn't always nonsensical.

I'm sure if I carefully thought about my definition while rereading the post I'd find more holes in it but I'm already bored of thinking about this so I'm going to leave this be for now.
