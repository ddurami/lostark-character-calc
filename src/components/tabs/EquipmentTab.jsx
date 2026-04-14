import { useCalc } from '../../context/CalcContext';
import { NumberInput, Select, SECTION_LABEL } from '../ui/FormControls';
import {
  getWeaponAdditionalDmg,
  NECKLACE_OPTIONS,
  RING_CRIT_RATE_OPTIONS,
  RING_CRIT_DMG_OPTIONS,
  BRACELET_OPTIONS,
} from '../../data/constants';

export default function EquipmentTab() {
  const { state, setField } = useCalc();
  const weaponDmg = getWeaponAdditionalDmg(state.weaponQuality);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
      <span className={`lg:col-span-2 ${SECTION_LABEL}`}>무기</span>
      <NumberInput
        label="품질"
        value={state.weaponQuality}
        onChange={(v) => setField('weaponQuality', v)}
        max={100}
        integer
      />
      <div className="flex items-center justify-between h-8 px-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0 mr-3">
          추가 피해
        </span>
        <span className="input-field w-32 tabular-nums">{weaponDmg}%</span>
      </div>

      <span className={`lg:col-span-2 ${SECTION_LABEL} pt-3`}>목걸이</span>
      <Select
        label="추가 피해"
        value={state.necklaceOption}
        onChange={(v) => setField('necklaceOption', v)}
        options={NECKLACE_OPTIONS}
      />
      <div className="hidden lg:block" />

      <span className={`lg:col-span-2 ${SECTION_LABEL} pt-3`}>반지1</span>
      <Select
        label="치명타 적중률"
        value={state.ring1CritRate}
        onChange={(v) => setField('ring1CritRate', v)}
        options={RING_CRIT_RATE_OPTIONS}
      />
      <Select
        label="치명타 피해"
        value={state.ring1CritDmg}
        onChange={(v) => setField('ring1CritDmg', v)}
        options={RING_CRIT_DMG_OPTIONS}
      />

      <span className={`lg:col-span-2 ${SECTION_LABEL} pt-3`}>반지2</span>
      <Select
        label="치명타 적중률"
        value={state.ring2CritRate}
        onChange={(v) => setField('ring2CritRate', v)}
        options={RING_CRIT_RATE_OPTIONS}
      />
      <Select
        label="치명타 피해"
        value={state.ring2CritDmg}
        onChange={(v) => setField('ring2CritDmg', v)}
        options={RING_CRIT_DMG_OPTIONS}
      />

      <span className={`lg:col-span-2 ${SECTION_LABEL} pt-3`}>팔찌</span>
      <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <select
          value={state.bracelet1}
          onChange={(e) => setField('bracelet1', e.target.value)}
          className="select-field w-full"
        >
          {BRACELET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={state.bracelet2}
          onChange={(e) => setField('bracelet2', e.target.value)}
          className="select-field w-full"
        >
          {BRACELET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={state.bracelet3}
          onChange={(e) => setField('bracelet3', e.target.value)}
          className="select-field w-full"
        >
          {BRACELET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
