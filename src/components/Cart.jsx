import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
      {
        id: 1,
        name: 'Camiseta Básica',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
        size: 'M',
        color: 'Negro'
      },
      {
        id: 2,
        name: 'Jeans Slim Fit',
        price: 59.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
        size: 'L',
        color: 'Azul'
      },
      {
        id: 3,
        name: 'Zapatillas Deportivas',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop',
        size: '42',
        color: 'Blanco'
      },
      {
        id: 1,
        name: 'Camiseta Básica',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
        size: 'M',
        color: 'Negro'
      },
      {
        id: 2,
        name: 'Jeans Slim Fit',
        price: 59.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
        size: 'L',
        color: 'Azul'
      },
      {
        id: 3,
        name: 'Zapatillas Deportivas',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop',
        size: '42',
        color: 'Blanco'
      },
      {
        id: 1,
        name: 'Camiseta Básica',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
        size: 'M',
        color: 'Negro'
      },
      {
        id: 2,
        name: 'Jeans Slim Fit',
        price: 59.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
        size: 'L',
        color: 'Azul'
      },
      {
        id: 3,
        name: 'Zapatillas Deportivas',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop',
        size: '42',
        color: 'Blanco'
      },
      {
        id: 1,
        name: 'Camiseta Básica',
        price: 29.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
        size: 'M',
        color: 'Negro'
      },
      {
        id: 2,
        name: 'Jeans Slim Fit',
        price: 59.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
        size: 'L',
        color: 'Azul'
      },
      {
        id: 3,
        name: 'Zapatillas Deportivas',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop',
        size: '42',
        color: 'Blanco'
      },
]);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'DESCUENTO10') {
      setDiscount(10);
    } else if (couponCode.toUpperCase() === 'VERANO20') {
      setDiscount(20);
    } else {
      alert('Cupón inválido');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 100 ? 0 : 5.99;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
            <ShoppingBag className="text-blue-600" />
            Carrito de Compras
          </h1>
          <p className="text-slate-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <ShoppingBag className="w-24 h-24 mx-auto text-slate-300 mb-4" />
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                  Tu carrito está vacío
                </h2>
                <p className="text-slate-600">Agrega productos para comenzar tu compra</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800">
                            {item.name}
                          </h3>
                          <p className="text-slate-600 mt-1">
                            Talla: {item.size} | Color: {item.color}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-white rounded-md transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-white rounded-md transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Resumen del Pedido
              </h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Tag size={16} />
                  Código de Descuento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="DESCUENTO10"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ Descuento del {discount}% aplicado
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({discount}%)</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Envío</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-slate-500">
                    Envío gratis en compras superiores a $100
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-slate-800">Total</span>
                <span className="text-3xl font-bold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                disabled={cartItems.length === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Proceder al Pago
              </button>

              <button className="w-full mt-3 border-2 border-slate-300 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}