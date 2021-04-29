var canvas;
var myMap;
var tripsCoordinates;
var allCoordinates = [];
var data;

var delta = 0;
var coordinate = 0;

var origin;
var originVector;
var destination;
var destinationVector;

var runPosition;
let runLocations;
let runLocations2;

let currentData;

let route1Button;
let route2Button;

let img;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;

var visitedRoutes = []; // A new array to hold all visited positions
var key = 'AIzaSyCdmGJ7JWNWkmmxSdvNiu1Qo6BMn56eTSE';
selectionBool1 = false;
selectionBool2 = false;

// Options for map
let options = {
  lat: 41.8781,
  lng: -87.6298,
  zoom: 15,
  //style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  // style: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
  // style: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'

  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}

// Create an instance of Leaflet
let mappa = new Mappa('Leaflet');

function preload() {
  runLocations = loadTable('data/fitbitRunData.csv', 'csv', 'header');
  runLocations2 = loadTable('data/fitbitRunData2.csv', 'csv', 'header');

}

function setup() {

  // here we use a callback to display the image after loading
  img = loadImage('imgs/nike-logo.jpeg');
  img2 = loadImage('imgs/burgerking.jpeg');
  img3 = loadImage('imgs/dunkin.jpeg');
  img4 = loadImage('imgs/taco bell.png');
  img5 = loadImage('imgs/MC.jpeg');
  img6 = loadImage('imgs/DQ.png');
  img7 = loadImage('imgs/adidas.jpeg');
  img8 = loadImage('imgs/fitbit.jpeg');

  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  //buttons
  route1Button = createButton("Feeling fit?");
  route1Button.position(10, 100);

  route1Button.mousePressed(changeRoute);

  route2Button = createButton("Meh");
  route2Button.position(10, 170);
  route2Button.mousePressed(changeRoute2);

  currentData = 0;

}

//load route 1 after button press
function changeRoute(){
  visitedRoutes.splice(0, visitedRoutes.length);
  delta = 0;
  coordinate = 0;
  //flip booleans to draw correct route
  selectionBool2 = false;
  selectionBool1 = true;

}

//load route 2 after button press
function changeRoute2(){

  visitedRoutes.splice(0, visitedRoutes.length);
  delta = 0;
  coordinate = 0;
  //flip booleans to draw correct route
  selectionBool1 = false;
  selectionBool2 = true;

}

function draw() {
  //check to see if the route selection booleans are true.
  //if they are draw the animation function.
  //these booleans get flipped in the change route functions above.

  //if (keyIsPressed === true) {


  //} else { }
  //rect(250, 250, 50, 50);


  if(selectionBool1 == true){
    route1Anim();
    image(img, 770, 400, 45, 45);
    image(img7, 760, 350, 40, 35);
    image(img8, 765, 280, 40, 35);

  }

  if(selectionBool2 == true){
    route2Anim();
    image(img2, 530, 50, 20, 20);
    image(img3, 530, 100, 40, 20);
    image(img4, 495, 157, 30, 20);
    image(img5, 535, 395, 30, 20);
    image(img6, 495, 200, 30, 20);
  }
}

//route 1 animation function
function route1Anim(){
  if(delta < 1){
    delta += 0.2;
  } else {
    visitedRoutes.push(allCoordinates[coordinate]) // Once it has arrived at its destination, add the origin as a visited location
    delta = 0;
    coordinate ++;
    drawRoute(); // Call the drawRoute to update the route
  }

  const latitude_origin = Number(runLocations.getString(coordinate, 'Position/LatitudeDegrees'));
  const longitude_origin = Number(runLocations.getString(coordinate, 'Position/LongitudeDegrees'));

  const latitude_destination = Number(runLocations.getString(coordinate +1,'Position/LatitudeDegrees'));
  const longitude_destination = Number(runLocations.getString(coordinate +1, 'Position/LongitudeDegrees'));
  origin = myMap.latLngToPixel(latitude_origin,longitude_origin);
  originVector = createVector(origin.x, origin.y);
  destination = myMap.latLngToPixel(latitude_destination,longitude_destination);
  destinationVector = createVector(destination.x, destination.y);

  runPosition = originVector.lerp(destinationVector, delta);

  noStroke(); // remove the stroke from the route
  fill(255,255,0);
  ellipse(runPosition.x, runPosition.y, 7, 7);
}

//route 2 animation function
function route2Anim(){
  if(delta < 1){
    delta += 0.2;
  } else {
    visitedRoutes.push(allCoordinates[coordinate]) // Once it has arrived at its destination, add the origin as a visited location
    delta = 0;
    coordinate ++;
    drawRoute(); // Call the drawRoute to update the route
  }

  const latitude_origin = Number(runLocations2.getString(coordinate, 'Position/LatitudeDegrees'));
  const longitude_origin = Number(runLocations2.getString(coordinate, 'Position/LongitudeDegrees'));

  const latitude_destination = Number(runLocations2.getString(coordinate +1,'Position/LatitudeDegrees'));
  const longitude_destination = Number(runLocations2.getString(coordinate +1, 'Position/LongitudeDegrees'));
  origin = myMap.latLngToPixel(latitude_origin,longitude_origin);
  originVector = createVector(origin.x, origin.y);
  destination = myMap.latLngToPixel(latitude_destination,longitude_destination);
  destinationVector = createVector(destination.x, destination.y);

  runPosition = originVector.lerp(destinationVector, delta);

  noStroke(); // remove the stroke from the route
  fill(255,255,0);
  ellipse(runPosition.x, runPosition.y, 7, 7);
}

function drawRoute(){
  clear()
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}

// function drawRunLocations() {
//   clear();
//
//   //parse through the meteorites csv file
//   for (let i = 0; i < runLocations.getRowCount(); i++) {
//     // Get the lat/lng of each meteorite
//     const latitude = Number(runLocations.getString(i, 'Position/LatitudeDegrees'));
//     const longitude = Number(runLocations.getString(i, 'Position/LongitudeDegrees'));
//
//     if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
//       // Transform lat/lng to pixel position
//       const pos = myMap.latLngToPixel(latitude, longitude);
//       ellipse(pos.x, pos.y, 5, 5);
//
//       //for(var i = 0; i < allCoordinates.length; i++){
//    //var pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
//    //ellipse(pos.x, pos.y, 5, 5);
//     }
//   }
// }


