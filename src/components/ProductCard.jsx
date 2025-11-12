import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // Valores por defecto si no vienen del backend
    const {
        id,
        name = 'Producto',
        price = 0,
        discountPrice,
        images = [],
        rating = 0,
        reviews = 0
    } = product || {};

    // Obtener la primera imagen o usar una por defecto
    const productImage = images && images.length > 0 
        ? images[0].url || images[0].imageUrl 
        : '/assets/images/products/product1.jpg';

    // Calcular precio original si hay descuento
    const displayPrice = discountPrice || price;
    const hasDiscount = discountPrice && discountPrice < price;

    return (
        <div className="bg-white shadow rounded overflow-hidden group">
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
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link to={`/product/${id}`}
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="Ver producto">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <button
                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                        title="Agregar a lista de deseados">
                        <i className="fa-solid fa-heart"></i>
                    </button>
                </div>
            </div>
            <div className="pt-4 pb-3 px-4">
                <Link to={`/product/${id}`}>
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition line-clamp-2">
                        {name}
                    </h4>
                </Link>
                <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">
                        ${displayPrice.toFixed(2)}
                    </p>
                    {hasDiscount && (
                        <p className="text-sm text-gray-400 line-through">
                            ${price.toFixed(2)}
                        </p>
                    )}
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>
                                <i className={`fa-solid fa-star ${i < Math.floor(rating) ? '' : 'text-gray-300'}`}></i>
                            </span>
                        ))}
                    </div>
                    <div className="text-xs text-gray-500 ml-3">({reviews || 0})</div>
                </div>
            </div>
            <button
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;
