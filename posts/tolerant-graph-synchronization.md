---
title: "The Tolerant Graph Synchronization Problem"

description: "Trying to formalize an interesting comp sci problem with real world applications."

date: "2025-05-25"

draft: false

tags: []
---

I'm going to assume that you know what a [graph](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)) is coming into this.

## The Semi-Formal Generic Graph Synchronization Problem Description

The problem goes as follows

You have a connected undirected graph with all nodes but 1 colored black.
The one non-black node can be any non-black color.

The objective is to come up with a set of rules, within some constraint(s), where a node will update to a new color depending on the colors of it's neighbors (nodes with a direct edge connection) such that in a finite number of steps the entire graph will be red optimizing for some criteria.

At minimum we have the constraint that a node with all black neighbors will remain black.

Note: the baseline graph synchronization problem is contained within the generic version with. The baseline problem has the additional constraint that a solution is only valid if at all steps either all nodes of the graph are red or no nodes of the graph are red with no optimization criteria.

## The Semi-Formal Tolerant Graph Synchronization Problem

The tolerant version does not have the additional constraint the baseline problem has.
Instead the tolerant version has optimization criteria to minimize.

Those criteria are

1) For each red node minimize the time spent neighboring of non-red nodes, this being the multiple of the number of ticks and the number of neighbors under this criteria
2) Minimize the number of ticks taken before all nodes are red

There are probably other optimization criteria, constraints and confounding factors for the real world problem(s) that lead to me wanting to investigate this.

## Real World Cases/Who cares

You know how a lot of people feel stuck on social media platforms due to networking effects.
Yeah, having a strategy to coordinate moving away where people aren't stuck at the new place for long would be nice.

Likewise for irl cities when those networking effects kick in but cost of living is a bitch.

That said you can probably see how in both those examples there are other factors at work beyond communication and moving over.
The reason I don't include those yet is because I'm not sure what needs to be included or what the best way to include it would be.

## Plausible optimal solution for the problem as written

I suspect (with my gut) the optimal solution is just to have the initial non-black node be red and then have the rule "if any neighbors are red turn red".

I don't know if exponential graphs like social graphs mess that solution up though or if all the alternatives do no better.

## Conclusion

If you have thoughts/a proof on the actual solution for the problem as written I'd like to hear about them.
Likewise if you have ideas on formalizing the problem for those real world cases with irl constraints, optimization criteria and confounding factors let me know.
