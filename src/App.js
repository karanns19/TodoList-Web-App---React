import React from 'react';
import './style.css';

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Shopping', done: false },
    { id: 2, text: 'Excercise', done: false },
    { id: 3, text: 'Work', done: false },
  ]);

  return (
    <div className="App">
      <h1>Task Manager !</h1>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done,
          }
        : t
    );
    setTodos(updatedTodos);
  }
  if (!todos.length) {
    return <p>No todos left!</p>;
  }
  //instead of writing props we can use object destructing
  return (
    <ul className="todolist">
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? 'line-through' : '',
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm('Do you want to delete this?');
    if (confirmed) {
      // take care of deleting the todo
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
      style={{
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 20,
        cursor: 'pointer',
      }}
    >
      x
    </span>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();
  function HandleAddTodo(event) {
    event.preventDefault();
    //console.log(event.target.elements.addTodo.value);
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: 4,
      text,
      done: false,
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = '';
  }
  return (
    <form onSubmit={HandleAddTodo}>
      <input
        className="addTodo"
        name="addTodo"
        placeholder="Add Todo"
        ref={inputRef}
      />
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}
