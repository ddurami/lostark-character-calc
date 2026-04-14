const WEAPON_QUALITY_TABLE = [
  [0, 10.0],
  [5, 10.05],
  [10, 10.2],
  [15, 10.45],
  [20, 10.8],
  [25, 11.25],
  [30, 11.8],
  [35, 12.45],
  [40, 13.2],
  [45, 14.05],
  [50, 15.0],
  [55, 16.05],
  [60, 17.2],
  [65, 18.45],
  [70, 19.8],
  [75, 21.25],
  [80, 22.8],
  [85, 24.45],
  [90, 26.2],
  [95, 28.05],
  [100, 30.0],
];

export function getWeaponAdditionalDmg(quality) {
  quality = Math.max(0, Math.min(100, Math.floor(quality)));
  const idx = Math.min(Math.floor(quality / 5), 19);
  const [lq, ld] = WEAPON_QUALITY_TABLE[idx];
  const [, ud] = WEAPON_QUALITY_TABLE[idx + 1] || [lq, ld];
  const frac = (quality - lq) / 5;
  return Math.floor((ld + (ud - ld) * frac) * 100) / 100;
}

export const BANQUET_OPTIONS = [
  { value: 'none', label: '없음' },
  { value: '3.5', label: '3.5%' },
  { value: '5', label: '5%' },
  { value: '6', label: '6%' },
];

export const PARTY_SYNERGY_OPTIONS = [
  { value: 'none', label: '없음' },
  { value: '10', label: '10%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30%' },
];

export const NECKLACE_OPTIONS = [
  { value: 'none', label: '없음', additionalDmg: 0 },
  { value: '0.70', label: '0.70%', additionalDmg: 0.7 },
  { value: '1.60', label: '1.60%', additionalDmg: 1.6 },
  { value: '2.60', label: '2.60%', additionalDmg: 2.6 },
];

export const RING_CRIT_RATE_OPTIONS = [
  { value: 'none', label: '없음', critRate: 0 },
  { value: '0.40', label: '0.40%', critRate: 0.4 },
  { value: '0.95', label: '0.95%', critRate: 0.95 },
  { value: '1.55', label: '1.55%', critRate: 1.55 },
];

export const RING_CRIT_DMG_OPTIONS = [
  { value: 'none', label: '없음', critDmg: 0 },
  { value: '1.10', label: '1.10%', critDmg: 1.1 },
  { value: '2.40', label: '2.40%', critDmg: 2.4 },
  { value: '4.00', label: '4.00%', critDmg: 4.0 },
];

export const BRACELET_OPTIONS = [
  { value: 'none', label: '없음' },
  { value: 'ad3.0', label: '추가 피해 3.0%', additionalDmg: 3.0 },
  { value: 'ad3.5', label: '추가 피해 3.5%', additionalDmg: 3.5 },
  { value: 'ad4.0', label: '추가 피해 4.0%', additionalDmg: 4.0 },
  { value: 'cr3.4', label: '치명타 적중률 3.4%', critRate: 3.4 },
  { value: 'cr4.2', label: '치명타 적중률 4.2%', critRate: 4.2 },
  { value: 'cr5.0', label: '치명타 적중률 5.0%', critRate: 5.0 },
  { value: 'cd6.4', label: '치명타 피해 6.4%', critDmg: 6.4 },
  { value: 'cd8.4', label: '치명타 피해 8.4%', critDmg: 8.4 },
  { value: 'cd10.0', label: '치명타 피해 10.0%', critDmg: 10.0 },
  {
    value: 'ad2.5d',
    label: '추가 피해 2.5% 악마 및 대악마 2.5%',
    additionalDmg: 2.5,
  },
  {
    value: 'ad3.0d',
    label: '추가 피해 3.0% 악마 및 대악마 2.5%',
    additionalDmg: 3.0,
  },
  {
    value: 'ad3.5d',
    label: '추가 피해 3.5% 악마 및 대악마 2.5%',
    additionalDmg: 3.5,
  },
  {
    value: 'cr3.4e',
    label: '치명타 적중률 3.4% 치명타로 적중 시 적에게 주는 피해 1.5%',
    critRate: 3.4,
    critEnemyDmg: 1.5,
  },
  {
    value: 'cr4.2e',
    label: '치명타 적중률 4.2% 치명타로 적중 시 적에게 주는 피해 1.5%',
    critRate: 4.2,
    critEnemyDmg: 1.5,
  },
  {
    value: 'cr5.0e',
    label: '치명타 적중률 5.0% 치명타로 적중 시 적에게 주는 피해 1.5%',
    critRate: 5.0,
    critEnemyDmg: 1.5,
  },
  {
    value: 'cd6.8e',
    label: '치명타 피해 6.8% 치명타로 적중 시 적에게 주는 피해 1.5%',
    critDmg: 6.8,
    critEnemyDmg: 1.5,
  },
  {
    value: 'cd8.4e',
    label: '치명타 피해 8.4% 치명타로 적중 시 적에게 주는 피해 1.5%',
    critDmg: 8.4,
    critEnemyDmg: 1.5,
  },
  {
    value: 'cd10.0e',
    label: '치명타 피해 10.0% 치명타로 적중 시 적에게 주는 피해 1.5%',
    critDmg: 10.0,
    critEnemyDmg: 1.5,
  },
  { value: 'sp4', label: '공격 및 이동 속도 4%', atkSpeed: 4, moveSpeed: 4 },
  { value: 'sp5', label: '공격 및 이동 속도 5%', atkSpeed: 5, moveSpeed: 5 },
  { value: 'sp6', label: '공격 및 이동 속도 6%', atkSpeed: 6, moveSpeed: 6 },
  {
    value: 'sp6s',
    label: '공격 적중 시 무기 공격력, 공격 및 이동 속도 1% 증가(최대 6중첩)',
    atkSpeed: 6,
    moveSpeed: 6,
  },
];

