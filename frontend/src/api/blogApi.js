import { apiRequest } from "./api";

export const getBlogs = () =>
    apiRequest("/blogs");

export const getBlog = (id) =>
    apiRequest(`/blogs/${id}`);

export const createBlog = (payload) =>
    apiRequest("/blogs", {
        method: "POST",
        body: JSON.stringify(payload)
    });

export const updateBlog = (id, payload) =>
    apiRequest(`/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });

export const deleteBlog = (id) =>
    apiRequest(`/blogs/${id}`, {
        method: "DELETE"
    });