import {
  getWeaponAdditionalDmg,
  NECKLACE_OPTIONS,
  RING_CRIT_RATE_OPTIONS,
  RING_CRIT_DMG_OPTIONS,
  BRACELET_OPTIONS,
  ADRENALINE_CRIT,
  KBW_CRIT_DMG,
  RC_CONVERSION,
  STONE_BONUS,
  findOption,
} from '../data/constants';

const floor2 = (v) => Math.round(v * 100) / 100;

function getBraceletStat(state, key) {
  let total = 0;
  [state.bracelet1, state.bracelet2, state.bracelet3].forEach((val) => {
    const opt = findOption(BRACELET_OPTIONS, val);
    total += opt[key] || 0;
  });
  return total;
}

function getBanquetSpeed(state) {
  return state.banquetSpeed === 'none' ? 0 : parseFloat(state.banquetSpeed);
}

function getPartySynergy(state) {
  return state.partySynergy === 'none' ? 0 : parseFloat(state.partySynergy);
}

const MUNGA = {
  0: { base: 0, convRate: 0, maxTotal: 0 },
  1: { base: 7.5, convRate: 1.25, maxTotal: 52.5 },
  2: { base: 15, convRate: 1.5, maxTotal: 75 },
};

const EUMDOL = {
  0: { speedRate: 0, exceedBonus: 0, excessRate: 0, maxTotal: 0 },
  1: { speedRate: 0.05, exceedBonus: 4, excessRate: 0.15, maxTotal: 12 },
  2: { speedRate: 0.10, exceedBonus: 8, excessRate: 0.30, maxTotal: 24 },
};

function calcMungaEvoDmg(critRate, level) {
  if (level === 0) return 0;
  const m = MUNGA[level];
  const excess = Math.max(0, critRate - 80);
  const maxConv = m.maxTotal - m.base;
  return m.base + Math.min(excess * m.convRate, maxConv);
}

function calcMungaFullEffCritRate(level) {
  if (level === 0) return 0;
  const m = MUNGA[level];
  const maxConv = m.maxTotal - m.base;
  return 80 + maxConv / m.convRate;
}

function calcEumdolEvoDmg(rawAtkSpeed, rawMoveSpeed, level) {
  if (level === 0) return 0;
  const e = EUMDOL[level];

  const atkIncrease = Math.min(Math.max(0, rawAtkSpeed - 100), 40);
  const moveIncrease = Math.min(Math.max(0, rawMoveSpeed - 100), 40);
  const basePart = (atkIncrease + moveIncrease) * e.speedRate;

  const bothExceed = rawAtkSpeed > 140 && rawMoveSpeed > 140;
  const exceedPart = bothExceed ? e.exceedBonus : 0;

  const atkExcess = Math.max(0, rawAtkSpeed - 140);
  const moveExcess = Math.max(0, rawMoveSpeed - 140);
  const excessPart = (atkExcess + moveExcess) * e.excessRate;

  return Math.min(basePart + exceedPart + excessPart, e.maxTotal);
}

function calcNodeDPS(critRate, critDmg, critEnemyDmg, additionalDmg, evoDmgStatic, mungaLevel, hasKBW) {
  const mungaDynamic = calcMungaEvoDmg(critRate, mungaLevel);
  const totalEvoDmg = evoDmgStatic + mungaDynamic;

  let eCR;
  if (mungaLevel > 0) {
    eCR = Math.min(critRate, 80) / 100;
  } else {
    eCR = Math.min(critRate, 100) / 100;
  }

  const penaltyMult = hasKBW ? 0.98 : 1;
  const critFactor = eCR * (critDmg / 100) * (1 + critEnemyDmg / 100) + (1 - eCR);

  return critFactor * penaltyMult * (1 + additionalDmg / 100) * (1 + totalEvoDmg / 100);
}

