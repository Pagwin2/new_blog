---

title: "Bits bobs and notes from HackBU 2024"

description: "A summary of my experience, lessons and thoughts on the HackBU 2024 hackathon"

date: "2024-02-20"

draft: false

---

# Hi :)

Over the last weekend I went to [HackBU 2024](https://hackbu.org/2024/). This blog post is me writing about it (maybe not fully coherently). Also as an aside I went to the 2023 hackathon as well but I didn't write about it, oh well.

## A reminder that I can do things quickly

As with last year<sup><a href="#1">1</a></sup> I worked on a project solo. Also like last year I was able to successfully get out a prototype of that project though unlike last year the prototype didn't completely work. But I'm getting ahead of myself, I should probably describe what I built before going into detail about my dissapointments in it.

## What I built

In Binghamton there are 2 bus systems, 1 is provided by the county and the other is provided by the university. The university buses were not in google maps meaning google maps wouldn't show routes involving them. As such I was going to build a system to make it easy to get a route using either or both bus systems.

This might seem ambitious at first but it was actually quite simple, all I had to do was reverse engineer 2 live maps to get the data on bus routes from their apis, use google's route api to get the travel time of the buses through their routes, calculate the best route from point A to point B with the retrieved bus routes and learn google's map api to visualize the data and build a simple frontend to overlay on that for the user to give input into...

I swear it sounds harder than it was.

## Oops a bit too much scope

Did I mention that I was planning on being even more ambitious than what I just described by using the live bus positions and past history to try and calculate when a bus would arrive at a particular bus stop and that point A and point B would've been proper addresse if I hadn't cut back on scope?

So yeah before anything I wasted an hour or 2 working on setting up an ORM that I didn't use. But after that I got to work on useful stuff.

## Work begins

First things first, I had to get the data. Now you'd think that reverse engineering a bus live map would be hard but as it turns out it's pretty easy at least for what I'm doing. It was literally just

1. go to live map website

2. open up the network tab of the browser dev tools

3. refresh the page and search for the words "bus", "route" and "stop" in the requests

4. click on the obvious results and use brain to figure out what json fields like "name" and "stops" and "lat" and "lon" could possibly mean

conveniently the Hackathon can't really prevent prior work that isn't code so all of the api reverse engineering was done the day before the hackathon so the time wasted on ORM stuff canceled out.

## Why yes I do prefer non-linear story telling

That reminds me I should probably mention why I was working on this solo as well as what I'm even using to build it. So unlike last year I did try a little bit more to get a group to work on something with but none of the other ideas were interesting and the people I was hoping to group with assumed I'd be fine on my own. Which they were right but I'd have liked the help if only so I could've increase the scope a bit. 

But yeah once it was clear I'd be working on my own I decided to go with a language I was comfortable with and that I knew had all the tools I needed. That language being [Rust](https://www.rust-lang.org/). [Tide]() for the http server backend, [Reqwest]() for making http requests to various apis, [SerDe]() for serializing and deserializing json, and some other libraries which aren't interesting to list out<sup><a href="#2">2</a></sup>. 
## Corners cut

I'm not going to talk about the overall development process because it's boring and mostly obvious stuff. However due to being solo and only having 24 hours I did need to cut some corners. 

First at the start of actual work I only expected to get an api done but no frontend, however the main bulk of the api was done before I started really getting tired so I had plenty of time to get a frontend with google maps out.

However I did have to cut many corners for finding an optimal route. Firstly I didn't do a graph search at all. If the optimal path used more than 2 buses or had more than 1 bus without stopping at either the university or the greyhound station then my system wouldn't find it. The reason for this was because my system only checked 3 types of route to get from where you started to your destination. Single bus, bus to Binghamton university then transfer to another bus and bus to the greyhound station then transfer to another bus. This was because having used the buses myself I know that those 3 methods will work pretty well for getting you from point A to point B and doing a proper search seemed like a lot of work.

Another corner I cut was on the heuristic for how good I considered a route. A good heuristic would take into acount walking distance, waiting time and bus transit time. My heuristic was to minimize euclidean distance from the starting position to the bus stop added to the distance between the bus stop they got off at to the destination. Which leads to both obvious and subtle incorrectness in measuring how good routes are but it works well enough so whatever.

An accidental corner I cut was that uuuh I might have forgotten/ran out of time to put logic in to make sure we aren't trying to go backwards along a bus route. 90% of the time this doesn't matter though so eeeh.

The time estimate for travel is divided by 3. I don't know why Google Routes gave me time estimates which were higher than necessary.

I was going to deploy this with docker/docker-compose instead of messing with CORS but more on that in the stories.

Broome county buses visually have straight lines between the bus stops instead of following the road. I'll talk about this a bit more when I get into the stories but for now all you need to know is that the reverse engineered live map doesn't give me the path and using google routes was something I thought I didn't have time for until right now as I'm writing this... Fuck.

## Story time

### The fucking s

I haven't run into someone who's tried to claim Google is really good at software yet but if I do I will bring this up. So when I was using the google routes api to figure out how long it would take I noticed that the time format looked something like "250s", so for about a minute I was panicking because "oh god am I going to have to parse out time units and standardize it" but after sending a request for a route frome LA to NYC I got back another time with an s so it's in seconds but dammit if google's documentation doesn't say that.

### prematurely closes your connection, refuses to elaborate

Here's a docker compose file

```yml
version: "3.3"
services:
  backend:
    build: .
    ports:
      - 9090:80
    restart: unless-stopped
  frontend:
    build: BBB_frontend
    restart: unless-stopped
    ports:
      - 8080:80
    depends_on:
      - backend
```
and here's an nginx config
```
worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
        location /api/ {
            proxy_read_timeout 300s;
            proxy_connect_timeout 75s;
            proxy_send_timeout 60s;
            proxy_pass http://backend/;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
}
```

see any problems? no? Neither do I, no idea why I...

```
2024/02/18 07:57:20 [error] 30#30: *1 upstream prematurely closed connection while reading response header from upstream, client: 172.31.0.1, server: localhost, request: "GET /api/ HTTP/1.1", upstream: "http://172.31.0.2:80/", host: "localhost:8080"
```

Oh yeah that's right, I got this error when I tried to set this up in docker-compose and I still have no idea why. I can only guess that something fucked up is going on between Tide and Nginx, oh well that wasted crucial time that could've been better spent noticing and fixing

### The Polyline encoding fuckup

Okay I didn't say this outright before so I'll say it now. Google's documentation sucks [here](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)'s the page describing the polyline encoding in the off chance that's a dead link here's the part that I read, assuming that the rest was context I didn't need
```
The steps for encoding such a signed value are specified below.

    1. Take the initial signed value:
    -179.9832104
    2. Take the decimal value and multiply it by 1e5, rounding the result:
    -17998321
    3. Convert the decimal value to binary. Note that a negative value must be calculated using its two's complement by inverting the binary value and adding one to the result:
    00000001 00010010 10100001 11110001
    11111110 11101101 01011110 00001110
    11111110 11101101 01011110 00001111
    4. Left-shift the binary value one bit:
    11111101 11011010 10111100 00011110
    5. If the original decimal value is negative, invert this encoding:
    00000010 00100101 01000011 11100001
    6. Break the binary value out into 5-bit chunks (starting from the right hand side):
    00001 00010 01010 10000 11111 00001
    7. Place the 5-bit chunks into reverse order:
    00001 11111 10000 01010 00010 00001
    8. OR each value with 0x20 if another bit chunk follows:
    100001 111111 110000 101010 100010 000001
    9. Convert each value to decimal:
    33 63 48 42 34 1
    10. Add 63 to each value:
    96 126 111 105 97 64
    11. Convert each value to its ASCII equivalent:
    `~oia@
```

here's what I wrote trying to implement that
```rs
fn enc_float(num:f64)->String{
    let mut working:i32 = (num*1e5).round() as i32;
    //hopethis does what's needed
    working<<=1;
    if num < 0.0 {
        working = !working;
    }
    let mut bits:[bool;30] = [false;30];
    for i in 0..30{
        bits[i] = working % 2 == 1;
        working >>=1;
    }
    bits.chunks(5).rev()
        .map(|bools|{
            let mut accu:u8 = 0;
            for i in 0..5{
                accu += if bools[4-i]{
                    1
                } else {0};
                accu <<=1;
            }
            accu |= 0x20;
            accu +=63;
            char::from(accu)
        }).collect::<String>()
        
}
```

nothing about this is obviously wrong although if you read the instructions I showed (and not the blurbs above and below) carefully there's two mistake that I made. First I didn't encode all 30 bits I needed, I only got 25 and second I Or'd every bit chunk with 0x20 rather than all but the last one. In my opinion that bit of the documentation is worded badly "OR each value with 0x20 if another bit chunk follows", compared to "OR all but the last value with 0x20" but that's not my main complaint. My main complaint is that they have step by step instructions which I just showed **in addition** to a critical paragraph block above it which I skipped due to convention being that if you have a step by step guide in either documentation or a tutorial that everything that needs to be done is contained within those steps. I've copied the critical paragraph below with important bit that I messed up boldened.

> The encoding process converts a binary value into a series of character codes for ASCII characters using the familiar base64 encoding scheme: to ensure proper display of these characters, encoded values are summed with 63 (the ASCII character '?') before converting them into ASCII. The algorithm also checks for additional character codes for a given point by checking the least significant bit of each byte group; if this bit is set to 1, the point is not yet fully formed and additional data must follow.
> Additionally, to conserve space, **points only include the offset from the previous point** (except of course for the first point). All points are encoded in Base64 as signed integers, as latitudes and longitudes are signed values. The encoding format within a polyline needs to represent two coordinates representing latitude and longitude to a reasonable precision. Given a maximum longitude of +/- 180 degrees to a precision of 5 decimal places (180.00000 to -180.00000), this results in the need for a 32 bit signed binary integer value.

It's also boldened on the page itself but regardless I skipped over it.

You may be wondering why this matters, why was I implementing polyline and the answer is so I could draw on google maps, and yeah surprise because of that Broome county buses don't show up because I did this wrong. The reason I didn't fix it was because I wasn't able to find out until about 3 hours before submission and didn't notice for the first 1-2 of those hours due to a mixture of sleep deprivation and eating breakfast.

1 - I built a CI system called [Romance]() last year which has a separate repo with the [frontend](), and it needs even more duct tape and dreams than this years project if you want it to work properly

2 - [chrono](), [async-std](), and [anyhow]() and I put in and then took out [geo-types](), [tokio]() and [sea-orm]()
