---
title: ""

description: ""

date: "20xx-xx-xx"

draft: true

tags: []
---

So... LLMs... where to start.
Well, first things first this post is intended to focus on my opinions and experiences regarding whether/how agents are useful for software development.

It is **NOT**

- A post about the ethics of using LLMs
- A post about other use cases for LLMs
- A post about other generative models e.g. image, audio and video generation.

This experience was via Claude Code, using Sonnet, over the past few months or so.

## Experience 1: Working on a compiler

Specifically this compiler was intended to be a C compiler where function declarations and calls were postfix e.g. `("Hello World!")puts;` written in C++.
Notably I'd already done some amount of work on a tokenizer and I'd built up setting up some parser combinator utilities.

It did alright at first as I gave it some small tasks such as handling tokenization of literals, refactoring those parser combinators to generalize better and helping with writing some tests.

But then its output started to be low but acceptable quality with e.g. unneeded variables.

From there I unfortunately don't remember more but the rate at which it started doing unproductive actions went up at least by my perception (checking things that don't need checking and things like that).

Ultimately I lost interest in the project which I won't blame on the LLM, this isn't the first project I've lost interest in without completing after all.

## Experience 2: Working on an agent orchestrator

This I'd consider a more interesting experience for a few reasons.

1. The idea for this project was born out of a speculative opinion of how working with multiple agents will work.
2. I started doing spec driven development as an intentional thing with multiple agents I swapped between
3. I started bringing in more stuff that can point to a problem with the quality of the code/tests.

## Idea of this project

This project stewed in my head for some weeks before I started on it (TODO: find LLM chat where I asked about claude agents/gastown) namely when I went and read the when use section of Anthropic's Agent Teams docs the list of cases read 

1. Research and review: multiple teammates can investigate different aspects of a problem simultaneously, then share and challenge each other’s findings
2. New modules or features: teammates can each own a separate piece without stepping on each other
3. Debugging with competing hypotheses: teammates test different theories in parallel and converge on the answer faster
4. Cross-layer coordination: changes that span frontend, backend, and tests, each owned by a different teammate

and thought "so almost every use case involves splitting agents into isolated environments or the work being otherwise trivially parallel".

Which didn't lead to anything at the time but when combined with me seeing the workflow Dylan was being taught in his streams, more on that in the next section, I felt the thoughts collect into something interesting enough to actually try to implement.

### Okay Pagwin you wanted to waffle, what's the idea

:P the idea is that many workflows that involve multiple agents will follow a directed acyclic graph (DAG) similar to how build systems operate except not at all like build systems due to LLMs being non-deterministic by default.

The reason this would be preferred over doing that kind of workflow manually or via LLM agent is due to both of those being comparatively brittle and prone to error albeit different kinds of error in addition to this being rather tedious.

With this tool you specify a TOML workflow once and it'll handle it and where possible spawn multiple agents at once to do work splitting into separate environments via whatever methodology you setup and then you get a TUI to manage things.

## Spec driven development

Spec driven development is a methodology of using a Coding agent where you go through steps of gathering requirements/writing out a specification as markdown files before having the agent to write out the code.
The way I heard of it is via some streams that Dylan Beattie has done recently of him getting into Claude Code.

Spec driven development has definitely made it easier to get a sense of what the model is going to do.
Additionally it has led to things getting broken up into steps which are useful for a few reasons.
That said I suspect I still have some skills to build up around managing context in order to really get the model to do what I want.

## More automation around code quality

In addition to spec driven development I also started pushing hard to make use of some tooling to give the LLM signals on what needs work.

First off I pushed the LLM to do TDD, previously while I was testing it was testing after implementing which didn't cause any big issues before but did cause some annoying small issues.

Secondly after writing out the tests and implementation I decided to run `cargo mutants` to make sure the tests fully covered the implementation which led to the code being refactored for better dependency injection and testing.

Lastly I made use of clippy for code linting and `lizard` to find spots in the code where cyclonic complexity was high.
Linting was obviously done to catch code smells and the like but you may be wondering "What the heck is cyclonic complexity?".
In short cyclonic complexity is a way to turn the amount of code complexity in some portion of code into a number, which we can work to reduce.
The details of how that number is calculated aren't worth going into in this post but do make intuitive sense.

Overall I'd say that using all this tooling was very helpful in terms of preventing the project from slowly sliding into a state of being garbage.
I suspect if I went through carefully I'd still consider it slop but it is workable slop.

## Misc commentary on this project

### Current workflow shortfalls

The workflow I've been using for this project has some areas where I'd say it falls short.
Namely

1) My understanding of the code is very low which could be fine if one of a few sets of criteria around tooling were met but they aren't so this is definitely a problem
2) To the extent that I read and understand the code I find the quality to still be rather low, meaning I either need to find additional tooling beyond lints and cyclonic complexity or I need to change the workflow such that the LLM brings me into the loop more around various patterns/choices.

I'm not sure what parts of those two gaps are a matter of personal skill issue vs outright gaps in tooling.

### Another way this project isn't a build system

Build systems don't allow for Cycles (because why would you want that) but this project does where a cycle is a special kind of node in the DAG with inner nodes having exactly 1 edge leading in and 1 edge leading out such that the nodes form 1 cycle.
Cycles can be useful in cases where the LLM agent is in some kind of feedback loop with some tool and or agent

### It's written in Rust btw

Which isn't very relevant beyond Rust having a sensible setup for interfaces and sum types but I didn't mention it before so...

## Conclusion

At the moment I feel like I'm missing some things to make this workflow work but also that it fundamentally has a limit.
Namely a limit on how big/complex a project can get before this workflow stops working.
The addition of spec/requirements documents alongside a bunch of automated tooling seems like it pushes that out a bit but it doesn't push it out to the same extent that a human working on the project does.

It very much feels like Claude Code is trying too hard to do absolutely everything on its own rather than ask the user for more input or otherwise involve them but I may be holding it wrong.
Regardless if that got fixed I'd feel less aprehensive about suggesting people use it.
It wouldn't be no apprehension due to it defaulting to bad patterns and reinforcing existing patterns but it would be less.