export const ENGRAVING_GRADE_OPTIONS = [
  { value: 'none', label: '없음' },
  { value: 'legend20', label: '전설 20' },
  { value: 'relic5', label: '유물 5' },
  { value: 'relic10', label: '유물 10' },
  { value: 'relic15', label: '유물 15' },
  { value: 'relic20', label: '유물 20' },
];

export const STONE_LEVEL_OPTIONS = [
  { value: 0, label: '없음' },
  { value: 1, label: '1Lv' },
  { value: 2, label: '2Lv' },
  { value: 3, label: '3Lv' },
  { value: 4, label: '4Lv' },
];

export const ADRENALINE_CRIT = {
  none: 0,
  legend20: 14,
  relic5: 15.5,
  relic10: 17,
  relic15: 18.5,
  relic20: 20,
};

export const KBW_CRIT_DMG = {
  none: 0,
  legend20: 44,
  relic5: 46,
  relic10: 48,
  relic15: 50,
  relic20: 52,
};

export const RC_CONVERSION = {
  none: 0,
  legend20: 40,
  relic5: 42,
  relic10: 44,
  relic15: 46,
  relic20: 48,
};

export const STONE_BONUS = { 0: 0, 1: 7.5, 2: 9.4, 3: 13.2, 4: 15 };

export const EVO_2T_NODES = [
  {
    key: 'evo2EndlessMana',
    label: '끝없는 마나',
    image: '2T1.png',
    maxLevel: 2,
  },
  {
    key: 'evo2ForbiddenSpell',
    label: '금단의 주문',
    image: '2T2.png',
    maxLevel: 2,
  },
  { key: 'evo2KeenSense', label: '예리한 감각', image: '2T3.png', maxLevel: 2 },
  { key: 'evo2LimitBreak', label: '한계 돌파', image: '2T4.png', maxLevel: 3 },
  {
    key: 'evo2OptTraining',
    label: '최적화 훈련',
    image: '2T5.png',
    maxLevel: 2,
  },
  {
    key: 'evo2BlessedGoddess',
    label: '축복의 여신',
    image: '2T6.png',
    maxLevel: 3,
  },
];

export const EVO_3T_NODES = [
  {
    key: 'evo3InfinitePower',
    label: '무한한 마력',
    image: '3T1.png',
    maxLevel: 2,
  },
  {
    key: 'evo3AllOutStrike',
    label: '혼신의 강타',
    image: '3T2.png',
    maxLevel: 2,
  },
  { key: 'evo3OneShot', label: '일격', image: '3T3.png', maxLevel: 2 },
  {
    key: 'evo3DestructionTank',
    label: '파괴 전차',
    image: '3T4.png',
    maxLevel: 2,
  },
  {
    key: 'evo3TimingDomination',
    label: '타이밍 지배',
    image: '3T5.png',
    maxLevel: 2,
  },
  {
    key: 'evo3PassionateDance',
    label: '정열의 춤사위',
    image: '3T6.png',
    maxLevel: 2,
  },
];

export const EVO_4T_NODES = [
  { key: 'evo4Hoesim', label: '회심', image: '4T1.png', maxLevel: 1 },
  { key: 'evo4Dalin', label: '달인', image: '4T2.png', maxLevel: 1 },
  { key: 'evo4Bunswae', label: '분쇄', image: '4T3.png', maxLevel: 1 },
  { key: 'evo4Seongakja', label: '선각자', image: '4T4.png', maxLevel: 1 },
  { key: 'evo4Jingun', label: '진군', image: '4T5.png', maxLevel: 1 },
  { key: 'evo4Giwon', label: '기원', image: '4T6.png', maxLevel: 1 },
];

