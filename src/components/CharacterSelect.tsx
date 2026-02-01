import type { CharacterCard } from '@/types/game';
import { characterCards } from '@/data/characters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sword, Shield, Zap, Wind, Flame, Droplets, Snowflake, Mountain, Sun, Moon, Ghost, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CharacterSelectProps {
  selectedCharacters: CharacterCard[];
  onSelect: (character: CharacterCard) => void;
  onDeselect: (index: number) => void;
  onStart: () => void;
}

const elementIcons: Record<string, React.ReactNode> = {
  '风': <Wind className="w-4 h-4" />,
  '火': <Flame className="w-4 h-4" />,
  '水': <Droplets className="w-4 h-4" />,
  '雷': <Zap className="w-4 h-4" />,
  '冰': <Snowflake className="w-4 h-4" />,
  '岩': <Mountain className="w-4 h-4" />,
  '光': <Sun className="w-4 h-4" />,
  '暗': <Moon className="w-4 h-4" />,
  '影': <Ghost className="w-4 h-4" />,
  '无': <Shield className="w-4 h-4" />
};

const elementColors: Record<string, string> = {
  '风': 'from-green-500 to-emerald-600',
  '火': 'from-red-500 to-orange-600',
  '水': 'from-blue-500 to-cyan-600',
  '雷': 'from-purple-500 to-violet-600',
  '冰': 'from-cyan-400 to-blue-500',
  '岩': 'from-yellow-600 to-amber-700',
  '光': 'from-yellow-400 to-amber-500',
  '暗': 'from-indigo-600 to-purple-700',
  '影': 'from-gray-700 to-gray-900',
  '无': 'from-gray-400 to-gray-500'
};

const rarityColors: Record<string, string> = {
  'UR': 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500',
  'SSR': 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500',
  'SR': 'bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500',
  'R': 'bg-gradient-to-r from-gray-400 to-gray-500'
};

export function CharacterSelect({ selectedCharacters, onSelect, onDeselect, onStart }: CharacterSelectProps) {
  const isSelected = (char: CharacterCard) => selectedCharacters.some(c => c.id === char.id);
  const canSelect = selectedCharacters.length < 3;
  
  // 按稀有度分组
  const urChars = characterCards.filter(c => c.rarity === 'UR');
  const ssrChars = characterCards.filter(c => c.rarity === 'SSR');
  const srChars = characterCards.filter(c => c.rarity === 'SR');
  const rChars = characterCards.filter(c => c.rarity === 'R');
  
  const renderCharacterGroup = (chars: CharacterCard[], title: string, color: string) => (
    <div className="mb-6">
      <h3 className={`text-lg font-bold mb-3 ${color}`}>{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {chars.map(char => (
          <motion.div
            key={char.id}
            whileHover={{ scale: isSelected(char) ? 1 : 1.02 }}
            whileTap={{ scale: isSelected(char) ? 1 : 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all overflow-hidden ${
                isSelected(char) 
                  ? 'ring-2 ring-purple-500 bg-purple-900/40' 
                  : 'hover:bg-slate-800/60 bg-slate-900/40'
              } ${!canSelect && !isSelected(char) ? 'opacity-40 pointer-events-none' : ''}`}
              onClick={() => !isSelected(char) && canSelect && onSelect(char)}
            >
              <div className={`h-1 bg-gradient-to-r ${elementColors[char.element]}`} />
              <CardHeader className="pb-2 px-3 pt-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${elementColors[char.element]} flex items-center justify-center`}>
                      {elementIcons[char.element]}
                    </div>
                    <div>
                      <CardTitle className="text-sm text-white">{char.name}</CardTitle>
                      <p className="text-xs text-purple-300">{char.title}</p>
                    </div>
                  </div>
                  <Badge className={`${rarityColors[char.rarity]} text-xs`}>
                    {char.rarity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">{char.description}</p>
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1 text-red-400">
                    <Sword className="w-3 h-3" />
                    {char.skills[2]?.damage || 0}
                  </span>
                  <span className="flex items-center gap-1 text-green-400">
                    <Shield className="w-3 h-3" />
                    {char.maxHp}
                  </span>
                  <span className="flex items-center gap-1 text-blue-400">
                    <Sparkles className="w-3 h-3" />
                    {char.maxMana}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-2">
            沉默魔女的秘密
          </h1>
          <p className="text-purple-300 text-sm">卡牌对战游戏 - 选择你的队伍</p>
        </motion.div>
        
        {/* 已选角色 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h2 className="text-lg text-white mb-3 flex items-center gap-2">
            <span>已选角色</span>
            <Badge variant="secondary" className="bg-purple-600">
              {selectedCharacters.length}/3
            </Badge>
          </h2>
          <div className="flex gap-3 flex-wrap">
            <AnimatePresence mode="popLayout">
              {selectedCharacters.map((char, index) => (
                <motion.div
                  key={char.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative"
                >
                  <div 
                    className={`w-24 sm:w-28 h-32 sm:h-36 bg-gradient-to-br ${elementColors[char.element]} rounded-xl flex flex-col items-center justify-center text-white p-2`}
                  >
                    <button 
                      onClick={() => onDeselect(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <span className="text-2xl mb-1">{elementIcons[char.element]}</span>
                    <span className="text-xs text-center font-medium">{char.name}</span>
                    <Badge className="mt-1 text-xs" variant="secondary">{char.rarity}</Badge>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {Array.from({ length: 3 - selectedCharacters.length }).map((_, i) => (
              <div 
                key={i}
                className="w-24 sm:w-28 h-32 sm:h-36 border-2 border-dashed border-purple-500/50 rounded-xl flex items-center justify-center text-purple-400/50"
              >
                <span className="text-3xl">+</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* 角色列表 */}
        <ScrollArea className="h-[50vh] sm:h-[55vh]">
          {renderCharacterGroup(urChars, '传说级 (UR)', 'text-red-400')}
          {renderCharacterGroup(ssrChars, '七贤人级 (SSR)', 'text-yellow-400')}
          {renderCharacterGroup(srChars, '精英级 (SR)', 'text-purple-400')}
          {renderCharacterGroup(rChars, '普通级 (R)', 'text-gray-400')}
        </ScrollArea>
        
        {/* 开始按钮 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center"
        >
          <Button 
            size="lg"
            disabled={selectedCharacters.length !== 3}
            onClick={onStart}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6 disabled:opacity-50"
          >
            开始对战
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
