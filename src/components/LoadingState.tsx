import styles from './components.module.css'

const LoadingState = () => {
    return (
        <div className={styles.contentLoadingContainer}>
            <span className={styles.contentLoader}></span>
        </div>
    )
}

export default LoadingState