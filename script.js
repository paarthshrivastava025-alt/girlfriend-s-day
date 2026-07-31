/* ===========================================
   FOR JOSHITA ❤️
   script.js
=========================================== */

/* -----------------------
   DOM ELEMENTS
----------------------- */
const intro = document.getElementById("intro");
const mainPage = document.getElementById("mainPage");
const beginBtn = document.getElementById("begin");
const timer = document.getElementById("timer");
const typing = document.getElementById("typing");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const nav = document.querySelector("nav");
const hero = document.querySelector(".hero");

/* -----------------------
   BEGIN BUTTON & MUSIC
----------------------- */
const music = new Audio("october.mp3");
music.loop = true;
music.volume = 0.35;

if (beginBtn) {
    beginBtn.addEventListener("click", () => {
        // Play music
        music.play().catch(() => {});

        // Transition intro to main page
        if (intro) intro.style.opacity = "0";

        setTimeout(() => {
            if (intro) intro.style.display = "none";
            if (mainPage) mainPage.style.display = "block";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 900);
    });
}

/* -----------------------
   RELATIONSHIP TIMER
----------------------- */
const startDate = new Date("October 26, 2022 00:00:00");

function updateTimer() {
    if (!timer) return;

    const now = new Date();
    let diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timer.innerHTML = `
        ❤️ ${days} Days <br>
        ${hours} Hours <br>
        ${minutes} Minutes <br>
        ${seconds} Seconds
    `;
}

updateTimer();
setInterval(updateTimer, 1000);

/* -----------------------
   LOVE LETTER (TYPING EFFECT)
----------------------- */
const message = `Dear Joshita,

Happy Girlfriend's Day ❤️

I don't think a website could ever truly show how much you mean to me...

But I still wanted to make something that was ours.

Thank you for every smile,
every late-night conversation,
every laugh,
every little memory.

Since 26 October 2022,
life has been brighter because of you.

No matter how many Octobers pass...

I'd still choose you.

Again.

And again.

Forever.

❤️`;

let index = 0;

function typeLetter() {
    if (!typing) return;

    if (index < message.length) {
        // Safe text appending preserves formatting without parsing HTML
        typing.textContent += message.charAt(index);
        index++;
        setTimeout(typeLetter, 35);
    }
}

const letterElement = document.querySelector(".letter");
if (letterElement) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                typeLetter();
                observer.disconnect();
            }
        });
    });
    observer.observe(letterElement);
}

/* -----------------------
   STAR BACKGROUND
----------------------- */
const canvas = document.getElementById("stars");

if (canvas) {
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();

    let stars = [];
    for (let i = 0; i < 180; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.5,
            s: Math.random() * 0.5 + 0.2
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fill();

            star.y += star.s;

            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animateStars);
    }

    animateStars();
    window.addEventListener("resize", resizeCanvas);
}

/* -----------------------
   FLOATING HEARTS
----------------------- */
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 8 + Math.random() * 6 + "s";
    heart.style.opacity = Math.random();
    heart.style.transform = `scale(${0.5 + Math.random()}) rotate(45deg)`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 14000);
}

setInterval(createHeart, 900);

/* -----------------------
   MOVING NO BUTTON
----------------------- */
if (no) {
    let count = 0;
    no.addEventListener("mouseenter", () => {
        count++;

        // Keep button safely within view bounds even on small screens
        const maxX = Math.max(10, window.innerWidth - 120);
        const maxY = Math.max(10, window.innerHeight - 60);

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        no.style.position = "fixed";
        no.style.left = x + "px";
        no.style.top = y + "px";

        if (count > 8) {
            no.innerHTML = "Nice Try 😤";
        }
    });
}

/* -----------------------
   PHOTO INTERACTION
----------------------- */
document.querySelectorAll(".photo img").forEach((img) => {
    img.addEventListener("click", () => {
        img.classList.toggle("fullscreen");
    });
});

/* -----------------------
   HERO & NAV SCROLL EFFECTS
----------------------- */
window.addEventListener("scroll", () => {
    let value = window.scrollY;

    if (hero) {
        hero.style.transform = `translateY(${value * 0.15}px)`;
        hero.style.opacity = 1 - value / 800;
    }

    if (nav) {
        if (value > 150) {
            nav.style.background = "rgba(10,10,30,.7)";
        } else {
            nav.style.background = "rgba(255,255,255,.05)";
        }
    }
});

/* -----------------------
   PARALLAX GLOW
----------------------- */
document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.body.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
});

/* -----------------------
   HEART CLICK EFFECT
----------------------- */
document.addEventListener("click", (e) => {
    // Avoid spawning sparkles when clicking buttons
    if (e.target.tagName === "BUTTON") return;

    const sparkle = document.createElement("div");
    sparkle.innerHTML = "❤️";
    sparkle.style.position = "fixed";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    sparkle.style.fontSize = "22px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.transition = "1.2s";
    sparkle.style.zIndex = "9999";

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.style.transform = "translateY(-80px) scale(2)";
        sparkle.style.opacity = "0";
    }, 20);

    setTimeout(() => {
        sparkle.remove();
    }, 1200);
});

/* -----------------------
   YES BUTTON & CONFETTI
----------------------- */
if (yes) {
    yes.addEventListener("click", () => {
        launchConfetti();

        setTimeout(() => {
            const ending = document.getElementById("ending");
            if (ending) {
                ending.scrollIntoView({ behavior: "smooth" });
            }
        }, 600);
    });
}

function launchConfetti() {
    for (let i = 0; i < 180; i++) {
        const piece = document.createElement("div");
        piece.style.position = "fixed";
        piece.style.width = "8px";
        piece.style.height = "12px";
        piece.style.left = Math.random() * window.innerWidth + "px";
        piece.style.top = "-20px";
        piece.style.background = `hsl(${Math.random() * 360},90%,65%)`;
        piece.style.pointerEvents = "none";
        piece.style.zIndex = "9999";
        piece.style.borderRadius = "3px";
        piece.style.transition = "4s linear";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`;
            piece.style.opacity = "0";
        }, 20);

        setTimeout(() => {
            piece.remove();
        }, 4200);
    }
}

/* -----------------------
   SECRET EASTER EGG
----------------------- */
let secretClicks = 0;
document.body.addEventListener("dblclick", () => {
    secretClicks++;

    if (secretClicks === 5) {
        alert("❤️\n\nP.S.\nI'd still choose you in every lifetime.\n\nLove you, Joshita.");
        secretClicks = 0;
    }
});

/* -----------------------
   CURSOR SPARKLES
----------------------- */
document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.92) { // Slightly lowered frequency for smoother performance
        const dot = document.createElement("div");
        dot.style.position = "fixed";
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
        dot.style.width = "5px";
        dot.style.height = "5px";
        dot.style.borderRadius = "50%";
        dot.style.background = "#ffffff";
        dot.style.pointerEvents = "none";
        dot.style.boxShadow = "0 0 10px white";
        dot.style.transition = ".8s";
        dot.style.zIndex = "999";

        document.body.appendChild(dot);

        setTimeout(() => {
            dot.style.opacity = "0";
            dot.style.transform = "scale(3)";
        }, 20);

        setTimeout(() => {
            dot.remove();
        }, 900);
    }
});

/* -----------------------
   CONSOLE MESSAGE
----------------------- */
console.log(
`❤️
Happy Girlfriend's Day

Joshita,
Thank you for making life beautiful.
Forever yours.
❤️`
);
