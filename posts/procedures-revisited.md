---
title: "What's in a name"

description: "I've fallen into a rabbit hole of my own creation and now I need to explain the fundamentals of programming until I think my explanations are satisfactory."

date: "2025-05-12"

draft: true

tags: []
---

So in my prior post [A universal tutorial on the basics for every* programming language](/posts/universal_proc_tut/) my explanations for variables and procedures are lacking.
So lets start over and try explaining them one more time.

## Naming via Substitution

That is most of what variables and functions are.
To see what I mean here's run through some examples treating variables and functions this way.

```
pi <- 3.141592

PROC area (radius) {
    RETURN pi * radius * radius
}

DISPLAY( area(1) )
```

substituting we go through the following

```
"substituting in the code for area"
DISPLAY ( pi * 1 * 1 )

"substituting the pi variable for it's value"
DISPLAY( 3.141592 * 1 * 1 )

"after that we do the math and because 1 times"
"anything is 1 we display 3.141592"
```

> What's `RETURN`?

Great question `RETURN` is how we have our procedure give a value back.

> But aren't we substituting it in anyways?

Yes, in this case what we're substituting in is the stuff that we put on the same line as `RETURN`.
However in some cases we need to do many substitutions and changes before we get something that we can just shove in, like for example.

```
PROC area (radius) {
    DISPLAY("called area")
    RETURN pi * length * length
}

DISPLAY( area(1) )
```

What would it even mean to

```
"DISPLAY in DISPLAY???"
DISPLAY(
    DISPLAY("called area")
    pi * 1 * 1
)
```

of course we can just make it so we can't have `DISPLAY` in procedures but even with that what happens if we assign to a variable outside the procedure?

Maybe we disallow that as well... congrats we've rederived pure functional programming.

## You fool you've fallen for my trap card

Now you have to listen to me talk about applicatives and monads and wait where are you going come back!

## Okay maybe procedures aren't substitution

And maybe I shouldn't have tried to use the framing deviced used by at least 2 resources for functional programming when I'm not talking about functional programming...

<iframe width="2048" height="937" src="https://www.youtube.com/embed/m_-qJKKz_Go" title="ISILDUR!" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Mmmmmm but it's really useful for the other stuff I wanna write about so how about we just impose those rules on ourselves for the rest of this blog post and not worry about it.

## Recursion

Lets write a function which adds up numbers in a list but for a challenge lets disallow `WHILE` and `FOR`.

Well how can we do that?
Okay baby steps lets see if we can figure out how to do this for lists which just have 1 number in them.

```
sum([1]) = 1
sum([2]) = 2
sum([3.14]) = 3.14
```

Oh so for lists which only have 1 number in them we can just substitute in the 1 number in the list, nice.

```
PROC sum(some_list) {
    "length gives the number of values in a list"
    IF ( length(some_list) = 1) {
        RETURN some_list[0]
    }
    ELSE {
        "brb gonna go get some milk"
    }
}
```

But what about if the list has 2 or more numbers?
Well what if we already had some magic method that can give us the sum of any list which has 1 less than the number of elements for a list we've got?
Well then we can just make a copy of the list with all but 1 element and then add back the 1 element we took out

```
PROC sum (some_list) {
    all_but_last_element <- copy_all_but_one(some_list)
    RETURN some_list[length(some_list)-1] + magic_sum(all_but_last_element)
}
```

But hang on we can do a sum on a list with 1 number and we can do a sum on a list which is 1 longer than the longest list we know how to do so far then doesn't that let us to a sum on a list of 2 numbers and 3 numbers and so on?

Yes it does we get a procedure like this

```
PROC sum(some_list) {
    IF ( length(some_list) = 1 ) {
        RETURN some_list[0]
    }
    ELSE {
        all_but_last_element <- copy_all_but_one(some_list)
        RETURN some_list[length(some_list)-1] + sum(all_but_last_element)
    }
```

To show this works we can just do substitution

```
sum([1,2,3]) = 3 + sum([1,2]) = 3 + 2 + sum([1]) = 3 + 2 + 1
```

which is exactly what we want.

But hold on, are all the intermediate substitutions really free?
I mean we have to store 3, 2 and the +s somewhere right?
Yes we do but there is a solution

## Tail recursion

A function is tail recursive if recursion is the last thing it does when it does recursion.
A counter example is the sum function we just did which does addition after the recursion

We can write a tail recursive version of that however.

```
PROC tail_sum(list, partial_sum){
    IF length(list) = 0 {
        RETURN partial_sum
    }
    ELSE {
        all_but_last_element <- copy_all_but_one(some_list)
        RETURN tail_sum(all_but_last_element, partial_sum + some_list[length(some_list)-1])
    }
}

PROC tsum(list){
    RETURN tail_sum(list, 0)
}
```

applying the same substitution but using `tsum` we get

```
tsum([1,2,3]) = tail_sum([1,2,3], 0) = tail_sum([1,2],3) = tail_sum([1], 5) = tail_sum([], 6) = 6
```

notice how we don't get that long of additions towards the end we just keep adding into the value for the second argument until we run out of things to add.
