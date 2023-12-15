# Sketch Server

This app records and replays drawings. Its client is a pair of p5.js sketches. Its server is a Node.js + Express app that reads and writes JSON to the local filesystem.

## Getting Started

Install [nvm](https://github.com/nvm-sh/nvm), then run the following command to install the current LTS version of Node.js:

```
nvm install --lts
```

Next, activate the LTS version:

```
nvm use --lts
```

After that, navigate to the project's directory on your local machine and install the dependencies:

```
npm install
```

Finally, run the app:

```
node server.js
```

## License

[MIT](./LICENSE)
