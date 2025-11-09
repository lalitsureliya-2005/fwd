import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Edit3, Save, X, Mail, Phone, Camera, Award, Clock, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProfilePage() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        setIsEditing(false);
        toast.success('Profile updated successfully! 🎉');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                <span className="font-medium">Back to Dashboard</span>
              </motion.button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header Card */}
          <motion.div 
            className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              {/* Profile Avatar */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl">
                  <User className="w-16 h-16 text-white" />
                </div>
                <motion.div 
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
              
              {/* Profile Info */}
              <div className="text-center md:text-left flex-1">
                <motion.h1 
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {user.fullName || 'User Name'}
                </motion.h1>
                <motion.div 
                  className="flex items-center justify-center md:justify-start gap-2 text-blue-100 text-lg mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Award className="w-5 h-5" />
                  <span>BMSCE Student</span>
                </motion.div>
                
                {/* Quick Stats */}
                <motion.div 
                  className="flex items-center justify-center md:justify-start gap-6 text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-center">
                    <div className="font-bold text-xl">12</div>
                    <div className="text-xs text-blue-200">Orders</div>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div className="text-center">
                    <div className="font-bold text-xl">5</div>
                    <div className="text-xs text-blue-200">Favorites</div>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div className="text-center">
                    <div className="font-bold text-xl flex items-center justify-center gap-1">
                      4.8 <Trophy className="w-4 h-4 text-yellow-300" />
                    </div>
                    <div className="text-xs text-blue-200">Rating</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Profile Details Card */}
          <motion.div 
            className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  Personal Information
                </h2>
                {!isEditing ? (
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                ) : (
                  <div className="flex gap-3">
                    <motion.button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save'}
                    </motion.button>
                    <motion.button
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <motion.input
                      type="text"
                      name="fullName"
                      value={formData.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                      placeholder="Enter your full name"
                      whileFocus={{ scale: 1.02 }}
                    />
                  ) : (
                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-4 rounded-xl text-gray-800 font-medium border border-blue-100"
                      whileHover={{ scale: 1.02 }}
                    >
                      {user.fullName || 'Not provided'}
                    </motion.div>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-red-500" />
                    Email Address
                  </label>
                  <motion.div 
                    className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-4 rounded-xl text-gray-600 border border-gray-200 relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    {user.email || 'Not provided'}
                    <span className="absolute top-2 right-3 text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      Protected
                    </span>
                  </motion.div>
                </motion.div>

                {/* Mobile Number */}
                <motion.div 
                  className="md:col-span-2 space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    Mobile Number
                  </label>
                  {isEditing ? (
                    <motion.input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                      placeholder="Enter your mobile number"
                      whileFocus={{ scale: 1.02 }}
                    />
                  ) : (
                    <motion.div 
                      className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-4 rounded-xl text-gray-800 font-medium border border-green-100"
                      whileHover={{ scale: 1.02 }}
                    >
                      {user.mobileNumber || 'Not provided'}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

export default ProfilePage;