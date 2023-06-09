import { AiFillCloseCircle } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import "./styles.css";

type ModalProps = {
  setOpenModal: (data: boolean) => void;
};

export default function Modal({ setOpenModal }: ModalProps) {
  const data = false;

  return (
    <>
      <div className="modal-self" onClick={() => setOpenModal(data)} />
      <div className="modal">
        <AiFillCloseCircle
          className="close-circle"
          onClick={() => setOpenModal(data)}
        />
        <GiNotebook className="notebook" />
        <h2>Por favor, escreva alguma tarefa!</h2>
      </div>
    </>
  );
}
