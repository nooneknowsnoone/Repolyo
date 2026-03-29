// ============================================
// @mythtiannnj Portfolio - Frontend JavaScript
// SOCIAL ICONS - HIGHLY VISIBLE
// ============================================

// API Endpoints
const APIS = {
    quote: 'https://kryptonite-api-library.vercel.app/api/quote',
    ip: 'https://api.ipify.org?format=json'
};

// API Functions
window.API = {
    async getQuote() {
        try {
            const response = await fetch(APIS.quote);
            const data = await response.json();
            return { quote: data.quote, author: data.author };
        } catch (error) {
            return { quote: 'Get used to a rough life, for luxury does not last forever.', author: 'Umar ibn Al-Khattab (R.A)' };
        }
    },
    
    async getIP() {
        try {
            const response = await fetch(APIS.ip);
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return 'Unavailable';
        }
    }
};

// Theme Management
const themeToggle = document.getElementById('themeToggle');

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark');
    if (themeToggle) {
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
initTheme();

// Typing Animation
const typedTextEl = document.getElementById('typedText');
const roles = ['Vibe Coder', 'Guitarist', 'Developer', 'Creative Thinker', 'Music Lover', 'MLBB Player'];
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeEffect() {
    if (!typedTextEl) return;
    const current = roles[roleIdx];
    
    if (isDeleting) {
        typedTextEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typedTextEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }
    
    if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
setTimeout(typeEffect, 500);

// Current Time
const dateTimeEl = document.getElementById('currentDateTime');
function updateDateTime() {
    if (!dateTimeEl) return;
    const now = new Date();
    dateTimeEl.textContent = now.toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}
updateDateTime();
setInterval(updateDateTime, 1000);

// IP Address
const ipEl = document.getElementById('ipAddress');
async function fetchAndDisplayIP() {
    const ip = await window.API.getIP();
    if (ipEl) ipEl.textContent = ip;
}
fetchAndDisplayIP();

// Battery
const batteryEl = document.getElementById('batteryHealth');
function getBattery() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(bat => {
            const level = Math.round(bat.level * 100);
            if (batteryEl) batteryEl.textContent = `${level}% ${bat.charging ? '⚡' : '🔋'}`;
        }).catch(() => { if (batteryEl) batteryEl.textContent = 'N/A'; });
    } else { 
        if (batteryEl) batteryEl.textContent = 'N/A'; 
    }
}
getBattery();

// Greeting
const greetingEl = document.getElementById('greetingMsg');
const popupGreeting = document.getElementById('popupGreetingText');
function updateGreeting() {
    const hour = new Date().getHours();
    let g = '', e = '';
    if (hour >= 5 && hour < 12) { g = 'Good Morning'; e = '🌅'; }
    else if (hour >= 12 && hour < 17) { g = 'Good Afternoon'; e = '☀️'; }
    else if (hour >= 17 && hour < 21) { g = 'Good Evening'; e = '🌆'; }
    else { g = 'Good Night'; e = '🌙'; }
    if (greetingEl) greetingEl.innerHTML = `${g}, ${e}`;
    if (popupGreeting) popupGreeting.innerHTML = `${g}! Welcome to @mythtiannnj's portfolio ${e}`;
}
updateGreeting();
setInterval(updateGreeting, 60000);

// Device Info
const deviceEl = document.getElementById('deviceInfo');
function getDeviceInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown', os = 'Unknown';
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone')) os = 'iOS';
    if (deviceEl) deviceEl.innerHTML = `${browser} on ${os}`;
}
getDeviceInfo();

// Skill Bars
function animateSkills() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        if (width) fill.style.width = width + '%';
    });
}

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if (entry.isIntersecting) { 
            animateSkills(); 
            skillObserver.disconnect(); 
        } 
    });
}, { threshold: 0.3 });

const skillsContainer = document.querySelector('.skills-container');
if (skillsContainer) skillObserver.observe(skillsContainer);

// Quote API
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const refreshBtn = document.getElementById('refreshQuoteBtn');
let quoteInterval;