export const EVO_5T_NODES = [
  { key: 'evo5Munga', label: '뭉툭한 가시', image: '5T1.png', maxLevel: 2 },
  { key: 'evo5Eumdol', label: '음속 돌파', image: '5T2.png', maxLevel: 2 },
  { key: 'evo5Infighting', label: '인파이팅', image: '5T3.png', maxLevel: 2 },
  {
    key: 'evo5StandStriker',
    label: '입식 타격가',
    image: '5T4.png',
    maxLevel: 2,
  },
  {
    key: 'evo5ManaFurnace',
    label: '마나 용광로',
    image: '5T5.png',
    maxLevel: 2,
  },
  {
    key: 'evo5StableManager',
    label: '안정된 관리자',
    image: '5T6.png',
    maxLevel: 2,
  },
];

export const TIER_CONFIG = {
  '2T': { maxPoints: 30, pointCost: 10 },
  '3T': { maxPoints: 20, pointCost: 10 },
  '4T': { maxPoints: 20, pointCost: 10 },
  '5T': { maxPoints: 30, pointCost: 15 },
};

export const CLASS_DATA = [
  {
    category: '전사',
    classes: [
      { value: 'berserker', label: '버서커', insights: ['비기', '광기'] },
      { value: 'destroyer', label: '디스트로이어', insights: ['분망', '중수'] },
      { value: 'warlord', label: '워로드', insights: ['고기', '전태'] },
      { value: 'holyknight', label: '홀리나이트', insights: ['심판', '축오'] },
      { value: 'slayer', label: '슬레이어', insights: ['처단', '포식'] },
      { value: 'valkyrie', label: '발키리', insights: ['기사', '해방'] },
    ],
  },
  {
    category: '마법사',
    classes: [
      { value: 'arcana', label: '아르카나', insights: ['황후', '황제'] },
      { value: 'summoner', label: '서머너', insights: ['교감', '상소'] },
      { value: 'bard', label: '바드', insights: ['절구', '진용'] },
      { value: 'sorceress', label: '소서리스', insights: ['점화', '환류'] },
    ],
  },
  {
    category: '무도가',
    classes: [
      {
        value: 'battlemaster',
        label: '배틀마스터',
        insights: ['초심', '오의'],
      },
      { value: 'infighter', label: '인파이터', insights: ['체술', '충단'] },
      { value: 'soulmaster', label: '기공사', insights: ['세맥', '역천'] },
      { value: 'lancemaster', label: '창술사', insights: ['절제', '절정'] },
      { value: 'striker', label: '스트라이커', insights: ['난무', '일격'] },
      { value: 'breaker', label: '브레이커', insights: ['권왕', '수라'] },
    ],
  },
  {
    category: '암살자',
    classes: [
      { value: 'blade', label: '블레이드', insights: ['버스트', '잔재'] },
      { value: 'demonic', label: '데모닉', insights: ['충동', '억제'] },
      { value: 'reaper', label: '리퍼', insights: ['달소', '갈증'] },
      { value: 'souleater', label: '소울이터', insights: ['만월', '그믐'] },
    ],
  },
  {
    category: '헌터',
    classes: [
      { value: 'hawkeye', label: '호크아이', insights: ['죽습', '두동'] },
      { value: 'devilhunter', label: '데빌헌터', insights: ['전탄', '핸드'] },
      { value: 'blaster', label: '블래스터', insights: ['포강', '화강'] },
      { value: 'scouter', label: '스카우터', insights: ['유산', '기술'] },
      { value: 'gunslinger', label: '건슬링어', insights: ['피메', '사시'] },
    ],
  },
  {
    category: '스페셜리스트',
    classes: [
      { value: 'artist', label: '도화가', insights: ['만개', '회귀'] },
      { value: 'aeromancer', label: '기상술사', insights: ['질풍', '이슬비'] },
      { value: 'wildsoul', label: '환수사', insights: ['야성', '환각'] },
    ],
  },
  {
    category: '오리지널',
    classes: [
      {
        value: 'guardknight',
        label: '가디언나이트',
        insights: ['업화', '로어'],
      },
    ],
  },
];

