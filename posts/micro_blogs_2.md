---
title: "Micro blogs (2)"

description: "a bunch of thoughts ideas and what not that aren't worth of full blogs but that I still want to write down"

date: "2024-01-30"

draft: true

tags: []
---

## I think react native or expo is haunted

(Writing this one from the title and memory of events months ago)

I mean seriously things got to a point where the app had errors but only when the files were unblessed. 
Like, if I recreated the project and copied my files over then it'd be fine but a git clone was unacceptable.
I even diff'd the different setups and nothing was different in terms of bytes.
Maybe there was cached stuff in the emulator but no idea what would be cached so oh well.

## Why do people use tailwind?

To clarify, I'm not asking why people choose to not use CSS. 
I can easily see how you can shoot yourself in the foot with that.
You can use [layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) and [scopes](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) to mitigate controlling where CSS gets applied but those are somewhat new and idk how commonly known they are.
Either way that's not what I'm asking about.
What I'm confused on is how is Tailwind better than using an inline [style attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style).
Both allow you to not need to deal with css selectors and both let you stylize the element.
But the inline styling has the bonuses of being easier to convert to CSS if you later decide that's sensible and not requiring you to download CSS.

Example:

```html
<button style="...">My Button</button>
```

Is it pseudo elements/pseudo classes?
If so why not use this pattern where the `style` tag is directly next to what the CSS is touching?
```html
<style>
#unique_name {
    /*...*/
}
#unique_name:hover {
    /*...*/
}
#unique_name:active{
    /*...*/
}
</style>
<button id="unique_name">My Button</button>
```
Replace `unique_name` with gibberish as needed.
Once [scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) is ubiquitous you could even do this.
```html
<!-- css-scope elem is an arbitrary elem, this could be a div or whatever else instead-->
<css-scope>
<style>
@scope {
    button {
        /*...*/
    }
    button:hover {
        /*...*/
    }
    button:active {
        /*...*/
    }
}
</style>
<button>My Button</button>
</css-scope>
```
Maybe the gibberish solution doesn't scale without additional tooling and the scope solution will become standard practice in a few years, idk man.

### pre-publishing update

I've discovered that tailwind [addresses](https://tailwindcss.com/docs/styling-with-utility-classes#why-not-just-use-inline-styles) the inline styles thing.
Oop.


Amongst their reasons they write.

> Designing with constraints — using inline styles, every value is a magic number. With utilities, you’re choosing styles from a predefined design system, which makes it much easier to build visually consistent UIs.

Ok, this is something that my alternate solutions doesn't address.
Think that a dependency that specifies CSS variables or SCSS/SASS variables would be a superior solution though.

Oh also I suspect that past a certain complexity working with Tailwind is basically the CSS equivalent of [Dear Sir, You Have Built a Compiler](https://rachit.pl/post/you-have-built-a-compiler/).
## All computers are Finite state machines

Correlary: barring special circumstances your program is functionally equivalent to a super convoluted ReGex.

Proof: do you have infinite RAM and/or disk space?
No?
Then your program is by definition limited by that RAM or disk space to finitely many states.

Q.E.D

Correlary: if you don't have a proof that the halting problem is equivalent to the problem you're solving it's not relevant to why solving the problem is hard/impossible.
This is most relevant to the question "why can't you just quit out when the program is in an infinite loop an keep going when it isn't in an infinite loop".
A correct answer to that question will not invoke the Halting problem, instead it will invoke the inability to generate an accurate time estimate ahead of time (specifics of why varying per task) and or difficulties in recording every prior state.

## 
