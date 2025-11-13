import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            {/* header */}
            <header className="py-4 shadow-sm bg-[#e6affc]">
                <div className="container flex items-center justify-between">
                    <Link to="/">
                        <img src="/assets/images/logo.png" alt="Logo" className="w-48" />
                    </Link>

                    <div className="w-full max-w-xl relative flex">
                        <span className="absolute left-4 top-3 text-lg text-[#610361]">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input type="text" name="search" id="search"
                            className="w-full border border-[#e6affc] border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex font-winkySans"
                            placeholder="Buscar productos" />
                        <button
                            className="bg-[#610361] text-white px-8 rounded-r-xl md:flex items-center cursor-pointer font-swash">Buscar</button> 
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/wishlist" className="text-center text-[#610361] hover:text-white transition relative font-swash">
                            <div className="text-2xl">
                                <i className="fa-regular fa-heart"></i>
                            </div>
                            <div className="text-xs leading-3">Lista de Deseados</div>
                            <div
                                className="absolute right-7 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-[#610361] text-[#e6affc] text-xs">
                                8</div>
                        </Link>
                        <Link to="cart" className="text-center text-[#610361] hover:text-white transition relative font-swash">
                            <div className="text-2xl">
                                <i className="fa-solid fa-bag-shopping"></i>
                            </div>
                            <div className="text-xs leading-3">Carrito</div>
                            <div
                                className="absolute -right-1 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-[#610361] text-[#e6affc] text-xs">
                                2</div>
                        </Link>
                        <Link to="/account" className="text-center text-[#610361] hover:text-white transition relative font-swash">
                            <div className="text-2xl">
                                <i className="fa-regular fa-user"></i>
                            </div>
                            <div className="text-xs leading-3">Cuenta</div>
                        </Link>
                    </div>
                </div>
            </header>
            {/* ./header */}

            {/* navbar */}
            <nav className="bg-linear-to-b from-[#e6affc] to-[#f3d5ff]">
                <div className="container flex">
                    <div className="flex items-center justify-between grow md:pl-12 py-5 text-xl">
                        <div className="flex items-center space-x-6 capitalize">
                            <Link to="/" className="text-[#7C86FF] hover:text-[#615FFF] hover:-translate-y-1 transition-transform duration-300 font-swash">Inicio</Link>
                            <Link to="/shop" className="text-[#7C86FF] hover:text-[#615FFF] hover:-translate-y-1 transition-transform duration-300 font-swash">Productos</Link>
                            <Link to="/about" className="text-[#7C86FF] hover:text-[#615FFF] hover:-translate-y-1 transition-transform duration-300 font-swash">Sobre Nosotros</Link>
                            <Link to="/contact" className="text-[#7C86FF] hover:text-[#615FFF] hover:-translate-y-1 transition-transform duration-300 font-swash">Contáctanos</Link>
                        </div>
                        {!(localStorage.getItem('access') || localStorage.getItem('accessToken')) && (
                            <Link to="/login" className="text-[#7C86FF] hover:text-[#615FFF] hover:-translate-y-1 transition-transform duration-300 font-swash">Iniciar Sesión</Link>
                        )}
                    </div>
                </div>
            </nav>
            {/* ./navbar */}
        </>
    );
};

export default Header;
