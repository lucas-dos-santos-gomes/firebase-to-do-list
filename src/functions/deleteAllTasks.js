import { db } from "../contexts/firebase";

export const deleteAllTasks = () => {
  const tasksRef = db.collection('tasks');
  tasksRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
    });
  });
}