import { useState, useEffect } from 'react';
import productService from '../services/productService';

const Sidebar = ({ onFilterChange }) => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [loading, setLoading] = useState(true);

    // Cargar tags al montar el componente
    useEffect(() => {
        loadTags();
    }, []);

    const loadTags = async () => {
        try {
            setLoading(true);
            const data = await productService.getAllTags();
            setTags(data || []);
        } catch (error) {
            console.error('Error loading tags:', error);
            setTags([]);
        } finally {
            setLoading(false);
        }
    };

    // Manejar selección de tags
    const handleTagChange = (tagId) => {
        const newSelectedTags = selectedTags.includes(tagId)
            ? selectedTags.filter(id => id !== tagId)
            : [...selectedTags, tagId];
        
        setSelectedTags(newSelectedTags);
        
        // Notificar al componente padre
        if (onFilterChange) {
            onFilterChange({
                tags: newSelectedTags,
                minPrice: priceRange.min,
                maxPrice: priceRange.max
            });
        }
    };

    // Manejar cambio de precio
    const handlePriceChange = (type, value) => {
        const newPriceRange = { ...priceRange, [type]: value };
        setPriceRange(newPriceRange);
    };

    // Aplicar filtro de precio
    const applyPriceFilter = () => {
        if (onFilterChange) {
            onFilterChange({
                tags: selectedTags,
                minPrice: priceRange.min,
                maxPrice: priceRange.max
            });
        }
    };

    // Limpiar filtros
    const clearFilters = () => {
        setSelectedTags([]);
        setPriceRange({ min: '', max: '' });
        if (onFilterChange) {
            onFilterChange({
                tags: [],
                minPrice: '',
                maxPrice: ''
            });
        }
    };

    return (
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
            <div className="divide-y divide-gray-200 space-y-5">
                {/* Botón limpiar filtros */}
                {(selectedTags.length > 0 || priceRange.min || priceRange.max) && (
                    <div className="pt-4">
                        <button
                            onClick={clearFilters}
                            className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm">
                            Limpiar filtros
                        </button>
                    </div>
                )}

                {/* Tags/Categories */}
                <div>
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categorías</h3>
                    {loading ? (
                        <div className="text-center py-4">
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    ) : tags.length > 0 ? (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {tags.map((tag) => (
                                <div key={tag.id} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        name={`tag-${tag.id}`}
                                        id={`tag-${tag.id}`}
                                        checked={selectedTags.includes(tag.id)}
                                        onChange={() => handleTagChange(tag.id)}
                                        className="text-primary focus:ring-0 rounded-sm cursor-pointer" 
                                    />
                                    <label 
                                        htmlFor={`tag-${tag.id}`} 
                                        className="text-gray-600 ml-3 cursor-pointer capitalize">
                                        {tag.name || tag.slug}
                                    </label>
                                    {tag.productCount && (
                                        <div className="ml-auto text-gray-600 text-sm">({tag.productCount})</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No hay categorías disponibles</p>
                    )}
                </div>

                {/* Price */}
                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Precio</h3>
                    <div className="mt-4 flex items-center gap-2">
                        <input 
                            type="number" 
                            name="min" 
                            id="min"
                            value={priceRange.min}
                            onChange={(e) => handlePriceChange('min', e.target.value)}
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-2 text-gray-600 shadow-sm text-sm"
                            placeholder="Mín" 
                        />
                        <span className="text-gray-500">-</span>
                        <input 
                            type="number" 
                            name="max" 
                            id="max"
                            value={priceRange.max}
                            onChange={(e) => handlePriceChange('max', e.target.value)}
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-2 text-gray-600 shadow-sm text-sm"
                            placeholder="Máx" 
                        />
                    </div>
                    <button
                        onClick={applyPriceFilter}
                        className="w-full mt-3 py-2 px-4 bg-primary text-white rounded hover:bg-opacity-90 transition text-sm">
                        Aplicar
                    </button>
                </div>

                {/* Filtros activos */}
                {selectedTags.length > 0 && (
                    <div className="pt-4">
                        <h3 className="text-sm text-gray-800 mb-2 font-medium">Filtros Activos</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map(tagId => {
                                const tag = tags.find(t => t.id === tagId);
                                return tag ? (
                                    <span 
                                        key={tagId}
                                        className="inline-flex items-center px-2 py-1 bg-primary bg-opacity-10 text-primary text-xs rounded">
                                        {tag.name || tag.slug}
                                        <button
                                            onClick={() => handleTagChange(tagId)}
                                            className="ml-1 hover:text-red-600">
                                            ×
                                        </button>
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
