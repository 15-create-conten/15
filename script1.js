document.addEventListener("DOMContentLoaded", () => {
    // Proteksi halaman berdasarkan localStorage
    const stage = localStorage.getItem("th_stage");
    if (!stage || parseInt(stage) < 2) {
        alert("ACCESS DENIED");
        window.location.href = "index.html";
        return;
    }
    initStage1();
});

const container = document.getElementById("game-container");

// Helper Sound/Tone sederhana (Synthesizer Web Audio API)
function playBeep(freq, duration, type="sine") {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch(e) {}
}

/* STAGE 1: MEMORY */
function initStage1() {
    container.innerHTML = `
        <h2>STAGE 1 — MEMORY</h2>
        <p class="instruction">Hafalkan urutan simbol berikut...</p>
        <div class="pattern-display" id="mem-sequence">◆ ● ▲ ■ ★</div>
        <div id="msg"></div>
    `;
    playBeep(220, 0.4);

    setTimeout(() => {
        playBeep(440, 0.2);
        container.innerHTML = `
            <h2>STAGE 1 — MEMORY</h2>
            <p class="instruction">Masukkan urutan dengan benar:</p>
            <div class="memory-grid">
                <button class="mem-btn" data-s="◆">◆</button>
                <button class="mem-btn" data-s="●">●</button>
                <button class="mem-btn" data-s="▲">▲</button>
                <button class="mem-btn" data-s="■">■</button>
                <button class="mem-btn" data-s="★">★</button>
            </div>
            <div id="msg"></div>
        `;

        const target = ["◆", "●", "▲", "■", "★"];
        let currentIdx = 0;
        const buttons = document.querySelectorAll(".mem-btn");
        const msg = document.getElementById("msg");

        buttons.forEach(b => {
            b.addEventListener("click", (e) => {
                const val = e.target.getAttribute("data-s");
                playBeep(600, 0.1);
                if (val === target[currentIdx]) {
                    currentIdx++;
                    if (currentIdx === target.length) {
                        msg.innerHTML = `<span class="success-text">MEMORY VERIFIED.</span>`;
                        setTimeout(initStage2, 1000);
                    }
                } else {
                    playBeep(120, 0.5, "sawtooth");
                    msg.innerHTML = `<span class="error-text">SALAH URUTAN. MENGULANG...</span>`;
                    setTimeout(initStage1, 1200);
                }
            });
        });
    }, 3000);
}

/* STAGE 2: PATTERN */
function initStage2() {
    container.innerHTML = `
        <h2>STAGE 2 — PATTERN</h2>
        <p class="instruction">Tentukan angka berikutnya:</p>
        <div class="pattern-display">2 → 4 → 8 → 16 → ?</div>
        <div class="pattern-input-group">
            <input type="number" id="p-input" autofocus />
            <button class="horror-btn" id="p-sub">SUBMIT</button>
        </div>
        <div id="msg"></div>
    `;
    playBeep(300, 0.4);

    const sub = document.getElementById("p-sub");
    const inp = document.getElementById("p-input");
    const msg = document.getElementById("msg");

    const check = () => {
        if (inp.value.trim() === "32") {
            playBeep(880, 0.4);
            msg.innerHTML = `<span class="success-text">PATTERN SOLVED.</span>`;
            setTimeout(initStage3, 1000);
        } else {
            playBeep(100, 0.6, "sawtooth");
            msg.innerHTML = `<span class="error-text">SALAH. COBA LAGI.</span>`;
            inp.value = "";
        }
    };
    sub.addEventListener("click", check);
    inp.addEventListener("keypress", (e) => { if(e.key === "Enter") check(); });
}

/* STAGE 3: HIDDEN SYMBOL & TIMER */
function initStage3() {
    container.innerHTML = `
        <h2>STAGE 3 — HIDDEN OBJECT</h2>
        <p class="instruction">Temukan simbol: <span style="color:#ff3333">◈</span> (Waktu terbatas)</p>
        <div style="color:#ff3333; margin-bottom:15px;" id="timer-box">TIME LEFT: <span id="t-val">12</span></div>
        <div class="hidden-symbol-grid" id="h-grid"></div>
        <div id="msg"></div>
    `;
    playBeep(350, 0.4);

    let time = 12;
    const tVal = document.getElementById("t-val");
    const hGrid = document.getElementById("h-grid");
    const msg = document.getElementById("msg");

    const symbols = ["◇", "◆", "⌖", "◎", "◈", "◇", "⟡", "⌖", "◎", "◆"];
    symbols.sort(() => Math.random() - 0.5);

    symbols.forEach(s => {
        const btn = document.createElement("button");
        btn.className = "hidden-item-btn";
        btn.textContent = s;
        btn.addEventListener("click", () => {
            if (s === "◈") {
                clearInterval(timerInterval);
                playBeep(990, 0.4);
                msg.innerHTML = `<span class="success-text">TARGET DITEMUKAN.</span>`;
                setTimeout(initStage4, 1000);
            } else {
                playBeep(150, 0.2, "sawtooth");
                btn.style.opacity = "0.2";
            }
        });
        hGrid.appendChild(btn);
    });

    const timerInterval = setInterval(() => {
        time--;
        if(tVal) tVal.textContent = time;
        if (time <= 0) {
            clearInterval(timerInterval);
            playBeep(90, 0.8, "sawtooth");
            msg.innerHTML = `<span class="error-text">SYSTEM FAILURE. MENGULANG...</span>`;
            setTimeout(initStage3, 1500);
        }
    }, 1000);
}

/* STAGE 4: FAKE CHOICE */
function initStage4() {
    container.innerHTML = `
        <h2>STAGE 4 — FINAL CHALLENGE</h2>
        <p class="instruction">Pilih jalur yang benar di bawah tekanan:</p>
        <div class="fake-choices">
            <button class="fake-btn-mini" data-valid="false">CONTINUE</button>
            <button class="fake-btn-mini" data-valid="false">CONTINUE</button>
            <button class="fake-btn-mini" data-valid="true">PROCEED_CORE</button>
            <button class="fake-btn-mini" data-valid="false">CONTINUE</button>
        </div>
        <div id="msg"></div>
    `;
    playBeep(400, 0.4);

    const msg = document.getElementById("msg");
    document.querySelectorAll(".fake-btn-mini").forEach(b => {
        b.addEventListener("click", (e) => {
            if (e.target.getAttribute("data-valid") === "true") {
                playBeep(1046, 0.5);
                msg.innerHTML = `<span class="success-text">ACCESS GRANTED</span>`;
                localStorage.setItem("th_stage", "3"); // Lanjut ke petunjuk.html
                setTimeout(() => {
                    container.innerHTML = `
                        <h2>ACCESS GRANTED</h2>
                        <p class="instruction">Semua tahap verifikasi selesai.</p>
                        <button class="horror-btn" id="to-petunjuk" style="margin-top:15px;">LANJUTKAN KE PETUNJUK</button>
                    `;
                    document.getElementById("to-petunjuk").addEventListener("click", () => {
                        window.location.href = "petunjuk.html";
                    });
                }, 1000);
            } else {
                playBeep(100, 0.4, "sawtooth");
                msg.innerHTML = `<span class="error-text">Wrong choice. Jalur salah.</span>`;
            }
        });
    });
}
