import styles from './admin.module.css'
import { GrStatusGoodSmall } from "react-icons/gr";
import { useGetUsersQuery } from './adminApiSlice';
import { memo } from 'react'

const User = ({ userId} : { userId : any }) => {

    const { user } = useGetUsersQuery('userList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })
    let content;

    if(user) {


        content = (
            <tr className={styles.userContainer}>
                <td className={`${styles.userStatus} ${user.status ? styles.online : null}`} title={`Status: ${user.status ? 'Online' : 'Offline'}`}>
                    <GrStatusGoodSmall />
                </td>
                <td className={styles.userInfo}>
                    <p>{user?.username}</p>
                    <p>{user?.email}</p>
                </td>
                <td className={styles.verifyStatus}>
                    <p>
                        {
                            user?.isVerified ?
                            <span className={styles.verified}>Verified</span>
                            :
                            <span className={styles.unverified}>Unverified</span>
                        }
                    </p>             
                </td>
            </tr>
        )
    } else return null;

    return content
}

const memorizedUser = memo(User);

export default memorizedUser;