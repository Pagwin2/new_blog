# Raft implemention in C++

## The what

In my undergraduate algorithms class an assignment we had was to pick an algorithm, implement it and write about the algorithm.
I chose [Raft](https://raft.github.io/).
I also choose to implement Raft in a [sans io](https://sans-io.readthedocs.io/) style or maybe it was an inversion of control style idk.

### Description of Raft

Raft is a consensus algorithm which ensures that a consistent log is maintained across many nodes.

Analogy, imagine a bank wants to track the amount of money in each customer's account but they don't want this tracked on just one computer.
So they have multiple computers that communicate with each other to do this.

Notably each computer doesn't just change variables willy nilly, instead they keep a log of everything that's happened and using that log figure out what the current state of things is.

In the Bank analogy this log would contain things like.

- Person A deposits x dollars
- Person A withdraws x dollars
- Person A transfers x dollars to Person B

So a log like

1) James deposits $10
2) Mary deposits $20
3) James transfers $5 to Alex
4) Mary transfers $7 to James
5) Alex withdraws $4

would end up with James having \$12 in his account, Mary having \$13 in her account and Alex having \$1 in his account.

I won't go into detail of how this is log is kept consistent between all the nodes here because

1) you can read about how in the [Raft paper](https://raft.github.io/raft.pdf)
2) When I wrote about how this works for that algorithms class it was 3 pages which is too much writing for this context

In summary though the nodes pick a leader and the leader transmits log entries to other nodes, keeps track of what log entries are known by a majority of nodes with log entries which aren't known by the majority being deleted as needed and a new leader being elected as needed.

## What was learned

Tests are good, for non trivial software they should be added sooner rather than later.
With that in mind sans io/inversion of control is great because it makes testing much easier.

Oh also I got more comfortable with CMake and CTest.
