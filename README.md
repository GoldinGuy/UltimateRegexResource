# UltimateRegexResource
📝 A compilation of Regex syntax and resources for the Google DSC Regex Event

[![Discuss On Discord][discord]][discord-url]
[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues]][issues-url]

<!-- 📄 TODO: Add after presentation [**Watch a recording of the Regex presentation here!**](https://www.youtube.com/watch?v=mqhDMv6nIVI) -->

Git is the most popular [version control system](https://en.wikipedia.org/wiki/Version_control). It tracks changes you make to files and keeps a record of your work. It also lets you revert to earlier versions of your code if the need arises. Git also drastically improves collaboration, allowing multiple people to work in sync on the same source code. Below is a selection of the most helpful and commonly used Git commands to power up your programming!

Regex is very powerful, but it's also often confusing to learn and difficult to remember.

![image](https://user-images.githubusercontent.com/47064842/124194070-ee6c7680-da95-11eb-8f9a-0a2d3f7c4f33.png)


For that reason, I've compiled this syntax list and regex resources for your use below!

The [Docs](https://github.com/GoldinGuy/UltimateRegexResource/tree/main/docs) folder of this repo contains a simple profile/resume static site built on HTML5 and [TailwindCSS](https://v1.tailwindcss.com/) to help learn about [Github pages](https://pages.github.com/). You can clone the repository and test it out yourself, or visit [this link](https://goldinguy.github.io/UltimateRegexResource/) to see a live demo. For more info look at the [README](https://github.com/GoldinGuy/UltimateRegexResource/blob/main/docs/README.md) for the `/docs` directory.

This repo contains a powerpoint presentation explaning many of these commands that can be viewed online [here](https://docs.google.com/presentation/d/1BHa_ZxiyRRJQKaCRXTozmMhlPgkFcx-zn5esd5n-HWY/edit?usp=sharing).

## 📄 Table of Contents

- [Installing Git](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/set-up-git)
- [Gitting Existing Projects](#-gitting-existing-projects)
- [Gitting Started - Setting Up a New Repo](#-gitting-started---setting-up-a-new-repo)
- [The Nitty Gitty - Examine History & State](#-the-nitty-gitty---examine-history--state)
- [Branching Out - Grow, Mark & Tweak History](#-branching-out---grow-mark--tweak-history)
- [Git Gud - Dealing With Merge Conflicts](#-git-gud---dealing-with-merge-conflicts)
- [Git More - Pushing, Pulling, & Remote Origin](#-git-more---pushing-pulling--remote-origin)
- [Gitting Complicated - The Danger Zone](#-gitting-complicated---the-danger-zone)
- [Git Resources](#-more-git-resources)
- [Contributing](#contributing)


### ✏️ Characters in a Regex Story

| Syntax | Description | Matches | Example String | Example Expression | Example Match |
| ------- | ---------- |  ---------- |  ----- | ---------- | ---- |
| `.` | *any* char | Literally any char *(except line break)* | `a-c1-3` | `a.c` | `a-c` | 
| `\w` | *word* char | ASCII char *(Or Unicode char in Python & C#)* | `a-c1-3` | `\w-\w` | `a-c` | 
| `\d` | *digit* char | Digit 0-9 *(Or Unicode digit in Python & C#)* | `a-c1-3` | `\d-\d` | `1-3` |
| `\s` | *whitespace* char | Space, tab, vertical tab, newline, carriage return *(Or Unicode seperator in Python, C#, & JS)* | `a b` | `a\sb` | `a b` | 
| `\W` | **NOT** *word* char | Anything `\w` does not match | `a-c1-3` | `\W-\W` | `1-3` | 
| `\D` | **NOT** *digit* char |  Anything `\d` does not match | `a-c1-3` | `\D-\D` | `a-c` |
| `\S` | **NOT** *whitespace* char | Anything `\s` does not match | `a-c1-3` | `\S-\S` | `a-c` |


### 🖋️ Special Characters

| Syntax | Description | Matches | Example String | Example Expression | Example Match | 
| ------- | ---------- |  ---------- | ------ | ---------- | ---- |
| `\` | *escape* char | When placed before special chars, matches them. This includes the following chars: `[{()}].*+?$^/\` | `)$[]*{` | `\[\]` | `[]` | 


### 🖌️ Quantifiers

| Syntax | Description |  Matches | Example String | Example Expression | Example Match |
| ------- | ---------- |  ---------- |  ---------- | ---- | ---- |
| `c?` | *0-1* quantifier | 0 or 1 of the preceding expression | `ccc` |  `c?` | `c` | 
| `c{X}` | *X* quantifier | X of the preceding expression |  `ccc` | `c{2}` | `cc` | 
| `c{X,}` | *X+* quantifier | X or more of the preceding expression | `ccc` |  `c{2,}` | `ccc` | 
| `c{X,Y}` | *range* quantifier | Between X and Y of the preceding expression |  `ccc` | `c{1,3}` | `ccc` |

Beyond standard quantifiers, there are a few additional types: *greedy*, *lazy*, and *possessive*. 

| Syntax | Description |  Matches | Example String | Example Expression | Example Match |
| ------- | ---------- |  ---------- |  ---------- | ---- | ---- |
| `c*` | *0+ greedy* quantifier | as many chars as possible | `abccc` | `c*` | `ccc` | 
| `c+` | *1+ greedy* quantifier | 1 or more of the preceding expression | `ccc` |  `c+` | `ccc` | 
| `c*?` | *0+ lazy* quantifier | as few chars as possible | `abccc` | `c*?` | `c` | 
| `c+?` | *1+ lazy* quantifier | as few chars as possible | `abccc` | `c+?` | `c` | 
| `c*+` | *0+ possessive* quantifier | as many chars as possible without backtracking | `abccc` | `c*+` | `ccc` | 
| `c++` | *1+ possessive* quantifier | as many chars as possible without backtracking | `abccc` | `c++` | `ccc` | 


### 🖊️ Anchors

| Syntax | Description |  Matches | Example Expression | Example Match |
| ------- | ---------- |  ---------- |  ---------- | ---- |
| `^c` | *start* anchor | start of string | `c?` | `c` | 
| `c$` | *end* anchor | end of string | `c+` | `c` | 
| `c{X}` | *X* quantifier | X of the preceding expression | `c{2}` | `cc` | 
| `c{X,}` | *X-or-more* quantifier | X or more of the preceding expression | `c{2,}` | `ccc` | 
| `c{X,Y}` | *range* quantifier | Between X and Y of the preceding expression | `c{1,3}` | `ccc` |

<!-- ### 🖍️ The Nitty Gitty - Examine History & State

| Command | Description |
| ------- | ----------- |
| `git status` | See details about the current branch |
| `git show` | Shows changes in committed files |
| `git log` | View changes in commit history |
| `git log --summary` | View changes (detailed) |
| `git log --oneline` | View changes (briefly) |
| `git diff <source branch> <target branch>` | Preview changes before merging | -->

<!-- 
### ✒️ Regex Resources

- [Git Docs](https://git-scm.com/doc), for those who want to dive deep into the documentation
- [Git Handbook](https://guides.github.com/introduction/git-handbook/), for those who want a quick overview
- [Visual Git CheatSheet](https://ndpsoftware.com/git-cheatsheet.html), for those who are visual learners
- [Official Printable PDF CheatSheet](https://training.github.com/downloads/github-git-cheat-sheet.pdf), for those who need the physcial copy
- [Visualize Git Under the Hood](https://git-school.github.io/visualizing-git/), allows you to explore exactly how commands affect repo structure
- [Stanford GitMagic](http://www-cs-students.stanford.edu/~blynn/gitmagic/), a plain but detailed quide to git
- [GitReady](http://gitready.com/), lets you learn git one commit at a time
- [Git From the Bottom Up](https://jwiegley.github.io/git-from-the-bottom-up/), gives you a better understanding of the powerful system
- [Git, the Simple Guide](https://rogerdudler.github.io/git-guide/), as stated, with no deep knowledge required
- [Git Explained (Not just commands)](https://towardsdatascience.com/git-help-all-2d0bb0c31483), a brief guide including more than commands
- [Git-It](https://github.com/jlord/git-it-electron#what-to-install), an app that teaches you git via challenges in the terminal
- [Interactive Way to Learn Git Branching](https://learngitbranching.js.org/), for an enjoyable way to tackle an important concept
- [Git Markdown Emoji](https://github.com/ikatyang/emoji-cheat-sheet), to spice up your Git repos
- [Article on Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/), which pretty much everyone could stand to improve ;)
- [Github Student Developer Pack](https://education.github.com/pack), seriously, if you're a student you should have this
- [Intro to Git Rebase](https://dev.to/maxwell_dev/the-git-rebase-introduction-i-wish-id-had), a great explanation of a powerful command -->


### Contributing

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
