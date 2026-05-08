import { useState } from 'react';

export default function VotingSystem({ alivePlayers, onVoteComplete }) {
  const [method, setMethod] = useState(null);
  const [voterIndex, setVoterIndex] = useState(0);
  const [showVoter, setShowVoter] = useState(false);
  const [votes, setVotes] = useState({});

  const handleAnonVote = (targetName) => {
    const newVotes = { ...votes, [targetName]: (votes[targetName] || 0) + 1 };
    setVotes(newVotes);
    setShowVoter(false);

    if (voterIndex + 1 < alivePlayers.length) {
      setVoterIndex(voterIndex + 1);
    } else {
      let max = 0;
      let eliminated = [];
      for (let p in newVotes) {
        if (newVotes[p] > max) {
          max = newVotes[p];
          eliminated = [p];
        } else if (newVotes[p] === max) {
          eliminated.push(p);
        }
      }
      
      if (eliminated.length > 1) {
        alert(`Empate entre: ${eliminated.join(', ')}! Façam uma votação aberta para desempatar.`);
        setMethod('aberta'); 
      } else {
        onVoteComplete(eliminated[0]);
      }
    }
  };

  if (!method) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
        <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] border border-white/5 w-full max-w-sm shadow-2xl">
          <h2 className="text-[13px] text-stone-400 mb-8 uppercase tracking-widest font-medium">Método de Votação</h2>
          <div className="flex flex-col gap-4">
            <button onClick={() => setMethod('anonima')} className="bg-[#2c2c2e] border border-white/5 p-6 rounded-2xl hover:bg-[#3a3a3c] transition-all active:scale-95 flex flex-col items-center text-center">
              <span className="text-3xl mb-3">🕵️‍♂️</span>
              <span className="font-semibold text-stone-100">Votação Anônima</span>
              <span className="text-[13px] text-stone-400 mt-2">Passar o celular em segredo</span>
            </button>
            <button onClick={() => setMethod('aberta')} className="bg-[#2c2c2e] border border-white/5 p-6 rounded-2xl hover:bg-[#3a3a3c] transition-all active:scale-95 flex flex-col items-center text-center">
              <span className="text-3xl mb-3">📢</span>
              <span className="font-semibold text-stone-100">Votação Aberta</span>
              <span className="text-[13px] text-stone-400 mt-2">Votem na roda e cliquem no alvo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (method === 'aberta') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
        <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] border border-white/5 w-full max-w-sm shadow-2xl">
          <h2 className="text-[15px] text-stone-400 mb-8 font-medium tracking-wide">Quem foi o mais votado?</h2>
          <div className="flex flex-col gap-3">
            {alivePlayers.map(p => (
              <button key={p.name} onClick={() => onVoteComplete(p.name)} className="bg-[#2c2c2e] text-white p-4 rounded-2xl border border-white/5 hover:border-red-500/50 hover:bg-red-950/30 transition-all font-semibold active:scale-95">
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (method === 'anonima') {
    const currentVoter = alivePlayers[voterIndex];
    const votingTargets = alivePlayers.filter(p => p.name !== currentVoter.name);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
        <div className="backdrop-blur-2xl bg-[#1c1c1e]/60 p-8 sm:p-10 rounded-[2rem] border border-white/5 w-full max-w-sm shadow-2xl">
          {!showVoter ? (
            <div className="py-6">
              <p className="text-[15px] text-stone-400 mb-2">Passe o dispositivo para</p>
              <h2 className="text-4xl font-bold text-amber-500 mb-10 tracking-tight">{currentVoter.name}</h2>
              <button onClick={() => setShowVoter(true)} className="w-full bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-2xl font-semibold text-[17px] transition-all active:scale-95 shadow-lg shadow-amber-900/20">
                Sou eu, quero votar
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-[15px] text-stone-400 mb-6 font-medium">Em quem você vota, <span className="text-white font-bold">{currentVoter.name}</span>?</h2>
              <div className="flex flex-col gap-3">
                {votingTargets.map(p => (
                  <button key={p.name} onClick={() => handleAnonVote(p.name)} className="bg-[#2c2c2e] text-white p-4 rounded-2xl border border-white/5 hover:border-amber-500/50 hover:bg-[#3a3a3c] transition-all font-medium active:scale-95">
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}