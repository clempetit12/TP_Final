import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from "./Component/Header";
import Navbar from './Component/Navbar';

function App() {
    return(
        <div className={App}>
            <Header> </Header>
            <Navbar></Navbar>

        </div>
    )
}

export default App;
