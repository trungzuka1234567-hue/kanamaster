/**
 * Audio Engine for Japanese Pronunciation & Web Audio API Synthesized Sound Effects
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.speechSynth = window.speechSynthesis || null;
    this.japaneseVoice = null;
    this.isMuted = false;
    this.initSpeech();
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initSpeech() {
    if (!this.speechSynth) return;

    const loadVoices = () => {
      const voices = this.speechSynth.getVoices();
      this.japaneseVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja')) || null;
    };

    loadVoices();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = loadVoices;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.speechSynth) {
      this.speechSynth.cancel();
    }
    return this.isMuted;
  }

  speak(text) {
    if (this.isMuted || !this.speechSynth) return;

    // Cancel previous speech to prevent backlog
    this.speechSynth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85; // Natural learning speed
    utterance.pitch = 1.0;

    if (this.japaneseVoice) {
      utterance.voice = this.japaneseVoice;
    }

    this.speechSynth.speak(utterance);
  }

  playFx(type, extra = 0) {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    try {
      switch (type) {
        case 'click': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
          break;
        }

        case 'flip': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.08);
          break;
        }

        case 'correct': {
          // Melodic major triad chime: C5 (523Hz), E5 (659Hz), G5 (784Hz)
          const freqs = [523.25, 659.25, 783.99];
          freqs.forEach((f, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + index * 0.07);

            gain.gain.setValueAtTime(0, now + index * 0.07);
            gain.gain.linearRampToValueAtTime(0.2, now + index * 0.07 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + index * 0.07);
            osc.stop(now + index * 0.07 + 0.3);
          });
          break;
        }

        case 'combo': {
          // Escalating chime depending on combo count
          const comboLevel = Math.min(extra, 10);
          const baseFreq = 523.25 * Math.pow(1.05946, comboLevel); // Chromatic rise
          const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];
          notes.forEach((f, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, now + index * 0.05);

            gain.gain.setValueAtTime(0.22, now + index * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + index * 0.05);
            osc.stop(now + index * 0.05 + 0.25);
          });
          break;
        }

        case 'wrong': {
          // Disagreeable low wobble buzz
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.linearRampToValueAtTime(100, now + 0.25);

          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.25);
          break;
        }

        case 'complete': {
          // Victory fanfare melody: C5 -> E5 -> G5 -> C6
          const notes = [523.25, 659.25, 783.99, 1046.50];
          const durations = [0.12, 0.12, 0.12, 0.4];
          let timeOffset = 0;

          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + timeOffset);

            gain.gain.setValueAtTime(0.25, now + timeOffset);
            gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + durations[idx]);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + timeOffset);
            osc.stop(now + timeOffset + durations[idx]);
            timeOffset += durations[idx] * 0.7;
          });
          break;
        }

        case 'tick': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1000, now);

          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.02);
          break;
        }
      }
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }
}

// Global sound instance
const sound = new SoundEngine();
