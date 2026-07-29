import { apiRequest } from "./api";

export const submitEnquiry = (payload) =>
    apiRequest("/enquiries", {
        method: "POST",
        body: JSON.stringify(payload)
    });