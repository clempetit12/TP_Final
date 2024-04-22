import { createBrowserRouter,redirect } from "react-router-dom";
import App from "./App";
import HomePage from "./Component/HomePage";
import ErrorPage from "./Component/ErrorPage";
import { accountService } from "./Service/accountService";


const authCheck = () => {
    if (accountService.isLogged()) {
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