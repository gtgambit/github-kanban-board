import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { allStateSelector } from "../../redux/tasksSlice/taskSelectors";
import { useSelector } from "react-redux";
import { TaskProps } from "../../types/types";
import { Task } from "../Task/Task";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

interface List {
  title: string;
  tasks: TaskProps[];
}

interface Data {
  toDo: List;
  inProgress: List;
  done: List;
  isLoading: boolean;
  error: string | null;
}

export const Columns: FC = () => {
  const data = useSelector(allStateSelector) as Data;

  return (
    <Row gutter={10} className="kanban-board">
      {Object.entries(data).map(([listId, list]) => {
        if (listId === "isLoading" || listId === "error") {
          return null;
        }

        return (
          <Col key={listId} className="kanban-list">
            <Title level={3} style={{ textAlign: "center", color: "black" }}>
              {list.title}
            </Title>
            <Droppable droppableId={listId}>
              {(provided, snapshot) => (
                <div
                  style={{
                    width: "250px",
                    minHeight: "50vh",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    padding: "2px",
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={snapshot.isDraggingOver ? "dragging-over" : ""}>
                  {list.tasks.map((task: TaskProps, index: number) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`kanban-task ${
                            snapshot.isDragging ? "dragging" : ""
                          }`}>
                          <Task task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        );
      })}
    </Row>
  );
};
