import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertCircle, Clock, TrendingUp, Zap } from 'lucide-react';

const SymptomSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const symptoms = [
    {
      icon: "🤢",
      title: "Nausea",
      description: "2 hours after breakfast",
      severity: "moderate",
      color: "from-green-400 to-emerald-600",
    },
    {
      icon: "😫",
      title: "Migraine",
      description: "Evening onset",
      severity: "severe",
      color: "from-red-400 to-red-600",
    },
    {
      icon: "💨",
      title: "Bloating",
      description: "After lunch",
      severity: "mild",
      color: "from-yellow-400 to-orange-600",
    },
    {
      icon: "😴",
      title: "Fatigue",
      description: "All afternoon",
      severity: "moderate",
      color: "from-purple-400 to-purple-600",
    },
  ];

  const connections = [
    { from: 0, to: 1, delay: 2 },
    { from: 1, to: 2, delay: 2.5 },
    { from: 2, to: 3, delay: 3 },
    { from: 3, to: 0, delay: 3.5 },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background with more clearing clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700">
        <motion.div
          className="absolute inset-0 bg-blue-900/20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
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
            <AlertCircle className="h-12 w-12 text-blue-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Your Body's Signals, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Decoded</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Log symptoms with a tap. No complicated forms. No medical jargon.
          </p>
        </motion.div>

        {/* Symptoms Grid */}
        <div className="relative">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {symptoms.map((symptom, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8 + index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative"
              >
                <div className={`bg-gradient-to-r ${symptom.color} p-6 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{symptom.icon}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      symptom.severity === 'severe' ? 'bg-red-500/20 text-red-300' :
                      symptom.severity === 'moderate' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {symptom.severity}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{symptom.title}</h3>
                  <p className="text-white/80 text-sm">{symptom.description}</p>
                  
                  {/* Pulse Animation */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-white/30"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={inView ? { scale: 1.1, opacity: [0, 1, 0] } : {}}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: 1.5 + index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((connection, index) => (
              <motion.path
                key={index}
                d={`M ${25 + (connection.from % 4) * 25}% ${50 + Math.floor(connection.from / 4) * 20}% 
                   Q 50% 50% 
                   ${25 + (connection.to % 4) * 25}% ${50 + Math.floor(connection.to / 4) * 20}%`}
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 2, delay: connection.delay }}
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <Clock className="h-8 w-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-gray-300">Log symptoms as they happen with one-tap simplicity</p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pattern Recognition</h3>
            <p className="text-gray-300">AI identifies trends you might miss</p>
          </div>
          <div className="text-center">
            <Zap className="h-8 w-8 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Insights</h3>
            <p className="text-gray-300">Get personalized recommendations immediately</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SymptomSection;