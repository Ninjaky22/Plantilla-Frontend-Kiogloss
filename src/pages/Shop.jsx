import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortBy, setSortBy] = useState('id,asc');
    const [filters, setFilters] = useState({
        tags: [],
        minPrice: '',
        maxPrice: ''
    });
    
    // Cargar productos al montar el componente y cuando cambien los filtros
    useEffect(() => {
        loadProducts();
    }, [currentPage, sortBy, JSON.stringify(filters)]); // Recargar cuando cambien página, orden o filtros

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Llamar al servicio pasando filtros y sort para que el backend devuelva
            // los productos publicados ya filtrados por estado y por los criterios que enviemos.
            const requestPayload = {
                page: currentPage,
                page_size: 12,
            };

            console.debug('Shop loading products with params:', requestPayload);

            const data = await productService.getAllProducts(requestPayload);
            
            // La API devuelve un objeto paginado
            const productList = data.content || data;
            
            console.log('Productos cargados:', productList.length);
            setProducts(productList);
        } catch (err) {
            setError('Error al cargar los productos. Por favor, intenta de nuevo.');
            console.error('Error loading products:', err);
            console.error('Error completo:', err.response?.data || err.message);
            // En caso de error, mostrar array vacío
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Manejar cambios en los filtros desde el Sidebar
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(0); // Reset a la primera página cuando cambian los filtros
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        let newSort = 'id,asc';
        
        switch(value) {
            case 'price-low-to-high':
                newSort = 'price,asc';
                break;
            case 'price-high-to-low':
                newSort = 'price,desc';
                break;
            case 'latest':
                newSort = 'id,desc';
                break;
            default:
                newSort = 'id,asc';
        }
        
        setSortBy(newSort);
    };

    return (
        <div className="bg-[#F7E6FE]">
            <Breadcrumb items={[
                { label: 'Inicio', path: '/', icon: 'fa-solid fa-house text-[#610361]' },
                { label: 'Productos' }
            ]} />

            {/* shop wrapper */}
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                {/* sidebar */}
                <Sidebar onFilterChange={handleFilterChange} />
                {/* ./sidebar */}

                {/* products */}
                <div className="col-span-3">
                    <div className="flex items-center mb-4">
                        <select 
                            name="sort" 
                            id="sort"
                            onChange={handleSortChange}
                            className="w-60 text-sm text-[#610361] py-3 px-4 border-[#e6affc] bg-[#f3d5ff] shadow-sm rounded-lg focus:ring-[#f3d5ff] focus:border-[#f3d5ff] font-winkySans">
                            <option value="">Configuración predeterminada</option>
                            <option value="price-low-to-high">Precio: de menor a mayor</option>
                            <option value="price-high-to-low">Precio: de mayor a menor</option>
                            <option value="latest">Últimos productos</option>
                        </select>
                        
                        <div className="flex gap-2 ml-auto">
                            <div
                                className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                                <i className="fa-solid fa-grip-vertical"></i>
                            </div>
                            <div
                                className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                                <i className="fa-solid fa-list"></i>
                            </div>
                        </div>
                    </div>

                    {/* Loading state */}
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                <p className="mt-4 text-[#610361]">Cargando productos...</p>
                            </div>
                        </div>
                    )}

                    {/* Error state */}
                    {error && !loading && (
                        <div className="bg-red-100   border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}

                    {/* Products grid */}
                    {!loading && !error && (
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-20">
                                    <p className="text-gray-600 text-lg">No se encontraron productos</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* ./products */}
            </div>
            {/* ./shop wrapper */}
        </div>
    );
};

export default Shop;
