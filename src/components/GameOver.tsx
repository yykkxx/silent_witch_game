import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Skull, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameOverProps {
  winner: 'player' | 'opponent';
  onRestart: () => void;
}

export function GameOver({ winner, onRestart }: GameOverProps) {
  const isWin = winner === 'player';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <Card className={`max-w-md w-full ${isWin ? 'border-yellow-400/50' : 'border-red-400/50'} bg-slate-900/80 backdrop-blur`}>
          <CardHeader className="text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                isWin ? 'bg-gradient-to-br from-yellow-400 to-amber-500' : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}
            >
              {isWin ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : (
                <Skull className="w-12 h-12 text-white" />
              )}
            </motion.div>
            <CardTitle className={`text-4xl font-bold ${isWin ? 'text-yellow-400' : 'text-red-400'}`}>
              {isWin ? '胜利！' : '失败...'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 mb-6"
            >
              {isWin 
                ? '恭喜你赢得了这场魔法对决！你的策略和技巧令人钦佩。' 
                : '不要气馁，失败是成功之母。再试一次吧！'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2 mb-6"
            >
              <p className="text-sm text-gray-400">
                {isWin 
                  ? '作为沉默魔女的继承者，你证明了自己的实力！' 
                  : '即使是七贤人，也有需要继续修炼的时候。'}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                onClick={onRestart}
                size="lg"
                className={`w-full ${
                  isWin 
                    ? 'bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-700 hover:to-amber-600' 
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600'
                }`}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                再来一局
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* 背景装饰 */}
      {isWin && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                y: -100,
                x: Math.random() * window.innerWidth 
              }}
              animate={{ 
                opacity: [0, 1, 0],
                y: window.innerHeight + 100
              }}
              transition={{ 
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity
              }}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
