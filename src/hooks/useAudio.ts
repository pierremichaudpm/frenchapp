import { useCallback, useRef } from 'react';

export function useAudio() {
  const speakingRef = useRef(false);

  const speak = useCallback((text: string, options?: { rate?: number; lang?: string }) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options?.lang || 'fr-CA';
    utterance.rate = options?.rate || 0.85;
    utterance.pitch = 1.1;

    // Try to find a fr-CA voice, fall back to fr-FR
    const voices = speechSynthesis.getVoices();
    const caVoice = voices.find(v => v.lang === 'fr-CA');
    const frVoice = voices.find(v => v.lang.startsWith('fr'));
    if (caVoice) utterance.voice = caVoice;
    else if (frVoice) utterance.voice = frVoice;

    speakingRef.current = true;
    utterance.onend = () => { speakingRef.current = false; };
    utterance.onerror = () => { speakingRef.current = false; };

    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    speakingRef.current = false;
  }, []);

  return { speak, stop, speakingRef };
}
