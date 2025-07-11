---
title: "Common procedural programming abstractions"

description: "a sequel to a post I wrote about the basics of procedural programming"

date: "2025-04-26"

draft: false

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
In addition, although previously unmentioned, we can put lists into lists.

```
fancyList <- [[], [1, true], [">:)"]]
```

We're going to use this alongside our other syntax to define the procedures for some initial abstractions.

## `Label`

Lets make a procedure called `Label` and define it like so

```
"something I didn't mention in the prior post is that procedures can"
"take multiple values as input"

"I also didn't mention that we can have them give back values"
"these are both oversights that I will hopefully correct in the future"

"Also throughout this post you may notice that I will occasionally start"
"a variable or procedure name with a capital letter, that is because I"
"expect or know we will use it frequently and want it to stand out a bit"

PROC Label (labelName, labeledValue) {
    "RETURN is just the word we put in front of the value that the"
    "procedure will give back"
    RETURN [labelName, labeledValue]
}

pet <- Label("Dog", "Charlie")

```

We now have a way of "labeling" a value, however making use of this still requires engaging with an underlying list after the fact.
That sucks, it means that we can't think about just labels when working with labels, we need to think about lists as well.
To fix that we'll add some more procedures for pulling out the label and value.

```
PROC LabelName(label){
    return label[0]
}

PROC LabelValue(label){
    return label[1]
}
```

## A new way of gathering values toegether

Working with lists is great and all but ya know, wouldn't it be nice if we could put values toegether in a way where each value has a name within that collection?

Yeah that would be nice so lets put a bunch of labeled values in a list.

```
henry <- [
    Label("age", 25),
    Label("favorite food", "pizza"),
    Label("married?", false)
]
mary <- [
    Label("favorite food", "orphan tears"),
    Label("married?", true),
    Label("age", 20105)
]
```

Okay, now what?
What if we want to grab some person's age?
Well we can't just take an index of this list because the age can be anywhere in the list.
Whelp, I guess we gotta go through each element in the list and find the one with the "age" label

```
FOREACH personAttribute <- somePerson {
    IF LabelName(personAttribute) = "age" {
        "we do whatever we were doing with the value labeled age here"
        "accessing it via LabelValue(personAttribute)"
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

    FOREACH association <- assocList {
        IF LabelName(association) = name {
            attributeValue <- LabelValue(pair)
        }
    }

    RETURN attributeValue
}

PROC setAttribute(assocList, name, newValue) {
    i <- 0
    pairIndex <- 0
    FOREACH pair <- assocList {
        IF LabelName(pair) = name {
            pairIndex <- i
        }
        i <- i + 1
    }

    assocList[pairIndex] <- Label(name, newValue)
    
    "If you're uncertain about how necessary returning the list is"
    "that's good, I encourage that curiosity/suspicion, some"
    "languages in some cases won't require that you do this"
    "however because this is my language I've decided that you do"
    "have to do this, at least in this current iteration of the language,"
    "because makes where and how values change clearer."

    RETURN assocList
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

creating a new abstraction from our prior abstraction.
Our new abstraction is really useful but kinda clunky so we're going to add notation into the language, at least for the case where we're looking things up with strings which don't have spaces or other kinds of blank space.

```
"notice how we replaced the space with an underscore in favorite_food"

"also be aware that many languages don't allow question marks in"
"variable, procedure and attribute names due to using the question mark"
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
However the reason I explained this the way I did rather than just giving syntax is to give a demonstration of a reasonably simple but useful abstraction.

That said I need to lay some ground work for our next abstraction so here's some freebies.

## Procedures as data

There are 2 ways to interpret the subtilte of this section.

1. You can put a procedure in a variable or argument and call it from that variable or argument
2. In addition to the first point you can manipulate procedures like any other data such as numbers or lists

for our purposes I'm talking about only the first point although the second point is a thing in some languages.

So now in the pseudocode something like

