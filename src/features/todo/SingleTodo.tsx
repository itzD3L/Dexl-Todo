import styles from './todo.module.css'
import { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useParams, useNavigate } from 'react-router';
import { format } from 'date-fns';
import { ClipLoader } from "react-spinners";
// RTK Query
import { useGetTodosQuery, useMarkTodoMutation, useDeleteTodoMutation } from './todoApiSlice';
import LoadingState from '../../components/LoadingState';

const SingleTodo = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // RTK Query
    const { todo } = useGetTodosQuery("todosList", {
            selectFromResult: ({ data }) => ({
                todo: data?.entities[id? id : '']
            })
    })
    
    const [handleCheckBox, setHandleCheckBox] = useState(todo?.completed ?? false);
    useEffect(() =>{
            setHandleCheckBox(todo?.completed);
    }, [todo])

    const [markTodo, {
        isLoading : markIsLoading
    }] = useMarkTodoMutation();

    const [deleteTodo, {
        isLoading : deleteIsLoading
    }] = useDeleteTodoMutation();
    
    if(!todo) return <LoadingState />

    const handleMark = async () => {
        const result = await markTodo({
            _id: todo.id,
            userId: "6795c331c5950a93ba2057ef"
        }).unwrap();
        
        if(result) setHandleCheckBox(!handleCheckBox);
    }

    const handleDelete = async () => {
        const result = await deleteTodo({
            _id: todo.id,
            userId: "6795c331c5950a93ba2057ef"
        }).unwrap();

        if(result) navigate('/user');
    };
    
    const status = todo.completed ? <span className={styles.statusCompleted}>Completed</span> : <span className={styles.statusOngoing}>Ongoing</span>;

    return (
        <div className={styles.singleTodoContainer}>
            <div className={styles.singleTodoActionContainer}>
                <div className={styles.singleTodoActionContainer_left}>
                    <h2>To-Do</h2>
                    {markIsLoading ? 
                        <ClipLoader loading={true} size={30} /> : 
                        <input type="checkbox" checked={Boolean(handleCheckBox)} onChange={handleMark}/>
                    }
                </div>
                <div className={styles.singleTodoActions}>
                    {handleCheckBox ?
                        null :
                        <button onClick={() => navigate('edit')}>
                            <FaRegEdit />
                        </button>
                    }
                    <button onClick={handleDelete} disabled={deleteIsLoading}>
                        {deleteIsLoading ?
                            <ClipLoader loading={true} size={21} /> :
                            <MdDeleteOutline />
                        }
                    </button>
                </div>
                
            </div>
            <div className={styles.singleTodoTitleContainer}>
                <p>Title</p>
                <div>
                    <p>{todo.title}</p>
                </div>
            </div>
            <div className={styles.singleTodoDescriptionContainer}>
                <p>Task</p>
                <div>
                    <p>
                        {todo.task}
                    </p>
                </div>
            </div>
            <div className={styles.singleTodoStatusContainer}>
                <p>Status : {status}</p>
                <div>
                    <p>Date Created: <span className={styles.dateSpan}>{format(new Date(todo.createdAt), "MM/dd/yyyy h:mm a")}</span></p>
                    <p>Date Completed: {todo.dateCompleted ? <span className={styles.dateSpan}>{format(new Date(todo.dateCompleted), "MM/dd/yyyy h:mm a")}</span>: ''}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleTodo
