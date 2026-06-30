/**
 * Audio Generator - Creates sounds programmatically using Web Audio API
 * This generates all the sound effects for the game
 */

class AudioGenerator {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.enabled = true;
        this.init();
    }
    
    init() {
        // Create audio context on first interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.preloadSounds();
            }
        }, { once: true });
    }
    
    preloadSounds() {
        // Preload all sound types
        this.sounds = {
            click: this.createClickSound(),
            place: this.createPlaceSound(),
            win: this.createWinSound(),
            lose: this.createLoseSound(),
            draw: this.createDrawSound(),
            levelup: this.createLevelUpSound(),
            hint: this.createHintSound(),
            music: this.createMusicSound()
        };
    }
    
    createClickSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return null;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
            
            return oscillator;
        };
    }
    
    createPlaceSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return null;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
            
            // Add a second tone for richness
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode2 = this.audioContext.createGain();
            
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(1500, this.audioContext.currentTime);
            
            gainNode2.gain.setValueAtTime(0.08, this.audioContext.currentTime);
            gainNode2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator2.connect(gainNode2);
            gainNode2.connect(this.audioContext.destination);
            
            oscillator2.start(this.audioContext.currentTime);
            oscillator2.stop(this.audioContext.currentTime + 0.2);
            
            return [oscillator, oscillator2];
        };
    }
    
    createWinSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return null;
            
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            const oscillators = [];
            
            notes.forEach((freq, i) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + i * 0.1);
                
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime + i * 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.1 + 0.5);
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.start(this.audioContext.currentTime + i * 0.1);
                oscillator.stop(this.audioContext.currentTime + i * 0.1 + 0.5);
                
                oscillators.push(oscillator);
            });
            
            return oscillators;
        };
    }
    
    createLoseSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return null;
            
            const notes = [261.63, 220, 196]; // C4, A3, G3
            const oscillators = [];
            
            notes.forEach((freq, i) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + i * 0.15);
                
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime + i * 0.15);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.15 + 0.6);
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.start(this.audioContext.currentTime + i * 0.15);
                oscillator.stop(this.audioContext.currentTime + i * 0.15 + 0.6);
                
                oscillators.push(oscillator);
            });
            
            return oscillators;
        };
    }
    
    createDrawSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return null;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
            
            return oscillator;
        };
    }
    
    createLevelUpSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return null;
            
            const notes = [392, 440, 523.25, 659.25, 783.99]; // G4, A4, C5, E5, G5
            const oscillators = [];
            
            notes.forEach((freq, i) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + i * 0.08);
                
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime + i * 0.08);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.08 + 0.4);
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.start(this.audioContext.currentTime + i * 0.08);
                oscillator.stop(this.audioContext.currentTime + i * 0.08 + 0.4);
                
                oscillators.push(oscillator);
            });
            
            return oscillators;
        };
    }
    
    createHintSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return null;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
            
            // Add a second tone
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode2 = this.audioContext.createGain();
            
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(1200, this.audioContext.currentTime);
            
            gainNode2.gain.setValueAtTime(0.05, this.audioContext.currentTime);
            gainNode2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator2.connect(gainNode2);
            gainNode2.connect(this.audioContext.destination);
            
            oscillator2.start(this.audioContext.currentTime);
            oscillator2.stop(this.audioContext.currentTime + 0.1);
            
            return [oscillator, oscillator2];
        };
    }
    
    createMusicSound() {
        return () => {
            if (!this.audioContext || !this.enabled) return null;
            
            // Simple ambient music
            const oscillator1 = this.audioContext.createOscillator();
            const gainNode1 = this.audioContext.createGain();
            const filter1 = this.audioContext.createBiquadFilter();
            
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(220, this.audioContext.currentTime);
            
            filter1.type = 'lowpass';
            filter1.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            
            gainNode1.gain.setValueAtTime(0.05, this.audioContext.currentTime);
            
            oscillator1.connect(filter1);
            filter1.connect(gainNode1);
            gainNode1.connect(this.audioContext.destination);
            
            oscillator1.start(this.audioContext.currentTime);
            
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode2 = this.audioContext.createGain();
            const filter2 = this.audioContext.createBiquadFilter();
            
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(277.18, this.audioContext.currentTime);
            
            filter2.type = 'lowpass';
            filter2.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            
            gainNode2.gain.setValueAtTime(0.03, this.audioContext.currentTime);
            
            oscillator2.connect(filter2);
            filter2.connect(gainNode2);
            gainNode2.connect(this.audioContext.destination);
            
            oscillator2.start(this.audioContext.currentTime);
            
            return [oscillator1, oscillator2, gainNode1, gainNode2];
        };
    }
    
    play(soundName) {
        if (this.sounds[soundName]) {
            return this.sounds[soundName]();
        }
        return null;
    }
    
    stopMusic() {
        // Music is handled separately
    }
    
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// Export for use in game
window.AudioGenerator = AudioGenerator;
