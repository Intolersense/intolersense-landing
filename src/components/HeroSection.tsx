import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CloudBackground from './CloudBackground';
import { Cloud } from 'lucide-react';

const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Floating discomfort icons
  const discomfortIcons = [
    { icon: "🤢", delay: 2, x: "10%", y: "20%" },
    { icon: "😫", delay: 2.5, x: "85%", y: "30%" },
    { icon: "💨", delay: 3, x: "15%", y: "70%" },
    { icon: "😴", delay: 3.5, x: "80%", y: "60%" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <CloudBackground />
      
      {/* Floating discomfort icons */}
      {discomfortIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-60"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={inView ? { opacity: 0.6, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: item.delay }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 100 }}
            className="inline-block mb-6"
          >
            <Cloud className="h-16 w-16 mx-auto text-blue-400" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-blue-400 text-sm tracking-wide mb-2 uppercase font-medium"
          >
            Clear the confusion. Discover your triggers.
          </motion.p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          When Every Meal Feels Like a{' '}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Mystery
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Bloating? Fatigue? Headaches? Your body is trying to tell you something.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center items-center"
        >
          <motion.a
            href="https://app.intolersense.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 inline-block"
          >
            <span>Start Your Journey to Clarity</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex items-center justify-center space-x-8 mt-8 text-gray-400 text-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>10,000+ users</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span>No credit card required</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer hover:border-blue-400 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;