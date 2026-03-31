import { useCalc } from '../../context/CalcContext';
import { NumberInput } from '../ui/FormControls';

export default function ClassTab() {
  const { state, setField } = useCalc();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
      <NumberInput label="치명타 적중률" value={state.classCritRate} onChange={(v) => setField('classCritRate', v)} max={100} />
      <NumberInput label="치명타 피해" value={state.classCritDmg} onChange={(v) => setField('classCritDmg', v)} />
      <NumberInput label="공격 속도" value={state.classAtkSpeed} onChange={(v) => setField('classAtkSpeed', v)} max={100} />
      <NumberInput label="이동 속도" value={state.classMoveSpeed} onChange={(v) => setField('classMoveSpeed', v)} max={100} />
    </div>
  );
}
