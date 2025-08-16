import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionEffectProps {
  variant?: 'landing' | 'dashboard' | 'wizard' | 'editor' | 'assets';
}

export function PageTransitionEffect({ variant = 'landing' }: PageTransitionEffectProps) {
  const getVariantConfig = () => {
    switch (variant) {
      case 'landing':
        return {
          colors: ['rgba(168, 85, 247, 0.08)', 'rgba(59, 130, 246, 0.06)', 'rgba(236, 72, 153, 0.08)'],
          particleCount: 8,
          duration: 25,
        };
      case 'dashboard':
        return {
          colors: ['rgba(59, 130, 246, 0.06)', 'rgba(168, 85, 247, 0.05)', 'rgba(34, 211, 238, 0.07)'],
          particleCount: 6,
          duration: 20,
        };
      case 'wizard':
        return {
          colors: ['rgba(99, 102, 241, 0.06)', 'rgba(168, 85, 247, 0.05)', 'rgba(236, 72, 153, 0.06)'],
          particleCount: 10,
          duration: 18,
        };
      case 'editor':
        return {
          colors: ['rgba(34, 197, 94, 0.05)', 'rgba(59, 130, 246, 0.05)', 'rgba(168, 85, 247, 0.04)'],
          particleCount: 4,
          duration: 30,
        };
      case 'assets':
        return {
          colors: ['rgba(34, 211, 238, 0.06)', 'rgba(59, 130, 246, 0.05)', 'rgba(168, 85, 247, 0.05)'],
          particleCount: 7,
          duration: 22,
        };
      default:
        return {
          colors: ['rgba(168, 85, 247, 0.08)', 'rgba(59, 130, 246, 0.06)', 'rgba(236, 72, 153, 0.08)'],
          particleCount: 8,
          duration: 25,
        };
    }
  };

  const config = getVariantConfig();
  
  const floatingElements = Array.from({ length: config.particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 30,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    color: config.colors[i % config.colors.length],
    duration: config.duration + Math.random() * 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={`transition-${element.id}`}
          className="absolute rounded-full filter blur-2xl"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
            left: `${element.initialX}%`,
            top: `${element.initialY}%`,
          }}
          animate={{
            x: ['-50px', '50px', '-30px'],
            y: ['-30px', '40px', '-20px'],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.3, 0.7, 0.4, 0.3],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Page-specific accent animations */}
      {variant === 'landing' && (
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-300/10 to-blue-300/10 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {variant === 'dashboard' && (
        <>
          <motion.div
            className="absolute top-10 left-10 w-2 h-2 bg-blue-400/40 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-3 h-3 bg-purple-400/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 2,
            }}
          />
        </>
      )}

      {variant === 'wizard' && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, 
              rgba(168, 85, 247, 0.02) 0deg, 
              rgba(99, 102, 241, 0.03) 120deg, 
              rgba(236, 72, 153, 0.02) 240deg, 
              rgba(168, 85, 247, 0.02) 360deg
            )`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
}