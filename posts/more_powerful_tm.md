---
title: "Something more powerful than a Turing Machine"

description: "Writing about a useless idea that I had."

date: "2025-02-01"

draft: true

tags: []
---

## Disclaimers

This blog post assumes you have a decent understanding of automata including.

- Knowing what, Finite state machines, Pushdown Automata and Turing Machines are
- Knowing about their relations with languages (the computer kind not the spoken kind)

That said this is not rigorous so there might be something fundamentally wrong.

## What is Power?

Traditionally when we talk about computation what we're talking about is the set of languages a given class of automata can recognize.
For example finite state machines can recognize regular languages.

This framing is all well and good but what if we want to make something that can do things a Turing Machine can't?
Well we could add a [magic machine](https://en.wikipedia.org/wiki/Oracle_machine) but that's kinda unsatisfying at least in a visceral sense.
Instead lets try something dumb and just chuck seemingly unrelated math into the mix.

How about cardinality?

## A Different Definition of Power

Our new definition of power is simple.
The power is just the cardinality of the set of states the machine can be in.
This definition has the issue of having pushdown automata and turing machines have the same power.
But I haven't figured out a more rigorous definition that makes a distinction between them yet.

That said this does have the interesting effect that finite state machines aren't a singular group anymore.
Every natural number now has it's own set of finite state machines at some level of power.

So with the idea of cardinality as a measure of power in my head I tried to think about what it'd mean for a machine to have a set of states corresponding to the real numbers.

## Failed candidate: Quantum Computers

An initial thought I had was.

"Well what about quantum computers? Quantum mechanics seem to be a sort of kludge to force a continuum into a discrete world so maybe that can be used."

This hope died at some point though when I realized that quantum physics are probably just going to add non-determinism to our computers rather than access to the real numbers.
Barring multiverse theory being true and us being able to step out of our universe to look at all the outcomes.

## The Current Candidate

After some thought I figured something out.
Namely that in order to construct something with a set of states corresponding to the real numbers that I needed it to read and write to infinitely many digits within a finite number of steps.
I don't know what my reasoning for that leap was but good job past brain.
With that thought I decided to work backwards with the question of "how can I make a machine that touches infinitely many digits".

## Touching Infinitely Many Digits

The logic to achive this roughly went as follows.

"Okay so I need to have some methodology where I have a computation performed on each digit which can read as many of the other digits as necessary. Hmmmm... Turing Machine? Turing machine."

Which left me with the question of how do touch all the digits with a single turing machine within a reasonable computation?

How about by just having infinitely many turing machines?
We can differentiate them by just starting them at different points on the tape.
So it was.

## A few specifics

For our purposes we're going to require that the turing machine you use as the building block of this machine needs to provably halt.
With that we can define 1 step of this machine being running every turing machine on the tape until it halts.
All machines will be run on copies of the tape until they halt so they can't interfere with each other.

If all the turing machine instances halted with a success the overall machine matches with a success.
If all the turing machines halt with a fail the overall machine halts with a fail.
If some machines halt success and others halt fail the machine will update the tape where each cell now has the value it's turing machine halted on in the prior step and then perform a new step with the new tape.

## Proving an increase in power

Okay so now we have a new machine but how do we know it can actually do more than a turing machine?
I mean adding normal non-determinism to a turing machine doesn't make somthing more powerful so how is this different?

Okay so we need to prove it's more powerful, we can do that by having it do something a turing machine can't.

## Intermediary steps

Before we get to that I want to build up some intermediary steps.

1. You can use a turing machine which only works with 1 side of the infinite tape as the underlying machine
2. You can use a turing machine which uses 2 tapes as the underlying machine

I mostly do this because without it solving the halting problem (spoiler) would be a pain in the ass.

### 1 sided tape machine

This one is the easier of the two that I'm proving.

Just make it so before doing anything the machine does a scan left and right going back and forth over and over to find the input.
If the input is on the right then we're on it's left side, at which point we can write a symbol we use just for specifying that and halt with a fail.
If the input is on the left then we write a different special symbol which when we abstract into a one sided tape we treat as an empty space.
If we start on the input then depending on which symbol we start on we write a different new symbol which when we abstract we treat as the original symbol.

With that the behavior of machines starting on the input and to the right are almost defined.
But what about those machines to the left of the input?
Well for them we need to modify our other machines so when they halt with a success that's intended to actually cause a full success halt they write a new symbol for that.
Then we can just have our machines on the left scan to the right until they either hit that or some input that they have no idea what to do with.
With the unknown input we can just have them halt with success or fail, it doesn't matter which, the other machines handle that.

### Two tape machine

This logic can probably be generalized for any natural number of tapes but I'm lazy so I'll leave that as an exercise for the reader.

Fundamentally the logic is the same as the one sided tape it's just that rather than having one side of the tape do annoying things we're doing annoying things with odd/even parity.

The construction should be similar to how you can do this with normal turing machines and if explained things not terribly in the previous section that should be enough, now that I'm writing this I don't want to formally write it out.

## Solving the halting problem (for turing machines)

Alright finally we can solve the halting problem with our new machine.

Our underlying turing machine will be a machine with two one sided tapes.

