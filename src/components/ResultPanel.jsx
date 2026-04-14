import { useMemo } from 'react';
import { useCalc } from '../context/CalcContext';
import { calculate } from '../utils/calculator';

function ResultRow({ label, value, suffix = '' }) {
  return (
    <div className="flex items-center justify-between h-8 px-2">
      <span className="text-sm text-gray-700 dark:text-gray-300 shrink-0 mr-3">
        {label}
      </span>
      <span className="input-field w-32 shrink-0 tabular-nums">
        {value}
        {suffix}
      </span>
    </div>
  );
}

function SectionHeader({ children }) {
  return (
    <h3 className="lg:col-span-2 text-xs text-accent-500 pt-3 first:pt-0">
      {children}
    </h3>
  );
}

function NodeComboRow({ name, multiplier, isBest }) {
  return (
    <div
      className={`flex items-center justify-between h-8 px-2 rounded ${
        isBest ? 'bg-accent-500/5' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
        {isBest && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-500 text-white">
            추천
          </span>
        )}
      </div>
      <span className="input-field w-32 shrink-0 tabular-nums">
        {multiplier}%
      </span>
    </div>
  );
}

export default function ResultPanel() {
  const { state } = useCalc();
  const r = useMemo(() => calculate(state), [state]);

  return (
    <div className="card overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 px-4 py-4">
        <SectionHeader>기본 스탯</SectionHeader>
        <ResultRow label="치명타 적중률" value={r.totalCritRate} suffix="%" />
        <ResultRow label="치명타 피해" value={r.totalCritDmg} suffix="%" />
        <ResultRow label="공격 속도" value={r.displayAtkSpeed} suffix="%" />
        <ResultRow label="이동 속도" value={r.displayMoveSpeed} suffix="%" />

        <SectionHeader>각인 효율</SectionHeader>
        <ResultRow
          label="돌격 대장 효율"
          value={r.raidCaptainEfficiency}
          suffix="%"
        />
        <ResultRow
          label="예리한 둔기 효율"
          value={r.kbwEfficiency}
          suffix="%"
        />

        <SectionHeader>진화형 피해</SectionHeader>
        <ResultRow label="진화형 피해" value={r.totalEvoDmg} suffix="%" />

        <SectionHeader>뭉툭한 가시</SectionHeader>
        <ResultRow label="진화형 피해" value={r.mungaEvoDmg} suffix="%" />
        <ResultRow label="풀효율 요구 치명" value={r.mungaRequiredCritStat} />

        <SectionHeader>음속 돌파</SectionHeader>
        <ResultRow label="진화형 피해" value={r.eumdolEvoDmg} suffix="%" />
        <div className="hidden lg:block" />
        <ResultRow label="발동 요구 신속" value={r.eumdolActivationSwift} />
        <ResultRow label="풀효율 요구 신속" value={r.eumdolFullEffSwift} />

        <SectionHeader>4티어 노드 비교</SectionHeader>
        {r.node4Combos.map((combo) => (
          <NodeComboRow
            key={combo.name}
            name={combo.name}
            multiplier={combo.multiplier}
            isBest={combo.name === r.node4Recommendation}
          />
        ))}
      </div>
    </div>
  );
}
