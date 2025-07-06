import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, TrendingUp, Award, Sun } from 'lucide-react';

const InsightSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const insights = [
    {
      icon: "🥛",
      title: "Dairy Alert",
      description: "87% of your bloating occurs after dairy consumption",
      percentage: 87,
      color: "from-blue-400 to-blue-600",
      improvement: "+43% energy when avoided",
    },
    {
      icon: "🌾",
      title: "Gluten Pattern",
      description: "Fatigue symptoms spike 3-4 hours after wheat products",
      percentage: 92,
      color: "from-yellow-400 to-orange-500",
      improvement: "+65% better sleep quality",
    },
    {
      icon: "☕",
      title: "Caffeine Connection",
      description: "Morning headaches linked to coffee on empty stomach",
      percentage: 76,
      color: "from-purple-400 to-purple-600",
      improvement: "+78% reduced morning symptoms",
    },
  ];

  const stats = [
    { value: "3-7", label: "Days to first insights", icon: Brain },
    { value: "94%", label: "Accuracy rate", icon: Award },
    { value: "2-3x", label: "Faster than traditional elimination diets", icon: TrendingUp },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background with golden breakthrough */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-600 via-blue-800 to-blue-900">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-red-400/10" />
          {/* Sun rays effect */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 2, opacity: 1 } : {}}
            transition={{ duration: 2, delay: 1 }}
          />
        </motion.div>
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
            <Sun className="h-12 w-12 text-yellow-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Breakthrough</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            AI-powered analysis reveals what your food diary alone never could.
          </p>
        </motion.div>

        {/* Insights Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 1, 
                delay: 0.5 + index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{insight.icon}</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${insight.color} text-white`}>
                    {insight.percentage}% Match
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{insight.title}</h3>
                <p className="text-gray-300 mb-4">{insight.description}</p>
                
                {/* Progress Bar */}
                <div className="relative mb-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${insight.color}`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${insight.percentage}%` } : {}}
                      transition={{ duration: 2, delay: 1 + index * 0.3 }}
                    />
                  </div>
                </div>
                
                <div className="text-sm text-green-400 font-medium">
                  {insight.improvement}
                </div>
                
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-xl -z-10"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 2, delay: 2 + index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.5 + index * 0.2 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-4">
                <stat.icon className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Get Your Personal Insights
            </button>
          </motion.div>
          <p className="text-gray-300 mt-4">Start seeing patterns in as little as 3 days</p>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightSection;