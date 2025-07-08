---
title: "Retrospective on my software engineering class"

description: "Writing about how I felt my software engineering class went"

date: "2025-07-05"

draft: true

tags: []
---

I've written about this through [my weekly updates](/posts/soft_eng_class_weekly_notes/) previously but I didn't write down important information so I'm writing this to consolidate things.

In short I got an A in the class (somehow) but I failed at my objective(s).

## Objective(s)

My objective starting off with this project was to remake [BinghamonBetterBus](https://git.pagwin.xyz/Pagwin/BinghamonBetterBus) (yes that's a typo, no I'm not fixing it in the repo name lol) with better routing an UI with the assistance of a competent friend (same friend who I was [arguing with about enums](/posts/rust_enums)).

## Outcome

The ultimate result was something with slightly better routing and a slightly better UI.
Technically this would meet the aforementioned requirement(s) if not for the fact that the original BinghamonBetterBus was made in a 24 hour hackathon by just me while this was done by me + competent friend over the course of over 2 months.
Even compensating for the school work load, i.e. hackathon took place in February when I was in my third year of college and this was From March to May in my fourth year, this is an abysmal showing.

## What went wrong

Two things

1) I suck at motivating myself and this class was too lax to compensate for that
2) I underestimated how much I would need to take charge to get this done to the desired degree

The second point originated from expecting the competent friend to be an equal in the project but not factoring in how busy they were though I did take more charge of things over time.

To expand on the first point though, this class had us set our own weekly objectives to complete and I consistently set the objectives lower than needed to get things done to a satisfactory degree due to a combo of [Hofstadter's law](https://en.wikipedia.org/wiki/Hofstadter%27s_law) and being lazy.
Even with those objectives I always procrastinated and I may have needed to use LLMs to do some work as a result.

This situation was not helped by me getting sick on the last week but thankfully the friend bailed us out.

## Tour of the code

[Link to directory with code](https://github.com/bucs445spring2025/portfolio-team4/tree/main/src)

In short the code is a mess.

### `src/client/*`

I don't understand anything here, I didn't write anything here and had little involvement in it's creation so I don't have any comments on it.

### `src/data/azure_function_timer/*`

This is code I wrote when I naively intended to do so much more with this project.

Specifically it's most of the work needed to poll the university buses data from a live map's API.

I was planning on gathering the data to do some machine learning to predict bus arrival times, this never ended up happening.

### `src/reverse-proxy/*`

Here lives the files for a caddy docker container which reverse proxies

### `src/server/*`

Here lives all the files for our API backend which... put simply I didn't work on this fast enough resulting in this code doing nothing useful to the end project.

#### `src/server/data/*` and `src/server/usable_gtfs/*`

Here lives static source data from the university bus system and the local county's bus system and my various attempts to deal with them.

GTFS is a file format google specified to allow transit angencies to describe how their transit systems work in a computer readable way.
If your local municipality has a transit system and you want to work with it via a computer program check to see if they just publish GTFS data for free with a quick search.

#### `src/server/stops/*` and `src/server/trips/*`

This... is bad.
My idea with these files is that they'd just be something I generate once from the aforementioned static data commit to source control and then never touch again, able to serve static files over the network for most of the API (designing the API appropriately).

That was foolish, the only things that should've been checked in were the source data and the code which turned that into the desired format with either a build or a startup step being used to generate these files.
This decision caused headaches like "$base_domain" and being really reluctant to ever make changes to formats for the api.

Hopefully this is a mistake I will only make with one project.

I don't remember why `src/server/GET_STOPS.json` and `src/server/GET_routes.json` exist but I think they are the same idea with the same problem.

#### `src/server/Dockerfile`, `src/deno.json`

Files for tools used for development.

#### `src/server/TODO.md`

reading this file I can only laugh.

#### `src/server/graph.ts` and `src/server/cypher-shell`



### Misc trouble

The friend uses a Windows laptop the class requires Docker (and I prefer it) this combination led to some annoyances for both of us.

Example: Annoying code

```ts
const usingDocker = !Deno.env.has("DISABLE_DOCKER");
const root_url: string = usingDocker
  ? Deno.env.get("ROOT_URL") as string
  : "http://localhost:8080/api";

// Vs if this was docker only (probably could've simplified the above but oh well)

const root_url = Deno.env.get("ROOT_URL") as string;
```

But whatever it worked and wasn't make or break.

## What now

This work is probably going to be abandoned due to me needing to focus on other things.
If I come back to this project though I'm probably going to rewrite again due to probably doing it solo and wanting to yeet old mistakes.

Note to self: never check generated files into the build system, the disk/network cost(s) of git are not the reason they're just salt in the wound.
The actual reason is because generated files by nature of being generated are annoying to change so it'd be better to check the generator script in and have generating them as part of either process startup or a build step to put the friction where it causes the least damage.
