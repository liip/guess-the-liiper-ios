# Guess the Liiper iOS
[![Build Status](https://travis-ci.org/liip/guess-the-liiper-ios.svg?branch=master)](https://travis-ci.org/liip/guess-the-liiper-ios)

This is a test project to explore React Native.


![guess](https://cloud.githubusercontent.com/assets/133832/8000133/fb6074be-0b56-11e5-994d-60a61ce2147f.gif)

## Requirements

 * node and npm
 * watchman `brew install watchman`
 * flow `brew install flow`
 * XCode

## Installation

```
git clone git@github.com:adri/guess-the-liiper-ios.git
cd guess-the-liiper-ios
npm install
npm start
#open ios/guess_the_liiper.xcodeproj
react-native run-ios
```

Press `%` + `D` in the simulator for debugging options.

## Distribution

Travis CI is configured to automatically deploy the app to the
App Store Testflight whenever there is a new commit on the `master` branch.

[Fastlane](https://github.com/KrauseFx/fastlane) is used to build,
deploy and make screenshots. **For all commands please switch to the ios folder.**

```bash
cd ios
```

 * Make screenshots `fastlane screenshots`
 * Deploy to internal testers `fastlane testflight`
 * Add new tester via CLI `pilot add email@invite.com`

### Credentials

You find the username in `ios/fastlane/Appfile` and the `DELIVER_PASSWORD`
is set in [https://travis-ci.org/liip/guess-the-liiper-ios/settings which]()
you can access with a Github account and access to the Liip organisation.

## Screens

 * Login
 * Play
 * Highscore



