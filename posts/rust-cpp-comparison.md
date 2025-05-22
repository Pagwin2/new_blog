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
- Basic/Primitive Types
- Common Stdlib Types
- Loops
- Functions
- Making Your Own Types
- Type Aliasing
- Compile time computation
- Pattern Matching
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

Doing making a type move only manually involves deleting the lvalue reference constructor and assignment operators and overriding the rvalue reference constructor and assignment operators.
For those in need of more info looking into the rule of 5 will help.

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

## Basic/Primitive Types

While C++ literals and Rust literals and how they differ are mildly interesting, I haven't given them a sections.
At the type level though there's nothing interesting, so here's a table providing info on equivalent types.

Note: If a C++ type has `std::` at the front it isn't a primitive type.

Note2: if you see something like `asdf(1,2,3,4)` that just means I don't want to make 4 rows in the table for `asdf1`, `asdf2`, `asdf3` and `asdf4`.
The 3 dots serve the same purpose for `unsigned` because words are long.

Note3: Sometimes I will a single capital letter, like `T` as a placeholder for templates/generics.

|C++|Rust|
|-|-|
|`bool`|`bool`|
|`char`|equivalent is C++ implementation dependant|
|`signed char`|`i8`|
|`unsigned char`|`u8`|
|`short`|no equivalent `i16` is the closest|
|`int`|no equivalent `i32` is the closest|
|`long`|no equivalent `i32` is the closest|
|`long long`|no equivalent `i64` is the closest|
|`unsigned ...`|`u(8,16,32,64)`|
|`std::int(8,16,32,64)_t` |`i(8,16,32,64)`|
|`std::uint(8,16,32,64)_t`|`u(8,16,32,64)`|
|no equivalent barring compiler extensions|`i128`|
|no equivalent barring compiler extensions|`u128`|
|`float`|`f32`|
|`double`|`f64`|
|`long double`|no equivalent|
|`&T`|`&mut T`|
|`&const T` or `const &T`|`&T`|
|`*T`|`*mut T`|
|`*const T` or `const *T`|`*const T`|
|`std::float16_t` (C++23)|`f16` (nightly at time of writing)|
|`std::float128_t` (C++23)|`f128` (nightly at time of writing)|
|`std::size_t`|`usize`|
|`std::ptrdiff_t` (not touching `ssize_t` thanks)|`isize`|
|`T[N]` or `std::array<T,N>`|`[T;N]`|
|no equivalent `std::uint32_t` is the closest|`char`|
|no equivalent `std::string_view` is the closest|`str`|
|no equivalent `std::span<T>` is the closest|`[T]`|
|`void`|no equivalent `()` is the closest|
|no equivalent `void`, `std::monostate` and `std::tuple<>` are the closest|`()`|
|no equivalent `[[noreturn]] void` is the closest | `!` (nightly at time of writing) |

## Common Stdlib Types

More equivalent types, this time from the stdlib, here's another table.

Note: (in prelude) just means you don't need the `std::blah` or a `use` to use the type.

Note2: Sometimes I will a single capital letter, like `T` as a placeholder for templates/generics.

|C++|Rust|
|-|-|
|`std::vector<T>`|`std::vec::Vec<T>` (in prelude)|
|`std::span<T>`| `&[T]`|
|`std::string`|`std::string::String` (in prelude) or `std::ffi::OSString`|
|`std::string_view`|`&str`|
|`std::optional<T>`|`std::option::Option<T>` (in prelude)|
|`std::expected<T,E>`|`std::result::Result<T,E>` (in prelude)|
|`std::unique_ptr<T>`|`alloc::boxed::Box<T>` (in prelude)|
|`std::shared_ptr<T>`|`alloc::rc::Rc<T>`|
|`std::weak_ptr<T>`|`alloc::rc::Weak<T>`|

## Loops

All of this is within some function body.

### `while` loops

```cpp
// C++
while (some_condition) {
    //jump to next loop
    continue;
    // exit loop early
    break;
}
```

```rs
//Rust
while some_condition {
    continue;
    break;
}
```

### `for` loops

Rust does not have a direct equivalent to C++ for loops of the form.

```cpp
for(auto v = some_initial_value; condition; update()){
    // loop body
}
```

