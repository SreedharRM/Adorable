import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Play, Sparkles, Users, Zap, Gamepad2, Brush, Code, Rocket, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import SpriteAnimation from './ui/SpriteAnimation';

interface LandingPageProps {
  onStartCreating: () => void;
}

export function LandingPage({ onStartCreating }: LandingPageProps) {
  const [activeStep, setActiveStep] = useState(0);

  // Popup state
  const [showGame, setShowGame] = useState(false);
  const [selectedGameUrl, setSelectedGameUrl] = useState<string | null>(null);

  const handleGameClick = (url: string) => {
    setSelectedGameUrl(url);
    setShowGame(true);
  };

  const closeGame = () => {
    setShowGame(false);
    setSelectedGameUrl(null);
  };

  const showcaseGames = [
    {
      id: 1,
      title: "YC Sprint Game",
      genre: "2D Platform",
      image: "/assets/ycimage.png",
      creator: "Dev",
      plays: "New",
      gameUrl: "https://stellar-starship-6f712e.netlify.app/"
    },
    {
      id: 2,
      title: "Morph Rescue",
      genre: "Puzzle",
      image: "/assets/morph.png",
      creator: "Dev",
      plays: "8.7k",
      gameUrl: "https://morph-game-ap3x.vercel.app/"
    },
    {
      id: 3,
      title: "Neon Space Runner",
      genre: "Arcade",
      image: "https://images.unsplash.com/photo-1650314200456-a19942fd1c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      creator: "NeonDev",
      plays: "15.1k"
    },
    {
      id: 4,
      title: "Block Puzzle Master",
      genre: "Puzzle",
      image: "https://images.unsplash.com/photo-1610213880945-9b020ccc2843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      creator: "PuzzleWiz",
      plays: "9.4k"
    }
  ];

  const steps = [
    {
      icon: Sparkles,
      title: "Describe Your Vision",
      description: "Tell our AI what kind of game you want to create"
    },
    {
      icon: Brush,
      title: "AI Generates Assets",
      description: "Watch as characters, levels, and sounds come to life"
    },
    {
      icon: Gamepad2,
      title: "Play & Share",
      description: "Test your game instantly and share it with the world"
    }
  ];

  // Auto-cycle steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
     <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">

    {/* Background video */}
      <video
        src="/assets/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="inset-0 w-full h-screen object-cover absolute"
      />

    <motion.div  
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-2 sm:px-4 py-16 max-w-none relative z-10"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              <Gamepad2 className="h-12 w-12 text-purple-600" />
              <h1 className="text-5xl" style={{ color: 'black' }}>GameSpecter</h1>
            </div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl text-gray-600 mb-8"
            >
              Create Amazing Games with the Power of AI
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              onClick={onStartCreating}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Rocket className="mr-3 h-6 w-6" />
              Start Creating
            </Button>
          </motion.div>
        </div>

        {/* Game Showcase */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20 px-2"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Games Made with GameSpecter
            </h2>
            <p className="text-xl text-gray-600">
              See what creators around the world have built
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {showcaseGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group cursor-pointer"
                onClick={() => game.gameUrl && handleGameClick(game.gameUrl)}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-200 bg-white/70 backdrop-blur-sm">
                  <div className="relative">
                    <ImageWithFallback
                      src={game.image}
                      alt={game.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800">
                        {game.genre}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg mb-1">{game.title}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <span>by {game.creator}</span>
                        <div className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          {game.plays}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
            

        {/* Popup with iframe */}
        <AnimatePresence>
          {showGame && selectedGameUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative bg-white rounded-lg overflow-hidden shadow-2xl w-[90%] h-[90%]"
              >
                <button
                  className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                  onClick={closeGame}
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
                <iframe
                  src={selectedGameUrl}
                  title="Game Preview"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="px-2 pt-2"
        >
          <div className="text-center mb-12 mt-12">
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              From idea to playable game in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center relative"
              >
                <Card className={`
                  p-8 h-full bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 border-2 relative overflow-hidden
                  ${activeStep === index 
                    ? 'border-blue-400 bg-gradient-to-br from-blue-50/80 to-purple-50/80 scale-105 shadow-2xl' 
                    : 'hover:border-blue-200'
                  }
                `}>
                  <CardContent className="p-0 relative">
                    <div className="mb-6 relative">
                      <motion.div 
                        className={`
                          inline-flex p-4 rounded-full mb-4 transition-all duration-500
                          ${activeStep === index 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                            : 'bg-gradient-to-br from-blue-100 to-purple-100'
                          }
                        `}
                        animate={activeStep === index ? { 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <step.icon className={`h-8 w-8 transition-colors duration-500 ${
                          activeStep === index ? 'text-white' : 'text-blue-600'
                        }`} />
                      </motion.div>
                      
                      {/* Animated Step Number */}
                      <motion.div 
                        className="absolute -top-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center text-sm"
                        animate={activeStep === index ? {
                          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                          scale: [1, 1.2, 1],
                          boxShadow: ['0 4px 15px rgba(139, 92, 246, 0.4)', '0 8px 25px rgba(139, 92, 246, 0.6)', '0 4px 15px rgba(139, 92, 246, 0.4)']
                        } : {
                          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                          scale: 1,
                          boxShadow: '0 2px 8px rgba(168, 85, 247, 0.3)'
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.span 
                          className="text-white"
                          animate={activeStep === index ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {index + 1}
                        </motion.span>
                      </motion.div>

                      {/* Progress line for active step */}
                      <AnimatePresence>
                        {activeStep === index && (
                          <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <motion.h3 
                      className={`text-xl mb-4 transition-colors duration-500 ${
                        activeStep === index ? 'text-blue-700' : 'text-gray-800'
                      }`}
                      animate={activeStep === index ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    <motion.p 
                      className={`transition-colors duration-500 ${
                        activeStep === index ? 'text-blue-600' : 'text-gray-600'
                      }`}
                      animate={activeStep === index ? { opacity: [0.8, 1, 0.8] } : { opacity: 1 }}
                      transition={{ duration: 2 }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Sparkle effect for active step */}
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 pointer-events-none"
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ 
                                opacity: [0, 1, 0], 
                                scale: [0, 1, 0],
                                x: Math.random() * 200 - 100,
                                y: Math.random() * 200 - 100
                              }}
                              transition={{ 
                                duration: 2, 
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatDelay: 1
                              }}
                              className="absolute w-1 h-1 bg-purple-400 rounded-full"
                              style={{
                                left: '50%',
                                top: '50%'
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Step Progress Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeStep === index ? 'bg-blue-500 w-8' : 'bg-gray-300'
                }`}
                animate={activeStep === index ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-center mt-20 py-16 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-3xl mx-2"
        >
          <div className="text-white">
            <h2 className="text-4xl mb-6">Ready to Build Your Dream Game?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of creators who've brought their visions to life
            </p>
            <Button
              onClick={onStartCreating}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Start Creating Now
            </Button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
