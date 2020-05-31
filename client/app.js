let BASE_URL = "http://localhost:3000/"
let CLIENT_ID = 2
let extraInfoBlackBar = addRectangle(0, 90, 20, 10);
let extraInfoYellowBar = addRectangle(20, 90, 80, 10, 'yellow');

let slidingText = addText("", 0, 93, 8, 'black');

let heatText = addText("24", 2, 94, 6, 'white');
let clockText = addText("19:48", 18, 94, 6, 'white');
clockText.textAlign = 'end';
let middleImage2 = addImageFromUrl("", 2, 2, 96, 76);
let middleImage = addImageFromUrl('', 2, 2, 96, 76);


let adTitleText = addText("Başlık", 2, 78, 8);
let adSubtitleText = addText("Altbaşlık", 2, 84, 5);

let adPriceText = addText("0.000 TL", 98, 78, 12);
adPriceText.textAlign = 'end';
let adPriceSubText = addText("Kocaeli/Gebze", 98, 84, 5);
adPriceSubText.textAlign = 'end';

let adRect = addRectangleFixed(2, 2, 10, 5, 'red');
let adText = addText("İLAN", 3, 3, 6, 'white');

let currentImageIndex = 0;
let images = [];

function nextImage() {
    if (currentImageIndex === images.length) {
        currentImageIndex = 0;
    }
    let currentImage = images[currentImageIndex];
    if (currentImageIndex % 3 === 0) {
        animateImage(currentImage['tag']);
    } else if (currentImageIndex % 3 === 1) {
        animateImage2(currentImage['tag']);
    } else {
        animateImage3(currentImage['tag']);
    }

    adTitleText.text = currentImage['title'];
    adSubtitleText.text = currentImage['subtitle'];
    adPriceText.text = currentImage['price'] + " TL";
    adPriceSubText.text = currentImage['location'];
}

function startAdVideo() {
    hideLoading();
    currentImageIndex = 0;
    nextImage();
    let changeImagesTimer = setInterval(function () {
        if (images.length === 0) return;
        currentImageIndex++;
        nextImage();
    }, 5000);

}

function getAds() {
    showLoading('BAĞLANIYOR');
    ajaxGet("http://localhost:3000/ad/getAds/" + CLIENT_ID.toString(), function (res) {
        if (!res) {
            return;
        }
        let total_processes = 0;
        let images_result = JSON.parse(res);
        if (images_result.length === 0) {
            changeLoadingText('İLAN BEKLENİYOR')
            return;
        }
        for (let image of images_result) {
            let url = image['url'];
            console.log("url");
            console.log(url);
            if (url.endsWith(".mp4") || url.endsWith(".ogg") || url.endsWith(".webm") || url.endsWith(".ogv")) {
                let video = document.createElement("video");
                video.src = url;
                video.autoPlay = false;
                video.loop = true;
                video.muted = true;
                video.onloadeddata = function () {
                    video.width = video.videoWidth;
                    video.height = video.videoHeight;
                    image['tag'] = video;
                    images.push(image);
                    console.log(images.length);
                    total_processes++;
                    if (total_processes === images_result.length) startAdVideo();
                    video.play();
                }
                video.onerror = function () {
                    total_processes++;
                    if (total_processes === images_result.length) startAdVideo();
                }

            } else if (url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg")) {
                let imgTag = new Image();
                imgTag.src = url;
                image['tag'] = imgTag;
                imgTag.onload = function () {
                    images.push(image);
                    console.log(images.length);
                    total_processes++;
                    if (total_processes === images_result.length) startAdVideo();
                }
                imgTag.onerror = function () {
                    total_processes++;
                    if (total_processes === images_result.length) startAdVideo();
                }
            }
        }
    });
}

function main() {
    console.log("Application started.");

    getAds();
    ajaxGet("https://www.cnnturk.com/feed/rss/bilim-teknoloji/news", response => {
        var rssItems = new window.DOMParser().parseFromString(response, "text/xml").querySelectorAll("item");
        let currentNewIndex = 0;
        console.log(rssItems);
        slidingText.textAlign = 'end';
        slidingText.text = rssItems[currentNewIndex].querySelector("description").innerHTML;
        console.log(slidingText.text);
        slidingText.onDraw = () => {
            slidingText.x -= 0.003;
            if (slidingText.x < -0.2) {
                currentNewIndex++;
                if (currentNewIndex === rssItems.length) {
                    currentNewIndex = 0;
                }
                slidingText.text = rssItems[currentNewIndex].querySelector("description").innerHTML;
                if (currentNewIndex === rssItems.length) currentNewIndex = 0;
                slidingText.x = 4;

            }
        };
    });

    WebSocketTest();
}

var ws;

function sendToSocket(action, params) {
    ws.send(JSON.stringify({
        "action": action,
        "params": params
    }));
}

function WebSocketTest() {
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://localhost:3001");
        ws.onopen = function () {
            sendToSocket("login", {"userId": CLIENT_ID});
            console.log("Message is sent...");
        };
        ws.onmessage = function (evt) {
            var json = JSON.parse(evt.data);
            console.log("Message is received... ");
            console.log(json);
            if (json.action === "reload") {
                window.location.reload();
            }
        };
        ws.onclose = function () {
            showLoading("BAĞLANIYOR")
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    }
}