document.addEventListener("DOMContentLoaded", () => {
    const scareImg = document.getElementById("scare-img");
    const scareAudio = document.getElementById("scare-audio");
    const finalText = document.getElementById("final-text");
    const body = document.body;

    // Jeda acak antara 0.5 - 2 detik sebelum jumpscare muncul
    const randomDelay = Math.random() * 1500 + 500;

    setTimeout(() => {
        // Munculkan jumpscare
        if (scareImg) scareImg.style.display = "block";
        body.classList.add("shake-effect");

        // Putar audio
        if (scareAudio) {
            scareAudio.play().catch(() => {
                // Fallback jika browser memblokir autoplay audio tanpa interaksi murni
                console.log("Audio autoplay blocked by browser policy.");
            });
        }

        // Durasi jumpscare singkat (misal 1.2 detik), lalu hilangkan dan tampilkan ending text
        setTimeout(() => {
            if (scareImg) scareImg.style.display = "none";
            body.classList.remove("shake-effect");
            body.style.background = "#050505";
            if (finalText) finalText.style.display = "block";
        }, 1200);

    }, randomDelay);
});
