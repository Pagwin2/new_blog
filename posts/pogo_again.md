---

title: "Pogo again"

description: "I swear I'm going to finish it this time (I'd borked the format for this post in hugo previously so sorry if you noticed)"

date: 2023-01-01

draft: true

---

# Another blog post that mentions Pogo

Welcome to another blog about pogo aka that todo list that I way over-engineered. Anyways I started over again but this time I swear I'm gonna finish it, I promise I won't throw it out again. Oh what have I done? I have the database setup and some method for interacting with the data inside which I'm 100% going to through out in favor of raw sql queries... Wait no I promise I'm doing good this time the only reason I'm probably not gonna use existing work is because I'm going to make the api able to give back data based on what's being requested and also have things be mostly stateless because that allows scaling and... Okay I might still be over-engineering this but at least the way I'm over-engineering it is by making it scale instead of making it a mess and annoying to work on. Anyways here's some explanation of what I've done so far.

## Initial setup

So to start with I made a struct corresponding to a task in this todolist app which looked like this
```rs
#[derive(Clone)]
pub struct TaskV1{
    title:String,
    body:String,
    connected:Vec<String>,
    parents: Vec<rc::Weak<TaskV1>>,
    children: Vec<rc::Rc<TaskV1>>
}
```
however after some work at time of writing it's looking like the task struct will either look like
```rs
#[derive(Clone)]
pub struct TaskV1{
    id: Uuid,
    title:String,
    body:String,
    progress:f32,
    login:String
}
```
or
```rs
```
heh yeah as I said I'm considering getting rid of the methods involving tasks which would make a task struct(at least a general task struct) redundant but if you pressed me I'd tell you that
```rs
#[derive(Serialize,Deserialize)]
struct TaskSerial{
    title: Option<String>,
    body: Option<String>,
    progress: Option<f32>,
    children: Option<Vec<Uuid>>,
    parents: Option<Vec<Uuid>>,
    media: Option<Vec<Uuid>>
}
```
would be the task struct.

## But why?

Why would I remove some attributes like that or stick all of them into Options? Why are there a bunch of Uuids now? Also why do tasks have parents and children? These are good questions, to answer the first two I'm gonna spend a good chunk of this blog explaining what I've actually done but lemme answer the latter question real quick

## Task organization as a pseudo-tree

The reason nodes can have children is twofold: first, tasks can have subtasks and second, this allows me to avoid having a special category type which has tasks as children. This simplifies things from a code perspective and allows me to avoid duplication of functionality between categories and tasks, the only bit of redundancy is the fact that a category having progress is nonsensical but that's something I can figure out when I get to building a client. Anyways onto why Tasks underwent a bunch of change

## Abstracting task encoding away

Oh you think I started with DB stuff no no no I started by setting some stuff up to make encoding and decoding tasks as seamless as possible. Namely a versioning enum(it's boring moving on) and a Trait which was setup like this.
```rs
/// Trait that any method of encoding and decoding tasks needs to implement
#[async_trait]
pub trait TaskEncoder{
    /// The type that can be gotten from a call to either provide_identifiers or
    /// encode_task and if a value of it is gotten that way then should be usable with decode_task
    /// to retrieve the original task it must be serializable with serde due to it being the value
    /// passed around when working with tasks potentially onto disk or over network
    //Specifying DeserializeOwned may be a problem in the future if I need to deal with types with
    //lifetimes but until then this is good
    type Identifier:serde::Serialize + serde::de::DeserializeOwned;
    type EncodingError;
    type DecodingError;
    type IdentityFetchError;
    async fn encode_task(&mut self, task:TaskVersioning, login:&str)->Result<Self::Identifier,Self::EncodingError>;
    async fn decode_task(&mut self,id:Self::Identifier, login:&str)->Result<Option<TaskVersioning>,Self::DecodingError>;
    async fn provide_identifiers(&mut self, login:&str)->Result<Vec<Self::Identifier>,Self::IdentityFetchError>;
}
```
Once that was done I just needed to implement it in SQL and the details involved in that made having the struct a bit more iffy. With that trait done I moved on to doing ~~your mom~~ the sql.

## Doing the sql(and remembering I need to store completion)

Yeah I forgor about the fact that I need to store task completion/progress so I added a field corresponding to that at some point but it isn't worth commenting on beyond that. Anyways as the header of this sections suggests I decided to have pogo store it's data in an sql db, specifically postgres. So I got to work making the schema making a table like this.
```sql
CREATE TABLE tasks {
    id uuid,
    title varchar,
    body varchar
}
```
Now if you have any sql experience you'll probably understand why everything became Uuids at this point(or maybe your techniques are beyond my comprehension and you're just confused idk). The reason I added an id field in the sql is so I could look up a particular task by id corresponding to this row being added to the db is the field getting added to the struct. Where are the children, parents and content/media fields? Oh well you see from the 1 minute of googling I did postgres doesn't let you have a column which is a variable length array but more importantly I remembered that sticking structures inside of other structures isn't how sql is supposed to work. So lik a good little programmer I made some more tables. One table which you just saw is the task table which has all the tasks in it, the second table specifies parent child relations via uuids, the third table is a list of media with their own uuids and the fourth table is a relation between media ids and task ids. Combined with me not wanting to recursively fetch tasks you can see why everything is uuids now instead of having tasks in tasks. Also at some point amongst this change I added a column to the task table to specify a login via a varchar which I'm intending to use to store probably an Oauth token from google/github or alternatively an sha256hmac of their username and password, probably with additional hashing on top. Also I made some indexes over tables.

## Making the backend api

So now we've explained the first possible end point for the task struct that point being just 1 row in the task table. But what about the one with all the Options or the argument that the task struct won't be a thing anymore? Well that's due to the rest inspired http api. While I haven't finished implementing it yet I think I'm done designing the stuff related to the task object it so here are the endpoints relating to tasks.
```
GET /task/$id
PUT /task
UPDATE /task/$id
DELETE /task/$id
```
PUT just creates a task with everything set to default and gives back the uuid of that task and DELETE just deletes it. The ones which make things iffy are GET and UPDATE which both allow the client making a request to the api to only provide some of a task or for it to only update some of the task. Due to data now being optional the original task struct didn't represent what endpoints would be delivering, what's more it wasn't needed for database queries due to SQL queries being decently flexible with me using direct SQL queries through [sqlx](https://crates.io/crates/sqlx).
