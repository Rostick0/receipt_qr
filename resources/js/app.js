import axios from "axios";
import "./bootstrap";
// import "./scan";
import { initScan } from "./scan";

try {
    initScan();
} catch (e) {
    console.error(e);
}

(async () => {
    const onSearchReceipt = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        console.log(form);
        // form.forEach((item) => console.log(item));
        // console.log(e);
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
