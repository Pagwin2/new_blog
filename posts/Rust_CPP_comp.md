---

title: "Comparing Rust and C++"

description: "A post on how I view rust and C++ in relation to each other and my thoughts on them"

date: "2024-04-11"

draft: true

---

# Less black and white than the hype suggests

C++ is a flawed language but I think the hype around Rust obscures the ways in which it can be decent. So I want to write about that while also simping on Rust by pointing out that it makes doing this stuff the default meanwhile C++ at best has other options that for a noob are more obvious.

## Move semantics, references and smart pointers

C++ has move semantics and references and you can use that to write code that performs similar things to what Rust does.

```cpp
auto x = std::make_unique<std::int32_t>(3);
// need to be explicit with std::move but still move semantics, if you know rust then unique_ptr is Box
std::unique_ptr<std::int32_t> y = std::move(x);

// this is an implicit call to a method, Rust would require that you use String::from
std::string s = "hi";

// without std::move this would copy over the contents of s which could be slow, Rust would do the move implicitly unless you called clone
std::string s2 = std::move(s);
```

which considering all the pre-existing C++ code that can do stuff like this even if it was written before C++ had smart pointes, RAII or references.
