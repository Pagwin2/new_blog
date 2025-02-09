---
title: "Micro blogs (2)"

description: "a bunch of thoughts ideas and what not that aren't worth of full blogs but that I still want to write down"

date: "2025-01-29"

draft: false

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

## Different ways of making a web app

So, in the classical model of the web there are 3 things you use to make a web app.

- HTML
- CSS
- and Javascript

And generally this is a pretty good way of making a web app and is a very good set of defaults.

However HTML is not strictly necessary, there are two (notable) alternatives which depending on your use case might be preferable.

### JS Canvas

The obvious choice is of course a JS canvas where you just render everything out yourself.
Machine readability and performance be damned.

For some things, like Flutter apps, I think this is dumb.
But for others like Games it's necessary.
Either way this isn't why I'm writing this micro post.

### SVG

The actual reason is SVG.

Yes I'm talking about the vector image format.

No I'm not joking.

You see for making a web app SVG does much of the things you need HTML for while also allowing complete control of the layout.
Of course this comes at the cost of having little to no ability to have that layout respond to different environments and user agents.
But I can see that plausibly being an acceptable cost in some, rare, circumstances, like kiosks for example.

Reason I realized this is possible is... well... you can add [CSS](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/style) and [Javascript](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/script) to  a SVG.
In addition to SVG supporting [outright text](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text) (also [wacky text](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath)) and the [anchor element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a) just like HTML does.
There's [a bunch more](https://developer.mozilla.org/en-US/docs/Web/SVG/Element) but it's mostly for the intended use of SVG of vector images.

Probably would need an editor which gives more access to the underlying XML to make use of this in a practical setting however.

## Text editor [pareto front](https://en.wikipedia.org/wiki/Pareto_front)

This was going to be it's own post but I realized it was boring and I don't know how to make it better right now so I'm mostly abadoning it.

In summary text editors generally live on a Pareto front with trade offs for ease of use vs performance vs power.

Reason I wanted to write was because I stumbled upon an [opinion by Jonathon Blow](https://youtu.be/_MRUmRDzsI0) and felt he over simplified the situation even though I do think he's mostly correct.

I made an [Excalidraw](https://excalidraw.com/) drawing for that post.
I modified the svg export to add a style tag which makes the colors follow Excalidraw's light vs dark theming depending on a css media query.
Thankfully whoever did light/dark theming was super lazy and just did a filter which I could replicate in CSS rather than needing to painstakingly pick every color from their site.
After removing their filter from the XML I just added the following to the SVG.
```xml
<style>
@media (prefers-color-scheme: dark){
svg{
    filter: invert(93%) hue-rotate(180deg);
}
}
</style>
```

Anyways the image is below

<figure>
<img aria-describedby="editor_frontier_image" src="/static/images/editor_frontier.svg"></img>
<hr style="width: 80%">
<figcaption><p id="editor_frontier_image">Triangle with 3 points corresponding to Power, Ease of Use and Low Resource Usage. 
Some editors sit on the points while others are broadly placed on the lines of the triangle without specific positioning</p></figcaption>
</figure>

## Conclusion

This was written over months (maybe over a year?) and is super rambly.
I also have another super rambly post in the works but maybe I'll edit it down (I won't).
