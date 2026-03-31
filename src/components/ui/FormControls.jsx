import { useState, useEffect } from 'react';

const ROW = 'flex items-center justify-between h-8 px-2';
const LABEL = 'text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0 mr-3';

export const SECTION_LABEL = 'text-xs text-accent-500';

export function NumberInput({ label, value, onChange, min = 0, max, integer = false, className = '' }) {
  const [focused, setFocused] = useState(false);
  const [display, setDisplay] = useState(String(value));

  useEffect(() => {
    if (!focused) setDisplay(String(value));
  }, [value, focused]);

  const handleChange = (e) => {
    let raw = e.target.value;
    const pattern = integer ? /^\d*$/ : /^\d*\.?\d{0,2}$/;
    if (raw !== '' && !pattern.test(raw)) return;
    if (raw.length > 1 && raw[0] === '0' && (integer || raw[1] !== '.')) raw = raw.replace(/^0+/, '') || '0';
    setDisplay(raw);
    if (raw === '' || raw === '.') return;
    const num = parseFloat(raw);
    if (isNaN(num)) return;
    if (max !== undefined && num > max) {
      setDisplay(String(max));
      onChange(max);
      return;
    }
    onChange(num);
  };

  const handleFocus = (e) => {
    setFocused(true);
    e.target.select();
  };

  const handleBlur = () => {
    setFocused(false);
    let num = parseFloat(display) || 0;
    if (max !== undefined) num = Math.min(max, num);
    num = Math.max(min, num);
    onChange(num);
    setDisplay(String(num));
  };

  return (
    <div className={`${ROW} ${className}`}>
      <span className={LABEL}>{label}</span>
      <input
        type="text"
        inputMode={integer ? 'numeric' : 'decimal'}
        value={display}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="input-field w-32"
      />
    </div>
  );
}

export function Toggle({ label, checked, onChange, className = '' }) {
  return (
    <div className={`${ROW} ${className}`}>
      <span className={LABEL}>{label}</span>
      <div className="w-32 flex justify-center">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-150 ${
            checked ? 'bg-accent-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-150 ${
              checked ? 'translate-x-[18px]' : 'translate-x-[3px]'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export function Select({ label, value, onChange, options, className = '' }) {
  return (
    <div className={`${ROW} ${className}`}>
      <span className={LABEL}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="select-field w-32">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export function Accordion({ title, defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 dark:border-loa-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 bg-accent-500/5"
      >
        <span>{title}</span>
        <img
          src="/icon-arrow.png"
          alt=""
          width={14}
          height={14}
          draggable={false}
          className={`opacity-40 dark:invert transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3">{children}</div>
      </div>
    </div>
  );
}
