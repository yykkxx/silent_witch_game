import type { CharacterCard } from '@/types/game';

// 角色卡牌数据库 - 基于《沉默魔女的秘密》小说（正传+外传）

export const characterCards: CharacterCard[] = [
  // ========== UR级 - 传说级 ==========
  {
    id: 'theodore',
    name: '西奥多',
    title: '黑龙王·暴食之佐伊',
    element: '暗',
    maxHp: 20,
    maxMana: 10,
    rarity: 'UR',
    description: '外传最终BOSS，黑龙与古代魔导具暴食之佐伊的融合体。实力超越七贤人的总和。',
    skills: [
      {
        id: 'theodore_normal',
        name: '龙爪撕裂',
        type: 'normal',
        manaCost: 2,
        damage: 3,
        element: '暗',
        energyGain: 1,
        effect: { type: 'damage', value: 3, element: '暗' },
        description: '用黑龙的利爪撕裂敌人。'
      },
      {
        id: 'theodore_skill',
        name: '暴食吞噬',
        type: 'skill',
        manaCost: 4,
        damage: 5,
        element: '暗',
        energyGain: 1,
        effect: { 
          type: 'combo', 
          effects: [
            { type: 'damage', value: 5, element: '暗' },
            { type: 'heal', value: 2 }
          ]
        },
        description: '吞噬敌人的魔力，造成伤害并恢复自身HP。'
      },
      {
        id: 'theodore_burst',
        name: '黑龙灭世·暴食终焉',
        type: 'burst',
        manaCost: 8,
        damage: 12,
        element: '暗',
        effect: { type: 'damage', value: 12, element: '暗' },
        description: '释放黑龙王的全部力量，毁灭一切。'
      }
    ],
    passive: {
      name: '暴食之力',
      description: '每次造成伤害时，恢复造成伤害量30%的HP。',
      trigger: 'on_damage_deal',
      effect: '吸血30%'
    }
  },

  // ========== SSR级 - 七贤人级别 ==========
  {
    id: 'monica',
    name: '莫妮卡·埃瓦雷特',
    title: '沉默魔女',
    element: '风',
    maxHp: 12,
    maxMana: 8,
    rarity: 'SSR',
    description: '七贤人中最年轻的成员，世上唯一能使用无咏唱魔法的魔术师。极度怕生但实力超群。',
    skills: [
      {
        id: 'monica_normal',
        name: '风刃',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '风',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '风' },
        description: '释放锋利的风刃攻击敌人。'
      },
      {
        id: 'monica_skill',
        name: '无咏唱·风之障壁',
        type: 'skill',
        manaCost: 4,
        damage: 3,
        element: '风',
        energyGain: 1,
        effect: { 
          type: 'combo', 
          effects: [
            { type: 'damage', value: 3, element: '风' },
            { type: 'shield', value: 2 }
          ]
        },
        description: '无需咏唱即可施展的风魔法，攻击同时生成风之护盾。'
      },
      {
        id: 'monica_burst',
        name: '精灵王·西尔芙的吐息',
        type: 'burst',
        manaCost: 7,
        damage: 8,
        element: '风',
        effect: { type: 'damage', value: 8, element: '风' },
        description: '召唤风之精灵王西尔芙，释放毁灭性的风暴。这是曾击败黑龙的绝技。'
      }
    ],
    passive: {
      name: '无咏唱魔法',
      description: '莫妮卡的所有技能无需咏唱，可以瞬间发动。每回合开始时额外恢复1点魔力。',
      trigger: 'turn_start',
      effect: '魔力恢复+1'
    }
  },
  {
    id: 'louis',
    name: '路易斯·米拉',
    title: '结界魔术师',
    element: '岩',
    maxHp: 14,
    maxMana: 8,
    rarity: 'SSR',
    description: '七贤人之一，擅长各种结界魔法。曾是魔法兵团团长，讨伐龙的数量位居全年第二。',
    skills: [
      {
        id: 'louis_normal',
        name: '岩弹',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '岩',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '岩' },
        description: '发射坚硬的岩弹攻击敌人。'
      },
      {
        id: 'louis_skill',
        name: '复合结界·防壁',
        type: 'skill',
        manaCost: 4,
        damage: 0,
        element: '无',
        energyGain: 1,
        effect: { type: 'shield', value: 4 },
        description: '展开强大的复合结界，为全队提供护盾。'
      },
      {
        id: 'louis_burst',
        name: '反射结界·镜花水月',
        type: 'burst',
        manaCost: 6,
        damage: 6,
        element: '岩',
        effect: { type: 'special', handler: 'reflect_damage' },
        description: '展开反射结界，反弹敌方攻击并造成岩元素伤害。'
      }
    ],
    passive: {
      name: '结界大师',
      description: '路易斯展开的结界强度是常人的两倍。护盾值上限+2。',
      trigger: 'passive',
      effect: '护盾上限+2'
    }
  },
  {
    id: 'nero',
    name: '尼禄',
    title: '黑龙使魔',
    element: '暗',
    maxHp: 15,
    maxMana: 7,
    rarity: 'SSR',
    description: '莫妮卡的使魔，外表是黑猫，真实身份是传说中的黑龙。喜欢读小说。',
    skills: [
      {
        id: 'nero_normal',
        name: '龙爪',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '暗',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '暗' },
        description: '用锋利的龙爪撕裂敌人。'
      },
      {
        id: 'nero_skill',
        name: '冥府之火',
        type: 'skill',
        manaCost: 4,
        damage: 5,
        element: '暗',
        energyGain: 1,
        effect: { type: 'damage', value: 5, element: '暗' },
        description: '喷吐黑龙标志性的冥府之火，焚烧一切。'
      },
      {
        id: 'nero_burst',
        name: '真龙显现·黑龙降世',
        type: 'burst',
        manaCost: 7,
        damage: 9,
        element: '暗',
        effect: { type: 'damage', value: 9, element: '暗' },
        description: '显现黑龙真身，释放毁灭性的龙息。'
      }
    ],
    passive: {
      name: '龙鳞',
      description: '黑龙的鳞片提供天然防护。受到的所有伤害-1。',
      trigger: 'on_damage_taken',
      effect: '伤害减免1点'
    }
  },
  {
    id: 'nero_human',
    name: '尼洛',
    title: '黑炎使',
    element: '火',
    maxHp: 13,
    maxMana: 8,
    rarity: 'SSR',
    description: '尼禄的人类形态，黑炎使。曾与初代荆棘魔女交手并险胜。',
    skills: [
      {
        id: 'nero_human_normal',
        name: '黑炎斩',
        type: 'normal',
        manaCost: 2,
        damage: 3,
        element: '火',
        energyGain: 1,
        effect: { type: 'damage', value: 3, element: '火' },
        description: '用黑炎凝聚的刀刃斩击敌人。'
      },
      {
        id: 'nero_human_skill',
        name: '黑龙炎',
        type: 'skill',
        manaCost: 4,
        damage: 5,
        element: '火',
        energyGain: 1,
        effect: { type: 'damage', value: 5, element: '火' },
        description: '释放黑龙的火焰，焚烧一切。'
      },
      {
        id: 'nero_human_burst',
        name: '黑炎狱',
        type: 'burst',
        manaCost: 7,
        damage: 9,
        element: '火',
        effect: { type: 'damage', value: 9, element: '火' },
        description: '召唤黑炎地狱，毁灭敌人。'
      }
    ],
    passive: {
      name: '黑炎之躯',
      description: '攻击带有火元素附着的敌人时，伤害+2。',
      trigger: 'on_damage_deal',
      effect: '对火附着敌人伤害+2'
    }
  },
  {
    id: 'laura',
    name: '劳拉·罗兹堡',
    title: '第五代荆棘魔女',
    element: '雷',
    maxHp: 13,
    maxMana: 8,
    rarity: 'SSR',
    description: '外传角色，第五代荆棘魔女，单兵作战当代最强。曾与莫妮卡和希利尔交手。',
    skills: [
      {
        id: 'laura_normal',
        name: '荆棘鞭',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '雷',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '雷' },
        description: '用雷电荆棘鞭攻击敌人。'
      },
      {
        id: 'laura_skill',
        name: '荆棘之门',
        type: 'skill',
        manaCost: 4,
        damage: 4,
        element: '雷',
        energyGain: 1,
        effect: { type: 'damage', value: 4, element: '雷' },
        description: '开启荆棘之门，释放雷电之力。'
      },
      {
        id: 'laura_burst',
        name: '万雷荆棘狱',
        type: 'burst',
        manaCost: 7,
        damage: 9,
        element: '雷',
        effect: { type: 'damage', value: 9, element: '雷' },
        description: '召唤万雷荆棘，毁灭一切敌人。'
      }
    ],
    passive: {
      name: '荆棘之血',
      description: '每次使用技能后，下次技能伤害+1（可叠加）。',
      trigger: 'on_skill_use',
      effect: '技能伤害递增'
    }
  },
  {
    id: 'carla',
    name: '卡拉·马克斯威尔',
    title: '星枪魔女',
    element: '光',
    maxHp: 12,
    maxMana: 8,
    rarity: 'SSR',
    description: '外传角色，星枪魔女。可同时施展七道魔术，同时开四扇门，实力强大。',
    skills: [
      {
        id: 'carla_normal',
        name: '星之光',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '光',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '光' },
        description: '发射星光攻击敌人。'
      },
      {
        id: 'carla_skill',
        name: '星枪连射',
        type: 'skill',
        manaCost: 5,
        damage: 3,
        element: '光',
        energyGain: 1,
        effect: { type: 'special', handler: 'multi_hit_3' },
        description: '同时发射三道星枪，每道造成3点伤害。'
      },
      {
        id: 'carla_burst',
        name: '星陨灭世枪',
        type: 'burst',
        manaCost: 7,
        damage: 10,
        element: '光',
        effect: { type: 'damage', value: 10, element: '光' },
        description: '召唤陨落的星辰，毁灭敌人。'
      }
    ],
    passive: {
      name: '星之加护',
      description: '每回合开始时，有50%概率额外恢复2点魔力。',
      trigger: 'turn_start',
      effect: '50%概率魔力+2'
    }
  },
  {
    id: 'silas',
    name: '塞拉斯·佩奇',
    title: '灭龙魔术师',
    element: '火',
    maxHp: 13,
    maxMana: 8,
    rarity: 'SSR',
    description: '外传角色，灭龙魔术师，专精于讨伐龙族。',
    skills: [
      {
        id: 'silas_normal',
        name: '灭龙斩',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '火',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '火' },
        description: '对龙族特化的斩击。'
      },
      {
        id: 'silas_skill',
        name: '龙杀炮',
        type: 'skill',
        manaCost: 4,
        damage: 5,
        element: '火',
        energyGain: 1,
        effect: { type: 'damage', value: 5, element: '火' },
        description: '释放专门对付龙族的强力炮击。'
      },
      {
        id: 'silas_burst',
        name: '灭龙奥义·龙杀',
        type: 'burst',
        manaCost: 7,
        damage: 9,
        element: '火',
        effect: { type: 'damage', value: 9, element: '火' },
        description: '灭龙魔术的奥义，对所有龙族造成额外伤害。'
      }
    ],
    passive: {
      name: '灭龙专家',
      description: '对暗元素敌人伤害+2。',
      trigger: 'on_damage_deal',
      effect: '对暗元素伤害+2'
    }
  },

  // ========== SR级 - 学园主要角色/外传角色 ==========
  {
    id: 'cyril',
    name: '希利尔·艾什利',
    title: '冰之副会长',
    element: '冰',
    maxHp: 10,
    maxMana: 7,
    rarity: 'SR',
    description: '塞伦迪亚学园学生会副会长，崇拜费利克斯王子。具有魔法天赋，专精冰魔法。外传中获得白龙图勒和冰精灵安洁莉佩的协助。',
    skills: [
      {
        id: 'cyril_normal',
        name: '冰箭',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '冰',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '冰' },
        description: '发射锋利的冰箭攻击敌人。'
      },
      {
        id: 'cyril_skill',
        name: '冰晶屏障',
        type: 'skill',
        manaCost: 4,
        damage: 2,
        element: '冰',
        energyGain: 1,
        effect: { 
          type: 'combo', 
          effects: [
            { type: 'damage', value: 2, element: '冰' },
            { type: 'shield', value: 2 }
          ]
        },
        description: '释放冰魔法攻击并生成冰晶护盾。'
      },
      {
        id: 'cyril_burst',
        name: '绝对零度',
        type: 'burst',
        manaCost: 6,
        damage: 6,
        element: '冰',
        effect: { type: 'damage', value: 6, element: '冰' },
        description: '释放极寒冰魔法，冻结一切。'
      }
    ],
    passive: {
      name: '冰灵亲和',
      description: '西里尔与冰灵有特殊联系。冰元素技能伤害+1。',
      trigger: 'on_ice_damage',
      effect: '冰伤+1'
    }
  },
  {
    id: 'melissa',
    name: '梅丽莎·罗兹堡',
    title: '第四代荆棘魔女',
    element: '雷',
    maxHp: 11,
    maxMana: 7,
    rarity: 'SR',
    description: '外传角色，第四代荆棘魔女，劳拉的姐姐。前七贤人，可以开门。',
    skills: [
      {
        id: 'melissa_normal',
        name: '雷电击',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '雷',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '雷' },
        description: '释放雷电攻击敌人。'
      },
      {
        id: 'melissa_skill',
        name: '荆棘缠绕',
        type: 'skill',
        manaCost: 4,
        damage: 4,
        element: '雷',
        energyGain: 1,
        effect: { type: 'damage', value: 4, element: '雷' },
        description: '用雷电荆棘缠绕敌人。'
      },
      {
        id: 'melissa_burst',
        name: '雷狱荆棘',
        type: 'burst',
        manaCost: 6,
        damage: 7,
        element: '雷',
        effect: { type: 'damage', value: 7, element: '雷' },
        description: '召唤雷电荆棘狱，困住敌人。'
      }
    ],
    passive: {
      name: '荆棘传承',
      description: '与劳拉同时上场时，双方伤害+1。',
      trigger: 'passive',
      effect: '姐妹羁绊'
    }
  },
  {
    id: 'ray',
    name: '雷·欧布莱特',
    title: '第三代深渊咒术师',
    element: '暗',
    maxHp: 9,
    maxMana: 8,
    rarity: 'SR',
    description: '外传角色，第三代深渊咒术师。对人一换一，完全打不了非人。',
    skills: [
      {
        id: 'ray_normal',
        name: '诅咒',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '暗',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '暗' },
        description: '对敌人施加诅咒。'
      },
      {
        id: 'ray_skill',
        name: '深渊诅咒',
        type: 'skill',
        manaCost: 4,
        damage: 4,
        element: '暗',
        energyGain: 1,
        effect: { type: 'damage', value: 4, element: '暗' },
        description: '释放深渊的诅咒，造成持续伤害。'
      },
      {
        id: 'ray_burst',
        name: '咒杀',
        type: 'burst',
        manaCost: 5,
        damage: 8,
        element: '暗',
        effect: { type: 'damage', value: 8, element: '暗' },
        description: '以生命为代价的咒杀之术。'
      }
    ],
    passive: {
      name: '深渊代价',
      description: '每次使用技能时，自身受到1点伤害。',
      trigger: 'on_skill_use',
      effect: '自伤1点'
    }
  },
  {
    id: 'melily',
    name: '梅尔丽',
    title: '咏星魔女',
    element: '光',
    maxHp: 10,
    maxMana: 7,
    rarity: 'SR',
    description: '外传角色，咏星魔女。持有古代魔导具纺星的米拉。',
    skills: [
      {
        id: 'melily_normal',
        name: '星光',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '光',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '光' },
        description: '发射星光攻击敌人。'
      },
      {
        id: 'melily_skill',
        name: '星之治愈',
        type: 'skill',
        manaCost: 4,
        damage: 0,
        element: '无',
        energyGain: 1,
        effect: { type: 'heal', value: 5 },
        description: '用星光治愈队友。'
      },
      {
        id: 'melily_burst',
        name: '星之加护',
        type: 'burst',
        manaCost: 6,
        damage: 5,
        element: '光',
        effect: { 
          type: 'combo', 
          effects: [
            { type: 'damage', value: 5, element: '光' },
            { type: 'heal', value: 3 }
          ]
        },
        description: '召唤星之加护，攻击敌人并治愈队友。'
      }
    ],
    passive: {
      name: '纺星的加护',
      description: '受到致命伤害时，有30%概率保留1点HP。',
      trigger: 'on_fatal_damage',
      effect: '30%概率免死'
    }
  },
  {
    id: 'bradford',
    name: '布拉德福·费尔斯顿',
    title: '炮弹魔术师',
    element: '火',
    maxHp: 11,
    maxMana: 7,
    rarity: 'SR',
    description: '外传角色，炮弹魔术师。擅长六重强化，一发入魂。',
    skills: [
      {
        id: 'bradford_normal',
        name: '火球',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '火',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '火' },
        description: '发射火球攻击敌人。'
      },
      {
        id: 'bradford_skill',
        name: '六重强化',
        type: 'skill',
        manaCost: 5,
        damage: 6,
        element: '火',
        energyGain: 1,
        effect: { type: 'damage', value: 6, element: '火' },
        description: '六重强化的炮弹，造成巨大伤害。'
      },
      {
        id: 'bradford_burst',
        name: '究极炮弹',
        type: 'burst',
        manaCost: 7,
        damage: 9,
        element: '火',
        effect: { type: 'damage', value: 9, element: '火' },
        description: '究极强化炮弹，一发入魂。'
      }
    ],
    passive: {
      name: '炮弹专家',
      description: '火元素技能有20%概率造成双倍伤害。',
      trigger: 'on_fire_damage',
      effect: '20%概率暴击'
    }
  },
  {
    id: 'guren',
    name: '古莲·达德利',
    title: '未来之星',
    element: '风',
    maxHp: 10,
    maxMana: 7,
    rarity: 'SR',
    description: '外传角色，古莲·达德利。参与西奥多的讨伐，未来可期。',
    skills: [
      {
        id: 'guren_normal',
        name: '风刃',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '风',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '风' },
        description: '释放风刃攻击敌人。'
      },
      {
        id: 'guren_skill',
        name: '疾风斩',
        type: 'skill',
        manaCost: 4,
        damage: 4,
        element: '风',
        energyGain: 1,
        effect: { type: 'damage', value: 4, element: '风' },
        description: '以疾风之势斩击敌人。'
      },
      {
        id: 'guren_burst',
        name: '风暴',
        type: 'burst',
        manaCost: 6,
        damage: 7,
        element: '风',
        effect: { type: 'damage', value: 7, element: '风' },
        description: '召唤风暴攻击敌人。'
      }
    ],
    passive: {
      name: '成长潜力',
      description: '每经过3回合，所有技能伤害+1。',
      trigger: 'turn_start',
      effect: '成长型'
    }
  },

  // ========== R级 - 其他角色 ==========
  {
    id: 'felix',
    name: '费利克斯·阿克·里迪尔',
    title: '第二王子',
    element: '光',
    maxHp: 11,
    maxMana: 7,
    rarity: 'R',
    description: '里迪尔王国第二王子，塞伦迪亚学园学生会长。卷入王位争夺战，经常成为暗杀目标。',
    skills: [
      {
        id: 'felix_normal',
        name: '王权之剑',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '光',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '光' },
        description: '以王族之剑进行攻击。'
      },
      {
        id: 'felix_skill',
        name: '王之号令',
        type: 'skill',
        manaCost: 3,
        damage: 0,
        element: '无',
        energyGain: 2,
        effect: { type: 'energy', value: 2 },
        description: '以王者的威严激励队友，为出战角色恢复能量。'
      },
      {
        id: 'felix_burst',
        name: '王家的荣耀',
        type: 'burst',
        manaCost: 6,
        damage: 6,
        element: '光',
        effect: { type: 'damage', value: 6, element: '光' },
        description: '释放王族传承的神圣之力。'
      }
    ],
    passive: {
      name: '王者的威严',
      description: '王子的存在激励着队友。所有队友攻击力+1。',
      trigger: 'passive',
      effect: '全队攻击+1'
    }
  },
  {
    id: 'isabelle',
    name: '伊莎贝尔·诺顿',
    title: '知晓秘密的少女',
    element: '水',
    maxHp: 9,
    maxMana: 7,
    rarity: 'R',
    description: '凯尔贝克伯爵之女，少数知晓莫妮卡真实身份的朋友。在幕后协助莫妮卡。',
    skills: [
      {
        id: 'isabelle_normal',
        name: '水弹',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '水',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '水' },
        description: '发射水弹攻击敌人。'
      },
      {
        id: 'isabelle_skill',
        name: '治愈之水',
        type: 'skill',
        manaCost: 4,
        damage: 0,
        element: '无',
        energyGain: 1,
        effect: { type: 'heal', value: 4 },
        description: '使用水魔法治愈队友。'
      },
      {
        id: 'isabelle_burst',
        name: '流水护盾',
        type: 'burst',
        manaCost: 5,
        damage: 3,
        element: '水',
        effect: { 
          type: 'combo', 
          effects: [
            { type: 'damage', value: 3, element: '水' },
            { type: 'heal', value: 3 }
          ]
        },
        description: '释放流水攻击敌人并治愈队友。'
      }
    ],
    passive: {
      name: '秘密协助',
      description: '伊莎贝尔在暗中支援。每回合开始时，有50%概率为队友恢复1点HP。',
      trigger: 'turn_start',
      effect: '50%概率恢复1HP'
    }
  },
  {
    id: 'elliott',
    name: '艾略特·霍华德',
    title: '严格的书纪',
    element: '火',
    maxHp: 10,
    maxMana: 7,
    rarity: 'R',
    description: '塞伦迪亚学园学生会书记，达兹维伯爵长子。对自己和他人都要求严格。',
    skills: [
      {
        id: 'elliott_normal',
        name: '火球',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '火',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '火' },
        description: '发射火球攻击敌人。'
      },
      {
        id: 'elliott_skill',
        name: '烈焰斩',
        type: 'skill',
        manaCost: 4,
        damage: 4,
        element: '火',
        energyGain: 1,
        effect: { type: 'damage', value: 4, element: '火' },
        description: '释放火焰斩击。'
      },
      {
        id: 'elliott_burst',
        name: '审判之火',
        type: 'burst',
        manaCost: 6,
        damage: 6,
        element: '火',
        effect: { type: 'damage', value: 6, element: '火' },
        description: '以贵族的威严释放审判烈焰。'
      }
    ]
  },
  {
    id: 'bridget',
    name: '布里吉特·格雷汉姆',
    title: '完美的大小姐',
    element: '雷',
    maxHp: 9,
    maxMana: 7,
    rarity: 'R',
    description: '塞伦迪亚学园学生会书记，谢尔贝里侯爵之女。成绩优异，精通外语，学校三大美女之一。',
    skills: [
      {
        id: 'bridget_normal',
        name: '雷击',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '雷',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '雷' },
        description: '释放雷电攻击敌人。'
      },
      {
        id: 'bridget_skill',
        name: '连锁闪电',
        type: 'skill',
        manaCost: 4,
        damage: 3,
        element: '雷',
        energyGain: 1,
        effect: { type: 'damage', value: 3, element: '雷' },
        description: '释放连锁闪电攻击敌人。'
      },
      {
        id: 'bridget_burst',
        name: '雷霆万钧',
        type: 'burst',
        manaCost: 6,
        damage: 6,
        element: '雷',
        effect: { type: 'damage', value: 6, element: '雷' },
        description: '召唤雷霆轰击敌人。'
      }
    ]
  },
  {
    id: 'lana',
    name: '拉娜·科莱特',
    title: '商人的女儿',
    element: '无',
    maxHp: 8,
    maxMana: 8,
    rarity: 'R',
    description: '莫妮卡的同班同学，富商之女。被贵族嘲笑为"暴发户"，但意志坚强。',
    skills: [
      {
        id: 'lana_normal',
        name: '投掷',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '无',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '无' },
        description: '投掷物品攻击敌人。'
      },
      {
        id: 'lana_skill',
        name: '商业谈判',
        type: 'skill',
        manaCost: 3,
        damage: 0,
        element: '无',
        energyGain: 1,
        effect: { type: 'draw_card', count: 2 },
        description: '抽取两张卡牌。'
      },
      {
        id: 'lana_burst',
        name: '金钱攻势',
        type: 'burst',
        manaCost: 6,
        damage: 7,
        element: '无',
        effect: { type: 'damage', value: 7, element: '无' },
        description: '用金钱的力量压倒敌人。'
      }
    ]
  },
  {
    id: 'zoe',
    name: '佐伊',
    title: '暴食之佐伊',
    element: '影',
    maxHp: 14,
    maxMana: 8,
    rarity: 'R',
    description: '外传中的神秘敌人，能够操控影子进行攻击，给里迪尔王国带来大量牺牲者。',
    skills: [
      {
        id: 'zoe_normal',
        name: '影刃',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '影',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '影' },
        description: '用影子凝聚的刀刃攻击敌人。'
      },
      {
        id: 'zoe_skill',
        name: '影子侵蚀',
        type: 'skill',
        manaCost: 4,
        damage: 4,
        element: '影',
        energyGain: 1,
        effect: { type: 'damage', value: 4, element: '影' },
        description: '用影子侵蚀敌人，造成持续伤害。'
      },
      {
        id: 'zoe_burst',
        name: '暴食之影·暗影吞噬',
        type: 'burst',
        manaCost: 7,
        damage: 8,
        element: '影',
        effect: { type: 'damage', value: 8, element: '影' },
        description: '释放暴食之影的力量，吞噬一切光明。'
      }
    ],
    passive: {
      name: '影子操控',
      description: '佐伊可以操控影子。对带有元素附着的敌人伤害+2。',
      trigger: 'on_damage_deal',
      effect: '对附着敌人伤害+2'
    }
  },
  {
    id: 'thule',
    name: '图勒',
    title: '白龙',
    element: '冰',
    maxHp: 11,
    maxMana: 7,
    rarity: 'R',
    description: '外传角色，白龙图勒。黑龙对策卡，高攻低防。参与西奥多的讨伐。',
    skills: [
      {
        id: 'thule_normal',
        name: '龙息',
        type: 'normal',
        manaCost: 2,
        damage: 3,
        element: '冰',
        energyGain: 1,
        effect: { type: 'damage', value: 3, element: '冰' },
        description: '喷吐冰霜龙息。'
      },
      {
        id: 'thule_skill',
        name: '冰龙爪',
        type: 'skill',
        manaCost: 4,
        damage: 5,
        element: '冰',
        energyGain: 1,
        effect: { type: 'damage', value: 5, element: '冰' },
        description: '用冰龙爪撕裂敌人。'
      },
      {
        id: 'thule_burst',
        name: '绝对冰封',
        type: 'burst',
        manaCost: 6,
        damage: 8,
        element: '冰',
        effect: { type: 'damage', value: 8, element: '冰' },
        description: '释放白龙的绝对冰封之力。'
      }
    ],
    passive: {
      name: '黑龙克星',
      description: '对暗元素敌人伤害+2。',
      trigger: 'on_damage_deal',
      effect: '对暗元素伤害+2'
    }
  },
  {
    id: 'anjelique',
    name: '安洁莉佩',
    title: '冰精灵',
    element: '冰',
    maxHp: 10,
    maxMana: 8,
    rarity: 'R',
    description: '外传角色，远古高位冰精灵。参与西奥多的讨伐，被梅丽莎和劳拉携手击败。',
    skills: [
      {
        id: 'anjelique_normal',
        name: '冰晶',
        type: 'normal',
        manaCost: 2,
        damage: 2,
        element: '冰',
        energyGain: 1,
        effect: { type: 'damage', value: 2, element: '冰' },
        description: '发射冰晶攻击敌人。'
      },
      {
        id: 'anjelique_skill',
        name: '冰风暴',
        type: 'skill',
        manaCost: 4,
        damage: 4,
        element: '冰',
        energyGain: 1,
        effect: { type: 'damage', value: 4, element: '冰' },
        description: '召唤冰风暴攻击敌人。'
      },
      {
        id: 'anjelique_burst',
        name: '远古冰封',
        type: 'burst',
        manaCost: 6,
        damage: 7,
        element: '冰',
        effect: { type: 'damage', value: 7, element: '冰' },
        description: '释放远古冰精灵的冰封之力。'
      }
    ],
    passive: {
      name: '远古精灵',
      description: '冰元素技能有30%概率不消耗魔力。',
      trigger: 'on_skill_use',
      effect: '30%概率免消耗'
    }
  }
];

// 获取角色卡牌
export function getCharacterById(id: string): CharacterCard | undefined {
  return characterCards.find(char => char.id === id);
}

// 获取所有角色
export function getAllCharacters(): CharacterCard[] {
  return characterCards;
}

// 获取特定稀有度的角色
export function getCharactersByRarity(rarity: 'UR' | 'SSR' | 'SR' | 'R'): CharacterCard[] {
  return characterCards.filter(char => char.rarity === rarity);
}
