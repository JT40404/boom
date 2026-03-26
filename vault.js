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
        addLine('.shadow_key  manifest.txt');
        if (!keysDB.beta.found) {
            keysDB.beta.found = true;
            foundKeys.push(keysDB.beta);
            updateKeysUI();
            addLine('KEY BETA UNLOCKED → NEONSH4D0W', '#ffff00');
        }
    },
    cat: (args) => {
        if (args[0] === 'manifest.txt') addLine('ZERO DAY key extraction active.', '#ffaa00');
        else if (args[0] === '.shadow_key') {
            addLine('Shadow protocol decoded...');
            if (!keysDB.gamma.found) {
                keysDB.gamma.found = true;
                foundKeys.push(keysDB.gamma);
                updateKeysUI();
                addLine('KEY GAMMA UNLOCKED → VOIDWALKER', '#ffff00');
            }
        } else addLine('Access denied or file not found.', '#ff4444');
    },
    scan: () => {
        addLine('Scanning darknet nodes for anomalies...', '#ff8800');
        // No more "check page source" hint
    },
    exploit: () => {
        addLine('Zero-day deployed...', '#ff0000');
        setTimeout(() => {
            addLine('Firewall down.', '#00ffff');
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
        const code = args.join('').toUpperCase();
        let success = false;
        Object.values(keysDB).forEach(key => {
            if (!key.found && key.code === code) {
                key.found = true;
                foundKeys.push(key);
                updateKeysUI();
                addLine(`KEY ${key.id} VERIFIED`, '#00ff00');
                success = true;
            }
        });
        if (!success) addLine('Invalid key.', '#ff4444');
        
        if (foundKeys.length >= 4) {
            setTimeout(() => {
                document.getElementById('success-screen').style.display = 'flex';
                addLine('ZERO DAY EXPLOIT SUCCESSFUL — PRIVATE KEY UNLOCKED', '#ffff00');
            }, 600);
        }
    }
};

function updateKeysUI() {
    document.getElementById('keys-list').innerHTML = foundKeys.map(k => `🔑 ${k.id}: ${k.code}`).join('<br>');
    document.getElementById('key-count').textContent = foundKeys.length;
}

// Make available to index.html
window.commandHandler = commandHandler;
window.updateKeysUI = updateKeysUI;

// Private key copy
document.getElementById('private-key-box').addEventListener('click', () => {
    const box = document.getElementById('private-key-box');
    const notice = document.getElementById('copied-notice');

    navigator.clipboard.writeText(privateKey).then(() => {
        notice.style.opacity = '1';
        box.textContent = "COPIED SUCCESSFULLY ✓";
        box.style.borderColor = '#00ff00';
        box.style.color = '#00ff00';
        
        setTimeout(() => {
            notice.style.opacity = '0';
            box.textContent = "CLICK TO REVEAL & COPY KEY";
            box.style.borderColor = '#ffff00';
            box.style.color = '#ffff00';
        }, 2200);
    });
});
