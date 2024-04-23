import styles from "./HomePage.module.css";
import { NavLink, Outlet, useNavigate} from "react-router-dom";
import { accountService } from "../Service/accountService";


const HomePage = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        accountService.logout();
        navigate('/login')
    };
    return (
       <>
            <header className={styles.header} >
                <div className={styles.divLogout}>
                    <button className={styles.logout} onClick={handleLogout}>Logout</button>
                </div>
                
            </header>
            <main className={styles.main}>
                <section className={styles.sectionOne}>
                    <nav className={styles.nav}>
                        <img src="" alt=""></img>
                        <ul>
                            <li> <NavLink className={styles.a} to={`/dashboard`}> HomePage</NavLink></li>
                            <li> <NavLink className={styles.a} to={`/createEmployee`}> Create employe</NavLink></li>
                        </ul>
                    </nav>
                </section>
                <section className={styles.sectionTwo}><Outlet/></section>
            </main>
       </>
    );
}

export default HomePage