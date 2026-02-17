import { useState } from 'react';
import { useAudio } from '../../hooks/useAudio';

interface Props {
  text: string;
  lang?: string;
  rate?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AudioButton({ text, lang, rate, size = 'md', className = '' }: Props) {
  const { speak } = useAudio();
  const [playing, setPlaying] = useState(false);

  const sizes = { sm: 'w-10 h-10 text-lg', md: 'w-14 h-14 text-2xl', lg: 'w-18 h-18 text-3xl' };

  const handleClick = () => {
    setPlaying(true);
    speak(text, { lang, rate });
    setTimeout(() => setPlaying(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizes[size]} rounded-full bg-primary text-white flex items-center justify-center
        active:scale-95 transition-transform ${playing ? 'audio-pulse' : ''} ${className}`}
      aria-label={`Écouter: ${text}`}
    >
      {playing ? '🔊' : '🔈'}
    </button>
  );
}
