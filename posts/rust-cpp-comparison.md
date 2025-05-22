---
title: "Equivalencies between Rust and C++"

description: "Ever get annoyed at someone being wrong on the internet and concluded the best way to deal with it is to do what they're doing but correctly?"

date: "2025-05-21"

draft: true

tags: []
---

Saw a Rust vs C++ cheatsheet which was wrong.
In response to this I'm just going to write something that isn't a cheatsheet but still compares the 2 languages.

Unless stated otherwise code snippets are at the top level of the file, e.g. not inside a function body.
Additionally all needed C++ `#include` or `import std` statements exist above the code block.

## Table of Contents

TODO: make these links

- Hello World
- Variables
- Copying and Moving
- Basic Types
- Loops
- Functions
- Making Your Own Types
- Type Aliasing
- Compile time computation
- Generics
- Modularity
- Dependency Management and Build Systems
- Non-linear control flow
- Meta Programming
- Pointers, References and Lifetimes


## Hello World

### Commentary

Nothing to interesting just a nice way to dip our toes in the water.

### C++

```cpp
int main(){
    std::cout << "Hello World!" << std::endl;
    // Alternatively for C++23 and onwards
    std::println("Hello World!");
}
```

### Rust

```rs
fn main(){
    println!("Hello World!");
}
```

## Variables

### Commentary

Here is where things start to get interesting, in C++ variables are mutable by default, in Rust they are immutable by default.
Both snippets below are both inside a function body not shown.

### C++

```cpp
// immutable variable via const keyword
const int x = 0;

// mutable variable implicitly
int y = 0;

// compiler error due to x being immutable
x = 5;

// allowed due to y being mutable
y = 5;

// we can also infer the type of a variable via auto
auto z = 3;
```

### Rust

```rs
// immutable implicitly
let x: i32 = 0;

// mutable variable via mut specifier
let mut y:i32 = 0;

// compiler error due to x being immutable
x = 5;

// allowed due to y being mutable
y = 5;

// type inferred
let z = 3;

// There isn't an obvious C++ equivalent but this is
// useful and common enough to make an example of
//
// we aren't changing x here we're making a new variable
// which is named x, past this point any code referring
// to x refers to this new x
//
let x = "variable shadowing";
```

## Copying and Moving

### Commentary

C++ has copying values as the default, Rust has moving values as the default.
These defaults are reflected in how copying and moving work in the respective languages.

All of this code is within a function body

### C++

Copying in C++ will happen when you assign a variable if you don't take action to prevent it.
The following will result in a copy.

```cpp
std::vector<int> first = {1,2,3};

// second is copy of first which will store copies of 1, 2 and 3
// leaving first untouched
std::vector<int> second = first;
```

In order to move a value however particular action needs to be taken.

```cpp
// unique_ptr used to avoid needing to make my own type
std::vector<std::unique_ptr<int>> first = {std::make_unique(1), std::make_unique(2), std::make_unique(3)};

// second takes the values in first for it's own and first is left
// a husk of it's former self
std::vector<std::unique_ptr<int>> second = std::move(first);

// we can still use first though even though we're just dealing
// with a husk of a value
second = std::move(first)
```

### Rust

In Rust we have the opposite phenomenon, a value will be moved if you don't take action to prevent it.

```rs
// we can't do type inference due to not having enough information
let first:Vec<i32> = vec![1,2,3];

// first is moved into second
let second = first;

// unlike C++ Rust will not allow usage of a value which has been
// moved, the line below will be a compiler error
let third = first;
```

There are exceptions to this, some types are annotated to indicate that  copying them bit for bit is valid, for values of those types instead of a move occuring when they are assigned they will simply have a copy made.

Most primitive types have this annotation.
Types which don't have the annotation can still be copied however.
The copying is just explicit most of the time this is done via a call to `clone`.
See #Generics(TODO: hyperlink) for details on what the bit copy annotation is and the way you're supposed to add a `clone` method to your own types.

```rs
let first: Vec<i32> = vec![1,2,3];

let second = first.clone();

// won't be a compiler error due to first not having moved when
// we assigned second
let third  = first;
```

## Basic Types

Nothing interesting, here's a table providing info on equivalent types.

If a C++ type has `std::` at the front it isn't a primitive.

|C++|Rust|
|-|-|
|`bool`|`bool`|
|`char`|no equivalent|
|`short`|no equivalent `i16` is the closest|
|`int`|no equivalent `i32` is the closest|
|`long`|no equivalent `i32` is the closest|
|`long long`|no equivalent `i64` is the closest|
|`unsigned ...`|`u...`|
|`std::int(8,16,32,64)_t` |`i(8,16,32,64)`|
|`std::uint(8,16,32,64)_t`|`u(8,16,32,64)`|
|`float`|`f32`|
|`double`|`f64`|
|`std::size_t`|`usize`|
|`std::ptrdiff_t` (not touching `ssize_t` thanks)|`isize`|
|no equivalent `std::uint32_t` is the closest|`char`|
|no equivalent `std::string_view` is the closest|`str`|
|`void`|no equivalent `()` is the closest|
|no equivalent `void`, `std::monostate` and `std::tuple<>` are the closest|`()`|
|no equivalent `[[noreturn]] void` is the closest | `!` (nightly at time of writing) |

## Loops

TODO
### Commentary

### C++

### Rust

## Functions

TODO
### Commentary

### C++

### Rust

## Making Your Own Types

TODO
### Commentary

### C++

### Rust

## Type Aliasing

TODO
### Commentary

### C++

### Rust

## Compile time computation

TODO
### Commentary

### C++

### Rust


## Pattern Matching

TODO
### Commentary

### C++

### Rust

## Generics

TODO
### Commentary

### C++

### Rust

## Modularity

TODO
### Commentary

### C++

### Rust

## Dependency Management and Build Systems

TODO
### Commentary

### C++

### Rust

## Fancy Functions 

TODO
### Commentary

### C++

### Rust

## Meta Programming

TODO
### Commentary

### C++

### Rust

## Pointers, References and Lifetimes

TODO
### Commentary

### C++

### Rust
