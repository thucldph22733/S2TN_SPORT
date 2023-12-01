import { useContext } from "react";
import AuthContext from "../components/AuthContext";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;