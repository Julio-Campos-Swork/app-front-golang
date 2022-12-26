import axios from "axios";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAxiosStore = defineStore("useAxiosStore", () => {
  const BASE_URL = "http://localhost:9080";
  const dataUsers = reactive({data: ""})


  const retrieveAllUsers = async () => {
    const resp = await axios.get(`${BASE_URL}/users`, {withCredentials: true});
    // console.log("axios store",resp.data)
    dataUsers.data = resp.data;
    // console.log("axios dataUsers",dataUsers)

    return resp;
  };
  const retrieveUser = async (id) => {
    return await axios.get(`${BASE_URL}/users/${id}`, {withCredentials: true});
  };
  const deleteUser = async (id) => {
    return await axios.delete(`${BASE_URL}/users/${id}`,{withCredentials: true});
  };
  const updateUser = async (id, user) => {
    return await axios.put(`${BASE_URL}/users/${id}`, user, {withCredentials: true});
  };
  const createUser = async (user) => {
    return await axios.post(`${BASE_URL}/users`, user, {withCredentials: true});
  };

  const registerUser = async (data) => {
    const resp = await axios.post(`${BASE_URL}/register`, data);
    console.log(resp);

  }
  const loginUser = async (data) => {
    const resp = await axios.post(`${BASE_URL}/login`, data,{withCredentials: true});
    console.log(resp);
  }
  return {dataUsers, retrieveAllUsers, retrieveUser, deleteUser, updateUser, createUser, registerUser, loginUser };
});
