import React from 'react';
import { Menu, Home, ShoppingCart, User, LogOut, Building } from 'lucide-react';

export function Sidebar({ currentPage, setCurrentPage, profile, handleLogout }) {
  const navItems = [
    { name: 'Menu', page: 'menu', icon: Menu },
    { name: 'Dashboard', page: 'dashboard', icon: Home },
    { name: 'Cart', page: 'cart', icon: ShoppingCart },
    { name: 'Profile', page: 'profile', icon: User },
  ];

  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200 flex flex-col h-screen">
      <div className="flex items-center mb-6 p-2">
        <Building className="w-8 h-8 text-green-700 mr-2" />
        <h2 className="text-xl font-bold text-green-700">Campus Eats</h2>
      </div>

      {profile?.name && (
        <div className="mb-6 p-3 bg-gray-50 rounded-xl">
          <p className="font-semibold text-gray-700">{profile.name}</p>
          <p className="text-sm text-green-600">{profile.role || 'Student'}</p>
        </div>
      )}

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          
          return (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              className={`flex items-center w-full p-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </button>
    </div>
  );
}