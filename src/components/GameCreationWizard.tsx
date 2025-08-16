import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Palette, 
  Gamepad2,
  Wand2,
  Users,
  Sword,
  Shield,
  Zap,
  Crown,
  Target,
  Puzzle,
  Car,
  Spade,
  Rocket,
  Trophy,
  Play,
  User,
  Mountain,
  Music
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GameAssetSelection } from './GameAssetSelection';

interface GameCreationWizardProps {
  onComplete: (gameData: any) => void;
  onBack: () => void;
}
type Item = {
  id: string;
  name: string;
  preview?: string; // optional property
};
export function GameCreationWizard({ onComplete, onBack }: GameCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    genre: '',
    selectedAssets: {
      characters: [] as string[],
      backgrounds: [] as string[],
      audio: [] as string[]
    },
    selectedTemplate: null as null | {
      id: string;
      name: string;
      description: string;
      features: string[];
      image: string;
      icon: React.ElementType;
      color: string;
    }
  });

  const genres = [
    { id: 'action', name: 'Action', icon: Zap, color: 'bg-red-500', description: 'Fast-paced combat and movement' },
    { id: 'adventure', name: 'Adventure', icon: Users, color: 'bg-green-500', description: 'Exploration and story-driven' },
    { id: 'puzzle', name: 'Puzzle', icon: Sparkles, color: 'bg-blue-500', description: 'Logic and problem-solving' },
    { id: 'rpg', name: 'RPG', icon: Sword, color: 'bg-purple-500', description: 'Character progression and quests' },
    { id: 'platformer', name: 'Platformer', icon: Shield, color: 'bg-orange-500', description: 'Jump and run mechanics' },
    { id: 'strategy', name: 'Strategy', icon: Crown, color: 'bg-indigo-500', description: 'Planning and resource management' }
  ];

  const assetCategories = [
    {
      id: 'characters',
      name: '2D Characters',
      icon: User,
      items: [
        { id: 'char_knight', name: 'Knight', preview: '/assets/knight.png' },
        { id: 'char_wizard', name: 'Wizard',  preview: '/assets/wizard.png' },
        { id: 'char_ninja', name: 'Ninja', preview: '/assets/ninja.png'},
        { id: 'char_elf', name: 'Elf Archer', preview: '/assets/elf.png'},
      ]
    },
    {
      id: 'backgrounds',
      name: 'Backgrounds',
      icon: Mountain,
      items: [
        { id: 'bg_forest', name: 'Forest', preview: 'https://images.unsplash.com/photo-1605940169841-60884072a854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyZCUyMGdhbWUlMjBiYWNrZ3JvdW5kJTIwZm9yZXN0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NTA1NTY4OHww&ixlib=rb-4.1.0&q=80&w=1080' },
        { id: 'bg_castle', name: 'Castle', preview: 'https://images.unsplash.com/photo-1610610516700-9af1338c7b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyZCUyMGdhbWUlMjBiYWNrZ3JvdW5kJTIwY2FzdGxlJTIwbWVkaWV2YWx8ZW58MXx8fHwxNzU1MDU1Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
        { id: 'bg_space', name: 'Space', preview: 'https://images.unsplash.com/photo-1531956468651-8fc931f28a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyZCUyMGdhbWUlMjBiYWNrZ3JvdW5kJTIwc3BhY2UlMjBzdGFyc3xlbnwxfHx8fDE3NTUwNTU2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        { id: 'bg_cave', name: 'Cave', preview: 'https://images.unsplash.com/photo-1708856186498-754432f732c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyZCUyMGdhbWUlMjBiYWNrZ3JvdW5kJTIwZHVuZ2VvbiUyMGNhdmV8ZW58MXx8fHwxNzU1MDU1Njg5fDA&ixlib=rb-4.1.0&q=80&w=1080' }
      ]
    },
    {
      id: 'audio',
      name: 'Audio & SFX',
      icon: Music,
      items: [
        { id: 'audio_battle', name: 'Battle Theme' },
        { id: 'audio_ambient', name: 'Ambient' },
        { id: 'audio_victory', name: 'Victory Sound' },
        { id: 'audio_jump', name: 'Jump SFX' }
      ]
    }
  ];

  const gameTemplates = [
    {
      id: 'platformer',
      name: 'Side-Scrolling Platformer',
      description: 'Jump and run through levels, collect items, defeat enemies',
      image: 'https://images.unsplash.com/photo-1642678730255-40a9e1847fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF0Zm9ybWVyJTIwZ2FtZSUyMHRlbXBsYXRlJTIwc2NyZWVuc2hvdHxlbnwxfHx8fDE3NTUwNTU2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Physics-based movement', 'Collectible items', 'Enemy AI', 'Level progression'],
      icon: Target,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'puzzle',
      name: 'Match-3 Puzzle',
      description: 'Match colors and shapes to solve challenging puzzles',
      image: 'https://images.unsplash.com/photo-1655704705321-3ac52dc67f70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXp6bGUlMjBnYW1lJTIwdGVtcGxhdGUlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTUwNTU2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Match mechanics', 'Score system', 'Power-ups', 'Challenging levels'],
      icon: Puzzle,
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'rpg',
      name: 'Fantasy RPG Adventure',
      description: 'Epic quests with character progression and storyline',
      image: 'https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhycGclMjBnYW1lJTIwdGVtcGxhdGUlMjBmYW50YXN5fGVufDF8fHx8MTc1NTA1NTY5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Character leveling', 'Quest system', 'Inventory', 'Story dialogue'],
      icon: Sword,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'racing',
      name: 'High-Speed Racing',
      description: 'Race against time and opponents on various tracks',
      image: 'https://images.unsplash.com/photo-1518565461527-e8c70d55cc8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBnYW1lJTIwdGVtcGxhdGUlMjB0cmFja3xlbnwxfHx8fDE3NTUwNTU2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Vehicle physics', 'Multiple tracks', 'Time trials', 'Leaderboards'],
      icon: Car,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'shooter',
      name: 'Space Shooter',
      description: 'Defend against alien invasion with powerful weapons',
      image: 'https://images.unsplash.com/photo-1617567918434-eb2aa041994e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9vdGVyJTIwZ2FtZSUyMHRlbXBsYXRlJTIwYWN0aW9ufGVufDF8fHx8MTc1NTA1NTY5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Bullet patterns', 'Weapon upgrades', 'Boss battles', 'Wave survival'],
      icon: Zap,
      color: 'from-red-500 to-purple-500'
    },
    {
      id: 'adventure',
      name: 'Treasure Hunt Adventure',
      description: 'Explore mysterious lands and discover hidden treasures',
      image: 'https://images.unsplash.com/photo-1546444260-f7b875feea39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBnYW1lJTIwdGVtcGxhdGUlMjBleHBsb3JhdGlvbnxlbnwxfHx8fDE3NTUwNTU2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Open world', 'Hidden secrets', 'Puzzle solving', 'Resource gathering'],
      icon: Users,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'strategy',
      name: 'Tower Defense Strategy',
      description: 'Build defenses and strategically defeat enemy waves',
      image: 'https://images.unsplash.com/photo-1603037833672-35f4d722d5db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMGdhbWUlMjB0ZW1wbGF0ZSUyMGNoZXNzfGVufDF8fHx8MTc1NTA1NTY5OXww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Tower building', 'Resource management', 'Wave mechanics', 'Strategy planning'],
      icon: Shield,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'arcade',
      name: 'Retro Arcade Classic',
      description: 'Classic arcade-style gameplay with modern twist',
      image: 'https://images.unsplash.com/photo-1598607664980-8d8b77eecbfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNhZGUlMjBnYW1lJTIwdGVtcGxhdGUlMjByZXRyb3xlbnwxfHx8fDE3NTUwNTU3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['High score system', 'Power-ups', 'Endless gameplay', 'Retro aesthetics'],
      icon: Gamepad2,
      color: 'from-pink-500 to-orange-500'
    },
    {
      id: 'cardgame',
      name: 'Strategic Card Battle',
      description: 'Collect cards and battle with strategic deck building',
      image: 'https://images.unsplash.com/photo-1566234679866-1af32d9b411e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkJTIwZ2FtZSUyMHRlbXBsYXRlJTIwcG9rZXJ8ZW58MXx8fHwxNzU1MDU1NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Deck building', 'Card collection', 'Turn-based combat', 'Multiplayer battles'],
      icon: Spade,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(gameData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const selectGenre = (genreId: string) => {
    setGameData({ ...gameData, genre: genreId });
  };

  const toggleAsset = (category: string, assetId: string) => {
    setGameData(prev => ({
      ...prev,
      selectedAssets: {
        ...prev.selectedAssets,
        [category]: prev.selectedAssets[category as keyof typeof prev.selectedAssets].includes(assetId)
          ? prev.selectedAssets[category as keyof typeof prev.selectedAssets].filter(id => id !== assetId)
          : [...prev.selectedAssets[category as keyof typeof prev.selectedAssets], assetId]
      }
    }));
  };

  const selectTemplate = (templateId: string) => {
    const template = gameTemplates.find(t => t.id === templateId) || null;
    setGameData({ ...gameData, selectedTemplate: template });
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto pt-4 px-2 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex flex-row items-center justify-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ">
                Create Your Game
              </h1>
              <p className="text-xl text-gray-600">
                Build your dream game in 3 simple steps
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 max-w-md" style ={{ minWidth: '200px' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Idea & Genre */}
            {currentStep === 1 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-2 border-white/50">
                <CardHeader className="text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="text-3xl flex items-center justify-center gap-3">
                    <Sparkles className="h-8 w-8" />
                    Idea & Genre
                  </CardTitle>
                  <p className="text-lg opacity-90">Tell us about your game vision</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xl mb-4 text-gray-700">Game Title</label>
                      <Input
                        placeholder="Enter your game title..."
                        value={gameData.title}
                        onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
                        className="text-lg bg-white/90 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xl mb-4 text-gray-700">Game Description</label>
                      <Textarea
                        placeholder="Describe your game idea... (e.g., A magical adventure where players collect crystals to save the kingdom)"
                        value={gameData.description}
                        onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
                        className="min-h-[120px] text-lg bg-white/90 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xl mb-6 text-gray-700">Choose a Genre:</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {genres.map((genre, index) => (
                          <motion.div
                            key={genre.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => selectGenre(genre.id)}
                            className={`
                              cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 text-center
                              ${gameData.genre === genre.id
                                ? 'border-indigo-500 bg-indigo-50 shadow-lg ring-4 ring-indigo-200'
                                : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
                              }
                            `}
                          >
                            <div className={`inline-flex p-4 rounded-full mb-4 ${genre.color} text-white`}>
                              <genre.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg mb-2 text-gray-800">{genre.name}</h3>
                            <p className="text-sm text-gray-600">{genre.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Asset Creation */}
            {currentStep === 2 && (
              <GameAssetSelection
                assetCategories={assetCategories}
                gameData={gameData}
                toggleAsset={toggleAsset}
              />
            )}

            {/* Step 3: Template Selection */}
            {currentStep === 3 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-2 border-white/50">
                <CardHeader className="text-center bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-t-lg">
                  <CardTitle className="text-3xl flex items-center justify-center gap-3">
                    <Gamepad2 className="h-8 w-8" />
                    Game Template
                  </CardTitle>
                  <p className="text-lg opacity-90">Choose a template to start with</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gameTemplates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        onClick={() => selectTemplate(template.id)}
                        className={`
                          cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 group
                          ${gameData.selectedTemplate?.id === template.id
                            ? 'border-pink-500 shadow-xl ring-4 ring-pink-200'
                            : 'border-gray-200 hover:border-pink-300 hover:shadow-lg'
                          }
                        `}
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={template.image}
                            alt={template.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {gameData.selectedTemplate?.id === template.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-4 right-4 bg-pink-500 text-white rounded-full p-2"
                            >
                              ✓
                            </motion.div>
                          )}

                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color}`}>
                                <template.icon className="h-5 w-5 text-white" />
                              </div>
                              <h3 className="text-white font-semibold">{template.name}</h3>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 bg-white">
                          <p className="text-gray-600 mb-4">{template.description}</p>
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                            {template.features.slice(0, 3).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                            {template.features.length > 3 && (
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">+{template.features.length - 3} more features</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {gameData.selectedTemplate && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Trophy className="h-6 w-6 text-green-600" />
                        <h4 className="text-lg font-semibold text-gray-800">Template Ready!</h4>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Your {gameData.selectedTemplate?.name} template includes all the core mechanics needed to start building your game.
                      </p>
                      <div className="flex items-center gap-2">
                        <Play className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-600">Ready to create your game with this template</span>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mt-8"
        >
          <Button
            onClick={prevStep}
            variant="outline"
            size="lg"
            className="px-8 py-4"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {currentStep === 1 ? 'Back to Home' : 'Previous'}
          </Button>

          <Button
            onClick={nextStep}
            size="lg"
            disabled={
              (currentStep === 1 && (!gameData.title || !gameData.description || !gameData.genre)) ||
              (currentStep === 2 && Object.values(gameData.selectedAssets).every(arr => arr.length === 0))
              // removed template selection check for step 3
            }
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {currentStep === 3 ? (
              <>
                <Rocket className="mr-2 h-5 w-5" />
                Create Game
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}