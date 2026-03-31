const WEAPON_QUALITY_TABLE = [
  [0, 10.00], [5, 10.05], [10, 10.20], [15, 10.45], [20, 10.80],
  [25, 11.25], [30, 11.80], [35, 12.45], [40, 13.20], [45, 14.05],
  [50, 15.00], [55, 16.05], [60, 17.20], [65, 18.45], [70, 19.80],
  [75, 21.25], [80, 22.80], [85, 24.45], [90, 26.20], [95, 28.05],
  [100, 30.00],
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
  { value: '0.70', label: '0.70%', additionalDmg: 0.70 },
  { value: '1.60', label: '1.60%', additionalDmg: 1.60 },
  { value: '2.60', label: '2.60%', additionalDmg: 2.60 },
];

export const RING_CRIT_RATE_OPTIONS = [
  { value: 'none', label: '없음', critRate: 0 },
  { value: '0.40', label: '0.40%', critRate: 0.40 },
  { value: '0.95', label: '0.95%', critRate: 0.95 },
  { value: '1.55', label: '1.55%', critRate: 1.55 },
];

export const RING_CRIT_DMG_OPTIONS = [
  { value: 'none', label: '없음', critDmg: 0 },
  { value: '1.10', label: '1.10%', critDmg: 1.10 },
  { value: '2.40', label: '2.40%', critDmg: 2.40 },
  { value: '4.00', label: '4.00%', critDmg: 4.00 },
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
  { value: 'ad2.5d', label: '추가 피해 2.5% 악마 및 대악마 2.5%', additionalDmg: 2.5 },
  { value: 'ad3.0d', label: '추가 피해 3.0% 악마 및 대악마 2.5%', additionalDmg: 3.0 },
  { value: 'ad3.5d', label: '추가 피해 3.5% 악마 및 대악마 2.5%', additionalDmg: 3.5 },
  { value: 'cr3.4e', label: '치명타 적중률 3.4% 치명타로 적중 시 적에게 주는 피해 1.5%', critRate: 3.4, critEnemyDmg: 1.5 },
  { value: 'cr4.2e', label: '치명타 적중률 4.2% 치명타로 적중 시 적에게 주는 피해 1.5%', critRate: 4.2, critEnemyDmg: 1.5 },
  { value: 'cr5.0e', label: '치명타 적중률 5.0% 치명타로 적중 시 적에게 주는 피해 1.5%', critRate: 5.0, critEnemyDmg: 1.5 },
  { value: 'cd6.8e', label: '치명타 피해 6.8% 치명타로 적중 시 적에게 주는 피해 1.5%', critDmg: 6.8, critEnemyDmg: 1.5 },
  { value: 'cd8.4e', label: '치명타 피해 8.4% 치명타로 적중 시 적에게 주는 피해 1.5%', critDmg: 8.4, critEnemyDmg: 1.5 },
  { value: 'cd10.0e', label: '치명타 피해 10.0% 치명타로 적중 시 적에게 주는 피해 1.5%', critDmg: 10.0, critEnemyDmg: 1.5 },
  { value: 'sp4', label: '공격 및 이동 속도 4%', atkSpeed: 4, moveSpeed: 4 },
  { value: 'sp5', label: '공격 및 이동 속도 5%', atkSpeed: 5, moveSpeed: 5 },
  { value: 'sp6', label: '공격 및 이동 속도 6%', atkSpeed: 6, moveSpeed: 6 },
  { value: 'sp6s', label: '공격 적중 시 무기 공격력, 공격 및 이동 속도 1% 증가(최대 6중첩)', atkSpeed: 6, moveSpeed: 6 },
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
  none: 0, legend20: 14, relic5: 15.5, relic10: 17, relic15: 18.5, relic20: 20,
};

export const KBW_CRIT_DMG = {
  none: 0, legend20: 44, relic5: 46, relic10: 48, relic15: 50, relic20: 52,
};

export const RC_CONVERSION = {
  none: 0, legend20: 40, relic5: 42, relic10: 44, relic15: 46, relic20: 48,
};

export const STONE_BONUS = { 0: 0, 1: 7.5, 2: 9.4, 3: 13.2, 4: 15 };

export const EVO_2T_NODES = [
  { key: 'evo2EndlessMana', label: '끝없는 마나', image: '2T1.png', maxLevel: 2 },
  { key: 'evo2ForbiddenSpell', label: '금단의 주문', image: '2T2.png', maxLevel: 2 },
  { key: 'evo2KeenSense', label: '예리한 감각', image: '2T3.png', maxLevel: 2 },
  { key: 'evo2LimitBreak', label: '한계 돌파', image: '2T4.png', maxLevel: 3 },
  { key: 'evo2OptTraining', label: '최적화 훈련', image: '2T5.png', maxLevel: 2 },
  { key: 'evo2BlessedGoddess', label: '축복의 여신', image: '2T6.png', maxLevel: 3 },
];

export const EVO_3T_NODES = [
  { key: 'evo3InfinitePower', label: '무한한 마력', image: '3T1.png', maxLevel: 2 },
  { key: 'evo3AllOutStrike', label: '혼신의 강타', image: '3T2.png', maxLevel: 2 },
  { key: 'evo3OneShot', label: '일격', image: '3T3.png', maxLevel: 2 },
  { key: 'evo3DestructionTank', label: '파괴 전차', image: '3T4.png', maxLevel: 2 },
  { key: 'evo3TimingDomination', label: '타이밍 지배', image: '3T5.png', maxLevel: 2 },
  { key: 'evo3PassionateDance', label: '정열의 춤사위', image: '3T6.png', maxLevel: 2 },
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
  { key: 'evo5StandStriker', label: '입식 타격가', image: '5T4.png', maxLevel: 2 },
  { key: 'evo5ManaFurnace', label: '마나 용광로', image: '5T5.png', maxLevel: 2 },
  { key: 'evo5StableManager', label: '안정된 관리자', image: '5T6.png', maxLevel: 2 },
];

export const TIER_CONFIG = {
  '2T': { maxPoints: 30, pointCost: 10 },
  '3T': { maxPoints: 20, pointCost: 10 },
  '4T': { maxPoints: 20, pointCost: 10 },
  '5T': { maxPoints: 30, pointCost: 15 },
};

export function findOption(options, value) {
  return options.find((o) => String(o.value) === String(value)) || options[0];
}
