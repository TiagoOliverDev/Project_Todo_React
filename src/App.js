import './App.css';
import {useState, useEffect} from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://locahost:5000";

function App() {

  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([]) //estado com array vázio 
  const [loading, setLoagind] = useState(false) //forma de carregar dados e exibir ao user que está sendo carregado algo.

  const handleSubmit = (e) => {
    e.preventDefault(); //impede da página ficar dando refresh
    setTitle("") //deixando form vázio após envio
    console.log(title)
    console.log("Enviou");
  }

  return (
    <div className="App">
      <div className='todo-header' >
        <h1>React Todo</h1>
      </div>
      <div className='form-todo' >
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control' >
            <label htmlFor='title'>O que você vai fazer ?</label>
            <input 
            type="text" 
            name="title" 
            placeholder="Título da tarefa" 
            onChange={(e) => setTitle(e.target.value) }
            value={title || ""} 
            required
            />
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </div>
      <div className='list-todo' >
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas cadastradas!</p>}
      </div>
    </div>
  );
} //parei em 1:14: https://www.youtube.com/watch?v=pOVyVivyfok&list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO&index=42

export default App;
