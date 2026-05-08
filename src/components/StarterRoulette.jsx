import { useState, useEffect } from 'react';

export default function StarterRoulette({ players, onNewRound }) {
  const [instruction, setInstruction] = useState({ player: '', number: 0, direction: '' });

  useEffect(() => {
    const randomPlayer = players[Math.floor(Math.random() * players.length)].name;
    const directions = ["ESQUERDA", "DIREITA"];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const randomNumber = Math.floor(Math.random() * 12) + 4; 

    setInstruction({ player: randomPlayer, number: randomNumber, direction: randomDirection });
  }, [players]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
      <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] border border-white/5 w-full max-w-sm shadow-2xl">
        
        <h2 className="text-[13px] text-stone-400 mb-10 uppercase tracking-[0.2em] font-medium">Quem inicia os relatos?</h2>
        
        <div className="mb-10">
          <p className="text-[15px] text-stone-400 mb-2">A partir de</p>
          <p className="text-4xl font-bold text-amber-500 tracking-tight">{instruction.player}</p>
        </div>

        <div className="bg-[#2c2c2e] p-6 rounded-2xl border border-white/5 mb-10">
          <p className="text-[15px] text-stone-300">Conte</p>
          <p className="text-6xl font-black text-white my-3">{instruction.number}</p>
          <p className="text-[15px] text-stone-300">vezes para a <span className="font-bold text-amber-500">{instruction.direction}</span></p>
        </div>

        <button 
          onClick={onNewRound} 
          className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-2xl font-semibold text-[17px] transition-all active:scale-95 shadow-lg shadow-amber-900/20"
        >
          Iniciar Rodada
        </button>
      </div>
    </div>
  );
}