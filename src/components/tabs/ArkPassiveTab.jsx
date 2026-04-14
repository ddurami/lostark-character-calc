import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCalc } from '../../context/CalcContext';
import {
  EVO_2T_NODES,
  EVO_3T_NODES,
  EVO_4T_NODES,
  EVO_5T_NODES,
  TIER_CONFIG,
  EVO_NODE_DESC,
} from '../../data/constants';

function renderNodeDesc(nodeKey, level) {
  const desc = EVO_NODE_DESC[nodeKey];
  if (!desc) return null;

  let posIdx = 0;
  let negIdx = 0;

  const parts = desc.text.split(/(\{(?:\d+|n\d+)\})/g);
  return parts.map((part, i) => {
    const posMatch = part.match(/^\{(\d+)\}$/);
    const negMatch = part.match(/^\{n(\d+)\}$/);

    if (posMatch) {
      const idx = parseInt(posMatch[1]);
      const arr = desc.positive?.[idx];
      if (!arr) return part;
      const val =
        level === 0 ? arr[0] : arr[Math.min(level - 1, arr.length - 1)];
      return (
        <span key={i} className="text-green-500 font-medium">
          {val}
        </span>
      );
    }
    if (negMatch) {
      const idx = parseInt(negMatch[1]);
      const arr = desc.negative?.[idx];
      if (!arr) return part;
      const val =
        level === 0 ? arr[0] : arr[Math.min(level - 1, arr.length - 1)];
      return (
        <span key={i} className="text-red-400 font-medium">
          {val}
        </span>
      );
    }
    return part;
  });
}

function NodeTooltip({ nodeKey, label, level, anchorRect }) {
  const tooltipRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!tooltipRef.current || !anchorRect) return;
    const tt = tooltipRef.current.getBoundingClientRect();
    let top = anchorRect.top + anchorRect.height / 2 - tt.height / 2;
    let left = anchorRect.right + 8;

    if (left + tt.width > window.innerWidth - 8) {
      left = anchorRect.left - tt.width - 8;
    }
    if (top < 8) top = 8;
    if (top + tt.height > window.innerHeight - 8)
      top = window.innerHeight - 8 - tt.height;

    setPos({ top, left });
  }, [anchorRect]);

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-50 max-w-xs px-3 py-2.5 rounded-lg shadow-lg border border-gray-200 dark:border-loa-border bg-white dark:bg-loa-surface pointer-events-none"
      style={{ top: pos.top, left: pos.left }}
    >
      <div className="text-sm font-medium text-accent-500 mb-1">{label}</div>
      <div className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">
        {renderNodeDesc(nodeKey, level)}
      </div>
    </div>,
    document.body,
  );
}

function NodeImageButton({
  nodeKey,
  image,
  label,
  level,
  maxLevel,
  effectiveMax,
  onChange,
}) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const [anchorRect, setAnchorRect] = useState(null);

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

  const handleMouseEnter = () => {
    setHovered(true);
    if (containerRef.current) {
      setAnchorRect(containerRef.current.getBoundingClientRect());
    }
  };

  const frameActive = level > 0 || hovered;
  const frameShift = frameActive ? '-25%' : '0';

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        ref={containerRef}
        className="relative w-[84px] h-[84px] rounded-full overflow-hidden cursor-pointer select-none"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={handleMouseEnter}
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
      {hovered && EVO_NODE_DESC[nodeKey] && (
        <NodeTooltip
          nodeKey={nodeKey}
          label={label}
          level={level}
          anchorRect={anchorRect}
        />
      )}
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
            nodeKey={node.key}
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