export function calculate(state) {
  const weaponAdditionalDmg = getWeaponAdditionalDmg(state.weaponQuality);
  const necklaceAdditionalDmg = findOption(NECKLACE_OPTIONS, state.necklaceOption).additionalDmg || 0;

  const ring1CR = findOption(RING_CRIT_RATE_OPTIONS, state.ring1CritRate).critRate || 0;
  const ring1CD = findOption(RING_CRIT_DMG_OPTIONS, state.ring1CritDmg).critDmg || 0;
  const ring2CR = findOption(RING_CRIT_RATE_OPTIONS, state.ring2CritRate).critRate || 0;
  const ring2CD = findOption(RING_CRIT_DMG_OPTIONS, state.ring2CritDmg).critDmg || 0;

  const braceletCritRate = getBraceletStat(state, 'critRate');
  const braceletCritDmg = getBraceletStat(state, 'critDmg');
  const braceletCritEnemyDmg = getBraceletStat(state, 'critEnemyDmg');
  const braceletAdditionalDmg = getBraceletStat(state, 'additionalDmg');
  const braceletAtkSpeed = getBraceletStat(state, 'atkSpeed');
  const braceletMoveSpeed = getBraceletStat(state, 'moveSpeed');
  const banquet = getBanquetSpeed(state);
  const synergy = getPartySynergy(state);

  const rcActive = state.raidCaptainGrade !== 'none';
  const rcConversion = rcActive ? RC_CONVERSION[state.raidCaptainGrade] + STONE_BONUS[state.raidCaptainStone] : 0;

  const kbwActive = state.keenBluntGrade !== 'none';
  const kbwCritDmg = kbwActive ? KBW_CRIT_DMG[state.keenBluntGrade] + STONE_BONUS[state.keenBluntStone] : 0;

  const adrCritRate = ADRENALINE_CRIT[state.adrenalineGrade] || 0;

  const evoCritRate = state.evo2KeenSense * 4
    + state.evo3AllOutStrike * 12
    + state.evo3OneShot * 10
    + state.evo4Dalin * 7;

  const evoCritDmg = state.evo3OneShot * 16;
  const evoAtkSpeed = state.evo3DestructionTank * 4;

  const staticEvoDmg =
    state.evo2ForbiddenSpell * 10 + state.evo2LimitBreak * 10
    + state.evo2KeenSense * 5 + state.evo2OptTraining * 5
    + state.evo3InfinitePower * 8 + state.evo3TimingDomination * 8
    + state.evo3AllOutStrike * 2 + state.evo3DestructionTank * 12
    + state.evo5Infighting * 9 + state.evo5StandStriker * 10.5
    + state.evo5ManaFurnace * 12;

  const critFromStat = floor2(state.critStat / 27.94);
  const critFromBackAttack = state.backAttack ? 10 : 0;

  const totalCritRate = critFromStat + critFromBackAttack + synergy
    + state.classCritRate + evoCritRate
    + ring1CR + ring2CR + braceletCritRate
    + adrCritRate;

  const totalCritDmg = 200 + state.classCritDmg + evoCritDmg
    + ring1CD + ring2CD + braceletCritDmg
    + kbwCritDmg;

  const speedFromSwift = floor2(state.swiftnessStat / 58.22);
  const supporterSpeed = state.hasSupporter ? 9 : 0;

  const rawAtkSpeed = 100 + speedFromSwift + supporterSpeed
    + state.classAtkSpeed + braceletAtkSpeed + banquet
    + evoAtkSpeed - (state.massIncrease ? 10 : 0);

  const rawMoveSpeed = 100 + speedFromSwift + supporterSpeed
    + state.classMoveSpeed + braceletMoveSpeed + banquet;

  const displayAtkSpeed = floor2(Math.min(rawAtkSpeed, 140));
  const displayMoveSpeed = floor2(Math.min(rawMoveSpeed, 140));

  const moveSpeedExcess = Math.min(Math.max(0, displayMoveSpeed - 100), 40);
  const raidCaptainEfficiency = rcActive ? floor2(moveSpeedExcess * rcConversion / 100) : 0;

  let kbwEfficiency = 0;
  if (kbwActive) {
    const baseCritDmgNoKBW = totalCritDmg - kbwCritDmg;
    const eCR = state.evo5Munga > 0
      ? Math.min(totalCritRate, 80) / 100
      : Math.min(totalCritRate, 100) / 100;
    const dpsWithout = eCR * (baseCritDmgNoKBW / 100) + (1 - eCR);
    const dpsWith = (eCR * (totalCritDmg / 100) + (1 - eCR)) * 0.98;
    kbwEfficiency = dpsWithout > 0 ? floor2((dpsWith / dpsWithout - 1) * 100) : 0;
  }

  const mungaEvoDmg = floor2(calcMungaEvoDmg(totalCritRate, state.evo5Munga));

  let mungaRequiredCritStat = 0;
  if (state.evo5Munga > 0) {
    const fullEffCR = calcMungaFullEffCritRate(state.evo5Munga);
    const critWithoutStat = totalCritRate - critFromStat;
    const neededCR = fullEffCR - critWithoutStat;
    mungaRequiredCritStat = Math.max(0, Math.ceil(neededCR * 27.94));
  }

  const eumdolEvoDmg = floor2(calcEumdolEvoDmg(rawAtkSpeed, rawMoveSpeed, state.evo5Eumdol));

  let eumdolActivationSwift = 0;
  let eumdolFullEffSwift = 0;
  if (state.evo5Eumdol > 0) {
    const otherAtk = supporterSpeed + state.classAtkSpeed + braceletAtkSpeed + banquet
      + evoAtkSpeed - (state.massIncrease ? 10 : 0);
    const otherMove = supporterSpeed + state.classMoveSpeed + braceletMoveSpeed + banquet;

    const needAtk = (40 - otherAtk) * 58.22;
    const needMove = (40 - otherMove) * 58.22;
    eumdolActivationSwift = Math.max(0, Math.ceil(Math.max(needAtk, needMove) + 0.01));

    const e = EUMDOL[state.evo5Eumdol];
    const baseFull = 80 * e.speedRate;
    const remaining = e.maxTotal - baseFull - e.exceedBonus;
    if (remaining > 0 && e.excessRate > 0) {
      const neededSum = remaining / e.excessRate;
      const neededSpeedFromSwift = (neededSum - otherAtk - otherMove + 80) / 2;
      eumdolFullEffSwift = Math.max(eumdolActivationSwift, Math.ceil(neededSpeedFromSwift * 58.22));
    } else {
      eumdolFullEffSwift = eumdolActivationSwift;
    }
  }

  const totalEvoDmg = floor2(
    staticEvoDmg + state.evo4Bunswae * 20 + mungaEvoDmg + eumdolEvoDmg,
  );

  const critRateNo4T = totalCritRate - state.evo4Dalin * 7;
  const critDmgNo4T = totalCritDmg;
  const additionalDmgNo4T = weaponAdditionalDmg + necklaceAdditionalDmg + braceletAdditionalDmg;
  const critEnemyDmgNo4T = braceletCritEnemyDmg;
  const evoDmgStaticNo4T = staticEvoDmg + eumdolEvoDmg;

  const combos = [
    {
      name: '회심 + 달인',
      cr: critRateNo4T + 7,
      cd: critDmgNo4T,
      ced: critEnemyDmgNo4T + 12,
      ad: additionalDmgNo4T + 8.5,
      ed: evoDmgStaticNo4T,
    },
    {
      name: '회심 + 분쇄',
      cr: critRateNo4T,
      cd: critDmgNo4T,
      ced: critEnemyDmgNo4T + 12,
      ad: additionalDmgNo4T,
      ed: evoDmgStaticNo4T + 20,
    },
    {
      name: '달인 + 분쇄',
      cr: critRateNo4T + 7,
      cd: critDmgNo4T,
      ced: critEnemyDmgNo4T,
      ad: additionalDmgNo4T + 8.5,
      ed: evoDmgStaticNo4T + 20,
    },
  ];

  const baseDPS = calcNodeDPS(
    critRateNo4T, critDmgNo4T, critEnemyDmgNo4T,
    additionalDmgNo4T, evoDmgStaticNo4T,
    state.evo5Munga, kbwActive,
  );

  const node4Combos = combos.map((c) => {
    const dps = calcNodeDPS(c.cr, c.cd, c.ced, c.ad, c.ed, state.evo5Munga, kbwActive);
    return {
      name: c.name,
      multiplier: baseDPS > 0 ? floor2((dps / baseDPS - 1) * 100) : 0,
    };
  });

  const bestCombo = node4Combos.reduce((best, c) => (c.multiplier > best.multiplier ? c : best));

  return {
    totalCritRate: floor2(totalCritRate),
    totalCritDmg: floor2(totalCritDmg),
    displayAtkSpeed,
    displayMoveSpeed,
    raidCaptainEfficiency,
    kbwEfficiency,
    totalEvoDmg,
    mungaEvoDmg,
    mungaRequiredCritStat,
    eumdolEvoDmg,
    eumdolActivationSwift,
    eumdolFullEffSwift,
    node4Combos,
    node4Recommendation: bestCombo.name,
  };
}
