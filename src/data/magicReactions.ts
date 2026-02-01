import type { MagicReaction, MagicType } from '@/types/game';

// 魔法反应系统 - 基于小说中的魔法互动

export const magicReactions: MagicReaction[] = [
  // 增幅反应
  {
    name: '扩散',
    elements: ['风', '火'],
    damageBonus: 0,
    specialEffect: '对敌方所有后台角色造成1点火元素伤害'
  },
  {
    name: '扩散',
    elements: ['风', '水'],
    damageBonus: 0,
    specialEffect: '对敌方所有后台角色造成1点水元素伤害'
  },
  {
    name: '扩散',
    elements: ['风', '冰'],
    damageBonus: 0,
    specialEffect: '对敌方所有后台角色造成1点冰元素伤害'
  },
  {
    name: '扩散',
    elements: ['风', '雷'],
    damageBonus: 0,
    specialEffect: '对敌方所有后台角色造成1点雷元素伤害'
  },
  {
    name: '结晶',
    elements: ['岩', '火'],
    damageBonus: 1,
    specialEffect: '生成1点护盾，可叠加至2点'
  },
  {
    name: '结晶',
    elements: ['岩', '水'],
    damageBonus: 1,
    specialEffect: '生成1点护盾，可叠加至2点'
  },
  {
    name: '结晶',
    elements: ['岩', '冰'],
    damageBonus: 1,
    specialEffect: '生成1点护盾，可叠加至2点'
  },
  {
    name: '结晶',
    elements: ['岩', '雷'],
    damageBonus: 1,
    specialEffect: '生成1点护盾，可叠加至2点'
  },
  
  // 元素反应
  {
    name: '蒸发',
    elements: ['火', '水'],
    damageBonus: 2,
    specialEffect: '造成额外2点伤害'
  },
  {
    name: '融化',
    elements: ['火', '冰'],
    damageBonus: 2,
    specialEffect: '造成额外2点伤害'
  },
  {
    name: '超载',
    elements: ['火', '雷'],
    damageBonus: 2,
    specialEffect: '造成额外2点伤害，强制切换敌方出战角色'
  },
  {
    name: '超导',
    elements: ['雷', '冰'],
    damageBonus: 1,
    specialEffect: '对敌方所有角色造成1点穿透伤害'
  },
  {
    name: '感电',
    elements: ['雷', '水'],
    damageBonus: 1,
    specialEffect: '对敌方所有角色造成1点穿透伤害'
  },
  {
    name: '冻结',
    elements: ['冰', '水'],
    damageBonus: 1,
    specialEffect: '冻结目标，使其无法行动直到受到火元素或物理伤害'
  },
  
  // 特殊反应 - 影元素
  {
    name: '影噬',
    elements: ['影', '光'],
    damageBonus: 3,
    specialEffect: '光与影的碰撞，造成额外3点伤害'
  },
  {
    name: '暗影侵蚀',
    elements: ['影', '暗'],
    damageBonus: 2,
    specialEffect: '暗影叠加，造成额外2点伤害并附加持续伤害'
  },
  {
    name: '光明驱散',
    elements: ['光', '影'],
    damageBonus: 3,
    specialEffect: '光明驱散黑暗，造成额外3点伤害'
  },
  {
    name: '神圣净化',
    elements: ['光', '暗'],
    damageBonus: 2,
    specialEffect: '神圣之力净化黑暗，造成额外2点伤害'
  }
];

// 检查两个元素是否可以发生反应
export function canReact(element1: MagicType, element2: MagicType): boolean {
  if (element1 === '无' || element2 === '无') return false;
  if (element1 === element2) return false;
  
  return magicReactions.some(reaction => 
    (reaction.elements[0] === element1 && reaction.elements[1] === element2) ||
    (reaction.elements[0] === element2 && reaction.elements[1] === element1)
  );
}

// 获取元素反应
export function getReaction(element1: MagicType, element2: MagicType): MagicReaction | undefined {
  return magicReactions.find(reaction => 
    (reaction.elements[0] === element1 && reaction.elements[1] === element2) ||
    (reaction.elements[0] === element2 && reaction.elements[1] === element1)
  );
}

// 获取反应伤害加成
export function getReactionBonus(element1: MagicType, element2: MagicType): number {
  const reaction = getReaction(element1, element2);
  return reaction ? reaction.damageBonus : 0;
}

// 获取反应特殊效果
export function getReactionEffect(element1: MagicType, element2: MagicType): string | undefined {
  const reaction = getReaction(element1, element2);
  return reaction?.specialEffect;
}
