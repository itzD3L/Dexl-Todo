import emptyTodo from '../../assets/no-task.png'
import styles from './Todo.module.css'
import { useNavigate } from 'react-router'

const EmptyTodo = () => {
    const navigate = useNavigate();

    const content = (
        <tr className={styles.emptyTodoContainer}>
            <td className={styles.emptyTodoContent}>
                <img src={emptyTodo} alt="No Task" />
                <h2>There is no pending to-do</h2>
                <button className={styles.dashMainAddButton} onClick={() => navigate('newtodo')}>
                        Create New To-Do
                </button>
            </td>
        </tr>
    )

    return content
}

export default EmptyTodo
