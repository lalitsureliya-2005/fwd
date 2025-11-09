import React, { useMemo } from 'react';
import { Search, Clock } from 'lucide-react';

export function MenuPage({ menuItems, cart, setCart }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [menuItems, searchTerm]);

  return (
    <div className="p-6">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl shadow-lg p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={item.image || `https://source.unsplash.com/400x300/?food,${item.name}`}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.name)}`;
                }}
              />
              <div className="absolute top-2 right-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center text-blue-600">
                <Clock className="w-4 h-4 mr-1" />
                <span className="font-medium">{item.time} min</span>
              </div>
              <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
            </div>
            
            <button
              onClick={() => {
                handleAddToCart(item);
                // Animation effect
                const btn = document.activeElement;
                btn.classList.add('animate-ping');
                setTimeout(() => btn.classList.remove('animate-ping'), 200);
              }}
              className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}