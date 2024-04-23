import { createBrowserRouter,redirect } from "react-router-dom";
import App from "./App";
import HomePage from "./Component/HomePage";
import ErrorPage from "./Component/ErrorPage";
import { accountService } from "./Service/accountService";
import CreateEmployeeForm from "./Employee/CreateEmployeeForm";
import Dashbord from "./Employee/Dashbord";


const authCheck = () => {
    if (accountService.isLogged()) {
      return true;
    } else {
      return redirect("/login");
    }
}

const router = createBrowserRouter([
    {
        path: "/login",
        element : <App />,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/",
        element : <HomePage/>,
        loader : () => authCheck(),
        children: [
            {
                path: "/dashboard",
                element:<Dashbord/>,
                loader : () => authCheck(),
            },
            {
              path: "/createEmployee",
              element:<CreateEmployeeForm/>,
              loader : () => authCheck(),
          },
          ],
    }

 
]);

export default router;