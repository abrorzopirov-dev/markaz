// ===== AOS init =====
AOS.init({
    duration: 1200,
    once: true
});

// ===== Typed.js =====
var typed = new Typed(".typing", {
    strings: ["biz bilan qur!", "ta’lim bilan yuksaltir!", "orzu qil va amalga oshir!"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
});

// ===== Header scroll effect =====
window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled"); 
    } else {
        header.classList.remove("scrolled"); 
    }
});

// ===== Burger menu toggle =====
const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("toggle");
});


navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");  
        burger.classList.remove("toggle"); 
    });
});

// ===== Dark/Light Mode toggle =====
const toggleBtn = document.getElementById("modeToggle");
const modeIcon = document.getElementById("modeIcon");

// Dark Mode default
document.body.classList.add("dark");
document.getElementById("tsparticles").style.opacity = 0.5;

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        modeIcon.classList.replace("fa-moon", "fa-sun");
        document.getElementById("tsparticles").style.opacity = 0.5;
    } else {
        modeIcon.classList.replace("fa-sun", "fa-moon");
        document.getElementById("tsparticles").style.opacity = 1;
    }
});

// ===== tsParticles =====
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: { color: "transparent" },
    particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.7, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 2, direction: "none", outModes: { default: "out" } },
        links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" }
        },
        modes: { repulse: { distance: 100 }, push: { quantity: 4 } }
    },
    detectRetina: true
});

// ===== Shooting stars =====
function createShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = "-100px";
    document.body.appendChild(star);
    let duration = Math.random() * 1 + 0.5;
    star.style.animation = `shoot ${duration}s linear forwards`;
    setTimeout(() => star.remove(), duration * 1000);
}
setInterval(createShootingStar, 2000);

// ===== Hero parallax mouse effect =====
document.addEventListener("mousemove", e => {
    const hero = document.querySelector(".hero");
    hero.style.backgroundPositionX = (e.clientX / window.innerWidth) * 50 + "%";
    hero.style.backgroundPositionY = (e.clientY / window.innerHeight) * 50 + "%";
});
// ===== Telegram Form Send  =====
const TOKEN = "8024277691:AAE0HbfzR_FElpkBo6Jw3Gspp-j1hAJ_0-k"; 
const CHAT_ID = "1049817031";

function escapeHtml(str) {
    if (!str) return "";
    return str.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;");
}

async function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: "HTML"
        })
    });
    return res.json();
}

function showSuccessPopup() {
    const el = document.getElementById("successMessage");
    if (!el) return;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 4000);
}

document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseEl = document.getElementById("response");

    if (!name || !phone) {
        responseEl.textContent = "Iltimos, ism va telefonni toʻldiring.";
        responseEl.className = "error";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "";
        return;
    }

    const text = `📩 <b>Yangi murojaat</b>:\n\n👤 Ism: ${escapeHtml(name)}\n📞 Raqam: ${escapeHtml(phone)}\n💬 Xabar: ${escapeHtml(message)}`;

    try {
        const data = await sendToTelegram(text);
        if (data && data.ok) {
            // UI: response va popup
            responseEl.className = "success";
            showSuccessPopup();
            this.reset();
        } else {
            responseEl.textContent = "❌ Xatolik yuz berdi. Iltimos qayta urinib ko'ring.";
            responseEl.className = "error";
            console.error("Telegram API javobi:", data);
        }
    } catch (err) {
        responseEl.textContent = "⚠️ Internet xatosi yoki server javob bermadi.";
        responseEl.className = "error";
        console.error(err);
    } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "";
    }
});

// ===== Language translations =====
const translations = {
    uz: {
        home: "Bosh sahifa",
        about: "Biz haqimizda",
        courses: "Kurslar",
        teachers: "O‘qituvchilar",
        contact: "Aloqa"
    },
    ru: {
        home: "Главная",
        about: "О нас",
        courses: "Курсы",
        teachers: "Преподаватели",
        contact: "Контакты"
    },
    en: {
        home: "Home",
        about: "About",
        courses: "Courses",
        teachers: "Teachers",
        contact: "Contact"
    }
};

const langSelect = document.getElementById("langSelect");
langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[lang][key];
    });
});

// ===== Dark/Light toggle =====
const toggleBt = document.getElementById("modeToggle");
const modeIco = document.getElementById("modeIcon");
document.body.classList.add("dark"); // default

toggleBt.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        modeIco.classList.replace("fa-moon", "fa-sun");
    } else {
        modeIco.classList.replace("fa-sun", "fa-moon");
    }
});
