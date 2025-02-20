import styles from './admin.module.css'
import useTitle from '../../hooks/useTitle'
import User from './User'
import { useGetUsersQuery } from './adminApiSlice'
import LoadingState from '../../components/LoadingState'

const UserList = () => {
    useTitle('Dexl To-Do Admin');

    const {
        data: users,
        isLoading,
        isSuccess,
        isError
    } = useGetUsersQuery('userList', {
        pollingInterval: 15000,
        refetchOnFocus: false,
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: true,
    })

    let content;

    if(isLoading) content = <LoadingState />
    if(isError) content = null
    if(isSuccess) {
        const { ids } = users;
        
        const tableContent = ids.length ?
            ids.map((userId : any) => <User key={userId} userId={userId}/>)
            : null;
            
        content = (
            <>  
                <table className={styles.userTableContainer}>
                    <tbody className={styles.userTableBody}>
                        {tableContent}
                    </tbody>
                </table>
                
            </>
        )
    }
    return  content
}

export default UserList
