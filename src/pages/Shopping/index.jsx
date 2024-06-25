import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";

export default function Shopping() {
  return (
    <Header title='Lista de Compras' path='/tasks' icon={faListCheck} />
  );
}