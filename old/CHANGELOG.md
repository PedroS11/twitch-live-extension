# Changelog

## 3.3.0 (Aug 5th 2022)

### Functionalities:
- Adds explore livestreams option
- UI refactor

## 3.2.1 (May 6th, 2022)

### Fixes:

- Fix the retry policy to avoid the wrong "Your followed channels are all offline..." message when there was an issue calling Twitch API

- Set a 3 time retry when it fails calling API

- Force authentication popup if API returns Unauthorized/Forbidden

## 3.2.0 (April 15th, 2022)

### Functionalities:
- Twitch Live Extension has now Firefox and Microsoft Edge support

### Fixes:

- Small UI fix

## 3.1.0 (April 5th, 2022)

### Functionalities:
- Shows how long a stream has been live

## 3.0.3 (March 15, 2022)

### Fixes:

- Update extension description

## 3.0.2 (March 14, 2022)

### Functionalities:

- Adds a badge icon with the current number of livestreams

## 3.0.1 (July 14, 2021)

### Fixes:

- Fix extension name

## 3.0.0 (July 14, 2021)

### Functionalities:

- Use of new Twitch endpoint Get Live Followed Streams
- Use specific scopes to call the new endpoint
- Removes button to sync follows
- Refactores reducer and Twitch api code

## 2.3.0 (April 30, 2021)

### Functionalities:

- Display title on mouse over a stream 

## 2.2.0 (March 1, 2021)

### Functionalities:

- Adds "Just went live" notifications feature
- Adds background file to get token and set alarm
- On extension update, open the changelog page with the new features

## 2.1.2 (January 6, 2021)

### Fixes:

- Upgrades **_axios_** version to fix vulnerability
- Upgrades **_react-scripts_** version to fix vulnerability
- Updates linting rules

## 2.1.1 (November 13, 2020)

### Functionalities:

- Removes "storage" permission from manifest.json

## 2.1.0 (November 11, 2020)

### Functionalities:

- Adds Twitch authentication using OAuth2
- Migrates all the api calls to the new Twitch API
- Updates settings page with 2 buttons
    - Switch Twitch account
    - Update follows list

## 2.0.0 (November 5, 2020)

### Functionalities:

- Adds an options' page to manually add your favorite followers
- Removes the extension options page

## 1.0.0 (August 11, 2020)

### Functionalities:

- Lists the favorite streamers that are live
- Creates an options html page to add/remove favorite streamers
