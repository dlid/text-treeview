# text-treeview
node.js library to write a tree hierarchy for console output.

[![Build Status](https://travis-ci.org/dlid/text-tree.svg?branch=master)](https://travis-ci.org/dlid/text-tree) [![codecov](https://codecov.io/gh/dlid/text-tree/branch/master/graph/badge.svg)](https://codecov.io/gh/dlid/text-tree) [![Maintainability](https://api.codeclimate.com/v1/badges/2bf162d3c7be432bef28/maintainability)](https://codeclimate.com/github/dlid/text-tree/maintainability)


# The why
When writing another library I was working with a deep hierarchy of objects that I had to verify.

I iterated the objects and wrote some metadata using `space` for indenting the lines. But as the hierarchy became more complex it was difficult to follow.

So I wrote a little helper function that could take an array of objects and create a treeview-like experience, making it a lot easer to see the actual structure.

Then I decided it was an excellent little function to share with everyone.

### Installation
...
