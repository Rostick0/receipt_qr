import axios from "axios";
import { API_URL } from "./consts";
import moment from "moment";
import { receiptComponent, receiptQrCode } from "./components";
import debounce from "lodash/debounce";

export const updateReceipt = async (dataSeach) => {
    const receipt = document.querySelector("#receipt");

    // const API_RECEIPT = "http://5.35.84.146:8050/ticket/send";
    const API_RECEIPT = "https://proverka-cheka.ru//ticket/send";

    const res = await axios.post(
        API_RECEIPT,
        new URLSearchParams(dataSeach).toString()
        // {
        // headers: { "content-type": "raw" },
        // }
    );

    // finded receipt
    const data = res.data?.fiscalDocument;

    if (!data) {
        alert("Чек не найден");
        return;
    }

    receipt.innerHTML = receiptComponent(data);

    receipt.scrollIntoView({
        behavior: "smooth",
    });

    receiptQrCode(
        new URLSearchParams({
            t: moment(data?.content?.dateTime).format("YMMDDTHHmmss"),
            s: (data?.content?.totalSum / 100)?.toFixed(2),
            fn: data?.content?.fiscalDriveNumber,
            i: data?.content?.fiscalDocumentNumber,
            fp: data?.content?.fiscalSign,
            n: data?.content?.operationType,
        }).toString()
    );
};

export const getParamsFromQuery = (queryString) =>
    Object.fromEntries(new URLSearchParams(queryString).entries());

export const initScan = async () => {
    const { Html5Qrcode } = await import("html5-qrcode");
    // t=20241101T1016&s=117.43&fn=7281440701438429&i=126871&fp=4180788980&n=1

    const qrScan = document.querySelector("#qr-scan");
    const modalScan = document.querySelector("#modal-scan");

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

        query.Date = moment(decodedData?.t).format("YMMDDTHHmmss");
        query.Sum = decodedData?.s;
        query.Fn = decodedData?.fn;
        query.FiscalDocumentId = decodedData?.i;
        query.FiscalSign = decodedData?.fp;
        query.TypeOperation = decodedData?.n;

        await updateReceipt(query);

        closeModal();
    }, 250);

    const startCamera = async () => {
        // const camers = Html5Qrcode.getCameras();

        htmlscanner.start(
            { facingMode: "environment" },
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
                alert(`Ошибка сканирования: чек не найден`);
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
