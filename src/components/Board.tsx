import { useForm } from "react-hook-form";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#FCE2DB"
      : props.draggingFromThisWith
      ? "#D4F6CC"
      : props.theme.boardColor};
  flex-grow: 0.1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 15px;
  input {
    width: 100%;
    height: 30px;
    border-width: 0px;
    text-align: center;
    border-radius: 5px;
  }
`;

const DelButton = styled.button`
  position: absolute;
  width: 30px;
  height: 25px;
  margin-top: -3px;
  justify-self: flex-end;
  align-self: flex-end;
  background-color: #d7eddd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardID: string;
  index: number;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardID, index }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardID]: [newToDo, ...allBoards[boardID]],
      };
    });
    setValue("toDo", "");
  };

  const deleteBoard = () => {
    setToDos((allBoards) => {
      const oldBoards = { ...allBoards };
      delete oldBoards[boardID];
      return oldBoards;
    });
  };

  return (
    <Draggable draggableId={boardID + ""} index={index} key={boardID + ""}>
      {(magic, info) => (
        <div
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <Wrapper>
            <Title>{boardID}</Title>

            <DelButton onClick={deleteBoard}>X</DelButton>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("toDo", { required: true })}
                type="text"
                placeholder={`Add task in ${boardID}`}
              />
            </Form>
            <Droppable droppableId={boardID} type={true ? "active" : "none"}>
              {(magic, info) => (
                <Area
                  isDraggingOver={info.isDraggingOver}
                  draggingFromThisWith={Boolean(info.draggingFromThisWith)}
                  ref={magic.innerRef}
                  {...magic.droppableProps}
                >
                  {toDos.map((toDo, index) => (
                    <DraggableCard
                      key={toDo.id}
                      index={index}
                      toDoId={toDo.id}
                      toDoText={toDo.text}
                      boardID={boardID}
                    />
                  ))}
                  {magic.placeholder}
                </Area>
              )}
            </Droppable>
          </Wrapper>
        </div>
      )}
    </Draggable>
  );
};

export default Board;
