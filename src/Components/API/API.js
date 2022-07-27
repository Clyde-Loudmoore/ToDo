import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// axios.get("https://todo-api-learning.herokuapp.com/v1/tasks/1?order=asc&pp=5&page=1").then((res) => {console.log(res.data)})
