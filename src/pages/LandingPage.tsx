import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { easeInOut, easeOut } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Users, 
  Store, 
  Leaf, 
  Scan,
  Star,
  Rocket,
  Play,
  Phone,
  Apple,
  Zap,
  Globe
} from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-50px" });

  // Cart animation
  const cartControls = useAnimation();
  
  useEffect(() => {
    if (isHeroInView) {
      cartControls.start("visible");
    }
  }, [isHeroInView, cartControls]);
  const cartVariants = {
    hidden: { x: -200, scale: 0.5, opacity: 0 },
    visible: { 
      x: 0, 
      scale: 1, 
      opacity: 1,
      transition: { duration: 3, ease: easeOut }
    }
  };

  const productVariants = {
    hidden: { y: -50, scale: 0, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      scale: 1,
      opacity: 0.6,
      transition: {
        delay: 2 + i * 0.3,
        duration: 1,
        ease: easeOut
      }
    })
  };

  const featureCardVariants = {
    hidden: { y: 50, scale: 0.9, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: easeOut
      }
    })
  };

  const features = [
    {
      icon: Scan,
      title: "Smart Cart",
      description: "Scan products to automatically open cart lid and add items. Enhanced confirmation system ensures accuracy.",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: ShoppingCart,
      title: "Product Locator",
      description: "Find any product instantly with our interactive store map and turn-by-turn navigation.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Get suggestions for products with lower carbon footprints. Shop sustainably with ease.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Customer Support",
      description: "Real-time assistance with AI chatbot and live employee support for immediate help.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Store,
      title: "Store Management",
      description: "Comprehensive inventory management, staff coordination, and operational efficiency tools.",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Store Manager",
      content: "SmartStore has revolutionized our shopping experience. The eco-friendly suggestions have helped us reduce our carbon footprint by 40%!",
      avatar: "SJ",
      gradient: "from-pink-400 to-purple-500"
    },
    {
      name: "Mike Chen",
      role: "Regular Customer",
      content: "The smart cart technology is incredible! No more waiting in checkout lines. My shopping time has been cut in half.",
      avatar: "MC",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      name: "Emily Wong",
      role: "Chain Owner",
      content: "Our store's efficiency has increased by 60% since implementing SmartStore. The analytics dashboard is a game-changer!",
      avatar: "EW",
      gradient: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="glassmorphism border-b backdrop-blur border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <Store className="h-8 w-8 text-emerald-600" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                SmartStore
              </span>
            </div>
            <div className="flex space-x-4">
              <motion.button
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Login
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Cart */}
      <section ref={heroRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Animated Shopping Cart */}
          <motion.div
            className="absolute top-10 left-10 opacity-20 text-8xl text-emerald-600"
            initial="hidden"
            animate={cartControls}
            variants={cartVariants}
          >
            <div className="relative">
              <ShoppingCart className="w-32 h-32" />
              {/* Spinning wheels */}
              <motion.div
                className="absolute bottom-2 left-8 w-6 h-6 border-4 border-emerald-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-2 right-4 w-6 h-6 border-4 border-emerald-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Floating Products */}
          <motion.div
            className="absolute top-20 right-20 opacity-30"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={productVariants}
            custom={0}
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Apple className="w-16 h-16 text-red-500" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute top-40 right-32 opacity-30"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={productVariants}
            custom={1}
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Zap className="w-16 h-16 text-yellow-600" />
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute top-60 right-10 opacity-30"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={productVariants}
            custom={2}
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            >
              <Globe className="w-16 h-16 text-purple-600" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse-slow"
            initial={{ y: 50, opacity: 0 }}
            animate={isHeroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Future of Shopping
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={isHeroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Revolutionary store management system with smart cart technology, eco-friendly suggestions, 
            and seamless digital payments
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={isHeroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <motion.button
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Animated Statistics Section */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              className="glassmorphism rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              initial={{ y: 50, opacity: 0 }}
              animate={isStatsInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="text-5xl mb-4 text-emerald-600">
                <Users className="w-16 h-16 mx-auto" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                <AnimatedCounter target={50000} isVisible={isStatsInView} suffix="+" />
              </div>
              <p className="text-lg text-gray-600">Happy Customers</p>
              <div className="flex justify-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isStatsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="glassmorphism rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              initial={{ y: 50, opacity: 0 }}
              animate={isStatsInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-5xl mb-4 text-blue-600">
                <Store className="w-16 h-16 mx-auto" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                <AnimatedCounter target={1200} isVisible={isStatsInView} suffix="+" />
              </div>
              <p className="text-lg text-gray-600">Partner Stores</p>
              <div className="flex justify-center mt-2 space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.3 }}
                    className={`text-blue-${500 - i * 100}`}
                  >
                    <Store className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="glassmorphism rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              initial={{ y: 50, opacity: 0 }}
              animate={isStatsInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="text-5xl mb-4 text-green-600">
                <Leaf className="w-16 h-16 mx-auto" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                <AnimatedCounter target={2000000} prefix="$" isVisible={isStatsInView} />
              </div>
              <p className="text-lg text-gray-600">Eco Savings</p>
              <div className="flex justify-center mt-2 space-x-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-green-500"
                >
                  <Leaf className="w-5 h-5" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="text-green-400"
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-green-600"
                >
                  <Globe className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section (Reduced to 5 cards) */}
      <section ref={featuresRef} className="py-20 px-4 sm:px-6 lg:px-8 glassmorphism">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isFeaturesInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Smart Features
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card glassmorphism rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group"
                initial="hidden"
                animate={isFeaturesInView ? "visible" : "hidden"}
                variants={featureCardVariants}
                custom={index}
                whileHover={{ y: -16, scale: 1.02 }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg animate-gradient-x">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-16 text-white"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="glassmorphism rounded-2xl p-8 shadow-xl text-left"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 glassmorphism">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8 text-gray-800"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Shopping Experience?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join thousands of satisfied customers and store managers who have revolutionized their retail experience.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Store className="h-8 w-8 text-emerald-400" />
                <span className="text-2xl font-bold">SmartStore</span>
              </div>
              <p className="text-gray-400">Revolutionizing the future of shopping with smart technology and eco-friendly solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Smart Cart</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Store Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Product Locator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Eco Solutions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">tw</span>
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">fb</span>
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">ig</span>
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">in</span>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartStore. All rights reserved. Built with 💚 for the future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
