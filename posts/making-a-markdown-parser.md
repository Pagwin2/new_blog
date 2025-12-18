---
title: "To make a Markdown* parser"

description: "I made a Markdown parser for the static site generator powering this site"

date: "2025-12-13"

draft: false

tags: []
---

Hello again.

If you're wondering why I did this then see [the prior post on redoing things here](/posts/new_blog_who_dis/).
Specifically the part where I say:

> A lot of changes I want to make are downstream of getting greater control of parsing my posts and controlling what HTML is output.
 I could deal with Pandoc's AST but that sounds unnecessarily difficult

So yeah, that.

## A Slow Start

I've been procrastinating this for basically a year for the simple fact that making a grammar for Markdown is rather intimidating and I thought it would help more than it did.

Looking over the LLM chats it seems I had Claude make an EBNF grammar about 6 months ago alongside a reStructuredText grammar because I was ambitious to a naive degree.
Then I realized the Markdown grammar didn't support HTML which I need for some fuckery in my posts.
Then I got it into my head that backtracking would make understanding things really annoying.
In retrospect that was dumb because parsing Markdown without backtracking involves either being stricter about what compiles than Markdown is or doing a bunch of parsing logic via error handling which is so annoying that I didn't think of it until I wrote this sentence.

Regardless though I got a grammar and oh boy did I sit on that grammar for 5 months doing nothing.

## A Few Shaky Steps

But then early in November I stopped being stubborn about implementing the parser myself and had Claude turn the grammar into a Haskell Parsec parser.

This led to a very buggy parser.
So buggy in fact that at multiple times while debugging it rejected some input.
So buggy that I went and actually setup proper tests for it... eventually.

And so I spent about a month of me slowly debugging this parser until a few days ago I hit a bug that baffled me so much that I decided to just rewrite the parser from scratch.

I do not and do not ever intend to figure out what exactly was going wrong but the symptom of the mistake was that an ordered list in one of my blog posts was just... not working for some reason.
The parser just interpreted it as a normal paragraph.

To be clear other ordered lists were fine it was just this one, the real kicker being that I had no idea how to reduce it down to a test case.
So yeah I gave up and started over doing things by hand this time.

## Everything falls into place

But my month of debugging wasn't for nothing.
This time going in I had some idea of how to make this parser and how it should work.
Additionally I already had tests to pit the parser against which made the feedback loop for debugging much faster.

And so it only took me 5 days to get everything working again.

## However...

There are some caveats. These caveats being why Markdown has an asterisk next to it in the title for this post.

Firstly I don't implement character escaping and handle inline html in a way which prevents it from being able to save me from this decision.
I could fix this but I'd rather not because it seems likely to cause more bugs I'll need to fix.

Secondly and more fundamentally is the way I determine a block element ends is simpler and less robust than proper Markdown would allow for.
Namely in my Markdown dialect, all block elements are separated by two newlines no exceptions.

This means stuff like

```md
# header
some paragraph text here
```

Will get turned into

```html
<h1>header
some paragraph text here</h1>
```

instead of a header and then a paragraph and

```md
some paragraph text
1) a
2) b
3) c
```

gets turned into

```html
<p> some paragraph text
1) a
2) b
3) c
</p>
```

instead of a paragraph followed by an ordered list.

Thankfully I'm the sole user of my static site generator so I just... tweaked my posts to match.

## Conclusion

Stuff on this site may break in various ways and places due to this change so if you notice something please let me know.

Another thing which I noticed which didn't warrant a section is that this sped up the build time for this blog noticably which is a fun little accident.

I'm also planning on doing CSS and Javascript minifying/file fingerprinting next so that may also break things albeit in more obvious ways.
