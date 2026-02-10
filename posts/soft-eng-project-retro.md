---
title: "Retrospective on my software engineering class"

description: "Writing about how I felt my software engineering class went"

date: "2025-07-15"

draft: false

tags: []
---

I've written about this through [my weekly updates](/posts/soft_eng_class_weekly_notes/) previously but I didn't write down important information so I'm writing this to consolidate things.

In short I got an A in the class (somehow) but I failed at my objective(s).

## Objective(s)

My objective starting off with this project was to remake [BinghamtonBetterBus](https://git.pagwin.xyz/Pagwin/BinghamtonBetterBus) with better routing and UI with the assistance of a competent friend (same friend who I was [arguing with about enums](/posts/rust_enums)).

## Outcome

The ultimate result was something with slightly better routing and a slightly better UI.
Technically this would meet the aforementioned requirement(s) if not for the fact that the original BinghamonBetterBus was made in a 24 hour hackathon by just me while this was done by me + competent friend over the course of over 2 months.
Even compensating for the school work load, i.e. hackathon took place in February when I was in my third year of college and this was from March to May in my fourth year, this is an abysmal showing.

## What Went Wrong

Two things:

1) I suck at motivating myself and this class was too lax to compensate for that
2) I underestimated how much I would need to take charge to get this done to the desired degree

The second point originated from expecting the competent friend to be an equal in the project but not factoring in how busy they were though I did take more charge of things over time.

To expand on the first point though, this class had us set our own weekly objectives to complete and I consistently set the objectives lower than needed to get things done to a satisfactory degree due to a combo of [Hofstadter's law](https://en.wikipedia.org/wiki/Hofstadter%27s_law) and being lazy.
Even with those objectives I always procrastinated and ended up needing to use LLMs to complete some work on time as a result.

This situation was not helped by me getting sick on the last week but thankfully the friend bailed us out.

## Lessons learned

1) If I care about the success of something and nobody has taken charge of that thing within a timely manner, oftentimes this means within a week, then I need to take charge
2) Barring circumstances where it isn't possible to do so a MVP of a project should be completed as the first unit of work, in this case that would've been a week. Afterwards units of work should be visible features.
3) Any problem which is not fixed will remain a problem. In this case a team member having low remote responsiveness will not magically change so it'd have been better to start scheduling in person meetings sooner.

## What now

So now that the semester is over what will happen?

This work is probably going to be abandoned due to me needing to focus on other things.
If I come back to this project though I'm probably going to rewrite again due to probably doing it solo, allowing different technology choices for front and backend, tech debt caused by compromises which were made to accomodate development being done over Windows and Linux rather than just on Linux and disliking some of the current solutions to problems.

Note to self: never check generated files into the build system, the disk/network cost(s) of git are not the reason they're just salt in the wound.
The actual reason is because generated files by nature of being generated are annoying to change so it'd be better to check the generator script in and have generating them as part of either process startup or a build step to put the friction where it causes the least damage.
