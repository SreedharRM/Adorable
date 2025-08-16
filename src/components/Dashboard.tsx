import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Search, 
  Grid3X3, 
  List, 
  Plus, 
  Filter, 
  Edit, 
  Copy, 
  Trash2, 
  Play,
  MoreHorizontal,
  Clock,
  Users,
  Star
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  onNewGame: () => void;
  onEditGame: (gameId: string) => void;
}

export function Dashboard({ onNewGame, onEditGame }: DashboardProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const mockGames = [
    {
      id: '1',
      title: 'Space Adventure',
      genre: 'Action',
      status: 'Published',
      thumbnail: 'https://images.unsplash.com/photo-1650314200456-a19942fd1c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbWUlMjBuZW9uJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU1MDU0ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastModified: '2 hours ago',
      plays: 1250,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Pixel Platformer',
      genre: 'Platformer',
      status: 'Draft',
      thumbnail: 'https://images.unsplash.com/photo-1604819360294-88464109e919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyfMVOTyUyMHBpeGVsJTIwZ2FtZSUyMGNoYXJhY3RlcnMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTUwNTQ4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      lastModified: '1 day ago',
      plays: 0,
      rating: 0
    },
    {
      id: '3',
      title: 'Puzzle Quest',
      genre: 'Puzzle',
      status: 'Testing',
      thumbnail: 'https://images.unsplash.com/photo-1610213880945-9b020ccc2843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXp6bGUlMjBnYW1lJTIwY29sb3JmdWwlMjBibG9ja3N8ZW58MXx8fHwxNzU1MDU0ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastModified: '3 days ago',
      plays: 87,
      rating: 4.2
    },
    {
      id: '4',
      title: 'Fantasy RPG',
      genre: 'RPG',
      status: 'Published',
      thumbnail: 'https://images.unsplash.com/photo-1465056434232-c4c1f572b483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ2FtZSUyMGxhbmRzY2FwZSUyMHZpYnJhbnR8ZW58MXx8fHwxNzU1MDU0ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastModified: '1 week ago',
      plays: 3420,
      rating: 4.9
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Testing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredGames = mockGames.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-none mx-auto pt-4 px-2 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              My Games
            </h1>
            <p className="text-gray-600">Manage and create your game collection</p>
          </div>
          
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
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
                className={viewMode === 'grid' ? 'bg-purple-100 text-purple-700' : ''}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-purple-100 text-purple-700' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Games Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-200 bg-white/80 backdrop-blur-sm">
                  <div className="relative">
                    <ImageWithFallback
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusColor(game.status)}>
                        {game.status}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => onEditGame(game.id)}
                          className="bg-white/90 text-gray-800 hover:bg-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 truncate">{game.title}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-1">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditGame(game.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {game.genre}
                    </Badge>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {game.lastModified}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {game.plays.toLocaleString()} plays
                        </div>
                        {game.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {game.rating}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{game.title}</h3>
                          <Badge className={getStatusColor(game.status)}>
                            {game.status}
                          </Badge>
                          <Badge variant="secondary">
                            {game.genre}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {game.lastModified}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {game.plays.toLocaleString()} plays
                          </div>
                          {game.rating > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {game.rating}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => onEditGame(game.id)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
  );
}