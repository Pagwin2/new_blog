---
title: "Weekly notes for my software engineering class"

description: ""

date: "2025-03-01"

draft: false

tags: []
---

This is going to be a bit different. 
Unlike other blog posts of mine which I fire off and forget this one I'm intending to update 😱.
Specifically I'm going to try and update it weekly with a status report.

*Updated 2025-05-03*

## Foreword

I'm writing this to document stuff that happened before I created this post.

First, the project idea.
Remember the project I did for [HackBU 2024](/posts/HackBU2024/)?
It's that, but over a longer time frame with a partner.

I also participated in another attempt at the same idea in the interim for a different hackathon which I forget the name of.
The reason I mention this is that one of my team mates for that alerted me to the fact that broome county provides their [static route info](https://www.broomecountyny.gov/transit/gtfs) in a computer readable format.

That said, for work done in this class, so far I've.

- Setup a microsoft azure function which prints out bus information for OCCT buses doesn't save it into a database due to the university monopolizing azure usage for all @binghamton.edu addresses. I'll probably swap to a personal account, my usage should be in the free plan after all
    - The idea behind this is to gather data to do a machine learning on so bus timings can be predicted semi-reliably for giving better route info
- did various bits of busy work that the course had us do involving documents of varying usefulness
- setup some docker files and a docker compose for the client (being worked on by my project partner), the server and a reverse proxy
- Converted some json blobs of OCCTs api into differently shaped json blobs so I can avoid writing code that does more than serve static files to the extent possible

## 2025/03/01-2025/03/07

So a few things happened. First we had our first meeting going over a prior sprint. Learned that those meetings are reasonably loose in what needs to be done but also are expected on Monday and need the relevant folder made ahead of time.

More importantly broome county stops are now in the needed API format mostly but routes/trips are going to be trickier, there isn't an easy out like there is for OCCT with everything in roughly the way we want it already.
Already it seems the API is going to have a focus on trips rather than routes as a part of coping so time will need to be dealt with which is annoying.
As such that's a work in progress converting from GTFS to something we can use, other than that this week will be actually setting up the backend for me and some validation tests, possibly messing around with the api spec more.

Ideally but this is a bit of a stretch everything will just work and I'll be able to also setup Caddy and we can start playing with this whole setup in a proto-prod setup.

## 2025/03/07-2025/03/15

It's spring break, might need to use a flex week if this sprint isn't skipped.
Depends on Levi and me making a prototype of the BCT setup with an LLM.

## 2025/03/15-2025/03/22

We needed to use a technical flex for reasons that should be apparent from the prior week's note.

In any case work on making things fit toegether continues and now I also need to get a setup to produce a route from point A to point B using one bus system probably with the naive hub algorithm.
I've got a partial setup for an sqlite db to cache all the stop lattitude and longitude values and give `n` points which are closest to a given point.
However I haven't set that system up to read the stop json files yet.
When I do I'll probably want to add a table to the sqlite db to relate stops with trips.
I'll also want a table specifying trips and which hub they lead to.

## 2025/03/22-2025/03/29

So, the naive strategy for finding paths doesn't work.

Fuck.

Anyways the client and the server technically exist and follow the same spec.
In theory.

Expanding on that first sentence though it's looking like I'll need to actually make a graph for even a basic algorithm which pains me greatly.
The reason why the naive algorithm doesn't work is actually one which the HackBU2024 version also suffers from, namely it pretends every stop  goes in both directions when that's generally false.
Some stops are "outbound" and some are "inbound" due to being on opposite sides of the road.
As such the way I was doing things doesn't really work.
Another issue being that I'd have needed to actually grab relevant trips/routes using the stop id which is doable but iffy and not very robust.

## 2025/03/29-2025/04/05

Minor delay/skip, oops, we're close to the end though.
Client and server are integrated?
Client may call to slighly incorrect endpoints but eeeeh it's fine and probably an easy fix.
We do need to present something which my partner being MIA for a few weeks will complicate but we'll see how that goes this Monday if we can't reschedule.
Up next comes my reckoning though as I actually need to do things with the graph.
Afterwards will probably be reconciling the API to actually be a sensible interface to how routes, trips and stops actually interact with each other.
Then if I'm still working on this, bells and wissles with ML, and hardware.

## 2025/04/05-2025/04/12

Nothing of note, other classes are on fire, getting to MVP for this class is currently my lowest priority.

## 2025/04/12-2025/04/19

Same as prior week

## 2025/04/19-2025/04/26

Forgot to write this week sorry

## 2025/04/19-2025/05/03

This is either the last or the second last post here.
If it's the last then I chose to do a full post as a retrospective instead.
Anyways Levi (partner for this project) is awesome and might be the reason this ends up having MVP functionality due to my dumbass procrastinating everything too much.
To my understanding as things currently stand everything for MVP exists, albeit with incorrect assumptions, which for MVP is fine.
I just need to bring it into docker, write tests for as much stuff as possible and finish any class requirements like the demo video.

## Conclusion

[Has been written in a separate post](/posts/soft-eng-project-retro/)
