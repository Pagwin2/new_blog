# C++ `std::map` partial implementation

## The what

C++ has something called `std::map` as a part of the standard library.
I implemented a subset of the functionality present in `std::map` for a class I took in college.

This was done via a red-black tree which was a pain in the ass to deal with due to me not knowing how red black trees worked at the start and making the mistake of having the root node be a special case.

## What was learned

Doing anything with graphs in languages which aren't trace garbage collected is painful and making the root node `std::optional<Node>` while all chidren are `std::unique_ptr<Node>` is a bad idea due to it basically mandating code duplication.
