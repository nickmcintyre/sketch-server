let drawing;
let data;
let drawingSelect;
let step = 0;

function preload() {
  data = loadJSON("/data");
}

function setup() {
  createCanvas(400, 400);

  // Create a dropdown to select drawings.
  drawingSelect = createSelect();
  drawingSelect.position(5, 405);

  // Add a list of options.
  for (let file of data.files) {
    drawingSelect.option(file);
  }

  // Add a callback function.
  drawingSelect.changed(loadDrawing);

  // Slow the frame rate.
  frameRate(24);
}

function draw() {
  background(220);

  // Draw a line connecting the points in the
  // drawing.path array.
  if (drawing && step < drawing.path.length) {
    for (let i = 0; i < step; i += 1) {
      // Get the current pair of points.
      let p1 = drawing.path[i];
      let p2 = drawing.path[i + 1];

      // Draw a line between the points.
      line(p1.x, p1.y, p2.x, p2.y);
    }

    step += 1;
  }
}

// Load the drawing file.
function loadDrawing() {
  // Get the drawing's file name.
  let fileName = drawingSelect.selected();

  // Load the file from the server.
  loadJSON(`/data/${fileName}`, function (results) {
    drawing = results;
    step = 0;
  });
}
