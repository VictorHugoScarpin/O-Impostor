import { useState } from 'react';

export default function ThemeSelection({ onStartGame, wordDatabase }) {
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [showCategory, setShowCategory] = useState(false); // Controle se revela ou não a categoria

  const themes = wordDatabase ? Object.keys(wordDatabase) : [];
  const allSelected = themes.length > 0 && selectedThemes.length === themes.length;

  const toggleTheme = (theme) => {
    setSelectedThemes(prev => 
      prev.includes(theme) ? prev.filter(t => t !== theme) : [...prev, theme]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedThemes([]); // Desmarca tudo
    } else {
      setSelectedThemes([...themes]); // Marca tudo
    }
  };

  const handleStart = () => {
    if (selectedThemes.length === 0) return;
    
    let availableWords = [];
    selectedThemes.forEach(theme => {
      // Aqui nós "carimbamos" de qual tema a palavra veio, para poder mostrar depois
      wordDatabase[theme].forEach(wordData => {
        availableWords.push({ ...wordData, themeName: theme });
      });
    });

    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    // Passamos a palavra e se deve revelar a categoria
    onStartGame(randomWord, showCategory);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
      <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] border border-white/5 w-full max-w-sm shadow-2xl">
        <h2 className="text-[13px] text-stone-400 mb-6 uppercase tracking-widest font-medium">Arquivos de Investigação</h2>
        
        <button 
          onClick={handleSelectAll}
          className="mb-6 w-full text-[13px] font-semibold text-amber-500 uppercase tracking-wider bg-amber-500/10 py-3 rounded-xl border border-amber-500/20 active:scale-95 transition-all"
        >
          {allSelected ? "Desmarcar Todos" : "Selecionar Todos"}
        </button>

        <div className="grid grid-cols-2 gap-3 mb-10 max-h-48 overflow-y-auto pr-2">
          {themes.map(theme => (
            <button
              key={theme}
              onClick={() => toggleTheme(theme)}
              className={`p-4 rounded-2xl font-semibold capitalize text-[15px] transition-all duration-200 active:scale-95 ${
                selectedThemes.includes(theme)
                  ? 'bg-amber-600/20 text-amber-500 border border-amber-500/50 shadow-[0_0_15px_rgba(217,119,6,0.15)]'
                  : 'bg-[#2c2c2e] text-stone-400 border border-white/5 hover:bg-[#3a3a3c]'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        <div className="mb-8 p-4 bg-[#2c2c2e]/50 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="text-left">
            <p className="text-[14px] font-semibold text-stone-200">Revelar Categoria?</p>
            <p className="text-[11px] text-stone-400 mt-1">O impostor saberá o tema da rodada</p>
          </div>
          <button 
            onClick={() => setShowCategory(!showCategory)}
            className={`w-14 h-8 rounded-full transition-colors relative flex items-center ${showCategory ? 'bg-amber-500' : 'bg-[#3a3a3c]'}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full absolute transition-transform ${showCategory ? 'translate-x-7' : 'translate-x-1'}`}></div>
          </button>
        </div>

        <button 
          onClick={handleStart}
          disabled={selectedThemes.length === 0}
          className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-2xl font-semibold text-[17px] disabled:opacity-30 disabled:hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-900/20"
        >
          Iniciar Caso
        </button>
      </div>
    </div>
  );
}