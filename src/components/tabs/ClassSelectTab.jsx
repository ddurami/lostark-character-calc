import React, { useEffect, useRef } from 'react';
import { useCalc } from '../../context/CalcContext';
import { NumberInput, ROW, LABEL } from '../ui/FormControls';
import {
  CLASS_DATA,
  CLASS_BONUS,
  computeClassStats,
  BRACELET_OPTIONS,
  findOption,
  computeArkGridStats,
  f2,
} from '../../data/constants';

const ALL_CLASSES = CLASS_DATA.flatMap((cat) => cat.classes);

function computeSpeedToCrit(state, bonus) {
  if (!bonus?.speedToCrit) return null;

  const speedFromSwift = state.swiftnessStat / 58.22;
  const supporterSpeed = state.hasSupporter ? 9 : 0;
  const banquet =
    state.banquetSpeed === 'none' ? 0 : parseFloat(state.banquetSpeed);

  let braceletAtk = 0,
    braceletMove = 0;
  [state.bracelet1, state.bracelet2, state.bracelet3].forEach((v) => {
    const opt = findOption(BRACELET_OPTIONS, v);
    braceletAtk += opt.atkSpeed || 0;
    braceletMove += opt.moveSpeed || 0;
  });

  const evoAtkSpeed = state.evo3DestructionTank * 4;
  const grid = computeArkGridStats(state);

  const rawAtk =
    100 +
    speedFromSwift +
    supporterSpeed +
    state.classAtkSpeed +
    braceletAtk +
    banquet +
    evoAtkSpeed +
    grid.atkSpeed -
    (state.massIncrease ? 10 : 0);
  const rawMove =
    100 +
    speedFromSwift +
    supporterSpeed +
    state.classMoveSpeed +
    braceletMove +
    banquet +
    grid.moveSpeed;

  const atkInc = Math.min(Math.max(0, rawAtk - 100), 40);
  const moveInc = Math.min(Math.max(0, rawMove - 100), 40);

  return {
    critRate: f2(moveInc * bonus.speedToCrit.critRatePerMove),
    critDmg: f2(atkInc * bonus.speedToCrit.critDmgPerAtk),
  };
}

export default function ClassSelectTab() {
  const { state, setField } = useCalc();
  const prevClassRef = useRef(state.selectedClass);
  const prevInsightRef = useRef(state.selectedInsight);

  const selected = ALL_CLASSES.find((c) => c.value === state.selectedClass);
  const bonus = CLASS_BONUS[state.selectedClass]?.[state.selectedInsight];
  const needsSpec = !!bonus?.specType;

  useEffect(() => {
    const stats = computeClassStats(
      state.selectedClass,
      state.selectedInsight,
      state.specStat,
    );
    setField('classAtkSpeed', stats.atkSpeed);
    setField('classMoveSpeed', stats.moveSpeed);

    if (!bonus?.speedToCrit) {
      setField('classCritRate', stats.critRate);
      setField('classCritDmg', stats.critDmg);
    }

    const classChanged =
      prevClassRef.current !== state.selectedClass ||
      prevInsightRef.current !== state.selectedInsight;
    prevClassRef.current = state.selectedClass;
    prevInsightRef.current = state.selectedInsight;

    if (classChanged && bonus?.partySynergy) {
      setField('partySynergy', '10');
    }
  }, [state.selectedClass, state.selectedInsight, state.specStat]);

  useEffect(() => {
    if (!bonus?.speedToCrit) return;
    const result = computeSpeedToCrit(state, bonus);
    if (result) {
      setField('classCritRate', result.critRate);
      setField('classCritDmg', result.critDmg);
    }
  }, [
    bonus?.speedToCrit,
    state.classAtkSpeed,
    state.classMoveSpeed,
    state.swiftnessStat,
    state.hasSupporter,
    state.banquetSpeed,
    state.bracelet1,
    state.bracelet2,
    state.bracelet3,
    state.evo3DestructionTank,
    state.massIncrease,
    state.arkGridSunCore,
    state.arkGridSunGrade,
    state.arkGridSunPoints,
    state.arkGridStarCore,
    state.arkGridStarGrade,
    state.arkGridStarPoints,
  ]);

  const handleClassChange = (e) => {
    setField('selectedClass', e.target.value);
    setField('selectedInsight', 0);
    setField('specStat', 75);
  };

  const descLines = [];
  if (bonus) {
    if (needsSpec) {
      const stats = computeClassStats(
        state.selectedClass,
        state.selectedInsight,
        state.specStat,
      );
      const parts = [];
      if (stats.critRate) parts.push(`치명타 적중률 ${stats.critRate}%`);
      if (stats.critDmg) parts.push(`치명타 피해 ${stats.critDmg}%`);
      if (stats.atkSpeed) parts.push(`공격 속도 ${stats.atkSpeed}%`);
      if (stats.moveSpeed) parts.push(`이동 속도 ${stats.moveSpeed}%`);
      if (parts.length > 0) {
        const src = bonus.specType === 'burstMode' ? '폭주' : '금강선공';
        descLines.push(`${src} (특화 증폭): ${parts.join(', ')}`);
      }
      if (bonus.critDmg)
        descLines.push(`깨달음 4T: 치명타 피해 ${bonus.critDmg}%`);
    } else {
      descLines.push(...bonus.desc);
    }
    if (bonus.partySynergy && state.partySynergy === '10') {
      descLines.push('선택 클래스의 파티 시너지가 반영되었습니다');
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
        <div className={ROW}>
          <span className={LABEL}>클래스</span>
          <select
            value={state.selectedClass}
            onChange={handleClassChange}
            className="select-field w-32"
          >
            {CLASS_DATA.map((cat) => (
              <React.Fragment key={cat.category}>
                <option disabled className="select-category">
                  {cat.category}
                </option>
                {cat.classes.map((cls) => (
                  <option
                    key={cls.value}
                    value={cls.value}
                  >{`\u00A0\u00A0${cls.label}`}</option>
                ))}
              </React.Fragment>
            ))}
          </select>
        </div>

        <div className={ROW}>
          <span className={LABEL}>깨달음</span>
          <div className="w-32 flex gap-1 h-8">
            {selected?.insights.map((name, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setField('selectedInsight', idx)}
                className={`flex-1 min-w-0 truncate px-1 text-sm rounded border flex items-center justify-center transition-colors duration-150 ${
                  state.selectedInsight === idx
                    ? 'bg-accent-500 text-white border-accent-500'
                    : 'bg-white dark:bg-loa-card text-gray-700 dark:text-gray-300 border-gray-200 dark:border-loa-border'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <NumberInput
          label="치명타 적중률"
          value={state.classCritRate}
          onChange={(v) => setField('classCritRate', v)}
          max={100}
        />
        <NumberInput
          label="치명타 피해"
          value={state.classCritDmg}
          onChange={(v) => setField('classCritDmg', v)}
        />
        <NumberInput
          label="공격 속도"
          value={state.classAtkSpeed}
          onChange={(v) => setField('classAtkSpeed', v)}
          max={100}
        />
        <NumberInput
          label="이동 속도"
          value={state.classMoveSpeed}
          onChange={(v) => setField('classMoveSpeed', v)}
          max={100}
        />

        {needsSpec && (
          <NumberInput
            label="특화 스탯"
            value={state.specStat}
            onChange={(v) => setField('specStat', v)}
            max={2000}
            integer
          />
        )}
      </div>

      {descLines.length > 0 && (
        <div className="mt-2 px-2 space-y-0.5">
          {descLines.map((line) => (
            <p key={line} className="text-xs text-accent-500">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
