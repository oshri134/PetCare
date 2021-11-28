import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../redux/auth.reducer";

const LogOut = () => {
    const dispatch = useDispatch();
    const history = useNavigate()
    const [, , removeCookie] = useCookies([]);

    console.log("object")
    
    useEffect(() => {
        dispatch(logout())
        removeCookie('user-data')
        history('/Login')
    }, [])

    return (
        <div>
            <label>Logging you out ... reRouting ... </label>
        </div>
    )
}

export default LogOut