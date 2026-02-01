import { useState, useCallback, useRef, useEffect } from 'react';
import type { 
  GameState, 
  PlayerState, 
  CharacterState, 
  CharacterCard, 
  AIDecision
} from '@/types/game';
import { characterCards } from '@/data/characters';
import { canReact, getReaction } from '@/data/magicReactions';

// 初始化角色状态
function initCharacterState(card: CharacterCard): CharacterState {
  return {
    card,
    currentHp: card.maxHp,
    currentMana: card.maxMana,
    currentEnergy: 0,
    statusEffects: [],
    skillCooldowns: {},
    isDefeated: false
  };
}

// 初始化玩家状态
function initPlayerState(): PlayerState {
  return {
    characters: [],
    activeCharacterIndex: 0,
    hand: [],
    deck: [],
    mana: 0,
    maxMana: 8,
    summons: [],
    supports: []
  };
}

// AI决策系统 - 智能AI
function makeAIDecision(gameState: GameState): AIDecision {
  const opponent = gameState.opponent;
  const player = gameState.player;
  const activeChar = opponent.characters[opponent.activeCharacterIndex];
  const playerActiveChar = player.characters[player.activeCharacterIndex];
  
  if (!activeChar || activeChar.isDefeated) {
    // 切换角色
    const availableIndex = opponent.characters.findIndex((c, i) => !c.isDefeated && i !== opponent.activeCharacterIndex);
    if (availableIndex !== -1) {
      return { action: 'switch', target: availableIndex, reason: '当前角色已战败' };
    }
  }
  
  // 检查是否可以使用元素爆发
  if (activeChar.currentEnergy >= 3) {
    const burstSkill = activeChar.card.skills.find(s => s.type === 'burst');
    if (burstSkill && opponent.mana >= burstSkill.manaCost) {
      // 检查冷却
      if (!activeChar.skillCooldowns[burstSkill.id] || activeChar.skillCooldowns[burstSkill.id] === 0) {
        return { action: 'burst', skillIndex: 2, reason: '释放元素爆发' };
      }
    }
  }
  
  // 检查是否可以使用元素战技
  const skill = activeChar.card.skills.find(s => s.type === 'skill');
  if (skill && opponent.mana >= skill.manaCost) {
    if (!activeChar.skillCooldowns[skill.id] || activeChar.skillCooldowns[skill.id] === 0) {
      // 根据情况选择是否使用技能
      if (activeChar.currentHp < activeChar.card.maxHp * 0.5 && skill.effect.type === 'heal') {
        return { action: 'skill', skillIndex: 1, reason: '恢复HP' };
      }
      if (opponent.mana >= skill.manaCost + 2) {
        return { action: 'skill', skillIndex: 1, reason: '使用元素战技' };
      }
    }
  }
  
  // 使用普通攻击
  const normalAttack = activeChar.card.skills.find(s => s.type === 'normal');
  if (normalAttack && opponent.mana >= normalAttack.manaCost) {
    return { action: 'normal', skillIndex: 0, reason: '普通攻击' };
  }
  
  // 如果玩家角色血量低，尝试切换到有爆发的角色
  if (playerActiveChar.currentHp <= 3) {
    const burstReadyIndex = opponent.characters.findIndex((c, i) => 
      i !== opponent.activeCharacterIndex && 
      !c.isDefeated && 
      c.currentEnergy >= 3 &&
      opponent.mana >= c.card.skills[2].manaCost
    );
    if (burstReadyIndex !== -1) {
      return { action: 'switch', target: burstReadyIndex, reason: '切换到有爆发的角色' };
    }
  }
  
  // 如果当前角色血量低，考虑切换
  if (activeChar.currentHp <= 3) {
    const healthierIndex = opponent.characters.findIndex((c, i) => 
      i !== opponent.activeCharacterIndex && 
      !c.isDefeated && 
      c.currentHp > activeChar.currentHp
    );
    if (healthierIndex !== -1) {
      return { action: 'switch', target: healthierIndex, reason: '保护低血量角色' };
    }
  }
  
  // 结束回合
  return { action: 'end', reason: '结束回合' };
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    player: initPlayerState(),
    opponent: initPlayerState(),
    currentTurn: 'player',
    turnCount: 1,
    phase: 'start'
  }));
  
  const [selectedCharacters, setSelectedCharacters] = useState<CharacterCard[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'opponent' | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);
  const gameStateRef = useRef<GameState | null>(null);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const normalizeActiveCharacters = useCallback((state: GameState): GameState => {
    let updated = state;

    (['player', 'opponent'] as const).forEach(side => {
      const team = updated[side];
      const active = team.characters[team.activeCharacterIndex];
      if (!active || active.isDefeated) {
        const nextIndex = team.characters.findIndex(c => !c.isDefeated);
        if (nextIndex !== -1 && nextIndex !== team.activeCharacterIndex) {
          updated = {
            ...updated,
            [side]: {
              ...team,
              activeCharacterIndex: nextIndex
            }
          };
        }
      }
    });

    return updated;
  }, []);
  
  // 添加战斗日志
  const addLog = useCallback((message: string) => {
    setBattleLog(prev => [...prev.slice(-9), message]);
  }, []);
  
  // 选择角色
  const selectCharacter = useCallback((character: CharacterCard) => {
    if (selectedCharacters.length < 3) {
      setSelectedCharacters(prev => [...prev, character]);
    }
  }, [selectedCharacters]);
  
  // 取消选择
  const deselectCharacter = useCallback((index: number) => {
    setSelectedCharacters(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  // 开始游戏
  const startGame = useCallback(() => {
    if (selectedCharacters.length !== 3) return;
    
    // 为AI随机选择3个角色（排除玩家已选的）
    const availableChars = characterCards.filter(c => !selectedCharacters.find(sc => sc.id === c.id));
    const aiCharacters = availableChars.sort(() => Math.random() - 0.5).slice(0, 3);
    
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        characters: selectedCharacters.map(initCharacterState),
        mana: 8
      },
      opponent: {
        ...prev.opponent,
        characters: aiCharacters.map(initCharacterState),
        mana: 8
      },
      phase: 'action'
    }));
    
    setGameStarted(true);
    addLog('🎮 游戏开始！');
    addLog('💫 每回合恢复8点魔力，击败对方所有角色获胜！');
  }, [selectedCharacters]);
  
  // 使用技能
  const useSkill = useCallback((skillIndex: number) => {
    if (gameState.currentTurn !== 'player' || animating) return;
    
    const player = gameState.player;
    const activeChar = player.characters[player.activeCharacterIndex];
    const skill = activeChar.card.skills[skillIndex];
    
    // 检查冷却
    if (activeChar.skillCooldowns[skill.id] && activeChar.skillCooldowns[skill.id] > 0) {
      addLog(`⏳ ${skill.name} 还在冷却中！`);
      return;
    }
    
    if (player.mana < skill.manaCost) {
      addLog('💔 魔力不足！');
      return;
    }
    
    setAnimating(true);
    
    // 执行技能效果
    setGameState(prev => {
      const newState = { ...prev };
      const char = newState.player.characters[newState.player.activeCharacterIndex];
      
      // 消耗魔力
      newState.player.mana -= skill.manaCost;
      
      // 设置冷却
      if (skill.cooldown) {
        char.skillCooldowns[skill.id] = skill.cooldown;
      }
      
      // 增加能量
      if (skill.energyGain) {
        char.currentEnergy = Math.min(3, char.currentEnergy + skill.energyGain);
      }
      
      // 处理伤害
      if (skill.damage && skill.element) {
        const opponent = newState.opponent;
        const targetChar = opponent.characters[opponent.activeCharacterIndex];
        
        let damage = skill.damage;
        
        // 检查被动技能加成
        if (char.card.passive?.trigger === 'on_damage_deal') {
          if (char.card.passive.effect.includes('对暗元素') && skill.element === '暗') {
            damage += 2;
          }
          if (char.card.passive.effect.includes('对火附着') && targetChar.elementAttachment === '火') {
            damage += 2;
          }
        }
        
        // 检查元素反应
        if (targetChar.elementAttachment && skill.element) {
          if (canReact(targetChar.elementAttachment, skill.element)) {
            const reaction = getReaction(targetChar.elementAttachment, skill.element);
            damage += reaction?.damageBonus || 0;
            addLog(`✨ 触发${reaction?.name}反应！伤害+${reaction?.damageBonus}`);
          }
        }
        
        // 应用伤害
        const actualDamage = Math.max(0, damage);
        targetChar.currentHp = Math.max(0, targetChar.currentHp - actualDamage);
        
        if (targetChar.currentHp === 0) {
          targetChar.isDefeated = true;
          addLog(`💀 ${targetChar.card.name} 被击败了！`);
        }
        
        // 附加元素
        targetChar.elementAttachment = skill.element;
      }
      
      return newState;
    });
    
    addLog(`⚔️ ${activeChar.card.name} 使用了 ${skill.name}！`);
    
    setTimeout(() => setAnimating(false), 500);
    
    // 检查游戏结束
    setTimeout(() => checkGameEnd(), 600);
  }, [gameState, animating]);
  
  // 切换角色
  const switchCharacter = useCallback((index: number) => {
    if (gameState.currentTurn !== 'player' || animating) return;
    if (gameState.player.characters[index].isDefeated) return;
    if (index === gameState.player.activeCharacterIndex) return;
    
    setAnimating(true);
    
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        activeCharacterIndex: index
      }
    }));
    
    addLog(`🔄 切换至 ${gameState.player.characters[index].card.name}`);
    
    setTimeout(() => setAnimating(false), 300);
  }, [gameState, animating]);
  
  // 结束回合
  const endTurn = useCallback(() => {
    if (gameState.currentTurn !== 'player' || animating) return;
    
    setAnimating(true);
    addLog('⏭️ 回合结束');
    
    // 减少技能冷却
    setGameState(prev => {
      const newState = { ...prev };
      const char = newState.player.characters[newState.player.activeCharacterIndex];
      Object.keys(char.skillCooldowns).forEach(key => {
        if (char.skillCooldowns[key] > 0) {
          char.skillCooldowns[key]--;
        }
      });
      return newState;
    });
    
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentTurn: 'opponent'
      }));
      setAnimating(false);
      executeAITurn();
    }, 800);
  }, [gameState, animating]);

  // AI执行回合
  const executeAITurn = useCallback(() => {
    const normalized = normalizeActiveCharacters(gameStateRef.current || gameState);
    setGameState(normalized);

    // AI恢复魔力
    setGameState(prev => ({
      ...prev,
      opponent: {
        ...prev.opponent,
        mana: 8
      }
    }));
    
    const decision = makeAIDecision(normalized);
    
    if (decision.action === 'end') {
      addLog('🤖 对手结束回合');
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentTurn: 'player',
          turnCount: prev.turnCount + 1
        }));
        // 玩家恢复魔力
        setGameState(prev => ({
          ...prev,
          player: {
            ...prev.player,
            mana: 8
          }
        }));
        addLog('🌟 新回合开始！魔力已恢复');
      }, 1500);
      return;
    }
    
    switch (decision.action) {
      case 'switch':
        if (decision.target !== undefined) {
          setGameState(prev => ({
            ...prev,
            opponent: {
              ...prev.opponent,
              activeCharacterIndex: decision.target!
            }
          }));
          addLog(`🤖 对手切换角色`);
          setTimeout(() => executeAITurn(), 1000);
        }
        break;
        
      case 'burst':
      case 'skill':
      case 'normal': {
        const validState = normalizeActiveCharacters(gameStateRef.current || gameState);
        const opponent = validState.opponent;
        const actingIndex = opponent.activeCharacterIndex;
        const activeChar = opponent.characters[actingIndex];
        if (!activeChar || activeChar.isDefeated) {
          addLog('🤖 对手无有效角色，回合结束');
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              currentTurn: 'player',
              turnCount: prev.turnCount + 1,
              player: {
                ...prev.player,
                mana: 8
              }
            }));
            addLog('🌟 新回合开始！魔力已恢复');
          }, 600);
          break;
        }
        const skillIndex = decision.skillIndex || 0;
        const skill = activeChar.card.skills[skillIndex];
        
        // 消耗魔力
        setGameState(prev => ({
          ...prev,
          opponent: {
            ...prev.opponent,
            mana: prev.opponent.mana - skill.manaCost
          }
        }));
        
        // 增加能量
        if (skill.energyGain) {
          setGameState(prev => {
            const newState = { ...prev };
            const char = newState.opponent.characters[newState.opponent.activeCharacterIndex];
            char.currentEnergy = Math.min(3, char.currentEnergy + (skill.energyGain || 0));
            return normalizeActiveCharacters(newState);
          });
        }
        
        // 对玩家造成伤害
        setGameState(prev => {
          const newState = { ...prev };
          const playerChar = newState.player.characters[newState.player.activeCharacterIndex];
          
          if (skill.damage) {
            let damage = skill.damage;
            
            // 检查元素反应
            if (playerChar.elementAttachment && skill.element) {
              if (canReact(playerChar.elementAttachment, skill.element)) {
                const reaction = getReaction(playerChar.elementAttachment, skill.element);
                damage += reaction?.damageBonus || 0;
              }
            }
            
            playerChar.currentHp = Math.max(0, playerChar.currentHp - damage);
            if (playerChar.currentHp === 0) {
              playerChar.isDefeated = true;
              addLog(`💀 ${playerChar.card.name} 被击败了！`);
            }
            
            playerChar.elementAttachment = skill.element;
          }
          
          return normalizeActiveCharacters(newState);
        });
        
        addLog(`🤖 对手使用了 ${skill.name}！`);
        setTimeout(() => executeAITurn(), 1200);
        break;
      }
    }
    
    checkGameEnd();
  }, [gameState]);
  
  // 检查游戏结束
  const checkGameEnd = useCallback(() => {
    const playerDefeated = gameState.player.characters.every(c => c.isDefeated);
    const opponentDefeated = gameState.opponent.characters.every(c => c.isDefeated);
    
    if (playerDefeated) {
      setGameOver(true);
      setWinner('opponent');
      addLog('😢 游戏结束！你输了...');
    } else if (opponentDefeated) {
      setGameOver(true);
      setWinner('player');
      addLog('🎉 游戏结束！你赢了！');
    }
  }, [gameState]);
  
  // 重置游戏
  const resetGame = useCallback(() => {
    setGameState({
      player: initPlayerState(),
      opponent: initPlayerState(),
      currentTurn: 'player',
      turnCount: 1,
      phase: 'start'
    });
    setSelectedCharacters([]);
    setGameStarted(false);
    setGameOver(false);
    setWinner(null);
    setBattleLog([]);
  }, []);
  
  return {
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
  };
}
