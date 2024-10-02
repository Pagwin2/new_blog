---

title: "Speeding through misc stuff"

description: "I want to get out a bunch of stuff that's in the git repo or my head so I'm dumping it here"

date: 2023-11-11

draft: false

---

# Speedrun time

Alright I have stuff in the git repo for this website and in my head that I want to get out so let's go.

## This blog is run via a docker container now

I was planning on adding comments which meant doing more than static files so it made sense to do that comments system via docker and to make deployment consistent I setup the base website to work via docker as well, unfortunately the comment system died at the last hurdle of sending out email(s) to verify a user's email but whatever it's suffieciently close to done that I'll probably finish it later.

## Numbers with finite vs infinite kolmogorov complexity

This is a blog post in the website git repo it's pretty much fully written but I decided I didn't want to publish it fully. You'll find the markdown [here](https://github.com/Pagwin-Fedora/website/blob/master/content/blog/finite_KCMP_nums.md). To describe the idea in brief for any mathematical object you can either describe it with a program written in a turing complete program that takes up a finite amount of space or you can't. If you can and the value you get as you run the program for an arbitrarily large number of steps is well defined then it has finite kolmogorove complexity and if you can't it has infinite. The blog post describes why the well defined part is needed as well as a badly written proof for why the set of all real numbers with finite kolmogorov complexity has the same cardinality as the intgers and ends with unfalsifiable nonsense conjecture about the universe. Sidenote: if you try to brute force the value of ψ (as described in the full post) you'll find that the cardinality of the set of all possible values for ψ is the same as for the Real numbers which is amusing.

## Remember pogo?

Lol I redid it again and wrote a blog post on it but didn't publish it so that's amusing.

## Music notation

So about a week ago I saw [this tantacrul video](https://www.youtube.com/watch?v=Eq3bUFgEcb4) and towards the start of it I decided to come up with a new music notation for fun. I yeeted the notes because I thought arbitrary symbols seemed dumb made use of color to communicate things like sharps and other symbols while keeping the current number of bars. Here's what I wrote down with little to no influence from the video.
```
rather than arbitrary symbols lets use lines
length is encoded via the length of a line
pitch is encoded via the vertical position of a line
lines without any modifiers are colored red
blue lines are used when a note is sharp
green when flat
purple, orange, dark cyan and gold remaining for various other things

greyscale colors can't be used for line colors because black and white are the background and they don't stand out enough of particular note white can't be used because it's used for spacing things meaning it could be misconstrued as the space between notes/dashing it can make 1 note look like multiple notes and black is needed for clarification in things like pitch and possibly the end of one note and the beginning of another due to it possibly being difficult to tell when a note ends and another begins if they're similar pitch

if a note needs multiple specifiers those specifiers should be dashed with each other aka they should alternate back and forth at a regular interval, if it needs multiple of the same specifier lines of the needed color should branch out of the line at the start of the line

if multiple notes with different pitches need to be played you draw multiple lines

another thing that can be used to specify information about a note is the shape of the front and back of the line, pointed, rounded and block are all shapes that can be taken, different specifiers can be used at the beginning and end of a line but these specifiers should only be used for things that are relevant at the beginning and end of a note respectively

all notes need to end in a black endpoint to visually clarify the end of a note

background staff I think it's called is kept the same so pitch is clear
```
After watching the video I realized that I had reinvented piano bars and that I left a lot unspecified and had 2 problem, 1) short notes are hard to diferentiate from each other 2) this setup screws over color blind people. There are hacky solutions to those problems and I could work on making this system more complete but I did it for fun and I'm bored of it now so I won't.

## I'm dipping my toes in haskell and I made a monstrosity

```hs
data SubShell = S Integer Integer | P Integer Integer | D Integer Integer | F Integer Integer deriving (Show, Eq)

instance Ord SubShell where
    S l1 _ <= P l2 _ | l1==l2 = True
    S l1 _ <= D l2 _ | l1==l2 = True
    S l1 _ <= F l2 _ | l1==l2 = True
    P l1 _ <= D l2 _ | l1==l2 = True
    P l1 _ <= F l2 _ | l1==l2 = True
    D l1 _ <= F l2 _ | l1==l2 = True
    S l1 _ <= S l2 _  = l1 <= l2
    S l1 _ <= P l2 _  = l1 <= l2
    S l1 _ <= D l2 _  = l1 <= l2
    S l1 _ <= F l2 _  = l1 <= l2
    P l1 _ <= S l2 _  = l1 <= l2
    P l1 _ <= P l2 _  = l1 <= l2
    P l1 _ <= D l2 _  = l1 <= l2
    P l1 _ <= F l2 _  = l1 <= l2
    D l1 _ <= S l2 _  = l1 <= l2
    D l1 _ <= P l2 _  = l1 <= l2
    D l1 _ <= D l2 _  = l1 <= l2
    D l1 _ <= F l2 _  = l1 <= l2
    F l1 _ <= S l2 _  = l1 <= l2
    F l1 _ <= P l2 _  = l1 <= l2
    F l1 _ <= D l2 _  = l1 <= l2
    F l1 _ <= F l2 _  = l1 <= l2

```

:) this was for modeling electron subshells btw here's a [gist](https://gist.github.com/Pagwin-Fedora/07042faaa3e5ae275652874b47cb969f) with the full program.

## The fractions sidequest continues

After my [blog post](https://pagwin.xyz/blog/fractions_sidequest/) on optimizing this I've gone further by implementing the ideas I suggested at the end. At this point I believe my choke points are the progress bar (if I remove it I'll get a 2x speedup lol), the queue (I'm thinking of implementing it myself to use a fixed buffer which it goes through in a circle/ring and uses a couple of [AtomicUsize](https://doc.rust-lang.org/std/sync/atomic/struct.AtomicUsize.html) values) and doing IO (I don't think I can speed this up very much unfortunately).

## My writing sucks

My sentences go on for too long and I generally think I ramble a bit too much but I also don't want to do a lot of editing for these blogs because I like just writing them in a flow state and doing editing later is very boring/unfun >:(.

## Microblogging hmmmmmmm

I've been thinking of setting up my own mastodon instance recently but I want everything including th mastodon instance in containers so I can pack up and move servers easily and I'm not sure how to do that with mastodon. Not sure if I wanna do that though because I wouldn't use it that much and I like being able to direct my writing energy into macro blog posts and more blog posts like this one. I suspect this won't be the last time I use this format. Anyways that's all folks I hope you have a nice day.
