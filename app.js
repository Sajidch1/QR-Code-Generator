function generateQR() {
    let text = document.getElementById("text").value;
    let qrcodeDiv = document.getElementById("qrcode");
    let printBtn = document.getElementById("printBtn");
    let shareBtn = document.getElementById("shareBtn");

    qrcodeDiv.innerHTML = "";
    if (text.trim() === "") {
        alert("Please enter Require Inputs Info.");
        return;
    }
    let title = document.getElementById("title").value;
    let instructions = document.getElementById("instructions").value;
    let myh1 = document.createElement("h1");
    myh1.textContent = title;
    let myp = document.createElement("p");
    myp.textContent = instructions;
    
    qrcodeDiv.appendChild(myh1);
    
    
    new QRCode(qrcodeDiv, {
        text: text,
        width: 200,
        height: 200
    });

    qrcodeDiv.appendChild(myp);

    qrcodeDiv.classList.remove("hidden");
    document.querySelector(".first").style.display = "none";

   
    setTimeout(() => {
        printBtn.classList.remove("hidden");
        shareBtn.classList.remove("hidden");
    }, 500);
}

function printQR() {
    let qrCanvas = document.querySelector("#qrcode canvas");
    if (!qrCanvas) {
        alert("Generate a QR Code first!");
        return;
    }
    window.print();
}

function shareQR() {
let qrDiv = document.getElementById("qrcode");

if (!qrDiv.innerHTML.trim()) {
alert("Generate a QR Code first!");
return;
}

html2canvas(qrDiv).then(canvas => {
let qrImage = canvas.toDataURL("image/png");

// Create a blob from the image data
canvas.toBlob(blob => {
    let file = new File([blob], "qrcode.png", { type: "image/png" });

    // Check if Web Share API is supported (for mobile sharing)
    if (navigator.share) {
        navigator.share({
            title: "QR Code",
            text: "Here is your generated QR Code.",
            files: [file]
        }).then(() => console.log("Shared successfully"))
          .catch(err => console.log("Error sharing:", err));
    } else {
        // If Web Share API is not supported, generate a downloadable link
        let link = document.createElement("a");
        link.href = qrImage;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Sharing is not supported on your device. The image has been downloaded.");
    }
}, "image/png");
});
}