---

title: "Rust Type Hiccups"

description: "A couple of hiccups I've run into with rust's type system"

date: 2022-12-20

draft: false

---

# Rust type hiccups

This article is the result of running into annoyances in rust's type system. These annoyances aren't bugs as much as they are limitations caused by how rust's type system is currently implemented. Interestingly one of these seems relatively easy to fix at first glance while the other is a problem whose root cause(s) have been around for a good few years and probably won't be fixed for at least some ways into the future.

## Case 1: From\<Result\<T,E\>\> for Result\<From\<T\>,E\> and vice versa for E

Did you know that rust didn't have this implemented for you? I certainly didn't until about a week ago when I wanted to convert from a `Result<String, Error>` to a `Result<(), Error>` for the sake of convenience when returning from a function. Now you may think that this is the one which I think is the easy fix but if you thought that you'd be wrong.

### Why this seems easy

If you don't know rust or didn't think about this that much yet you may wonder how this is easy. Well to answer that I think I'll just show you the implementation.
```rs
impl <T,U:From<T>,E> From<Result<T,E>> for Result<U,E> {
    fn from(val:Result<T,E>){
	    val.map(U::from)
    }
}
```
That's it the entire definition and implementation of what I want in just 5 lines of code where 2 of them are just curly brackets. So why doesn't that work?

### The motherf\*cking identity implementation

Yeah, the issue is that rust implements `From<T> for T` so all types can be gotten from themselves. The issue with this is twofold
1. it means that U can be T which means that
2. the implementation we just wrote out before implements `From<Result<T, E>> for Result<T, E>` which is the identity which means we have two implementations of a trait on one type which rust doesn't allow. By the way, if you want to make an error message more helpful in rust change the error message you get when you try this to point out that the issue is that U can be T.

### Can we just tell rust to not implement this when U = T?

Nope not a thing in rust at the moment and I remember(perhaps incorrectly) that [negative bounds](https://github.com/rust-lang/rust/issues/42721) are for traits but not types generally.

### What about [specialization](https://doc.rust-lang.org/unstable-book/language-features/specialization.html)?

Nope
1. right now the [current subset of specialization](https://doc.rust-lang.org/unstable-book/language-features/min-specialization.html) that's considered stable doesn't allow for implementation in a case of a generic popping up twice which is the exact issue we have here
2. the identity implementation From has doesn't have the default keyword so if you wanna override it you're kinda fucked(unless you're trying to modify the stdlib like I was).

## So what was the other hiccup?

Oh yeah, there was a separate hiccup. Yeah that hiccup came from me trying to do SI-derived units via const generics, my minimum viable product version looked something like this
```rs
struct Measure<const km:i16, const sec:i16, const kg:i16>{
    amount:f64
}
impl<const km1:i16, const sec1:i16,const kg1:i16,const km2:i16, const sec2:i16,const kg2:i16> Div<Rhs=Measure<km2,sec2,kg2>> for Measure<km1,sec1,kg1> {
	// Don't mind the curly brackets rust compiler wanted me to put them there for whatever reason
	type Output = Measure<{km1-km2},{sec1-sec2},{kg1-kg2}>;
	fn div(self, rhs: Self) -> Self::Output {
	    Self::Output{
		    amount: self.amount/rhs.amount
	    }
	}
}
```
and had I not run into my type hiccup Mul would've been implemented similarly and Add and Sub would've been trivial. Alas, rust doesn't allow this to compile because `cannot perform const operation using kg1` and so on for all the other const generics... what? What do you mean I can't do a const operation with a const wtf ~~I also got an error that said something about how an associated type wasn't allowed when I set Rhs but shhhhh~~. Yeah in the compiler I imagine that allowing for calculating const generics with values that are const/const generics is relatively easy so I hope that does get improved at some point.

## Conclusion

I like rust's type system and most of the time it does a pretty good job, however when it doesn't work it's annoying. These 2 examples being particularly unsatisfying because they're so natural but oh well hopefully rust is able to make them work in the future.
