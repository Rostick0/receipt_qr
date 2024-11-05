import "./bootstrap";

// import { Html5QrcodeScanner } from "html5-qrcode";

(async function () {
    const { Html5QrcodeScanner } = await import("html5-qrcode");

    function onScanSuccess(decodeText, decodeResult) {
        alert("You Qr is : " + decodeText, decodeResult);
    }

    const htmlscanner = new Html5QrcodeScanner("my-qr-reader", {
        fps: 10,
        qrbos: 250,
    });
    htmlscanner.render(onScanSuccess);

    // setTimeout(() => {

    // }, 120);
    // console.log(document.querySelector("#html5-qrcode-button-camera-start"));

    // console.log(document.querySelector("#html5-qrcode-button-camera-stop"));
    // document.querySelector("#html5-qrcode-button-camera-start").textContent =
    //     "Прекратить сканирование";
    // document.querySelector("#html5-qrcode-button-camera-stop").textContent =
    //     "Прекратить сканирование";
})();

(function () {
    document.querySelectorAll(".modal");
});
