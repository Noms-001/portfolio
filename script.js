// ============================================
// Portfolio JavaScript - Modular & Clean
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    (function () {
        const projects = [
            {
                title: "GLPI 11 API — Interface modernisée",
                desc: "Refonte de l'UI de GLPI 11 avec Vue.js pour un flux de tickets plus rapide et plus clair avec une couche API REST.",
                tags: ["Vue.js", "Javascript", "SQLite", "REST API"],
                glyph: "G",
                image: 'logo.png',
                path: "https://github.com/Noms-001/glpi-vue.git"
            },
            {
                title: "Dolibarr 23 API",
                desc: "Couche API REST pour Dolibarr ERP/CRM, pensée pour connecter des outils tiers sans friction.",
                tags: ["Vue.js", "Typescript", "SQLite", "REST API"],
                glyph: "D", 
                image: 'logo.png',
                path: "https://github.com/Noms-001/dolibarr-vue.git"
            },
            {
                title: "GLPI 11 Backend",
                desc: "Développement d'une API backend pour GLPI 11 avec architecture MVC, gestion des utilisateurs, authentification et intégration avec la base de données.",
                tags: ["Java", "Spring Boot (MVC)", "SQLite"],
                glyph: "S",
                image: 'logo.png',
                path: "https://github.com/Noms-001/glpi-back"
            },
            {
                title: "Dolibarr 23 Backend",
                desc: "Développement d'un backend REST en architecture MVC pour Dolibarr 23 avec gestion des données, logique métier et accès à la base de données.",
                tags: ["Java", "Spring Boot (MVC)", "SQLite"],
                glyph: "A",
                image: 'logo.png',
                path: "https://github.com/Noms-001/dolibarr-back"
            },
            {
                title: "Système de Gestion de Recrutement",
                desc: "Conception et développement d'une application de gestion des recrutements intégrant la publication des offres, le suivi des candidatures, la gestion des dossiers des candidats et des entretiens.",
                tags: ["Java", "Spring Boot (MVC)", "SQLite"],
                glyph: "R",
                image: 'logo.png',
                path: "https://github.com/Noms-001/Gestion_Recrutement"
            },
            {
                title: "Ce portfolio",
                desc: "Identité visuelle sur mesure, animations construites à la main, zéro dépendance superflue.",
                tags: ["HTML5", "CSS3", "JavaScript"],
                glyph: "P",
                image: 'logo.png',
                path: "~/projects/portfolio"
            }
        ];
        const logData = [
            { hash: "f3a9c1", year: "2026", title: "Dolibarr & GLPI 11", desc: "Connexion d'APIs multiples pour des outils métier." },
            {
                hash: "9be201",
                year: "2025",
                title: "Système de Gestion d'Entreprise",
                desc: "Application de gestion d'entreprise intégrant le recrutement, la gestion des dossiers des employés et le suivi des présences."
            },
            { hash: "6c17aa", year: "2024", title: "Spring Boot en profondeur", desc: "Montée en compétence backend, architecture propre." },
            { hash: "2d804f", year: "2023", title: "Licence Informatique", desc: "Début du cursus universitaire." },
            { hash: "18a3e2", year: "2023", title: "Baccalauréat série D", desc: "Obtention du diplôme, série scientifique." },
            { hash: "0041fb", year: "2022", title: "Baccalauréat série A2", desc: "Premier diplôme, orientation littéraire." }
        ];
        const stats = [{ n: 20, l: "Projets réalisés", plus: true }, { n: 8, l: "Technologies maîtrisées", plus: false }, { n: 3, l: "Années de code", plus: true }, { n: 10000, l: "Lignes de code", plus: true }];

        /* nav + scroll */
        const navbar = document.getElementById('navbar'), navToggle = document.getElementById('navToggle'), navMenu = document.getElementById('navMenu');
        const progressBar = document.getElementById('scrollProgress'), backBtn = document.getElementById('backToTop');
        function onScroll() {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
            const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = pct + '%';
            backBtn.classList.toggle('visible', window.scrollY > 500);
            updateActiveNav();
            animateStats();
        }
        window.addEventListener('scroll', onScroll);
        navToggle.addEventListener('click', () => { navToggle.classList.toggle('active'); navMenu.classList.toggle('active'); });
        document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => { navToggle.classList.remove('active'); navMenu.classList.remove('active'); }));
        function updateActiveNav() {
            const sections = document.querySelectorAll('section[id]');
            const sy = window.scrollY + 140;
            sections.forEach(sec => {
                const top = sec.offsetTop, h = sec.offsetHeight, id = sec.getAttribute('id');
                if (sy >= top && sy < top + h) {
                    document.querySelectorAll('.nav-link').forEach(l => { l.classList.remove('active'); if (l.getAttribute('href') === '#' + id) l.classList.add('active'); });
                }
            });
        }
        backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' });
        }));

        /* reveal on scroll */
        const revealEls = document.querySelectorAll('.reveal-el');
        const revealObserver = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }) }, { threshold: 0.12 });
        revealEls.forEach(el => revealObserver.observe(el));

        /* hero terminal typing */
        const heroTyped = document.getElementById('heroTyped');
        const heroLine = "Développeur Full Stack basé à Antananarivo. Je transforme des besoins métier en applications Java / Spring Boot et Vue.js, robustes du premier commit à la mise en production.";
        let ci = 0;
        function typeHero() {
            if (ci <= heroLine.length) {
                heroTyped.textContent = heroLine.substring(0, ci);
                ci++;
                setTimeout(typeHero, 14);
            }
        }
        setTimeout(typeHero, 650);

        /* skill bars */
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll('.bar i').forEach(bar => { bar.style.width = bar.dataset.w + '%'; });
                    skillObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });
        document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

        /* build log list */
        const logList = document.getElementById('logList');
        logList.innerHTML = logData.map(t => `
        <div class="log-item">
            <div class="log-row"><span class="log-hash">${t.hash}</span><span class="log-year">${t.year}</span><span class="log-title">${t.title}</span></div>
            <div class="log-desc">${t.desc}</div>
        </div>`).join('');
        const logObserver = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }) }, { threshold: 0.4 });
        document.querySelectorAll('.log-item').forEach(it => logObserver.observe(it));

        /* stats */
        document.getElementById('statsGrid').innerHTML = stats.map(s => `
        <div class="stat-item"><span class="stat-number" data-target="${s.n}">0</span><span class="stat-label">${s.l}</span></div>`).join('');
        let statsAnimated = false;
        function animateStats() {
            if (statsAnimated) return;
            const sec = document.querySelector('.stats-section');
            if (!sec) return;
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                statsAnimated = true;
                document.querySelectorAll('.stat-number').forEach((s, i) => {
                    const target = parseInt(s.dataset.target);
                    const dur = 1600, start = performance.now();
                    function upd(ts) {
                        const p = Math.min((ts - start) / dur, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        s.textContent = Math.floor(target * eased).toLocaleString('fr-FR') + (stats[i].plus && p >= 1 ? '+' : '');
                        if (p < 1) requestAnimationFrame(upd);
                    }
                    requestAnimationFrame(upd);
                });
            }
        }

        /* contact form */
        document.getElementById('contactForm').addEventListener('submit', e => {
            e.preventDefault();
            const fields = ['name', 'email', 'subject', 'message'];
            let ok = true;
            fields.forEach(id => { document.getElementById(id).style.borderColor = ''; });
            if (document.getElementById('name').value.trim().length < 2) { document.getElementById('name').style.borderColor = '#ef4444'; ok = false; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value)) { document.getElementById('email').style.borderColor = '#ef4444'; ok = false; }
            if (document.getElementById('subject').value.trim().length < 3) { document.getElementById('subject').style.borderColor = '#ef4444'; ok = false; }
            if (document.getElementById('message').value.trim().length < 10) { document.getElementById('message').style.borderColor = '#ef4444'; ok = false; }
            if (ok) { alert('Message envoyé avec succès !'); e.target.reset(); }
        });

        /* ============ COVERFLOW CAROUSEL ============ */
        const track = document.getElementById('carouselTrack');
        track.innerHTML = projects.map((p, i) => `
        <div class="proj-card" data-i="${i}">
            <div class="proj-win-bar"><span class="lights"><span></span><span></span><span></span></span><span class="path">${p.path}</span></div>
            <div class="proj-card-image" style="background-image:url('${p.image}')" alt="${p.glyph}"></div>
            <div class="proj-card-body">
                <h3>${p.title}</h3><p>${p.desc}</p>
                <div class="project-tags-mini">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
                <div class="project-card-actions">
                    <a href="#"><i class="bi bi-github"></i> Code</a>
                    <a href="#" class="primary"><i class="bi bi-play-circle"></i> Démo</a>
                </div>
            </div>
        </div>`).join('');
        const cards = Array.from(track.children);
        const dashesWrap = document.getElementById('carouselDashes');
        dashesWrap.innerHTML = projects.map((_, i) => `<span data-i="${i}"></span>`).join('');
        const dashes = Array.from(dashesWrap.children);
        const indexLabel = document.getElementById('carouselIndex');
        const stage = document.getElementById('carouselStage');
        let active = 0;
        const N = cards.length;

        function layout() {
            const stageW = stage.offsetWidth;
            const isMobile = stageW < 640;
            cards.forEach((card, i) => {
                let offset = i - active;
                if (offset > N / 2) offset -= N;
                if (offset < -N / 2) offset += N;
                const abs = Math.abs(offset);
                const xUnit = isMobile ? stageW * 0.62 : 280;
                const x = offset * xUnit;
                const scale = 1 - Math.min(abs * 0.14, 0.4);
                const rotY = offset * -22;
                const z = -abs * 140;
                const opacity = abs > 2 ? 0 : 1 - abs * 0.32;
                const blur = abs > 0 ? Math.min(abs * 1.3, 3) : 0;
                card.style.transform = `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.filter = `blur(${blur}px)`;
                card.style.zIndex = 100 - abs;
                card.style.pointerEvents = offset === 0 ? 'auto' : 'none';
            });
            dashes.forEach((d, i) => d.classList.toggle('active', i === active));
            indexLabel.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
        }
        function goTo(i) { active = ((i % N) + N) % N; layout(); }
        document.getElementById('prevBtn').addEventListener('click', () => goTo(active - 1));
        document.getElementById('nextBtn').addEventListener('click', () => goTo(active + 1));
        dashes.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.i))));
        cards.forEach(c => c.addEventListener('click', () => { const i = parseInt(c.dataset.i); if (i !== active) goTo(i); }));
        window.addEventListener('resize', layout);

        /* autoplay */
        let autoplay = setInterval(() => goTo(active + 1), 4500);
        stage.addEventListener('mouseenter', () => clearInterval(autoplay));
        stage.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(active + 1), 4500); });

        /* drag / swipe */
        let dragging = false, startX = 0, delta = 0;
        function dragStart(x) { dragging = true; startX = x; clearInterval(autoplay); }
        function dragMove(x) { if (!dragging) return; delta = x - startX; }
        function dragEnd() {
            if (!dragging) return;
            dragging = false;
            if (delta > 60) goTo(active - 1);
            else if (delta < -60) goTo(active + 1);
            delta = 0;
            autoplay = setInterval(() => goTo(active + 1), 4500);
        }
        stage.addEventListener('pointerdown', e => dragStart(e.clientX));
        stage.addEventListener('pointermove', e => dragMove(e.clientX));
        window.addEventListener('pointerup', dragEnd);
        stage.addEventListener('touchstart', e => dragStart(e.touches[0].clientX), { passive: true });
        stage.addEventListener('touchmove', e => dragMove(e.touches[0].clientX), { passive: true });
        stage.addEventListener('touchend', dragEnd);

        layout();
        onScroll();
    })();
});