import styles from './todo.module.css'
import { TiCancelOutline } from "react-icons/ti";
import { CiSaveDown2 } from "react-icons/ci";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';

// RTK Query
import { useAddNewTodoMutation } from './todoApiSlice';

const NewTodo = () => {
    useTitle('Create To-Do');

    const navigate = useNavigate();
    
    const [addNewTodo, {
        isLoading,
        isSuccess
    }] = useAddNewTodoMutation();

    const [ title, setTitle ] = useState('');
    const [validTitle, setValidTitle] = useState(true);
    const [ task, setTask ] = useState('');
    const [validTask, setValidTask] = useState(true);
    const [newTodoId, setNewTodoId] = useState('');

    useEffect(() => {
        if(isSuccess) {
            setTitle('');
            setTask('');
            navigate(`/user/${newTodoId}`);
        }
    }, [navigate, isSuccess])

    const onTitleChange = (e: any) => {
        e.preventDefault();
        const newValue = e.currentTarget.value;
        setTitle(newValue);

        if(newValue.length === 0) {
            setValidTitle(false)
        } else {
            setValidTitle(true)
        }
    }

    const onTaskChange = (e: any) => {
        e.preventDefault();
        const newValue = e.currentTarget.value;
        setTask(newValue);

        if(newValue.length === 0) {
            setValidTask(false)
        } else {
            setValidTask(true)
        }
    }

    const canCreate = [validTitle, validTask].every(Boolean) && !isLoading;

    const onCreateTodoClicked = async (e: React.FormEvent) => {
        e.preventDefault();

        if(title.length === 0) setValidTitle(false);
        if(task.length === 0) setValidTask(false);

        if(canCreate && title.length > 0 && task.length > 0) {
            const result = await addNewTodo({
                userId: "6795c331c5950a93ba2057ef",
                title,
                task
            }).unwrap();

            setNewTodoId(result._id);
        }
    }

    //const errClass = isError ? styles.errmgs : styles.offscreen; // will future be changed to reactjs-popup
    const validTitleClass = !validTitle ? styles.invalidInput : '';
    const validTaskClass = !validTask ? styles.invalidInput : '';

    const content = (
        <div className={styles.singleTodoContainer}>
            <div className={styles.singleTodoActionContainer}>
                <h2>Create To-Do</h2>
                <div className={styles.singleTodoActions}>
                    <button onClick={() => navigate(-1)}>
                        <TiCancelOutline />
                    </button>
                    <button onClick={onCreateTodoClicked} disabled={!canCreate}>
                        {
                            isLoading ? <ClipLoader loading={true} size={21}/> : <CiSaveDown2 />
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

export default NewTodo
