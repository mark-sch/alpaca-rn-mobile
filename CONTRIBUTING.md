# Contributing to Alpaca

## Reporting Bugs

- Before filing a new task, try to make sure it doesn't already exist.
- Provide environment informations, such as RN version, OS version etc.
- Provide error logs or stack trace if possible. For UI issues, screenshots are helpful.
- Try to provide a reduced test case.

## Submitting pull request

When you are at the stage of opening your pull request on GitHub, make sure you include the following info in the description:
- Everything works on iOS/Android
- Unit tests are passing
- New unit tests have been included for any new features or functionality
- Branch has been synced with the upstream repo and any merge conflicts have been resolved.
- The reasoning behind this change. What bug is it fixing? If it's a new feature, what need is it addressing, or value is it adding?
- Any notes to help us review the code or test the change.
- Any relevant screenshots or evidence of this feature in action. GIFs are particularly great to show new functionality.

[Here](https://blog.github.com/2015-01-21-how-to-write-the-perfect-pull-request/) is a great guide from GitHub on how to write a great pull request!

## Style Guide for Code Contributions

### JavaScript/JSX

* 4 spaces for indentation (no tabs)
* Prefer ES6/ES7 syntax
* Use single-line comments with markdown syntax for documentation
* [Airbnb JavaScript Style Guide]
* [Airbnb React/JSX Style Guide]

[Airbnb JavaScript Style Guide]: https://github.com/airbnb/javascript
[Airbnb React/JSX Style Guide]: https://github.com/airbnb/javascript/tree/master/react

### Objective-C

* Space after `@property` declarations
* Brackets on *every* `if`, on the *same* line
* `- method`, `@interface`, and `@implementation` brackets on the following line
* *Try* to keep it around 80 characters line length (sometimes it's just not possible...)
* `*` operator goes with the variable name (e.g. `NSObject *variableName;`)
* [Objective-C Style Guide]

[Objective-C Style Guide]: https://github.com/raywenderlich/objective-c-style-guide

### Java

* [Java Style Guide]

[Java Style Guide]: https://github.com/raywenderlich/java-style-guide

