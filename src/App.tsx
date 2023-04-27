import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "./redux/tasksSlice/thunkTasks";
import { DndContainer } from "./components/DndContainer/DndContainer";
import { InputComponent } from "./components/InputComponent/InputComponent";
import { Layout, Typography } from "antd"; // import Typography from Ant Design
import { updateTasks } from "./redux/tasksSlice/tasks";
import { Loader } from "./components/Loader/Loader";
import { tasksIsLoadingSelector } from "./redux/tasksSlice/taskSelectors";
import { useSelector } from "react-redux";
import { BreadcrumbSection } from "./components/BreadCrumbsSection/BreadCrumbsSection";
import { NotificationError } from "./components/NotificationError/NotificationError";
import { tasksErrorSelector } from "./redux/tasksSlice/taskSelectors";

const { Title } = Typography; // destructure Title component from Typography

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [repo, setRepo] = useState<string>("");
  const dispatch = useDispatch<any>();
  const isLoading = useSelector(tasksIsLoadingSelector);
  const isError = useSelector(tasksErrorSelector);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      setRepo(inputValue);
    },
    [inputValue]
  );

  useEffect(() => {
    if (repo) {
      const localStorageFromRepo = JSON.parse(
        localStorage.getItem(repo) || "null"
      );
      if (localStorageFromRepo) {
        dispatch(updateTasks(localStorageFromRepo));
        return;
      }
      dispatch(getTasks({ repoLink: repo }));
    }
  }, [repo, dispatch]);

  return (
    <Layout>
      <Layout.Content style={{ maxWidth: "800px", margin: "0 auto" }}>
        {isLoading && <Loader />}
        {isError && <NotificationError description={isError} />}
        <Title level={2} style={{ marginBottom: "16px" }}>
          Github Kanban Board
        </Title>{" "}
        <InputComponent
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          style={{ marginBottom: "16px" }}
        />
        <BreadcrumbSection repo={repo} />
        <DndContainer repo={repo} />
      </Layout.Content>
    </Layout>
  );
}

export default App;
