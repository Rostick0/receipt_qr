import axios from "axios";
import "./bootstrap";
// import "./scan";
import { initScan, updateReceipt } from "./scan";
import { getFormValues } from "./utils";

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
            "filterEQ[totalSum]": formValues["filterEQ[totalSum]"] * 100,
        });
    };

    const receiptSearch = document.querySelector("#receipt-search");

    receiptSearch.onsubmit = onSearchReceipt;
})();

// const res = axios.get(`${API_URL}/receipt`, {
//     params: {
//         extends: "products,operationTypeCollection,taxationTypeCollection",
//         limit: 1,
//     },
// });
// console.log(await res.then((res) => res.data?.data?.data[0]));
