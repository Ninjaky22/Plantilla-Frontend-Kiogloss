import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode"
import productService from '../services/productService';

const Wishlist = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const rawToken = localStorage.getItem('access') || localStorage.getItem('accessToken');
                if (rawToken) {
                    // Try backend first
                    let accountId = null;
                    try {
                        const dec = jwtDecode(rawToken);
                        accountId = dec?.user_id || dec?.userId || dec?.sub || dec?.id || null;
                    } catch (e) {
                        console.warn('Could not decode token', e);
                    }

                    if (accountId) {
                        try {
                            const resp = await productService.getFavoritesByAccount(accountId);
                            // Normalize possible shapes
                            let list = [];
                            if (resp && resp.account) {
                                const fav = resp.account.favorite || resp.account.favoriteID || resp.account.favoriteId || resp.account.favoriteID;
                                if (Array.isArray(fav)) {
                                    // items might be FavoriteProductDTO or FavoriteProductItemDTO-like
                                    list = fav.map(i => {
                                        if (i.idFa || i.idFa === 0) {
                                            return { productId: i.id, title: i.name || i.title, price: i.price, image: i.images && i.images[0] ? i.images[0] : i.image, slug: i.slug, favoriteId: i.idFa };
                                        }
                                        if (i.product) {
                                            return { productId: i.product.id || i.product, title: i.product.name || i.product.title, price: i.product.price || i.product.displayPrice, image: (i.product.images && i.product.images[0]) || i.product.image, slug: i.product.slug || i.product.id, favoriteId: i.id || i.pk };
                                        }
                                        return { productId: i.id || i.product || i.productId, title: i.name || i.title || i.slug, price: i.price, image: i.image || (i.images && i.images[0]), slug: i.slug };
                                    });
                                } else if (typeof resp.account.favorite === 'string') {
                                    // comma separated ids
                                    const ids = resp.account.favorite.split(',').map(s => Number(s.trim())).filter(Boolean);
                                    list = ids.map(id => ({ productId: id }));
                                }
                            }

                            // If we got list with productIds but little detail, try fetch per id
                            const detailed = await Promise.all(list.map(async (it) => {
                                if (!it.title && it.productId) {
                                    try {
                                        const p = await productService.getProductById(it.productId);
                                        return { product: p, favoriteId: it.favoriteId || null };
                                    } catch (e) {
                                        return { product: { id: it.productId }, favoriteId: it.favoriteId || null };
                                    }
                                }
                                return { product: { id: it.productId, title: it.title, price: it.price, images: it.image ? [it.image] : undefined, slug: it.slug }, favoriteId: it.favoriteId || null };
                            }));

                            setItems(detailed.map(d => ({ product: d.product, favoriteId: d.favoriteId })));
                            setLoading(false);
                            return;
                        } catch (e) {
                            console.warn('Error fetching favorites from backend, falling back to localStorage', e);
                        }
                    }
                }

                // Fallback: read from localStorage 'wishlist'
                const raw = localStorage.getItem('wishlist');
                const list = raw ? JSON.parse(raw) : [];
                setItems(list.map(i => ({ product: { id: i.productId, title: i.title, price: i.price, images: i.image ? [i.image] : undefined, slug: i.slug }, favoriteId: null })));
            } catch (e) {
                console.error('Error loading wishlist', e);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const remove = async (favoriteId, productId) => {
        try {
            if (favoriteId) {
                await productService.removeFavoriteByPk(favoriteId);
            }
            // remove from localStorage fallback too
            try {
                const raw = localStorage.getItem('wishlist');
                const list = raw ? JSON.parse(raw) : [];
                const filtered = list.filter(i => Number(i.productId) !== Number(productId));
                localStorage.setItem('wishlist', JSON.stringify(filtered));
            } catch (e) {
                console.warn('Could not update local wishlist', e);
            }
            setItems(prev => prev.filter(it => Number(it.product?.id) !== Number(productId)));
        } catch (e) {
            console.error('Error removing favorite', e);
        }
    };

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
                <p className="text-gray-600 font-medium">Wishlist</p>
            </div>

            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">My Wishlist</h2>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {items.length === 0 && (
                            <div className="col-span-full text-center text-gray-500">No items in your wishlist.</div>
                        )}
                        {items.map((it, idx) => {
                            const p = it.product || {};
                            const img = (p.images && p.images[0]) || p.image || '/assets/images/products/product1.jpg';
                            return (
                                <div key={p.id || idx} className="bg-white shadow rounded-xl overflow-hidden group">
                                    <div className="relative">
                                        <img src={img} alt={p.title} className="w-full h-48 object-cover" />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                            <Link to={`/product/${p.slug || p.id}`} className="text-[#7C86FF] w-10 h-10 rounded-full bg-[#f3d5ff] flex items-center justify-center hover:bg-[#f8aef8] hover:text-[#615FFF] transition" title="view product">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </Link>
                                            <button onClick={() => remove(it.favoriteId, p.id)} className="text-[#7C86FF] w-10 h-10 rounded-full bg-[#f3d5ff] flex items-center justify-center hover:bg-[#f8aef8] hover:text-[#615FFF] transition" title="remove from wishlist">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pt-4 pb-3 px-4 bg-linear-to-b from-[#ebbaff] to-[#f3d5ff] border border-[#ebbaff]">
                                        <Link to={`/product/${p.slug || p.id}`}>
                                            <h4 className="uppercase font-medium text-lg mb-2 text-[#610361] hover:text-[#615FFF] transition line-clamp-2">
                                                {p.title || p.name || 'Producto'}
                                            </h4>
                                        </Link>
                                        <div className="flex items-baseline mb-1 space-x-2">
                                            <p className="text-lg text-[#610361] font-semibold">COP {p.price ?? p.displayPrice ?? ''}</p>
                                        </div>
                                    </div>
                                    <Link to={`/product/${p.slug || p.id}`} className="block w-full py-2 text-center text-[#610361] bg-linear-to-b from-[#ebbaff] to-[#f3d5ff] border border-[#ebbaff] rounded-b-lg hover:bg-transparent hover:text-primary transition">View product</Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Wishlist;
