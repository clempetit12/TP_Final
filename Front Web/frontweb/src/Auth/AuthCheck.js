import { redirect } from "react-router-dom";

const AuthCheck = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return true;
  } else {
    return redirect("/");
  }
};
export default AuthCheck;
