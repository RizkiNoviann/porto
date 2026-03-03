import axios from "axios";

const BASE_URL = "http://localhost:3000";

function getAuthHeader(multipart = false) {
  const token = localStorage.getItem("token");
  const auth = token ? { Authorization: `Bearer ${token}` } : {};
  return multipart
    ? { ...auth, "Content-Type": "multipart/form-data" }
    : auth;
}

export function useApi() {
  async function get(endpoint) {
    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  }

  async function post(endpoint, data) {
    const res = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  }

  async function postForm(endpoint, formData) {
    const res = await axios.post(`${BASE_URL}${endpoint}`, formData, {
      headers: getAuthHeader(true),
    });
    return res.data;
  }

  async function put(endpoint, data) {
    const res = await axios.put(`${BASE_URL}${endpoint}`, data, {
      headers: getAuthHeader(),
    });
    return res.data;
  }

  async function putForm(endpoint, formData) {
    const res = await axios.put(`${BASE_URL}${endpoint}`, formData, {
      headers: getAuthHeader(true),
    });
    return res.data;
  }

  async function del(endpoint) {
    const res = await axios.delete(`${BASE_URL}${endpoint}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  }

  return { get, post, postForm, put, putForm, del };
}

