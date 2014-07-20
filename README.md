Example of a sencha touch app using STATR
====================================
This is a project exemplifying [STATR](https://github.com/promotial/statr), an end-to-end testing solution combining [Karma](http://karma-runner.github.io/), [Selenium Webdriver](https://code.google.com/p/selenium/wiki/WebDriverJs) and [Yadda](https://github.com/acuminous/yadda).

Instructions
------------
Ensure you have [node](http://nodejs.org/download/)

Now clone this project's git repo and run:
```bash
  git submodule init
  git submodule update
  cd test/statr
  git checkout
  ./generate/app-stub NotesApp > app.js;
  ./statr first
```

And every time you want to start it again, run this:
```bash
  cd test/statr
  ./statr start
```

NOTE: The actual app being tested is a modified version of the notes app found in this tutorial http://miamicoder.com/2012/how-to-create-a-sencha-touch-2-app-part-1/ all rights are reserved to its author.
