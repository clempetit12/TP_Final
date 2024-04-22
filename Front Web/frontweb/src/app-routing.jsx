import { createBrowserRouter,redirect } from "react-router-dom";
import App from "./App";
import HomePage from "./Component/HomePage";
import ErrorPage from "./Component/ErrorPage";


const authCheck = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    } else {
      return redirect("/");
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element : <App />,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/homePage",
        element : <HomePage/>,
        loader : () => authCheck(),
        children: [
            {

            }
          ],
    }

 
]);

export default router;