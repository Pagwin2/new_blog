---
title: "Common procedural programming abstractions"

description: "a sequel to a post I wrote about the basics of procedural programming"

date: "2025-04-25"

draft: true

tags: []
---

This is a sequel to a prior post of mine, namely [this one](/posts/universal_proc_tut/).
The reason I'm writing is because I was chatting with some friends and I realized that while I covered all of the functionally universal things in procedural programming languages that I didn't cover a lot of common/useful features/abstractions that crop up.
This post is meant to rectify that.

Oh yeah, I'm going to drop the procedural specifier for a lot of this because

1. A lot of this applies even outside of them
2. A lot of this came from other paradigms



## Combining data

A quick refresher for the pseudo code established in the prior post.
There are 3 basic data types, strings, booleans, and numbers.
We can put values of these data types into variables or into entries of a list.
In addition, although previously unmentioned, we can pust lists into lists.

```
fancyList <- [[], [1, true], [">:)"]]
```

We're going to use this alongside our other syntax to define 3 new procedures.

### New procedure #1

We're going to call the first procedure `label` and define it like so

```
"something I didn't mention in the prior post is that procedures can"
"take multiple values as input"

"I also didn't mention that we can have them give back values"
"these are both oversights that I will hopefully correct in the future"

PROC label (labelName, labeledValue) {
    "return is just the word we put in front of the value that the"
    "procedure will give back"
    return [labelName, labeledValue]
}

pet <- label("Dog", "Charlie")

```

Label's utility may not be immediately obvious however in addition to using it in conjunction with our second procedure it's also a way for us to mark out what some data is that can be read out programmatically.

Say we want to write a procedure that calculates all the unknown bits of a triangle given some bits that we know.
Previously we would've needed to either have one procedure for each set of triangle bits we can solve from or we would've needed to have some auxillary argument to tell the procedure which bits it's getting.
But now, we can just label the bits we provide

```
"we'll get to what we can have solve_triangle return in a moment"
solvedTriangle <- solve_triangle( label("side length", 10), label("angle radians", 1.2), label("angle degrees", 45) )
```

on the inside of this procedure we'll still need to deal with jank but a major part of programming is wrapping up jank in a way that's less janky to work with.

### New procedures #2 and #3

Working with lists is great and all but ya know, wouldn't it be nice if we could put values toegether in a way where each value has a name within that collection?

Yeah that would be nice so lets put a bunch of labeled values in a list.

```
henry <- [
    label("age", 25),
    label("favorite food", "pizza"),
    label("married?", false)
]
mary <- [
    label("favorite food", "orphan tears"),
    label("married?", true),
    label("age", 20105)
]
```

Okay, now what?
What if we want to grab some person's age?
Well we can't just take an index of this list because the age can be anywhere in the list.
Whelp, I guess we gotta go through each element in the list and find the one with the "age" label

```
FOREACH personAttribute <- somePerson {
    "reminder: labeled values are just 2 element lists so we can get the"
    "first value of that list with a normal list index"
    IF personAttribute[0] = "age" {
        "we do whatever we were doing with the value labeled age here"
        "accessing it via personAttribute[1]"
    }
}
```

Writing all of this out is such a pain though, how about we just write procedures which set and modify procedures to our heart's content.

```
"dealing with the cases where the list we get doesn't have the label"
"we're looking for or more than on instance of that label is left as"
"an exercise to the reader"

"assocList is shorthand for associative list (the wikipedia article"
"uses the term array instead of list at time of writing) it's called"
"that because it associates keys with values, there are other ways of"
"making an associative list but they're more complicated so they can"
"run faster which isn't relevant to us"
PROC getAttribute(assocList, name) {
    "we'll use attributeValue later, the empty string is just so we know"
    "the variable will be used outside of the loop"
    attributeValue <- ""

    FOREACH pair <- assocList {
        IF pair[0] = name {
            attributeValue <- pair[1]
        }
    }

    return attributeValue
}

PROC setAttribute(assocList, name, newValue) {
    i <- 0
    pairIndex <- 0
    FOREACH pair <- assocList {
        IF pair[0] = name {
            pairIndex <- i
        }
        i <- i + 1
    }

    assocList[pairIndex] <- newValue
    
    "If you're uncertain about how necessary returning the list is"
    "that's good, I encourage that curiousity/suspicion, some"
    "languages in some cases won't require that you do this"
    "however because this is my language I've decided that you do"
    "have to do this, trust me it's for your own good. Explaining"
    "why is beyond the scope of this article but trust me most of"
    "the time it's a footgun"

    return assocList
}
```

with these getting a person's age is just

```
getAttribute(somePerson, "age")
```

and setting their age is just

```
setAttribute(somePerson, "age", 10)
```

and with that we've built a useful abstraction.
This abstraction is so useful in fact that we're going to add notation into the language, at least for the case where we're looking things up with strings which don't have spaces or other kinds of blank space.

```
"notice how we replaced the space with an underscore in favorite_food"

"also be aware that many languages don't allow question marks in"
"variable, function and attribute names due to using the question mark"
"as an operator for reasons of varying quality"

henry <- {
    age: 25,
    favorite_food: "pizza",
    married?: false
}
mary <- {
    favorite_food: "orphan tears",
    married?: true,
    age: 20105
}
```

the above block defining `henry` and `mary` in the same way that we did previously but now with the new syntax.

```
somePerson.age
```

new way to access the age of a person corresponding to the prior example.

```
somePerson.age <- 10
```

new way to set the age of a person corresponding to the prior example.

## Ok...

Take a breath you may argue that I over complicated explaining a concept as simple as having names in names.
However... okay I did do that but also this should show that really nothing in programming is magic, everything can be built from the basics and if something annoys you, you have options for changing things.

Anways moving on and returning to the style of the prior post of just giving stuff for free.

## Procedures as data

There are 2 ways to interpret what I just wrote.

1. You can put a procedure in a variable or argument and call it from that variable or argument
2. In addition to the first point you can manipulate procedures like any other data such as numbers or lists

for our purposes I'm talking about only the first point although the second point is a thing in some languages.

So now in the pseudocode something like

```
PROC someProcedure(arg1){
    return arg1
}

a <- someProcedure
b <- a(someProcedure)
c <- b(a)
```

is valid, this is mostly for my convenience and unfortunately some languages *cough cough Java cough cough* don't let you do this kind of thing so while it is useful and can be used for make abstractions that help us out, I'm going to refrain from most of those abstractions for this post at least.

Speaking of my convenience here's syntax that makes a procedure value without giving it a name so I don't need to name every procedure as long as it's put into a variable or procedure argument immediately.

```
a <- PROC(arg1, arg2, ...){
    ...
}
```

## Associated procedures

This follows pretty cleanly from our last 2 abstractions, no new syntax just pointing out that we can do this.

```

foo <- {
    baz: "The consequences of my actions",
    bar: PROC(someFoo){
        DISPLAY(someFoo.baz)
    }
}

foo.bar(foo)
```

## Iterators

Previously when I defined the `FOREACH` loop, I said 

> a foreach loop will go through each item in a collection of items **such as a list**

Implying that a `FOREACH` loop can be used on something that isn't a list.
So lets try using our new associated procedures superpower to formalise what something needs in order for us to plug it into a `FOREACH` loop.
