import styles from "./components.module.css";
import { Link } from "react-router";
import { FaGithubSquare } from "react-icons/fa";


const Public = () => {

    const content = (
        <section className={styles.public}>
            <header>
                <h1>Welcome to <span className={styles.public__h1}>Dexl's To-do</span></h1>
            </header>
            <main className={styles.public__main}>
                <p>This is a practice website for learning and experimenting with web development.</p>
                <p>It was built using the <span>MERN</span> stack (MongoDB🗄️, Express.js🚀, React⚛️, and Node.js🖥️).</p>
                <p>The website includes features such as user authentication, a CRUD system for managing tasks, and a responsive design for better user experience.</p>
            </main>
            <footer className={styles.public__footer}>
                <Link to='/login'>Get started</Link>
                <a href="https://github.com/itzD3L">My Github <FaGithubSquare /></a>
            </footer>
        </section>
    )

    return content
}

export default Public