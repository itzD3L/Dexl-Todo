import { useParams } from "react-router";
import EditTodoForm from "./EditTodoForm";
import { useGetTodosQuery } from "./todoApiSlice";
import { SyncLoader } from "react-spinners";
import useTitle from "../../hooks/useTitle";


const EditTodo = () => {
    useTitle('Edit To-Do');

    const { id } = useParams();

    const { todo } = useGetTodosQuery("todosList", {
        selectFromResult: ({ data }) => ({
            todo: data?.entities[id? id : '']
        })
    })

    if(!todo) return <SyncLoader color="#36D7B7" loading={true} size={10} />

    const content = <EditTodoForm todos={todo} />

    return content
}

export default EditTodo
