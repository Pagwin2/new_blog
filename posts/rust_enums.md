---

title: "Rust Match and Enums"

description: "A blog article I wrote to win a dumb argument"

date: "2022-09-06"

draft: false

---

As the description of this article says I wrote this to try and probably fail to win an argument. Namely, a friend ~~argued~~ asked "Why use rust enums just use an interface and manual type checks?" specifically the context was me advocating for the use of rust enums instead of C's union types. Example:
```dart
String anything(Object something) {
    if(something is bool){
	    if(something) return "fizz";
	    return "buzz";
    }
    if(something is int){
	    if(something < 10) return "smol";
	    if(something < 20) return "Mcdonald's medium";
	    return "LARGE";
    }
    return "$something";
}
```
Personally, I think this is a bad solution to the problem of having multiple valid types for something generally speaking. Specifically speaking taking an argument which we only know implements some interface can be good.

## Rust enum example

But I haven't made any arguments for my position yet I've just specified how you can go without C's unions which are terrible and you should never use them outside of the implementation of something that solves the problem in a better way. What makes rust enums great for this use case is that we are explicitly limiting what can be passed in at compile time and are being explicit about what we want and why. The rust equivalent to that example is 
```rs
//why a 128 bit integer and not just a 64 bit? Well because I wanted to show off that rust has that that's why
enum OurEnum{InterviewQuestion(bool), FastFoodOrder(u128), Other(Box<dyn Display>)}
fn anything(something:OurEnum)->String{
    match OurEnum{
	    InterviewQuestion(true)=>{
		    "fizz"
	    },
	    InterviewQuestion(false) => {
		    "buzz"
	    }
        FastFoodOrder(size_index) => {
            if size_index < 10 {
                "smol"
            }
            else if size_index < 20 {
                "McDonald's medium"
            }
            else {
                "LARGE"
            }.into()
        },
        Other(displayable) => {
            format!("{}", displayable)
        }
   }
}
```
Now you might be saying "oh my god that's way more verbose why would I want that?!?!". The reason you want that is because all that verbosity provides more information to people who have to deal with this code in the future ~~and also partially due to rust having &str and String as different things as well as me showing off a bit~~. So what new information do we get with this code that we don't get with the Dart code?

## Each case has a name

As the section title says each case has a name, now someone reading this code knows that our boolean case corresponds to InterviewQuestion whatever that may mean in a larger context. This also means that if we want different things for the same type under certain conditions we just need to add something to the enum.


## Happy little compiler errors

In addition to the whole deal of enums helping self-document they also make it so if we fuck up we get a compiler error unless we use if let or _ but if you use those you are your own worst enemy. This also makes it so if we add a case we can't compile the code unless we handle that case everywhere we're doing stuff with our Enum. What this also means is that if we only wanted to handle booleans and unsigned integers we could do that without runtime errors.

## Oh hey I implement your interface now fuck you

Oh yeah also with dart interfaces nothing is stopping someone from just implementing the interface you take as an argument and just sending that to your function that takes that interface which would just completely mess everything up.

## Bonus points

These are more cool things with this code but they aren't as closely related to enums.

### Match being awesome

So you may notice that OurEnum::InterviewQuestion is referred to twice, the reason for that is that match allows you to rather than capture the value in an enum in a variable, just check if the value inside that case of the enum is some specified value, in this case, it'd be more convenient to just capture and use if else but it's still cool that we don't have to.

### Hello Interface my old friend

So remember how I said we shouldn't use an interface for this but interfaces can be useful in other cases. Well, the Other case for OurEnum is using an interface. Oh sorry, it's using a "trait", more specifically a trait object but the details of that go over my head so yeah it's an interface. In this case, we're specifying that we only want things that implement [Display](https://doc.rust-lang.org/std/fmt/trait.Display.html). What this means is that we can display it as a string. That may seem obvious but some datatypes may for some reason or another not play nicely with the idea of being displayed like that which won't implement the Display trait meaning it can't be given as an input to this function.

## Conclusion

Accept it person I'm arguing with Rust enums are superior, if anyone complains about a lack of C Unions in Dart maybe consider suggesting Rust enums... or just copy [typescript's unions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) which is probably what these people are actually advocating for and tbh while technically inferior to rust enums has its own merits.

## Is how I would've ended it

But arguments/discussions aren't one sided like that and I chatted with the person shortly after writing this article and they made an interesting point.

## If the type fits you should accept it
This is a rebuke to my "Oh hey I implement your interface now, fuck you" and is simply asking how that's a problem. After all the interface should specify what you need from some data type to be able to use it in some application. This also moves the control flow of which code to run outside of the method taking in data. Combined with the idea that the interface setup can also give compiler errors where it makes sense the question has to be now be asked why are rust enums preferable?

## welll uuuuuuuuuuuuh
When you have a finite number of states which may contain state within themselves and aren't just representing different input types they're pretty nice.

## Conclusion 2(Electric boogaloo)
Use interfaces when you want certain garantees about a type, use rust enums when you want a finite set of states.
