import { Link, useNavigate } from 'react-router-dom';
import { useState} from 'react';
import api from '../services/api'
const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handlerLogIn = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        const userPayload = {
            password,
            email
        };
        const {data} = await api.post("/login", userPayload);
        console.log(data)
        localStorage.setItem("access", JSON.stringify(data.access))
        localStorage.setItem("refresh", JSON.stringify(data.refresh))
        navigate("/account")
    }

    return (
        <>
            {/* breadcrumb */}
            <div className="container py-4 flex items-center gap-3">
                <Link to="/" className="text-primary text-base">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">Login</p>
            </div>
            {/* ./breadcrumb */}

            {/* login */}
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        welcome back customer
                    </p>
                    <form action="#" method="post" autoComplete="off">
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                                <input type="email" name="email" id="email"
                                    value = {email}
                                    onChange = { (e) => setEmail(e.target.value) }
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="youremail.@domain.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                                <input type="password" name="password" id="password"
                                    value = {password}
                                    onChange = { (e) => setPassword(e.target.value)}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******" />
                            </div>
                        </div>
                       
                        <div className="mt-4">
                            <button type="submit"
                                onClick = { (e) => handlerLogIn(e) }
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Login</button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-gray-600">Don't have account? <Link to="/register"
                        className="text-primary">Register
                        now</Link></p>
                </div>
            </div>
            {/* ./login */}
        </>
    );
};

export default Login;
