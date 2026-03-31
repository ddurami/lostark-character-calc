import { ThemeProvider } from './context/ThemeContext';
import { CalcProvider } from './context/CalcContext';
import InputPanel from './components/InputPanel';
import ResultPanel from './components/ResultPanel';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <ThemeProvider>
      <CalcProvider>
        <div className="min-h-screen px-4 pt-6 pb-[12vh] md:px-6 lg:px-8 flex items-center justify-center">
          <div className="w-full max-w-7xl">
            <h1 className="text-center text-[1.75rem] font-semibold text-gray-800 dark:text-gray-200 mb-7">
              캐릭터 계산기
            </h1>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
              <div className="lg:relative">
                <div className="lg:absolute lg:inset-0">
                  <InputPanel />
                </div>
              </div>
              <div>
                <ResultPanel />
              </div>
            </div>
          </div>
        </div>
        <ThemeToggle />
      </CalcProvider>
    </ThemeProvider>
  );
}
