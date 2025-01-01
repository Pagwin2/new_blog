---
title: "Blog revamp"

description: "I redid the blog and made my own static site generator"

date: "2024-12-31"

draft: true

tags: []
---

Hello again 3 people reading this blog. The three being me, the bot gestalt consciousness that seems to have noticed this blog, and a british person named Josh a decade after this post is published. It's been a bit, more than the normal a bit in fact. There are 2 reasons for that, 1) I've been busy when I had blog article topics rattling in my head and 2) I wanted to finish this revamp first. Anyways onto some highlights of making the new site.

(Sorry if you happen to be using a feed reader on my blog, I probably messed up your feed a bit)

## Making the static site generator

### Inspiration

The reason I decided to make my own static site generator is because I came across [this](https://abhinavsarkar.net/posts/static-site-generator-using-shake/) blog article describing a setup in [Haskell](https://www.haskell.org/) (which is a language I have some interest in) using [Shake](https://shakebuild.com/), [Pandoc](https://pandoc.org/) and [Mustache](http://mustache.github.io/). It gave enough info that I was able to get an MVP version up relatively easily.

### Modifications

However I wasn't satisfied with that initial version for a few reasons. 

#### Refactoring the code into multiple files

While the original blog gave a single file setup I found modifying it kinda annoying for reasons I can't put my finger on and have now forgotten. Regardless I split things up into 5 files.

- `Main.hs` entrypoint into the program and where various things come toegether to actually describe the program.
- `Utilities.hs` various utility functions I didn't consider appropriate for Main.
- `Templates.hs` functions related to application of the Mustache templates.
- `Config.h` some configuration constants including where files which should just be copied over are, where posts are located, what misc pages are present and where to dump all the output.
- `Types.hs` a centralized place where I put all the type definitions that were needed for various reasons

#### Adding in robots.txt

This is actually the last addition I made but it's also the simplest, in `Config.hs` I added `"robots.txt"` to the `assetGlobs` list (that list is where all the files which get simply copied over are).

#### Adding a Web Feed

To add a output for a Web Feed I needed to pass all the post objects to a template which generates the feed. So I did that, the original blog this is based on had a posts list page so I basically just had to do a modified version of that. Speaking of.

#### Removing the posts page

More details on this when I get to describing building the site but I realized that the way things were shaking out that it made no sense to have a separate posts page so I deleted support for it from the static site generator.

#### Adding in Typst support

Here's the pain in the ass one I decided to do. I like [Typst](https://typst.app/), it makes making my documents and math homework pretty, easy and Pandoc added support to it semi-recently which partially inspired me to make this. However adding it into the static site generator required that I handle dispatching to appropriate Actions depending on the file extension, reading from a separate yaml file because Pandoc doesn't support grabbing Typst Metadata and plugging all that into a duplication of the code that handles the Markdown except having Pandoc read Typst instead of Markdown.

Wanna know what the worst part is? I'm probably never going to use that functionality for an actual article... yes seriously. This project took long enough that in the back of by dumb brain I realized that

> Wait if they're adding in [HTML support to Typst](https://github.com/typst/typst/issues/721) that might break things for me when Pandoc downstreams their features... Fuck

So yeah... More on that when I discuss what I'm probably going to change in future.

#### Making a github action out of it

I refuse to accept any downgrade in my own long term convenience as such it was imperative that I be able to have pushing/merging in a repo be equivalent to rebuilding and publishing the site. First things first I needed to containerize my static site generator. As such I wrote this `Dockerfile`
```dockerfile
FROM haskell

RUN mkdir -p /github/workspace

RUN cabal update

COPY ./psb.cabal /mnt
WORKDIR /mnt
RUN cabal build --only-dependencies

COPY . /mnt

RUN cabal build

WORKDIR /github/workspace

RUN export folder=$(ls /mnt/dist-newstyle/build/x86_64-linux) && mv /mnt/dist-newstyle/build/x86_64-linux/"$folder"/psb-0.1.0.0/x/psb/build/psb/psb /mnt/psb

ENTRYPOINT ["/mnt/psb", "build"]
```

By the way the static site generator is named Pagwin's Site Generator or PSB for short. Anyways if you think it's a little weird that I separated out copying my cabal file being copied in before building dependencies then yeah it is weird, the reason for that is that docker caches the result of each line of the dockerfile being evaluated and I rarely change my cabal file so by copying that in and building dependencies first I don't need to rebuild pandoc every time I want to rebuild the docker container on my machine. Reason I set the working directory to `/github/workspace` is because I wasn't sure if github did that for me and also it made sense to have a clean working directory in the event I use this for something else regardless. Finally we have that wacky RUN command, the reason for the wackiness is because I don't want to hard code the ghc version into the dockerfile and this was the easiest solution for avoiding that.

Lastly you might be wondering why I didn't separate a container to run the static site generator out from building it like I tend to do for other cases where that's a thing. The reasoning is simple, there's no Haskell container that uses Alpine/Musl libc and I don't want to set one up myself and I kinda don't care about having a separate stage if I can't get it down to just musl libc and SSL certs so fuck it just make a chonky container image.

After publishing this I will probably make a github workflow to build the container because right now site build times in the CI are obnoxiously long due to github rebuilding it every single time.

Asside from the dockerfile I also had to write a `action.yml`

```yml
# https://docs.github.com/en/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions
name: 'psb'
description: 'Use PSB to build static a static site'
runs:
  using: 'docker'
  image: 'Dockerfile'
```

Nothing interesting

## Making the static site

Unfortunately I forgot details on making the layout what I wanted so won't be writing about that.

### Light and dark theming

This site now has dark and light themed versions and will be whichver version you indicated in your browser and/or OS settings. I considered adding a button to let you toggle over between the two in the vein of [this blog post](https://www.joshwcomeau.com/react/dark-mode/) however I decided that the hit to performance for people on iffy/slow connections wasn't worth it. That said I do have an idea that allows for a button without having consequenses for people with iffy connections but I'm not going to implement it on this site due to how complicated it would be. However I do intend to make a demo and write a blog post on that.

### Picking colors

Picking colors was annoying because I wanted colors with good contrast so this site would be reasonable but I also wanted to use colors other than black and white. Doing that in RGB color space is annoyingly difficult to accomplish but I perservered and convergent evolutioned my way to colors which are similar to the default colors for links on the light theme and more interesting colors on the dark theme. This was an even more interesting problem when I had navigation elements that were text which were a different color from the normal links, that styling is still there as a fallback in case the svg icons don't load for some reason or another. Outside of code snippets I did somewhat fail at adding colors though.

### Icons

The navigation icons for this site were picked off the internet looking for a house icon and an RSS icon. Additionally in the footer I'm using [github's official svg logo](https://brand.github.com/foundations/logo)*, asterisk due to the css I added.

#### The CSS I added

I wanted the logos to respond to light/dark theming so I mucked around with the xml a bit to add classes to all the svg elements and set the colors in style tag(s). The style tag(s) set the coloring based on some [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and the properties are set by some CSS imports.

##### Black boxes go brrrr

Problem being that if you do what I just wrote in the obvious way then while the CSS is loading in your icons will have all the coloring be black which for reasons I will get to in a moment will lead to the every icon being a black square for a moment. This isn't great, what makes things worse is that imports

1) block the css below them until they're done
2) have to be at the top of whatever CSS you're writing

However I was able to come up with a mildly cursed solution to this

```xml
...
 <style>
    @layer default-color, import-color, base, print;

    @layer default-color {
    :root {
        --background-color: rgba(0,0,0,0);
        --primary-color: blue;
        --secondary-color: blue;
    }
    }

    @layer base{
        .box {
            fill: var(--background-color);
        }
        .primary_color {
            fill: var(--primary-color);
        }
    }
 </style>
 <style>
    @import url("/static/css/icon-colors.css") layer(import-color);
    @import url("/static/css/icon-print.css") layer(print);
 </style>
```

having imports at the top is fine just gotta have it at the top of a different styling context that immediately follows the one you want to put the imports at the bottom of *taps head*. Also they default to being blue colored because blue has decent contrast in both the dark and light themes and doesn't imply that there's been an error like red would.

#### How the icons appear on the site

I didn't want to have inline SVG so I needed a different way to show SVGs, the way I did that was to use `<object>` tags. The reason I chose `<object>` tags is because `<img>` tags don't do CSS imports for some reason. Only problem with this is that now the anchor links which wrapped around the object weren't applying to clicks so I also need to put them into the svgs themselves which is stupid but it achieves the goal so it's fine. I also added a transparent square that filled up the whole SVG so a slight mouse slip wouldn't make a click not register due to technically being in some cap in the SVG or something like that. That square being why if the CSS isn't loaded every icon is just a black box.

Sidenote: apparently this doesn't work if you're using dark reader which is unfortunate.

### Accessibility work

I want this site to be accessible because browsers do a pretty good job at having the web be accessible by default and I didn't want to break that. That meant making sure my HTML was actually compliant with the [w3c checker](https://validator.w3.org/) which I just ran at time of writing and apparently some of my other accessibility work on the site messed it up after I went and fixed it... whatever it's fine. It also meant setting some aria values, namely all the objects got an `aria-label` and some things needed to be `aria-hidden` and/or get their `tabindex` set to -1. Otherwise I was mostly fine already, I think I went through with [Orca](https://orca.gnome.org/) and it seemed fine but I don't use a screen reader regularly so I may be wrong, sorry if I made things worse.

### Printing css

I also added CSS that makes minor tweaks if you try to print from my site so that it'll hopefully be a more okay document to print/read as a PDF. I don't know if that will ever be used by anyone but I thought it was cool.

### I have very little javascript

But not no javascript, right now I use [HighlightJS](https://highlightjs.org/) to give syntax highlighting for code blocks. However I did have it do it's thing in a worker thread so that it won't muck up page loads. Other than that this is a JS free site, as it should be barring a service worker.

## Changes I intend to make

Alright I think that covers everything about making this site that I think is interesting and doesn't escape the scope of this post so lets talk what I intend to improve.

### Rip out Pandoc in favor of my own parsing

A lot of changes I want to make are downstream of getting greater control of parsing my posts and controlling what HTML is output. I could deal with Pandoc's AST but that sounds unnecessarily difficult and complicated considering that I'm only going to deal with 2 input formats and 1 output format. As a part of this I will be replacing Typst with [reStructuredText](https://docutils.sourceforge.io/rst.html).

### Do code highlights at build time

I don't like needing JS for something that isn't interactive so I'd like to remove HighlightJS as a dependency for this blog. To do this I'll probably use [TreeSitter](https://tree-sitter.github.io/tree-sitter/) in my static site generator.

### Redo the current layout with CSS Grid

Right now this site is a bit of a cludge with flexbox, and I will probably need to redo it with CSS grid to accomplish some of the other things I intend to do.

### Table of contents in the left margin

Similar to how Wikipedia does them but I'm not taking inspiration from Wikipedia, I'm taking inspiration from another blog which took inspiration from wikipedia though unfortunately I forget which.

### Assides/footnotes in the right margin

Don't remember which blog(s) did this one either but I wanna copy them.

### Make a section of the site dedicated to demos

It may ultimately only have 1 demo for all time but I somewhat doubt it.

### Add a service worker to cache CSS and SVG icons

This would just be a notable improvement to navigating this site, no longer being dependant on the browser to cache things which will never ever change.

### Figure out wtf is happening with fonts

For some reason on slow connections fonts will load in, unload in and then load in again. I have no idea why but it's wrong and annoying. I hope I can fix it but I have no idea what the problem is so I don't have much hope.

## Conclusion

I have a bunch of things I can do to improve the site. At this point I'll probably make those changes incrementally as I find the motivation.  For now however I have 2 more blog articles to write before I get distracted.

Oh also Happy New years. Okay bye.
