---

title: "Yeeting the distractions and setting goals"

description: "So recently I've begun work on trying to remove distractions so I'm more likely to work on productive stuff and this blog is effectively a lightning round of things I did to accomplish that"

date: 2022-09-01

draft: false

---

So recently I’ve engaged in a renewed push to be productive somewhat consistently and this time it just may work(unlike the 3-5 other times). With this push, I’ve decided to begin moving off of youtube by going down to my subscriptions. In order to do that I implemented a few small projects.

## Getting the feeds(but not really)
So to enforce that my initial plan was to only watch the content I saw through an RSS feed, preferably via mpv. In order to do that I needed a list of channel ids corresponding to the youtube channels I was subscribed to. In order to get that I could’ve gone through and manually gotten each channel id through youtube’s web interface… But that would take forever and ain’t nobody got time for that manual labor when you can spend twice as long automating(although doing that automation gave me experience that may save me time now). So to do that I looked into google’s [Youtube Api](https://developers.google.com/youtube/v3) and found a way to get a list of [subscriptions](https://developers.google.com/youtube/v3/docs/subscriptions/list). But to make use of that I’d need to go and learn how to do stuff with OAuth. Thankfully after faffing about a bit I realized that there’s an [npm package](https://www.npmjs.com/package/googleapis) that does a lot of that work for me. Anyways with that, it was time to ~~steal example code~~ write software, oh hey where did all that preexisting code come from?

## Oh the callbacks

Well, that code came from [here](https://developers.google.com/youtube/v3/quickstart/nodejs) and oh my god do they use callbacks. Personally, I think callbacks suck and are the worst way of having some sort of asynchronous task. So I did a decent amount of refactoring to convert things to use promises. However much to my chagrin I found that I couldn’t use async await because apparently the npm package didn’t return normal promises, or maybe something else was happening I’m not entirely sure looking over the code now with intellisense but trust me when I tried back when I was figuring this out it didn’t work and it was annoying. Though that said I also don’t know why I couldn’t/wouldn’t convert from the weird promises to normal promises due to that being relatively easy with js’s promise api but I digress.


## Getting the subs

I don’t remember if I implemented the code that got my subscriptions concurrently with the callback refactor or if I did it after. In any case, all of the code to get the subscriptions is 2 relatively small functions.

```js
function getSubscriptions(auth, page) {
    var service = google.youtube("v3");
    return service.subscriptions.list({
	    mine:true,
	    auth,
	    maxResults:50,
	    part:"snippet",
	    pageToken: page ? page:""
    });
}

function handlePage(authority,response){
    let items = response.data.items;
    for(let item of items){
	    console.log(item.snippet.title+" ".repeat(60-item.snippet.title.length)+item.snippet.resourceId.channelId);
    }
    if(response.data.nextPageToken){
	    getSubscriptions(authority, response.data.nextPageToken)
		    .then(handlePage.bind(null,authority))
    }
}
```
Yeah, pretty simple but allow me to explain what bits of these 2 functions are doing and why.
```js
var service = google.youtube("v3");
//...
let items = response.data.items;
```
Both of these are done primarily for convenience so I'm not writing the same thing over and over again. If you notice the service one uses the inferior var instead of let it's because I was lazy and didn't change that bit from the example code. And now that I'm done with the bit you can find that code [here](https://developers.google.com/youtube/v3/quickstart/nodejs).
```js
    return service.subscriptions.list({
	    mine:true,
	    auth,
	    maxResults:50,
	    part:"snippet",
	    pageToken: page ? page:""
    });
```
The only other bit of code in the getSubscriptions function just calls the method in the npm package to make a request for the subscriptions of the user who provided Oauth authorization, 50 results at a time specifically giving things under the "snippet" category of data. For the pageToken bit what it's doing is if it's null/undefined it specifies it as an empty string so we get the first page and if it's not then it's just itself so we can get the next page.
```js
for(let item of items){
	console.log(item.snippet.title+" ".repeat(60-item.snippet.title.length)+item.snippet.resourceId.channelId);
}
```
This bit of code just outputs each of the fetched channels' names and their id such that all the ids visually align for the part of my brain that wants everything to look neat. The reason I wanted things in this format was that I wanted to manually filter out the channels I didn't watch so having the channel name with the id would make it faster to get through for the obvious ones. The reason I was console.logging instead of writing to a file via the fs module was because I was lazy and decided to just have the information output via stdout and redirected to a file via a > operator in bash.
```js
if(response.data.nextPageToken){
	getSubscriptions(authority, response.data.nextPageToken)
		.then(handlePage.bind(null,authority))
}
```
This last bit of code checks to see if there's a token for the next page of subscriptions and if there is it gets them, providing the nextPageToken to do just that in the getSubscriptions function and once the new response pops up it sends it to handlePage. More specifically what happens is I use the bind method of js functions as a way to have a partial function which can otherwise be said as a function that already has one of its arguments passed in. Until somewhat recently I wasn't aware you could use bind like that but one time when I was commenting an amount of annoyance at js not having a built-in function that allows for the easy construction of partial functions like Python's functools.partial or Haskell's function currying built into the language in a discord server a friend pointed out that the bind method can be used for that so the more you know I guess.

## Why I specified but not really for getting the feeds

As it turns out what I wanted could be better accomplished by self-hosting an [Invidious](https://github.com/iv-org/invidious) instance. However, my weird format that I had of my subs wouldn't work and I didn't want to redo filtering out channels I don't want so I decided to make a script that would make an opml file which is one of the file types that invidious could import. To do that I wrote a rust script.
```rs
use std::fs::File;
use std::io::Read;
pub fn main() -> std::io::Result<()> {
	const START:&str = "<opml version=\"1.1\"><body><outline text=\"Imported Youtube Subscriptions\" title=\"Imported Youtube Subscriptions\">";
	let mut file = File::open("channels")?;
	let mut buf:String = String::new();
	file.read_to_string(&mut buf)?;
	let middle = buf.split("\n")
		.filter(|v|v!=&"")
		.map(gen_middle)
		.collect::<Vec<String>>()
		.join("\n");
	    
	const END:&str = "</outline></body></opml>";
	print!("{}\n{}\n{}",START,middle,END);

	Ok(())
}

fn gen_middle(line:&str)->String{
	let tokens = line.split(" ").filter(|v|v!=&"").map(String::from).collect::<Vec<String>>();
	let name = tokens[0..(tokens.len()-1)].join(" ");
	let id = tokens.last().unwrap();
	format!("<outline text=\"{}\" title=\"{}\" type=\"rss\" xmlUrl=\"/feed/channel/{}\"/>",name,name,id)
}
```
TLDR on that whole bunch of code is I have a constant string as the start of the file which gets output. Then there's a middle that's generated from the list of channels in that weird format the previous script generated such that every entry gets put into the template `<outline text=$channel_name title=$channel_name type="rss" xmlUrl="/feed/channel/$channel_id"/>"` and then all the channel entries are joined together. After that, I put a constant value at the end to close everything up. Developing that script there was a bit of a hiccup where Invidious wouldn't take it because the channel name only had the first word due to me making an initial mistake which I eventually fixed.

### Wait what about hosting an Invidious instance?

Oh yeah, I should probably summarize that process. I tweaked a config file in a couple of places so it fitted my particular use case. I added entries to my /etc/sites-enabled/ and my DNS, then ran Certbot. After that with a simple `docker-compose up -d` with the provided docker-compose.yml file and it worked without anything worth commenting on happening.

## Conclusion

So that was a lot of words to describe something that only took maybe 6 hours altogether over a couple of days. That said I hope to do a bit more to keep myself on task, specifically, I want to set up a discord bot that will dm me the tasks that I have in google tasks(which is why I mentioned doing that youtube api automation may end up saving me time) and notion every day and my larger goals each week. So that'll be an interesting short little project when I find the time. Then once that's done I can finally return to my little overengineered todo list [Pogo](/blog/pogo_so_far) where I scrapped the very small amount of code I wrote following the spec I wrote in a previous blog and will probably implement in Erlang instead. Though before any of that I need to make a blog post ranting about serenity and give into implementing a bad fix to a problem their api caused. But after all that I can continue work on that libvirt util in Lisp. Anyways with all of that rambling out of the way I wish the reader of this a nice day.
