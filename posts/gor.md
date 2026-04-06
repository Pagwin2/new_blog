---
title: "(I)Gor and experimenting with LLM agents"

description: ""

date: "2026-04-30"

draft: true

tags: []
---

I've tried to write this a couple of times but it's been rather tricky to figure out exactly what I want to express.
That said I did have a good sense of what I don't want to express in this post on my first attempt to write this so let's start with that.

This post is **NOT**

- A post about the ethics of using LLMs
- A post about other use cases for LLMs
- A post about other generative models e.g. image, audio and video generation.

I am intending to focus on my experience with using Claude Code, an Agentic LLM tool specifically my experience using it on a greenfield project to make a new Agentic tool which is currently called Gor but I might rename it to Igor.

## What caused me to make Gor

Gor is not the first project I used Claude code with.
Before I was experimenting with using it for a C compiler with postfix syntax for function calls and I found that experience rather unsatisfying.
Then [Dylan Beattie](https://dylanbeattie.net/), of many fun software development talks fame and also a [Rockstar](https://codewithrockstar.com/) developer, started doing livestreams of him experimenting with Claude Code with some guidance from [Rendle](https://rendle.dev/).
That guidance generally focused on having Dylan implement something called specification driven development.

In that methodology there's a somewhat static sensible flow through which changes are made of Requirements -> Specification -> Implementation -> QA -> Implementation...
Which in later live streams they delegate to Claude Code but I began this before then and having the workflow be that fluid seems liable to have issues.

Aside from that there was another line of thought that led to me working on this project.

### Agent teams, Gastown and concurrency in LLM agents

Rewinding the clock to some months before working on this project I was reading up on Anthropic's (new at the time) Agent teams because I was wondering what the pitch was around the utility.

Ultimately I came to the conclusion that 90+% of the utility they were pitching came from simply letting the LLM engage in a fork-join model.

![example fork join model](/static/images/fan-out.svg)

### Putting those ideas toegether

That fork join model initially reminded me of [MapReduce](https://pdos.csail.mit.edu/6.824/papers/mapreduce.pdf) however when combined with my understanding of specification driven development workflows I realized there was a much cleaner model. 
Namely a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)(DAG) similar to the kind of DAG a [build system](https://www.microsoft.com/en-us/research/publication/build-systems-la-carte/) sets up to do some amount of work in parallel.
A relatively simple example would be this workflow for the aforementioned specification driven workflow which is just a line (in theory).

![simple example workflow that's just a line](/static/images/DAG-soft-dev-workflow.svg)

## Actually implementing it with Claude Code

So with that pre-amble out of the way how was the experience of making Gor using Claude Code?
Well... to summarize I'd say that so far it has done things faster but often even with specification driven deelopment the LLM has made rather silly decisions about logic and implementation.
Also I've learned that I should trust my architectural instincts more.

### First steps

This is the first project I've done with a specification driven development based workflow, albeit not the first thing I've done with Claude code.
So following after what Rendle had Dylan do in those livestreams I had Claude make some system prompts for Gathering requirements, Writing a specification, and implementing.
However I split implementation into function stubs and actual implementation in some vague hope to make things more reviewable which didn't really work out.
I also decided to forgo openspec in favor of my own setup which may have been a mistake.

I then went through and using each system prompt chatted with the LLM to make requirements.
I initially used the wrong system prompt but the impact of that seems like it'd get drowned out by other factors.
After being satisfied with the markdown file I got I then moved over to the specification writer prompt and had that write a specification having another conversation for that.
Then stubs and tests with the third prompt.
Then implementation with the last prompt.

With that I had a program... that was missing a bunch of functionality that I didn't specify, like being able to pass in API keys through methods other than env vars, oops.

Yeah, this workflow suffers from the LLM not pinging the user for feedback/info enough.
Even when things are heavily specified ahead of time it just can't be enough due to unknown unknowns for the LLM and unknown unknowns for the user.

### Realization: more automated tooling = better

At this point I started using cargo mutants which in all likelyhood took the testing from a state of lmao to a state of mediocrity giving me a reason to tell the LLM "hey we should architect things like this for testing" without requiring me to read literally everything.

I've also brought in Clippy and Lizard (cyclometric complexity measuring tool) for additional improvements.

That said this tooling is still woefully inadequate in terms of maintaining code qualityon their own, more on that later.

## Reading the code and refactoring with Claude Code

Anecdotally after starting on the writing that became this post I started refactoring the code and... unfortunately I'm running into many cases where the LLM made a bad decision based on insuffiecient information or incompetence. For example it defaulted to running the nodes of the graph in a fully synchronous manner (for loop of await in Rust 😬), using strings in places where strings shouldn't go as well and it used `Arc` in places where multiple threads never cropped up.

Ultimately that refactor was made easier with an LLM but for better and worse it was only necessary because the code was written by an LLM.


----------------

So, LLM Agents have recently gotten popular in some parts of software development.

To be more specific, Claude Code to autonymously act and write code has gotten popular.
As such to see how that workflow is myself

Anecdotally after writing a draft of this post I went back to my code to refactor things and it has been... interesting.
Namely Claude has a tendency to take the easy way out to the detriment of correctness/performance.
Notable examples of it messing this up include, making `Rc`s into `Arc`s for no reason and making Path objects into Strings when there's a trait for pathlike objects that it should be generic over when I was refactoring something to `no_std`.
Overall its ability to refactor seems bad with the only caveat that its ability to rewrite is reasonably good.



-------

https://github.com/graydon/dac-wasm
https://en.wikipedia.org/wiki/Differential_testing

--------------------------------------------
So... LLMs... where to start.
Well, first things first this post is intended to focus on my opinions and experiences regarding whether/how agents are useful for software development.

It is **NOT**

- A post about the ethics of using LLMs
- A post about other use cases for LLMs
- A post about other generative models e.g. image, audio and video generation.

This experience was via Claude Code, using Sonnet, over the past few months or so.

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
