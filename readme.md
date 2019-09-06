## Proxy Fluent API



This super simple library makes it super simple to create [Fluent APIs](https://en.wikipedia.org/wiki/Fluent_interface) in Node or the browser, using ES6 Proxies!

If you want to read more about Proxies, you can read the accompanying blog post; [Metaprogramming in ES6: Part 3 - Proxies](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/).

## Install:

```bash
npm i proxy-fluent-api
```

## Usage:

Simply call the exported function with a callback function, and it'll return a function back which as infinite properties. When one of those properties is eventually called, your callback function will be called with the previously retrieved properties. To illustrate:

```js
const proxyFluentApi = require('proxy-fluent-api');
const example = proxyFluentApi((parts) => parts.join('--'));
example.a.b.c.d() == 'a--b--c--d';
example.e.f.g.h() == 'e--f--g--h';

function urlBuilder(domain) {
  return proxyFluentApi((parts) => `${domain}${parts.join('/')}`);
}
const google = urlBuilder('https://google.com/');
google.search.products.bacon.and.eggs() == 'https://google.com/search/products/bacon/and/eggs';
```

## Contributing:

Feel free to contribute in any way you see fit. Keep in mind this repo follows the [Contributor Covenant](http://contributor-covenant.org/).

## License

```
Copyright © 2016 Keith Cirkel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
