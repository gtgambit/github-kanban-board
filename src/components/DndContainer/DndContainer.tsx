import React, { FC } from "react";
import { allStateSelector } from "../../redux/tasksSlice/taskSelectors";
import { useSelector, useDispatch } from "react-redux";
import { InitialState, updateTasks } from "../../redux/tasksSlice/tasks";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Columns } from "../Columns/Columns";
import { TaskProps } from "../../types/types";

export interface DndContainerProps {
  repo: string;
}

interface DataProps extends InitialState {
  [key: string]:
    | {
        title: string;
        tasks: TaskProps[];
      }
    | boolean
    | null
    | string;
}

interface List {
  title: string;
  tasks: TaskProps[];
}

export const DndContainer: FC<DndContainerProps> = ({ repo }) => {
  const dispatch = useDispatch();
  const data = useSelector(allStateSelector) as DataProps;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceList = data[source.droppableId] as List;
    const destinationList = data[destination.droppableId] as List;

    if (sourceList === destinationList) {
      const newTasks = Array.from(sourceList.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newList: List = {
        ...sourceList,
        tasks: newTasks,
      };

      const newData: DataProps = {
        ...data,
        [source.droppableId]: newList,
      };

      dispatch(updateTasks(newData));
      localStorage.setItem(repo, JSON.stringify(newData));
    } else {
      const sourceNewTasks = Array.from(sourceList.tasks);
      const [removed] = sourceNewTasks.splice(source.index, 1);

      const destinationNewTasks = Array.from(destinationList.tasks);
      destinationNewTasks.splice(destination.index, 0, removed);

      const newSourceList: List = {
        ...sourceList,
        tasks: sourceNewTasks,
      };

      const newDestinationList: List = {
        ...destinationList,
        tasks: destinationNewTasks,
      };

      const newData: DataProps = {
        ...data,
        [source.droppableId]: newSourceList,
        [destination.droppableId]: newDestinationList,
      };
      dispatch(updateTasks(newData));
      localStorage.setItem(repo, JSON.stringify(newData));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Columns />
    </DragDropContext>
  );
};
