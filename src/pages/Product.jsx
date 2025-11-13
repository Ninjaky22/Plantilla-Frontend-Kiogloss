import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productService from '../services/productService';

const Product = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await productService.getProductBySlug(slug);
            setProduct(data);
        };
        fetchProduct();
    }, [slug]);

    return (
        <div className="pb-24">
            {/* breadcrumb */}
            <div className="container py-4 flex items-center gap-3">
                <Link to="/" className="text-[#610361] text-base">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <Link to="/shop" className="text-[#610361] text-base font-winkySans">
                    Catálogo
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-[#610361] font-winkySans">{product.title}</p>
            </div>
            {/* ./breadcrumb */}

            {/* product detail */}
            <div className="container grid grid-cols-2 gap-6">
                <div>
                    {product.images && product.images.length > 0 && (
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover"/>
                    )}
                    <div className="grid grid-cols-5 gap-4 mt-4 mb-10">
                        {product.images && product.images.slice(1, 6).map((img, index) => (
                            <img key={index} src={img} alt={`${product.title} ${index + 2}`} className="w-full h-20 object-cover cursor-pointer" />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-medium font-winkySans mb-2">{product.title}</h2>
                    <div className="space-y-2">
                        <p className="text-gray-800 font-semibold space-x-2 font-surfer">
                            <span>Disponibilidad: </span>
                            <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.stock > 0 ? 'En Stock' : 'Fuera de Stock'}</span>
                        </p>
                        <p className="space-x-2 font-surfer">
                            <span className="text-gray-800 font-semibold">Category: </span>
                            <span className="text-gray-600">{product.tags && product.tags.join(', ')}</span>
                        </p>
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2 font-pacifico mt-4">
                        <p className="text-xl text-[#610361] font-semibold">COP {product.price}</p>
                    </div>

                    {/* description moved to separate collapsible box below to preserve layout */}

                    <div className="pt-4">
                        <h3 className="text-sm text-gray-800 mb-1 font-winkySans">Size</h3>
                        <div className="flex items-center gap-2">
                            {product.sizes && product.sizes.map((size, index) => (
                                <div className="size-selector" key={index}>
                                    <input type="radio" name="size" id={`size-${size}`} className="hidden" />
                                    <label htmlFor={`size-${size}`}
                                        className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-[#610361] font-surfer">{size}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
                        <div className="flex items-center gap-2">
                            {product.colors && product.colors.map((color, index) => (
                                <div className="color-selector" key={index}>
                                    <input type="radio" name="color" id={`color-${color}`} className="hidden" />
                                    <label htmlFor={`color-${color}`}
                                        className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                        style={{ backgroundColor: color }}></label>
                                </div>
                            ))}
                        </div>
                    </div>

                    impl

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <a href="#"
                            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            <i className="fa-solid fa-bag-shopping"></i> Add to cart
                        </a>
                        <a href="#"
                            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                            <i className="fa-solid fa-heart"></i> Wishlist
                        </a>
                    </div>
                </div>
            </div>
            {/* ./product detail */}

            {/* description (separate collapsible box, outside the columns) */}
            <div className="container">
                <details className="product-details">
                    <summary>
                        <span>Descripción</span>
                        <span className="flex items-center">
                            <span className="toggle-plus mr-2">+</span>
                            <span className="toggle-minus">−</span>
                        </span>
                    </summary>
                    <div className="mt-4 text-gray-600">
                        <p>{product.description || 'No hay descripción para este producto.'}</p>
                    </div>
                </details>
            </div>
        </div>
    );
};

export default Product;
