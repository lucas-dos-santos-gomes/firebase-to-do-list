import { faCartShopping, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

import { auth, db } from '../../contexts/firebase';
import { deleteAllTasks } from '../../functions';

import Header from '../../components/Header/index';
import AddListItem from '../../components/AddListItem';
import * as S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <Header title="Lista de Tarefas" path='/shopping' icon={faCartShopping} />
      <S.Container>
        <S.Main>
          <AddListItem
            value={newTask} onChange={setNewTask} placeholder="Adicionar tarefa"
            onClick={handleAddTask} isLoading={isLoading}
          />
          <S.ListSection>
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
          </S.ListSection>
          <S.DeleteButton type='button' onClick={deleteAllTasks}>
            <FontAwesomeIcon icon={faTrashCan} size='xl' />
          </S.DeleteButton>
        </S.Main>
      </S.Container>
    </>
  );
}
