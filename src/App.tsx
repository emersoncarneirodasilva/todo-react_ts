import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Card from "./components/Card";
import Modal from "./components/Modal";
import "./App.css";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("@codersList:todos");

    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });

  // Salvar os dados
  useEffect(() => {
    localStorage.setItem("@codersList:todos", JSON.stringify(todos));
  }, [todos]);

  // Função de pegar mudança no input
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  // Função que habilita o botão enter para adicionar
  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (todoInput !== "") {
        addTodo();
      } else {
        setOpenModal(true);
      }
    }
  }

  // Função de adicionar
  function addTodo() {
    if (todoInput !== "") {
      setTodos((previousTodos) => [
        ...previousTodos,
        { id: Math.random(), title: todoInput, completed: false },
      ]);
      setTodoInput("");
    } else {
      setOpenModal(true);
    }
  }

  // Função de completar
  function completeTodo(id: number) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      )
    );
  }

  // Função de deletar
  function deleteTodo(id: number) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }

  // Função para pegar argumentos do elemento filho
  function childToParent(openModal: boolean) {
    setOpenModal(openModal);
  }

  return (
    <div className="todos">
      <h1>Todo React.ts</h1>
      <div className="add-todo">
        <input
          placeholder="Escreva uma tarefa"
          value={todoInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTodo} className="add-button">
          <BsPlusCircle />
        </button>
        {openModal && <Modal setOpenModal={childToParent} />}
      </div>

      {todos?.map((todo) => (
        <Card
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default App;
