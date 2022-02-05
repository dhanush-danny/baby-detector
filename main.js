video = "";
status = "";
objects = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        model.detect(video, get_result);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_objects").innerHTML = "Number Of Objects :" + objects.length;
            object_name = objects[0].label;
            object_confidence = floor(objects[0].confidence * 100);
            object_x = objects[0].x;
            object_y = objects[0].y;
            object_width = objects[0].width;
            object_height = objects[0].height;
            fill("red");
            textSize(18);
            text(object_name + " " + object_confidence + " %", object_x + 15, object_y + 15);
            noFill("");
            stroke("red");
            rect(object_x, object_y, object_width, object_height);

        }
    }
}

function start() {
    model = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("label_status").innerHTML = "Status : Detecting Objects";
}

function model_loaded() {
    console.log("model is loaded");
    video.play();
    video.loop();
    status = true;
    video.speed(1);
    video.volume(0);
}

function get_result(e, result) {
    if (e) {
        console.error(e);
    } else {
        console.log(result);
        objects = result;

    }
}