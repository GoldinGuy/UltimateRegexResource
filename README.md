# UltimateRegexResource

📝 A compilation of Regex syntax and resources for the Google DSC Regex Event

[![Discuss On Discord][discord]][discord-url]
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues]][issues-url]

<!-- 📄 TODO: Add after presentation [**Watch a recording of the Regex presentation here!**](https://www.youtube.com/watch?v=mqhDMv6nIVI) -->

Regex, or [regular expressions](https://en.wikipedia.org/wiki/Regular_expression), are patterns used to match strings. Regex is commonly used for searching/filtering strings for information, input validation, and web scraping. "Real world" examples include everything from validating email addresses to formatting class names in a grades app.

Regex is incredibly powerful, but due to its seemingly unintelligible nature it's also often intimidating to learn and difficult to remember.

<img src="https://user-images.githubusercontent.com/47064842/125002295-9a780980-e022-11eb-9b29-4411e2780aaa.png" width="350" height="auto">
<!-- ![image](https://user-images.githubusercontent.com/47064842/124194070-ee6c7680-da95-11eb-8f9a-0a2d3f7c4f33.png) -->

For that reason, I've compiled a selection of the most helpful and commonly used regex syntax and some regex resources for your use below!

## 📄 Table of Contents

- ["Balderdash" Basics (of Regex)](#%EF%B8%8F-balderdash-basics-of-regex)
- ["Flapdoodle" Flags](#-flapdoodle-flags)
- ["Gibberish" Characters](#%EF%B8%8F-gibberish-characters)
- ["Bafflegab" Special Characters](#%EF%B8%8F-bafflegab-special-characters)
- ["Rigmarole" Ranges](#%EF%B8%8F-rigmarole-ranges)
- ["Jargon" Quantifiers](#%EF%B8%8F-jargon-quantifiers)
- ["Gobbledygook" Groups](#%EF%B8%8F-gobbledygook-groups)
- ["Malarkey" Anchors](#-malarkey-anchors)
- ["Mumbo Jumbo" Regex Resources](#-mumbo-jumbo-regex-resources)
- [Contributing](#-codswallop-contributing)

The [Redoku](https://github.com/GoldinGuy/UltimateRegexResource/tree/master/RedokuRN) folder of this repo contains the app ["Redoku,"](TODO:) a simple React Native application created for this event that allows you to hone your Regex skills through sudoku-like puzzles. This was heavily based on [redoku](https://github.com/padolsey/redoku), an awesome website with the same name. Thank you to [@padolsey](https://github.com/padolsey) for granting permission to use the name "Redoku!" You can download the app on [ios](TODO:) or [android](TODO:).


<img src="https://user-images.githubusercontent.com/47064842/125003395-212de600-e025-11eb-89d2-79fc79d8524f.png" width="300" height="auto">


This repo contains a powerpoint presentation that can be viewed online [here](https://docs.google.com/presentation/d/1cTKU9GCAiubAG2wcFk9VdNwo5mn0ulzB7bJz9GICAWY/edit?usp=sharing).

Anywhere used below, `char` is shorthand for `character` (letter, digit or symbol), and `exp` is shorthand for a `regular expression`.


### ✒️ "Balderdash" Basics (of Regex)

- Regular expressions start and end with "slash" characters `/`.
- Patterns return the first [case-sensitive](https://en.wikipedia.org/wiki/Case_sensitivity) match they find by default.

Therefore: given the sample string `I scream, you scream, we all scream for ice cream`, `/scream/` matches the first instance of "scream."

This behavior can be modified with [flags](#-flags).

### 🚩 "Flapdoodle" Flags

| Syntax | Flag          | Behavior                                                       | Example  |
| ------ | ------------- | -------------------------------------------------------------- | -------- |
| `g`    | _global_      | Returns additional matches                                     | `/foo/g` |
| `i`    | _insensitive_ | Allows case-insensitive matches                                | `/foo/i` |
| `x`    | _verbose_     | Ignore whitespace & allow comments                             | `/foo/x` |
| `u`    | _unicode_     | Expressions are treated as Unicode (UTF-16)                    | `/foo/u` |
| `s`    | _singleline_  | Treats entire string as one line (allows `.` to match newline) | `/foo/s` |
| `m`    | _multiline_   | Start & end anchors now trigger on each line                   | `/foo/m` |
| `n`    | _nth match_   | Matches text returned by _nth_ group                           | `/foo/m` |

Regex includes several flags that are appended to the end of the expression to change behavior. Using the string `I scream, you scream, we all SCREAM for ice cream`, the updated regex `/scream/gi` will now return `scream scream SCREAM`.

### ✏️ "Gibberish" Characters

| Syntax | Character            | Matches                                                                                         | Example String | Example Expression | Example Match |
| ------ | -------------------- | ----------------------------------------------------------------------------------------------- | -------------- | ------------------ | ------------- |
| `.`    | _any_                | Literally any char _(except line break)_                                                        | `a-c1-3`       | `a.c`              | `a-c`         |
| `\w`   | _word_               | ASCII char _(Or Unicode char in Python & C#)_                                                   | `a-c1-3`       | `\w-\w`            | `a-c`         |
| `\d`   | _digit_              | Digit 0-9 _(Or Unicode digit in Python & C#)_                                                   | `a-c1-3`       | `\d-\d`            | `1-3`         |
| `\s`   | _whitespace_         | Space, tab, vertical tab, newline, carriage return _(Or Unicode seperator in Python, C#, & JS)_ | `a b`          | `a\sb`             | `a b`         |
| `\W`   | **NOT** _word_       | Anything `\w` does not match                                                                    | `a-c1-3`       | `\W-\W`            | `1-3`         |
| `\D`   | **NOT** _digit_      | Anything `\d` does not match                                                                    | `a-c1-3`       | `\D-\D`            | `a-c`         |
| `\S`   | **NOT** _whitespace_ | Anything `\s` does not match                                                                    | `a-c1-3`       | `\S-\S`            | `a-c`         |

### 🖋️ "Bafflegab" Special Characters

| Syntax | Special Character | Matches                                             | Example String | Example Expression | Example Match |
| ------ | ----------------- | --------------------------------------------------- | -------------- | ------------------ | ------------- |
| `\`    | _escape_          | The following when preceding them: `[{()}].*+?$^/\` | `)$[]*{`       | `\[\]`             | `[]`          |

| Syntax | Substitute        | Behavior                      |
| ------ | ----------------- | ----------------------------- |
| `\n`   | _newline_         | Insert a newline char         |
| `\t`   | _tab_             | Insert a tab char             |
| `\r`   | _carriage return_ | Insert a carriage return char |
| `\f`   | _form-feed_       | Insert a form feed char       |

### 🖌️ "Rigmarole" Ranges

| Syntax     | Range                 | Matches                                     | Example String     | Example Expression | Example Match   |
| ---------- | --------------------- | ------------------------------------------- | ------------------ | ------------------ | --------------- |
| `[pog]`    | _word list_           | Either `p`, `o`, or `g`                     | `awesomePOSSUM123` | `[awesum]+`        | `awes`          |
| `[^pog]`   | **NOT** _word list_   | Any char except `p`, `o`, or `g`            | `awesomePOSSUM123` | `[^awesum]+`       | `o`             |
| `[a-z]`    | _word range_          | Any char between `a` and `z`, inclusive     | `awesomePOSSUM123` | `[a-z]+`           | `awesome`       |
| `[^a-z]`   | **NOT** _word range_  | Any char not between `a` and `z`, inclusive | `awesomePOSSUM123` | `[^a-z]+`          | `123`           |
| `[0-9]`    | _digit range_         | Any char between `0` and `9`, inclusive     | `awesomePOSSUM123` | `[0-9]+`           | `123`           |
| `[^0-9]`   | **NOT** _digit range_ | Any char not between `0` and `9`, inclusive | `awesomePOSSUM123` | `[^0-9]+`          | `awesomePOSSUM` |
| `[a-zA-Z]` | _word range_          | Any char not between `a` and `z`, inclusive | `awesomePOSSUM123` | `[a-zA-Z]+`        | `awesomePOSSUM` |
| `[a-zA-Z]` | _word range_          | Any char not between `a` and `z`, inclusive | `awesomePOSSUM123` | `[a-zA-Z]+`        | `awesomePOSSUM` |

### 🖊️ "Jargon" Quantifiers

| Syntax  | Quantifier | Matches                                     | Example String | Example Expression | Example Match |
| ------- | ---------- | ------------------------------------------- | -------------- | ------------------ | ------------- |
| `?`     | _optional_ | 0 or 1 of the preceding expression          | `ccc`          | `c?`               | `c`           |
| `{X}`   | _X_        | X of the preceding expression               | `ccc`          | `c{2}`             | `cc`          |
| `{X,}`  | _X+_       | X or more of the preceding expression       | `ccc`          | `c{2,}`            | `ccc`         |
| `{X,Y}` | _range_    | Between X and Y of the preceding expression | `ccc`          | `c{1,3}`           | `ccc`         |

Beyond standard quantifiers, there are a few additional modifiers: _greedy_, _lazy_, and _possessive_.

| Syntax | Quantifier      | Matches                                                                                      | Example String | Example Expression | Example Match |
| ------ | --------------- | -------------------------------------------------------------------------------------------- | -------------- | ------------------ | ------------- |
| `*`    | _0+ greedy_     | 0 or more of the preceding expression, using as many chars as possible                       | `abccc`        | `c*`               | `ccc`         |
| `+`    | _1+ greedy_     | 1 or more of the preceding expression, using as many chars as possible                       | `abccc`        | `c+`               | `ccc`         |
| `*?`   | _0+ lazy_       | 0 or more of the preceding expression, using as few chars as possible                        | `abccc`        | `c*?`              | `c`           |
| `+?`   | _1+ lazy_       | 1 or more of the preceding expression, using as few chars as possible                        | `abccc`        | `c+?`              | `c`           |
| `*+`   | _0+ possessive_ | 0 or more of the preceding expression, using as many chars as possible, without backtracking | `abccc`        | `c*+`              | `ccc`         |
| `++`   | _1+ possessive_ | 1 or more of the preceding expression, using as many chars as possible, without backtracking | `abccc`        | `c++`              | `ccc`         |

Put simply, greedy quantifiers match as much as possible, lazy as little as possible, and possessive as much as possible without backtracking.

What this means in practice is that possessive quantifiers will always return either the same match as greedy quantifiers, or if backtracking is required they will return no match. Therefore, posessive quantifiers should be used when you know backtracking is _not_ necessary, allowing increased performance.

### 🖍️ "Gobbledygook" Groups

| Syntax     | Group       | Matches                                                         | Example String     | Example Expression      | Example Match      |
| ---------- | ----------- | --------------------------------------------------------------- | ------------------ | ----------------------- | ------------------ |
| `\|`       | _alternate_ | Either the preceding or following expression                    | `truly rural`      | `truly\|rural`          | `truly`            |
| `(...)`    | _isolate_   | Everything enclosed; treats as separate capture group           | `truly rural`      | `truly (rural)`         | `truly`, `rural`   |
| `(?:...)`  | _include_   | Everything enclosed; enables using quantifiers on part of regex | `truly ruralrural` | `truly (?:rural)+`      | `truly ruralrural` |
| `(?\|...)` | _combine_   | Everything enclosed; treats all matches as same group           | `truly rural`      | `(?\|(rural)\|(truly))` | `truly`            |
| `(?>...)`  | _atomic_    | Longest possible string without backtracking                    | `truly rural`      | `(?>rur)`               | ` rur`             |
| `(?#...)`  | _comment_   | Everything enclosed; treats as comment and ignores              | `truly #rural`     | `truly (?#rural)`       | `truly`            |

### ⚓ "Malarkey" Anchors

| Syntax | Anchor                  | Matches                                             | Example String       | Example Expression | Example Match |
| ------ | ----------------------- | --------------------------------------------------- | -------------------- | ------------------ | ------------- |
| `^`    | _start_                 | Start of string                                     | `she sells seasells` | `^\w+`             | `she`         |
| `$`    | _end_                   | End of string                                       | `she sells seasells` | `\w+$`             | `seashells`   |
| `\b`   | _word boundary_         | Between a character matched and not matched by `\w` | `she sells seasells` | `s\b`              | `s`           |
| `\B`   | **NOT** _word boundary_ | Between two characters matched by `\w`              | `she sells seasells` | `\w+$`             | `seashells`   |

There are additional anchors available that are unaffected by multiline mode [m](#-flags).

| Syntax | Anchor         | Matches                                            | Example String    | Example Expression | Example Match |
| ------ | -------------- | -------------------------------------------------- | ----------------- | ------------------ | ------------- |
| `\A`   | _multi-start_  | Start of string                                    | `she sees cheese` | `\A\w+`            | `she`         |
| `\Z`   | _multi-end_    | End of string                                      | `she sees cheese` | `\w+\Z`            | `cheese`      |
| `\Z`   | _absolute end_ | Absolute end of string, ignoring trailing newlines | `she sees cheese` | `\w+\Z`            | `cheese`      |

### 📌 "Mumbo Jumbo" Regex Resources

- [Regex101](https://regex101.com/), an incredible testing utility for all flavors of Regex
- [RegexOne](https://regexone.com/), a great way to learn Regex through brief lessons
- [Regexr](https://regexr.com/), another way to test your expressions
- [Rubular](https://rubular.com/), a Ruby-based regex tester w/ quick reference
- [Regex.Info](https://www.regular-expressions.info/), a plain but detailed guide to regex
- [RexEgg](http://www.rexegg.com/), the self proclaimed "world's most tyrannisaurical regex tutorial"
- [CodeAcademy Regex Tutorial](https://www.codecademy.com/learn/introduction-to-regular-expressions), a 1-hour course w/ certification
- [SitePoint Learn Regex](https://www.sitepoint.com/learn-regex/), a great tutorial of the fundamental concepts
- [Regex Basics](https://livinglifetechway.com/regex-the-basics/?utm_source=quora&utm_medium=referral&utm_campaign=awareness), as stated, with no deep knowledge required
- [@ziishaned's Learn Regex](https://github.com/ziishaned/learn-regex), a repo that contains more info on Regex to learn it "the easy way"
- [RegexHub](https://projects.lukehaas.me/regexhub/), a collection of commonly used Regex
- ["Greedy" vs "Lazy"](https://stackoverflow.com/questions/3075130/what-is-the-difference-between-and-regular-expressions/3075532#3075532), a SO post that acts as a deep dive into their differences
- [Difference between [] and () in Regex](https://stackoverflow.com/questions/9801630/what-is-the-difference-between-square-brackets-and-parentheses-in-a-regex), a SO post that hopefully helps
- [MIT Regex Printable PDF Cheatsheet](https://web.mit.edu/hackl/www/lab/turkshop/slides/regex-cheatsheet.pdf), for those who need the physical copy
- [Stanford Regex Printable PDF Cheatsheet](https://stanford.edu/~wpmarble/webscraping_tutorial/regex_cheatsheet.pdf), for those who prefer a pinker physical copy
- [When/How Not To Use Regex](https://blog.codinghorror.com/regular-expressions-now-you-have-two-problems/), article by founder of SO that discusses what you'd expect from the title
- [Awesome Regex Resources](https://github.com/Varunram/Awesome-Regex-Resources), a comprehensive list of Regex books, articles, and utilities far larger than this

### 👥 "Codswallop" Contributing

1. Fork UltimateRegexResource [here](https://github.com/GoldinGuy/UltimateRegexResource/fork)
2. Create a branch with your improvements (`git checkout -b improvement/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin improvement/fooBar`)
5. Create a new Pull Request

#### Meta

Created by [@GoldinGuy](https://github.com/GoldinGuy) for the FAU Google DSC Regex Event.

<!-- Markdown link & img dfn's -->

[discord-url]: https://discord.gg/gKYSMeJ
[discord]: https://img.shields.io/discord/689176425701703810
[issues]: https://img.shields.io/github/issues/GoldinGuy/UltimateRegexResource
[issues-url]: https://github.com/GoldinGuy/UltimateRegexResource/issues
[contributors-shield]: https://img.shields.io/github/contributors/GoldinGuy/UltimateRegexResource.svg?style=flat-square
[contributors-url]: https://github.com/GoldinGuy/UltimateRegexResource/graphs/contributors
