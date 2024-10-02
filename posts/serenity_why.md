---

title: "Serenity pains"

description: "A rant against how serenity forces the developer to handle state"

date: 2022-09-01

draft: false

---

This is the second blog article I've written dissing on how a library does something, the [first time](/blog/mineflayer_why) being effectively "Mineflayer doesn't do things the way I want it to and that annoys me". This article will probably follow in that tradition but unlike the Mineflayer one where I would've been inconvenienced to do what I want with Serenity I need to make my code potentially unsound to do what I want.

## What is Serenity?

[Serenity](https://crates.io/crates/serenity) is a rust crate that can be used to create discord bots. I've used it a couple of times without issue mainly for [DBMS](https://github.com/Pagwin-Fedora/DBMS) and [frame yeet](https://github.com/Pagwin-Fedora/discord-frame-yeet), very professional names I know. However the issues come up when you want mutable state in the [event handler](https://docs.rs/serenity/0.11.5/serenity/client/trait.EventHandler.html).

## No mutable self

For all the events in the event handler self is passed as a non-mutable reference. Which means you can't change any state in your event handler. Serenity... why? Have you not considered the possibility that someone may want to initialize something in their event handler after the bot has started or to have the response to events change due to previous events?

## Yes they did consider the possibility

It's why they pass a [Context](https://docs.rs/serenity/0.11.5/serenity/prelude/struct.Context.html) struct which has a field called data where data can be stored in a [TypeMap](https://docs.rs/serenity/0.11.5/serenity/prelude/struct.TypeMap.html) which mostly solves the inability to have mutable state. Keyword **mostly**

## Drop the state

The issue is what happens if the state being stored is attached to something else and you want the state to be dropped when that something else is dropped. Well in that case you just have to suffer in some way or another. You obviously need to implement the [Drop trait](https://doc.rust-lang.org/std/ops/trait.Drop.html) which means the struct needs to store a way to refer to the TypeMap in itself. But Serenity doesn't have a way to do that before you've constructed the client. The [ClientBuilder](https://docs.rs/serenity/0.11.5/serenity/client/struct.ClientBuilder.html) has the type\_map method if you want to provide one but that moves it which means you can't hold onto a reference to it that can be used in our Drop implementation. The ClientBuilder also has a get\_type\_map method which gives a reference to it's type map. But because it's a reference we can't give it to the thing that wants to potentially get rid of something in the TypeMap. Which leaves only ugly and uglier options for dealing with this.

## Ugly solutions

The first solution to this problem is to tell serenity to go fuck itself and write unsafe code convert self to a mutable pointer which we mutate in the ready event to initialize state within the handler with the Arc<RwLock<TypeMap>> that's provided by the Context struct. The second solution is to give up on having Drop clean up the TypeMap at the same time. Personally I think both of these solutions suck and wish that I wasn't forced to pick for the program I ran into this problem for.

## Conclusion

This is the only Serenity specific problem I've run into using this library though so I'd say it's a good library overall. So yeah, back to actually writing code instead of blog articles for now.
