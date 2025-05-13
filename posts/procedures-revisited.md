---
title: "What's in a name"

description: "I've fallen into a rabbit hole of my own creation and now I need to explain the fundamentals of programming until I think my explanations are satisfactory."

date: "2025-05-12"

draft: true

tags: []
---

So in my prior post [A universal tutorial on the basics for every* programming language](/posts/universal_proc_tut/) my explanations for variables and procedures are lacking.
So lets start over and try explaining them one more time.

## Variables

Lets start with variables.
In the original post I wrote

> Variables allow for the storage of data in named buckets

but what does that mean really?

Well one way to think about it is that until you give the variable a new value you can just replace every instance of the variable with the value inside of it.

```
x <- 3

y <- x + 2

DISPLAY (x)

"becomes"

y <- 3 + 2

DISPLAY (3)
```

If this feels similar to what you can do with variables in high school algebra that's because it's basically the same idea.

Reassignment and lists mean that you need to be careful when applying this model but it still holds.

## Functions

Functions are a logical extension of that prior substitution method but now we substitute based on some values passed in.

<p><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>x</mi><mo>+</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">f(x) = x+2</annotation></semantics></math><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mn>2</mn><mo stretchy="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">f(2)</annotation></semantics></math><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mo>+</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">2+2</annotation></semantics></math><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mn>4</mn><annotation encoding="application/x-tex">4</annotation></semantics></math></p><p><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>g</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">g(x)=x^2</annotation></semantics></math><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>g</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>g</mi><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo>+</mo><mn>2</mn><mo stretchy="true" form="postfix">)</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mi>f</mi><mrow><mo stretchy="true" form="prefix">(</mo><msup><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo>+</mo><mn>2</mn><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><msup><mrow><mo stretchy="true" form="prefix">(</mo><mi>x</mi><mo>+</mo><mn>2</mn><mo stretchy="true" form="postfix">)</mo></mrow><mn>2</mn></msup><mo>+</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">f(g(f(x))) = f(g(x+2)) = f((x+2)^2) = (x+2)^2+2</annotation></semantics></math></p>

> Aren't those just math equations?

Yes, math equations are a very clean way of demonstrating functions and are especially nice because they allow be to avoid making new syntax to explain them.

Functions aren't procedures though, the main reason we're taking a detour to functions is because they are simpler than but similar to procedures.

There are a few things which make procedures different.

## Reason: side effects

With that prior example I gave you the output of `f(2)`, telling you that it was 4.
If I then asked you in the future what `f(2)` was then without needing to consult me or recalculate it you could answer 4.
This is not something that can be done with procedures.

The simplest side effect a procedure can do is update a variable outside the procedure, like for example.

```
counter <- 0
PROC display_add_counter(n) {
    DISPLAY (n+counter)
    counter <- counter + 1
}
```

If this were a function then you could call `display_add_counter(1)`, see `1` get displayed and know that if you did it again that exactly the same thing would happen.

But it isn't a function, we update `counter` so when we call `display_add_counter(1)` in the future we'll see `2` get displayed and then `3` if we do it again.

We can't just substitute in the final answer we need to do the work every time.

Of course in real programs in addition to state outside of the procedure we can also receive user input within the procedure which changes what the procedure does.

Also the effect on the outside world from `DISPLAY` in some value might be different due to the outside world changing in the meantime.

Getting a value out of a procedure is convenient though so we have `RETURN` for that.
Once we handle all side effects and have something sensible to substitute in we can just replace our procedure call with the value it `RETURN`s.
