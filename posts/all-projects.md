---
title: "All my projects to date"

description: "A description of everything I've done albeit minimizing the fails and shortcomings"

date: "2025-07-10"

draft: false

tags: []
---

I'm writing this so I have one place where I've described all of my projects, in future I may make this a section of the site rather than just a post but for now this will do.
Note for future me, the markdown sucks because you wanted to have semantic HTML here and didn't know how to get markdown to generate `<article>` or `<section>` elements, you'll find the proper markdown under the `/projects` directory.

<section>
<h1 id="binghamton-better-bus-hackbu-2024">Binghamton Better Bus HackBU
2024</h1>
<p>See also: <a href="/posts/HackBU2024/">My blog post on HackBU
2024</a></p>
<h2 id="the-what">The what</h2>
<p>Binghamton better bus in both of it’s iterations is a web app to find
a route from point to point in Binghamton using both the Broome County
bus system as well as the OCCT bus system.</p>
<p>The HackBU iteration made use of the live maps available (at the
time) to acquire the needed information about the bus systems.</p>
<p>In the 24 hour hackathon I was able to get a setup where I could
input a start and endpoint and get a route which could be a layover at
Binghamton University, the downtown bus terminal or in theory no layover
with a single bus. The one and only heuristic used was walking
distance.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>I learned some of the intricacies of the polyline algorithm and how
the two bus live map APIs worked.</p>
<h2 id="demo-video">Demo video</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/5WcKPhMqveY?si=WcO_duuL1VxT0cFp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>
</section>
<section>
<h1 id="binghamton-better-bus-v2">Binghamton Better Bus v2</h1>
<p>See also:</p>
<ul>
<li><a href="/posts/HackBU2024">The HackBU 2024 predecessor</a></li>
<li><a href="/posts/soft_eng_class_weekly_notes.md">My weekly posts on
this project</a></li>
<li><a href="/posts/soft-eng-project-retro">My retrospective on this
project</a></li>
</ul>
<h2 id="the-what">The what</h2>
<p>Binghamton better bus in both of it’s iterations is a web app to find
a route from point to point in Binghamton using both the Broome County
bus system as well as the OCCT bus system.</p>
<p>V2 is basically the same as the hackthon version but done over a
semester for a class instead of just 24 hours for a hackathon (see the
links).</p>
<p>However it manages bus route data differently than the hackathon
version. The OCCT data still came from the live map api however rather
than making a request every time data was needed this iteration simply
had the JSON data from some responses saved and used that. The Broome
County data came from GTFS that Broome County makes publically
available. Note: the live map provider for Broome County disappeared
between the HackBU iteration and the start of this iteration.</p>
<p>The end result of this project was a system where start and endpoints
could be input and the system would calculate a route between points (I
forget if it factored in time) which wouldn’t necessarily need to
layover in statically set hubs but didn’t factor in Bus direction.</p>
<h2 id="what-was-learned">What was learned</h2>
<ol type="1">
<li><strong>anything which is the output of a program should not be
checked into the version control system</strong> that output is a build
artifact, something which should be generated on/pre startup or
something which should be generated on demand.</li>
<li>Barring genuinely hard problems the first unit (most of the time a
week) of work on a project should be scoped to whatever the MVP is.</li>
<li>If I’m working in a team which I want to get things done and nobody
has taken charge by the end of the first unit of work I need to take
charge.</li>
<li>If in a team where I’m in charge I should never assume
responsiveness (responding to communication and getting work done) from
any team member regardless of prior knowledge.</li>
</ol>
<h2 id="demo-video">Demo video</h2>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZtgsD62_K94?si=dsI5gK64NEyMNhu0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>
</section>
<section>
<h1 id="this-blog">This Blog</h1>
<p>See also:</p>
<ul>
<li><a href="/posts/new_blog_who_dis/">Blog revamp</a></li>
<li><a href="/posts/how/">(Outdated) How this website was made</a></li>
<li><a href="/posts/gh_actions/">(Outdated) Setting up CD for this
site</a></li>
<li>Every other blog post on this site</li>
</ul>
<h2 id="the-what">The what</h2>
<p>This blog is a place where I write thoughts mostly but not always
about software. The static site generator, Pagwin’s Site Builder (PSB),
and frontend code were done by me.</p>
<p>The static site builder doesn’t do anything too crazy right now,
however I intend to rewrite it to handle markdown and restructured
text(RsT) itself. With that new power I’ll then have it handle syntax
highlighting, footnote/aside creation and table of contents
creation.</p>
<p>Meanwhile the frontend code was done to try and maximize semantic
HTML and aesthetics while also being a reasonable print. I have some
Open Graph tags so links to it in social media look okay and I have an
Atom feed so people who care to track updates have a way to do so though
I plan to create an XSLT transformation for that Atom feed so people who
click the RSS icon aren’t confused.</p>
<p>Also one last thing is that I use close to no Javascript, at present
it’s for easy syntax highlighting and in future I expect I’ll use it for
positioning footnotes/asides to the right vertically aligned with the
thing referencing them.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>Quite a bit about HTML and CSS.</p>
<h2 id="visualdemo">Visual/demo</h2>
<p>You’re looking at it.</p>
</section>
<section>
<h1 id="comments-backend">Comments Backend</h1>
<h2 id="the-what">The what</h2>
<p>I worked on making a HTTP service which returned HTML snippets which
allowed for comments which I intended to add to my blog but didn’t due
to email being annoying and deciding that comments didn’t add much.</p>
<p>If I remember correctly this was intended to use HTMX to minimize the
need for page reloads without needing a bunch of javascript.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>At the time besides realizing that I should’ve had the service use an
SMTP connection instead of some specific API and with hindsight that I
should’ve used sqlite rather than PostgreSQL for that project.</p>
</section>
<section>
<h1 id="raft-implemention-in-c">Raft implemention in C++</h1>
<h2 id="the-what">The what</h2>
<p>In my undergraduate algorithms class an assignment we had was to pick
an algorithm, implement it and write about the algorithm. I chose <a
href="https://raft.github.io/">Raft</a>. I also choose to implement Raft
in a <a href="https://sans-io.readthedocs.io/">sans io</a> style or
maybe it was an inversion of control style idk.</p>
<h3 id="description-of-raft">Description of Raft</h3>
<p>Raft is a consensus algorithm which ensures that a consistent log is
maintained across many nodes.</p>
<p>Analogy, imagine a bank wants to track the amount of money in each
customer’s account but they don’t want this tracked on just one
computer. So they have multiple computers that communicate with each
other to do this.</p>
<p>Notably each computer doesn’t just change variables willy nilly,
instead they keep a log of everything that’s happened and using that log
figure out what the current state of things is.</p>
<p>In the Bank analogy this log would contain things like.</p>
<ul>
<li>Person A deposits x dollars</li>
<li>Person A withdraws x dollars</li>
<li>Person A transfers x dollars to Person B</li>
</ul>
<p>So a log like</p>
<ol type="1">
<li>James deposits $10</li>
<li>Mary deposits $20</li>
<li>James transfers $5 to Alex</li>
<li>Mary transfers $7 to James</li>
<li>Alex withdraws $4</li>
</ol>
<p>would end up with James having $12 in his account, Mary having $13 in
her account and Alex having $1 in his account.</p>
<p>I won’t go into detail of how this is log is kept consistent between
all the nodes here because</p>
<ol type="1">
<li>you can read about how in the <a
href="https://raft.github.io/raft.pdf">Raft paper</a></li>
<li>When I wrote about how this works for that algorithms class it was 3
pages which is too much writing for this context</li>
</ol>
<p>In summary though the nodes pick a leader and the leader transmits
log entries to other nodes, keeps track of what log entries are known by
a majority of nodes with log entries which aren’t known by the majority
being deleted as needed and a new leader being elected as needed.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>Tests are good, for non trivial software they should be added sooner
rather than later. With that in mind sans io/inversion of control is
great because it makes testing much easier.</p>
<p>Oh also I got more comfortable with CMake and CTest.</p>
</section>
<section>
<h1 id="c-stdmap-partial-implementation">C++ <code>std::map</code>
partial implementation</h1>
<h2 id="the-what">The what</h2>
<p>C++ has something called <code>std::map</code> as a part of the
standard library. I implemented a subset of the functionality present in
<code>std::map</code> for a class I took in college.</p>
<p>This was done via a red-black tree which was a pain in the ass to
deal with due to me not knowing how red black trees worked at the start
and making the mistake of having the root node be a special case.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>Doing anything with graphs in languages which aren’t trace garbage
collected is painful and making the root node
<code>std::optional&lt;Node&gt;</code> while all chidren are
<code>std::unique_ptr&lt;Node&gt;</code> is a bad idea due to it
basically mandating code duplication.</p>
</section>
<section>
<h1 id="c-stdshared_ptr-partial-implementation">C++
<code>std::shared_ptr</code> partial implementation</h1>
<h2 id="the-what">The what</h2>
<p>C++ has something called <code>std::shared_ptr</code> as a part of
the standard library. I implemented a subset of the functionality
present in <code>std::shared_ptr</code> for a class I took in
college.</p>
<p>What <code>std::shared_ptr</code> does is that it holds a pointer to
something on the heap and a counter to track how many
<code>std::shared_ptr</code>s for that pointer exist, when that number
hits 0 the pointer is freed. Compared to manually needing to keep track
of whether anything is using a pointer it’s reasonably nice.</p>
<h2 id="what-was-learned">What was learned</h2>
I shouldn’t procrastinate.
<script>
//I won't go into detail but I did not finish everything needed for this assignment.
//The simple lesson which I will undoubtedly need to relearn over and over again is that I shouldn't procrastinate, things can be harder/take longer than expected.</script>
</section>
<section>
<h1 id="fraction-generator">Fraction Generator</h1>
<p>See also: <a href="/posts/fractions_sidequest/">The blog post about
this</a></p>
<h2 id="the-what">The what</h2>
<p>This was a project I did for fun which generated a bunch of fractions
by starting with 2 seed fractions, adding them toegether like vectors
and then repeating for all adjacent pairs of fractions over and over
again until a desired number of fractions were generated.</p>
<p>A bottleneck caused by misusing insertion into a <code>Vec</code>
made things slow until it was removed.</p>
<h2 id="what-was-learned">What was learned</h2>
<ol type="1">
<li>Rust’s <code>async</code> functionality is not a great fit for
recursive computation.</li>
<li>Be careful with stdlib functionality, it can occasionally be used to
footgun</li>
<li>Initial solution should be as simple as possible and then expanded
in the natural direction of complexity for speed (or the direction
indicated by benchmarking) rather than done for speed from the
start.</li>
</ol>
</section>
<section>
<h1 id="pagwins-program-instantiator-ppi">Pagwin’s Program Instantiator
(PPI)</h1>
<h2 id="the-what">The what</h2>
<p>PPI is a program that I can use to create new projects, either from a
git repo or via some program.</p>
<p>The commands and git repos are specified in a toml file like shown
below.</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode toml"><code class="sourceCode toml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="kw">[subcommands.skeletons]</span></span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="dt">cpp</span> <span class="op">=</span> <span class="op">[</span><span class="st">&quot;https://git.pagwin.xyz/Pagwin/Cpp_template&quot;</span><span class="op">,</span> <span class="st">&quot;main&quot;</span><span class="op">]</span></span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a><span class="kw">[subcommands.scripts]</span></span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a><span class="dt">rs</span> <span class="op">=</span> <span class="st">&quot;cargo-quick&quot;</span></span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a><span class="dt">npm</span> <span class="op">=</span> <span class="st">&quot;npm-quick&quot;</span></span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a><span class="dt">js</span> <span class="op">=</span> <span class="st">&quot;vite-quick&quot;</span></span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a><span class="dt">hs</span> <span class="op">=</span> <span class="st">&quot;cabal-quick&quot;</span></span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a><span class="kw">[patching]</span></span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a><span class="dt">prefix</span> <span class="op">=</span> <span class="st">&quot;/home/pagwin/.local/share/patches/&quot;</span></span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a><span class="kw">[patching.cmd_patches]</span></span></code></pre></div>
<p>I forgot about that patching section so that might be something
unfinished oops.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>Libgit2 isn’t very reliable so using the <code>git</code> cli is
generally preferred for things like this.</p>
</section>
<section>
<h1 id="romance-hackbu-2023-project">Romance (HackBU 2023 project)</h1>
<h2 id="the-what">The what</h2>
<p>Romance was a CI/CD pipeline which I made for the 2023 HackBU
hackathon. If I remember correctly it was a git hook which read a config
file to figure out which docker container(s) to run. I also had time to
build a not great looking web ui for it.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>This is one of the earlier instances of me working on something with
a very tight deadline where I found that constraint made me worke more
effieciently than I normally do. This takeaway is something which I
don’t think I’ve fully internalized yet but it is something I will
occasionally stumble into under the right circumstances.</p>
</section>
<section>
<h1 id="small-echo">Small echo</h1>
<h2 id="the-what">The what</h2>
<p>This was a project made for fun in highschool where I made a bunch of
programs which read from stdin and output to stdout in various
programming languages.</p>
<p>The reason this is of note is because one of those languages was
assembly.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>Linux syscalls/x86 assembly.</p>
</section>
<section>
<h1
id="exploration-of-xv6-x86-code-for-operating-systems-class">Exploration
of xv6 x86 code for operating systems class</h1>
<h2 id="the-what">The what</h2>
<p>For my operating systems class I explored the <a
href="https://github.com/mit-pdos/xv6-public">x86 version of the xv6</a>
operating system’s codebase a bit.</p>
<p>For this class we implemented a few syscalls and implemented a
scheduler.</p>
<h2 id="what-was-learned">What was learned</h2>
<p>It was interesting to understand the guts of how schedulers and
syscalls work on the kernel side of the operating system.</p>
</section>
