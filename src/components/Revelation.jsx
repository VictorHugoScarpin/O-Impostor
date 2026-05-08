export default function Revelation({ eliminatedName, playersData, onContinueGame, onEndGame }) {
  const eliminatedPlayer = playersData.find(p => p.name === eliminatedName);
  const remainingImpostorsCount = playersData.filter(p => p.isAlive && p.isImpostor).length;
  const remainingInnocentsCount = playersData.filter(p => p.isAlive && !p.isImpostor).length;

  const isGameOver = remainingImpostorsCount === 0 || remainingImpostorsCount >= remainingInnocentsCount;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
      <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-white/5 w-full max-w-sm">
        
        <h2 className="text-[13px] text-stone-400 mb-4 uppercase tracking-widest font-medium">Veredito</h2>
        <p className="text-4xl font-bold text-white tracking-tight mb-8">{eliminatedName}</p>
        
        {eliminatedPlayer.isImpostor ? (
          <div className="mb-10">
            <p className="text-6xl mb-6">🎭</p>
            <p className="text-[22px] font-bold text-amber-500 tracking-wide">ERA UM IMPOSTOR</p>
          </div>
        ) : (
          <div className="mb-10">
            <p className="text-6xl mb-6">🕵️‍♂️</p>
            <p className="text-[22px] font-bold text-red-500 tracking-wide">NÃO ERA O IMPOSTOR</p>
          </div>
        )}

        {!isGameOver ? (
          <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-white/5 mb-10">
            <p className="text-[14px] text-stone-400 mb-1">O caso não está encerrado.</p>
            <p className="text-[15px] font-medium text-white">
              Ainda existem <span className="text-amber-500 font-bold">{remainingImpostorsCount}</span> impostores soltos.
            </p>
          </div>
        ) : (
          <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-white/5 mb-10">
            <p className="text-xl font-bold text-stone-100 mb-1">CASO ENCERRADO</p>
            <p className="text-[15px] text-stone-400 mt-1">
              {remainingImpostorsCount === 0 ? "Os Investigadores venceram!" : "Os Impostores dominaram a mesa!"}
            </p>
          </div>
        )}

        <button 
          onClick={isGameOver ? onEndGame : onContinueGame}
          className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-2xl font-semibold text-[17px] transition-all active:scale-95 shadow-lg shadow-amber-900/20"
        >
          {isGameOver ? "Novo Caso" : "Retomar Investigação"}
        </button>
      </div>
    </div>
  );
}