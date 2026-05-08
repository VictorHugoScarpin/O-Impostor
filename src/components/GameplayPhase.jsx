export default function GameplayPhase({ onGoToVoting }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
      <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] border border-white/5 w-full max-w-sm shadow-2xl">
        
        <div className="animate-pulse mb-10">
          <div className="w-24 h-24 bg-[#2c2c2e] rounded-full flex items-center justify-center mx-auto border border-white/5 shadow-inner">
            <span className="text-4xl opacity-80">👁️</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-stone-100 tracking-tight mb-4">Investigação em curso</h2>
        <p className="text-[15px] text-stone-400 mb-12 leading-relaxed">
          Prestem atenção aos relatos. Quando todos tiverem falado, iniciem a votação.
        </p>
        
        <button 
          onClick={onGoToVoting}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-semibold text-[17px] shadow-lg shadow-red-900/20 active:scale-95 transition-all"
        >
          Ir para a Votação
        </button>
      </div>
    </div>
  );
}