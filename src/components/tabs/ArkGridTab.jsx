import { useCalc } from '../../context/CalcContext';
import {
  NumberInput,
  Select,
  SECTION_LABEL,
  ROW,
  LABEL,
} from '../ui/FormControls';
import {
  ARK_GRID_SUN_OPTIONS,
  ARK_GRID_MOON_OPTIONS,
  ARK_GRID_STAR_OPTIONS,
  ARK_GRID_GRADE_OPTIONS,
  ARK_GRID_POINTS_OPTIONS,
  getGemAdditionalDmg,
} from '../../data/constants';

function CoreSection({
  title,
  coreOptions,
  coreValue,
  gradeValue,
  pointsValue,
  onCoreChange,
  onGradeChange,
  onPointsChange,
}) {
  return (
    <div>
      <span className={`block mb-1.5 ${SECTION_LABEL}`}>{title}</span>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
        <Select
          label="코어"
          value={coreValue}
          onChange={onCoreChange}
          options={coreOptions}
        />
        {coreValue !== 'none' && (
          <>
            <Select
              label="등급"
              value={gradeValue}
              onChange={onGradeChange}
              options={ARK_GRID_GRADE_OPTIONS}
            />
            <Select
              label="포인트"
              value={String(pointsValue)}
              onChange={(v) => onPointsChange(Number(v))}
              options={ARK_GRID_POINTS_OPTIONS}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function ArkGridTab() {
  const { state, setField } = useCalc();
  const gemDmg = getGemAdditionalDmg(state.arkGridGemLevel);

  return (
    <div className="space-y-4">
      <CoreSection
        title="혼돈의 해"
        coreOptions={ARK_GRID_SUN_OPTIONS}
        coreValue={state.arkGridSunCore}
        gradeValue={state.arkGridSunGrade}
        pointsValue={state.arkGridSunPoints}
        onCoreChange={(v) => setField('arkGridSunCore', v)}
        onGradeChange={(v) => setField('arkGridSunGrade', v)}
        onPointsChange={(v) => setField('arkGridSunPoints', v)}
      />

      <CoreSection
        title="혼돈의 달"
        coreOptions={ARK_GRID_MOON_OPTIONS}
        coreValue={state.arkGridMoonCore}
        gradeValue={state.arkGridMoonGrade}
        pointsValue={state.arkGridMoonPoints}
        onCoreChange={(v) => setField('arkGridMoonCore', v)}
        onGradeChange={(v) => setField('arkGridMoonGrade', v)}
        onPointsChange={(v) => setField('arkGridMoonPoints', v)}
      />

      <CoreSection
        title="혼돈의 별"
        coreOptions={ARK_GRID_STAR_OPTIONS}
        coreValue={state.arkGridStarCore}
        gradeValue={state.arkGridStarGrade}
        pointsValue={state.arkGridStarPoints}
        onCoreChange={(v) => setField('arkGridStarCore', v)}
        onGradeChange={(v) => setField('arkGridStarGrade', v)}
        onPointsChange={(v) => setField('arkGridStarPoints', v)}
      />

      <div>
        <span className={`block mb-1.5 ${SECTION_LABEL}`}>젬</span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
          <NumberInput
            label="추가 피해 Lv"
            value={state.arkGridGemLevel}
            onChange={(v) => setField('arkGridGemLevel', v)}
            max={120}
            integer
          />
          <div className={ROW}>
            <span className={LABEL}>추가 피해</span>
            <span className="input-field w-32 tabular-nums">{gemDmg}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
