import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

/**
 * CartLid component - interactive cart lid that changes color and animation state
 * when clicked (green/open when clicked, red/closed by default)
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Optional onClick handler
 * @param {boolean} [props.isOpen] - Control the open/close state externally
 * @param {string} [props.color='emerald'] - Primary color theme ('emerald', 'blue', 'purple', etc)
 * @param {string} [props.size='md'] - Size of the component ('sm', 'md', 'lg')
 * @returns {JSX.Element} CartLid component
 */
const CartLid = ({ className = '', onClick, isOpen: externalIsOpen, color = 'emerald', size = 'md' }) => {
  // State to track if the lid is open - use external state if provided
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // Handle click event
  const handleClick = () => {
    // Only update internal state if we're not externally controlled
    if (externalIsOpen === undefined) {
      setInternalIsOpen(!internalIsOpen);
    }
    
    if (onClick) {
      onClick(!isOpen); // Pass the new state to parent if onClick handler provided
    }
  };

  // Determine size dimensions
  let sizeClasses = 'w-32 h-32';
  switch(size) {
    case 'sm':
      sizeClasses = 'w-16 h-16';
      break;
    case 'lg':
      sizeClasses = 'w-40 h-40';
      break;
    default: // 'md'
      sizeClasses = 'w-24 h-24';
  }
  
  return (
    <div 
      className={`cart-lid-container relative ${sizeClasses} cursor-pointer ${className}`} 
      onClick={handleClick}
    >
      {/* Cart body */}
      <div className="cart-body absolute bottom-0 w-full h-3/4 bg-gray-200 rounded-lg border-2 border-gray-300">
        <div className="flex justify-center items-center h-full">
          <ShoppingCart className={`${size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-12 w-12' : 'h-8 w-8'} text-gray-500`} />
        </div>
      </div>

      {/* Cart lid - animated */}
      <motion.div
        className={`cart-lid absolute top-0 w-full h-1/3 rounded-t-lg shadow-md 
          ${isOpen ? `bg-${color}-500` : 'bg-red-500'}`}
        initial={{ rotateX: 0 }}
        animate={{ 
          rotateX: isOpen ? -80 : 0,
          y: isOpen ? -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        style={{ transformOrigin: 'top', zIndex: 10 }}
      >
        {/* Handle on the lid */}
        <div className={`${size === 'sm' ? 'w-4 h-1 mt-1' : size === 'lg' ? 'w-10 h-2 mt-4' : 'w-6 h-1.5 mt-2'} bg-gray-700 rounded-full mx-auto`}></div>
      </motion.div>

      {/* Status indicator */}
      <div 
        className="absolute -top-6 left-0 right-0 text-center text-sm font-medium cursor-pointer"
        onClick={handleClick}
      >
        {isOpen ? (
          <span className={`text-${color}-600`}>Lid Open</span>
        ) : (
          <span className="text-red-600 hover:text-green-600 transition-colors">Lid Closed</span>
        )}
      </div>
    </div>
  );
};

// Alternative designs (can be used with the className prop)
export const CartLidDesigns = {
  CLASSIC: 'classic',
  MODERN: 'modern',
  SLEEK: 'sleek',
  ROUNDED: 'rounded',
  FLAT: 'flat',
};

// Example usage of different designs
export const CartLidWithDesign = ({ design = CartLidDesigns.CLASSIC, ...props }) => {
  let designClasses = '';
  
  switch (design) {
    case CartLidDesigns.MODERN:
      designClasses = 'modern-design'; // Add specific classes for modern design
      break;
    case CartLidDesigns.SLEEK:
      designClasses = 'sleek-design'; // Add specific classes for sleek design
      break;
    case CartLidDesigns.ROUNDED:
      designClasses = 'rounded-design'; // Add specific classes for rounded design
      break;
    case CartLidDesigns.FLAT:
      designClasses = 'flat-design'; // Add specific classes for flat design
      break;
    default:
      designClasses = 'classic-design'; // Default design
  }
  
  return <CartLid className={`${designClasses} ${props.className || ''}`} {...props} />;
};

export default CartLid;