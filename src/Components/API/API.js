import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// axios.get("https://todo-api-learning.herokuapp.com/v1/tasks/1?order=asc&pp=5&page=1").then((res) => {console.log(res.data)})

export const axiosGet = (todoFilter, filters, currentPage) =>
  axiosInstance.get("/tasks/1", {
    params: {
      filterBy: todoFilter,
      order: filters === 0 ? "asc" : "desc",
      pp: 5,
      page: currentPage,
    },
  });

export const axiosPost = async (task) =>
  await axiosInstance.post(`/task/1`, task);

export const axiosPatch = (uuid, meaning) =>
  axiosInstance.patch(`/task/1/${uuid}`, {
    name: meaning,
  });

export const axiosPatchDone = async (done, uuid) => {
  await axiosInstance.patch(`/task/1/${uuid}`, {
    done: !done,
  });
};
export const axiosDelete = (uuid) => axiosInstance.delete(`/task/1/${uuid}`);
