import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="fixed bottom-5 right-5 z-50 w-10 h-10 flex items-center justify-center
                 rounded-full shadow-lg border
                 bg-white dark:bg-loa-card
                 border-gray-200 dark:border-loa-border
                 hover:bg-gray-50 dark:hover:bg-loa-hover
                 transition-colors duration-150"
    >
      <img
        src={theme === 'dark' ? '/icon-light.png' : '/icon-dark.png'}
        alt=""
        width={18}
        height={18}
        draggable={false}
        className="pointer-events-none opacity-60 dark:invert"
      />
    </button>
  );
}