export const EVO_NODE_DESC = {
  evo2EndlessMana: {
    text: '마나 사용 스킬의 재사용 대기시간이 {0} 감소하고, 마나 소모량이 {1} 감소합니다.',
    positive: [
      ['7.0%', '14.0%'],
      ['10.0%', '20.0%'],
    ],
  },
  evo2ForbiddenSpell: {
    text: '진화형 피해가 {0} 증가, 마나 스킬의 진화형 피해는 {1} 더 증가하고, 마나 소모량이 {2} 감소합니다.',
    positive: [
      ['5.0%', '10.0%'],
      ['5.0%', '10.0%'],
      ['6.0%', '12.0%'],
    ],
  },
  evo2KeenSense: {
    text: '치명타 적중률이 {0} 증가하고, 진화형 피해가 {1} 증가합니다.',
    positive: [
      ['4.0%', '8.0%'],
      ['5.0%', '10.0%'],
    ],
  },
  evo2LimitBreak: {
    text: '진화형 피해가 {0} 증가합니다.',
    positive: [['10.0%', '20.0%', '30.0%']],
  },
  evo2OptTraining: {
    text: '각성기, 이동 및 기상기를 제외한 스킬의 재사용 대기시간이 {0} 감소하고, 진화형 피해 {1} 증가합니다.',
    positive: [
      ['4.0%', '8.0%'],
      ['5.0%', '10.0%'],
    ],
  },
  evo2BlessedGoddess: {
    text: "전투 중 자신 및 주변 파티원에게 '전투 축복' 효과를 적용합니다.(20초 지속, 매 초마다 갱신)\n전투 축복: 공격 및 이동 속도 {0} 증가",
    positive: [['3.0%', '6.0%', '9.0%']],
  },
  evo3InfinitePower: {
    text: '진화형 피해가 {0} 증가하고, 마나 스킬의 재사용 대기시간이 {1} 감소, 마나 소모량이 {2} 감소합니다.',
    positive: [
      ['8.0%', '16.0%'],
      ['7.0%', '14.0%'],
      ['8.0%', '16.0%'],
    ],
  },
  evo3AllOutStrike: {
    text: '치명타 적중률이 {0} 증가하고, 진화형 피해가 {1} 증가합니다.',
    positive: [
      ['12.0%', '24.0%'],
      ['2.0%', '4.0%'],
    ],
  },
  evo3OneShot: {
    text: '치명타 적중률이 {0} 증가하고, 방향성 공격 스킬의 치명타 피해가 {1} 증가합니다.',
    positive: [
      ['10.0%', '20.0%'],
      ['16.0%', '32.0%'],
    ],
  },
  evo3DestructionTank: {
    text: '진화형 피해가 {0} 증가하고, 공격 속도가 {1} 증가합니다.',
    positive: [
      ['12.0%', '24.0%'],
      ['4.0%', '8.0%'],
    ],
  },
  evo3TimingDomination: {
    text: '각성기, 이동 및 기상기를 제외한 스킬의 재사용 대기시간이 {0} 감소하고, 진화형 피해가 {1} 증가합니다.',
    positive: [
      ['5.0%', '10.0%'],
      ['8.0%', '16.0%'],
    ],
  },
  evo3PassionateDance: {
    text: "적중 시 아이덴티티 게이지 획득량이 {0} 증가합니다. 전투 중 자신 및 주변 파티원에게 '정열의 춤' 효과를 적용합니다.(20초 지속, 매 초마다 갱신)\n정열의 춤: 진화형 피해 {1} 증가",
    positive: [
      ['10.0%', '20.0%'],
      ['7.0%', '14.0%'],
    ],
  },
  evo4Hoesim: {
    text: '공격이 치명타로 적중 시 적에게 주는 피해가 {0} 증가하며, 받는 피해가 {1} 감소합니다.',
    positive: [['12.0%'], ['4.0%']],
  },
  evo4Dalin: {
    text: "받는 피해가 {0} 감소하며, 이동기 및 기상기를 제외한 스킬 사용시 10초간 '달인' 효과를 얻습니다.\n달인: 치명타 적중률 {1} / 추가 피해 {2}, 최대 5중첩",
    positive: [['4.0%'], ['+1.4%'], ['+1.7%']],
  },
  evo4Bunswae: {
    text: '진화형 피해가 {0} 증가하며, 받는 피해가 {1} 감소합니다.',
    positive: [['20.0%'], ['4.0%']],
  },
  evo4Seongakja: {
    text: "최대 생명력이 {0} 증가합니다.\n이동기 및 기상기를 제외한 스킬 사용시 10초간 '통찰' 효과를 얻습니다. '통찰' 중첩이 최대에 도달하면 아군 공격력 강화 효과가 추가로 {1} 증가하고, 기상기 및 각성기를 제외한 스킬의 재사용 대기시간이 {2} 감소합니다.\n통찰: 아군 공격력 강화 효과 {3}, 최대 5중첩",
    positive: [['6.0%'], ['11.0%'], ['5.0%'], ['+2.2%']],
  },
  evo4Jingun: {
    text: "최대 생명력이 {0} 증가합니다.\n아군에게 보호 효과 사용 시 자신의 5m 이내에 '진군 에테르'를 생성합니다. (발동 재사용 대기시간 7초)\n진군 에테르: 15초간 아군 공격력 강화 효과 {1} / 공격속도 {2} / 이동속도 {3}",
    positive: [['6.0%'], ['+24.0%'], ['+4.0%'], ['+4.0%']],
  },
  evo4Giwon: {
    text: '최대 생명력이 {0} 증가합니다.\n아군 공격력 강화 효과가 {1} 증가하고, 낙인력이 {2} 증가합니다.',
    positive: [['6.0%'], ['22.0%'], ['4.0%']],
  },
  evo5Munga: {
    text: '진화형 피해가 {0} 증가합니다. 치명타가 발생할 확률이 최대 {n0}로 제한됩니다. 공격 시, 초과한 모든 치명타가 발생할 확률의 {1}가 진화형 피해로 전환됩니다. 이 노드에 의한 진화형 피해는 최대 {2}까지 적용됩니다.',
    positive: [
      ['7.5%', '15.0%'],
      ['125.0%', '150.0%'],
      ['52.5%', '75.0%'],
    ],
    negative: [['80.0%']],
  },
  evo5Eumdol: {
    text: '공격 적중 시, 공격 속도 및 이동 속도 증가량의 {0}만큼 진화형 피해가 증가합니다. 공격 및 이동 속도가 모두 상한을 초과했다면, 진화형 피해가 추가로 {1} 증가하며, 상한을 초과한 속도 증가량의 {2}만큼 적중 시 진화형 피해가 증가합니다. 이 노드에 의한 진화형 피해는 최대 {3}까지 적용됩니다.',
    positive: [
      ['5.0%', '10.0%'],
      ['4.0%', '8.0%'],
      ['15.0%', '30.0%'],
      ['12.0%', '24.0%'],
    ],
  },
  evo5Infighting: {
    text: "공격 적중 시, '정면 승부' 효과를 얻습니다. (10초 지속, 재사용 대기시간 5초)\n정면 승부: 진화형 피해 {0}",
    positive: [['+9%', '+18%']],
  },
  evo5StandStriker: {
    text: "진화형 피해가 {0}, 낙인력이 {1} 증가합니다.\n전투 시작 후, '입식 타격' 효과를 최대로 얻습니다. 피격 이상 시 중첩을 3회 잃습니다. 이후 2초가 지날 때마다 효과를 1중첩 회복합니다.\n입식 타격: 진화형 피해 {2} / 낙인력 {3}, 최대 6중첩",
    positive: [
      ['6.0%', '12.0%'],
      ['4.0%', '8.0%'],
      ['+0.75%', '+1.5%'],
      ['+1.0%', '+2.0%'],
    ],
  },
  evo5ManaFurnace: {
    text: '낙인력이 {0} 증가합니다. 마나를 소모하는 스킬 사용 시, 최대 마나의 {n0}가 추가로 소모됩니다.\n해당 스킬로 피해를 줄 경우, 스킬의 증감 전 기본 마나 소모량에 비례하여 진화형 피해가 증가합니다. (기본 마나 소모량 10당, 진화형 피해 {1} 증가, 최대 {2})',
    positive: [
      ['10.0%', '20.0%'],
      ['0.25%', '0.5%'],
      ['12.0%', '24.0%'],
    ],
    negative: [['2.0%']],
  },
  evo5StableManager: {
    text: '낙인력이 {0} 증가하지만, 아이덴티티 게이지 획득량이 {n0} 감소합니다.',
    positive: [['10.0%', '20.0%']],
    negative: [['3.0%', '6.0%']],
  },
};

