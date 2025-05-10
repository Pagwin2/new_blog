---
title: "Tail Recusion as generalized looping"

description: "Comments on recursion I've had in the back of my head for awhile"

date: "2025-05-10"

draft: true

tags: []
---

## Basic Iteration

In procedural languages we often have syntax like

```js
for(let i = init_state(); check_state(i); i = update_state(i)) {
    do_something();
}
```

for those who've only read [my universal procedural language tutorial](/posts/universal_proc_tut/) and done no programming afterwards (somehow) here's the equivalent in that syntax.

```
i <- init_state()
WHILE check_state(i) {
    do_something()

    i <- update_state(i)
}
```

the basic structure being that we have some initial value, some way of updating that initial value and some condition to determine if we should repeat.

Of course a natural question to ask is if it's possible to have multiple values.
The short answer fo that is of course yes, we just need to put multiple values into a list or similar before putting that into our variable.

But that isn't a very elegant solution so can we do things in the for loop itself?
For some languages the answer is kinda.
The initialization can have multiple variables created by separating them with a comma.
The check can use use the variables as is either as multiple arguments to a function or combining conditions with boolean operators.
Unfortunately when it comes time to update our variables we're screwed and need to start putting stuff at the bottom of the loop as if it was a normal while loop.

Another thing with this approach is that there are various keywords that can be used to move on to the next iteration early or end looping altoegether (`continue` and `break` respectively).
These keywords are nice but in terms of warm fuzzy elegance it's a bit unfortunate that they don't just come naturally with this choice of abstraction.

So, is there a better alternative?
Yes, tail recursion.

## Tail Recursion

Tail recursion is simply having a function where the value returned is either the return value of a call to itself or a fully calculated value, for example.

```
FUNC tail_sum(list, index, partial_sum){
    IF (index > length(list)-1) {
        RETURN partial_sum
    }
    RETURN tail_sum(list, index+1, partial_sum+list[index])
}

"Example usage, we could make a helper to pass in the 0 values"
"for us but for this example I've opted to not do that"
nine <- tail_sum([1,2,3,4,-1], 0, 0)
```

which would be equivalent to 

```
FUNC while_sum(list){
    index <- 0
    sum <- 0
    
    "The tail recursion check was to see if we were stopping"
    "the while loop check is to see if we keep going"
    "that's why the while loop version is NOT of the tail"
    "recursion condition"
    WHILE (NOT (index > length(list) - 1)) {
        sum <- sum + list[index]
        index <- index + 1
    }
    RETURN sum
}
```

note however that we can do non-tail recursion if we did something like

```
FUNC non_tail_sum(list, index){
    IF (index > length(list)-1) {
        RETURN 0;
    }
    RETURN non_tail_sum(list, index + 1) + list[index]
}
```

there is a meaningful difference between the two versions but that is a topic for another post.

## What does this have to do with looping again?

Everything, tail recursion can do everything our `for` and `WHILE` loops can and arguably do it more elegantly than them.
I won't be proving that in this post but if you look at the structure of `tail_sum` and `while_sum` I hope it's reasonably apparent that no matter what you try to put in the `WHILE` loop that you can make a tail recursive procedure which does the same thing.

But how is this better?
Well, most of the time it isn't because most of the time updating multiple variables independantly of each other is rare but it does happen.
