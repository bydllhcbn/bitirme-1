let OBJECT_TYPE_TEXT = 0;
let OBJECT_TYPE_IMAGE = 1;
let OBJECT_TYPE_RECT = 2;
let OBJECT_TYPE_RECT_FIXED = 3;


let canvas = document.getElementById('ilanCanvas');
let context;
let uiObjects = [];

window.onload = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');
    draw();
    main();
};

window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};


function addImageFromUrl(url, x, y, width, height) {
    let imgTag = new Image();
    imgTag.src = url;
    return addImageFromTag(imgTag,x,y,width,height);
}


function addImageFromTag(imgTag, x, y, width, height) {
    let newObject = {
        type: OBJECT_TYPE_IMAGE,
        content: imgTag,
        x: x / 100,
        y: y / 100,
        width: width / 100,
        height: height / 100,
        cropWidthRatio: 1,
        cropHeightRatio: 1,
        isVisible: true,
        onDraw: false,
        changeUrl: function (newUrl) {
            if (newUrl && newUrl !== '') {

                this.content.src = newUrl;
            }
        }
    };
    uiObjects.push(newObject);
    return newObject;
}


function addRectangle(x, y, width, height, color = 'black') {
    let newObject = {
        type: OBJECT_TYPE_RECT,
        color: color,
        x: x / 100,
        y: y / 100,
        width: width / 100,
        height: height / 100,
        isVisible: true,
        onDraw: false
    };
    uiObjects.push(newObject);
    return newObject;
}

function addRectangleFixed(x, y, width, height, color = 'black') {
    let newObject = {
        type: OBJECT_TYPE_RECT_FIXED,
        color: color,
        x: x / 100,
        y: y / 100,
        width: width / 100,
        height: height / 100,
        isVisible: true,
        onDraw: false
    };
    uiObjects.push(newObject);
    return newObject;
}

function addText(text, x, y, fontSize = 12, color = 'black') {
    let newObject = {
        type: OBJECT_TYPE_TEXT,
        text: text,
        color: color,
        fontSize: fontSize / 200,
        x: x / 100,
        y: y / 100,
        isVisible: true,
        textAlign: 'start',
        onDraw: false
    };
    uiObjects.push(newObject);
    return newObject;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    uiObjects.forEach(o => {
        if (!o.isVisible) return;
        if (o.type === OBJECT_TYPE_TEXT) {
            context.textBaseline = "top";
            context.textAlign = o.textAlign;
            context.font = parseInt(o.fontSize * canvas.height + '') + 'px Arial';
            context.fillStyle = o.color;
            context.fillText(o.text, o.x * canvas.width, o.y * canvas.height);


        } else if (o.type === OBJECT_TYPE_IMAGE) {

            let scale = Math.min(
                o.width * canvas.width / o.content.width,
                o.height * canvas.height / o.content.height
            );

            let x = o.x * canvas.width + ((o.width * canvas.width / 2) - (o.content.width / 2) * scale);
            let y = o.y * canvas.height + ((o.height * canvas.height / 2) - (o.content.height / 2) * scale);
            context.drawImage(o.content,
                0,
                0,
                o.content.width*o.cropWidthRatio,
                o.content.height*o.cropHeightRatio,
                x,
                y,
                o.content.width * scale*o.cropWidthRatio,
                o.content.height * scale*o.cropHeightRatio,

            );


        } else if (o.type === OBJECT_TYPE_RECT) {
            context.fillStyle = o.color;
            context.fillRect(
                o.x * canvas.width,
                o.y * canvas.height,
                o.width * canvas.width,
                o.height * canvas.height
            );


        } else if (o.type === OBJECT_TYPE_RECT_FIXED) {
            context.fillStyle = o.color;
            context.fillRect(
                o.x * canvas.width,
                o.y * canvas.height,
                o.width * canvas.height,
                o.height * canvas.height
            );
        }
        if (o.onDraw) o.onDraw();
    });

    window.requestAnimationFrame(draw);
}
