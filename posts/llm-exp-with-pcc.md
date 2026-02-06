---
title: "Some anecdotal experience with using Claude Code"

description: "The output has been rather middling so far"

date: "2026-02-04"

draft: true

tags: []
---

Recently as a result of seeing an uptick in praise for productivity benefits of using LLMs for software development I thought it'd be worthwhile to start doing some experiments with Claude Code both to see how worthwhile LLM driven development is and to build some skill in using it if I found the result to be positive.

Note: After writing this I've realized it's more user story than it is commentary. 
If you aren't interested in that then feel free to skip this post.

## TLDR

At time of writing I've found the quality of its output to be middling at best but it does get code that works* out faster than I can.
Still doing some experimentation with giving it documentation-esque markdown files and trying harder to manage context, we'll see if things improve.

## What project was this for?

This experimentation has been on a project which isn't mature but also isn't created specifically for this.
Namely I've recently been working on a language which is C by function calls are backwards (e.g. `("Hello world!")puts;`). Before bringing in Claude Code all I had was some hand made parser combinator utilities (for strings only) and a tokenizer for everything but literals.

## A good start

So what I had Claude do first was fill in the blank for those literals.
After that I wanted to have property based tests using [RapidCheck](https://github.com/emil-e/rapidcheck) run via `ctest` so I had Claude set that up.

And all the output up to here was good, barring cases where I was ambiguous and edge cases I would've missed as well regarding how certain streams of tokens when turned into a string will be a different set of tokens (e.g. `if` keyword before an integer literal becoming an identifier or a greater than operator combining with an asignment operator to become greater than or equal to).

## Worsening of output

Claude's helpfulness in that debugging was not great, due to bugs being in both the code generating streams of tokens and in the parsing code it fully failed to fix everything although its efforts were a decent starting point for me to fix the remaining problems myself.

Once all that got fixed though work began on getting an AST from the token stream.
I could've started working through this myself until it was just fill in the blank for Claude again but instead I had Claude generate all the AST parsing code itself.
This did not go well, namely Claude just decided to do it's own thing with the API which might have been due to me not specifying well enough (it's been a few days I forget) but even when I did specify things were such a mess that I decided it would be best to just delete all its work and start over.

Ultimately things might've worked out but I suspect it would've been a headache to work with.

## Attempt 2

That first attempt did give me a sense of what the overall structure would probably end up looking like though.
So rather than having Claude do everything in one shot this time I had Claude only generate code for building expression ASTs, leaving statements and declarations for later.

This resulted in output which wasn't ideal but it was good enough that I could work with it after having some tweaks made.

Then I had Claude come up with ideas for testing, leading to it making unit tests which is not what I'd like (property based tests would've been preferred) but is again workable and can be redone later.

However the particulars of how I went about having these tests made led to so many tests that it was a meaningful slowdown to build times.

## Reworking test infrastructure

So in order to fix this I had Claude refactor the CMakeLists.txt for the tests so some common utilities would get put into a static lib (avoiding repetitive compilation) and making a taxonomy of tests such that tests weren't an all or nothing afair anymore.

This actually went well, other than costing more tokens than it should've due to Claude doing all the CMakeLists.txt files itself rather than writing a python script to generate them.

I will say that I'm not 100% sure if this taxonomy is reasonable or it's naming convention is consistently applied.

## TODO write things as they happen rather than retroactively
