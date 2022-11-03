sound = "";
song = "";
posenet = "";
lefwristx = 0;
lefwristy = 0;
rightwristx = 0;
rightwristy = 0;
numero = 0;
remover = 0;
volumen = 0;
function preload() {
song = loadSound ("03 Overworld.mp3");
}
function setup(){
canvas = createCanvas(400, 400);
canvas.center();
video = createCapture(VIDEO);
video.hide();
posenet = ml5.poseNet(video, modelLoaded);
posenet.on("pose", gotPoses);
}
function draw() {
image(video, 0, 0, 400, 400);
fill("orange");
stroke("orange");
circle(lefwristx, lefwristy, 20);
circle(rightwristx, rightwristy, 20);
numero = Number(lefwristy);
remover = (floor(numero));
volumen = remover/400;
document.getElementById("volume").innerHTML = "volumen" + volumen;
song.setVolume(volumen);
if (rightwristy > 0 && rightwristy <= 80) {
    document.getElementById("speed").innerHTML="velosidad = 0.5";
    song.rate(0.5);
}
else if (rightwristy > 80 && rightwristy <= 160) {
    document.getElementById("speed").innerHTML="velosidad = 1.0";
    song.rate(1.0); 
}else if (rightwristy > 160 && rightwristy <= 240) {
    document.getElementById("speed").innerHTML="velosidad = 1.5";
    song.rate(1.5);     
}else if (rightwristy > 240 && rightwristy <= 320) {
    document.getElementById("speed").innerHTML="velosidad = 2.0";
    song.rate(2.0);
}else if (rightwristy > 320 && rightwristy <= 400) {
    document.getElementById("speed").innerHTML="velosidad = 2.5";
    song.rate(2.5);
}
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
console.log("modelo inicialisado");    
}
function gotPoses(results) {
    if (results.length>0) {
     console.log (results);
     lefwristx = results[0].pose.leftWrist.x;
     lefwristy = results[0].pose.leftWrist.y;
     rightwristx = results[0].pose.rightWrist.x;
     rightwristy = results[0].pose.rightWrist.y;
    }
}