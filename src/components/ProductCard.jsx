import { Link } from 'react-router-dom';
import api from '../services/api';
import Account from '../pages/Account';
import { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
    const [favorited, setFavorited] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect ( () => {

        localStorage.setItem("products", JSON.stringify([]))

    }, [] )


    const addCarrito = () => {
        products.find( (p) => {
            
            p.id === p.

        } )
        setProducts([...products, product])
        localStorage.setItem("products", JSON.stringify(products))

    } 

    // Valores por defecto si no vienen del backend
    const {
        slug = product.slug,
        name = product?.title || 'Producto sin nombre',
        price = product.price,
        discountPrice,
        image = product?.image,
        rating = 0,
        reviews = 0
    } = product || {};

    // Obtener la primera imagen o usar una por defecto
    const productImage = image || '/assets/images/products/product1.jpg';

    // Calcular precio original si hay descuento
    const displayPrice = discountPrice || price;
    const hasDiscount = discountPrice && discountPrice < price;

    const handleAddToFavorites = async (product) => {
        // Lógica para agregar a favoritos
        console.log('Agregar a favoritos:', product);
        const data = await api.post(`/user/favorite`, { product: product.id, account: 1  });
        console.log('Respuesta de favoritos:', data);
        
            if (data.status === 201) {
                setFavorited(true);
            }
         else {
            console.error('Error al agregar a favoritos');
        }
    }

    return (
        <div className="bg-white shadow rounded-xl overflow-hidden group">
            <div className="relative">
                <img 
                    src={productImage}  
                    alt={name} 
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/products/product1.jpg';
                    }}
                />
                <div className="absolute inset-0 bg-black/40  flex items-center 
                justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link to={`/product/${slug}`}
                        className="text-[#7C86FF] text-lg w-10 h-10 rounded-full bg-[#f3d5ff] flex items-center justify-center hover:bg-[#f8aef8] hover:text-[#615FFF] hover:scale-110 transition"
                        title="Ver producto">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <button
                        className={`text-[#7C86FF] text-lg w-10 h-10 rounded-full bg-[#f3d5ff] flex items-center justify-center hover:bg-[#f8aef8] hover:text-[#615FFF] hover:scale-110 transition-all duration-330 ${favorited ? "text-red-500 hover:text-red-700 transition-all" : ""}`}
                        onClick={()=>handleAddToFavorites(product)}
                        title="Agregar a lista de deseados">
                        <i className="fa-solid fa-heart"></i>
                    </button>
                </div>
            </div>
            <div className="pt-4 pb-3 px-4 bg-linear-to-b from-[#e091ff] to-[#f3d5ff] border border-[#f3d5ff] rounded-1xl">
                <Link to={`/product/${slug}`}>
                    <h4 className="font-medium text-xl mb-2 text-[#610361] text-center transition line-clamp-2 font-winkySans">
                        {name}
                    </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2 justify-center">
                    <p className="text-xl text-[#610361] font-semibold">
                        COP {displayPrice}
                    </p>
                    {hasDiscount && (
                        <p className="text-sm text-gray-400 line-through">
                            COP {price}
                        </p>
                    )}
                </div>
            </div>
            <button
                onClick={ () => {addCarrito()}}
                className="block w-full py-1 text-center text-[#610361] bg-linear-to-b from-[#e6affc] to-[#f3d5ff] border border-[#f3d5ff] rounded-1xl hover:bg-transparent hover:text-primary transition">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;
