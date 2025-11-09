import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2, Clock, X, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        if (Array.isArray(items)) {
          setCartItems(items);
          setTotal(items.reduce((sum, item) => sum + (item.price * item.quantity), 0));
        }
      }
    } catch (error) {
      setCartItems([]);
      setTotal(0);
    }
  };

  const updateQuantity = (itemId, delta) => {
    const newCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(item => item !== null);

    setCartItems(newCart);
    setTotal(newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (itemId) => {
    const newCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCart);
    setTotal(newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    // Removed toast.success('Cart cleared') to avoid double popup
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    setIsProcessing(true);
    setShowPaymentModal(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      toast.success('Order placed successfully! 🎉');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <motion.div 
        className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
                Your Cart
              </h1>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-medium">Clear Cart</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <motion.div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-xl">
              <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-gray-100 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-xl"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-xl"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-lg font-bold text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Estimated Time</span>
                    </div>
                    <span className="text-blue-800 font-bold text-lg">20 min</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>₹{total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full py-4 font-bold text-lg rounded-xl transition-all shadow-lg ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                  }`}
                >
                  {isProcessing ? 'Placing Order...' : `Place Order • ₹${total.toFixed(0)}`}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Choose Payment Method</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* UPI Payment Option */}
                <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">UPI Payment</h4>
                        <p className="text-sm text-gray-600">Scan QR code to pay</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-blue-600">₹{total.toFixed(0)}</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-white rounded-xl p-4 shadow-md mb-4">
                      <img 
                        src="https://lh3.googleusercontent.com/pw/AP1GczPswzP2d6HGReTFgkrHwWu1D7FZjAvw_UWsHPVnfygoYH2HCULExa2npukZcoMugmLQ3tImdquJzXCEnq3WRQDND9iSxLDADBpakq00RMRLF2QOAG0rPSc5A-1E4V4jSV117uHSYbsnaXW4a6L-pY-8tw=w622-h635-s-no-gm?authuser=0"
                        alt="UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">UPI ID: 7898538631@ptaxis</p>
                    <p className="text-xs text-gray-500">Scan with any UPI app like PhonePe, GPay, Paytm</p>
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div className="border-2 border-green-200 rounded-xl p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-bold">₹</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Cash on Delivery</h4>
                        <p className="text-sm text-gray-600">Pay when order arrives</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-green-600">₹{total.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={processPayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Payment'}
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CartPage;
