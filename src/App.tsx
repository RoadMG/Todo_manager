import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "./atoms";
import Board from "./components/Board";
import Creater from "./components/Creater";
import RubbishBin from "./components/Rubbish";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    else if (destination.droppableId === "rubbish") {
      setToDos((allBoards) => {
        const oldToDo = [...allBoards[source.droppableId]];
        oldToDo.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: oldToDo,
        };
      });
    } else if (source.droppableId === "window") {
      setToDos((allBoards) => {
        const oldBoardskey = Object.keys(allBoards);
        const targetBoard = oldBoardskey[source.index];

        oldBoardskey.splice(source.index, 1);
        oldBoardskey.splice(destination?.index, 0, targetBoard);

        const newBoards: IToDoState = {};

        oldBoardskey.forEach((key, i) => {
          let keyName = oldBoardskey[i];
          newBoards[keyName] = allBoards[keyName];
        });

        return newBoards;
      });
    } else if (destination.droppableId === source.droppableId) {
      //same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      //cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationtBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationtBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationtBoard,
        };
      });
    }
  };

  return (
    <>
      <Creater />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="window" direction="horizontal">
          {(magic) => (
            <Wrapper>
              <Boards ref={magic.innerRef} {...magic.droppableProps}>
                {Object.keys(toDos).map((boardId, index: number) => (
                  <Board
                    boardID={boardId}
                    key={boardId}
                    toDos={toDos[boardId]}
                    index={index}
                  />
                ))}
                {magic.placeholder}
              </Boards>
            </Wrapper>
          )}
        </Droppable>
        <RubbishBin />
      </DragDropContext>
    </>
  );
}

export default App;

// Challenge List
/*

1. 쓰레기통 만들어서 드래그 해서 없애기
2. Local Storage 만들어서 넣기
3. Form 입력 만들어서 Form 생성하기
4. Form도 Drag해서 이동시키기

*/
