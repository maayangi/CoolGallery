let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImage;
let windowWidth = window.innerWidth;

if (galleryImages) {
    galleryImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            whenImageClicked(image, index);
        });
    });
}

function whenImageClicked(image, index) {
    // let getElementCss = window.getComputedStyle(image);
    // let getFullImageUrl = getElementCss.getPropertyValue("background-image");
    // let getImageUrlPosistion = getFullImageUrl.split("/images/tiny/");
    // let setNewUrl = getImageUrlPosistion[1].replace('")','');

    //I can use the current index of the collection for linking between tiny image to actual image or use image name like above 
    getLatestOpenedImage = index + 1;
    let container = document.body;
    let newImageWindow = document.createElement("div");
    container.appendChild(newImageWindow);
    newImageWindow.setAttribute("class", "img-window");
    newImageWindow.setAttribute("onClick", "closeImg()");

    let newImage = document.createElement("img");
    newImageWindow.appendChild(newImage);
    newImage.setAttribute("src", `../Gallery site/images/img${getLatestOpenedImage}.png`);
    newImage.setAttribute("id", "current-img");

    newImage.onload = function () {
        let imgWidth = this.width;
        let calcImageToEdge = ((windowWidth - imgWidth) / 2) - 80;


        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode("Next");
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-style");
        newNextBtn.setAttribute("onClick", "changeImg(1)");
        newNextBtn.style.cssText = "right:" + calcImageToEdge + "px";

        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("Prev");
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-style");
        newPrevBtn.setAttribute("onClick", "changeImg(0)");
        newPrevBtn.style.cssText = "left:" + calcImageToEdge + "px";
    }
}

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelectorAll(".img-btn-style").forEach(node => {
        node.remove();
    });
}

function changeImg(toChangeDirectory) {
    document.querySelector("#current-img").remove();
    let getImgWindow = document.querySelector(".img-window");
    let newImage = document.createElement("img");
    getImgWindow.appendChild(newImage);

    let calcNewImage;
    if (toChangeDirectory == 1) {
        calcNewImage = getLatestOpenedImage + 1;
        if (calcNewImage > galleryImages.length)
            calcNewImage = 1;
    }
    if (toChangeDirectory == 0) {
        calcNewImage = getLatestOpenedImage - 1;
        if (calcNewImage < 1)
            calcNewImage = galleryImages.length;
    }

    newImage.setAttribute("src", `../Gallery site/images/img${calcNewImage}.png`);
    newImage.setAttribute("id", "current-img");

    getLatestOpenedImage = calcNewImage;

    newImage.onload = function () {
        let imgWidth = this.width;
        let calcImageToEdge = ((windowWidth - imgWidth) / 2) - 80;

        let newBtn = document.querySelectorAll(".img-btn-style");
        newBtn[0].style.cssText = "right:" + calcImageToEdge + "px";
        newBtn[1].style.cssText = "left:" + calcImageToEdge + "px";
    }
}