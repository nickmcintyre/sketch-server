// Create variables to keep track
// of the drawing and its title.
let drawing = {
  title: "Untitled",
  path: [],
};
let titleInput;

function setup() {
  createCanvas(400, 400);

  // Create a text input for the sketch'stitle.
  titleInput = createInput(drawing.title);
  titleInput.position(5, 405);
  titleInput.size(200);

  // Create an upload button.
  let button = createButton("Upload");
  button.position(220, 405);
  button.mouseClicked(uploadDrawing);
}

function draw() {
  background(220);

  // Draw a line connecting the points in the
  // drawing.path array.
  for (let i = 0; i < drawing.path.length - 1; i += 1) {
    // Get the current pair of points.
    let p1 = drawing.path[i];
    let p2 = drawing.path[i + 1];

    // Draw a line between the points.
    line(p1.x, p1.y, p2.x, p2.y);
  }
}

// Update the drawing path while the
// mouse is dragged.
function mouseDragged() {
  let p = { x: mouseX, y: mouseY };
  drawing.path.push(p);
}

// Clear the drawing path when the
// canvas is double-clicked.
function doubleClicked() {
  drawing.path = [];
}

// Upload the data to the server
// using a POST request.
function uploadDrawing() {
  drawing.title = titleInput.value();
  httpPost("/data", "json", drawing);
}
