let express = require("express");
let fs = require("fs");

// Create an app and set the port
// the server should listen on.
let app = express();
let port = 3000;

// Let the app use static
// files and process JSON
// in requests.
app.use(express.static("public"));
app.use(express.static("data"));
app.use(express.json());

// Serve index.html when the client
// requests GET /
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Serve replay.html when the client
// requests GET /replay
app.get("/replay", function (req, res) {
  res.sendFile(__dirname + "/public/replay.html");
});

// Return a list of files in the /data
// folder when the client requests
// GET /data
app.get("/data", function (req, res) {
  fs.readdir(__dirname + "/data", function (err, files) {
    // Log any errors and return immediately.
    if (err) {
      console.error(err);
      return;
    }

    // Send a list of file names to
    // the client.
    res.json({
      files: files,
    });
  });
});

// Return a drawing from a file when
// the client requests GET /data/Title
app.get("/data/:drawing", function (req, res) {
  // Get the drawing's file name.
  let fileName = req.params.drawing;

  // Read the drawing file.
  fs.readFile(`${__dirname}/data/${fileName}`, "utf8", function (err, data) {
    // Log any errors and return immediately.
    if (err) {
      console.log(err);
      return;
    }

    // Parse text as JSON, then
    // send it to the client.
    let json = JSON.parse(data);
    res.json(json);
  });
});

// Write a new JSON file with
// points from a drawing.
app.post("/data", function (req, res) {
  // Create a variable containing the
  // JSON sent from the client.
  let data = req.body;

  // Create a string with the path of
  // the file to write.
  let fileName = `${__dirname}/data/${data.title}.json`;

  // Convert the JSON data into text for storage.
  let stringData = JSON.stringify(data);

  // Write the file.
  fs.writeFile(fileName, stringData, function (err) {
    // Log any errors that occur.
    if (err) {
      console.error(err);
    }
  });
});

// Serve the app.
app.listen(port, function () {
  console.log(`Drawing app listening on port ${port}!`);
});
