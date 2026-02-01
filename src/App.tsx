import { useGame } from '@/hooks/useGame';
import { CharacterSelect } from '@/components/CharacterSelect';
import { BattleField } from '@/components/BattleField';
import { GameOver } from '@/components/GameOver';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AnimatePresence } from 'framer-motion';

function App() {
  const {
    gameState,
    selectedCharacters,
    gameStarted,
    gameOver,
    winner,
    battleLog,
    animating,
    selectCharacter,
    deselectCharacter,
    startGame,
    useSkill,
    switchCharacter,
    endTurn,
    resetGame
  } = useGame();

  // 游戏结束界面
  if (gameOver && winner) {
    return (
      <AnimatePresence>
        <GameOver winner={winner} onRestart={resetGame} />
      </AnimatePresence>
    );
  }

  // 角色选择界面
  if (!gameStarted) {
    return (
      <div className="relative">
        {/* 帮助按钮 */}
        <div className="absolute top-4 right-4 z-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="bg-slate-800/50">
                <BookOpen className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">游戏规则</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm text-gray-300">
                <section>
                  <h3 className="font-bold text-lg mb-2 text-purple-400">游戏目标</h3>
                  <p>击败对手的所有3个角色，赢得对战胜利！</p>
                </section>
                
                <section>
                  <h3 className="font-bold text-lg mb-2 text-purple-400">角色选择</h3>
                  <p>从角色列表中选择3个角色组成你的队伍。不同角色拥有不同的元素属性和技能。</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><span className="text-red-400">UR</span> - 传说级角色（如西奥多）</li>
                    <li><span className="text-yellow-400">SSR</span> - 七贤人级别</li>
                    <li><span className="text-purple-400">SR</span> - 精英级角色</li>
                    <li><span className="text-gray-400">R</span> - 普通级角色</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="font-bold text-lg mb-2 text-purple-400">回合流程</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li><strong>魔力恢复：</strong>每回合开始时恢复8点魔力</li>
                    <li><strong>行动阶段：</strong>使用魔力释放技能、切换角色</li>
                    <li><strong>结束回合：</strong>回合结束，轮到对手行动</li>
                  </ol>
                </section>
                
                <section>
                  <h3 className="font-bold text-lg mb-2 text-purple-400">技能类型</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>普通攻击：</strong>消耗2点魔力，获得1点能量</li>
                    <li><strong>元素战技：</strong>消耗4点魔力，获得1点能量</li>
                    <li><strong>元素爆发：</strong>消耗6-8点魔力，需要3点能量</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="font-bold text-lg mb-2 text-purple-400">魔法反应</h3>
                  <p>不同元素之间可以产生魔法反应，造成额外效果：</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>蒸发（火+水）：</strong>伤害+2</li>
                    <li><strong>融化（火+冰）：</strong>伤害+2</li>
                    <li><strong>超载（火+雷）：</strong>伤害+2</li>
                    <li><strong>超导（雷+冰）：</strong>伤害+1</li>
                    <li><strong>冻结（冰+水）：</strong>伤害+1</li>
                    <li><strong>扩散（风+其他）：</strong>伤害+1</li>
                    <li><strong>结晶（岩+其他）：</strong>伤害+1</li>
                  </ul>
                </section>
                
                <section>
                  <h3 className="font-bold text-lg mb-2 text-purple-400">角色推荐</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>莫妮卡（沉默魔女）：</strong>最强输出，每回合额外恢复魔力</li>
                    <li><strong>路易斯（结界魔术师）：</strong>强力防御，护盾强度翻倍</li>
                    <li><strong>尼禄（黑龙使魔）：</strong>高血量，自带伤害减免</li>
                    <li><strong>西奥多（黑龙王）：</strong>UR级传说，吸血能力</li>
                    <li><strong>劳拉（荆棘魔女）：</strong>技能伤害递增</li>
                  </ul>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <CharacterSelect
          selectedCharacters={selectedCharacters}
          onSelect={selectCharacter}
          onDeselect={deselectCharacter}
          onStart={startGame}
        />
      </div>
    );
  }

  // 对战界面
  return (
    <BattleField
      gameState={gameState}
      onUseSkill={useSkill}
      onSwitchCharacter={switchCharacter}
      onEndTurn={endTurn}
      battleLog={battleLog}
      animating={animating}
    />
  );
}

export default App;
