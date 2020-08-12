# Twitch Live Extension

Chrome extension that shows Twitch live streams. 
For a list of streams, on extension open, it gets the live ones.

### Add a stream

- Press right click on the extension icon
- Select **_Options_**
- Add the stream name to the list by pressing `Enter` or clicking `Add` button

### Remove stream
- Press right click on the extension icon
- Select **_Options_**
- Press remove button for the desired stream

## Available Scripts

Before running any command, you need to create a file with your Twitch Client ID. 
To get one, go to the [Twitch Api page](https://dev.twitch.tv/docs/authentication#registration) and register your app.
 
 After that, create the file `./src/config.ts` with: <br>
``export const CLIENT_ID = "YOUR_CLIENT_ID";``

### `yarn start`

Runs the app in the development mode with reloading.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Run all tests in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder without inline scripts.<br />

## Deployment

- Run `yarn build`.
- Open [chrome://extensions](chrome://extensions)
- Enable `Developer mode`
- Press ``Load unpacked`` and upload the ``build`` folder 