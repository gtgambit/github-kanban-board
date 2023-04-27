import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasksSliceReducer } from "./tasksSlice/tasks";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
