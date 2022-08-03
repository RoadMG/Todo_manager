import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

interface IRubbishProps {
  isDraggingOver: boolean;
}

const RubbishWrap = styled.div<IRubbishProps>`
  width: 60px;
  height: 60px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#FCE2DB" : props.theme.boardColor};
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
`;

const RubbishBin = () => {
  return (
    <Droppable droppableId="rubbish" type={"active"}>
      {(magic, info) => (
        <RubbishWrap
          isDraggingOver={info.isDraggingOver}
          ref={magic.innerRef}
          {...magic.droppableProps}
        >
          <DeleteForeverIcon sx={{ fontSize: "40px", position: "absolute" }} />
        </RubbishWrap>
      )}
    </Droppable>
  );
};

export default RubbishBin;
