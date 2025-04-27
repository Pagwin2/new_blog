---
title: "Accidentally constructing the paradoxical universal Matrix Graph"

description: "I'm concerned the title of this post overhypes what's really just abstract math nonsense that leads to something funny by accident"

date: "2025-02-28"

draft: false

tags: []
---

## Act one: A Lot of Things Are Graphs

We start our story with the humble graph.
Not the middle school draw y=mx+b graph but a connect the dots graph.

<img src="/static/images/simple_graph.svg" alt="image of a simple graph">

Some examples of graphs include: the graph of people connected to their friends, the graph of knight movement on a chess board and every real world computer.

... Okay, for that last one the graph is incomprehensibly big (2 to the power of your disk+ram+registers+etc measured in bits big) but still it's a graph.
Nodes (the circles in the picture above) are just some particular combination of bits across the entire machine and edges (the arrows in the picture above) are just the machine ticking 1 step forwards with its clock.
Specifically this is the graph of the finite state machine that your computer is which I commented on in [micro blogs 2](/posts/micro_blogs_2/).

## Act two: A Lot of Things Are Vector Spaces

A vector space is a set where you can add 2 things in the set and scale a thing in the set up by "a number" (quotes so I don't get bogged down in the precise definition of what's allowed).

Things that are vector spaces include: numbers, piles of apples, math functions which map numbers to numbers.

If you've taken a linear algebra class and that last one made you a bit confused for a second, a quick reminder that a vector space just needs addition and scalar multiplication.
Addition is just `f+g = h -> h(x)=f(x)+g(x)` and scalar multiplication is just `af = g -> g(x)=af(x)`.

If you haven't taken a linear algebra class then don't worry the function thing isn't important for this story.

One more thing that's a vector space is the set of matrices of a specific size.
Matrices are important to linear algebra but for this post all you need to know as a baseline is that they're 2d arrays.
This fact was a spark which while not relevent to the conclusion ignited the realization.

## Act three: Wait a Minute

One thing I forgot to mention in the graph section.
All graphs (for our purposes) can be represented by a matrix, every row and every column corresponding to a node and every element in the matrix corresponding to an edge.
That edge leading from the node corresponding to the column to the node corresponding to the row or vice versa whichever is more useful in the moment.

This became relevant when a friend posted

<img src="/static/images/everything_either.png" height="500px">

alongside the comment

> this image format but it's "everything is either a vector space or a graph"

Shortly after I remembered that matrices are a vector space and then the graph-matrix connection.
Then I remembered one more thing.

> Oh yeah doesn't category theory make just about everything everything a graph?

## Act four: Uh Oh

Okay so wait because category makes a lot of math, including linear algebra, into a graph we can turn math into a giant matrix where every mathematical object has a row and column in the matrix.
This is our universal graph matrix by the way.
Of course most of these morphisms (graph edges) are useless so we can 0 out edges and get a disjoint graph.

> Makes sense

At that point we can take any disjoint part of the graph and work with it on it's own making a new matrix.

> Ok...

Of course we don't need to limit ourselves to just math fields and other reasons to make disjoint graphs so we can make sub-graphs/matrices of arbitrary bits of our matrix.

> Uuuuuh wait a minute

So we can make a sub-matrix which has all the matrices which correspond to category theory graphs.

> Don't do it!!

This includes our universal matrix of course but we can shrink things down further to the sub matrix which has all matrices which correspond to category theory graphs but don't contain have themselves.
And with that I have in a very loose non-rigorous way recreated the circumstances to cause [Russell's paradox](https://en.wikipedia.org/wiki/Russell's_paradox) but this time with matrices instead of sets.

That is why the universal graph matrix described is paradoxical.
