---
title: "Easy after you \"get it\""

description: ""

date: "2025-01-25"

draft: true

tags: []
---

I feel like there's a bunch of things out there which aren't "easy" until you get some crucial insight(s).
Am I the first person to realize this?
No, it's even probable that I read/heard this somewhere before and forgot.
Either way I wanted to ramble about some things which I find easy but seem to not be and things which I find hard but think will become easy with some critical insight(s).

## Easy for me and not(?) for people not in the loop

### Recursion

Solving a problem with recursion can fundamentally be described with the following steps.

1. Find a case where you know the solution without recursion and solve it. Often this will be the simplest case.
2. Figure out a way to solve the problem if you know the solution for a slightly simpler case

Well... actually, while that is useful for solving arbitrary homework problems it's not how I use recursion in practice.
Generally when I do recursion it's as a convenient way to perform a [depth first search](https://en.wikipedia.org/wiki/Depth-first_search).
Okay might lose some people with that so here's an example.

#### Example

A few months ago I participated in a coding competition hosted by my university's branch of ACM.
One of the problems in the competition can be paraphrased as follows.

> Write a function that receives 3 inputs, `obstacles`, `minJump` and `maxJump`.
> Where `obstacles` is a string cosisting of 0s and 1s and `minJump` and `maxJump` are positive integers.
> Write a function to determine if there is a sequence of integers where all the integers are greater than or equal to `minJump`, less than or equal to maxJump and where making that sequence of skips (ie removing the first n chars from the string) will always have the first char of the string be "0" and will end with the final string being only a single char "0".

Solving this problem was pretty easy, it was this

```py
# Scaffolding code provided wanted this function to return
# "T" or "F" instead of True or False
def escape(patch, minHops, maxHops):
    if patch[0] == "1":
        return "F"
    if len(patch) == 1:
        return "T"
    
    for i in range(minHops, maxHops+1):
        if i >= len(patch):
            break
        if escape(patch[i:],minHops, maxHops) == "T":
            return "T"
    return "F"
```

All this does is

1. check if we're in a known failure state and return appropriately
2. check if we're in a known success state and return appropriately
3. check to see if each of the jump lengths we can make can reach a success state and if so return appropriately
4. if none of the lengths match return that this is a failure

I don't know if the above insight or this example helps anyone or not.

### Haskell Monads

Not to be confused with [Category Theory Monads](https://en.wikipedia.org/wiki/Monad_(category_theory)).
There's a running joke about how everyone who figures out Haskell Monads writes a tutorial on them, potentially including their own (probably incorrect) analogy.
Fundamentally Haskell monads have 3 properties.

1. They have an associated type, I'll be using `m<t>` to represent a type `m` with an associated type `t`
2. They have a mechanism to turn a function with an input of type `a` and output of type `b` into a function with an input of type `m<a>` and output of type `m<b>` (derived from them being Haskell Functors, not to be confused with [Category Theory Functors](https://en.wikipedia.org/wiki/Functor) or [ML Functors](https://en.wikipedia.org/wiki/Standard_ML#Functors))
3. They have a mechanism to turn a value of type `m<m<t>>` into a value of type `m<t>`

If you're staring at Haskell documentation and confused on that third point, here's a definition of a flatten function.

```hs
flatten :: (Monad m) => m (m a) -> m a
flatten v = v >>= id
```

Of course none of the above is the insight that I'm referring to, it's just to give the formally correct definition.
The insight [can't be written into words](https://byorgey.wordpress.com/2009/01/12/abstraction-intuition-and-the-monad-tutorial-fallacy/) unfortunately so instead I'm going to give a description of my intuition and maybe it helps, maybe it doesn't.

Haskell Monads are just the shape you appease to be allowed to write procedural looking code via `do` syntax.
Yeah that's it, they aren't really useful in other languages unless you want to generalize a procedural algorithm so it applies to data across many shapes.

#### Example(s)

##### IO

`IO` is a special case in Haskell so it's worth understanding what it is separate from Monads generally.
An `IO` object is basically a program that you can run which results in some value.
`main` is just a special name for the program that gets run when you run the executable.
The way a function is made to work on `IO` values is to just make it so the resulting `IO` value is now a program which takes the prior result and shoves it into the function you gave to give a new result.
Flattening is just running the outer program to generate the inner program.
For optimization reasons that's not how things actually work (I hope) but I don't want to dig into the compiler to give a more accurate answer.

##### functions

Yeah, normal functions are monads, specificaly the associated type is the return/output type.
This fact is a counter example to the whole "Monads are types which wrap a value" thing btw.
The way you do the whole function conversion thing is just function composition.
The way you do flattening is
```hs
flatten f = \a -> (f a) a
```
that.

##### lists

A funny funky monad example which basically turns the `do` syntax into for loops.

```hs
-- basically turns [1,2] and [True, False] into
-- [(1, True), (1, False), (2, True), (2, False)]
myProduct :: [a] -> [b] -> [(a,b)]
myProduct l1 l2 = do
    elem1 <- l1
    elem2 <- l2
    -- return is just a function to turn a non-monad value into a monad value
    return (elem1, elem2)
```

Changing functions is just a `map` and flattening is just well... exactly what you think when you flatten a 2d list into a 1d list.

## Not easy for me, still need the insight

### Finding a job

This one 
