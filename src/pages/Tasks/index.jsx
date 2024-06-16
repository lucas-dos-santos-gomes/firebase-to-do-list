import { useState, useEffect } from 'react';
import { auth, db } from '../../contexts/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
        console.log(user);
        const tasksRef = db.collection(`users/${user.uid}/tasks`);
        tasksRef.onSnapshot((snapshot) => {
          setTasks(snapshot.docs.map((doc) => ({ id: doc.id,...doc.data() })));
        });
      } else {
        setUser(null);
        setTasks([]);
      }
    });
  }, []);

  const handleAddTask = () => {
    if (user) {
      const tasksRef = db.collection(`users/${user.uid}/tasks`);
      tasksRef.add({
        title: newTask,
        completed: false,
      });
      setNewTask('');
    }
  };

  const handleToggleCompleted = (task) => {
    if (user) {
      const taskRef = db.collection(`users/${user.uid}/tasks`).doc(task.id);
      taskRef.update({
        completed:!task.completed,
      });
    }
  };

  const handleDeleteTask = (task) => {
    if (user) {
      const taskRef = db.collection(`users/${user.uid}/tasks`).doc(task.id);
      taskRef.delete();
    }
  };

  return (
    <div>
      {user? (
        <div>
          <h1>Lista de Tarefas</h1>
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
          <button onClick={handleAddTask}>Adicionar</button>
        </div>
      ) : (
        <p>Faça login para acessar sua lista de tarefas</p>
      )}
    </div>
  );
}

export default App;