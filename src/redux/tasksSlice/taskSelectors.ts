import type { RootState } from "../store";
export const tasksIsLoadingSelector = (state: RootState) =>
  state.tasks.isLoading;
export const tasksErrorSelector = (state: RootState) => state.tasks.error;
export const allStateSelector = (state: RootState) => state.tasks;
