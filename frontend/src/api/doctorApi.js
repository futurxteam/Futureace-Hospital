import { apiRequest } from "./api";

export const getDoctors = () =>
    apiRequest("/doctors");

export const getDoctor = (id) =>
    apiRequest(`/doctors/${id}`);

export const createDoctor = (payload) =>
    apiRequest("/doctors", {
        method: "POST",
        body: JSON.stringify(payload)
    });

export const updateDoctor = (id, payload) =>
    apiRequest(`/doctors/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });

export const deleteDoctor = (id) =>
    apiRequest(`/doctors/${id}`, {
        method: "DELETE"
    });