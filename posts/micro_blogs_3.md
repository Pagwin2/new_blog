---
title: "Micro blogs (3)"

description: "a bunch of thoughts ideas and what not that aren't worth of full blogs but that I still want to write down"

date: "2025-04-25"

draft: true

tags: [micro blogs]
---

[Previously](/posts/micro_blogs_2/)

## Haskell's `HasCallStack` specifier should be viral into callees and/or callers

At least within a package, preferably with the option to have this virality to cross packages.
If there are performance concerns of whatever then you can have the call stacked versions be a specialization only called by other call stacked versions.

The reasoning for this is that if you don't have this then `HasCallStack`'s usefulness is very low.
I'm adding it because I'm expecting to need or needing call stack information and I need that because I don't already know every function/value down the chain and I would like to know.
I don't want to be required to find all of those functions by hand when I need this kind of thing.

This isn't a frustration born out of personal experience (yet) but dammit if I don't think it's kinda dumb that manual annotation is necessary to get an automatic trace.

For those not in the know, this.

```hs
something :: (HasCallStack) => Bool -> Either CallStack Int
something True = Left $ error "hi"
something False = Right 3

something2 :: (HasCallStack) => Bool -> Either CallStack Int
something2 = something

something3 :: (HasCallStack) => Bool -> Either CallStack Int
something3 = something2

something4 :: (HasCallStack) => Bool -> Either CallStack Int
something4 = something3

something5 :: (HasCallStack) => Either CallStack Int
something5 = something4 True

something6 :: (HasCallStack) => Either CallStack Int
something6 = something5
```

will give you this call stack when you evaluate `something6`

```
Left *** Exception: hi
CallStack (from HasCallStack):
  error, called at hascallstack_example.hs:10:25 in main:Main
  something, called at hascallstack_example.hs:14:14 in main:Main
  something2, called at hascallstack_example.hs:17:14 in main:Main
```

which doesn't have critical information for figuring this out.
But if I add `(HasCallStack)=>` to `something3` then bam

```
Left *** Exception: hi
CallStack (from HasCallStack):
  error, called at hascallstack_example.hs:10:25 in main:Main
  something, called at hascallstack_example.hs:14:14 in main:Main
  something2, called at hascallstack_example.hs:17:14 in main:Main
  something3, called at hascallstack_example.hs:20:14 in main:Main
  something4, called at hascallstack_example.hs:23:14 in main:Main
  something5, called at hascallstack_example.hs:26:14 in main:Main
  something6, called at <interactive>:4:1 in interactive:Ghci1
ghci> 
```

Full call stack.

this example emerged from the experiment which originally which lead to me initially noticing this and being annoyed by it.
If you copy and paste to try at home without extra junk in the file you'll get different numbers due to this file having other experiments I didn't clear out before doing this demo.

## 
