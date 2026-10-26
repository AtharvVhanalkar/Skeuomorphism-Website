/**
 * Skeuomorphism UI Interactive Controller (script.js)
 */
class TactileAudioEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick(type = 'push') {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      if (type === 'push') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.04);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      } else if (type === 'release') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.025);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      } else if (type === 'tick') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.015);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + (type === 'push' ? 0.04 : 0.02));
    } catch (e) {}
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const audio = new TactileAudioEngine();

  // Button clicks
  document.querySelectorAll('.skeuo-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => audio.playClick('push'));
    btn.addEventListener('mouseup', () => audio.playClick('release'));
  });

  // Toggle Switches
  document.querySelectorAll('.skeuo-toggle input[type="checkbox"]').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      audio.playClick('tick');
      const channel = e.target.dataset.channel || 'SYSTEM';
      const status = e.target.checked ? 'ENGAGED' : 'DISENGAGED';
      logTerminal(`[${channel}] Switch altered -> ${status}`);

      const targetLed = document.getElementById(e.target.dataset.ledTarget);
      if (targetLed) {
        targetLed.classList.toggle('is-active-green', e.target.checked);
      }
    });
  });

  // Rotary Knob Drag Interaction
  document.querySelectorAll('.skeuo-knob').forEach(knob => {
    let isDragging = false;
    let startY = 0;
    let currentAngle = parseInt(knob.dataset.angle || '0', 10);

    const updateKnob = (angle) => {
      currentAngle = Math.max(-135, Math.min(135, angle));
      knob.style.transform = `rotate(${currentAngle}deg)`;
      knob.dataset.angle = currentAngle;
      
      const readout = document.getElementById(knob.dataset.readout);
      if (readout) {
        const percent = Math.round(((currentAngle + 135) / 270) * 100);
        readout.textContent = `${percent}%`;
      }
    };

    knob.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
      audio.init();
      document.body.style.cursor = 'ns-resize';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaY = startY - e.clientY;
      startY = e.clientY;
      const newAngle = currentAngle + deltaY * 2.2;
      if (Math.abs(newAngle - currentAngle) > 8) audio.playClick('tick');
      updateKnob(newAngle);
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = 'default';
        logTerminal(`[POTENTIOMETER] Adjusted to angle ${currentAngle.toFixed(0)}°`);
      }
    });
  });

  // VU Meter Simulation
  const meterNeedle = document.getElementById('vuNeedle');
  if (meterNeedle) {
    let baseAngle = -35;
    setInterval(() => {
      const target = Math.max(-45, Math.min(45, baseAngle + (Math.random() - 0.48) * 16));
      meterNeedle.style.transform = `rotate(${target}deg)`;
    }, 120);
  }

  // Interactive Buttons
  const executeBtn = document.getElementById('btnExecute');
  if (executeBtn) {
    executeBtn.addEventListener('click', () => logTerminal('[PROCESS] Executing sequence diagnostics... OK.'));
  }

  const resetBtn = document.getElementById('btnReset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      logTerminal('[SYSTEM] Calibration parameters reset to factory defaults.');
      const knob = document.querySelector('.skeuo-knob');
      if (knob) {
        knob.style.transform = 'rotate(0deg)';
        knob.dataset.angle = 0;
        const readout = document.getElementById(knob.dataset.readout);
        if (readout) readout.textContent = '50%';
      }
    });
  }
});

function logTerminal(message) {
  const terminal = document.getElementById('terminalOutput');
  if (!terminal) return;
  const line = document.createElement('div');
  line.style.marginTop = '4px';
  line.textContent = `[${new Date().toTimeString().split(' ')[0]}] ${message}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}