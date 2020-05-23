let dx = 1.5;
let dy = 1.5;
let y = 150;
let x = 10;

let mediaSource = "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv";
let video = document.createElement("video"); // create a video element
video.src = mediaSource;
video.autoPlay = false;
video.loop = true;
video.muted = true;
let videoCanBePlayed = false;
video.oncanplay = readyToPlayVideo;

function readyToPlayVideo() {
    videoCanBePlayed = true;
    video.play();
    console.log("ready");
}

let imgTag = new Image();
let currentImageIndex = 0;
let images = [
    'https://i0.shbdn.com/photos/44/99/88/x5_776449988xo2.jpg',
    'https://i0.shbdn.com/photos/44/99/88/x5_7764499884j8.jpg',
    'video',
];


setInterval(changeImage, 2000);
changeImage();

function changeImage() {
    if (images[currentImageIndex] === 'video' && videoCanBePlayed) {
        //Video is showing now
    } else {
        imgTag.src = images[currentImageIndex];
    }
    currentImageIndex++;
    if (currentImageIndex === images.length) currentImageIndex = 0;
}



/*

      context.font = "30px Arial";
      if (images[currentImageIndex] === 'video') {
          context.drawImage(video, x, y, 528, 396);
          context.fillText("Örnek Video", x, y + 400);
      } else {
          context.drawImage(imgTag, x, y);
          context.fillText("Resim " + currentImageIndex + " - 2008 PORSHCE CAYMAN 2.7 DOĞUŞ ÇIKIŞLI - ", x, y + 400);
      }


      if (x < 0 || x > wWidth)
          dx = -dx;
      if (y < 0 || y > wHeight)
          dy = -dy;
      x += dx;
      y += dy;*/

let states = [
    {
        type: OBJECT_TYPE_TEXT,
        content: 'Merhaba dünya',
        font: '30px Arial',
        color: 'black',
        x: 0.1,
        y: 0.1,
        width: 0.2,
        height: 0.2,
        onDraw: function () {

        }
    },
    {
        type: OBJECT_TYPE_RECT,
        content: '',
        color: '#FF0000',
        x: 0,
        y: 0.8,
        width: 1,
        height: 0.2,
        onDraw: function () {

        }
    },
    {
        type: OBJECT_TYPE_IMAGE,
        content: imgTag,
        x: 0,
        y: 0.2,
        width: 1,
        height: 0.6,
        onDraw: function () {

        }
    },

];