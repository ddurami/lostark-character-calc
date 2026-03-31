import { useCalc } from '../../context/CalcContext';
import { NumberInput, Toggle, Select } from '../ui/FormControls';
import { BANQUET_OPTIONS, PARTY_SYNERGY_OPTIONS } from '../../data/constants';

export default function BasicTab() {
  const { state, setField } = useCalc();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
      <NumberInput label="치명" value={state.critStat} onChange={(v) => setField('critStat', v)} max={2000} integer />
      <NumberInput label="신속" value={state.swiftnessStat} onChange={(v) => setField('swiftnessStat', v)} max={2000} integer />
      <Select label="만찬 공이속" value={state.banquetSpeed} onChange={(v) => setField('banquetSpeed', v)} options={BANQUET_OPTIONS} />
      <Select label="치적 시너지" value={state.partySynergy} onChange={(v) => setField('partySynergy', v)} options={PARTY_SYNERGY_OPTIONS} />
      <Toggle label="백어택 적용" checked={state.backAttack} onChange={(v) => setField('backAttack', v)} />
      <Toggle label="서포터 유무" checked={state.hasSupporter} onChange={(v) => setField('hasSupporter', v)} />
    </div>
  );
}
