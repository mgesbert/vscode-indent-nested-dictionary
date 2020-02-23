## What is this extension?

`Indent Nested Dictionary` does not parse your python code like flake8 or pep8 would.

`Indent Nested Dictionary` does not format your python code like black or autopep8 would.

`Indent Nested Dictionary` will take your python data structure and do its best to display it in a human readable way. It doesn't
even care about whether your object is even complete or not.

`Indent Nested Dictionary` is kind enough to format your Python dictionnaries, your JSON, and more broadly every structure based
on nested parenthesis, square braces and curly braces, **even incomplete**.

## How can it be useful to you?

Ever had to deal with a 10000 characters nested python dictionnary that you found in a obscure line of log? If yes, then
you should know that having a quick tool for formatting this monster in a human readable fashion can save your sanity.
`Indent Nested Dictionary` will also allow you not to worry about selecting exactly all the characters of your object, because who
got time for that?

## How to use it?

1. paste your ugly data structure somewhere in an editor
2. select it
3. `ctrl+shift+P`, run "Indent Nested Dictionary"

## Example with an incomplete JSON

![Indent incomplete JSON](https://raw.githubusercontent.com/mgesbert/vscode-indent-nested-dictionary/master/images/indent_1.gif)

## Another example with a python dictionnary

![Indent python dictionary](https://raw.githubusercontent.com/mgesbert/vscode-indent-nested-dictionary/master/images/indent_2.gif)
