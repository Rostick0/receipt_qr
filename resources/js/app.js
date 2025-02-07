import axios from "axios";
import "./bootstrap";
// import "./scan";
import { initScan, updateReceipt } from "./scan";
import { getFormValues } from "./utils";
import moment from "moment";

try {
    initScan();
} catch (e) {
    console.error(e);
}

(async () => {
    const onSearchReceipt = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const formValues = getFormValues(form);

        await updateReceipt({
            ...formValues,
            Date: moment(formValues?.Date).format("YMMDDTHHmmss"),
        });
    };

    const receiptSearch = document.querySelector("#receipt-search");

    receiptSearch.onsubmit = onSearchReceipt;
})();
