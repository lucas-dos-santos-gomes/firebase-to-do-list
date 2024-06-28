import { faCartShopping, faCheck, faPlus, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';

import { auth, db } from '../../contexts/firebase';
import { deleteAllTasks } from '../../functions';

import Header from '../../components/Header/index';
import AddListItem from '../../components/AddListItem';
import * as S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../../contexts/theme';

export default function Tasks() {
  const { theme } = useContext(ThemeContext);
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

  const handleAddTask = async(e) => {
    e.preventDefault();
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
            onSubmit={handleAddTask} isLoading={isLoading}
          />
          <S.ListSection theme={theme}>
            <ul>
              {!!tasks.length ? tasks.map((task) => (
                <S.ListItem key={task.id} theme={theme} completed={String(task.completed)}>
                  <input
                    id={`checkbox-${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task)}
                  />
                  <label htmlFor={`checkbox-${task.id}`}>
                    {task.completed && <FontAwesomeIcon icon={faCheck} size='xl' />}
                  </label>
                  <input type='text' value={task.title} readOnly />
                  {/* <button onClick={() => handleEditTask(task)}>Editar</button> */}
                  <button onClick={() => handleDeleteTask(task)}>
                    <FontAwesomeIcon icon={faTrash} size='xl' />
                  </button>
                </S.ListItem>
              )) : (<li>Nenhum item localizado na lista</li>)}
            </ul>
          </S.ListSection>
          <S.DeleteButton title='Apagar tudo' type='button' onClick={deleteAllTasks} visibility={String(!tasks.length)}>
            <FontAwesomeIcon icon={faTrashCan} size='xl' />
          </S.DeleteButton>
        </S.Main>
      </S.Container>
    </>
  );
}
