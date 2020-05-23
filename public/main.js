
let extraInfoBlackBar = addRectangle(0, 90, 20, 10);
let extraInfoYellowBar = addRectangle(20, 90, 80, 10, 'yellow');

let slidingText = addText("",
    0, 93, 8, 'black');

let heatText = addText("24", 2, 94, 6, 'white');
let clockText = addText("19:48", 18, 94, 6, 'white');
clockText.textAlign = 'end';
let middleImage2 = addImageFromUrl("", 2, 2, 96, 76);
let middleImage = addImageFromUrl('https://i0.shbdn.com/photos/44/99/88/x5_7764499884j8.jpg', 2, 2, 96, 76);


let adTitleText = addText("Araba Çok Ucuz", 2, 78, 8);
let adSubtitleText = addText("Subtitle", 2, 84, 5);

let adPriceText = addText("400.000 TL", 98, 78, 12);
adPriceText.textAlign = 'end';
let adPriceSubText = addText("Kocaeli/Gebze", 98, 84, 5);
adPriceSubText.textAlign = 'end';

let adRect = addRectangleFixed(2, 2, 10, 5, 'red');
let adText = addText("İLAN", 3, 3, 6, 'white');

let currentImageIndex = 0;
let images = [
    'https://i0.shbdn.com/photos/44/99/88/x5_7764499884j8.jpg',
    'https://i0.shbdn.com/photos/44/99/88/x5_776449988xo2.jpg',
    'https://www.script-tutorials.com/wp-content/uploads/2012/01/fimg1-700x247.jpg',
];

function animateImage(nextImageUrl) {
    middleImage2.changeUrl(nextImageUrl);
    let inter = setInterval(function() {
        middleImage.cropHeightRatio -= 0.01;
        if (middleImage.cropHeightRatio < 0) {
            middleImage.changeUrl(nextImageUrl);
            middleImage.cropHeightRatio = 1;
            //image.changeUrl(nextImageUrl);
            clearInterval(inter);
        }
    }, 10);
}

function animateImage2(nextImageUrl) {
    middleImage2.changeUrl(nextImageUrl);
    let inter = setInterval(function() {
        middleImage.cropWidthRatio -= 0.01;
        if (middleImage.cropWidthRatio < 0) {
            middleImage.changeUrl(nextImageUrl);
            middleImage.cropWidthRatio = 1;
            //image.changeUrl(nextImageUrl);
            clearInterval(inter);
        }
    }, 10);
}
function animateImage3(nextImageUrl) {
    middleImage2.changeUrl(nextImageUrl);
    let inter = setInterval(function() {
        middleImage.cropHeightRatio -= 0.01;
        middleImage.cropWidthRatio -= 0.01;
        if (middleImage.cropHeightRatio < 0) {
            middleImage.changeUrl(nextImageUrl);
            middleImage.cropHeightRatio = 1;
            middleImage.cropWidthRatio = 1;
            //image.changeUrl(nextImageUrl);
            clearInterval(inter);
        }
    }, 10);
}


function main() {
    console.log("Application started.");


    let changeImagesTimer = setInterval(function() {
        currentImageIndex++;
        if(currentImageIndex===images.length){
            currentImageIndex=0;
        }
        if(currentImageIndex%3 === 0){
            animateImage(images[currentImageIndex]);
        }else if(currentImageIndex%3 === 1){
            animateImage2(images[currentImageIndex]);
        }else{
            animateImage3(images[currentImageIndex]);
        }

    }, 5000);









    //Haberler
    const RSS_URL = `https://www.cnnturk.com/feed/rss/bilim-teknoloji/news`;

    fetch(RSS_URL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const rssItems = data.querySelectorAll("item");
            let currentNewIndex = 0;
            slidingText.textAlign = 'end';
            slidingText.text = rssItems[currentNewIndex].querySelector("description").innerHTML;
            slidingText.onDraw = () => {
                slidingText.x -= 0.003;
                if (slidingText.x < -0.2) {
                    currentNewIndex++;
                    slidingText.text = rssItems[currentNewIndex].querySelector("description").innerHTML;
                    if(currentNewIndex===rssItems.length) currentNewIndex = 0;
                    slidingText.x = 4;

                }
            };
        });



}