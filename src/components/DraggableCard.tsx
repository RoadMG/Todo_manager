import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
  margin-bottom: 8px;
`;

const DelButton = styled.button`
  width: 25px;
  height: 25px;
  padding: 0px;
  background-color: #d7eddd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardID: string;
}

const DraggableCard = ({
  toDoId,
  toDoText,
  index,
  boardID,
}: IDragabbleCardProps) => {
  const toDoSetter = useSetRecoilState(toDoState);

  const deleteToDo = () => {
    toDoSetter((allBoards) => {
      const oldToDos = [...allBoards[boardID]];
      oldToDos.splice(index, 1);

      return { ...allBoards, [boardID]: oldToDos };
    });
  };

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText} <DelButton onClick={deleteToDo}>X</DelButton>
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
