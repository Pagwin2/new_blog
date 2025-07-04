---
title: "Fractions Sidequest"

description: "In my last blog I wrote about my explorations on a new number type that specifies fractions rather than approximate binimal(? decimal has a latin root for 10 but floating point uses binary so what word?) or integers"

date: 2023-08-08

draft: false

tags: []
---

# The Sidequest

Welcome to a blog post about a sidequest I went on while exploring a computer [fraction](/blog/fractions) based number system. Specifically for my third solution I wanted to generate a list of fractions generated by the algorithm from [the video](https://www.youtube.com/watch?v=4d6YrTKmjfE).

## Algorithm recap

the algorithm is decently simple but knowing it is a bit of a pre-requisite for the rest of this post. As such the steps are below.

1. Start with a pair of fractions you want the generated fractions to range over(there are probably restrictions on what you can pick but for the rest of this post assume they're 0/1 and 1/0 which are fine and allow for ranging over the entire number line)
2. Add the numerators and denominators of the 2 fractions
3. Put the newly created fraction between the fractions used to generate it
4. repeat with all fractions next to each other in the list for however long you want for more fractions(you won't get repeats)

## Script 1

I wanted to use a fast lang for this so I chose Rust(also because I personally like Rust). It didn't take long for me to write this(slightly changed for clarity)

```rs
fn main()->anyhow::Result<()>{

    let mut fracs = Vec::<Frac>::new();
    fracs.push(Frac(0,1));
    fracs.push(Frac(1,0));

    for i in 0..19{
        eprintln!("{}",i);
        step(&mut fracs);
    }
    
    //remaining code in main wrote the fractions to a file and didn't change, maybe I could've written it to be faster but that's not the focus of this blog
    Ok(())
}

fn step(list:&mut Vec<Frac>){

    let mut i = 0;
    // I wanted a progress bar and in this case it actually is the reason I even knew there was a performance problem
    let bar = indicatif::ProgressBar::new(list.len() as u64);

    while i < list.len()-1{
        bar.inc(1);
        list.insert(i+1,list[i]+list[i+1]);
        i+=2;
    }

    bar.finish_and_clear();
}

// trait impls are for convenience
#[derive(Clone, Copy)]
struct Frac(u16,u16);

impl Add for Frac{
    type Output = Self;
    fn add(self, rhs: Self) -> Self::Output {
        Frac(self.0+rhs.0,self.1+rhs.1)
    }
}
```

This code feels bad even from a code quality point of view but idk why, regardless it's hilariously bad performance wise.

<video width="700" height="400" controls src="/static/video/frac_gen_v1.mp4"></video>

Considering that we're "only" doing addition this is incredibly slow. Slower than addition in (insert butt of the joke language of this week here). All that in mind something is definitely up and if you read the code above and think about it enough you'll probably see it.

... Yeah the problem is this line here

```rs
list.insert(i+1,list[i]+list[i+1]);
```

Citing documentation

> Inserts an element at position index within the vector, **shifting all elements after it to the right**.

In this case all elements after it is tens of millions of values to put this in big O notation, doing things this way for every element makes this process O(n²).

The solution is of course simple, don't ever put anything into a vec anywhere other than the end(barring witchcraft). Unfortunately implementing that solution required rewriting this code. But I took this as a nice oppurtunity to also multi-thread this code.

## Concurrency how?

Unfortunately this isn't quite trivially parallizable so I can't just use rayon. In the face of this a very naive solution to this problem would be something like

```rs
// ignoring move semantics and the need to only use functions that exist for convenience and readability

fn recurse(f1:Frac, f2:Frac, remaining:usize)->Vec<Frac>{
    let middle = f1+f2;

    let left_thread = std::thread::spawn(||recurse(f1,middle,remaining-1));
    let right_thread = std::thread::spawn(||recurse(middle,f2,remaining-1));

    let left = left_thread.join();
    let right = right_thread.join();
    
    //don't need return but not everyone knows rust
    return concat(left, middle, right)
}
```

the reason I call this the naive solution is because it uses OS threads and OS threads are expensive memory wise. Also if you spawn more of them than CPU cores you get minimal benefit and if you keep spawning them anyways the OS tends to have a panic attack. That's bad so instead of using OS threads lets use green threads for less overhead while still using multiple threads from a pool.

## Script 2

```rs
#[tokio::main]
async fn main()->anyhow::Result<()>{
    const RECURSIONS:u64 = 19;

    let fracs = recurse(Frac(0,1),Frac(1,0),RECURSIONS).await;

    Ok(())
}

// actual code is much more ugly in reality due to reasons(code below won't compile), if you wanna see it there's a link to the repo with all this code at the bottom of the article, the git commit is de72a7a0
// also removing progress bar code because nobody cares just know I still had a progress bar
async fn recurse(f1:Frac,f2:Frac, remaining:u64)->Vec<Frac>{
    // base case for the recusion
    if remaining == 0 {
        return Vec::new()
    }
    
    // same idea as the naive version
    let middle = f1+f2;
    let left_task = tokio::task::spawn(recurse(f1,middle,remaining-1));
    let right_task = tokio::task::spawn(recurse(middle,f2,remaining-1));

    let left = left_task.await.expect("left future failure");
    let mut right = right_task.await.expect("right future failure");
    
    // how concat is being achieved
    let mut ret = left;
    ret.push(middle);
    ret.append(&mut right);

    return ret
}

// Frac is the same as before
```

looks good at first glance(actual version code quality is bad but blog version seems alright). What happens when we run it?

<video width="700" height="400" controls src="/static/video/frac_gen_v2.mp4"></video>

Oh... we run out of memory... or well we run out of 30 gigabytes of memory because I set a limit to avoid effecting the other stuff running on the server(because it isn't mine). But why? Doing the math if all we had to deal with was the fractions we'd be using about `17501876*4/1000**3 ~ 0.07 GB`, if we include the overhead of all the Vecs we make and are pretty agressive with how much memory they use maybe 0.21 GB which is a difference of over 142x. So what's the rest of the memory?

Well... I'm not 100% sure actually but my current best guess is the green threads/tokio tasks. Whatever it is on average it seems to have memory usage measured in hundreds of bytes and/or a kilobyte or 2 roughly doing a bit of quick math(I just divided 30GB/num_of_running_tasks). So I guess I gotta take out the green thread usage huh.

## Script 3(the finale for now)

So yeah I did that, I didn't need to rewrite this time just a refactor.

```rs
fn main()->anyhow::Result<()>{
    const RECURSIONS:u64 = 32;

    let fracs = recurse(Frac(0,1),Frac(1,0),RECURSIONS);

    Ok(())
}

fn recurse(f1:Frac,f2:Frac, remaining:u64)->Vec<Frac>{
    // nothing new here
    if remaining == 0 {
        return Vec::new()
    }

    let middle = f1+f2;
    let left = recurse(f1,middle,remaining-1);
    let mut right = recurse(middle,f2,remaining-1);

    let mut ret = left;
    ret.reserve(ret.len()+right.len()+1);
    ret.push(middle);
    ret.append(&mut right);

    return ret
}

// Frac now uses 32 bit ints rather than 16 bit ints due to an overflow
```

This solves the whole running out of memory thing. A funny side effect is that now it's even faster(even though it's 1 thread).

<video width="700" height="400" controls src="/static/video/frac_gen_v3.mp4"></video>

So that was fun going through and making all this work out well, now I can generate gigabytes upon gigabytes of fractions with ease.

## Conclusion

Could I optimize this more? Yes I could pre-allocate a buffer and use a specialized thread pool(and probably some unsafe code as well thinking about it). But I won't because it's fast enough, the remaining speed gains probably aren't worth it and most of the execution time is spent writing the results to disk. Overall this was a fun sidequest as a part of the fraction quest. I did other stuff between the article before the fraction one and the fraction one and maybe I'll dump those articles at some point soon so I can stop feeling bad about them sitting in my website's git repo doing nothing.

[git repo with the generator](https://github.com/Pagwin2/fraction_generator)
