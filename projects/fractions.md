# Fraction Generator

See also: [The blog post about this](/posts/fractions_sidequest/)

## The what

This was a project I did for fun which generated a bunch of fractions by starting with 2 seed fractions, adding them toegether like vectors and then repeating for all adjacent pairs of fractions over and over again until a desired number of fractions were generated.

A bottleneck caused by misusing insertion into a `Vec` made things slow until it was removed.

## What was learned

1) Rust's `async` functionality is not a great fit for recursive computation.
2) Be careful with stdlib functionality, it can occasionally be used to footgun
3) Initial solution should be as simple as possible and then expanded in the natural direction of complexity for speed (or the direction indicated by benchmarking) rather than done for speed from the start.
