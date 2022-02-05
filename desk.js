
img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('desk.png');
}


function setup() {
  canvas = createCanvas(640, 380);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(img, 0, 0);
      if(status != "")
      {
        r =  213;
        g =  112;
        b =  216;      
        objectDetector.detect(img, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          objectname = objects[i].label.toUpperCase();
          textSize(14);
         
          text(objectname , objects[i].x + 15, objects[i].y + 15);
          textSize(12);
          fill("white");
          text(+  " " + percent + "%", objects[i].x + 85, objects[i].y + 35)
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}