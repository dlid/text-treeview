# text-treeview
node.js library to write a tree hierarchy for console output.

[![Build Status](https://travis-ci.org/dlid/text-treeview.svg?branch=master)](https://travis-ci.org/dlid/text-treeview) [![codecov](https://codecov.io/gh/dlid/text-treeview/branch/master/graph/badge.svg)](https://codecov.io/gh/dlid/text-treeview) [![Maintainability][![Maintainability](https://api.codeclimate.com/v1/badges/7bb4fc43c7b3b6f0aa5f/maintainability)](https://codeclimate.com/github/dlid/text-treeview/maintainability)

# The why
When writing another library I was working with a deep hierarchy of objects that I had to verify.

I iterated the objects and wrote some metadata using `space` for indenting the lines. But as the hierarchy became more complex it was difficult to follow.

So I wrote a little helper function that could take an array of objects and create a treeview-like experience, making it a lot easer to see the actual structure.

Then I decided it was an excellent little function to share with everyone.

### Installation
...
