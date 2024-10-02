---
title: "How this website was made"
description: "It's with hugo and the rest of this is probably gonna be short and boring viewer discretion is advised"
date: 2020-09-30
---
## Prelude
Before we get to how I actually made this site let's discussed how I failed to make this site(repeatedly). I was inspired to make a simple website/blog from [this blog post](https://k1ss.org/blog/20191004a), I rapidly regretted having that as my main inspiration. I tried setting up scripts for generating pages using the output from pandoc, making the pages look nice and what not as well as make a script for generating an rss feed but rapidly realized that all of this was going to be a pain and gave up. Rinse and repeat a couple of times over several months to a year or so. 

## Actually making this website
One day(2 days before this post was written actually) I was browsing reddit when I came across [this comment](https://www.reddit.com/r/linuxquestions/comments/j0wcfj/i_hand_you_a_computer_with_a_minimalistic_install/g6vxxxj/) and realized that I'm an idiot because static site generators exist and what I had previously been doing was basically writing my own, I may still write my own but more so as a project on it's own than as something that's contributing to something else. After that work went relatively smoothly with me spending the first day learning what the fuck hugo(no I didn't do my research into static site generators don't judge me okay) is then on the second day I actually started to get into writing all the stuff for the site. For my theme as you may already know if you've looked at the footer for this website I'm using liquorice as my theme. I chose it for being simple, very nice for reading text(what I expect will be the main thing that's done on this website) and because I just liked the overall feel. There were some aspects that I felt the need to improve though such as the homepage being a bit more than just a list of every page on the site, something about lists(I don't remember what), making the subsections of these blogs and other pages in the future jump points in case I write something that would actually benefit from those jump points and not just a short one page piece and finally making the links actually look visually distinct from the text beyond simply being bold. There are probably other changes I'm forgetting and in the future I expect I'll tweak this further but that's all for now. Some of those tweaks will be me making the website smaller and more compressed following the original spirit of that kiss blog and I can already see some points where I can shave some size off but that's a story for another time.

## Making the jump points
most of those points are pretty easy if you read hugo's documentation and are willing to try random things but the jump points are a slight challenge and something worth writing about in more detail. First things first ignoring all this being generated from markdown causing some oddities how do we make a jump point on a webpage? Well with anchor tags of course!
```html
<a name="some_name_or_something_idk" href="./#some_name_or_something_idk">some content doesn't matter</a>
```
this is nice now if somebody goes to example.com/#some_name_or_something_idk their browser will jump them straight down to wherever that anchor tag is. But it doesn't jump to the anchorblock when we click on it it simply sets our url and if we reload it jumps to it. *Editor's note: as I write this I'm unsure if I'm an idiot who didn't need to do the work with this javascript I'm about to talk about so it may well be possible that it's unnecessary and the above code already does that*. So in order to fix that we'll be adding an event to our anchor element like this.
```html
<a name="name" href="./#name" id="name">some text</a>
<script>
    let elem = document.getElementById("name");
    elem.addEventListener(event=>{
	    event.target.scrollIntoView();
    });
</script>
```
Technically the event could be added by adding an onclick parameter to the anchor element in the dom but we we start dealing with another problem which I'll get to after explaining this it'll be way cleaner to just use `addEventListener` anyway the code is relatively self explanatory but I'll explain it anyways. Our element has an id that we attached to it by adding the parameter `id="name"` we can get our element in our code by asking the browser to give our element to us using the id as a reference to find the element with the method `document.getElementById`. We could totally just use `document.getElementsByName` and take the first element from that but I personally chose to add and use the id. With `addEventListener` we can attach a function that'll be called when an event fires in this case the click event for when the user clicks on the anchor element. The function in question take the event object given to it and takes out the dom element that was actually clicked on with the target property. We then scroll to that dom element with scrollIntoView. Now all we need to do is have it so that when we write out our header elements we just surround them with anchor elements and... wait.

## We didn't write those header elements though
Oh yeah we didn't write the header elements in the first place they're written in from whatever markdown generator that hugo uses. Well how do we handle this? There may be some way of changing how hugo generates html from the markdown but that sounds hard let's just write some javascript.
```js
let elems = document.getElementsByTagName("h2");
for(let elem of elems){
    elem.outerHTML = `<a name="${elem.innerText}" href="./#${elem.innerText}" id="${elem.innerText}"><h2>${elem.innerHTML}</h2></a>`;
    document.getElementById(e.innerText).addEventListener('click', event=>{
	    event.target.scrollIntoView();
    });
}
```
Ok so you already understand that last bit with the event listener and what not so allow me to explain the rest. `document.getElementsByTagName` is the same as `document.getElementById` except it gets more than one element and does it by their tag name. The for loop iterates through all the elements we just got and through each iteration we can refer to the element we're on by the variable `elem`. The parameter of `outerHTML` isn't used very often `innerHTML` and `innerText` are used more often because most people only want to control the text inside of a dom element but want to leave the outer tags untouched but in this case that's useful because we actually want to add anchor tags around our header tags which is what we do. Hooray the problem with the markdown generation not allowing fine enough control was solved. Now about adding that script in to do that work.

## Adding the script in
You'd think this was simple and it kinda was but keep in mind that I've only been using hugo for less than 3 days at this point. Besides that I also only wanted this script in the single pages or the pages that blog/articles/whatever were on and not on list pages which list out all the pages as the list pages also used h2 elements but I didn't want the h2 elements there to be modified by this script. Thankfully this was easy because I had shortly before hand wanted to do something similar with a stylesheet but man adding in that stylesheet had some nuisances. The first thing I found of use for this purpose was [cond](https://gohugo.io/functions/cond/) but I still needed to figure out how to test for whether the page was a list or not so I started looking through hugo's page variables and I found 3 candidates for this `.IsNode`, `.IsPage` and `.IsSection` with the last one just being the negate. I got somewhat frustrated when I found none of these useful for what I was trying to do. Eventually I stumbled upon `.Kind` and bumbled about a bit trying to figure out how to test for a `.Kind` of page until I found [eq](https://gohugo.io/functions/eq/). So great I now can test for whether a page is a page I want the stylesheet applied to so
```html
{{ cond (eq .Page.Kind "page") "<link rel='stylesheet' href='{{.Site.BaseURL}}/css/single.css'>" "" }}
```
should work right? Nope nope nope for multiple reasons nope. For one thing trying to put the base url with curly brackets didn't work because apparently hugo doesn't do curly brackets in curly brackets also when I opened the page in a browser the tag and all the tags beneath it(which were placed in the head in the partial template btw) are now in the body??? Also I made it seem like I had solved the cond thing before this came up but that was happening at this point as well. So first things first how do we put a variable midway through a tag that we're inserting? Well apparently the answer to that is [printf](https://gohugo.io/functions/printf/)(I personally would've named it something like format rather than printf even if it uses something called printf internally but maybe that's just me) so now we have.
```html
{{ cond (eq .Page.Kind "page") (printf "<link rel='stylesheet' href='%s/css/single.css'>" .Site.BaseURL) "" }}
```
which is closer but it still jumps into the body for some reason. That reason as it turns out is because Hugo ~~being somewhat annoying because it decides not to warn you for failing to be explicit about whether you want a tag as a tag~~ being very cool and safe escaping all the tags to prevent cross site scripting/injection or whatever else problems in code that you're explicitly writing out in a folder for templates. Ugh anyways after running the output of the printf through [SafeHTML](https://gohugo.io/functions/safehtml/) we get this final iteration that works how I want it to of.
```html

{{ cond (eq .Page.Kind "page") ( safeHTML (printf "<link rel='stylesheet' href='%s/css/single.css'>" .Site.BaseURL)) "" }}
```
Nothing about this changes for the script that we want on our blog pages only other than that we replace link with a script tag.

## Conclusion
This was fun and I'm glad I found out about the existance of [hugo](https://gohugo.io/). I'll probably update this site in the future and this blog will probably get outdated but unless I decide the site looks almost completely different run into a very annoying or interesting problem or completely remake the site for osme reason or another I probably won't update this blog or release any other blogs with updates on changes I make to this site(and knowing me even when those things come up I probably won't write about them) one of the things I want to change is the links to different platforms/feeds/whatever but based on already made efforts I think I'll save that for another time.
