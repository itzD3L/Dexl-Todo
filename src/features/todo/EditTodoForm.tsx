import styles from './todo.module.css';
import { TiCancelOutline } from "react-icons/ti";
import { CiSaveDown2 } from "react-icons/ci";
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router';
// RTK Query
import { useEditTodoMutation } from './todoApiSlice';

interface todos {
    id: any,
    title?: string,
    task?: string
}

const EditTodoForm = ({todos} : {todos: todos}) => {

    const [editTodo, {
        isLoading,
        isSuccess
    }] = useEditTodoMutation();

    const navigate = useNavigate();

    const [ title, setTitle ] = useState(todos.title || '');
    const [validTitle, setValidTitle] = useState(true);
    const [ task, setTask ] = useState(todos.task || '');
    const [validTask, setValidTask] = useState(true);

    useEffect(() => {
        if(title.length > 0) {
            setValidTitle(true)
        } else {
            setValidTitle(false)
        }
    }, [title])

    useEffect(() => {
        if(task.length > 0) {
            setValidTask(true)
        } else {
            setValidTask(false)
        }
    }, [task])

    useEffect(() => {
        if(isSuccess) {
            setTitle('');
            setTask('');
            navigate(-1);
        }
    }, [isSuccess, navigate])

    const onTitleChange = (e: any) => setTitle(e.target.value);
    const onTaskChange = (e: any) => setTask(e.target.value);

    const canEdit = [validTitle, validTask].every(Boolean) && !isLoading;

    const onEditTodoClicked = async (e: React.FormEvent) => {
        e.preventDefault();

        if(canEdit) {
            await editTodo({
                _id: todos.id,
                title,
                task,
                userId: "6795c331c5950a93ba2057ef"
            })
        }
    }

    //const errClass = isError ? styles.errmgs : styles.offscreen; // will future be changed to reactjs-popup
    const validTitleClass = !validTitle ? styles.invalidInput : '';
    const validTaskClass = !validTask ? styles.invalidInput : '';

    const content = (
        <div className={styles.singleTodoContainer}>
            <div className={styles.singleTodoActionContainer}>
                <h2>Edit To-Do</h2>
                <div className={styles.singleTodoActions}>
                    <button onClick={() => navigate(-1)}>
                        <TiCancelOutline />
                    </button>
                    <button disabled={isLoading && !canEdit} onClick={onEditTodoClicked}>
                        {isLoading ? 
                            <ClipLoader loading={true} size={20}/> :
                            <CiSaveDown2 />
                        }
                    </button>
                </div>
                
            </div>
            <div className={styles.singleTodoTitleContainer}>
                <p>Title</p>
                <div className={`${styles.titleInputContainer} ${validTitleClass}`}>
                    <input type="text" value={title} onInput={onTitleChange}/>
                </div>
            </div>
            <div className={styles.singleTodoDescriptionContainer}>
                <p>Task</p>
                <div className={`${styles.descriptionInputContainer} ${validTaskClass}`}>
                    <textarea placeholder='Enter Task'value={task} onInput={onTaskChange}/>
                </div>
            </div>
        </div>
    )

    return content
}

export default EditTodoForm