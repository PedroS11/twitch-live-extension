# Twitch Live Extension 
![Chrome Web Store](https://img.shields.io/chrome-web-store/v/nlnfdlcbnpafokhpjfffmoobbejpedgj)
![Chrome Web Store](https://img.shields.io/chrome-web-store/users/nlnfdlcbnpafokhpjfffmoobbejpedgj)
![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/nlnfdlcbnpafokhpjfffmoobbejpedgj)

A browser extension that will help you to find out when your followed streamers are live on Twitch 
and will send notifications when they start a new live stream.
## Table of Contents

  * [Settings](#settings)
  * [Available Scripts](#available-scripts)
  * [Deployment](#deployment)
  * [Frameworks](#frameworks)
  * [Resources](#resources)
  * [Contribution](#contribution)
  * [License](#license)

 
To start using it, open it, log in with your Twitch account, so that the extension has access only to your public information, and, every time you click on the extension icon,
you will see the streamers that you follow that are live.

This extensions supports _**Just Went Live**_ notifications. If you want to enable them, open the extension, go to **Settings** and enable the _Just Went Live_ notifications.

The first time the extension is opened, it stores yours follows list, as getting them is very time consuming. 
This way, when the extension is used, it's faster to show the ones that are live. 
This list expires after 1 day and if you click on the extension after that period, it wil take 1 second more to show the live streams because it's storing the new follows list.

If you don't want to wait 1 day to get the most updated list, if you click on **Settings**, there's a button to refresh the list.
There's also a button to switch the Twitch account you are logged in.

The extension is available on [Chrome Store](https://chrome.google.com/webstore/detail/twitch-live-extension/nlnfdlcbnpafokhpjfffmoobbejpedgj?hl=pt-PT&authuser=0). 


![Extension List](./assets/extension_list.png "Extension")
![Extension Over](./assets/extension_hover.png "Extension Over")


## Settings

In this page you can:
 - Switch Twitch account
 - Refresh the stored follows list
 - Enable/Disable _just went live_ notifications
 
![Settings](./assets/settings_rsz.png "Settings menu")
![Settings With notifications enbaled](./assets/settings_enabled_rsz.png "Settings With notifications enbaled")

### Notifications
## **MacOS**
 
![Notification](./assets/notification_mac_rsz.png "Notification")
![Notification](./assets/notification_mac_skell_rsz.png "Notification")

## **Windows**

For **Windows** users, you might get annoyed with the sound from **Chrome Notifications**. You can disable it by:

- Select the Windows Start  button, and then select Settings
- Go to System > Notifications & actions
- Scroll down to "Google Chrome" and click the Chrome icon to open the notification settings
- Toggle "Play a sound when a notification arrives" to Off

![Notification](./assets/notification_windows_garciap_rsz.png "Notification")
![Notification](./assets/notification_windows_obasene_rsz.png "Notification")



## Available Scripts

Before running any command, you need to create a file with your Twitch Client ID. 
To get one, go to the [Twitch Api page](https://dev.twitch.tv/docs/authentication#registration) and register your app.
 
 After that, create the file `./src/config.ts` with: <br>
``export const CLIENT_ID = "YOUR_CLIENT_ID";``

### `yarn start`

Runs the app in the development mode with reloading.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Runs all the tests

### `yarn build`

Builds the app for production to the `build` folder without inline scripts.<br />

## Deployment

- Run `yarn build`.
- Open [chrome://extensions](chrome://extensions)
- Enable `Developer mode`
- Press ``Load unpacked`` and upload the ``build`` folder 

## Frameworks

This extension was developed using [React](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/) and [Material-UI](https://material-ui.com/).

## Resources
[Changelog](https://github.com/PedroS11/twitch-live-extension/blob/master/CHANGELOG.md)

## Contribution

### Youtube
- [Kr4vzz](https://youtube.com/kr4vzz)

### Twitch
- [Garciap](https://twitch.tv/Garciap)

- [Thenumber13_](https://twitch.tv/Thenumber13_)

- [Impakt](https://twitch.tv/Impakt)

- [Tio Sake](https://twitch.tv/Tio_sake)

- [MeetTheMyth](https://twitch.tv/MeetTheMyth)

- [Johlee](https://twitch.tv/Johlee)

- [Obaseni](https://www.twitch.tv/obasene4k)

- [rSekeleton](https://twitch.tv/Rsekeleton)

- [Ver71go](https://twitch.tv/Ver71go)

- [Oryon](https://twitch.tv/Oryonp)

- [Pinkly__](https://twitch.tv/Pinkly__)

- [Ka1one](https://twitch.tv/Ka1one)

- [RafikiHd](https://twitch.tv/RafikiHD)

And everyone else that helped testing and I didn't mention.

## Problems or issues?
 
 If you encounter any problems, bugs or other issues with the repo, please create an [issue in the GitHub repo](https://github.com/PedroS11/twitch-live-extension/issues). 

## License 

[BSD-Clause 3](https://github.com/PedroS11/twitch-live-extension/blob/master/LICENSE.md)
