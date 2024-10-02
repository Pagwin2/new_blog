---

title: "Fractions"

description: "So I've been thinking about representing fractions/rational numbers in binary effieciently..."

date: 2023-08-07

draft: false

---

# Fractions

So recently I've been thinking about how fractions could be represented in binary effieciently. Okay I've had it in the back of my mind for months but [this video](https://www.youtube.com/watch?v=4d6YrTKmjfE) gave me a spark on a solution.

## The beginning

I don't remember why I first started considering this but the first obvious solution I came up with was to do something simple like this.

```rs
struct Fraction{
    numerator:u32,
    denominator:u32
}
```

Which does work, however it's extremely wasteful with situations like 1/2 = 2/4 = 4/8 = 5/10 = ... among others.

This is okay depending on your use case, if you're okay taking a memory and computational hit you can just check if any resulting fraction can be simplified and simplifying. But I don't like that because it's ineffiecient and very inelegant.

## Why not just use floating point then

Because fractions rule and scientific notation drools, also floating point is just an approximation bro and thinking about how to solve this for fractions is fun.

## Second solution attempt

Alright so that first try didn't work particularly well with how wasteful it was but I'm sure this time it'll go better.

```rs
struct Rational{
    integer: u32,
    fraction: u32
}
```

... okay I should probably explain. The denominator of the fraction is 2^32 so now we don't have to worry about having situations where 2 fractions simplify to the same value because all denominators are the same meaning that only happens when they're represented by the same value, hurrah! Anyways addition and subtraction are both pretty easy and cheap, just do them piecewise and handle overflows. But multiplication and division are a problem now because both of them require use to have some kind of external storage to do and are going to be pretty computationaly ineffiecient. Well crap.

## Inspiration from the video

And that's basically where I got stuck until I found the video that I linked above. In the video they describe an algorithm for how you can get all rational numbers exactly once. Why it works doesn't matter for this blog(go watch the video if you care) but I will describe how it works. First start off with the fractions 0/1 and 1/0 ignoring that the second is undefined. Now add their numerators and denominators toegether to get a new number 1/1. Put that new number between them and then repeat that process with all adjacent numbers for however many steps you want. What I did with this was stop at a finite number of repetitions(if you wanna try at home I made a repo that generates all the fractions) the binary representation would then be whatever indice in the list a particular fraction was at.

Amusingly this gave the illusion of actually working for a moment. Namely when I added the indices of x/y and (y-x)/y for a few examples I got 1. But then I tried adding 1/18 to itself 3 times, and I got 1/16.

## Why does this work and why does it stop working?

That is the question, well my theory is that there's a symmetry from 0-1 that makes reflecting all values x/y over the value 1/2 makes them into (y-x)/y due to the way this sequence is generated. The reason it doesn't work for values that don't add up to 1 is that there's no equivalent symmetry which causes problems due to the distribution of fractions not being uniform over the integers(aka going to and from integers with this system is non-linear). This problem leaves us without even a way to salvage a good mechanism of having fractions from 0-1 which would've been useful in combination with method 2 if multiplication and division didn't cause issue.

## Oh wait solution 2 is fine actually

yeah I didn't think about it hard enough originally, shift both numbers to the right by half the number of fraction bits before you do the equivalent integer operation and you're fine. That said it may make sense to only allocate a quarter of the number to the fraction(good enough for most cases) or if I were to actually implement this it'd be user specified(if people actually started using it then there'd probably be encoding problems but I'm not even going to make this so not my problem).

## Conclusion

The simplest solution is often terrible but the second simplest is generally at least okay. This also gives a new appreciation for how elegant floating point is(dodging the question of how many bits go to the precision completely). I also have a side quest on making a program to generate fractions for solution 3 which I intend to start writing about now.
