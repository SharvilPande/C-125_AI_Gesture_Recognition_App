noseX = 0;
noseY = 0;
RightWristX = 0;
LeftWristX = 0;
Difference = 0;

function preload() {
}

function setup() {
    canvas = createCanvas(450, 450)
    canvas.position(850, 175);
    video = createCapture(VIDEO);
    video.position(140, 180);
    video.size(450,450);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("PoseNet Model has been initialized")
}

function gotPoses(results,error) {
    if (results.length > 0) {
       console.log(results);
       noseX = results[0].pose.nose.x;
       noseY = results[0].pose.nose.y;
       console.log("Nose X = " + noseX + ", Nose Y = " + noseY);

       RightWristX = results[0].pose.rightWrist.x;
       LeftWristX = results[0].pose.leftWrist.x;
       Difference = floor(LeftWristX - RightWristX);
       console.log("Right wrist X = " + RightWristX + ", Left Wrist X = " + LeftWristX + ", Difference = " + Difference);
       document.getElementById("area_square").innerHTML = "Width and Height of the Square is = " + Difference;

    } else {
        console.error(error);
    }
}

function draw() {
    background('#0dc0d4');
    square(noseX, noseY, Difference);
    fill('#FFC0CB');
    stroke('#0000FF');
}