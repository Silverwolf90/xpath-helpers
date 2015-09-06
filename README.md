## XPath Helpers

Contains following functions

* **select**(selector, node)
* **selectOne**(selector, node)
* **getTagWithAttributes**(tagName, attributes, node)
* **getTagsWithAttributes**(tagNames, attributes, node)
* **getById**(id, node)
* **descendants**(tagName, node)
* **children**(tagName, node)
* **firstChild**(tagName, node)
* **lastChild**(tagName, node)
* **firstDescendant**(tagName, node)
* **lastDescendant**(tagName, node)
* **ancestors**(tagName, node)
* **firstAncestor**(tagName, node)
* **lastAncestor**(tagName, node)
* **parent**(node)
* **preceding**(tagName, node)
* **firstPreceding**(tagName, node)
* **precedingWithAttributes**(tagName, attributes, node)
* **firstPrecedingWithAttributes**(tagName, attributes, node)
* **precedingSiblings**(tagName, node)
* **following**(tagName, node)
* **firstFollowing**(tagName, node)
* **followingWithAttributes**(tagName, attributes, node)
* **firstFollowingWithAttributes**(tagName, attributes, node)
* **followingSiblings**(tagName, node)

Also they are all curried because life is better that way. Selector results are cached so that expensive selectors only cost you once.

This is a thin wrapper around some trivial XPath string building and the [xpath](https://github.com/goto100/xpath) package. Naturally this is not as robust and raw xpath.

Performance is as you'd expect: The higher up in the document, the slower execution (how much slower is very dependent on the complexity of your selector).

Also... mostly untested.

## License

The MIT License (MIT)

Copyright (c) 2015 Cyril Silverman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.