import type { ActionCard } from '@/types/game';

// 行动卡牌数据库

export const actionCards: ActionCard[] = [
  // 事件牌
  {
    id: 'magic_book',
    name: '魔法书',
    type: 'event',
    manaCost: 1,
    effect: 'draw',
    description: '抽取2张卡牌。'
  },
  {
    id: 'mana_potion',
    name: '魔力药水',
    type: 'event',
    manaCost: 2,
    effect: 'energy',
    description: '为出战角色恢复2点能量。'
  },
  {
    id: 'healing_potion',
    name: '治愈药水',
    type: 'event',
    manaCost: 2,
    effect: 'heal',
    description: '为出战角色恢复3点HP。'
  },
  {
    id: 'elemental_dice',
    name: '元素调和',
    type: 'event',
    manaCost: 1,
    effect: 'convert_dice',
    description: '将2个元素骰转换为出战角色的元素类型。'
  },
  {
    id: 'quick_cast',
    name: '快速咏唱',
    type: 'event',
    manaCost: 2,
    effect: 'quick_action',
    description: '本回合可以额外进行一次行动。'
  },
  
  // 装备牌 - 武器
  {
    id: 'wind_staff',
    name: '风之法杖',
    type: 'equipment',
    manaCost: 3,
    effect: 'weapon_buff',
    description: '风元素角色装备时，风元素伤害+1。',
    targetCharacter: 'monica'
  },
  {
    id: 'ice_sword',
    name: '冰晶剑',
    type: 'equipment',
    manaCost: 3,
    effect: 'weapon_buff',
    description: '冰元素角色装备时，冰元素伤害+1。',
    targetCharacter: 'cyril'
  },
  {
    id: 'royal_sword',
    name: '王家之剑',
    type: 'equipment',
    manaCost: 4,
    effect: 'weapon_buff',
    description: '光元素角色装备时，光元素伤害+1，能量获取+1。',
    targetCharacter: 'felix'
  },
  {
    id: 'shadow_blade',
    name: '影刃',
    type: 'equipment',
    manaCost: 4,
    effect: 'weapon_buff',
    description: '影元素角色装备时，影元素伤害+1。',
    targetCharacter: 'zoe'
  },
  
  // 装备牌 - 圣遗物
  {
    id: 'scholar_set',
    name: '学者套装',
    type: 'equipment',
    manaCost: 3,
    effect: 'artifact_buff',
    description: '最大HP+2，受到的伤害-1。'
  },
  {
    id: 'noble_set',
    name: '贵族套装',
    type: 'equipment',
    manaCost: 3,
    effect: 'artifact_buff',
    description: '能量上限+1，能量获取+1。'
  },
  {
    id: 'witch_set',
    name: '魔女套装',
    type: 'equipment',
    manaCost: 4,
    effect: 'artifact_buff',
    description: '元素爆发伤害+2。',
    targetCharacter: 'monica'
  },
  
  // 支援牌
  {
    id: 'nero_support',
    name: '尼禄的协助',
    type: 'support',
    manaCost: 3,
    effect: 'summon_support',
    description: '召唤尼禄协助战斗，每回合对敌人造成2点暗元素伤害，持续2回合。'
  },
  {
    id: 'rin_support',
    name: '铃的支援',
    type: 'support',
    manaCost: 3,
    effect: 'dice_support',
    description: '铃协助控制元素骰，每回合额外获得1个风元素骰，持续3回合。'
  },
  {
    id: 'student_council',
    name: '学生会支援',
    type: 'support',
    manaCost: 3,
    effect: 'heal_support',
    description: '学生会的后勤支援，每回合为全队恢复1点HP，持续3回合。'
  },
  
  // 天赋牌
  {
    id: 'monica_talent',
    name: '无咏唱精通',
    type: 'talent',
    manaCost: 5,
    effect: 'talent_buff',
    description: '莫妮卡装备时，所有技能有50%概率不消耗元素骰。',
    targetCharacter: 'monica'
  },
  {
    id: 'louis_talent',
    name: '结界大师',
    type: 'talent',
    manaCost: 5,
    effect: 'talent_buff',
    description: '路易斯装备时，护盾强度翻倍。',
    targetCharacter: 'louis'
  },
  {
    id: 'cyril_talent',
    name: '冰灵契约',
    type: 'talent',
    manaCost: 4,
    effect: 'talent_buff',
    description: '西里尔装备时，冰元素技能有30%概率冻结目标。',
    targetCharacter: 'cyril'
  }
];

// 初始卡组
export function getInitialDeck(): ActionCard[] {
  const deck: ActionCard[] = [];
  
  // 添加基础卡牌
  for (let i = 0; i < 3; i++) {
    deck.push(actionCards.find(c => c.id === 'magic_book')!);
    deck.push(actionCards.find(c => c.id === 'mana_potion')!);
    deck.push(actionCards.find(c => c.id === 'healing_potion')!);
  }
  
  // 添加装备牌
  deck.push(actionCards.find(c => c.id === 'scholar_set')!);
  deck.push(actionCards.find(c => c.id === 'noble_set')!);
  
  // 添加支援牌
  deck.push(actionCards.find(c => c.id === 'student_council')!);
  
  // 添加元素调和牌
  for (let i = 0; i < 2; i++) {
    deck.push(actionCards.find(c => c.id === 'elemental_dice')!);
  }
  
  // 填充到30张
  while (deck.length < 30) {
    deck.push(actionCards.find(c => c.id === 'magic_book')!);
  }
  
  return deck;
}

// 获取特定角色的天赋牌
export function getTalentCard(characterId: string): ActionCard | undefined {
  return actionCards.find(card => 
    card.type === 'talent' && card.targetCharacter === characterId
  );
}

// 获取随机行动卡牌
export function getRandomActionCards(count: number): ActionCard[] {
  const shuffled = [...actionCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
