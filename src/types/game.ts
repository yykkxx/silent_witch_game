// 游戏核心类型定义

// 魔法属性类型
export type MagicType = '风' | '火' | '水' | '雷' | '冰' | '岩' | '光' | '暗' | '影' | '无';

// 角色卡牌接口
export interface CharacterCard {
  id: string;
  name: string;
  title: string;
  element: MagicType;
  maxHp: number;
  maxMana: number; // 最大魔力量
  skills: Skill[];
  passive?: PassiveSkill;
  description: string;
  image?: string;
  rarity: 'UR' | 'SSR' | 'SR' | 'R';
}

// 技能接口
export interface Skill {
  id: string;
  name: string;
  type: 'normal' | 'skill' | 'burst';
  manaCost: number; // 魔力消耗
  damage?: number;
  element?: MagicType;
  effect: SkillEffect;
  description: string;
  energyGain?: number; // 获得的能量
  cooldown?: number; // 冷却回合
}

// 技能效果类型
export type SkillEffect = 
  | { type: 'damage'; value: number; element: MagicType }
  | { type: 'heal'; value: number }
  | { type: 'shield'; value: number }
  | { type: 'summon'; summonId: string }
  | { type: 'apply_element'; element: MagicType }
  | { type: 'draw_card'; count: number }
  | { type: 'energy'; value: number }
  | { type: 'mana_regen'; value: number }
  | { type: 'combo'; effects: SkillEffect[] }
  | { type: 'special'; handler: string };

// 被动技能
export interface PassiveSkill {
  name: string;
  description: string;
  trigger: string;
  effect: string;
}

// 召唤物接口
export interface Summon {
  id: string;
  name: string;
  element: MagicType;
  damage: number;
  duration: number; // 持续回合
  effect?: string;
}

// 游戏状态
export interface GameState {
  player: PlayerState;
  opponent: PlayerState;
  currentTurn: 'player' | 'opponent';
  turnCount: number;
  phase: 'start' | 'action' | 'end';
  winner?: 'player' | 'opponent';
}

// 玩家状态
export interface PlayerState {
  characters: CharacterState[];
  activeCharacterIndex: number;
  hand: ActionCard[];
  deck: ActionCard[];
  mana: number; // 当前魔力量
  maxMana: number; // 最大魔力量（每回合恢复）
  summons: SummonState[];
  supports: SupportCard[];
}

// 角色状态
export interface CharacterState {
  card: CharacterCard;
  currentHp: number;
  currentMana: number; // 当前魔力
  currentEnergy: number; // 当前能量（用于爆发）
  elementAttachment?: MagicType; // 元素附着
  statusEffects: StatusEffect[];
  skillCooldowns: { [skillId: string]: number }; // 技能冷却
  isDefeated: boolean;
}

// 状态效果
export interface StatusEffect {
  id: string;
  name: string;
  duration: number;
  effect: string;
  type: 'buff' | 'debuff' | 'dot' | 'hot';
  value?: number;
}

// 行动卡牌
export interface ActionCard {
  id: string;
  name: string;
  type: 'event' | 'equipment' | 'support' | 'talent';
  manaCost: number;
  effect: string;
  description: string;
  targetCharacter?: string; // 特定角色才能使用
}

// 召唤物状态
export interface SummonState {
  summon: Summon;
  remainingDuration: number;
}

// 支援卡
export interface SupportCard {
  id: string;
  name: string;
  effect: string;
  duration: number;
}

// 魔法反应定义
export interface MagicReaction {
  name: string;
  elements: [MagicType, MagicType];
  damageBonus: number;
  specialEffect?: string;
}

// AI决策
export interface AIDecision {
  action: 'skill' | 'burst' | 'normal' | 'switch' | 'card' | 'end';
  target?: number;
  cardIndex?: number;
  skillIndex?: number;
  reason?: string;
}
