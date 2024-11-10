import moment from "moment";
import QRCode from "qrcode";

export const qrCode = (el, text, options = {}, onError = () => {}) =>
    // QRCode.toDataURL(el, data, onError);
    QRCode.toCanvas(el, text, options, onError);

export const receiptQrCode = (qrCodeData) =>
    qrCode(
        document.getElementById("receipt-qrcode"),
        qrCodeData,
        {
            margin: 0,
            color: {
                dark: "#000000",
                light: "#f8f8f8",
            },
            // scale: 20,
            width: 208,
            height: 208,
        },
        function (error) {
            if (error) console.error(error);
            console.log("success!");
        }
    );

export const receiptComponent = (
    receipt
) => `<div class="receipt grow text-xl py-6 px-12">
                    <div class="">
                        <div class="text-center mb-1">КАССОВЫЙ ЧЕК</div>
                        <div class="text-center mb-1">${
                            receipt?.user ?? "-"
                        }</div>
                        <div class="text-center">ИНН ${receipt?.userInn}</div>
                    </div>
                    <div class="my-6">
                        <div class="mb-2.5">${`${receipt?.retailPlace ?? ""} ${
                            receipt?.retailPlaceAddress ?? ""
                        }`.trim()}</div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ЧЕК</span>
                            <span>${receipt?.code}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>${moment(receipt?.dateTime).format(
                                "DD.MM.YYYY"
                            )}</span>
                            <span>${moment(receipt?.dateTime).format(
                                "HH:mm"
                            )}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>Смена</span>
                            <span>${receipt?.shiftNumber}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>${
                                receipt?.operation_type_collection?.name
                            }</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>СНО</span>
                            <span>${
                                receipt?.taxation_type_collection?.name
                            }</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>Кассир</span>
                            <span>${receipt?.operator ?? ""}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>СРН ККТНО</span>
                            <span>${receipt?.kktRegId}</span>
                        </div>
                        ${receipt?.products?.map(
                            (
                                product
                            ) => `<div class="flex items-center justify-between mb-2.5">
                            <span>${product?.name}</span>
                            <span>${product?.quantity} шт * ${
                                product?.price / 100
                            } ₽ =</span>
                        </div>`
                        )}
                        <div class="flex items-center justify-between font-bold mb-2.5">
                            <span>ИТОГ</span>
                            <span>= ${receipt?.totalSum / 100} ₽</span>
                        </div>
                        ${
                            receipt?.cashTotalSum
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>НАЛИЧНЫМИ</span>
                                    <span>
                                        = ${receipt?.cashTotalSum / 100} ₽
                                    </span>
                                </div>`
                                : ""
                        }
                        ${
                            receipt?.creditSum || receipt?.ecashTotalSum
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>Карта</span>
                                    <span>
                                        = ${
                                            (receipt?.creditSum +
                                                receipt?.ecashTotalSum) /
                                            100
                                        } ₽
                                    </span>
                                </div>`
                                : ""
                        }
                        
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ПОЛУЧЕНО</span>
                            <span>= ${
                                (receipt?.prepaidSum > 0
                                    ? receipt?.prepaidSum
                                    : receipt?.totalSum) / 100
                            } ₽</span>
                        </div>
                        ${
                            receipt?.ndsNo
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>СУММА БЕЗ НДС</span>
                                    <span>= ${receipt?.ndsNo / 100} ₽ </span>
                                </div>`
                                : ""
                        }
                        ${
                            receipt?.nds0
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>НДС 0%:</span>
                                    <span>= ${receipt?.nds0 / 100} ₽ </span>
                                </div>`
                                : ""
                        }
                        ${
                            receipt?.nds10
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>НДС 10%:</span>
                                    <span>= ${receipt?.nds10 / 100} ₽ </span>
                                </div>`
                                : ""
                        }
                        ${
                            receipt?.nds18
                                ? `<div class="flex items-center justify-between mb-2.5">
                                <span>НДС 20%:</span>
                                <span>= ${receipt?.nds18 / 100} ₽ </span>
                                </div>`
                                : ""
                        }
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ФН</span>
                            <span>${receipt?.fiscalDriveNumber}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ФД</span>
                            <span>${receipt?.fiscalDocumentNumber}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span>ФПД</span>
                            <span>${receipt?.fiscalSign}</span>
                        </div>
                    </div>
                    <div class="receipt__image flex max-w-52 mx-auto">
                        <canvas class="receipt__img" id="receipt-qrcode" width="100%" height="100%">
                    </div>
                </div>`;
