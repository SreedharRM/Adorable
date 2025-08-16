import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  MessageSquare, 
  Play, 
  Pause, 
  Square, 
  Save, 
  Share,
  Settings,
  Layers,
  Music,
  Image,
  Code,
  Undo,
  Redo,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Monitor,
  Smartphone,
  Tablet,
  Send,
  Sparkles,
  Zap,
  Plus
} from 'lucide-react';
import { Textarea } from './ui/textarea';

interface GameEditorProps {
  gameData: any;
  onSave: () => void;
  onBack: () => void;
}

export function GameEditor({ gameData, onSave, onBack }: GameEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showLayers, setShowLayers] = useState(true);
  const [aiCommand, setAiCommand] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'ai', message: 'Welcome to the Game Editor! I can help you add features, modify levels, or adjust gameplay. What would you like to do first?' }
  ]);

  const layers = [
    { id: 'background', name: 'Background', visible: true, locked: false },
    { id: 'platforms', name: 'Platforms', visible: true, locked: false },
    { id: 'enemies', name: 'Enemies', visible: true, locked: false },
    { id: 'collectibles', name: 'Collectibles', visible: true, locked: false },
    { id: 'player', name: 'Player', visible: true, locked: true },
    { id: 'ui', name: 'UI Elements', visible: true, locked: false }
  ];

  const assetCategories = [
    { id: 'sprites', name: 'Sprites', icon: Image, count: 24 },
    { id: 'backgrounds', name: 'Backgrounds', icon: Layers, count: 12 },
    { id: 'audio', name: 'Audio', icon: Music, count: 18 },
    { id: 'scripts', name: 'Scripts', icon: Code, count: 6 }
  ];

  const handlePlayTest = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAICommand = () => {
    if (aiCommand.trim()) {
      setChatHistory([...chatHistory, 
        { type: 'user', message: aiCommand },
        { type: 'ai', message: `I'll help you ${aiCommand.toLowerCase()}. Let me generate the necessary assets and code...` }
      ]);
      setAiCommand('');
      // Mock AI processing animation
      setTimeout(() => {
        setChatHistory(prev => [...prev, 
          { type: 'ai', message: '✨ Done! I\'ve added the requested feature to your game. You can see the changes in the editor.' }
        ]);
      }, 2000);
    }
  };

  const getViewportWidth = () => {
    switch (currentView) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-6xl';
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Top Toolbar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 border-b border-gray-700 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                ← Back
              </Button>
              <div>
                <h1 className="text-lg font-semibold">{gameData.title || 'Untitled Game'}</h1>
                <p className="text-sm text-gray-400">Last saved 2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handlePlayTest}
                size="sm"
                className={`${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
              >
                {isPlaying ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Stop' : 'Playtest'}
              </Button>

              <div className="flex border border-gray-600 rounded-lg overflow-hidden">
                <Button
                  variant={currentView === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('desktop')}
                  className="px-3 text-gray-300 hover:bg-gray-700"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentView === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('tablet')}
                  className="px-3 text-gray-300 hover:bg-gray-700"
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentView === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentView('mobile')}
                  className="px-3 text-gray-300 hover:bg-gray-700"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={onSave} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>

              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Share className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex">
          {/* AI Chat Panel */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col"
          >
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                AI Assistant
              </h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatHistory.map((chat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-blue-600 text-white ml-8' 
                      : 'bg-gray-700 text-gray-100 mr-8'
                  }`}>
                    <p className="text-sm">{chat.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  placeholder="Tell AI what to add or change..."
                  value={aiCommand}
                  onChange={(e) => setAiCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAICommand()}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={handleAICommand}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col">
            {/* Game Canvas */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1 bg-gray-900 p-6 flex items-center justify-center"
            >
              <div className={`${getViewportWidth()} mx-auto`}>
                <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-lg shadow-2xl border border-gray-700 aspect-video overflow-hidden">
                  {/* Mock Game Canvas */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isPlaying ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 bg-green-500 rounded-lg mb-4 mx-auto animate-pulse"></div>
                        <p className="text-white">Game Running...</p>
                        <p className="text-gray-300 text-sm">Use arrow keys to play</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 bg-blue-500 rounded-lg mb-4 mx-auto"></div>
                        <p className="text-white">Game Editor Canvas</p>
                        <p className="text-gray-300 text-sm">Drag and drop elements to build your game</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Overlay Controls */}
                  {!isPlaying && (
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowLayers(!showLayers)}
                        className="bg-black/50 text-white hover:bg-black/70"
                      >
                        {showLayers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {/* Progress Bar for Playtest */}
                  {isPlaying && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center gap-3 text-white">
                          <span className="text-sm">Level Progress</span>
                          <Progress value={65} className="flex-1 h-2" />
                          <span className="text-sm">65%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Bottom Panel */}
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-64 bg-gray-800 border-t border-gray-700"
            >
              <Tabs defaultValue="assets" className="h-full">
                <TabsList className="bg-gray-700 border-b border-gray-600">
                  <TabsTrigger value="assets" className="text-gray-300">Assets</TabsTrigger>
                  <TabsTrigger value="layers" className="text-gray-300">Layers</TabsTrigger>
                  <TabsTrigger value="properties" className="text-gray-300">Properties</TabsTrigger>
                  <TabsTrigger value="code" className="text-gray-300">Code</TabsTrigger>
                </TabsList>

                <TabsContent value="assets" className="p-4 h-full overflow-y-auto">
                  <div className="grid grid-cols-4 gap-4">
                    {assetCategories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer"
                      >
                        <Card className="bg-gray-700 border-gray-600 hover:border-purple-500 transition-colors">
                          <CardContent className="p-4 text-center">
                            <category.icon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                            <h4 className="text-sm font-medium text-white">{category.name}</h4>
                            <p className="text-xs text-gray-400">{category.count} items</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="layers" className="p-4">
                  <div className="space-y-2">
                    {layers.map((layer, index) => (
                      <motion.div
                        key={layer.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3 p-2 bg-gray-700 rounded-lg"
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          {layer.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                        <span className="flex-1 text-white text-sm">{layer.name}</span>
                        {layer.locked && (
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                            Locked
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="properties" className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Object Properties</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">X Position</label>
                          <Input className="bg-gray-700 border-gray-600 text-white" value="100" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Y Position</label>
                          <Input className="bg-gray-700 border-gray-600 text-white" value="50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="p-4">
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400">
                    <p># Generated game logic</p>
                    <p>if player.collides_with(enemy):</p>
                    <p>&nbsp;&nbsp;player.lose_life()</p>
                    <p>&nbsp;&nbsp;play_sound("hit")</p>
                    <br />
                    <p>if player.collects(coin):</p>
                    <p>&nbsp;&nbsp;score += 10</p>
                    <p>&nbsp;&nbsp;play_sound("collect")</p>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}