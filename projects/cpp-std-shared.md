# C++ `std::shared_ptr` partial implementation

## The what

C++ has something called `std::shared_ptr` as a part of the standard library.
I implemented a subset of the functionality present in `std::shared_ptr` for a class I took in college.

What `std::shared_ptr` does is that it holds a pointer to something on the heap and a counter to track how many `std::shared_ptr`s for that pointer exist, when that number hits 0 the pointer is freed.
Compared to manually needing to keep track of whether anything is using a pointer it's reasonably nice.

## What was learned

I won't go into detail but I did not finish everything needed for this assignment.
The simple lesson which I will undoubtedly need to relearn over and over again is that I shouldn't procrastinate, things can be harder/take longer than expected.
