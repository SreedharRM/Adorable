import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Upload, 
  Wand2, 
  Image, 
  Music, 
  Layers,
  Download,
  Heart,
  Star,
  Filter,
  Grid3X3,
  List,
  Plus,
  Sparkles,
  Palette,
  Volume2,
  Play,
  Pause,
  User,
  Mountain,
  Users
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import SpriteAnimation from './ui/SpriteAnimation';

interface AssetLibraryProps {
  onBack: () => void;
}

export function AssetLibrary({ onBack }: AssetLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('characters');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [generatingCharacter, setGeneratingCharacter] = useState(false);
  const [showCharacterGenerator, setShowCharacterGenerator] = useState(false); // NEW

  const categories = [
    { id: 'characters', name: '2D Characters', icon: User, count: 4 },
    { id: 'backgrounds', name: 'Backgrounds', icon: Mountain, count: 4 },
    { id: 'audio', name: 'Audio & SFX', icon: Music, count: 4 }
  ];

  const characterAssets = [
    {
      id: 'char_1',
      name: 'Medieval Knight',
      type: 'character',
      category: 'characters',
      image: 'knight.png',
      animations: ['Idle', 'Walk', 'Attack', 'Die'],
      size: '64x64',
      format: 'PNG',
      downloads: 1843,
      rating: 4.9,
      tags: ['knight', 'warrior', 'medieval', 'armor']
    },
    {
      id: 'char_2',
      name: 'Fire Wizard',
      type: 'character',
      category: 'characters',
      image: 'wizard.png',
      animations: ['Idle', 'Walk', 'Cast', 'Teleport'],
      size: '64x64',
      format: 'PNG',
      downloads: 1567,
      rating: 4.8,
      tags: ['wizard', 'mage', 'fire', 'magic']
    },
    {
      id: 'char_3',
      name: 'Shadow Player',
      type: 'character',
      category: 'characters',
      image: 'ninja.png',
      animations: ['Idle', 'Run', 'Attack', 'Stealth'],
      size: '64x64',
      format: 'PNG',
      downloads: 2134,
      rating: 4.7,
      tags: ['ninja', 'rogue', 'stealth', 'shadow']
    },
    {
      id: 'char_4',
      name: 'Dark Elf',
      type: 'character',
      category: 'characters',
      image: 'elf.png',
      animations: ['Idle', 'Walk', 'Shoot', 'Aim'],
      size: '64x64',
      format: 'PNG',
      downloads: 987,
      rating: 4.6,
      tags: ['elf', 'archer', 'bow', 'ranger']
    }
  ];

  const backgroundAssets = [
    {
      id: 'bg_1',
      name: 'Enchanted Forest',
      type: 'background',
      category: 'backgrounds',
      image: 'https://images.unsplash.com/photo-1605940169841-60884072a854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyZCUyMGdhbWUlMjBiYWNrZ3JvdW5kJTIwZm9yZXN0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NTA1NTY4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      size: '1920x1080',
      format: 'JPG',
      downloads: 1456,
      rating: 4.8,
      tags: ['forest', 'nature', 'trees', 'mystical']
    },
    {
      id: 'bg_2',
      name: 'Ancient Castle',
      type: 'background',
      category: 'backgrounds',
      image: 'https://images.unsplash.com/photo-1610610516700-9af1338c7b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyZCUyMGdhbWUlMjBiYWNrZ3JvdW5kJTIwY2FzdGxlJTIwbWVkaWV2YWx8ZW58MXx8fHwxNzU1MDU1Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      size: '1920x1080',
      format: 'JPG',
      downloads: 2145,
      rating: 4.9,
      tags: ['castle', 'medieval', 'stone', 'fortress']
    },
    {
      id: 'bg_3',
      name: 'Space Nebula',
      type: 'background',
      category: 'backgrounds',
      image: 'https://images.unsplash.com/photo-1531956468651-8fc931f28a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyZCUyMGdhbWUlMjBiYWNrZ3JvdW5kJTIwc3BhY2UlMjBzdGFyc3xlbnwxfHx8fDE3NTUwNTU2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      size: '1920x1080',
      format: 'JPG',
      downloads: 1789,
      rating: 4.7,
      tags: ['space', 'stars', 'nebula', 'cosmic']
    },
    {
      id: 'bg_4',
      name: 'Dark Cavern',
      type: 'background',
      category: 'backgrounds',
      image: 'https://images.unsplash.com/photo-1708856186498-754432f732c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwyZCUyMGdhbWUlMjBiYWNrZ3JvdW5kJTIwZHVuZ2VvbiUyMGNhdmV8ZW58MXx8fHwxNzU1MDU1Njg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      size: '1920x1080',
      format: 'JPG',
      downloads: 1023,
      rating: 4.5,
      tags: ['cave', 'dungeon', 'dark', 'underground']
    }
  ];

  const audioAssets = [
    {
      id: 'audio_1',
      name: 'Epic Battle Theme',
      type: 'audio',
      category: 'audio',
      duration: '2:45',
      format: 'MP3',
      downloads: 3241,
      rating: 4.9,
      tags: ['battle', 'epic', 'orchestral', 'dramatic']
    },
    {
      id: 'audio_2',
      name: 'Sword Clash SFX',
      type: 'audio',
      category: 'audio',
      duration: '0:03',
      format: 'WAV',
      downloads: 2867,
      rating: 4.8,
      tags: ['sword', 'metal', 'clash', 'combat']
    },
    {
      id: 'audio_3',
      name: 'Magic Spell Cast',
      type: 'audio',
      category: 'audio',
      duration: '0:02',
      format: 'WAV',
      downloads: 1934,
      rating: 4.7,
      tags: ['magic', 'spell', 'mystical', 'power']
    },
    {
      id: 'audio_4',
      name: 'Forest Ambience',
      type: 'audio',
      category: 'audio',
      duration: '5:00',
      format: 'MP3',
      downloads: 1567,
      rating: 4.6,
      tags: ['nature', 'ambient', 'peaceful', 'birds']
    }
  ];

  const allAssets = [...characterAssets, ...backgroundAssets, ...audioAssets];

  const filteredAssets = allAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = asset.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAudio = (assetId: string) => {
    setPlayingAudio(playingAudio === assetId ? null : assetId);
  };

  const generate2DCharacter = () => {
    setGeneratingCharacter(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratingCharacter(false);
      // Mock adding a new generated character
      console.log('Generated new 2D character!');
    }, 3000);
  };

  // Update button handler
  const handleOpenCharacterGenerator = () => {
    setShowCharacterGenerator(true);
  };

  if (showCharacterGenerator) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Title and Button */}
      <div
        style={{
          padding: "1rem",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: 0
          }}
        >
          2D Character Generator
        </h2>
        <button
          style={{
            padding: "0.5rem 1.25rem",
            background: "linear-gradient(90deg,#7c3aed,#38bdf8)",
            color: "#fff",
            border: "none",
            borderRadius: "0.375rem",
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
          }}
          onClick={() => {
            const iframe = document.getElementById(
              "character-generator-iframe"
            ) as HTMLIFrameElement;
            if (iframe) iframe.contentWindow?.location.reload();
          }}
        >
          Create 2D Character
        </button>
      </div>

        {/* Iframe */}
        <div style={{ flex: 1 }}>
          <iframe
            id="character-generator-iframe"
            src="/Universal-LPC-Spritesheet-Character-Generator/sprite.html"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="2D Character Generator"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto p-2 sm:p-4 lg:p-6 pt-4 max-w-none">

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Asset Library
            </h1>
            <p className="text-xl text-gray-600">2D game assets ready for your projects</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Asset
            </Button>
            {/**
            
            <Button
              onClick={handleOpenCharacterGenerator} // UPDATED
              disabled={generatingCharacter}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Wand2 className={`mr-2 h-5 w-5 ${generatingCharacter ? 'animate-spin' : ''}`} />
              {generatingCharacter ? 'Generating...' : 'AI Generate 2D Character'}
            </Button>**/}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Categories */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-80 shrink-0"
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-white/50 mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Asset Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setActiveCategory(category.id)}
                      className={`
                        w-full flex items-center gap-3 p-4 text-left transition-all duration-200 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg
                        ${activeCategory === category.id ? 'bg-gradient-to-r from-green-50 to-blue-50 border-r-4 border-green-500' : ''}
                      `}
                    >
                      <category.icon className={`h-6 w-6 ${activeCategory === category.id ? 'text-green-600' : 'text-gray-500'}`} />
                      <div className="flex-1">
                        <div className={`font-semibold ${activeCategory === category.id ? 'text-green-700' : 'text-gray-700'}`}>
                          {category.name}
                        </div>
                        <div className="text-sm text-gray-500">{category.count} assets</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 2D Character AI Generator Panel */}
            {activeCategory === 'characters' && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      2D Character Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Create custom 2D characters with AI
                    </p>
                    <div className="space-y-3">
                      <Input
                        placeholder="e.g., steampunk robot warrior"
                        className="bg-white/80 border-purple-200 focus:border-purple-400"
                      />
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                          Warrior
                        </Button>
                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                          Mage
                        </Button>
                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                          Rogue
                        </Button>
                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
                          Archer
                        </Button>
                      </div>
                      <Button 
                        onClick={generate2DCharacter}
                        disabled={generatingCharacter}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Wand2 className={`mr-2 h-4 w-4 ${generatingCharacter ? 'animate-spin' : ''}`} />
                        {generatingCharacter ? 'Creating Character...' : 'Generate Character'}
                      </Button>
                    </div>
                    
                    {generatingCharacter && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/80 rounded-lg p-3 border border-purple-200"
                      >
                        <div className="flex items-center gap-2 text-sm text-purple-700">
                          <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                          AI is creating your character...
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder={`Search ${activeCategory}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/90 border-gray-200 focus:border-green-300 focus:ring-green-200"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-green-100 text-green-700' : ''}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-green-100 text-green-700' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Assets Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200 bg-white/90 backdrop-blur-sm">
                      <div className="relative">
                        {asset.type === 'audio' ? (
                          <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Button
                              onClick={() => toggleAudio(asset.id)}
                              size="lg"
                              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                            >
                              {playingAudio === asset.id ? (
                                <Pause className="h-8 w-8" />
                              ) : (
                                <Play className="h-8 w-8" />
                              )}
                            </Button>
                          </div>
                        ) : asset.type === 'character' ? (
                          <div className="flex items-center justify-center h-48 bg-gray-100">
                            <SpriteAnimation src={`/assets/${(asset as { image: string }).image}`}  className="w-24 h-24"/>
                          </div>
                        ) : (
                          // Only render ImageWithFallback if asset has an image property
                          'image' in asset ? (
                            <ImageWithFallback
                              src={asset.image}
                              alt={asset.name}
                              className="w-full h-full object-cover"
                            />
                          ) : null
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Badge className="bg-white/90 text-gray-800">
                            {asset.format}
                          </Badge>
                          {asset.type === 'character' && (
                            <Badge className="bg-green-500 text-white">
                              2D
                            </Badge>
                          )}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="bg-white/90 text-gray-800 hover:bg-white"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 truncate">{asset.name}</h3>
                        
                        {asset.type === 'character' && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-600 mb-1">Animations:</p>
                            <div className="flex flex-wrap gap-1">
                              {(asset as any).animations.slice(0, 2).map((anim: string) => (
                                <Badge key={anim} variant="secondary" className="text-xs">
                                  {anim}
                                </Badge>
                              ))}
                              {(asset as any).animations.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{(asset as any).animations.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{asset.rating}</span>
                          </div>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{asset.downloads} downloads</span>
                        </div>

                        <div className="text-xs text-gray-600 mb-3">
                          {asset.type === 'audio' ? (asset as { duration: string }).duration
  : (asset as { size: string }).size}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {asset.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {asset.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{asset.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            {asset.type === 'audio' ? (
                              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <Volume2 className="h-8 w-8 text-white" />
                              </div>
                            ) : (
                              // Only render ImageWithFallback if asset has an image property
                              'image' in asset ? (
                                <ImageWithFallback
                                  src={asset.image}
                                  alt={asset.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : null
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800">{asset.name}</h3>
                              <Badge className="bg-gray-100 text-gray-700">
                                {asset.format}
                              </Badge>
                              {asset.type === 'character' && (
                                <Badge className="bg-green-500 text-white">
                                  2D Character
                                </Badge>
                              )}
                            </div>
                            
                            {asset.type === 'character' && (
                              <div className="mb-2">
                                <span className="text-sm text-gray-600">Animations: </span>
                                {(asset as any).animations.join(', ')}
                              </div>
                            )}
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span>{asset.type === 'audio' ? (asset as { duration: string }).duration
  : (asset as { size: string }).size}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {asset.rating}
                              </div>
                              <span>{asset.downloads} downloads</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {asset.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {asset.type === 'audio' && (
                              <Button
                                onClick={() => toggleAudio(asset.id)}
                                variant="outline"
                                size="sm"
                              >
                                {playingAudio === asset.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add to Project
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}