// vault.js

const keysDB = {
    alpha: { id: 'ALPHA', code: 'GHOST47', found: false },
    beta:  { id: 'BETA',  code: 'NEONSH4D0W', found: false },
    gamma: { id: 'GAMMA', code: 'VOIDWALKER', found: false },
    delta: { id: 'DELTA', code: 'K3YBR3ACH', found: false }
};

let foundKeys = [];

const privateKey = "4W8MoeP4QTuu2ZcCJ3tYjhQ5cTMTq91zRpEoE6quzBDMw6AtHw3gtAAJnQNoHnTprJXfmb8P8q52R8FDqbBwWWJC";

function addLine(text, color = '#00ff41') {
    const line = document.createElement('div');
    line.style.color = color;
    document.getElementById('term-body').appendChild(line);
    line.innerHTML = text;
    document.getElementById('term-body').scrollTop = document.getElementById('term-body').scrollHeight;
}

const commandHandler = {
    help: () => addLine('help, clear, ls, ls -a, cat [file], scan, exploit, keys, submit [KEYCODE]', '#ffff00'),
    clear: () => document.getElementById('term-body').innerHTML = '<div>Terminal wiped.</div>',
    ls: () => addLine('manifest.txt  encrypted_log.bin<br>Try ls -a', '#ffff00'),
    'ls -a': () => {
        addLine('.shadow_key  manifest.txt  .ghost_log');
        if (!keysDB.beta.found) {
            keysDB.beta.found = true;
            foundKeys.push(keysDB.beta);
            updateKeysUI();
            addLine('KEY BETA UNLOCKED → NEONSH4D0W', '#ffff00');
        }
    },
    cat: (args) => {
        if (args[0] === 'manifest.txt') {
            addLine('ZERO DAY key extraction active. Collect all 4 keys.', '#ffaa00');
        } else if (args[0] === '.shadow_key') {
            addLine('Shadow protocol decoded...');
            if (!keysDB.gamma.found) {
                keysDB.gamma.found = true;
                foundKeys.push(keysDB.gamma);
                updateKeysUI();
                addLine('KEY GAMMA UNLOCKED → VOIDWALKER', '#ffff00');
            }
        } else if (args[0] === '.ghost_log') {
            addLine('Ghost node transmission intercepted...', '#ffaa00');
            addLine('First key fragment: GHOST47', '#ffff00');
            if (!keysDB.alpha.found) {
                keysDB.alpha.found = true;
                foundKeys.push(keysDB.alpha);
                updateKeysUI();
                addLine('KEY ALPHA UNLOCKED → GHOST47', '#ffff00');
            }
        } else {
            addLine('Access denied or file not found.', '#ff4444');
        }
    },
    scan: () => {
        addLine('Scanning darknet nodes for anomalies...', '#ff8800');
        setTimeout(() => {
            addLine('Anomaly detected in ghost node transmission.', '#ffff00');
            addLine('Try: cat .ghost_log', '#ffff00');
        }, 1200);
    },
    exploit: () => {
        addLine('Zero-day deployed...', '#ff0000');
        setTimeout(() => {
            addLine('Firewall collapsed.', '#00ffff');
            if (!keysDB.delta.found) {
                keysDB.delta.found = true;
                foundKeys.push(keysDB.delta);
                updateKeysUI();
                addLine('KEY DELTA UNLOCKED → K3YBR3ACH', '#00ffff');
            }
        }, 1400);
    },
    keys: () => addLine('Collected: ' + (foundKeys.map(k => k.id).join(', ') || 'None'), '#ffff00'),
    submit: (args) => {
        const code = args.join('').toUpperCase
