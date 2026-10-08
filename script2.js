document.addEventListener("DOMContentLoaded", () => {
    const stage = localStorage.getItem("th_stage");
    if (!stage || parseInt(stage) < 3) {
        alert("ACCESS DENIED");
        window.location.href = "index.html";
        return;
    }

    const hintBtn = document.getElementById("hint-btn");
    const verifyBtn = document.getElementById("verify-btn");
    const hintDisplay = document.getElementById("hint-display");
    const rawText = document.getElementById("raw-text");
    
    let hintCount = 0;

    hintBtn.addEventListener("click", () => {
        hintCount++;
        if (hintCount === 1) {
            hintDisplay.textContent = "“Tidak semua karakter memiliki arti.”";
        } else if (hintCount === 2) {
            hintDisplay.textContent = "“Cari sesuatu yang masih bisa dibaca di antara kekacauan.”";
            hintBtn.style.display = "none";
            // Buka tombol lanjut setelah paham pesan
            verifyBtn.style.display = "inline-block";
            rawText.style.color = "#00ff66";
            rawText.textContent = "MESSAGE DECRYPTED: SilentVisual";
            localStorage.setItem("th_stage", "4");
        }
    });

    verifyBtn.addEventListener("click", () => {
        window.location.href = "puzzle.html";
    });
});
