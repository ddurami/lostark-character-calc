import { useState } from "react";
import { useCalc } from "../../context/CalcContext";
import {
  EVO_2T_NODES,
  EVO_3T_NODES,
  EVO_4T_NODES,
  EVO_5T_NODES,
  TIER_CONFIG,
} from "../../data/constants";

function NodeImageButton({
  image,
  label,
  level,
  maxLevel,
  effectiveMax,
  onChange,
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.shiftKey) {
      if (effectiveMax > level) onChange(effectiveMax);
    } else if (level < effectiveMax) {
      onChange(level + 1);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (e.shiftKey) {
      onChange(0);
    } else if (level > 0) {
      onChange(level - 1);
    }
  };

  const frameActive = level > 0 || hovered;
  const frameShift = frameActive ? "-25%" : "0";

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className="relative w-[84px] h-[84px] rounded-full overflow-hidden cursor-pointer select-none"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute inset-[20px] rounded-full overflow-hidden">
          <img
            src={`/evolution/${image}`}
            alt=""
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>
        <div className="absolute -inset-[7px] z-10 overflow-hidden pointer-events-none">
          <img
            src="/evolution/frame.webp"
            alt=""
            className="w-full block"
            style={{ transform: `translateY(${frameShift})` }}
            draggable={false}
          />
        </div>
      </div>
      <span className="text-xs text-gray-700 dark:text-gray-300 text-center leading-tight w-full truncate">
        {label}
      </span>
      <span className="text-xs text-gray-700 dark:text-gray-300 text-center leading-tight">
        Lv. {level}/{maxLevel}
      </span>
    </div>
  );
}

function TierSection({ title, tier, nodes, state, setField }) {
  const config = TIER_CONFIG[tier];
  const usedPoints = nodes.reduce(
    (sum, n) => sum + state[n.key] * config.pointCost,
    0,
  );
  const remaining = config.maxPoints - usedPoints;

  const getEffectiveMax = (key, maxLevel) => {
    const current = state[key];
    return Math.min(
      maxLevel,
      current + Math.floor(remaining / config.pointCost),
    );
  };

  const handleChange = (key, maxLevel, newLevel) => {
    const current = state[key];
    if (newLevel < 0 || newLevel > maxLevel) return;
    const delta = (newLevel - current) * config.pointCost;
    if (delta > 0 && delta > remaining) return;
    setField(key, newLevel);
  };

  return (
    <div className="mb-4 last:mb-0">
      <span className="text-xs text-accent-500 block mb-1.5">{title}</span>
      <div className="grid grid-cols-3 xl:grid-cols-6 gap-1 justify-items-center">
        {nodes.map((node) => (
          <NodeImageButton
            key={node.key}
            image={node.image}
            label={node.label}
            level={state[node.key]}
            maxLevel={node.maxLevel}
            effectiveMax={getEffectiveMax(node.key, node.maxLevel)}
            onChange={(v) => handleChange(node.key, node.maxLevel, v)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ArkPassiveTab() {
  const { state, setField } = useCalc();
  return (
    <div>
      <TierSection
        title="2티어"
        tier="2T"
        nodes={EVO_2T_NODES}
        state={state}
        setField={setField}
      />
      <TierSection
        title="3티어"
        tier="3T"
        nodes={EVO_3T_NODES}
        state={state}
        setField={setField}
      />
      <TierSection
        title="4티어"
        tier="4T"
        nodes={EVO_4T_NODES}
        state={state}
        setField={setField}
      />
      <TierSection
        title="5티어"
        tier="5T"
        nodes={EVO_5T_NODES}
        state={state}
        setField={setField}
      />
    </div>
  );
}
