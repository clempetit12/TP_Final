import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./Component/HomePage";





const router = createBrowserRouter([
    {
        path: "/",
        element : <App />,
    },
    {
        path: "/homePage",
        element : <HomePage/>,
        // loader : () => authCheck("Admin"),
        children: [
          
          ],
    }

 
]);

export default router;