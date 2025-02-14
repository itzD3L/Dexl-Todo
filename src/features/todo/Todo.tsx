import styles from './todo.module.css'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useState } from 'react';
//  RTK Query
import { useMarkTodoMutation, useGetTodosQuery, useDeleteTodoMutation } from './todoApiSlice';

import { ClipLoader } from 'react-spinners';
import { memo } from 'react';

const Todo = ({ todoId }: { todoId: any }) => {

    // RTK Query 
    const { todo } = useGetTodosQuery("todosList", {
        selectFromResult: ({ data }) => ({
            todo: data?.entities[todoId]
        })
    })

    const navigate = useNavigate();

    const [markTodo, {
        isLoading : markIsLoading
    }] = useMarkTodoMutation();

    const [deleteTodo, {
        isLoading : deleteIsLoading
    }] = useDeleteTodoMutation();

    if(todo) {
        const [handleCheckBox, setHandleCheckBox] = useState(todo.completed);

        const handleMark = async () => {
            const result = await markTodo({
                _id: todo.id,
                userId: "6795c331c5950a93ba2057ef"
            }).unwrap();

            if(result) setHandleCheckBox(!handleCheckBox);
        }

        const handleEdit = () => navigate(`${todo.id}/edit`);
        const handleDelete = async () => {
            await deleteTodo({
                _id: todo.id,
                userId: "6795c331c5950a93ba2057ef"
            }).unwrap();
        };
        
        return (
            <tr className={styles.todoContainer}>
                <td className={styles.todoCheckbox}>
                    {markIsLoading ? 
                        <ClipLoader loading={true} size={21} /> : 
                        <input type="checkbox" checked={Boolean(handleCheckBox)} onChange={handleMark}/>
                    }
                </td>
                <td className={styles.todoTitle} onClick={() => navigate(`${todo.id}`)}>
                    <p>{todo.title}</p>
                </td>
                <td className={styles.todoActions}>
                    { handleCheckBox ? 
                        null : 
                        <button onClick={handleEdit}><FaRegEdit /></button>
                    }
                    <button disabled={deleteIsLoading} onClick={handleDelete}>
                        {deleteIsLoading ? 
                            <ClipLoader loading={true} size={21} /> :
                            <MdDeleteOutline />
                        }
                    </button>
                </td>
            </tr>
        )
    } else return null;

}

const memorizedTodo = memo(Todo);

export default memorizedTodo