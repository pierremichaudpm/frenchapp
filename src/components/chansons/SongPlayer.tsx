import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { songs } from "../../data/songs";
import { useAudio } from "../../hooks/useAudio";
import { trackEvent } from "../../utils/analytics";

export default function SongPlayer() {
  const { songId } = useParams<{ songId: string }>();
  const song = songs.find((s) => s.id === songId);
  const { speak, stop } = useAudio();
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const playLine = useCallback(
    (index: number) => {
      if (!song || index >= song.lyrics.length) {
        setIsPlaying(false);
        setCurrentLine(-1);
        return;
      }
      setCurrentLine(index);
      const line = song.lyrics[index];
      speak(line.text, { rate: 0.75 });

      timeoutRef.current = setTimeout(() => {
        playLine(index + 1);
      }, line.durationMs);
    },
    [song, speak],
  );

  const handlePlay = () => {
    if (isPlaying) {
      stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsPlaying(false);
      setCurrentLine(-1);
    } else {
      trackEvent('song_play', { song: song?.title || '' });
      setIsPlaying(true);
      playLine(0);
    }
  };

  const handleLineClick = (index: number) => {
    stop();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentLine(index);
    if (song) speak(song.lyrics[index].text, { rate: 0.75 });
  };

  useEffect(() => {
    return () => {
      stop();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [stop]);

  if (!song) return <div className="p-4">Chanson introuvable.</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/chansons"
          aria-label="Retour aux chansons"
          className="w-10 h-10 rounded-full bg-white border border-brume flex items-center justify-center text-dark"
        >
          ←
        </Link>
        <span className="text-3xl">{song.emoji}</span>
        <div>
          <h1 className="text-xl font-bold text-dark font-serif">
            {song.title}
          </h1>
          <p className="text-sm text-muted">{song.theme}</p>
        </div>
      </div>

      {/* Play button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handlePlay}
          aria-label={isPlaying ? 'Mettre en pause' : 'Jouer la chanson'}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white
            transition-all active:scale-90 ${isPlaying ? "bg-primary animate-pulse" : "bg-primary hover:bg-primary/90"}`}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      {/* Lyrics */}
      <div className="space-y-3" role="list">
        {song.lyrics.map((line, i) => (
          <button
            key={i}
            onClick={() => handleLineClick(i)}
            aria-label={`Ligne ${i + 1}: ${line.text}`}
            className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-3 ${
              currentLine === i
                ? "bg-accent/20 border-2 border-accent scale-[1.02] shadow-md"
                : "bg-white border border-brume hover:border-secondary"
            }`}
          >
            <span className="text-3xl mt-1" aria-hidden="true">{line.gestureEmoji}</span>
            <div className="flex-1">
              <p
                className={`text-lg font-medium ${currentLine === i ? "text-dark" : "text-dark/80"}`}
              >
                {line.text}
              </p>
              <p
                className={`text-sm mt-1 ${currentLine === i ? "text-dark/70" : "text-muted"}`}
              >
                {line.gesture}
              </p>
            </div>
            <span className="text-primary text-sm mt-1">🔈</span>
          </button>
        ))}
      </div>

      {/* Vocabulary */}
      <div className="mt-8 bg-white rounded-2xl p-4 border border-brume">
        <h3 className="font-bold text-dark mb-2">Vocabulaire</h3>
        <div className="flex flex-wrap gap-2">
          {song.vocabularyFocus.map((word) => (
            <button
              key={word}
              onClick={() => speak(word)}
              aria-label={`Écouter le mot ${word}`}
              className="px-3 py-1.5 bg-secondary/15 text-dark rounded-full text-sm font-medium
                hover:bg-secondary/25 active:scale-95 transition-all"
            >
              {word} 🔈
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
