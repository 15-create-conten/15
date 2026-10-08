document.addEventListener("DOMContentLoaded", () => {
    const stage = localStorage.getItem("th_stage");
    if (!stage || parseInt(stage) < 4) {
        alert("ACCESS DENIED");
        window.location.href = "index.html";
        return;
    }

    const codeInput = document.getElementById("code-input");
    const submitBtn = document.getElementById("submit-code");
    const msg = document.getElementById("msg");
    const showHint = document.getElementById("show-hint");
    const hintText = document.getElementById("hint-text");
    const container = document.getElementById("puzzle-box");

    let hintStage = 0;
    const hints = [
        "Hint 1: Pesan sebelumnya menyimpan sesuatu yang lebih pendek.",
        "Hint 2: Tidak semua huruf diperlukan.",
        "Hint 3: Ambil bagian penting dari SilentVisual (Huruf kapital awal tiap suku kata: StVl)."
    ];

    showHint.addEventListener("click", () => {
        if (hintStage < hints.length) {
            hintText.style.display = "block";
            hintText.textContent = hints[hintStage];
            hintStage++;
        } else {
            hintText.textContent = "Hint habis. Cari huruf besar pertama: S - t - V - l";
        }
    });

    const verifyCode = () => {
        const val = codeInput.value.trim();
        if (val === "StVl") {
            msg.innerHTML = `<span style="color:#00ff66">ACCESS GRANTED</span>`;
            localStorage.setItem("th_stage", "5");
            setTimeout(() => {
                window.location.href = "end.html";
            }, 1000);
        } else {
            msg.innerHTML = `<span style="color:#ff3333">ACCESS DENIED</span>`;
            container.classList.add("shake");
            setTimeout(() => container.classList.remove("shake"), 300);
            codeInput.value = "";
        }
    };

    submitBtn.addEventListener("click", verifyCode);
    codeInput.addEventListener("keypress", (e) => { if (e.key === "Enter") verifyCode(); });
});
