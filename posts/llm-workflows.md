---
title: "Static LLM workflow automation seems underdiscussed"

description: "In terms of the discourse I read or am aware of I'm not aware of much discussion around static LLM workflows and how to do them well."

date: "2026-09-19"

draft: false

tags: []
---

I don't know what things the two other people who read this blog are reading about LLMs.
But in terms of the things that I'm reading about LLMs I feel like there's a lack of discussion about static LLM workflows.

Note: I'm not going to discuss where and how LLMs are/aren't useful because I don't know and you don't either but a lot of *potential* use cases I see have the shape of static LLM workflows.

## What is a static LLM workflow and why should I care?

When I say static LLM workflow I mean that you have a well defined set of automated steps to achieve an outcome some of which make use of LLMs either directly or via some "agentic" setup.

For example maybe I have a setup where I have an LLM interview me about a change I'd like to make to some software project.
Then once I and the LLM are satisfied (air quotes for the LLM) that things are reasonably well specified that transcript can get passed to an LLM agent which writes out test cases in the repo for test driven development of functionality.
Then after tests are written an agent implements things either checking things itself or being set up in a static loop with a script which runs the tests or LLM agent that verifies that everything looks good.

Of course you could do all that by asking an LLM to spawn subagents for all that.
But... why?
You know what's supposed to happen ahead of time.
Furthermore you can use that knowledge to do things like properly sandbox all the LLM agents, minimize the need to tediously manage context at the top level, and give everything reasonable error handling.

## So why have I not seen anything about people doing this?

That's not a rhetorical question I actually want to know why nobody is talking about this. 
I've seen multiple cases where this would be useful but every time people kept manually doing all the interaction with the LLM without any obvious reason for why it hasn't been partially automated.

It's not that the agent harnesses got better, or that user interaction is still needed because those aren't mutually exclusive with this.

You can still be interviewed by an LLM regarding intentions and have it get a summary of what exists via a subagent.

The LLM which is writing tests can dispatch a subagent for each test.

More generally the agent harnesses can still do all their agent harness things.
It's just that the LLMs and harnesses get asked to do less while the same outcome is achieved more reliably and with less (if any) redundant user input (e.g. saying "continue" to the LLM after it completes a step).

At least, that's what I'd naively expect.
Unfortunately without having seen any other discussion on the matter I could be missing something obvious.

Part of why I wrote this, is that I recently learned that tooling for this exists already.
I just hadn't heard of the tooling until I stumbled upon it by accident via reading an unrelated blog post which mentioned Apache Airflow. 
Which caused me to ask about using LLMs in Airflow which led me to the existing static workflow tooling.
