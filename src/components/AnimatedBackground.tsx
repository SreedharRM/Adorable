import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  // Generate random positions and properties for floating elements
  const floatingShapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    color: ['purple', 'blue', 'pink', 'indigo', 'cyan'][Math.floor(Math.random() * 5)],
  }));

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
  }));

  const orbs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 200 + 100,
    initialX: Math.random() * 120 - 10, // Allow some overflow
    initialY: Math.random() * 120 - 10,
    duration: Math.random() * 25 + 20,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.1 + 0.05,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Wave Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
            `,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      </div>

      {/* Moving Gradient Orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full filter blur-3xl"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.initialX}%`,
            top: `${orb.initialY}%`,
            opacity: orb.opacity,
            background: `radial-gradient(circle, 
              rgba(168, 85, 247, 0.4) 0%, 
              rgba(59, 130, 246, 0.3) 40%, 
              rgba(236, 72, 153, 0.2) 70%,
              transparent 100%
            )`,
          }}
          animate={{
            x: ['-20px', '20px', '-20px'],
            y: ['-30px', '30px', '-30px'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={`shape-${shape.id}`}
          className="absolute"
          style={{
            left: `${shape.initialX}%`,
            top: `${shape.initialY}%`,
          }}
          animate={{
            x: ['-100px', '100px', '-100px'],
            y: ['-50px', '80px', '-50px'],
            rotate: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'linear',
          }}
        >
          {shape.id % 4 === 0 && (
            <motion.div
              className={`w-${Math.floor(shape.size/4)} h-${Math.floor(shape.size/4)} bg-${shape.color}-200/20 rounded-full`}
              style={{
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                backgroundColor: `rgb(${shape.color === 'purple' ? '168, 85, 247' : 
                  shape.color === 'blue' ? '59, 130, 246' : 
                  shape.color === 'pink' ? '236, 72, 153' : 
                  shape.color === 'indigo' ? '99, 102, 241' : '34, 211, 238'}, 0.15)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: shape.delay * 0.5,
              }}
            />
          )}
          
          {shape.id % 4 === 1 && (
            <motion.div
              className="border-2 border-opacity-20"
              style={{
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                borderColor: `rgb(${shape.color === 'purple' ? '168, 85, 247' : 
                  shape.color === 'blue' ? '59, 130, 246' : 
                  shape.color === 'pink' ? '236, 72, 153' : 
                  shape.color === 'indigo' ? '99, 102, 241' : '34, 211, 238'}, 0.2)`,
              }}
              animate={{
                rotate: [0, -360],
                borderRadius: ['0%', '50%', '0%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            />
          )}
          
          {shape.id % 4 === 2 && (
            <motion.div
              style={{
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                background: `linear-gradient(45deg, 
                  rgb(${shape.color === 'purple' ? '168, 85, 247' : 
                    shape.color === 'blue' ? '59, 130, 246' : 
                    shape.color === 'pink' ? '236, 72, 153' : 
                    shape.color === 'indigo' ? '99, 102, 241' : '34, 211, 238'}, 0.1),
                  transparent 70%
                )`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
              animate={{
                rotate: [0, 120, 240, 360],
                scale: [1, 0.8, 1.2, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
              }}
            />
          )}
          
          {shape.id % 4 === 3 && (
            <motion.div
              style={{
                width: `${shape.size}px`,
                height: `${shape.size * 0.6}px`,
                background: `linear-gradient(90deg, 
                  transparent,
                  rgb(${shape.color === 'purple' ? '168, 85, 247' : 
                    shape.color === 'blue' ? '59, 130, 246' : 
                    shape.color === 'pink' ? '236, 72, 153' : 
                    shape.color === 'indigo' ? '99, 102, 241' : '34, 211, 238'}, 0.15),
                  transparent
                )`,
                borderRadius: '50px',
              }}
              animate={{
                rotate: [0, 180, 360],
                scaleX: [1, 1.5, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Particle Effect */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute bg-white/30 rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            x: ['-200px', '200px'],
            y: ['-100px', '150px'],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Flowing Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.1)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.15)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.1)" />
          </linearGradient>
          <linearGradient id="line-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.1)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.15)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M-50,100 Q200,50 450,120 T900,100"
          stroke="url(#line-gradient-1)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          animate={{
            d: [
              "M-50,100 Q200,50 450,120 T900,100",
              "M-50,120 Q200,80 450,90 T900,140",
              "M-50,100 Q200,50 450,120 T900,100"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M-50,300 Q300,250 600,280 T1200,300"
          stroke="url(#line-gradient-2)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
          animate={{
            d: [
              "M-50,300 Q300,250 600,280 T1200,300",
              "M-50,280 Q300,320 600,250 T1200,280",
              "M-50,300 Q300,250 600,280 T1200,300"
            ]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.path
          d="M-50,500 Q400,450 800,480 T1400,500"
          stroke="url(#line-gradient-1)"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          animate={{
            d: [
              "M-50,500 Q400,450 800,480 T1400,500",
              "M-50,520 Q400,480 800,520 T1400,480",
              "M-50,500 Q400,450 800,480 T1400,500"
            ]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </svg>

      {/* Interactive Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Static base layer for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-pink-50/30" />
    </div>
  );
}