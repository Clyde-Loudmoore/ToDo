import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosGet = (filterTaskStatus, sortByDate, currentPage) =>
  axiosInstance.get("/tasks/1", {
    params: {
      filterBy: filterTaskStatus,
      order: sortByDate === 0 ? "asc" : "desc",
      pp: 5,
      page: currentPage,
    },
  });

export const axiosPost = async (task) =>
  await axiosInstance.post(`/task/1`, task);

export const axiosPatch = async (uuid, inputValue, todo) => {
  await axiosInstance.patch(
    `/task/1/${uuid}`,

    inputValue === "" ? { done: !todo.done } : { name: inputValue }
  );
};

export const axiosDelete = (uuid) => axiosInstance.delete(`/task/1/${uuid}`);
