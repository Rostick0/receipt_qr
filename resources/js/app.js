import "./bootstrap";

(async function () {
    const { Html5QrcodeScanner, Html5Qrcode } = await import("html5-qrcode");

    function onScanSuccess(decodeText, decodeResult) {
        alert("You Qr is : " + decodeText, decodeResult);
    }

    // const htmlscanner = new Html5QrcodeScanner("qr-reader", {
    //     fps: 10,
    //     qrbos: 250,
    // });
    // htmlscanner.render(onScanSuccess);

    const htmlscanner = new Html5Qrcode("qr-reader", {
        fps: 10,
        qrbos: 250,
    });

    const startCamera = async () => {
        const camers = Html5Qrcode.getCameras();
        const devices = await camers;

        const cameraId = devices[0]?.id;

        htmlscanner.start(
            cameraId,
            {
                fps: 10,
                qrbos: 250,
            },
            (decodedText, decodedResult) => {
                console.log(decodedText, decodedResult);
            },
            (errorMessage) => {}
        );
    };

    const fileinput = document.querySelector("#qr-input-file");
    fileinput.addEventListener("change", (e) => {
        if (e.target.files.length == 0) return;

        const imageFile = e.target.files[0];
        // Scan QR Code

        // htmlscanner.scanFileV2
        htmlscanner
            .scanFileV2(imageFile, false)
            .then((decodedText) => {
                // success, use decodedText
                console.log(decodedText);
            })
            .catch((err) => {
                // failure, handle it.
                console.log(`Error scanning file. Reason: ${err}`);
            });
    });

    const btn = document.querySelector("#qr-btn");
    btn.onclick = () => {
        if (htmlscanner.isScanning) {
            htmlscanner.stop();
            fileinput.removeAttribute("hidden");
            btn.textContent = "Сканировать";
            return;
        }

        startCamera();
        fileinput.setAttribute("hidden", true);
        btn.textContent = "Загрузить файл";
    };

    const qrScan = document.querySelector("#qr-scan");
    const modalScan = document.querySelector("#modal-scan");

    qrScan.onclick = () => {
        startCamera();
        modalScan.classList.add("active");
    };

    modalScan.onclick = (e) => {
        if (e.target !== modalScan) return;

        if (modalScan.classList.contains("active")) {
            htmlscanner.stop();
            modalScan.classList.remove("active");
        }
    };

    // const a = document.querySelector("#qr-reader");
    // a.innerHTML = a.innerHTML.replace("Stop Scanning", "Остановить сканирование").replace('Start Scanning', 'Начать сканирование');
})();