```
PROC someProcedure(arg1){
    RETURN arg1
}

a <- someProcedure
b <- a(someProcedure)
c <- b(a)
```

is valid, unfortunately some languages *cough cough Java cough cough* don't let you do this kind of thing.
So while it is a critical component for some abstractions, I'm going to refrain from most of those abstractions for this post at least.
Instead most of the usage in this post will stick close to what's widely doable.

For my convenience here's syntax that makes a procedure value without giving it a name so I don't need to name every procedure as long as it's put into a variable or procedure argument immediately.

```
a <- PROC(arg1, arg2, ...){
    ...
}
```

## Associated procedures

This follows pretty cleanly from the syntax of the prior 2 sections, no new syntax just pointing out that we can do this.

```

foo <- {
    baz: "The consequences of my actions",
    bar: PROC(someFoo){
        DISPLAY(someFoo.baz)
    }
}

foo.bar(foo)
```

Anyways that's enough free stuff lets go build another abstraction.

## Iterators

Previously when I defined the `FOREACH` loop, I said 

> a foreach loop will go through each item in a collection of items **such as a list**

Implying that a `FOREACH` loop can be used on something that isn't a list.
So lets try using our new associated procedures superpower to formalize what something needs in order for us to plug it into a `FOREACH` loop.

To avoid me accidentally having a circular definition we're going to add a `length` procedure to our pseudocode which simply gives the length of a list you give it so `[]` would be 0 `[true]` would be 1, `[1,2,false]` would be 3 etc.

With that minor book keeping out of the way what are we going to require for the shape of our iterator?

Well we want a way to go through each item in a collection, so how about we just ask the collection for each item one by one?

```
iterableList <- {
    underlying: [1,2,3],
    currentIndex: 0,
    nextItem: PROC(self) {

        tmpIndex <- self.currentIndex
        self.currentIndex <- self.currentIndex + 1
        
        "we need to return the updated object alongside each element of the collection"
        "for this iteration of the language"
        RETURN [self, self.underlying[tmpIndex]]
    }
}
```

This almost works as is however the problem is what happens when we try to index past the end of the list?
More generally we have no way for the iterator to communicate when it's ended.
There are other problems but this is the most pressing one.

To solve it we'll want to discuss

## Error handling

To clarify we don't need to have defined error handling to complete our iterator implementation however good solutions to that problem and error handling have high overlap so we might as well.

### If there's an error then never return

Using this form of error handling is basically declaring

> This procedure is defined in a very specific way, if we leave that definition then the universe is broken and we should avoid making it worse

Oftentimes, this is a perfectly reasonable declaration due to some functionality simply being critical to the program, being impossible as far as you're aware or simply because handling that error in a more correct manner would be a lot of work and not giving back a result is good enough.

The 2 ways of doing this are having a procedure which simply exits the program without returning from the procedure and simply going into an infinite loop.

Regardless this strategy won't work for our iterator because we would really like to be able to have code after `FOREACH` loops that runs.

### If there's an error then return the error

Aside from not returning from the procedure this seems like the second most obvious way to handle this problem, but how can we distinguish between an error and just a value?
Well we already have `Label` which was defined earlier in this post so how about we just use that.

```
PROC myDivision (numerator, denominator) {
    IF denominator = 0 {
        RETURN Label("error", "Division by 0")
    }
    ELSE {
        RETURN Label("value", numerator/denominator)
    }
}
```

sometimes though an operation isn't actually erroneous though and we just want to return nothing and we can do the same thing there.

```
PROC findValue (someList, value){
    i <- 0
    WHILE i < length(someList) {
        IF someList[i] = value {
            RETURN Label("value", i)
        }
        i <- i + 1
    }
    RETURN ["nothing"]
}
```

returning a 1 element list in the nothing case may feel a bit weird but it actually makes perfect sense if you think about it for a second.
Keep in mind that our `Label` procedure is just returning a 2 element list and `LabelName` just grabs the first element.
So a single element list works just fine for `LabelName` which is perfect because it doesn't exactly make sense for our "nothing" to have something now does it.
Put another way for the case of nothing there isn't any particular value we want to put as the second value so we might as well not have a second value.
That said it's a little bleh and I imagine we'll be giving back errors and values frequently going forwards so lets just make procedures and a variable for them

