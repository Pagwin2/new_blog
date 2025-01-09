---
title: "Impossible problems: Bot Detection"

description: ""

date: "2025-01-09"

draft: true

tags: ["impossible problems"]
---

I've had occasional thoughts<sup>\[citation needed\]</sup> on how to solve certain problems.
One of those problems is detecting bots in various contexts but mostly social media (whatever that means).

## Defining the problem

Before going further lets try and define what problem I'm trying to solve.
The problem in question is something like the following.

Assume we control a central service which we want to make available as widely as possible.
However there is a finite (albeit large) number of bad actors who will abuse the service in an obvious manner as much as possible and for as long as possible.
We don't want that so we ban anyone who abuses as soon as we notice.
However the bad actors can just create new accounts.
What's worse is that the bad actors are now creating bots who will automatically abuse our service.

With that context our objective is simple: minimize obvious abuse.

In the context of a social media like Discord or Youtube comments "obvious abuse" would be finance/sex scams.

## Strategy 1: maximize detection abilities

First things first lets try the direct approach.
What this means depends on the nature of the abuse so lets assume the service is a forum and we want to ban any mention of giraffes.
So we do the obvious thing and write a regex that instantly perma bans anyone who attempts to make a comment with the word giraffe in it.

```regex
[gG][iI][rR][aA][fF][fF][eE]
```

You come back the next day and the comments look something like this.

```
Definitely not a bot A: girаffe
Definitely not a bot B: giraffе
Definitely not a bot C: gіraffe
```

**WHAT?!??!!???!!** What happened to the regex?
After scratching your head for a bit you realize oh they used [bullshit unicode characters](https://gist.github.com/StevenACoffman/a5f6f682d94e38ed804182dc2693ed4b).
Okay so we just have to do unicode normalization and we're good right?
Wrong, to save some time here's a bullet list of things I can think up off the cuff.

- add whitespace into the word
- 🦒
- refer to giraffes by their scientific name "Giraffa camelopardalis" or just the first word of that
- ascii art of a giraffe
- hyperlink to pictures of giraffes
- try to convince people to go to your telegram chat about giraffes
- have giraffe in the username
- do any mixture of the above in the username
- write out a description of a giraffe "long neck camel"

You get the idea.
For most real world problems this is a hard if not losing fight where implementing a defense is harder than performing an attack.
Sometimes this can be effective enough on it's own but rarely.
To get this to a suffiecient level you'll probably need to employ humans but humans are extremely versatile so ideally we want to use them for other things.
Meaning we need to squeeze the maximum amount of bot banning that we can from the humans we get which means we need to make it harder to bypass bans, at least en masse.

So what do we have available to try and do that.

## Strategy 2: bad heuristics for unique humans

These heuristics are things like ip addresses, MAC addresses, hardware id numbers.
Basically all the data that an advertiser might use to fingerprint a user.
Unfortunately all of these things can be changed or spoofed relatively easily.
Mildly useful for unsophisticated actors but those aren't the majority of the problem.

## Strategy 3: phone number verification

## Strategy 4: entry fee

Both monetary and computational.

## Strategy 5: government ID verification

## Strategy 6: verification via in person handshake

## Strategy 7: CAPTCHA

## Strategy 8: Untrust to Trust pipeline

Public forum, bunch of messages then allowed into the VIP forum.