async function fetchAndDisplayQuote() {
    const { quote, author } = await window.API.getQuote();
    if (quoteText && quoteAuthor) {
        quoteText.style.opacity = '0';
        setTimeout(() => {
            quoteText.textContent = `“${quote}”`;
            quoteAuthor.textContent = `— ${author}`;
            quoteText.style.opacity = '1';
        }, 150);
    }
}

function startQuoteRotation() {
    fetchAndDisplayQuote();
    if (quoteInterval) clearInterval(quoteInterval);
    quoteInterval = setInterval(fetchAndDisplayQuote, 15000);
}

if (refreshBtn) {
    refreshBtn.addEventListener('click', () => { 
        fetchAndDisplayQuote(); 
        clearInterval(quoteInterval); 
        startQuoteRotation(); 
    });
}
startQuoteRotation();

// ============================================
// SOCIAL MEDIA ICONS - HIGHLY VISIBLE
// Large, clear, with brand colors on hover
// ============================================
const socialGrid = document.getElementById('socialGrid');
if (socialGrid) {
    socialGrid.innerHTML = `
        <a href="https://github.com/mythtiannnj" class="social-link github" target="_blank" title="GitHub">
            <i class="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/mythtiannnj" class="social-link linkedin" target="_blank" title="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://instagram.com/mythtiannnj" class="social-link instagram" target="_blank" title="Instagram">
            <i class="fab fa-instagram"></i>
        </a>
        <a href="https://dribbble.com/mythtiannnj" class="social-link dribbble" target="_blank" title="Dribbble">
            <i class="fab fa-dribbble"></i>
        </a>
        <a href="https://youtube.com/@mythtiannnj" class="social-link youtube" target="_blank" title="YouTube">
            <i class="fab fa-youtube"></i>
        </a>
        <a href="https://facebook.com/mythtiannnj" class="social-link facebook" target="_blank" title="Facebook">
            <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitch.tv/mythtiannnj" class="social-link twitch" target="_blank" title="Twitch">
            <i class="fab fa-twitch"></i>
        </a>
        <a href="https://tiktok.com/@mythtiannnj" class="social-link tiktok" target="_blank" title="TikTok">
            <i class="fab fa-tiktok"></i>
        </a>
        <a href="https://twitter.com/mythtiannnj" class="social-link twitter" target="_blank" title="Twitter">
            <i class="fab fa-twitter"></i>
        </a>
    `;
}

// Share Profile
const shareBtn = document.getElementById('shareProfileBtn');
const toast = document.getElementById('toast');

function showToastMessage(msg) {
    if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showToastMessage('✅ @mythtiannnj profile link copied!');
        } catch { 
            showToastMessage('⚠️ Press Ctrl+C to copy'); 
        }
    });
}

// Particles
const particlesContainer = document.getElementById('particlesContainer');
function createParticles() {
    if (!particlesContainer) return;
    particlesContainer.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 4 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.opacity = Math.random() * 0.4 + 0.1;
        p.style.animation = `floatParticle ${Math.random() * 15 + 10}s linear infinite`;
        particlesContainer.appendChild(p);
    }
}
createParticles();

// Scroll to Top
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => { 
    if (scrollBtn) scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none'; 
});
if (scrollBtn) { 
    scrollBtn.style.display = 'none'; 
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); 
}

// Welcome Popup
const popup = document.getElementById('welcomePopup');
const closePopupBtn = document.getElementById('closePopupBtn');

function closeWelcomePopup() {
    if (popup) popup.classList.add('hidden-popup');
}

function showWelcomePopup() {
    const popupShown = sessionStorage.getItem('popup_shown_mythtiannnj');
    if (!popupShown && popup) {
        popup.classList.remove('hidden-popup');
        sessionStorage.setItem('popup_shown_mythtiannnj', 'true');
    }
}

if (closePopupBtn) {
    closePopupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeWelcomePopup();
    });
}
if (popup) {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closeWelcomePopup();
    });
}
setTimeout(showWelcomePopup, 300);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') toggleTheme();
    if (e.altKey && e.key === 'q') fetchAndDisplayQuote();
    if (e.key === 'ArrowUp') window.scrollTo({ top: 0, behavior: 'smooth' });
});

console.log('✨ Portfolio Loaded | Social Icons HIGHLY VISIBLE | @mythtiannnj');
