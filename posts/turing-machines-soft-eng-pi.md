---
title: "Computers Are Turing Machines Is to Software Engineering as π = 3 Is to Various Other Engineering Disciplines"

description: "Your computer is just an extremely complex regex"

date: "2025-09-10"

draft: true

tags: []
---

I've already commented on this in [micro blogs 2](/posts/micro_blogs_2/) but I want to give it it's own post so I have a convenient place to refer to it and so I can expand on the idea a bit.

## Why Computers Aren't Turing Machines

Simply put computers aren't Turing Machines because they only have a finite amount of memory.

Turing Machines are universal computing machines specifically because they have infinite memory and the ability to access any part of that memory at any time, the access to any part distinguishing them from pushdown automata.

## Why a Computer Isn't a Linear Bounded Automaton

Barring the initial assessment of computers as Turing Machines it can be tempting to model them as Linear Bounded Automaton.

This is closer to reality due to the fact that when deciding what resources should be given to a computer completing a task we'll have a decent sense of the input we should expect and can pre-allocate resources accordingly.
However if the computer being used is fixed this model is also incorrect as the memory available will not expand to correspond to the input given like it does with a Linear Bounded Automaton.

## Computers Are Finite State Machines

Albeit Finite State Machines which can provide output beyond simply halting successfully or failing and without halting.

RAM might appear to be a Turing Machine tape but really it's current state is just a node in our computer's Finite State Machine graph (combined with other stuff like registers, instruction pointer, etc).

## Computers as Turing Machines Is a Useful Simplification

Thinking about computers as things which read and write to a tape is much more useful than thinking of them as a big graph which you traverse based on some input.

It's also useful as a method of convincing people that you shouldn't allocate resources towards solving certain problems.
Namely problems where the objective is knowing something non-trivial about the program ahead of time, e.g. how long it'll take to execute or whether it'll run forever.

There are reasons questions like that either can't be answered ahead of time or that answering them would not be worth the resources expended but saying something about the halting problem is generally easier than calculating and describing the specific resource complexity of the problem and/or required engineering efforts.

For example it is possible to determine if an arbitrary Python program wil halt, use more than some particular finite amount of memory or loop forever.
You just need to use an obnoxiously large amount of storage to store the registers, RAM, among other things used by the Python process each time the program advances.
You'd split the program when advancing in a non-deterministic manner for cases such as threads or random numbers with the side effects of each split being isolated from all the others.
Then at each step for each program split you'd see if you're revisiting a prior state that you saved and if so stop running that split, declaring it as a loop.
Splits which halt or reach the memory limit would also be stopped, once all splits stop you'd have a complete description of everything that Python program does for that input within the amount of memory specified.

Would this be useful in real world scenarios?
A very small number of them sure but most of the time you're better off just writing your program with the knowledge that it may or may not halt or might take an incredibly long time.

So who cares that it's technically possible if it isn't practically useful, ergo might as well say you can't because undecidability.
