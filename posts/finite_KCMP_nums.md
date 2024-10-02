---

title: "Finite KCMP numbers"

description: "Fuck it my brain has a bit too much free time so why not figure out a proof for an isomorphism between programs writen in a turing complete language and natural numbers and use it to do fun stuff"

date: 2022-12-20

draft: true

---

# Finite KCMP numbers

So this blog article exists because I have too much time and realized that numbers with a finite KCMP have an isomorphism to the natural numbers among some other interesting stuff and I wanna write a blog article about it.

> Huh? KCMP? Natural numbers? Isomorphism? the fuck?

## An initial explanation

Okay maybe I should start with some explaining, KCMP is shorthand that me and a friend(their name is Micha, here's their [blog](https://lochalhost.pl/en/blog) and here's their [github](https://github.com/michalusio)) use when referring to [Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity), Kolmogorov complexity is the term used to describe the length of the shortest program written in a turing complete language needed to calculate a particular value. From here on however I'm gonna write KCMP because that's shorter. If you've never heard of KCMP I don't blame you, until Micha brought the term to my attention I wasn't sure what I was thinking of had a word.

> Wait you were thinking of KCMP before you even had a word for it?

Yup, you see some months ago I started this journey with a relatively simple question "are there numbers which we can't calculate?". The answer is yes there are numbers that we cannot calculate ever these numbers are irrational numbers with infinite KCMP. For a while that was that but before we go on I should probably make sure you know what I mean by isomorphism and natural numbers.

Natural numbers are the numbers you count with, `1,2,3,4,5,6,7,...` no fractions, no negatives or anything that you can't count with infinite fingers another way to describe them would be to just say they're all the positive integers.

When I say [isomorphism](https://en.wikipedia.org/wiki/Isomorphism) I'm talking about a method that we can use to convert from objects within one set to objects in another set that we can also reverse to get back the original object.

## The beginning

The way this started is that I was thinking about the fact that natural numbers, lists and code/functions can all be used to represent each other. But going into that is a whole rabbit hole involving control flow, lambda calculus, how you can represent things with other things, abstract syntax trees and how modern electronic computers work at a basic level so I won't go into details here. All you need to know is that while I was thinking about that I made a connection to some previous random thoughts that I had between the time I first learned about KCMP and then. Those thoughts being about how I wondered what the sizes of the sets of numbers with finite and infinite KCMP.

> Wait aren't both of those infinite?

Yep but there's more than one size of infinity, the smallest infinity is the size of the set of natural numbers or [aleph](https://en.wikipedia.org/wiki/Aleph_number) null/nought. One of the infinities that's larger than that is the infinity of the real numbers. Due to that I was wondering whether the set of values with finite KCMP had the size of the naturals or the reals. Wait what was I talking about oh yeah isomorphism with naturals. The connection I made when thinking about how code/functions, lists and natural numbers are all equivalent was that I had just answered my question that I had had for a decent while and then I remembered one of the reasons why I was wondering that and got very confused.

## Why I got very confused

The reason I got very confused then is because I could apply a [diagonalization argument](https://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument) to the set of all numbers with finite KCMP and get a number which shouldn't be in the set of all numbers with finite KCMP but meets all the criteria to be in that set, meaning I had found a [paradox](https://en.wikipedia.org/wiki/Paradox).

> How do you know this number should be in your set?

for the sake of making this conversation easier lets give this number the name of ψ because the symbol ψ is underutilized in math. We know that ψ if it exists(we'll get to that) has finite KCMP because the process used to generate it given the set of all finite KCMP numbers only adds a finite amount of additional KCMP on top of the KCMP of the set of all numbers with finite KCMP which we know also has finite KCMP because we can describe the creation of that set with the following python program
```py
counter = 0
finite_KCMP_set = set()
while True:
    counter = counter + 1
    finite_KCMP_set.add(eval_num(counter))
```
> wait but that doesn't halt and also what's this `eval_num` function you never explained the whole natural numbers as code thing

...do I really have to dive into that rabbit hole? ... Fuck it lets dive in.

## An isomorphism between natural numbers and programs for a turing machine

Alright so first thing first we need to convert a natural number into an array of bytes which is pretty trivial to do.
```py
num = random_natural()
bytes = []
i = 0
while i <= log256(num):
    bytes.append(num%256)
    num /= 256
    i += 1
```
This array of bytes can then be treated as machine code that we run on whatever architecture thereby isomorphism between naturals and programs for a turing machine complete. ... Okay I'll be a bit more rigorous but not much. A turing machine can be constructed by having finite instructions which can operate on infinite memory so each instruction can just correspond to 1 natural number and we can read out an arbitrary natural number from our array by having the highest bit on each byte correspond to whether the value is continued in the next byte although given you don't need more than 255 instructions for a turing complete machine but doing this is convenient as we can use similar logic for the arguments to an instruction to pass in infinitely large values to instructions as jump locations or places to read data from. Anyways I'm not going into more detail beyond that, I'm sure you can get plenty creative making your own turing complete machine with infinite memory. To invert the relation you just take the byte array of a program and run it through this code
```py
num = 0
for i in range(0,len(bytes)):
    num *= 256
    num += bytes[i]
```

## The paradox

Anyways back to the issue at hand we have a number(ψ) that should be in a set by the definition of the set but also shouldn't be in that set due to how it got constructed. At this point I wasn't sure what to make of this but when I mentioned this to Micha and he had a few theories on what was going on.

1. ψ isn't in the set(except it is)
2. This set isn't constructible
3. the set isn't enumerable(interesting if true but obviously false)

> can you explain these statements?

sure but I don't remember how much of this I thought up vs Micha so I can't give proper credit so if that's important to you you'll need to reach out to me or Micha so we can share some discord messages.

### ψ isn't in the set

This would explain the paradox because it would mean there is no paradox however it's false because as described before the number has finite steps with finite KCMP and thereby also has finite KCMP.

### The set isn't constructible

This is the theory I'm currently in favor of as it seems to be the assumption that's made that isn't true, this also means that ψ doesn't exist.

### The set isn't enumerable

This is false because obviously the set is enumerable you enumerate by going through each natural number and evaluating the program equivalent.

## A set that actually exists

I can definitely credit the definition of this set to Micha, they gave a definition of. *"The set of all generatable tape sequences of a TM which have a limit"*. ψ isn't in this set because it doesn't have a proper limit, let n be the natural who corresponds to the program to generate ψ the nth digit of ψ can't be any number because it needs to not be equal to itself thereby meaning ψ doesn't have a limit and isn't included in our set.

## Some conjecture

With that we leave the realm of things I discussed with Micha and into the realm of increasingly stupid ideas.

With this knowledge that numbers with finite KCMP have a mapping to the integers...

> wait hold on don't those numbers include complex numbers, fractions, quaternions, irrational numbers, vectors and more? How do you know what's what from the limiting byte sequence?

Stop poking holes in my fun math thoughts anyways with the knowledge that integers correspond to finite KCMP numbers I conjecture that the fact that the infinity of the real numbers is larger than the infinity of the naturals will never come up in practice barring our current understanding of the universe being completely wrong or one or more universal constants having infinite KCMP(we'll come back to this in a second) due to all process of calculation that we have available are no more powerful than a turing machine which can only compute values which we just showed to map to the natural numbers instead of the real numbers.

## An amusing unfalsifiable hypothesis

I hypothesize that all of the universal constants have infinite KCMP due to the universe being a continuum of possible universal constants across a multi-dimensional plane and the observable universe being just one point on that plane picked at random, due to it being picked at random the probability of it being all values with infinite KCMP is practically 100%. Do I have evidence, research or anything else backing this theory up? Nope but it's interesting.

> Why is the probability practically 100% if the values are picked at random and How is that unfalsifiable?

The reason the probability is practically 100% is because the size of finite KCMP numbers is countably infinite and because the size of the real numbers is bigger that means that the set of numbers with infinite KCMP is the size of the real numbers thereby being infinitely bigger making the ratio comparable to 1:∞ meaning the probability of any universal constant having finite KCMP(assuming all are chosen fully randomly over a continuum) is 0(technically not impossible for math reasons but practically impossible).

As for the question of unfalsifiability we'd need to be able to make infinitely precise measurements to confirm it one way or the other and things like plank's constant conspire to prevent this in addition to us measuring with an error margin of 0 is pretty difficult if it's possible at all.

## Conclusion

Doing all this abstract high level math is fun though I fully expect that none of this will ever be useful in any way ever. Mildly tempted to argue otherwise in a CS ethics class I have coming up in uni soon but that probably isn't worth the effort or crappy grade.
