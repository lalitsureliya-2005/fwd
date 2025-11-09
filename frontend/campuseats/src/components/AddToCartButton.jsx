import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';

const AddToCartButton = ({ onClick }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        onClick();
        setTimeout(() => setIsAnimating(false), 800);
    };

    return (
        <motion.button
            onClick={handleClick}
            className="w-full p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 shadow-md flex items-center justify-center font-medium"
            whileTap={{ scale: 0.95 }}
            animate={{
                scale: isAnimating ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.4 }}
        >
            <Plus className="w-4 h-4 mr-2" />
            {isAnimating ? 'Added!' : 'Add to Cart'}
            {isAnimating && (
                <motion.div
                    className="absolute"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ShoppingCart className="w-4 h-4" />
                </motion.div>
            )}
        </motion.button>
    );
};

export default AddToCartButton;