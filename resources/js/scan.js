import axios from "axios";
import { API_URL } from "./consts";
import moment from "moment";
import { receiptComponent, receiptQrCode } from "./components";
import debounce from "lodash/debounce";

export const updateReceipt = async (dataSeach) => {
    const receipt = document.querySelector("#receipt");

    const API_RECEIPT = "http://5.35.84.146:8050/ticket/send";
    const res = await axios.post(API_RECEIPT, dataSeach);

    // finded receipt
    const data = res.data?.data?.data?.[0];

    if (!data) {
        alert("Код не найден");
        return;
    }

    receipt.innerHTML = receiptComponent(data);

    receipt.scrollIntoView({
        behavior: "smooth",
    });
};

export const getParamsFromQuery = (queryString) =>
    Object.fromEntries(new URLSearchParams(queryString).entries());

export const initScan = async () => {
    const { Html5Qrcode } = await import("html5-qrcode");
    // t=20241101T1016&s=117.43&fn=7281440701438429&i=126871&fp=4180788980&n=1

    const qrScan = document.querySelector("#qr-scan");
    const modalScan = document.querySelector("#modal-scan");

    const replaceDecodedParams = (stringParams) => stringParams;
    // ?.replace("t=", "filterEQ[dateTime]=")
    // ?.replace("s=", "filterEQ[totalSum]=")
    // ?.replace("fn=", "filterEQ[fiscalDriveNumber]=")
    // ?.replace("i=", "filterEQ[fiscalDocumentNumber]=")
    // ?.replace("fp=", "filterEQ[fiscalSign]=")
    // ?.replace("n=", "filterEQ[operationType]=");
    // ?.replace("t=", "Date=")
    // ?.replace("s=", "Sum=")
    // ?.replace("n=", "TypeOperation=")
    // ?.replace("fn=", "Fn=")
    // ?.replace("i=", "FiscalDocumentId=")
    // ?.replace("fp=", "FiscalSign=");

    const scanSuccess = debounce(async (decode) => {
        const query = {
            Date: "",
            Sum: "",
            Fn: "",
            FiscalDocumentId: "",
            FiscalSign: "",
            TypeOperation: "",
        };
        const decodedData = getParamsFromQuery(decode);

        query.Date = decodedData?.t;
        query.Sum = decodedData?.s;
        query.Fn = decodedData?.fn;
        query.FiscalDocumentId = decodedData?.i;
        query.FiscalSign = decodedData?.fp;
        query.TypeOperation = decodedData?.n;

        await updateReceipt(query);

        // const res = await axios.get(`${API_URL}/receipt`, {
        //     params: {
        //         extends:
        //             "products,operationTypeCollection,taxationTypeCollection",
        //         limit: 1,
        //         ...decodedData,
        //         "filterEQ[dateTime]": moment(
        //             decodedData["filterEQ[dateTime]"]
        //         ).toISOString(),
        //     },
        // });

        // // finded receipt
        // const data = res.data?.data?.data?.[0];

        // if (!data) {
        //     alert("Код не найден");
        //     // closeModal();
        //     return;
        // }

        // receipt.innerHTML = receiptComponent(data);

        closeModal();

        // receipt.scrollIntoView({
        //     behavior: "smooth",
        // });
    }, 250);

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
            scanSuccess,
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
            .then((scanRes) => scanSuccess(scanRes?.decodedText))
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
