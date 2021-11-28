import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import App from './App'
import AuthWrapper from "./Components/Auth/AuthWrapper"
import Home from './page/Home/Home';
import Signup from "./page/Signup/Signup";
import Login from "./page/Login/Login";
import About from "./Components/AboutAs/About"
import Contact from "./page/Contact/Contact";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "./redux/auth.reducer";

export const AppWrapper = () => {
    const [cookies] = useCookies([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cookies["user-data"]) {
            dispatch(login(cookies["user-data"]));
        }
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/" exact element={<Home />} />
                <Route path="/About" exact element={<About />} />
                <Route path="/Contact" exact element={<Contact />} />
                <Route
                    path="*"
                    element={
                        <AuthWrapper>
                            <App />
                        </AuthWrapper>
                    }
                />
            </Routes>
        </Router>
    )
}
export default AppWrapper;