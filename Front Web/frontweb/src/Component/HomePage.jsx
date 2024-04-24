import styles from "./HomePage.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { accountService } from "../Service/accountService";
import logo from "../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';


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
                <form class="d-flex mr-4" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
                    
                    <button className="btn btn-outline-light mr-2" onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <main className={styles.main}>
                <section className={styles.sectionOne}>
                    <nav className={styles.nav}>
                        <div className="d-flex flex-column align-items-center mb-3">
                            <img src={logo} alt="Logo"    className="img-fluid rounded-circle mr-3 mb-5"
      style={{ width: "100px", height: "100px" }}/>
                            <ul className="list-unstyled ">
                            <li><NavLink className="nav-link mb-5 font-italic fw-bold  " activeClassName="active" to="/dashboard"><i class="bi bi-house-gear"></i> HomePage</NavLink></li>
            <li><NavLink className="nav-link font-italic fw-bold" activeClassName="active" to="/createEmployee"><i class="bi bi-person-add"></i> Create Employee</NavLink></li>
                            </ul>
                        </div>
                    </nav>
                </section>
                <section className={styles.sectionTwo}><Outlet/></section>
            </main>
       </>
    );
}

export default HomePage;
