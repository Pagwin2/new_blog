---

title: "Pogo so far"

description: "A summary of the work I've done on pogo so far and where I intend to go with it"

date: 2022-01-31

draft: false

---

So in [My last blog](https://pagwin.xyz/blog/gh_actions/), I briefly mentioned a project I'm working on called [Pogo](https://github.com/Pagwin-Fedora/Pogo) and then said absolutely nothing about what it actually is or what I was going to do with it. I did say I wanted to write a blog article on it though and this is that blog article.

## What is Pogo?

[Pogo](https://github.com/Pagwin-Fedora/Pogo) is a todo list I'm working on that I wanted to use as an excuse to learn 

1. [Go](https://go.dev/)
2. [Rust](https://www.rust-lang.org/)'s FFI
3. how to store and retrieve data with [SQL](https://en.wikipedia.org/wiki/SQL) queries/statements
3. how to make UI in [Dart](https://dart.dev/)/[Flutter](https://flutter.dev/) 
4. and how to write [Sphaghetti](https://www.goya.com/media/4173/creole-spaghetti.jpg?quality=80) in C++

I put it this all toegether with copious usage of FFI to connect the Rust, Go and [C++](https://en.wikipedia.org/wiki/C%2B%2B) for the backend and the dart/flutter for the frontend.

## Problems

But recently I've decided that all of that is dumb and unnecessary. Initially it made sense to use the somewhat unwieldy FFI setup because the backend was going to take a struct instead of a string and structs cannot be passed via stdin<sup>[citation needed]</sup>. Once I realized how hard and unnecessary that was due to FFI things I dropped it. With that my architecture was just passing around strings and I realized that my setup is overly complicated for that. So instead of FFI and TCP spaghetti instead I'm going to have ~~subprocess spaghetti~~ each component of the application be separate executables of some kind or another.

## The New Architecture

This description is going to suck so I recommend clicking off if you get bored. For my new architecture there will be 5 components

1. The init script
2. The frontend
3. the front-to-back middleware
4. the back-to-front middleware
5. and The backend.

The original repository that held all the code will have it all removed as the frontend, middleware and backend are developed in separate repositories which are had as git submodules in the main repository which will be where an init script and a build script will be held.

### The init script

The init script is a script that will be running as long as the application itself holding the frontend, middleware and backend as child processes. 

### The frontend

The frontend will accept user input and print it to stdout in a manner understood by the middleware and passing state changes given to it as Pogo messages by stdin to the user. 

### The middleware

The front to back middleware will take messages from the frontend and parse them for the backend to understand and vice versa for back to front.

### The backend

The backend takes messages from stdin and does transforms to the db and accepts queries of it's current state printing out the state to stdout.

## Conclusion

I expected this blog to be longer but I realized as I started to write it that writing about what I had previously done with Pogo was boring because it was nothing interesting. Well there is some interesting stuff in how I previously was working on Pogo but most of that is too tangential for a post on the project itself such as how bad C/C++ networking is, how good networking is with rust after I stopped being an idiot, doing battle with Go's sql library and stuff related to FFI. I may make a blog post or two on these topics in the future but I still need to learn more about them to do them justice. Overall the post was a bit painful to write and I suspect it's also painful to read. Note to self write about a project as interesting stuff comes up not to explain yourself.
