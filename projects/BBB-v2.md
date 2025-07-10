# Binghamton Better Bus v2

See also: 

- [The HackBU 2024 predecessor](/posts/HackBU2024)
- [My weekly posts on this project](/posts/soft_eng_class_weekly_notes.md)
- [My retrospective on this project](/posts/soft-eng-project-retro)

## The what

Binghamton better bus in both of it's iterations is a web app to find a route from point to point in Binghamton using both the Broome County bus system as well as the OCCT bus system.

However it manages bus route data differently than the hackathon version.
The OCCT data still came from the live map api however rather than making a request every time data was needed this iteration simply had the JSON data from some responses saved and used that.
The Broome County data came from GTFS that Broome County makes publically available. Note: the live map provider for Broome County disappeared between the HackBU iteration and the start of this iteration.

The end result of this project was a system where start and endpoints could be input and the system would calculate a route between points (I forget if it factored in time) which wouldn't necessarily need to layover in statically set hubs but didn't factor in Bus direction.

## What was learned

1) **anything which is the output of a program should not be checked into the version control system** that output is a build artifact, something which should be generated on/pre startup or something which should be generated on demand.
2) Barring genuinely hard problems the first unit (probably week) of work on a project should be scoped to whatever the MVP is.
3) If I'm working in a team which I want to get things done and nobody has taken charge by the end of the first unit of work I need to take charge.
4) If in a team where I'm in charge I should never assume responsiveness (responding to communication and getting work done) from any team member regardless of prior knowledge.

## Demo video

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZtgsD62_K94?si=dsI5gK64NEyMNhu0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
