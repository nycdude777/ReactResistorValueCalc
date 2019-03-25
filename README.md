# Setting it all up

First, create a new react app in your react app folder...

### `> yarn create react-app rcc-demo` 

  NOTE: It is important that you create your react app first before extracting the zip, 
  some of the files that create-react-app creates will be replaced with files from the zip.
  If you reverse the order, you will overwrite the demo app with a blank App.js

In the meantime, extract the contents of the zip that you just downloaded to another location, 
it can be your downloads folder or some temp directory.  The reason for this is that the unzipping procedure 
will create a new folder named ReactResistorValueCalc-master, in which it will extract all our app files.  

Once that is done and your react app is ready, go into ReactResistorValueCalc-master folder and grab all the files there, including the two subfolders, public and src.  

Copy/Cut and paste them into your new rcc-demo react app folder that was just created by create-react-app.

You will be asked if you want to replace the files in destination folder, say YES (to all if that comes up).

Now in that same folder, press CTRL key on your keyboard and with your mouse select 2 items, /node_modules folder and yarn.lock file (or package.lock if you use npm).  (Make sure: You don't select package.json)

Hit DELETE key.

Now go to your command prompt again, cd to the new rcc-demo directory, and run:

### `> yarn install`

This will install all the dependencies.

You're all done with the setup!  Now go to command prompt, start the tests and the app.

### `> yarn test`

### `> yarn start`

Open your dev environment, if you are using VS Code type > code . ENTER

Happy hacking!


-----------------------------------------------------------------------------------------------------


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
