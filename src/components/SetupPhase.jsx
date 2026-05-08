import { useState } from 'react';

export default function SetupPhase({ onSetupComplete }) {
  const [players, setPlayers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [impostorCount, setImpostorCount] = useState(1);

  const addPlayer = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !players.includes(inputValue.trim())) {
      setPlayers([...players, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removePlayer = (name) => {
    setPlayers(players.filter(p => p !== name));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
      <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] border border-white/5 w-full max-w-sm shadow-2xl">
        <h1 className="text-[13px] text-stone-400 mb-8 uppercase tracking-[0.3em] font-medium">O Impostor</h1>
        
        <form onSubmit={addPlayer} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nome do jogador" 
            className="flex-1 bg-[#2c2c2e] border border-white/5 rounded-2xl px-5 py-3 text-white outline-none focus:border-amber-500/50 transition-colors"
          />
          <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-amber-900/20 active:scale-95 transition-all">
            +
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8 max-h-32 overflow-y-auto">
          {players.map(player => (
            <span key={player} onClick={() => removePlayer(player)} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[14px] flex items-center gap-2 cursor-pointer hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all">
              {player} &times;
            </span>
          ))}
        </div>

        <div className="mb-10 text-left">
          <label className="block text-[13px] text-stone-400 uppercase tracking-widest mb-3">Impostores no caso</label>
          <div className="flex items-center justify-between bg-[#2c2c2e] rounded-2xl p-2 border border-white/5">
            <button onClick={() => setImpostorCount(Math.max(1, impostorCount - 1))} className="w-12 h-10 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-lg active:scale-95 transition-all">-</button>
            <span className="text-xl font-bold text-amber-500">{impostorCount}</span>
            <button onClick={() => setImpostorCount(impostorCount + 1)} className="w-12 h-10 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-lg active:scale-95 transition-all">+</button>
          </div>
        </div>

        <button 
          onClick={() => onSetupComplete(players, impostorCount)}
          disabled={players.length < 3 || impostorCount >= players.length}
          className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-2xl font-semibold text-[17px] disabled:opacity-30 disabled:hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-900/20"
        >
          Avançar
        </button>
      </div>
    </div>
  );
}