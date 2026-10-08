document.addEventListener("DOMContentLoaded", () => {
    const stage = localStorage.getItem("th_stage");
    if (!stage || parseInt(stage) < 5) {
        alert("ACCESS DENIED");
        window.location.href = "index.html";
        return;
    }

    const storyLine = document.getElementById("story-line");
    const doorTrigger = document.getElementById("door-trigger");

    setTimeout(() => {
        storyLine.style.opacity = 0;
        setTimeout(() => {
            storyLine.textContent = "There is only one thing left.";
            storyLine.style.opacity = 1;
        }, 1000);
    }, 4000);

    setTimeout(() => {
        storyLine.style.opacity = 0;
        setTimeout(() => {
            storyLine.textContent = "OPEN THE DOOR";
            storyLine.style.color = "#ff3333";
            storyLine.style.opacity = 1;
        }, 1000);
    }, 9000);

    doorTrigger.addEventListener("mouseover", () => {
        doorTrigger.style.transform = "scale(1.02)";
        document.body.style.background = "#050000";
    });

    doorTrigger.addEventListener("mouseout", () => {
        doorTrigger.style.transform = "scale(1)";
        document.body.style.background = "#020202";
    });

    doorTrigger.addEventListener("click", () => {
        // Transisi cepat menuju Jumpscare
        document.body.style.transition = "background 0.2s";
        document.body.style.background = "#000";
        setTimeout(() => {
            window.location.href = "jumpscare.html";
        }, 400);
    });
});
