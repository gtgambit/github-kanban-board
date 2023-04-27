import { getTasksFromGitRepo } from "../../services/gitApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GitApiResponse } from "../../types/types";

interface getTasksProps {
  repoLink: string;
}

export const getTasks = createAsyncThunk<GitApiResponse, getTasksProps>(
  "tasks/getTasks",
  async ({ repoLink }, thunkApi: any) => {
    try {
      return await getTasksFromGitRepo(repoLink);
    } catch (error) {
      return thunkApi.rejectWithValue({ message: "Some error" });
    }
  }
);
