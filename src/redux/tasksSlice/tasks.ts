import { TaskProps } from "./../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTasks } from "./thunkTasks";

export interface InitialState {
  toDo: {
    title: string;
    tasks: TaskProps[];
  };
  inProgress: {
    title: string;
    tasks: TaskProps[];
  };
  done: {
    title: string;
    tasks: TaskProps[];
  };
  isLoading: boolean;
  error: null | string;
}

const initialState: InitialState = {
  toDo: {
    title: "ToDo",
    tasks: [],
  },
  inProgress: {
    title: "In Progress",
    tasks: [],
  },
  done: {
    title: "Done",
    tasks: [],
  },
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasks: (state, action) => {
      state.toDo.tasks = [...action.payload.toDo.tasks];
      state.inProgress.tasks = [...action.payload.inProgress.tasks];
      state.done.tasks = [...action.payload.done.tasks];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.toDo.tasks = action.payload.filter(
          (task: TaskProps) => task.state === "open"
        );
        state.done.tasks = action.payload.filter(
          (task: TaskProps) => task.state === "closed"
        );
        state.inProgress.tasks = action.payload.filter(
          (task: TaskProps) => task.assignee !== null
        );
      })
      .addCase(getTasks.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      }),
});

export const { updateTasks } = tasksSlice.actions;

export const tasksSliceReducer = tasksSlice.reducer;
