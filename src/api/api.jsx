import axios from "axios";

/* eslint-disable  */
const URL = "http://localhost:9000";

export const getUsers = async () => {
  try {
    return await axios.get(`${URL}/users`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error getting users", error);
  }
};

export const addPeople = async (data) => {
  try {
    return await axios.post(`${URL}/add-people`, data);
  } catch (error) {
    console.error("Error adding people", error);
  }
};

export const deletePeople = async (id) => {
  try {
    return await axios.delete(`${URL}/delete-people/${id}`);
  } catch (error) {
    console.error("Error deleting people", error);
  }
};

export const updatePeople = async (data) => {
  try {
    return await axios.put(`${URL}/update-people`, data);
  } catch (err) {
    console.error("Error updating people", err);
  }
};
