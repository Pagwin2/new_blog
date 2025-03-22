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

*Updated 2025-03-22*

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

To be written.
