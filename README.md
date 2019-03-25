# Resistor Value Calculator app

Create a new app with yarn or npm

```
> yarn create react-app rcc-demo
```

After your app is created, extract the zip into your new app directory,
making sure package.json is directly in your new app directory, along with src folder.

  NOTE: It is important that you create your react app first before extracting the zip, 
  some of the files that create-react-app creates will be replaced with files from the zip.
  If you reverse the order, you will overwrite the demo app with a blank App.js

```
> yarn install
```

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

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.0.0-beta.5/react-bootstrap.js" integrity="sha256-BgySDZiy0+l7Ia7gtEQXEAmzhI+y4+JuUbktR5lZavQ=" crossorigin="anonymous"></script>
```

You're all done with the setup, now go to command prompt, start the tests and the app.

```
> yarn test
```

```
> yarn start
```
