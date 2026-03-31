import { useCalc } from "../../context/CalcContext";
import { Select, Toggle, SECTION_LABEL } from "../ui/FormControls";
import {
  ENGRAVING_GRADE_OPTIONS,
  STONE_LEVEL_OPTIONS,
} from "../../data/constants";

export default function EngravingTab() {
  const { state, setField } = useCalc();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
      <span className={`lg:col-span-2 ${SECTION_LABEL}`}>돌격 대장</span>
      <Select
        label="각인서"
        value={state.raidCaptainGrade}
        onChange={(v) => setField("raidCaptainGrade", v)}
        options={ENGRAVING_GRADE_OPTIONS}
      />
      <Select
        label="어빌리티 스톤"
        value={state.raidCaptainStone}
        onChange={(v) => setField("raidCaptainStone", Number(v))}
        options={STONE_LEVEL_OPTIONS}
      />

      <span className={`lg:col-span-2 ${SECTION_LABEL} pt-3`}>예리한 둔기</span>
      <Select
        label="각인서"
        value={state.keenBluntGrade}
        onChange={(v) => setField("keenBluntGrade", v)}
        options={ENGRAVING_GRADE_OPTIONS}
      />
      <Select
        label="어빌리티 스톤"
        value={state.keenBluntStone}
        onChange={(v) => setField("keenBluntStone", Number(v))}
        options={STONE_LEVEL_OPTIONS}
      />

      <span className={`lg:col-span-2 ${SECTION_LABEL} pt-3`}>아드레날린</span>
      <Select
        label="각인서"
        value={state.adrenalineGrade}
        onChange={(v) => setField("adrenalineGrade", v)}
        options={ENGRAVING_GRADE_OPTIONS}
      />
      <div />

      <span className={`lg:col-span-2 ${SECTION_LABEL} pt-3`}>질량 증가</span>
      <Toggle
        label="채용"
        checked={state.massIncrease}
        onChange={(v) => setField("massIncrease", v)}
      />
      <div />
    </div>
  );
}
