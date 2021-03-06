function animateImage(nextTag) {
    middleImage2.content = nextTag;
    let inter = setInterval(function () {
        middleImage.cropHeightRatio -= 0.01;
        if (middleImage.cropHeightRatio < 0) {
            middleImage.content = nextTag;
            middleImage.cropHeightRatio = 1;

            //image.changeUrl(nextImageUrl);
            clearInterval(inter);
        }
    }, 10);
}

function animateImage2(nextTag) {
    middleImage2.content = nextTag;
    let inter = setInterval(function () {
        middleImage.opacity -= 0.01;
        if (middleImage.opacity < 0) {
            middleImage.content = nextTag;
            middleImage.opacity = 1;
            //image.changeUrl(nextImageUrl);
            clearInterval(inter);
        }
    }, 10);
}

function animateImage3(nextTag) {
    middleImage2.content = nextTag;
    let inter = setInterval(function () {
        middleImage.cropHeightRatio -= 0.01;
        middleImage.cropWidthRatio -= 0.01;
        if (middleImage.cropHeightRatio < 0) {
            middleImage.content = nextTag;
            middleImage.cropHeightRatio = 1;
            middleImage.cropWidthRatio = 1;
            //image.changeUrl(nextImageUrl);
            clearInterval(inter);
        }
    }, 10);
}

function ajaxGet(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            callback(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function showLoading(text='YÜKLENİYOR') {
    changeLoadingText(text)
    let el = document.getElementById("loader");
    el.style.display = '';
}

function hideLoading() {
    let el = document.getElementById("loader");
    el.style.display = 'none';
}

function changeLoadingText(text) {
    let el = document.getElementById("loadingText");
    el.innerHTML = text;
}