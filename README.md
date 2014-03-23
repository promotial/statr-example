Example of a sencha touch app using STATR
====================================
This is a project exemplifying STATR for Sencha Touch, an end-to-end testing solution combining combining Karma, Selenium Webdriver and Yadda.

Instructions
------------
Ensure you have [node](http://nodejs.org/download/)

Now clone this project's git repo and run:
```bash
  git submodule init
  git submodule update
  cd test/statr
  git checkout
  ./statr first
```

And every time you want to start it again, run this:
```bash
  cd test/rtd
  ./statr start
```

NOTE: The actual app being tested is a modified version of the notes app found in this book http://miamicoder.com/sencha-touch-book/ all rights are reserved to its author.
