import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Edit3, Save, X, Mail, Phone, Camera, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProfilePage() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.data);
        setFormData(data.data);
      } else {
        toast.error('Failed to load profile');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back to Dashboard</span>
              </motion.button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </motion.button>
                  <motion.button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
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
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12 text-white">
            <div className="flex items-center gap-6">
              <motion.div 
                className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-12 h-12 text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{user.fullName}</h2>
                <p className="text-blue-100 text-lg">BMSCE Student</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800 font-medium">
                    {user.fullName}
                  </p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email Address
                </label>
                <p className="bg-gray-50 px-4 py-3 rounded-lg text-gray-600">
                  {user.email}
                  <span className="text-xs text-gray-500 ml-2">(Cannot be changed)</span>
                </p>
              </motion.div>

              {/* Mobile Number */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  Mobile Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your mobile number"
                  />
                ) : (
                  <p className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800 font-medium">
                    {user.mobileNumber}
                  </p>
                )}
              </motion.div>

              {/* Address */}
              <motion.div 
                className="md:col-span-2 space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your home address"
                  />
                ) : (
                  <p className="bg-gray-50 px-4 py-3 rounded-lg text-gray-800 font-medium min-h-[3rem]">
                    {user.address || 'Not specified'}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default ProfilePage;
