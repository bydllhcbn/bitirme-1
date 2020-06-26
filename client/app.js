let BASE_URL = "http://localhost:3000/"
let CLIENT_ID = 1
let extraInfoBlackBar = addRectangle(0, 90, 20, 10, '#212121');
let extraInfoYellowBar = addRectangle(20, 90, 80, 10, '#fdd835');

let slidingText = addText("", 0, 93, 8, '#212121');

let heatText = addText("24°", 2, 94, 6, '#eceff1');
let clockText = addText("", 18, 94, 6, '#eceff1');
clockText.textAlign = 'end';
let date = new Date;
let hours = date.getHours()
let minutes = date.getMinutes()
clockText.text = (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes)

let middleImage2 = addImageFromUrl("", 0, 0, 100, 90);
let middleImage = addImageFromUrl('', 0, 0, 100, 90);


let adTitleText = addText("Başlık", 1, 10, 10, '#eceff1');
let adSubtitleText = addText("Altbaşlık", 1, 15, 5, '#eceff1');

let adPriceText = addText("0.000 TL", 1, 20, 12, '#eceff1');


let adPriceSubText = addText("Kocaeli/Gebze", 1, 35, 5, '#eceff1');

let yil = addText("Yıl: 2013", 1, 40, 5, '#eceff1');
let yakit = addText("Yakıt Tipi: Dizel", 1, 45, 5, '#eceff1');
let kilometre = addText("Kilometre: 124.000 KM", 1, 50, 5, '#eceff1');
let vites = addText("Vites Tipi: Otomatik", 1, 55, 5, '#eceff1');
let iletisim = addText("İletişim: (0555) 555 55 55", 1, 60, 5, '#eceff1');


let adRect = addRectangleFixed(1, 1, 11, 4.5, '#c62828');
let adText = addText("İLAN", 2, 2, 6, '#eceff1');

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
    streamNow();
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
            }, 5000);
        }
    }
}

function streamNow() {
    const ws = new WebSocket('ws://localhost:3005/');

    ws.addEventListener('open', (e) => {
        console.log('WebSocket Open', e);
        mediaStream = document.querySelector('canvas').captureStream(30); // 30 FPS
        mediaRecorder = new MediaRecorder(mediaStream, {
            mimeType: 'video/webm;codecs=h264',
            videoBitsPerSecond: 3000000
        });

        mediaRecorder.addEventListener('dataavailable', (e) => {
            ws.send(e.data);
        });

        mediaRecorder.addEventListener('stop', ws.close.bind(ws));
        mediaRecorder.start(1000); // Start recording, and dump data every second
    });

    ws.addEventListener('close', (e) => {
        console.log('WebSocket Close', e);
        mediaRecorder.stop();
    });
}