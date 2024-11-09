import axios from "axios";
import { API_URL } from "./consts";
import moment from "moment";
import { receiptComponent } from "./components";

export const getParamsFromQuery = (queryString) =>
    Object.fromEntries(new URLSearchParams(queryString).entries());

export const initScan = async () => {
    const { Html5Qrcode } = await import("html5-qrcode");
    // t=20241101T1016&s=117.43&fn=7281440701438429&i=126871&fp=4180788980&n=1

    const qrScan = document.querySelector("#qr-scan");
    const modalScan = document.querySelector("#modal-scan");
    const receipt = document.querySelector("#receipt");

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

    qrScan.onclick = () => {
        startCamera();
        modalScan.classList.add("active");
    };

    const closeModal = () => {
        if (modalScan.classList.contains("active"))
            modalScan.classList.remove("active");

        if (htmlscanner.isScanning) htmlscanner.stop();

        if (!fileinput.hasAttribute("hidden"))
            fileinput.setAttribute("hidden", true);
    };

    modalScan.onclick = (e) => {
        if (e.target !== modalScan) return;

        closeModal();
    };

    const replaceDecodedParams = (stringParams) => stringParams;
    // ?.replace("t=", "filterEQ[dateTime]=")
    // ?.replace("s=", "filterEQ[totalSum]=")
    // ?.replace("fn=", "filterEQ[fiscalDriveNumber]=")
    // ?.replace("i=", "filterEQ[fiscalDocumentNumber]=")
    // ?.replace("fp=", "filterEQ[fiscalSign]=")
    // ?.replace("n=", "filterEQ[operationType]=")
    const scanSuccess = async (decode) => {
        const decodedData = getParamsFromQuery(
            replaceDecodedParams(decode?.decodedText)
        );

        const res = await axios.get(`${API_URL}/receipt`, {
            params: {
                extends:
                    "products,operationTypeCollection,taxationTypeCollection",
                limit: 1,
                ...decodedData,
                // "filterEQ[dateTime]": moment(
                //     decodedData["filterEQ[dateTime]"]
                // ).toISOString(),
            },
        });

        // finded receipt
        const data = res.data?.data?.data?.[0];

        if (!data) {
            closeModal();
            return;
        }

        receipt.innerHTML = receiptComponent(data);
        closeModal();
    };

    const htmlscanner = new Html5Qrcode("qr-reader", {
        fps: 10,
        qrbos: 250,
    });

    const fileinput = document.querySelector("#qr-input-file");
    fileinput.addEventListener("change", (e) => {
        if (e.target.files.length == 0) return;

        const imageFile = e.target.files[0];

        htmlscanner
            .scanFileV2(imageFile, false)
            .then(scanSuccess)
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
};
