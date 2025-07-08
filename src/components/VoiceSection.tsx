import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mic, MessageCircle, Zap } from 'lucide-react';

const VoiceSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [isRecording, setIsRecording] = useState(false);

  const testimonials = [
    {
      text: "Had pizza for lunch and feeling bloated again...",
      delay: 0.5,
      icon: "🍕",
    },
    {
      text: "Greek salad for dinner, mild headache starting",
      delay: 1.5,
      icon: "🥗",
    },
    {
      text: "Morning latte and toast... stomach cramps by 10am",
      delay: 2.5,
      icon: "☕",
    },
    {
      text: "Pasta night was great but woke up exhausted",
      delay: 3.5,
      icon: "🍝",
    },
  ];

  return (
    <section id="features" ref={ref} className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background with clearing clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
        <motion.div
          className="absolute inset-0 bg-white/5"
          initial={{ opacity: 0.8 }}
          animate={inView ? { opacity: 0.3 } : { opacity: 0.8 }}
          transition={{ duration: 3 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="inline-block mb-6"
          >
            <Zap className="h-12 w-12 text-blue-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Your Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Matters</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Just speak naturally. IntolerSense listens and learns.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Microphone */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center"
          >
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <motion.button
                onClick={() => setIsRecording(!isRecording)}
                className={`relative w-32 h-32 rounded-full ${
                  isRecording 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'
                } shadow-2xl flex items-center justify-center group transition-all duration-300`}
                whileTap={{ scale: 0.95 }}
              >
                <Mic className="h-12 w-12 text-white" />
                
                {/* Pulse Animation */}
                <AnimatePresence>
                  {isRecording && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-red-400"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
              
              {/* Waveform Animation */}
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-blue-400 rounded-full"
                        animate={{
                          height: [4, 20, 4],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="mt-8 text-lg text-gray-300"
            >
              "Tell us about your day"
            </motion.p>
          </motion.div>

          {/* Floating Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="space-y-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: testimonial.delay }}
                className="flex items-start space-x-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: testimonial.delay + 0.2 }}
                  className="flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                    {testimonial.icon}
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 flex-1 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Voice Note</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VoiceSection;