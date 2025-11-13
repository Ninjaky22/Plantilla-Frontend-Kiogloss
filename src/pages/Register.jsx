import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'
import {useState} from "react"

const Register = () => {

    const navegar = useNavigate()

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [street, setStreet] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [distric, setDistric] = useState("");

    const handlerSignUp = async (e) => {

        e.preventDefault();
        console.log(email);
        console.log(name);
        console.log(password);
        console.log(phoneNumber);
        console.log(street);
        console.log(streetNumber);
        console.log(distric);
        const createUserPayload = {
            email,
            name,
            password,
            phoneNumber,
            address: {
                street,
                streetNumber,
                distric
            },
            account: {
                pointsPerPurchase: 0,
                isActive: true
            }
        }
        const {data} = await api.post("/user/", createUserPayload)
        console.log(data);
        localStorage.setItem("access", JSON.stringify(data.access))
        localStorage.setItem("refresh", JSON.stringify(data.refresh))
        navegar("/account")
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
                <p className="text-gray-600 font-medium">Register</p>
            </div>
            {/* ./breadcrumb */}

            {/* register */}
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">Crear una Cuenta</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Registrate aquí!
                    </p>
                    <form action="#" method="post" autoComplete="off">
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="email" className="text-gray-600 mb-2 block">Email</label>
                                <input type="email" name="email" id="email"
                                    value = {email}
                                    onChange = { (e) => setEmail(e.target.value) }
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="youremail@domain.com" />
                            </div>
                            <div>
                                <label htmlFor="name" className="text-gray-600 mb-2 block">Nombre Completo</label>
                                <input type="text" name="name" id="name"
                                    value = {name}
                                    onChange = { (e) => setName(e.target.value) }
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Sergio Castro" />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-gray-600 mb-2 block">Contraseña</label>
                                <input type="password" name="password" id="password"
                                    value = {password}
                                    onChange = { (e) => setPassword(e.target.value) }
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******" />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="text-gray-600 mb-2 block">Numero Telefonico</label>
                                <input type="tel" name="phoneNumber" id="phoneNumber"
                                    value = {phoneNumber}
                                    onChange = { (e) => setPhoneNumber(e.target.value) }
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******" />
                            </div>
                            <div>
                                <label htmlFor="street" className="text-gray-600 mb-2 block">Calle</label>
                                <input type="text" name="street" id="street"
                                    value = {street}
                                    onChange = { (e) => setStreet(e.target.value) }
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Calle 19a" />
                            </div>
                            <div>
                                <label htmlFor="streetNumber" className="text-gray-600 mb-2 block">Dirección</label>
                                <input type="text" name="dirección" id="dirección"
                                    value = {streetNumber}
                                    onChange = { (e) => setStreetNumber(e.target.value) }
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="#39-17" />
                            </div>
                            <div>
                                <label htmlFor="distric" className="text-gray-600 mb-2 block">Barrio</label>
                                <input type="text" name="barrio" id="barrio"
                                    value = {distric}
                                    onChange = { (e) => setDistric(e.target.value) }
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="Oriente" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit"
                                onClick = { (e) => handlerSignUp(e) }
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                                    Crear Cuenta
                                </button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-gray-600">Ya tienes una cuenta? <Link to="/login"
                        className="text-primary">Iniciar Sesión
                        </Link></p>
                </div>
            </div>
            {/* ./register */}
        </>
    );
};

export default Register;