However it does have an equivalent to loops of the form

```cpp
for(auto v:some_iterator){
    // loop body
}
```

namely

```rs
for v in some_iterator {
    // loop body
}
```

Move by default and pattern matching can lead to potentially confusing loops however.

While on the subject of iterators though both languages have higher level constructs for working on iterators.
There are a lot of these however and they are frequently named similarly so instead of making an incomplete table instead I'd like to write about how iterators differ between the 2 languages.

In C++ an iterator is an object which has overloads which allow it to be treated as a pointer.
What this means in practice is that until the introduction of the ranges library in C++20 (which I haven't been able to use without getting a compiler error yet) that passing in an iterator to some function generally meant passing in the start and end point iterators.

In Rust things work differently, instead all iterators must fit a particular shape (see #Generics(TODO: hyperlink) for what that means) where they have a `next` method which returns an `Option` (see (#Common Stdlib Types) (TODO: hyperlink) for more info).
This means that

1. The iterator can be passed as 1 value
2. The iterator can be only partially evaluated

For comparison lets compare usage of C++ `std::transform` from the algorithms library to Rust's `map` method.

```cpp
std::vector<int> bucket{};
std::transform(some_iterator.begin(), some_iterator.end(), std::back_inserter(bucket), [](auto _){return 3;});
```

Notice the need to have an explicit location to output things onto when we do the transform rather than when we need the values.

```rs
let bucket:Vec<i32> = some_iterator
    .map(|_|{return 3;})
    .collect();
```

This Rust version arguably does more than what is needed.
If we had left things at just the usage of `map` it would functionally be a no-op, we wouldn't need somewhere to store our transformed data because we didn't make it yet.
However to keep the 2 examples equivalent `collect` was used to gather things up into a `Vec`.


C++20 ranges (with some C++23 additions) in principle allow for C++ code which is similar to this Rust code to be written like follows

```cpp
namespace views = std::ranges::views;
std::vector<int> bucket = some_iterator
    | views::transform([](auto _){return 3})
    | std::ranges::to<std::vector>();
```

However I suffer from severe skill issue when using ranges so I haven't been able to write something like this off the cuff without running into a compiler error wall so I can't vouch for it.

## Functions

Basic functions in Rust and C++ are by and large very similar to each other in terms of semantics, they differ mostly in terms of syntax.

A basic example with the 2 notable C++ syntax variants and the 2 ways of doing it in Rust is below.

```cpp

using i32 = std::int32_t;

i32 add(i32 a, i32 b) {
    return a+b;
}
auto add(i32 a, i32 b) -> i32 {
    return a+b;
}
```

```rs
fn add(a:i32, b:i32) -> i32 {
    return a+b;
}
fn add(a:i32, b:i32) -> i32 {
    a+b
}
```

The difference in C++'s case is how the function is declared (basically syntax sugar) while in Rust's case the difference is due to there being multiple ways of deciding what value a function returns.

For Rust you can have a function return it's value via `return` however you can also have a function return it's value via having the last expression in the function body evaluate to the return type.

In addition to basic functions we also have closures/anonymous functions though.

The following demonstrates them without captures, capture by reference and capture by move.

```c++
using i32 = std::int32_t;

std::unique_ptr<i32> x = std::make_unique(3);
auto add = [](i32 a, i32 b){
    return a+b;
};
auto add_ref_x = [&x](i32 a, i32 b){
    return a+b+*x;
};
auto add_move_x = [x = std::move(x)](i32 a, i32 b){
    return a+b+*x;
};
```

```rs
let x = Box::new(3);
let add = |a:i32, b:i32| {
    return a+b;
};
let add_ref_x = |a:i32, b:i32| {
    return a+b+*x;
};
let add_mov_x = move |a:i32, b:i32| {
    return a+b+*x;
};
```

Again there isn't a meaningful substance difference though in C++'s case moving and referencing local values was a bit more tedious than it was in Rust which can be nice in some cases.
In both cases the language just goes and makes an anonymous type for us which has the needed struct/class members and function call operator then constructs a value of that type with values from the surrounding function.

Well kinda, I'd link to a blog post going into detail on how things differ on a type level but I can't find it atm, sorry.

## Making Your Own Types

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
