
---
title: "Mineflayer pains"
description: "Describing all the pains with mineflayer I've dealt with so far"
date: 2021-01-10
---
## Preface
Given I'm gonna be complaining about [mineflayer](https://github.com/PrismarineJS/mineflayer) you may be wondering why I don't roll with something else given my complaints. The problem with that is that there is nothing else to my knowledge or at least nothing else high level, not even in other languages. There probably is and I just didn't look hard enough but oh well. Also I would've built up my own thing from scratch but reverse engineering/reimplementing a network protocol without official docs and without even unofficial docs if you're trying to do stuff with older versions is kinda hard and if you wanna see how far I got then you can look at the [repo with my work](https://github.com/Pagwin-Fedora/McProtocolLearning) and I refused to work with the slightly lower level(relative to mineflayer) [node minecraft protocol](https://github.com/PrismarineJS/node-minecraft-protocol)(made by the same person) because if I'm using someone else's work I may as well go all the way to the highest level
## Why?
Oh yeah I decided to make a minecraft bot because it seemed fun and it seems like there's all sorts of room to implement cool stuff though the specifics of what I'm making will probably be covered in another block post. Anyways onto the problems with mineflayer
## constructor isn't used to create an object
Specifically the thing that's a problem is that when you want to create a new [Bot](https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md#bot) instance you need to call the method mineflayer.createBot. Why have a method completely detached from the object that makes a new instance of that object when you can just make it a constructor I have no idea. You may be wondering "what's the big deal it's a slightly different way to instantiate the object?" the problem with that being that if you try to make a subclass of `Bot` to add methods for your own purposes you have to do janky stuff to work around the constructor not being used. In my case I did
```typescript
class taskBot extends mineflayer.Bot{
	...
	constructor(options:mineflayer.BotOptions){
		const bot = mineflayer.createBot(options);
		super()
		Object.assign(this,bot);
		...
	}
	...
}
```
by the way I'm using typescript in case you can't tell which will lead to another couple of headaches I'll get into soon but yeah using `Object.assign` is absolutely not ideal at all(an as of writing I have no idea if using this hack leads to problems I haven't encountered yet). As an aside there's no reason this problem couldn't be fixed at least from the glances I've given to mineflayer's source code.
## different ways of having a point in 3d space passed to different functions
I hate this with a firey passion and am very happy that it's super easy to deal with this. Okay so you may be wondering "what's the big fuss?" and I'll tell you that different functions will take either a Vec3(I have a small gripe with Vec3 as well but that's not worth making a fuss about) or 3 separate arguments specifying the x, y and z coordinates. Having these 2 approaches means that there isn't a correct form to have positions stored in your program because you'll have to deal with at least 1 form that isn't the form you have them stored in anyways. This problem is an easy fix you can just have an array that stores 3 numbers in it and when you need a Vec3 or need to pass it into a function that takes 3 args use the spread operator as args to the function or the Vec3 constructor.
## typescript hell
As I've already mentioned I'm using typescript for my own purposes. However with typescript there are a couple of problems that come up that are annoying to deal with. Plugins and minecraft-data. 
## Plugins
My gripe with plugins can be further subdivided into how plugins add attributes to the `Bot` instance and how they have the `Bot` instance emit new events. The first problem is that the `Bot` type has a set of attributes that typescript knows about but when you load a plugin for the Bot instance to do something like add pathfinding abilities a new attribute is added to the bot that has all the new abilities within it but typescript doesn't know that the `Bot` instance has a new attribute. The solution I found for this which also removed a bit of complexity from the code was to make a subclass of Bot and add in the plugin attributes as needed which led to the problem already described above involving the constructor. My second problem with the events was that typescript also keeps track of what events an event emitter will emit so if you try to listen for an event it won't emit it'll give you an error. But again when you run a `Bot` instance through a plugin it's type doesn't change so it doesn't get any of it's new events. Sadly the solution for this required me to commit what's effectively a typescript sin.
```typescript
(this as any).once(...)
```
I think I heard an angel die. Of course I personally don't blame these typescript problems on the developer because 1)they wrote this in javascript and mistakes can happen and 2) I don't know how I'd solve them so yeah.
## minecraft-data
this one's short, basically there isn't an easy way to get the type for the object you get when you provide your minecraft version to the `minecraft-data` module. There's probably a way(in fact I'm pretty confident that I'm being an idiot here) but I can't be bothered finding it
## conclusion
mineflayer dev if you're reading this for whatever reason please fix the problems relating to the constructor and consistent arguments to functions that take points. Although for the latter I understand if you can't make it all consistent because it would be a breaking API change in all likelyhood. Overall I think the api is alright and I don't have enough will power or brain cells to remake it for myself but I would certainly appreciate these pain points being addressed if they can.