```

"Like our Label procedures, I'm capitalizing the first letter of"
"Value, Error and Nothing with the expectation that they'll be used
"frequently and worth having stand out a bit in the code"
PROC Value(someValue) {
    RETURN Label("value", someValue)
}

PROC Error(someError) {
    RETURN Label("error", someError)
}

"Nothing is a variable rather than a procedure because there isn't"
"much of a point to a procedure which takes no arguments and just"
"immediately returns a value which never changes. Well... at least"
"not in this post"
Nothing <- ["nothing"]
```

Changing our list iterator to line up with this idea is pretty natural and easy.

```
iterableList <- {
    underlying: [1,2,3],
    currentIndex: 0,
    nextItem: PROC(self) {

        tmpIndex <- self.currentIndex
        self.currentIndex <- self.currentIndex + 1
        
        IF tmpIndex > length(underlying)-1 {
            RETURN [self, Nothing]
        }
        ELSE {
            RETURN [self, Value(self.underlying[tmpIndex])]
        }
    }
}
```

This is what I intend to go with for our iterator and error handling generally in this pseudocode however there's 1 more kind of error handling worth mentioning.

### If there's an error perform magic

Okay it isn't really magic, really it's the prior return the error as a value thing we did except we only know about any errors if we ask.

This kind of error handling is called "exception handling" where we can "throw" an exception.
What this basically means is that we return it but if the caller doesn't have their call to us inside of a `TRY` then it will automatically return the error itself and so on until a `TRY` is reached at which point the error is accessed and dealt with.

Example:
```
PROC a(){
    THROW "hey"
}
PROC b(){
    a()
    DISPLAY("I'm never going to be run")
}
PROC c(){
    TRY {
        b()
        DISPLAY("I will also never be run")
    }
    CATCH caughtError {
        "displays hey"
        DISPLAY(caughtError)
    }
    DISPLAY("I will be run after everything above regardless of whether there's an error")
}
```

Using this for our iterator we can make something like this.

```
iterableList <- {
    underlying: [1,2,3],
    currentIndex: 0,
    nextItem: PROC(self) {

        tmpIndex <- self.currentIndex
        self.currentIndex <- self.currentIndex + 1
        
        IF tmpIndex > length(underlying)-1 {
            THROW "No more items"
        }
        ELSE {
            RETURN [self, Value(self.underlying[tmpIndex])]
        }
    }
}
```

then we can either have our `FOREACH` do an implicit `TRY`, `CATCH` which checks if the error is `"No more items"` and if not rethrows or we can not do that and make it so every `FOREACH` loop has to be wrapped in a `TRY`, `CATCH` for some reason.

In case you can't tell this is not my preferred error handling mechanism.

## Our Iterator so far

at the moment we've made it so an iterator is anything with a `nextItem` attribute which is a procedure which takes the iterator and returns a 2 element list with the updated iterator and either the value with a label of value or a label which is just nothing.

But well... needing to use our iterator like

```
tmp <- somethingIterable.nextItem(somethingIterable)
somethingIterable <- tmp[0]
currentItem <- tmp[1]
```

is kinda annoying, it'd be much more convenient to have all of this be just 1 line instead of 3, preferably with that 1 line being shorter rather than longer.
Of course it's totally possible to add syntax to do this all in one line, hell there's even multiple paths we can take to achieve that.
We're going to pick the one which most procedural languages pick.

## References

If you've been reading all the code blocks you may remember that back when we were building up to data with attributes which can be easily accessed I wrote

> If you're uncertain about how necessary returning the list is that's good, I encourage that curiousity/suspicion, some languages in some cases won't require that you do this

