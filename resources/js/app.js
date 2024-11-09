import axios from "axios";
import "./bootstrap";
// import "./scan";
import { initScan } from "./scan";

try {
    initScan();
} catch (e) {
    console.error(e);
}

// const res = axios.get(`${API_URL}/receipt`, {
//     params: {
//         extends: "products,operationTypeCollection,taxationTypeCollection",
//         limit: 1,
//     },
// });
// console.log(await res.then((res) => res.data?.data?.data[0]));
