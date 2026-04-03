// ========================================
// VNX DIGITAL - Main JavaScript
// ========================================

// ---- Custom Cursor ----
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor effects on hover
document.querySelectorAll('a, button, .faq-q, .video-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '14px';
        cursorDot.style.height = '14px';
        cursorDot.style.background = '#22d3ee';
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.borderColor = 'rgba(34,211,238,0.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorDot.style.background = '#6c63ff';
        cursorOutline.style.width = '36px';
        cursorOutline.style.height = '36px';
        cursorOutline.style.borderColor = 'rgba(108,99,255,0.5)';
    });
});

// ---- Navbar Scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ---- Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}

// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ---- FAQ Toggle ----
function toggleFaq(el) {
    const answer = el.nextElementSibling;
    const allAnswers = document.querySelectorAll('.faq-a');
    const allQuestions = document.querySelectorAll('.faq-q');

    // Close all others
    allAnswers.forEach(a => {
        if (a !== answer) {
            a.classList.remove('open');
        }
    });
    allQuestions.forEach(q => {
        if (q !== el) {
            q.classList.remove('open');
        }
    });

    // Toggle current
    el.classList.toggle('open');
    answer.classList.toggle('open');
}

// ---- Contact Form ----
function submitForm() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const service = document.getElementById('service')?.value;

    if (!name || !email || !message || !service) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }

    // Show success
    const successEl = document.getElementById('formSuccess');
    if (successEl) {
        successEl.style.display = 'flex';
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        // Clear form
        ['name', 'email', 'phone', 'company', 'service', 'budget', 'message'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        setTimeout(() => { successEl.style.display = 'none'; }, 6000);
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(msg, type) {
    const n = document.createElement('div');
    n.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: ${type === 'error' ? 'rgba(239,68,68,0.9)' : 'rgba(16,185,129,0.9)'};
    color: white; padding: 1rem 2rem; border-radius: 50px;
    font-family: 'Inter', sans-serif; font-weight: 500;
    z-index: 99999; box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
  `;
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

// ---- Smooth page transitions ----
document.querySelectorAll('a[href]').forEach(link => {
    if (!link.href.startsWith('http') || link.href.includes(window.location.hostname)) {
        if (!link.href.includes('#') && !link.href.includes('mailto:') && !link.href.includes('tel:') && !link.href.includes('wa.me')) {
            link.addEventListener('click', (e) => {
                if (link.href !== window.location.href) {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => { window.location.href = link.href; }, 300);
                }
            });
        }
    }
});
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';
window.addEventListener('load', () => {
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});

// ---- Counter Animation ----
function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }, 20);
}

const statNums = document.querySelectorAll('.stat-num[data-target]');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target, parseInt(entry.target.dataset.target));
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// ---- Add slideUp keyframe ----
const style = document.createElement('style');
style.textContent = `@keyframes slideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }`;
document.head.appendChild(style);