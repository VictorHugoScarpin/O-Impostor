import { useState } from 'react';

export default function PassingPhase({ playersData, secretWord, showCategory, onFinishPassing }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRole, setShowRole] = useState(false);

  const currentPlayer = playersData[currentIndex];
  const otherImpostors = playersData
    .filter(p => p.isImpostor && p.name !== currentPlayer.name)
    .map(p => p.name);

  const handleNext = () => {
    setShowRole(false);
    if (currentIndex + 1 < playersData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinishPassing();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
      <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] border border-white/5 w-full max-w-sm shadow-2xl">
        
        {!showRole ? (
          <div className="animate-fade-in flex flex-col items-center py-6">
            <span className="text-5xl mb-6 opacity-80">🕵️‍♂️</span>
            <h2 className="text-[15px] text-stone-400 mb-1 font-medium tracking-wide">Entregue o dispositivo para</h2>
            <p className="text-4xl text-amber-500 font-bold tracking-tight mb-12">{currentPlayer.name}</p>
            
            <button 
              onClick={() => setShowRole(true)}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-2xl font-semibold text-[17px] transition-all active:scale-95 shadow-lg shadow-amber-900/20"
            >
              Sou eu, revelar identidade
            </button>
          </div>
        ) : (
          <div className="animate-fade-in py-4">
            <h2 className="text-[13px] text-stone-400 mb-6 uppercase tracking-widest font-medium">Sua Identidade</h2>
            
            {currentPlayer.isImpostor ? (
              <div className="my-6">
                <p className="text-5xl font-black tracking-tight text-red-500 mb-4">IMPOSTOR</p>
                
                {/* Mostra a categoria para o Impostor se estiver ativado */}
                {showCategory && (
                  <div className="bg-[#2c2c2e]/80 p-4 rounded-2xl border border-amber-500/30 mb-6 shadow-inner">
                    <p className="text-[12px] text-amber-500/70 uppercase tracking-widest mb-1">O tema desta rodada é</p>
                    <p className="font-bold text-xl text-amber-400 capitalize">{secretWord.themeName}</p>
                  </div>
                )}

                {otherImpostors.length > 0 && (
                  <div className="bg-red-950/30 p-5 rounded-2xl border border-red-900/50">
                    <p className="text-[13px] text-red-300/70 uppercase tracking-wider mb-1">Cúmplices</p>
                    <p className="font-semibold text-lg text-red-400">{otherImpostors.join(', ')}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="my-6 flex flex-col items-center">
                {/* Mostra a categoria para os inocentes também, para eles lembrarem do contexto */}
                {showCategory && (
                  <p className="text-[13px] font-bold text-amber-500 uppercase tracking-widest mb-4 bg-amber-500/10 px-4 py-1 rounded-full border border-amber-500/20">
                    Tema: {secretWord.themeName}
                  </p>
                )}
                
                <p className="text-[13px] text-stone-400 uppercase tracking-widest mb-3">A palavra investigada é</p>
                <p className="text-4xl font-bold text-stone-100 mb-6">{secretWord.word}</p>
                
                <div className="bg-[#2c2c2e]/50 p-5 rounded-2xl border border-white/5 max-w-sm">
                  <p className="text-[15px] text-stone-300 italic leading-relaxed">"{secretWord.description}"</p>
                </div>
              </div>
            )}

            <button 
              onClick={handleNext}
              className="w-full mt-6 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white py-4 rounded-2xl font-semibold text-[17px] transition-all active:scale-95 border border-white/5"
            >
              {currentIndex + 1 < playersData.length ? "Esconder e Passar" : "Avançar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}