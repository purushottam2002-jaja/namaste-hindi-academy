import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ text, label = 'Play audio' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speakHindi = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel(); // Stop any currently playing audio
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.85; // slightly slower for language learners

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speakHindi}
      className={`audio-btn ${isPlaying ? 'playing' : ''}`}
      aria-label={`${label}: ${text}`}
      title={`Listen to pronunciation: "${text}"`}
      type="button"
    >
      {isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
