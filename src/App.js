import './App.css';
import {useState, useEffect} from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {

  const [title, setTitle] = useState("") 
  const [time, setTime] = useState("") 
  const [todos, setTodos] = useState([]) //estado com array vázio 
  const [loading, setLoagind] = useState(false) //forma de carregar dados e exibir ao user que está sendo carregado algo.

  // Load todos on page load
  useEffect(() => {

    const loadData = async() => {
      setLoagind(true)

      const res = await fetch(API + "/todos")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

      setLoagind(false)
      setTodos(res)
    }

    loadData()
  },[])

  const handleSubmit = async (e) => { // function asyncrona pois irá esperar resposta do fetch
    e.preventDefault(); //impede da página ficar dando refresh
    
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false, //aqui fizemos com que a tarefa naturalmente entre como não completa no sistema
    };
    
    //Fazendo interação com a API
    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    setTodos((prevState) => [...prevState, todo]); //prevState é o estado anterior do item que estou trabalhando
    //[...prevState, todo] - pegou todos os todos e colocou numa nova lista todo.

    setTitle("") //deixando form vázio após envio
    setTime("")
  }

  const handleDelete =  async (id) => {
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
    });

    // se id da lista de todo for diferente do id que veio pelo requisição eu retorno esse todo, se não, ele não retorna.
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id))

  }

  const handleEdit = async(todo) => {

    todo.done = !todo.done; // se está pronta fica "despronta" e se tiver despronta ficará pronta!

    const data = await fetch(API + "/todos/" + todo.id, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => 
      prevState.map((t) => (t.id === data.id ? (t = data) : t))
    );
  };

  if (loading){
    return <p>Carregando...</p>;
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

          <div className='form-control' >
            <label htmlFor='time'>Duração:</label>
            <input 
            type="text" 
            name="time" 
            placeholder="Tempo estimado (em horas)" 
            onChange={(e) => setTime(e.target.value) }
            value={time || ""} 
            required
            />
          </div>

          <input type="submit" value="Cadastrar tarefa" />
        </form>
      </div>
      <div className='list-todo' >
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas cadastradas!</p>}
        {todos.map((todo) => (
            <div className='todo' key={todo.id}>
              <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
              <p>Duração: {todo.time}</p>
              <div className='actions' >
                <span onClick={() => handleEdit(todo)}>
                  {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                </span>
                <BsTrash  onClick={() => handleDelete(todo.id)} />
              </div>
            </div>
        ))}
      </div>
    </div>
  );
} 

export default App;
