San Guo Sha Wiki - Mobile App
=============================
This mobile app provides an offline repository of translated cards for the Chinese card game, San Guo Sha.

The intention of this personal project was to deprecate the use of Ricky Chua's online website: http://sanguoshaenglish.blogspot.ca/2010/02/kw-characters.html

Card details are scraped from Ricky's blog and stored into a Realm database.

Since the translations are provided from Ricky's blog, please see LICENSE.md for the restrictions around this code. (TL;DR: This code will not be allowed to be repurposed / published on the Google Play Store or Apple App Store)

Heroes are filtered by their faction and the user is able to also access the details of each hero's synergistic partners:

![Faction Filter](../master/README_images/sgs-factions.gif?raw=true "Faction Filter")
![Hero Details](../master/README_images/sgs-details.gif?raw=true "Hero Details")


Todo List
---------
- Refactor the styles into proper style objects on the various scenes.
- Refactor the Touchable images into its own React component.

Issues with XCode 8
-------------------
Need to disable the -Werror and -Wall C compiler flags from the xcode project.

http://stackoverflow.com/questions/39560610/react-native-run-ios-build-fail-after-xcode-update-to-8-0

Global NPM packages (I may have forgotten to take note of a couple)
-------------------
xcode
rnpm
react-native-cli

Current Issues
--------------
iOS : Fresh startup on a new device seems to not run through the RealmInitializer unless loaded directly from XCode.

Workflow for updating the pre-packaged Realm databases
------------------------------------------------------
1. Uncomment the initializer import and function call in index.ios.js.
2. Run the application in the iOS simulator.
    - This will generate a new Realm database with all the latest hero data.
    - Extract the default.realm file from the simulator data folder.
    - Replace the following Realm database files:
        1. /app/data/sgswiki_backup.realm
        2. /ios/SgsWiki/db/sgswiki.realm
        3. /android/app/src/main/res/raw/sgswiki.realm

    Note: Replacing the above database files will not update any Realm database on devices which already
          have the app installed. The app only initializes the database the very first time the application is run. There is conditional logic in both Android and iOS to prevent unnecessary database copies from the bundle to the device file system.

    Updating iOS Realm: Simply delete the current sgswiki.realm object from the application LocalDatabase folder.
