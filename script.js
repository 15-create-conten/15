document.addEventListener("DOMContentLoaded", () => {
    // Set initial progress localStorage
    localStorage.setItem("th_stage", "1");

    const fakeBtns = document.querySelectorAll(".fake-btn");
    const statusMsg = document.getElementById("status-message");
    const secretTrigger = document.getElementById("secret-trigger");

    const msgs = [
        "Wrong choice.",
        "Akses ditolak oleh sistem lokal.",
        "Tidak ada apa-apa di sini.",
        "Perhatikan sekeliling...",
        "Error 404: Tujuan tidak ditemukan."
    ];

    fakeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Efek acak tombol palsu
            const actionType = Math.floor(Math.random() * 3);
            if (actionType === 0) {
                statusMsg.textContent = msgs[Math.floor(Math.random() * msgs.length)];
            } else if (actionType === 1) {
                btn.style.transform = `translate(${Math.random() * 30 - 15}px, ${Math.random() * 20 - 10}px)`;
                statusMsg.textContent = "Wrong choice.";
            } else {
                statusMsg.textContent = "Target salah.";
                document.body.style.filter = "invert(0.1)";
                setTimeout(() => document.body.style.filter = "none", 200);
            }
        });
    });

    // Gambar rahasia yang benar -> Menuju klik.html
    secretTrigger.addEventListener("click", () => {
        statusMsg.style.color = "#00ff66";
        statusMsg.textContent = "SIGNAL_ACQUIRED. LOADING PROTOCOL...";
        document.body.style.transition = "background 0.5s";
        document.body.style.background = "#fff";
        
        // Simpan progress sah ke stage 2
        localStorage.setItem("th_stage", "2");

        setTimeout(() => {
            window.location.href = "klik.html";
        }, 800);
    });
});
