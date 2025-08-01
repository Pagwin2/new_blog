---
title: "Everything I know about how the web works"

description: "Writing this out because I suspect posts about my learning/knowledge could help me"

date: "2025-08-01"

draft: true

tags: []
---

I know some things about how some things works.
I want to make it easy for other people to know that I know some things.

So I'm writing this post.

## HTTP

HTTP in all it's flavors (0.9, 1.0, 1.1, 2, and 3) is a network protocol which in abstract does the following.

1. Client sends a request of some method, GET, POST, PUT, HEAD, etc with a path, headers and sometimes a body
2. Server responds to the request with a response which has a status code, headers, sometimes a body and sometimes trailers

### HTTP method

HTTP methods are used to encode semantics about the operation being performed although whether or not those semantics are followed by the server is another matter.

- `GET`: Requests something from the server while changing nothing and not sending any data, in theory the response should also be cacheable, this is the request method the browser uses when you visit a webpage and to download files
- `POST`: Sends something to the server which will change something.
- `PUT`: Sends something to the server which will change something but in theory if you send the same request more than once it'll be the same as if you only sent it once
- `HEAD`: Retrieves only the headers of a `GET` request from the server

There are other methods as well but I currently view their existence as interesting nerd trivia which can occasionally come up in API design but probably won't.

### HTTP path

The path is basically everything after the domain name in a URL.
For example in `http://example.com/hello/world` the path would be `/hello/world`.

### HTTP status codes



### HTTP headers

A lot of important information about a given HTTP request or response are located in the headers with things like the [Host header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Host) which specifies the domain/ip which was connected to and [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) which will only remain a problem for you until you discover what a reverse proxy is.

They also allow for more cool stuff than even I'm really aware of.
Some of the things they allow for which I'm aware of are things like

- Dumb Caching via [Expires](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Expires)
- Clever Caching via [If Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Modified-Since) or [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ETag) with a [304 status response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/304) when valid.
- Content Negotiation via [A whole lot of stuff](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation) to pick the correct language and file format to retrieve, which isn't used very much for various reasons
- Compression via [Accept](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Encoding) and [Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding) encoding headers which is technically a part of content negotiation but unlike content negotiation this is used basically everywhere

Now you may be wondering?

> Why are HTTP methods, paths and response codes distinct from headers?
> I mean all of this is just metadata, shouldn't we have all that metadata in a uniform format?

...

Anyways.

### HTTP trailers

HTTP trailers are pretty obscure.
If they weren't used for [Server-Timing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server-Timing) debugging information (based on MDN) and gRPC nobody would use them.

## HTML


