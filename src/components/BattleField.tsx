import type { GameState, CharacterState } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sword, 
  Shield, 
  Zap, 
  Wind, 
  Flame, 
  Droplets, 
  Snowflake, 
  Mountain, 
  Sun, 
  Moon, 
  Ghost,
  Heart,
  Sparkles,
  SkipForward
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BattleFieldProps {
  gameState: GameState;
  onUseSkill: (skillIndex: number) => void;
  onSwitchCharacter: (index: number) => void;
  onEndTurn: () => void;
  battleLog: string[];
  animating: boolean;
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
  '风': 'bg-green-500',
  '火': 'bg-red-500',
  '水': 'bg-blue-500',
  '雷': 'bg-purple-500',
  '冰': 'bg-cyan-500',
  '岩': 'bg-yellow-600',
  '光': 'bg-yellow-400',
  '暗': 'bg-indigo-600',
  '影': 'bg-gray-800',
  '无': 'bg-gray-400'
};

const rarityColors: Record<string, string> = {
  'UR': 'from-red-500 to-orange-500',
  'SSR': 'from-yellow-400 to-amber-500',
  'SR': 'from-purple-400 to-indigo-500',
  'R': 'from-gray-400 to-gray-500'
};

function CharacterDisplay({ 
  char, 
  isActive
}: { 
  char: CharacterState; 
  isActive: boolean;
}) {
  const hpPercent = (char.currentHp / char.card.maxHp) * 100;
  
  return (
    <motion.div 
      layout
      className={`relative rounded-xl border-2 transition-all overflow-hidden ${
        isActive 
          ? 'border-yellow-400 shadow-lg shadow-yellow-400/30' 
          : 'border-gray-600/50'
      } ${char.isDefeated ? 'opacity-40 grayscale' : ''}`}
    >
      {/* 稀有度背景 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[char.card.rarity]} opacity-10`} />
      
      {/* 元素附着 */}
      <AnimatePresence>
        {char.elementAttachment && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${elementColors[char.elementAttachment]} flex items-center justify-center z-10 shadow-lg`}
          >
            {elementIcons[char.elementAttachment]}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative p-2 sm:p-3">
        {/* 角色信息 */}
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${elementColors[char.card.element]} flex items-center justify-center shadow-lg`}>
            {elementIcons[char.card.element]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-xs sm:text-sm truncate">{char.card.name}</h3>
            <p className="text-[10px] sm:text-xs text-gray-400 truncate">{char.card.title}</p>
          </div>
          <Badge className={`${rarityColors[char.card.rarity]} text-[10px]`}>
            {char.card.rarity}
          </Badge>
        </div>
        
        {/* HP条 */}
        <div className="mb-2">
          <div className="flex justify-between text-[10px] sm:text-xs mb-1">
            <span className="text-red-400 flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {char.currentHp}/{char.card.maxHp}
            </span>
          </div>
          <div className="h-2 bg-red-950 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${hpPercent}%` }}
              className="h-full bg-gradient-to-r from-red-500 to-red-400"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* 能量条 */}
        <div className="flex items-center gap-1 mb-1">
          <Zap className="w-3 h-3 text-yellow-400" />
          <div className="flex gap-0.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  i < char.currentEnergy ? 'bg-yellow-400 shadow shadow-yellow-400/50' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* 魔力显示 */}
        <div className="flex items-center gap-1 text-[10px] text-blue-400">
          <Sparkles className="w-3 h-3" />
          <span>{char.currentMana}/{char.card.maxMana}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function BattleField({ 
  gameState, 
  onUseSkill, 
  onSwitchCharacter, 
  onEndTurn,
  battleLog,
  animating
}: BattleFieldProps) {
  const { player, opponent, currentTurn, turnCount } = gameState;
  const activeChar = player.characters[player.activeCharacterIndex];
  const isPlayerTurn = currentTurn === 'player';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* 对手区域 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-red-400 font-bold text-sm sm:text-base flex items-center gap-2">
              <Shield className="w-4 h-4" />
              对手
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">魔力:</span>
              <Badge variant="secondary" className="bg-blue-600/50">
                <Sparkles className="w-3 h-3 mr-1" />
                {opponent.mana}/8
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {opponent.characters.map((char, index) => (
              <CharacterDisplay 
                key={char.card.id}
                char={char}
                isActive={index === opponent.activeCharacterIndex}
              />
            ))}
          </div>
        </motion.div>
        
        {/* 战斗信息 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4"
        >
          {/* 回合信息 */}
          <Card className="bg-slate-900/60 border-gray-700 sm:col-span-1">
            <CardContent className="p-3 text-center">
              <h3 className="text-white font-bold text-base sm:text-lg mb-1">
                {isPlayerTurn ? '🎯 你的回合' : '🤖 对手回合'}
              </h3>
              <Badge 
                variant={isPlayerTurn ? 'default' : 'secondary'}
                className={isPlayerTurn ? 'bg-green-600' : 'bg-gray-600'}
              >
                {isPlayerTurn ? '行动阶段' : '等待中'}
              </Badge>
              <p className="text-gray-400 text-xs mt-2">
                第 {turnCount} 回合
              </p>
            </CardContent>
          </Card>
          
          {/* 玩家魔力 */}
          <Card className="bg-slate-900/60 border-gray-700 sm:col-span-1">
            <CardContent className="p-3">
              <h3 className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                你的魔力
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-4 bg-blue-950 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(player.mana / 8) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-blue-400 font-bold">{player.mana}/8</span>
              </div>
            </CardContent>
          </Card>
          
          {/* 战斗日志 */}
          <Card className="bg-slate-900/60 border-gray-700 sm:col-span-1">
            <CardContent className="p-3">
              <h3 className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                战斗日志
              </h3>
              <ScrollArea className="h-16">
                <div className="space-y-1">
                  {battleLog.slice(-5).map((log, index) => (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] sm:text-xs text-gray-300"
                    >
                      {log}
                    </motion.p>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* 玩家区域 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h2 className="text-green-400 font-bold text-sm sm:text-base mb-2 flex items-center gap-2">
            <Sword className="w-4 h-4" />
            你的队伍
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
            {player.characters.map((char, index) => (
              <motion.div 
                key={char.card.id}
                whileHover={isPlayerTurn && !char.isDefeated && index !== player.activeCharacterIndex ? { scale: 1.02 } : {}}
                whileTap={isPlayerTurn && !char.isDefeated && index !== player.activeCharacterIndex ? { scale: 0.98 } : {}}
                onClick={() => isPlayerTurn && index !== player.activeCharacterIndex && onSwitchCharacter(index)}
                className={`cursor-pointer ${!isPlayerTurn || char.isDefeated ? 'pointer-events-none' : ''}`}
              >
                <CharacterDisplay 
                  char={char}
                  isActive={index === player.activeCharacterIndex}
                />
              </motion.div>
            ))}
          </div>
          
          {/* 技能按钮 */}
          {isPlayerTurn && activeChar && !activeChar.isDefeated && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-2 sm:gap-3"
            >
              {activeChar.card.skills.map((skill, index) => {
                const isOnCooldown = activeChar.skillCooldowns[skill.id] && activeChar.skillCooldowns[skill.id] > 0;
                const canAfford = player.mana >= skill.manaCost;
                const canUseBurst = index !== 2 || activeChar.currentEnergy >= 3;
                const isDisabled = isOnCooldown || !canAfford || !canUseBurst || animating;
                
                return (
                  <motion.button
                    key={skill.id}
                    whileHover={!isDisabled ? { scale: 1.02 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                    onClick={() => onUseSkill(index)}
                    disabled={isDisabled}
                    className={`relative p-2 sm:p-3 rounded-xl text-left transition-all ${
                      skill.type === 'burst' 
                        ? 'bg-gradient-to-br from-red-600 to-red-700' 
                        : skill.type === 'skill' 
                          ? 'bg-gradient-to-br from-purple-600 to-purple-700'
                          : 'bg-gradient-to-br from-blue-600 to-blue-700'
                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
                  >
                    <div className="font-bold text-white text-xs sm:text-sm">{skill.name}</div>
                    <div className="text-[10px] text-white/70">
                      {skill.type === 'normal' ? '普通攻击' : skill.type === 'skill' ? '元素战技' : '元素爆发'}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {skill.manaCost}
                      </Badge>
                      {skill.damage ? (
                        <Badge variant="secondary" className="text-[10px]">
                          <Sword className="w-3 h-3 mr-1" />
                          {skill.damage}
                        </Badge>
                      ) : null}
                    </div>
                    {isOnCooldown && (
                      <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">CD:{activeChar.skillCooldowns[skill.id]}</span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
          
          {/* 结束回合按钮 */}
          {isPlayerTurn && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-center"
            >
              <Button 
                onClick={onEndTurn}
                disabled={animating}
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                结束回合
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
