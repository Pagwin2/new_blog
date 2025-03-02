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

*Updated 2025-03-01*

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



## 2025/03/01-2025/03/08


