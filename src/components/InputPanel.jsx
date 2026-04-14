import { Accordion } from './ui/FormControls';
import ClassSelectTab from './tabs/ClassSelectTab';
import BasicTab from './tabs/BasicTab';
import EquipmentTab from './tabs/EquipmentTab';
import EngravingTab from './tabs/EngravingTab';
import ArkPassiveTab from './tabs/ArkPassiveTab';
import ArkGridTab from './tabs/ArkGridTab';

export default function InputPanel() {
  return (
    <div className="card overflow-hidden lg:h-full flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-scroll custom-scrollbar">
        <Accordion title="직업" defaultOpen>
          <ClassSelectTab />
        </Accordion>
        <Accordion title="기본">
          <BasicTab />
        </Accordion>
        <Accordion title="장비">
          <EquipmentTab />
        </Accordion>
        <Accordion title="각인">
          <EngravingTab />
        </Accordion>
        <Accordion title="아크패시브 진화">
          <ArkPassiveTab />
        </Accordion>
        <Accordion title="아크그리드">
          <ArkGridTab />
        </Accordion>
      </div>
    </div>
  );
}
