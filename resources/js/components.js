import moment from "moment";
import QRCode from "qrcode";
import { appliedTaxationTypes, operationTypes } from "./consts";

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
                            receipt?.content?.user ?? "-"
                        }</div>
                        <div class="text-center">ИНН ${
                            receipt?.content?.userInn
                        }</div>
                    </div>
                    <div class="my-6">
                        <div class="mb-2.5">${`${
                            receipt?.content?.retailPlace ?? ""
                        } ${
                            receipt?.content?.retailPlaceAddress ?? ""
                        }`.trim()}</div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ЧЕК</span>
                            <span>${receipt?.content?.code}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>${moment(receipt?.content?.dateTime).format(
                                "DD.MM.YYYY"
                            )}</span>
                            <span>${moment(receipt?.content?.dateTime).format(
                                "HH:mm"
                            )}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>Смена</span>
                            <span>${receipt?.content?.shiftNumber}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>${
                                operationTypes[receipt?.content?.operationType]
                            }</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>СНО</span>
                            <span>${
                                appliedTaxationTypes[
                                    receipt?.content?.appliedTaxationType
                                ]
                            }</span>
                        </div>
                     
                        <div class="flex items-center justify-between mb-2.5">
                            <span>СРН ККТНО</span>
                            <span>${receipt?.content?.kktRegId}</span>
                        </div>
                        ${receipt?.content?.items?.map(
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
                            <span>= ${receipt?.content?.totalSum / 100} ₽</span>
                        </div>
                        ${
                            receipt?.content?.cashTotalSum
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>НАЛИЧНЫМИ</span>
                                    <span>
                                        = ${
                                            receipt?.content?.cashTotalSum / 100
                                        } ₽
                                    </span>
                                </div>`
                                : ""
                        }
                        ${
                            receipt?.content?.creditSum ||
                            receipt?.content?.ecashTotalSum
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>Карта</span>
                                    <span>
                                        = ${
                                            (receipt?.content?.creditSum +
                                                receipt?.content
                                                    ?.ecashTotalSum) /
                                            100
                                        } ₽
                                    </span>
                                </div>`
                                : ""
                        }
                        
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ПОЛУЧЕНО</span>
                            <span>= ${
                                (receipt?.content?.prepaidSum > 0
                                    ? receipt?.content?.prepaidSum
                                    : receipt?.content?.totalSum) / 100
                            } ₽</span>
                        </div>
                        ${
                            receipt?.content?.ndsNo
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>СУММА БЕЗ НДС</span>
                                    <span>= ${
                                        receipt?.content?.ndsNo / 100
                                    } ₽ </span>
                                </div>`
                                : ""
                        }
                        ${
                            receipt?.content?.nds0
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>НДС 0%:</span>
                                    <span>= ${
                                        receipt?.content?.nds0 / 100
                                    } ₽ </span>
                                </div>`
                                : ""
                        }
                        ${
                            receipt?.content?.nds10
                                ? `<div class="flex items-center justify-between mb-2.5">
                                    <span>НДС 10%:</span>
                                    <span>= ${
                                        receipt?.content?.nds10 / 100
                                    } ₽ </span>
                                </div>`
                                : ""
                        }
                        ${
                            receipt?.content?.nds18
                                ? `<div class="flex items-center justify-between mb-2.5">
                                <span>НДС 20%:</span>
                                <span>= ${
                                    receipt?.content?.nds18 / 100
                                } ₽ </span>
                                </div>`
                                : ""
                        }
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ФН</span>
                            <span>${receipt?.content?.fiscalDriveNumber}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ФД</span>
                            <span>${
                                receipt?.content?.fiscalDocumentNumber
                            }</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span>ФПД</span>
                            <span>${receipt?.content?.fiscalSign}</span>
                        </div>
                    </div>
                    <div class="receipt__image flex max-w-52 mx-auto">
                        <canvas class="receipt__img" id="receipt-qrcode" width="100%" height="100%">
                    </div>
                </div>`;
