const themeBtn = document.querySelector("#theme-changer i");
const body = document.querySelector("body");
const nav = document.querySelector("#nav-wrapper");
const navIconBars = document.querySelector(".fa-bars");
const navIconCross = document.querySelector("#cross");
const qrForm = document.getElementById("qr-form");
const qrInputBox = document.getElementById("qr_url");
const qrSize = document.getElementById("size");
const qrCodeContainer = document.getElementById("qr-code");
const loader = document.querySelector("#loader");
const colorVal = document.querySelector("#color-picker");
const downloadBtn = document.querySelector("#download-qr");

colorVal.value = "#000000"; //default color

body.classList.add("dark-theme"); // default theme

//  THEME
themeBtn.addEventListener("click", (e) => {

    if (e.target.classList.contains("fa-sun")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    }
    else {
        body.classList.add("dark-theme");
        body.classList.remove("light-theme");
    }
    e.target.classList.toggle("fa-moon");
    e.target.classList.toggle("fa-sun");

});

//  NAVBAR

navIconBars.addEventListener("click", () => {
    nav.classList.toggle("shownav")
});

navIconCross.addEventListener("click", () => {
    nav.classList.toggle("shownav")
});


// QR FORM

qrForm.addEventListener("submit", async (e) => {
    e.preventDefault();


    try {

        await generateQR(qrInputBox.value, qrSize.value, colorVal.value);
        downloadBtn.style.display = "block";


    } catch (err) {
        console.error("Error generating QR code:", err);
        loader.style.display = "none";
    }

});

//  QR GENERATION

const generateQR = (qrVal, qrSizeVal, colorVal) => {
    qrCodeContainer.innerHTML = "";
    try {
        new QRCode(qrCodeContainer, {
            text: qrVal,
            width: qrSizeVal,
            height: qrSizeVal,
            colorDark: colorVal,
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H,
        });
    } catch (error) {
        console.error("Error generating QR code:", error);
    }
};

//  DOWNLOAD BUTTON


downloadBtn.addEventListener("click", downloadQR);

function downloadQR() {
    let qrImg = qrCodeContainer.querySelector("img");

    fetch(qrImg.src)
        .then(response => response.blob())
        .then(blob => {
            var imgUrl = window.URL.createObjectURL(blob);

            var newTab = window.open();
            newTab.document.write('<html><head><title>QR Code</title></head><body><img src="' + imgUrl + '" alt="QR Code"></body></html>');
        })
        .catch(error => console.error('Error fetching the image:', error));
}