The reason languages don't need you to do that is because they allow (often require) you to pass values by reference.
A reference is basically a way to modify a value without reassigning the relevant variable with `<-`.
Most languages will have lists and objects passed in by reference so.

```
PROC m(mLess){
    mLess.m <- "m"
}

john <- {
    m: "T"
}
m(john)

"will print out m if john is passed by reference to the m procedure"
DISPLAY(john.m)
```

Most of the time having what can/will modify some data be hidden in a procedure call makes understanding what's happening more difficult.
That's why up to this point everything we've done have been done by passing in a copy of the value the variable holds rather than a reference to the variable.
However sometimes the loss of readability is worth it to make using an abstraction easier.

As such we are going to add some syntax to our language to allow for passing things by reference.
Specifically when we pass a variable into a procedure, if we prefix the variable name with `&` from now on that will mean that we are passing that variable by reference, in the procedure if we're receiving a variable by reference we will be required to prefix the argument with an `&`.

This leaves our iterable list looking like so

```
iterableList <- {
    underlying: [1,2,3],
    currentIndex: 0,
    nextItem: PROC(&self) {
        "self now has & prefixed to it"

        tmpIndex <- self.currentIndex
        self.currentIndex <- self.currentIndex + 1
        
        IF tmpIndex > length(underlying)-1 {
            "we no longer need to return self because self has already"
            "been modified"
            RETURN Nothing
        }
        ELSE {
            RETURN Value(self.underlying[tmpIndex])
        }
    }
}
```

and using it looking like so

```
currentItem <- iterableList.nextItem(&iterableList)
```

many languages take this further by making `self` a magic argument name that causes the language to pass in the object in for us or have `this` as a magic variable within procedures which isn't an explicit argument which allows accessing the parent value by reference.

In addition other languages will frequently allow for storing references to modify variables later.

For our purposes neither of those additions are necessary so we won't add them.

## Minor pain point fix

Up to this point we've had our list itself be an iterator but this is annoying because it means after each foreach loop we need to reset the `currentIndex` value one way or another.

Instead of doing that it would be much more convenient if we just made a new iterator every time.

So lets make a procedure that does that.

```
PROC makeListIterator(list){
    RETURN {
        underlyingList: list,
        index: 0,
        nextItem: PROC(&self){
            tmpIndex <- self.index
            self.index <- self.index + 1
            
            IF tmpIndex > length(underlyingList)-1 {
                RETURN Nothing
            }
            ELSE {
                RETURN Value(self.underlying[tmpIndex])
            }
        }
    }
}
```

## Other iterators

There wouldn't really be any point to this whole exercise if we didn't make at least one iterator that isn't a list, so lets make one.

```
evenNumberIter <- {
    num:0,
    nextItem: PROC(&self){
        tmp <- self.num
        self.num <- self.num + 2
        RETURN Value(tmp)
    }
}
```

This iterator will emit values forever, which is fine, if we only want to have some of those values without getting stuck in a loop we can manually use `nextItem`, `FOREACH` is just a convenience not a necessity.

Here's something a bit meta, we can make an iterator which takes a different iterator and loops it forever (side effects of the original iterator will not be repeated) if iterator has anything.

```
PROC makeLoop(originalIterator) {
    RETURN {
        iter: originalIterator,
        filledStorage: false,
        storage: [],
        nextItem: PROC(&self) {
            "An append procedure which adds an item to"
            "the back of a list now exists the list"
            "being appended to is the first argument,"
            "the value being appended is the second"
            
            item <- self.iter.nextItem(&self.iter)
            IF LabelName(item) = "value" {
                IF NOT self.fillledStorage{
                    append(&self.storage, LabelValue(item))
                }
                RETURN item
            }
            ELSE {
                self.filledStorage <- true
                self.iter <- makeListIterator(storage)
                RETURN self.iter.nextItem(&self.iter)
            }
        }
    }
}
```

## Conclusion

I could go on and bring in other features and abstractions which could be useful for our iterators but I think this is good enough.
We'll see if I realize I should come back to this again.