export function findOption(options, value) {
  return options.find((o) => String(o.value) === String(value)) || options[0];
}

export const f2 = (v) => Math.floor(v * 100) / 100;

export const CLASS_BONUS = {
  destroyer: [
    {
      critRate: 18,
      critDmg: 51,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 2T: 치명타 적중률 18%', '깨달음 3T: 치명타 피해 51%'],
    },
    {
      critRate: 30,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 3T: 치명타 적중률 30%'],
    },
  ],
  warlord: [
    {
      critRate: 15,
      critDmg: 45,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 2T: 치명타 적중률 15%', '깨달음 4T: 치명타 피해 45%'],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
  ],
  berserker: [
    {
      critRate: 30,
      critDmg: 0,
      atkSpeed: 20,
      moveSpeed: 20,
      partySynergy: false,
      specType: 'burstMode',
      desc: ['폭주: 치명타 적중률, 공격 속도, 이동 속도 (특화 증폭)'],
    },
    {
      critRate: 30,
      critDmg: 0,
      atkSpeed: 15,
      moveSpeed: 15,
      partySynergy: false,
      desc: ['깨달음 1T: 치명타 적중률 30%, 공격 속도 15%, 이동 속도 15%'],
    },
  ],
  holyknight: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
  ],
  slayer: [
    {
      critRate: 30,
      critDmg: 0,
      atkSpeed: 20,
      moveSpeed: 20,
      partySynergy: false,
      desc: ['폭주: 치명타 적중률 30%, 공격 속도 20%, 이동 속도 20%'],
    },
    {
      critRate: 30,
      critDmg: 51,
      atkSpeed: 20,
      moveSpeed: 20,
      partySynergy: false,
      desc: [
        '폭주: 치명타 적중률 30%, 공격 속도 20%, 이동 속도 20%',
        '깨달음 3T: 치명타 피해 51%',
      ],
    },
  ],
  valkyrie: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
  ],
  battlemaster: [
    {
      critRate: 20,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: true,
      desc: ['용맹의 포효: 치명타 적중률 20%'],
    },
    {
      critRate: 20,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: true,
      desc: ['용맹의 포효: 치명타 적중률 20%'],
    },
  ],
  infighter: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 20,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 1T: 공격 속도 20%'],
    },
  ],
  soulmaster: [
    {
      critRate: 0,
      critDmg: 75,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      specType: 'hype',
      desc: [
        '금강선공 3단계: 공격 속도 (특화 증폭)',
        '깨달음 4T: 치명타 피해 75%',
      ],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      specType: 'hype',
      hypeEnhance: 1.33,
      desc: ['금강선공 3단계: 공격 속도 (특화 증폭, 33% 증가)'],
    },
  ],
  lancemaster: [
    {
      critRate: 20,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 4T 연가공법: 치명타 적중률 20%'],
    },
    {
      critRate: 20,
      critDmg: 70,
      atkSpeed: 15,
      moveSpeed: 15,
      partySynergy: false,
      desc: [
        '청룡진: 치명타 적중률 20%',
        '깨달음 1T: 공격 속도 15%, 이동 속도 15%',
        '깨달음 2T: 치명타 피해 70%',
      ],
    },
  ],
  striker: [
    {
      critRate: 10,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: true,
      desc: ['번개의 속삭임: 치명타 적중률 10%'],
    },
    {
      critRate: 10,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: true,
      desc: ['번개의 속삭임: 치명타 적중률 10%'],
    },
  ],
  breaker: [
    {
      critRate: 15,
      critDmg: 0,
      atkSpeed: 20,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['권왕태세: 공격 속도 20%', '깨달음/트라이포드: 치명타 적중률 15%'],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 15,
      partySynergy: false,
      desc: ['깨달음 1T 투기: 이동 속도 15%'],
    },
  ],
  devilhunter: [
    {
      critRate: 24,
      critDmg: 14,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: true,
      desc: ['깨달음 3T: 치명타 적중률 24%, 치명타 피해 14%'],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 8,
      moveSpeed: 8,
      partySynergy: true,
      desc: ['깨달음 1T 맹공: 공격 속도 8%, 이동 속도 8%'],
    },
  ],
  blaster: [
    {
      critRate: 40,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 3T: 치명타 적중률 40%'],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
  ],
  hawkeye: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
    {
      critRate: 40,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 8,
      partySynergy: false,
      desc: ['깨달음 1T: 이동 속도 8%', '트라이포드: 치명타 적중률 40%'],
    },
  ],
  scouter: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 15,
      moveSpeed: 30,
      partySynergy: false,
      desc: ['하이퍼 싱크: 공격 속도 15%, 이동 속도 30%'],
    },
    {
      critRate: 9,
      critDmg: 0,
      atkSpeed: 19.2,
      moveSpeed: 19.2,
      partySynergy: false,
      desc: [
        '깨달음 4T: 치명타 적중률 9%',
        '기동 타격: 공격 속도 19.2%, 이동 속도 19.2%',
      ],
    },
  ],
  gunslinger: [
    {
      critRate: 15,
      critDmg: 0,
      atkSpeed: 16,
      moveSpeed: 0,
      partySynergy: true,
      desc: ['깨달음 4T: 치명타 적중률 15%, 공격 속도 16%'],
    },
    {
      critRate: 45,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: true,
      desc: ['깨달음 3T: 치명타 적중률 45%'],
    },
  ],
  bard: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
    {
      critRate: 30,
      critDmg: 0,
      atkSpeed: 16,
      moveSpeed: 0,
      partySynergy: false,
      desc: [
        '깨달음 3T: 치명타 적중률 10%',
        '천상의 연주: 치명타 적중률 20%, 공격 속도 16%',
      ],
    },
  ],
  summoner: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
    {
      critRate: 16,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 3T: 치명타 적중률 16%'],
    },
  ],
  arcana: [
    {
      critRate: 67.6,
      critDmg: 77.5,
      atkSpeed: 27.2,
      moveSpeed: 30,
      partySynergy: true,
      desc: [
        '깨달음 4T: 공격 속도 8%',
        '운명의 부름: 치명타 피해 77.5%',
        '스크래치 딜러: 공격 속도 19.2%, 이동 속도 30%',
        '스트림 오브 엣지: 치명타 적중률 27.6%',
        '시크릿 가든 급소: 치명타 적중률 40%',
      ],
    },
    {
      critRate: 27.6,
      critDmg: 77.5,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: true,
      desc: [
        '스트림 오브 엣지: 치명타 적중률 27.6%',
        '리턴: 치명타 피해 77.5%',
      ],
    },
  ],
  sorceress: [
    {
      critRate: 30,
      critDmg: 55,
      atkSpeed: 8,
      moveSpeed: 0,
      partySynergy: false,
      desc: [
        '깨달음 2T: 치명타 적중률 30%',
        '깨달음 3T: 치명타 피해 55%',
        '깨달음 4T: 공격 속도 8%',
      ],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
  ],
  blade: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 32.8,
      moveSpeed: 22.8,
      partySynergy: false,
      desc: [
        '블레이드 오브: 공격 속도 20%, 이동 속도 10%',
        '마엘스톰: 공격 속도 12.8%, 이동 속도 12.8%',
      ],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 24.8,
      moveSpeed: 24.8,
      partySynergy: false,
      desc: [
        '깨달음 2T: 공격 속도 12%, 이동 속도 12%',
        '마엘스톰: 공격 속도 12.8%, 이동 속도 12.8%',
      ],
    },
  ],
  demonic: [
    {
      critRate: 30,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 20,
      partySynergy: false,
      desc: ['악마화: 이동 속도 20%', '깨달음 3T: 치명타 적중률 30%'],
    },
    {
      critRate: 10,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 30,
      partySynergy: false,
      desc: ['데모닉 슬래쉬: 이동 속도 30%', '깨달음 2T: 치명타 적중률 10%'],
    },
  ],
  reaper: [
    {
      critRate: 30,
      critDmg: 0,
      atkSpeed: 10,
      moveSpeed: 30,
      partySynergy: false,
      desc: [
        '페르소나: 이동 속도 30%',
        '깨달음 1T: 공격 속도 10%',
        '깨달음 2T: 치명타 적중률 10%',
        '유언 트포: 치명타 적중률 20%',
      ],
    },
    {
      critRate: 38,
      critDmg: 0,
      atkSpeed: 10,
      moveSpeed: 10,
      partySynergy: false,
      desc: [
        '혼돈: 치명타 적중률 15%, 공격 속도 10%, 이동 속도 10%',
        '깨달음 1T: 치명타 적중률 23%',
      ],
    },
  ],
  souleater: [
    {
      critRate: 34,
      critDmg: 0,
      atkSpeed: 10,
      moveSpeed: 39.2,
      partySynergy: false,
      desc: [
        '사신화: 치명타 적중률 20%, 공격 속도 10%, 이동 속도 20%',
        '깨달음 1T: 치명타 적중률 14%',
        '루나틱 엣지: 이동 속도 19.2%',
      ],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 20,
      moveSpeed: 29.2,
      partySynergy: false,
      desc: [
        '영혼 강탈: 공격 속도 20%, 이동 속도 10%',
        '루나틱 엣지: 이동 속도 19.2%',
      ],
    },
  ],
  artist: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: [],
    },
    {
      critRate: 25,
      critDmg: 35,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 1T: 치명타 적중률 25%', '해그리기: 치명타 피해 35%'],
    },
  ],
  aeromancer: [
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 12,
      moveSpeed: 12,
      partySynergy: true,
      speedToCrit: { critRatePerMove: 0.3, critDmgPerAtk: 1.2 },
      desc: [
        '깨달음 1T: 공격 속도 12%, 이동 속도 12%',
        '깨달음 3T: 이동 속도 증가량의 30%만큼 치명타 적중률, 공격 속도 증가량의 120%만큼 치명타 피해 반영',
      ],
    },
    {
      critRate: 0,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: true,
      desc: [],
    },
  ],
  wildsoul: [
    {
      critRate: 30,
      critDmg: 0,
      atkSpeed: 0,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 2T: 치명타 적중률 30%'],
    },
    {
      critRate: 0,
      critDmg: 60,
      atkSpeed: 20,
      moveSpeed: 20,
      partySynergy: false,
      desc: [
        '깨달음 1T: 공격 속도 20%, 이동 속도 20%',
        '깨달음 3T: 치명타 피해 60%',
      ],
    },
  ],
  guardknight: [
    {
      critRate: 20,
      critDmg: 0,
      atkSpeed: 15,
      moveSpeed: 15,
      partySynergy: false,
      desc: [
        '깨달음 1T: 공격 속도 15%, 이동 속도 15%',
        '깨달음 2T: 치명타 적중률 20%',
      ],
    },
    {
      critRate: 15,
      critDmg: 0,
      atkSpeed: 15,
      moveSpeed: 0,
      partySynergy: false,
      desc: ['깨달음 2T: 치명타 적중률 15%', '깨달음 4T: 공격 속도 15%'],
    },
  ],
};

