import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Wand2, Music } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import SpriteAnimation from './ui/SpriteAnimation';

type AssetCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  items: { id: string; name: string; preview?: string }[];
};

interface GameAssetSelectionProps {
  assetCategories: AssetCategory[];
  gameData: any;
  toggleAsset: (category: string, assetId: string) => void;
}

export function GameAssetSelection({ assetCategories, gameData, toggleAsset }: GameAssetSelectionProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-2 border-white/50">
      <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
        <CardTitle className="text-3xl flex items-center justify-center gap-3">
          {/* Palette icon is expected to be rendered by parent if needed */}
          Asset Selection
        </CardTitle>
        <p className="text-lg opacity-90">Choose assets for your game</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {assetCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <category.icon className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl text-gray-700">{category.name}</h3>
                <Badge className="bg-purple-100 text-purple-700">
                  {gameData.selectedAssets[category.id as keyof typeof gameData.selectedAssets].length} selected
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleAsset(category.id, item.id)}
                    className={`
                      cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden
                      ${gameData.selectedAssets[category.id as keyof typeof gameData.selectedAssets].includes(item.id)
                        ? 'border-purple-500 shadow-lg ring-4 ring-purple-200'
                        : 'border-gray-200 hover:border-purple-300'
                      }
                    `}
                  >
                    {item.preview ? (
                        <div className="relative">
                            {category.id === 'characters' ? (
                            // Use sprite animation for 2D character assets only
                                <div className="ml-[50px] w-24 h-24 flex items-center justify-center">
                                    <SpriteAnimation
                                        src={item.preview}
                                        className=" w-24 h-24"
                                    />
                                    </div>
                            ) : (
                            // Otherwise use regular preview image
                            <ImageWithFallback
                                src={item.preview}
                                alt={item.name}
                                className="w-full h-24 object-cover"
                            />
                            )}

                            {gameData.selectedAssets[category.id as keyof typeof gameData.selectedAssets]
                            .includes(item.id) && (
                            <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                <div className="bg-purple-500 text-white rounded-full p-1">
                                ✓
                                </div>
                            </div>
                            )}
                        </div>
                        ) : (

                      <div className="h-24 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <Music className="h-8 w-8 text-purple-600" />
                      </div>
                    )}

                    <div className="p-3 text-center">
                      <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
