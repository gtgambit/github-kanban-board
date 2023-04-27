import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com/repos",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export const getTasksFromGitRepo = async (link: string) => {
  const parts = link.split("/");
  const owner = parts[3];
  const repo = parts[4];
  const response = await axiosInstance.get(`${owner}/${repo}/issues`);
  return response.data;
};
