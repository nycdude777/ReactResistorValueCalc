# Setting it up

### `> yarn create react-app rcc-demo'

After your app is created, extract the zip into your new app directory,
making sure package.json is directly in your new app directory, along with src folder.

  NOTE: It is important that you create your react app first before extracting the zip, 
  some of the files that create-react-app creates will be replaced with files from the zip.
  If you reverse the order, you will overwrite the demo app with a blank App.js

### `> yarn install'

Open your dev environment, if you are using VS Code type > code . ENTER

1. Open src/index.js and paste import './rcc/rcc.css' below all the imports at the top.

2. Open public/index.html, and paste the following 4 links at the end of <head> tag just before </head>:

```
    <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous" />

    <script src="https://unpkg.com/react@^16/umd/react.production.min.js" crossorigin />
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin />

    <script src="https://unpkg.com/react-dom@^16/umd/react-dom.production.min.js"
            crossorigin />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.0.0-beta.5/react-bootstrap.js" 
    integrity="sha256-BgySDZiy0+l7Ia7gtEQXEAmzhI+y4+JuUbktR5lZavQ=" crossorigin="anonymous"></script>
```

You're all done with the setup, no go to command prompt, start the tests and the app.

### `> yarn test'

### `> yarn start'


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
