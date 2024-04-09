import { Navigate } from "react-router-dom";
const RequireAuth = ({children}) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(!user){
        return <Navigate to="/" />;
    }

  return children
}

export default RequireAuth