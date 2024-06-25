import { Link } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

import { auth, db } from '../../contexts/firebase';
import { deleteAllTasks } from '../../functions';

import Header from '../../components/Header/index';

export default function Tasks() {
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState(auth.currentUser);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
        const tasksRef = db.collection(`users/${user.uid}/tasks`);
        tasksRef.onSnapshot((snapshot) => {
          setTasks(snapshot.docs.map((doc) => ({ id: doc.id,...doc.data()})));
        });
      } else {
        setUser(null);
        setTasks([]);
      }
    });
  }, []);

  const handleAddTask = async() => {
    if(user) {
      setIsLoading(true);
      const tasksRef = db.collection(`users/${user.uid}/tasks`);
      await tasksRef.add({
        title: newTask,
        completed: false,
      });
      setNewTask('');
      setIsLoading(null);
    }
  };

  const handleToggleCompleted = (task) => {
    if(user) {
      const taskRef = db.collection(`users/${user.uid}/tasks`).doc(task.id);
      taskRef.update({
        completed:!task.completed,
      });
    }
  };

  // const handleEditTask = (task) => {
  //   if(user) {
  //     const taskRef = db.collection(`users/${user.uid}/tasks`).doc(task.id);
  //     taskRef.update
  //   }
  // }

  const handleDeleteTask = (task) => {
    if(user) {
      const taskRef = db.collection(`users/${user.uid}/tasks`).doc(task.id);
      taskRef.delete();
    }
  };

  return (
    <>
      {user ? (
        <div>
          <Header title="Lista de Tarefas" path='/shopping' icon={faCartShopping} />
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(task)}
                />
                <span style={{ textDecoration: task.completed? 'line-through' : 'none' }}>
                  {task.title}
                </span>
                {/* <button onClick={() => handleEditTask(task)}>Editar</button> */}
                <button onClick={() => handleDeleteTask(task)}>Excluir</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar tarefa"
          />
          <button type='button' onClick={handleAddTask} disabled={isLoading}>{isLoading ? 'Adicionando...' : 'Adicionar'}</button>
          <br /><br />
          <button type='button' onClick={deleteAllTasks}>Deletar todas as tarefas</button>
        </div>
      ) : (
        <>
          <p>Faça login para acessar sua lista de tarefas</p>
          <Link to="/">Login</Link>
        </>
      )}
    </>
  );
}
