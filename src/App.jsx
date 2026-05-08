import { useState, useEffect } from 'react';
import SetupPhase from './components/SetupPhase';
import ThemeSelection from './components/ThemeSelection';
import PassingPhase from './components/PassingPhase';
import StarterRoulette from './components/StarterRoulette';
import GameplayPhase from './components/GameplayPhase';
import VotingSystem from './components/VotingSystem';
import Revelation from './components/Revelation';

export default function App() {
  const [phase, setPhase] = useState('setup'); 
  const [playersList, setPlayersList] = useState([]);
  const [impostorCount, setImpostorCount] = useState(1);
  // Adicionamos o showCategory no GameData
  const [gameData, setGameData] = useState({ playersData: [], secretWord: null, showCategory: false });
  const [lastEliminated, setLastEliminated] = useState(null);
  
  const [onlineWords, setOnlineWords] = useState(null);
  const [loadingWords, setLoadingWords] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const gistUrl = `https://gist.githubusercontent.com/VictorHugoScarpin/c74f9511acc24c44075acad956350a56/raw?t=${new Date().getTime()}`;
        const response = await fetch(gistUrl);
        
        if (!response.ok) throw new Error('Falha na rede');
        
        const data = await response.json();
        setOnlineWords(data);
      } catch (error) {
        console.error("Erro ao buscar palavras online:", error);
        alert("Erro ao carregar as palavras. Verifique sua internet!");
      } finally {
        setLoadingWords(false);
      }
    };

    fetchWords();
  }, []);

  const handleSetupComplete = (players, count) => {
    setPlayersList(players);
    setImpostorCount(count);
    setPhase('themes');
  };

  // Agora recebemos a opção de mostrar categoria lá da tela de temas
  const handleStartGame = (secretWord, showCategory) => {
    let roles = Array(playersList.length).fill(false);
    for (let i = 0; i < impostorCount; i++) roles[i] = true;
    roles.sort(() => Math.random() - 0.5);

    const playersWithRoles = playersList.map((name, index) => ({
      name,
      isImpostor: roles[index],
      isAlive: true 
    })).sort(() => Math.random() - 0.5);

    setGameData({ playersData: playersWithRoles, secretWord, showCategory });
    setPhase('passing');
  };

  const handleVoteComplete = (eliminatedName) => {
    const updatedPlayers = gameData.playersData.map(p => 
      p.name === eliminatedName ? { ...p, isAlive: false } : p
    );
    setGameData({ ...gameData, playersData: updatedPlayers });
    setLastEliminated(eliminatedName);
    setPhase('revelation');
  };

  if (loadingWords) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <span className="text-amber-500/50 text-[15px] animate-pulse tracking-widest uppercase font-medium">
          Acessando Arquivos...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] selection:bg-amber-500/30 font-sans text-stone-200">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-amber-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <main className="relative z-10">
        {phase === 'setup' && <SetupPhase onSetupComplete={handleSetupComplete} />}
        {phase === 'themes' && <ThemeSelection onStartGame={handleStartGame} wordDatabase={onlineWords} />}
        {phase === 'passing' && <PassingPhase playersData={gameData.playersData} secretWord={gameData.secretWord} showCategory={gameData.showCategory} onFinishPassing={() => setPhase('starter')} />}
        {phase === 'starter' && <StarterRoulette players={gameData.playersData.filter(p => p.isAlive)} onNewRound={() => setPhase('gameplay')} />}
        {phase === 'gameplay' && <GameplayPhase onGoToVoting={() => setPhase('voting')} />}
        {phase === 'voting' && <VotingSystem alivePlayers={gameData.playersData.filter(p => p.isAlive)} onVoteComplete={handleVoteComplete} />}
        {phase === 'revelation' && <Revelation eliminatedName={lastEliminated} playersData={gameData.playersData} onContinueGame={() => setPhase('gameplay')} onEndGame={() => setPhase('themes')} />}
      </main>
    </div>
  );
}