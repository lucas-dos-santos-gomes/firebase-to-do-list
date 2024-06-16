import { auth, db } from "../contexts/firebase";

export const deleteAllTasks = async() => {
  const tasksRef = db.collection(`users/${auth.currentUser.uid}/tasks`);
  const allTasks = await tasksRef.get();
  allTasks.docs.map(e => tasksRef.doc(e.id).delete());
}