export function computeClassStats(classValue, insightIdx, specStat) {
  const bonus = CLASS_BONUS[classValue]?.[insightIdx];
  if (!bonus) return { critRate: 0, critDmg: 0, atkSpeed: 0, moveSpeed: 0 };

  let { critRate, critDmg, atkSpeed, moveSpeed } = bonus;

  if (bonus.specType === 'burstMode') {
    const amp = 1 + (specStat / 699) * 0.26;
    critRate = f2(30 * amp);
    atkSpeed = f2(20 * amp);
    moveSpeed = f2(20 * amp);
  } else if (bonus.specType === 'hype') {
    const base = f2(15 * (1 + specStat * 0.000212));
    atkSpeed = f2(base * (bonus.hypeEnhance || 1));
  }

  return { critRate, critDmg, atkSpeed, moveSpeed };
}

export const ARK_GRID_SUN_OPTIONS = [
  { value: 'none', label: '없음' },
  { value: 'flashy', label: '현란한 공격' },
  { value: 'stable', label: '안정적인 공격' },
  { value: 'quick', label: '재빠른 공격' },
];

export const ARK_GRID_MOON_OPTIONS = [
  { value: 'none', label: '없음' },
  { value: 'crushing', label: '부수는 일격' },
];

export const ARK_GRID_STAR_OPTIONS = [
  { value: 'none', label: '없음' },
  { value: 'speed', label: '속도' },
];

