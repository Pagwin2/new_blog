---
title: "A universal tutorial on the basics for every* programming language"
description: "A tutorial that covers all the basic concepts that procedural languages commonly have"
date: 2021-07-03
draft: false
tags: []
---

## Prelude

No this isn't comprehensive, so no you won't be able to immediately go start making something after having read this and no this doesn't cover everything you might possibly run into, see [#The Asterisk](#The%20Asterisk). Also the examples will be in Pseudocode so this isn't a generic python/javascript tutorial :P.

## The Asterisk

If you didn't notice the asterisk in the title next to every, now you know there is one. The reason for that asterisk is that this blog only covers stuff that is common(as built in language features) in procedural programming. If you don't know what "procedural" means don't worry about it and pretend that this covers every programming language. 

## The Data

Fundamentally programming is about the manipulation of data for varying purposes. On occasion a programmer will want data to be displayed which can be accomplished in many ways. For the purposes of this blog `DISPLAY(some_data)` indicates that whatever `some_data` is should be displayed. Now that data can be displayed, what data can we have? There are a few different types of data we can have<sup>[1](#1)</sup>. For now I'll only specify 3. Those 3 are strings, numbers and booleans. First there are strings, more commonly known as text. In many programming languages, including our pseudocode, we can create a string in our program by surrounding some text with quotes `"like this"`. Our second type is numbers which hold numbers. We can of course add, subtract, multiply, divide and raise to a power all of these numbers with the notation of `number1 + number2`, `number1 - number2`, `number1 * number2`, `number1 / number2` and `number1 ^ number2` respectively. Last but not least we have booleans which can hold the values of `true` and `false`. Just like how we can apply different operations onto different number we also have some operations we can apply to booleans. First we have `NOT` which will take a boolean and give back the opposite boolean e.g. true → false and false → true. Second we have `OR` which takes 2 booleans and gives back true if either of them are true and false otherwise. Third we have `AND` which takes 2 booleans and gives back true only if both of them are true and false otherwise. Finally we have `XOR` which will only give back true if only 1 of it's inputs is true eg `true XOR true` → false and `false XOR false` → false but `true XOR false` → true.

## Variables

Variables allow for the storage of data in named<sup>[2](#2)</sup> buckets which is very useful especially when taking input that can change at runtime. We can put a value into a variable like so `someVar ← "a string"` which would set the variable someVar to the string value of "a string".

## Conditionals

Conditionals(specified with `IF`) are statements that can allow us to gate code behind some condition being true. Besides the obvious of just specifying a boolean value ourself we can also perform certain tests on other values to get booleans. First we can see if 2 values are the same i.e. the same type and the same value of that type which we can do with a simple `value1 = value2` for ease of syntax we can also see if they are not equal to each other with `value1 ≠ value2` furthermore if both values are numbers we can see if one if greater than or less than the other with `value1 > value2` and `value1 < value2` respectively. I should probably provide an example snippet of pseudocode

```
someNum ← 5
"Sidenote: when I have a statement that can take multiple lines of code"
"I'll surround those lines with curly brackets, also when I need to make"
"a comment which is intended to do nothing to the code like this it'll be"
"a bunch of free floating string(s) where nothing is done with like this"
IF someNum = 5 {
    DISPLAY("someNum is indeed 5")
}
ELSE {
    DISPLAY("I have no idea how this happened")
}
```

## Procedures

Procedures are blocks of code which we can run when we want without having to copy and paste, furthermore we can change the values stored in variables in the procedure that the procedure lets us commonly referred to as arguments, an example of a procedure(in most procedural languages) is one which lets the programmer display some text which in our case is called `DISPLAY` the exact implementation of which is mostly unimportant for us to declare our own procedure we'll just put the word `PROC` before the name of our procedure and the arguments that our procedure takes separated by commas in parentheseses after the procedure's name for ane example of one of our user defined procedures I'll just write a procedure that prints out "Hello!" and then whatever was provided as an argument to it

```
PROC helloProcedure (name) {
    DISPLAY("Hello!")
    DISPLAY(name)
}
"the code above hasn't been run yet we need to call the procedure in order to run it like below"
helloProcedure("World")
```

## Lists

lists are a methodology of storing multiple data values within a single variable<sup>[4](#4)</sup>. When you want to store or retrieve a value from a list you need to specify at what position in the list you want to retrieve the value from via a number with the indexing of that list commonly starting from 0 with certain very special languages which choose to start or allow the programmer to start lists from indices other than 0. When declaring a list in our pseudocode I'll use square brackets surrounded comma separated values of the list, the size of the list will not be set in stone for convenience but it should be noted that in most programming languages you need to be explicit when making a list larger. An example of creating and using a list is shown below

```
someList <- ["First item", "Second item", "meh item"]
someList[2] <- "Third item"
"First item should be displayed when the line of code below is run"
DISPLAY(someList[0])
```

## Loops

loops are kinda self explanatory as they loop running code repeatedly. Commonly there are 2 types of loop in programming languages and when there are more they can be easily described in relation to these 2. These 2 types of loop are called a `WHILE` loop and a `FOREACH`<sup>[3](#3)</sup> loop. A `WHILE` loop will repeatedly run whatever code is inside of them as long as a condition is met, a foreach loop will go through each item in a collection of items such as a list and run some code using that item. Both loops make working with lists much easier because we don't need to write out the code for every single list entry and if the list we may be dealing with will have a size that cannot be known at the time of writing the program might, with the combination of some methodology of retrieving the length of the list, be the only option. the syntax for `FOREACH` loops will borrow from the syntax for assignment with the variable which will go through each value in our list being assigned to and the loop values are being pulled from being used as the value to assign from

```
i <- 0
"initializing an empty list which will be filled with the while loop below"
dataSet = []
WHILE i < 50 {
    dataSet[i] <- i + 1

    "We need to keep adding 1 to i so the loop doesn't run forever"
    i <- i + 1
}
"both loops below will display all the values in the list in the var dataSet"
i <- 0
WHILE i < 50 {
    DISPLAY(dataSet[i])

    i <- i + 1
}
FOREACH n <- dataSet {
    DISPLAY(n)
}
```

## Conclusion

That should cover the basic syntax features someone trying to learn a procedural programming langauge should be trying to learn. Some programming languages have macros, terenary statements and extensive standard libraries which will have a bunch of useful utilities those are best learned once these basic syntax features are understood and different langauges tend to differ regarding what and whether these features are include

## Footnotes

<a href="./#1" name="1">1</a> - I see you in the back there person who wants to be technically correct(if I wasn't writing this it'd be me) with your statements about how in C a lot of what differentiates types is just dereferencing the integer pointers down to their values and pretending chars aren't integers but I don't care so shut up.

<a href="./#2" name="2">2</a> - most programming languages have certain specifications on what you can name your variables and there's also reccomended ways you should name your variables and both of these can vary per language so you should probably read their documentation for specifics but for my purposes I'm gonna stick to [camelCase](https://en.wikipedia.org/wiki/Camel_case) using only english letters as I'm unaware of any non-esoteric programing languages which disallow such naming

<a href="./#3" name="3">3</a> - some programming languages will call foreach loops just for loops but most languages call them foreach loops

<a href="./#4" name="4">4</a> - Hello pagwin from March 2024 here, I was reading this back and realized that it's more complicated than this and I forgot to mention that at the time. As you can see from the code below the 4 annotation oftentimes you can assign to elements of a list individually without needing to remake the entire list around it and assign the whole list to the variable again. A more accurate description is a list is a way to hold multiple buckets you can store values in within a single variable. Going beyond that involves talking about references and that's beyond this article's scope.
