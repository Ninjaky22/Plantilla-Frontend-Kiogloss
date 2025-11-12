import ProductCard from '../components/ProductCard';

const Home = () => {
    return (
        <div className="bg-[#e6affc]">
            {/* banner */}
            <div className="bg-cover bg-no-repeat bg-center py-36" style={{ backgroundImage: "url('/assets/images/banner-bg.jpeg')" }}>
                <div className="container">
                    <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                        Las mejores colecciones <br /> de Belleza
                    </h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam <br />
                        accusantium perspiciatis, sapiente
                        magni eos dolorum ex quos dolores odio</p>
                    <div className="mt-12">
                        <a href="shop" className="bg-[#610361] border border-[#e6affc] text-white hover:-translate-y-1 transition-transform duration-300 px-8 py-3 font-medium 
                    rounded-md">Compra Ahora</a>
                    </div>
                </div>
            </div>
            {/* ./banner */}

            {/* features */}
            <div className="container py-16">
                <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
                    <div className="border border-[#ebbaff] bg-[#ebbaff] bg-linear-to-b from-[#ebbaff] to-[#f3d5ff] rounded-lg px-3 py-6 flex justify-center items-center gap-5">
                        <img src="/assets/images/icons/delivery-van.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                        <div>
                            <h4 className="font-medium capitalize text-lg">Envíos a todo el país</h4>
                        </div>
                    </div>
                    <div className="border border-[#ebbaff] bg-[#ebbaff] bg-linear-to-b from-[#ebbaff] to-[#f3d5ff] rounded-lg px-3 py-6 flex justify-center items-center gap-5">
                        <img src="/assets/images/icons/money-back.svg" alt="Delivery" className="w-12 h-12 object-contain" />
                        <div>
                            <h4 className="font-medium capitalize text-lg">Reembolso</h4>
                            <p className="text-gray-500 text-sm">30 días de devolución de dinero</p>
                        </div>
                    </div>
                    <div className="border border-[#ebbaff] bg-[#ebbaff] bg-linear-to-b from-[#ebbaff] to-[#f3d5ff] rounded-lg px-3 py-6 flex justify-center items-center gap-5">
                        <img src="/assets/images/icons/service-hours.svg" alt="Delivery" className="w-12 h-12 object-contain" />
                        <div>
                            <h4 className="font-medium capitalize text-lg text-[#610361]">Soporte 24/7</h4>
                            <p className="text-gray-500 text-sm">Atención al cliente</p> 
                        </div>
                    </div>
                </div>
            </div>
            {/* ./features */}

            {/* categories */}
            <div className="container py-16">
                <h2 className="text-2xl font-medium text-[#615FFF] uppercase mb-6 font-pacifico">Comprar por categoria</h2>
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative rounded-sm overflow-hidden group">
                        <img src="/assets/images/category/category-1.jpg" alt="category 1" className="w-full h-full" />
                        <a href="#"
                            className="absolute inset-0 bg-black/30 hover:bg-black/60  flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Cuidado Facial</a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <img src="/assets/images/category/category-2.jpg" alt="category 1" className="w-full h-full" />
                        <a href="#"
                            className="absolute inset-0 bg-black/30 hover:bg-black/60 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Maquillaje</a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <img src="/assets/images/category/category-3.jpg" alt="category 1" className="w-full h-full" />
                        <a href="#"
                            className="absolute inset-0 bg-black/30 hover:bg-black/60 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Desmaquillantes
                        </a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <img src="/assets/images/category/category-4.jpg" alt="category 1" className="w-full h-full" />
                        <a href="#"
                            className="absolute inset-0 bg-black/30 hover:bg-black/60 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Tónicos</a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <img src="/assets/images/category/category-5.jpg" alt="category 1" className="w-full h-full" />
                        <a href="#"
                            className="absolute inset-0 bg-black/30 hover:bg-black/60 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Cuidado Capilar
                        </a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <img src="/assets/images/category/category-6.jpg" alt="category 1" className="w-full h-full" />
                        <a href="#"
                            className="absolute inset-0 bg-black/30 hover:bg-black/60 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Brochas</a>
                    </div>
                </div>
            </div>
            {/* ./categories */}

            {/* new arrival }
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <ProductCard productId={1} title="Guyer Chair" />
                    <ProductCard productId={4} title="Bed King Size" />
                    <ProductCard productId={2} title="Couple Sofa" />
                    <ProductCard productId={3} title="Mattrass X" />
                </div>
            </div>
            {/* ./new arrival */}

            {/* ads }
            <div className="container pb-16">
                <a href="#">
                    <img src="/assets/images/offer.jpg" alt="ads" className="w-full" />
                </a>
            </div>
            {/* ./ads */}

            {/* product }
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">recomended for you</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { id: 1, title: 'Guyer Chair' },
                        { id: 4, title: 'Bed King Size' },
                        { id: 2, title: 'Couple Sofa' },
                        { id: 3, title: 'Mattrass X' },
                        { id: 1, title: 'Guyer Chair' },
                        { id: 4, title: 'Bed King Size' },
                        { id: 2, title: 'Couple Sofa' },
                        { id: 3, title: 'Mattrass X' }
                    ].map((product, index) => (
                        <ProductCard key={index} productId={product.id} title={product.title} />
                    ))}
                </div>
            </div>
            {/* ./product */}
        </div>
    );
};

export default Home;
