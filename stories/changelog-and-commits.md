# Changelog and Commits

This project uses the Standard Changelog format (previously known as Angular Conventional Changelog format). Since the changelog is generated automatically from the commit messages, it is absolutely necessary that the commits comply with the required schema. 

More information can be found at: 
https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md


## Short summary:

A commit message consists of a header, body and footer. The header has a type, scope and subject:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
The type is either
```
feat(...):
fix(...):
perf(...):
docs(...):
chore(...):
style(...):
refactor(...):
test(...):
```

Type, Scope and subject are required!

Example 1:
```
docs(stories): added new stories

This commit adds various new stories

Closes #13,#13
```

Example 2:
```
fix(header-component): fixes change detection
```

For more examples see output of `git log`.
