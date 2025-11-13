import { Link } from 'react-router-dom';
import api from '../services/api';
import Account from '../pages/Account';
import { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
    const [favorited, setFavorited] = useState(false);
    const [select, setSelect] = useState(1); // cantidad seleccionada (select)


    

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

    // Obtener stock (siempre entero)
    const stock = Number(product?.stock ?? product?.stock ?? 1) || 0;

    // Parseo seguro de precio (price puede venir como string desde el backend)
    const parsePrice = (p) => {
        if (p == null) return 0;
        if (typeof p === 'number') return p;
        // Eliminar todo lo que no sea dígito, punto o coma y luego unificar coma a punto
        const cleaned = String(p).replace(/[^0-9,\.\-]/g, '');
        // Si contiene coma y punto, asumimos formato US (coma como separador de miles) -> eliminar comas
        if (cleaned.indexOf(',') > -1 && cleaned.indexOf('.') > -1) {
            return Number(cleaned.replace(/,/g, '')) || 0;
        }
        // Reemplazar coma por punto y parsear
        return Number(cleaned.replace(/,/g, '.')) || 0;
    }

    const unitPrice = parsePrice(displayPrice);

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

    // Añadir al carrito persistente en localStorage (key: 'products')
    const addCarrito = () => {
        try {
            const key = 'products';
            const raw = localStorage.getItem(key);
            const items = raw ? JSON.parse(raw) : [];

            const productId = product?.id ?? product?.productId ?? null;
            if (!productId) {
                console.error('Producto sin id, no se puede agregar al carrito');
                return;
            }

            const existingIndex = items.findIndex(i => Number(i.productId) === Number(productId));

            if (existingIndex === -1) {
                // Nuevo item
                const qty = Math.max(1, Math.min(select, stock));
                const newItem = {
                    productId: Number(productId),
                    title: name,
                    price: Number(unitPrice),
                    quantity: qty,
                    stock: Number(stock),
                    image: productImage,
                    subtotal: Number((unitPrice * qty).toFixed(2))
                };
                items.push(newItem);
            } else {
                // Actualizar cantidad (sumar y cap por stock)
                const exist = items[existingIndex];
                const desired = exist.quantity + Number(select);
                const newQty = Math.min(desired, Number(stock));
                items[existingIndex] = {
                    ...exist,
                    quantity: newQty,
                    subtotal: Number((exist.price * newQty).toFixed(2))
                };
            }

            localStorage.setItem(key, JSON.stringify(items));
            // Notificar a otros componentes en la misma pestaña
            window.dispatchEvent(new Event('cart_updated'));
            console.debug('Carrito actualizado:', items);
        } catch (e) {
            console.error('Error al agregar al carrito:', e);
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
                {/* Selector de cantidad (select) */}
                <div className="flex items-center justify-center gap-2 mt-3">
                    <button
                        onClick={() => setSelect(s => Math.max(1, s - 1))}
                        className="px-3 py-1 bg-white rounded-md shadow-sm hover:bg-gray-100"
                        aria-label="Disminuir cantidad"
                        disabled={select <= 1}
                    >-</button>
                    <input
                        type="number"
                        className="w-14 text-center rounded-md border border-gray-200 px-2 py-1"
                        value={select}
                        min={1}
                        max={stock}
                        onChange={(e) => {
                            const v = Math.max(1, Math.floor(Number(e.target.value) || 1));
                            setSelect(Math.min(v, stock));
                        }}
                        aria-label="Cantidad"
                    />
                    <button
                        onClick={() => setSelect(s => Math.min(stock, s + 1))}
                        className="px-3 py-1 bg-white rounded-md shadow-sm hover:bg-gray-100"
                        aria-label="Aumentar cantidad"
                        disabled={select >= stock}
                    >+</button>
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
