---
title: "Making a platonically ideal light/dark theme toggle on the web"

description: "And exploring other solutions along the way"

date: "2025-08-20"

draft: false

tags: []
---

## What Does it Mean to be Ideal?

For the purposes of this article an ideal theme toggle has the following properties.

1) The page will have one of two states at all times, light and dark
2) On first page load the state should match `@media (prefers-color-scheme)`
3) When the toggle is clicked the light/dark state will be changed
4) The current state of light/dark should persist between reloads
5) The visible theming of the page should match the current light/dark state
6) 5 should be accomplished as inconspicuously as possible
7) The above should be done with progressive enhancement
8) The above should be done with minimal impact on browser optimizations

The purpose of the first five points should be reasonably apparent.

If the page can't be in a state of light or dark then what's the point of the toggle between the two.
Having the page have both and not match `prefers-color-scheme` on the initial load is an anti-pattern.
Having the button change the state is the entire purpose of what we're trying to do.
If the state doesn't persist then using the button becomes a chore that needs to be done on every page load in order to get any benefit.
And the page visually matching the state is a fundamental part of this being for theming.

The remaining points are there to address shortcomings that occur with current implementations of the first 5 points.

Point six exists to address the "flash of white" from JavaScript which affects the styling taking a moment to load. (called "flash of white" due to a common pre-javascript default being the light theme)

Point seven is because we want to give the best experience possible even under suboptimal conditions.

Point eight is so we can avoid breaking browser optimizations to our site's load time.

## Demo Caveat

It's expected that most readers will be reading this article from a decently powerful device with a good internet connection on a modern browser and are unlikely to be disabling scripts.
However most of the "issues" with these various solutions stem from circumstances where one of those circumstances are false.
Furthermore issues that fall under points 6 and 8 only become particularly apparent on pages with some "girth" (dare I say bloat) to them, as such it's expected that all demos, being rather lightweight, will at first glance pass certain criteria even if they don't.

So I am relying on some amount of the reader taking me at my word regarding certain implementations failing some criteria.

## The Obvious Way

[demo](/static/demos/light-dark-demo-1)

The obvious way to attempt a toggle between light and dark mode is to just have a script (asynchronously loaded for point 8) with a button which runs a function to update `localStorage` and update the DOM in a way which changes what CSS is applied.
Then on reload the Javascript checks `localStorage` and does the DOM change immediately if needed.

Unfortunately this solution runs afoul of points 6 and 7.
To be more specific in some circumstances we can get a "flash of white" effect where the default briefly shows before being overwritten by the Javascript which goes against point 6.
Furthermore if we don't have Javascript we have a useless button and might even fail on point 2 (depending on implementation specifics).

## A Tradeoff Between Points 6 and 8

This section is based on the [solution Josh Comeau uses](https://www.joshwcomeau.com/react/dark-mode/).

[demo](/static/demos/light-dark-demo-2)

For those who haven't read Josh's article what we're doing is preventing the browser from rendering the page until our Javascript which changes the DOM has run.
In Josh's version this is done with a `script` tag which blocks processing of the page below the script tag until the script tag is fully ran, updating the DOM to match the desired style.

This of course comes at the cost of some amount of performance as blocking the browser from doing work means that the work gets done later.

We can mitigate this a bit by adding `blocking="render"` to the script instead of having the script be fully blocking but this is still not ideal.

For the curious read [this](https://csswizardry.com/2024/08/blocking-render-why-whould-you-do-that/) for more info on what `blocking="render"` does.

## A CSS Only Solution

[demo](/static/demos/light-dark-demo-3)

As a bit of a tangent there's an interesting solution available to us via `:has` and `:checked`.

We just have the checkbox being checked toggle us away from the system setting to the alternate styling using a selector like.

```css
:root:has(#light-dark-toggle:checked) {...}
```

With the body setting whatever css variables and element attributes to their toggled variants.

This version doesn't represent its light and dark states directly it derives them from the system setting and the toggle state but the representation was always an implementation detail.
Readers who went into dev tools for the prior demos will have already noticed that rather than having light and dark states explicitly in the CSS I just have a toggled class which swaps to the alternative from the system setting.
In those examples that was to keep the CSS and Javascript simple but in this case it is simply the only option available to us.

Unfortunately this does fail at point 4, this solution can't persist the checkmark state without either an additional click to submit a form or Javascript.

Speaking of forms though.

## An (Almost) Ideal Solution

[demo](/static/demos/light-dark-demo-4)

If Javascript running once the page starts loading doesn't work because Javascript is expensive to run and violates progressive enhancement and a solution with CSS can't persist across reloads then what can we do?

Well there is one way we can change the DOM without Javascript, and there is one way we can persist state without Javascript…

The backend side of web development is a pathway to many abilities some consider to be unnatural.

To be more specific we can make an endpoint which sets/unsets a cookie before redirecting back and then have anything which gives back a full HTML page back as a response make whatever changes correspond to the theme change, or we can swap out the stylesheets we give the user, if we're feeling deranged.

Then we can make an HTML form which goes to that endpoint, with the current page URL as a hidden form field because unfortunately browsers don't give the referer header when submitting forms.

Then to give users with Javascript a better experience we can have the script intercept the form submission to just make the DOM changes itself and send the HTTP request in the background.

Mark the form as hidden and show it with CSS among other minor changes and this solution hits every point perfectly.

That said the demo above doesn't do that because

1) It's meant as a demonstration of the technique not a perfect implementation
2) I don't want to have a demo which depends on a proper backend because I intend to keep this blog on static site hosting, like Github pages (the current choice), for the foreseeable future and because having a demo depend on some deployment I will never care about seems like a good way to have the demo break

As such the demo uses a service worker and because service workers can't access cookies I use IndexedDB, furthermore because service workers can't access DOM APIs the DOM manipulation is done by a hard coded string replacement.

### Update: Added `view-transition`

Default view transition via

```css
@view-transition {
    navigation: auto;
}
```

Makes this technique slightly better visually and so I added it to the demo. Although not sure if/how I'd add it to a real world application which doesn't have a pretty robust system for view transition setup.

### Update 2: Made js button also use view transitions

via: [document.startViewTransition](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition)

## Why Don't I Have a Light/Dark Toggle Button on This Blog?

Because doing it correctly is more effort than it's worth, I don't want to do it incorrectly, and for most people their system preference will already match what they want.
