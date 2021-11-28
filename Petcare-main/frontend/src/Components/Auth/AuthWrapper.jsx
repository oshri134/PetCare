import { useSelector } from "react-redux"
import Login from "../../page/Login/Login";

const AuthWrapper = (props) => {
    const authState = useSelector(state => state.userData)
    if(!authState.isAuthenticated){
        return (
                <Login />
        )
    }
    return props.children
        
    
}

export default AuthWrapper
