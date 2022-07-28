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

export const axiosPatch = (uuid, inputValue) =>
  axiosInstance.patch(`/task/1/${uuid}`, {
    name: inputValue,
  });

export const axiosPatchDone = async (done, uuid) => {
  ///////////////////
  await axiosInstance.patch(`/task/1/${uuid}`, {
    done: !done,
  });
};
export const axiosDelete = (uuid) => axiosInstance.delete(`/task/1/${uuid}`);
