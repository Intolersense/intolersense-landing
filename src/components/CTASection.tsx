import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Star, ArrowRight, Users, Heart } from 'lucide-react';
import { MAIN_APP_URL, BUTTON_TEXTS } from '../config';

const CTASection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const testimonials = [
    {
      quote: "Energy I haven't felt in years",
      author: "Sarah M.",
      rating: 5,
      improvement: "3 weeks dairy-free",
    },
    {
      quote: "No more afternoon crashes",
      author: "Mike T.",
      rating: 5,
      improvement: "Identified gluten sensitivity",
    },
    {
      quote: "Finally enjoying meals without fear",
      author: "Emma L.",
      rating: 5,
      improvement: "Found trigger foods",
    },
  ];

  const features = [
    "AI-powered pattern recognition",
    "Voice-activated logging",
    "Personalized insights in 3-7 days",
    "Export reports for your doctor",
    "24/7 support from nutrition experts",
  ];

  return (
    <section id="testimonials" ref={ref} className="relative min-h-screen flex items-center justify-center py-20">
      {/* Clear sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3 }}
        >
          {/* Gentle sun rays */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-radial from-yellow-300/30 to-transparent"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1.5, opacity: 1 } : {}}
            transition={{ duration: 3, delay: 0.5 }}
          />
          {/* Floating particles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
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
            <Heart className="h-12 w-12 text-red-400 mx-auto" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Week 3 Without Triggers:
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              This Could Be You
            </span>
          </h3>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands who've cleared the fog and discovered their best diet.
          </p>
          
          <div className="flex justify-center items-center mb-8">
            <motion.a
              href={MAIN_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 inline-block"
            >
              <span>{BUTTON_TEXTS.ctaPrimary}</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>

          {/* Temporarily commented out */}
          {/* <div className="flex items-center justify-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>10,000+ users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>4.9/5 rating</span>
            </div>
          </div> */}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-white text-lg mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <cite className="text-white/80 text-sm">— {testimonial.author}</cite>
                <span className="text-green-400 text-sm font-medium">
                  {testimonial.improvement}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Everything You Need to Find Your Triggers
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                <span className="text-white">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/90 text-lg mb-6">
            Ready to transform your relationship with food?
          </p>
          <motion.a
            href={MAIN_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-12 py-6 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
          >
            {BUTTON_TEXTS.ctaSecondary}
          </motion.a>
          <p className="text-white/60 text-sm mt-4">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;