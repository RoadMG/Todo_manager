import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Window = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  width: 30%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 60px;
  margin-bottom: -80px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 10px auto;
`;

const Form = styled.form`
  width: 80%;
  margin-bottom: 15px;
  input {
    width: 100%;
    height: 30px;
    border-width: 0px;
    text-align: center;
    border-radius: 5px;
  }
`;

interface IForm {
  board: string;
}

const Creater = () => {
  const setBoards = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ board }: IForm) => {
    const newBoard = {
      text: board,
    };

    setBoards((allBoards) => {
      return { ...allBoards, [newBoard.text]: [] };
    });
    setValue("board", "");
  };
  return (
    <Window>
      <Wrapper>
        <Title>Create Boards</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("board", { required: true })}
            type="text"
            placeholder="Add boards"
          />
        </Form>
      </Wrapper>
    </Window>
  );
};

export default Creater;