export const ARK_GRID_GRADE_OPTIONS = [
  { value: 'relic', label: '유물 이하' },
  { value: 'ancient', label: '고대' },
];

export const ARK_GRID_POINTS_OPTIONS = [
  { value: 0, label: '0P' },
  { value: 10, label: '10P' },
  { value: 14, label: '14P' },
  { value: 17, label: '17P' },
  { value: 18, label: '18P' },
  { value: 19, label: '19P' },
  { value: 20, label: '20P' },
];

function countExtraPoints(points) {
  return [18, 19, 20].filter((p) => points >= p).length;
}

export function computeArkGridStats(state) {
  let critRate = 0,
    critDmg = 0,
    atkSpeed = 0,
    moveSpeed = 0;
  let additionalDmg = 0,
    critEnemyDmg = 0;

  const {
    arkGridSunCore: sun,
    arkGridSunGrade: sg,
    arkGridSunPoints: sp,
    arkGridMoonCore: moon,
    arkGridMoonGrade: mg,
    arkGridMoonPoints: mp,
    arkGridStarCore: star,
    arkGridStarGrade: stg,
    arkGridStarPoints: stp,
  } = state;
  const ancient = (g) => g === 'ancient';

  if (sun === 'flashy') {
    if (sp >= 10) critEnemyDmg += 0.55;
    if (sp >= 17) critEnemyDmg += ancient(sg) ? 1.1 : 0.55;
    critEnemyDmg += countExtraPoints(sp) * 0.16;
  } else if (sun === 'stable') {
    if (sp >= 14) additionalDmg += 0.7;
    if (sp >= 17) additionalDmg += ancient(sg) ? 2.8 : 1.4;
    additionalDmg += countExtraPoints(sp) * 0.23;
  } else if (sun === 'quick') {
    if (sp >= 10) atkSpeed += 1.0;
    if (sp >= 14) critDmg += 1.4;
    if (sp >= 17) {
      atkSpeed += ancient(sg) ? 3.0 : 2.0;
      critDmg += ancient(sg) ? 5.6 : 2.8;
    }
    critDmg += countExtraPoints(sp) * 0.45;
  }

  if (moon === 'crushing') {
    if (mp >= 14) critRate += 0.65;
    if (mp >= 17) critRate += ancient(mg) ? 3.2 : 1.3;
    critRate += countExtraPoints(mp) * 0.21;
  }

  if (star === 'speed') {
    if (stp >= 10) atkSpeed += 0.9;
    if (stp >= 14) moveSpeed += 0.9;
    if (stp >= 17) {
      const spd = ancient(stg) ? 2.7 : 1.8;
      atkSpeed += spd;
      moveSpeed += spd;
    }
    const extra = countExtraPoints(stp);
    atkSpeed += extra * 0.3;
    moveSpeed += extra * 0.3;
  }

  additionalDmg += getGemAdditionalDmg(state.arkGridGemLevel);

  return {
    critRate,
    critDmg,
    atkSpeed,
    moveSpeed,
    additionalDmg,
    critEnemyDmg,
  };
}

export function getGemAdditionalDmg(level) {
  if (level <= 0) return 0;
  return Math.floor(level * 8.0834) / 100;
}
