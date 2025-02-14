import styles from './todo.module.css'
import Todo from './Todo'
import EmptyTodo from './EmptyTodo'
import { useNavigate } from 'react-router'
// RTK Query
import { useGetTodosQuery } from './todoApiSlice'
import LoadingState from '../../components/LoadingState'
import useTitle from '../../hooks/useTitle'

const TodosList = () => {
    useTitle('Dexl To-Do');

    // RTK Query
    const { 
        data: todos,
        isLoading, 
        isSuccess, 
        isError, 
        error } = useGetTodosQuery('todosList', {
            pollingInterval: 15000,
            refetchOnFocus: false,
            refetchOnMountOrArgChange: false,
            refetchOnReconnect: true,
        });

    const navigate = useNavigate();

    let content;

    if(isLoading) content = <LoadingState />

    if(isError) {
        content = (
            <p className={isError ? styles.errmgs : styles.offscreen}>
                {(error as { data: { message: string } }).data?.message}
            </p>
        )
    } // provide a better error UI

    if(isSuccess) {
        const { ids } = todos;
        const tableContent = ids.length ? 
            ids.map((todoId: any) => <Todo key={todoId} todoId={todoId}/>) 
            : <EmptyTodo />;

        content = (
            <>
            <div className={styles.dashMainAddContainer}>
                    <button className={styles.dashMainAddButton} onClick={() => navigate('newtodo')}>
                        Create New To-Do
                    </button>
            </div>
            <table className={styles.todoTableContainer}>
                <tbody className={styles.todoTableBody}>
                    {tableContent}
                </tbody>
            </table>
            </>
            
        )
    }
    

    return content
}

export default TodosList
