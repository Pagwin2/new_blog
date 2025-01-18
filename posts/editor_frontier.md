---
title: "The text editor frontier"

description: "Comments and thoughts on editor wars."

date: "2025-01-16"

draft: true

tags: []
---

So recently I got a Youtube reccomendation of [Primeagen](https://www.youtube.com/@ThePrimeTimeagen) where he reacted to the video below. 
Of course as I do at this point I didn't watch his reaction and just went to the source to form my own opinion.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_MRUmRDzsI0?si=1QPmIFtKYXVqywHR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

So first I kinda sympathise with the sentiment of "why don't you use the tool I like?" being bad framing even though I definitely use that framing myself.

But I wanna focus on what he comments on after that "you wanna come along and ask me why I don't use something four years ago that's not better than anything else".
I found this comment and his expansion on it that things (notably in the editor space) haven't gotten better over the last few decades.
Which I think I mostly agree with that at least for text editors but I feel like there's more to say than just "things haven't gotten better".

So I drew a picture with [Excalidraw](https://excalidraw.com/).

<figure>
<img aria-describedby="editor_frontier_image" src="/static/images/editor_frontier.svg"></img>
<hr style="width: 80%">
<figcaption><p id="editor_frontier_image">Triangle with 3 points corresponding to Power, Ease of Use and Low Resource Usage. 
Some editors sit on the points while others are broadly placed on the lines of the triangle without specific positioning</p></figcaption>
</figure>

## Describing the triangle

The triangle isn't actually intended as a 2d shape like this to be clear it's meant to be a diagonal slice of a 3d cube.
That cube having 3 orthogonal axis each of which corresponds to **Ease of Use**, **Low Resource Usage** and **Power**.
Generally if you want to have an editor which improves on one of these you either need to sacrifice on the others or you need push the frontier outwards via innovation.
In 2d this would be making the triangle bigger, in 3d it would be making the cube and thereby the diagonal intersection bigger.

### Ease of Use

What I'm referring to with this is "how intuitive is it to pick this editor up?" or "how many brain cycles does it take to learn functionality".

### Low Resource Usage

How much RAM, CPU and other hardware resources do you need to run and use the editor in question.

### Power

This one is the least well defined for me but to try and give a definition "to what degree can the editor be made to do things relevant to the software you're developing".
In future I may develop my opinion more and split up IDEs from configurable editors.
For now however I'm grouping the power provided by greater configuration and builtin functionality toegether.

## Placing editors

So with that description of the triangle why do I have things positioned where they are?

### Emacs (Max Power)

I don't use Emacs personally so my opinion on it is formed second hand.
In any case from what I can tell Emacs is at a fundamental level built to be configured.
To such an extent that besides a core elisp interpreter (and some graphics stuff idk) everything is written in elisp aka the lang you use to configure it.
This power does come at the cost of ease of use though as demonstrated by me not putting in enough energy to use it yet.
It also comes at the cost of performance from what I've heard from 1 anecdote from a youtube video.

### Notepad (Max Ease of Use)

If you're reading this I can with near 100% certainty say that you know how to use Notepad.
So yeah max ease of use for it seems self explanatory as well as low power.
That leaves the question of it being away from low resource usage.
All I have to say to that is that it's relative and the triangle got normalized to an equilateral.

### Ed (Max Low Resource Usage)

You can probably go further than Ed but I don't want to put an obscure line editor from 1935.

In Ed you don't get to see the contents of the file you're editing.

In Ed you don't get to navigate a file with arrow keys.

Ed is a program you run in the terminal.

Ed cannot be configured at all (from what I can tell).

Ed was released in 1973.

With the above facts I think you can understand why I put Ed where I did.

### Nano, Micro, etc (On Ease of Use+Low Resource Usage line)

These editors while being terminal programs allow for usage of hotkeys that one normally expects to be available.
They also allow for you to have all of the most obviously useful hotkeys to be visible at the bottom of the window if you need help.
Otherwise they're basically Notepad in terms of what you can do/how.

### Modal editors (On Low Resource Usage+Power line)


