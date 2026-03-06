// Tunggu sampai seluruh halaman selesai dimuat
window.addEventListener('load', function() {
    console.log('Halaman selesai dimuat');
    
    // Theme Toggle
    initThemeToggle();
    
    // Particles
    createParticles();
    
    // Stat counter animation
    animateStats();
    
    // Game buttons
    initGameButtons();
    
    // Modal click outside
    initModalClose();
});

// Inisialisasi theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.error('Theme toggle tidak ditemukan');
        return;
    }
    
    const themeSpans = themeToggle.querySelectorAll('span');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateActiveTheme(savedTheme);

    function updateActiveTheme(theme) {
        themeSpans.forEach(span => {
            if (span.getAttribute('data-theme') === theme) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });
    }

    themeSpans.forEach(span => {
        span.addEventListener('click', function(e) {
            const theme = this.getAttribute('data-theme');
            body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateActiveTheme(theme);
        });
    });
}

// Inisialisasi tombol game
function initGameButtons() {
    const gameButtons = document.querySelectorAll('.game-btn');
    
    if (gameButtons.length === 0) {
        console.error('Tidak ada tombol game ditemukan');
        return;
    }
    
    console.log('Ditemukan', gameButtons.length, 'tombol game');
    
    gameButtons.forEach(function(button, index) {
        // Hapus semua atribut onclick
        button.removeAttribute('onclick');
        
        // Tambah event listener
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Tombol game diklik:', index);
            
            // Dapatkan gameId dari parent card
            const gameCard = this.closest('.game-card');
            if (!gameCard) {
                console.error('Game card tidak ditemukan');
                return;
            }
            
            const gameTitle = gameCard.querySelector('h3')?.innerText || '';
            const gameEmoji = gameCard.querySelector('.game-emoji')?.innerText || '';
            
            console.log('Game title:', gameTitle);
            console.log('Game emoji:', gameEmoji);
            
            let gameId = '';
            
            if (gameTitle.includes('Tebak Angka') || gameEmoji.includes('🔢')) {
                gameId = 'tebakAngka';
            } else if (gameTitle.includes('Gunting') || gameEmoji.includes('✂️')) {
                gameId = 'suit';
            } else if (gameTitle.includes('Dadu') || gameEmoji.includes('🎲')) {
                gameId = 'dadu';
            } else if (gameTitle.includes('Kuis') || gameEmoji.includes('❓')) {
                gameId = 'quiz';
            } else if (gameTitle.includes('Tebak Warna') || gameEmoji.includes('🎨')) {
                gameId = 'warna';
            } else if (gameTitle.includes('Random') || gameEmoji.includes('⚡')) {
                gameId = 'random';
            }
            
            console.log('Game ID:', gameId);
            
            if (gameId) {
                openGame(gameId);
            } else {
                alert('Game tidak dikenal');
            }
        });
    });
}

// Inisialisasi modal close
function initModalClose() {
    const modal = document.getElementById('gameModal');
    if (!modal) {
        console.error('Modal tidak ditemukan di initModalClose');
        return;
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGame();
        }
    });
}

// Particles
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) {
        console.log('Container particles tidak ditemukan');
        return;
    }
    
    container.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 10 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.1 + 0.03;
        container.appendChild(particle);
    }
}

// Stat counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) {
        console.log('Tidak ada stat numbers');
        return;
    }
    
    statNumbers.forEach(el => {
        const targetText = el.innerText;
        const isPlus = targetText.includes('+');
        let targetValue = parseFloat(targetText.replace(/[^0-9.]/g, ''));
        
        if (el.dataset.target) {
            targetValue = parseInt(el.dataset.target);
        }
        
        let current = 0;
        const increment = targetValue / 40;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                el.innerText = targetValue + (isPlus ? '+' : '');
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current) + (isPlus ? '+' : '');
            }
        }, 25);
    });
}

// Game Modal Functions
function getModal() {
    return document.getElementById('gameModal');
}

function getGameContent() {
    return document.getElementById('gameContent');
}

// Fungsi untuk membuka game
function openGame(gameId) {
    console.log('Membuka game:', gameId);
    
    const modal = getModal();
    const gameContent = getGameContent();
    
    if (!modal) {
        console.error('Modal tidak ditemukan!');
        alert('Error: Modal tidak ditemukan! Pastikan elemen dengan id "gameModal" ada di HTML.');
        return;
    }
    
    if (!gameContent) {
        console.error('Game content tidak ditemukan!');
        alert('Error: Game content tidak ditemukan! Pastikan elemen dengan id "gameContent" ada di HTML.');
        return;
    }
    
    console.log('Modal ditemukan, menampilkan game');
    modal.style.display = 'flex';
    modal.classList.add('active');
    
    // Render game berdasarkan ID
    if (gameId === 'tebakAngka') renderTebakAngka();
    else if (gameId === 'suit') renderSuit();
    else if (gameId === 'dadu') renderDadu();
    else if (gameId === 'quiz') renderQuiz();
    else if (gameId === 'warna') renderWarna();
    else if (gameId === 'random') renderRandom();
    else {
        gameContent.innerHTML = `<div style="padding:30px; text-align:center;">Game tidak ditemukan: ${gameId}</div>`;
    }
}

// Fungsi untuk menutup game
function closeGame() {
    console.log('Menutup game');
    
    const modal = getModal();
    const gameContent = getGameContent();
    
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    
    if (gameContent) {
        gameContent.innerHTML = '';
    }
}

// GAME 1: Tebak Angka
function renderTebakAngka() {
    const secret = Math.floor(Math.random() * 100) + 1;
    let attempts = 7;
    
    const gameContent = getGameContent();
    if (!gameContent) return;
    
    gameContent.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3 style="margin:0; color:var(--text-primary);">🔢 Tebak Angka (1-100)</h3>
                <button onclick="closeGame()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-primary);">&times;</button>
            </div>
            <p style="font-size:18px; color:var(--text-primary);">Kesempatan: <span id="attempts" style="font-weight:bold; font-size:28px; color:var(--accent);">7</span></p>
            <input type="number" id="guessInput" min="1" max="100" placeholder="Masukkan angka" style="width:80%; padding:12px; margin:15px 0; border-radius:10px; border:1px solid var(--border); background:var(--bg-card); color:var(--text-primary); font-size:16px;">
            <br>
            <button id="guessButton" style="padding:12px 30px; background:var(--accent); color:white; border:none; border-radius:25px; font-size:16px; cursor:pointer; font-weight:bold;">Tebak</button>
            <div id="tebakResult" style="margin-top:20px; padding:15px; background:var(--bg-card); border-radius:10px; min-height:50px; color:var(--text-primary);"></div>
        </div>
    `;
    
    // Tunggu sebentar sampai elemen ter-render
    setTimeout(() => {
        const guessButton = document.getElementById('guessButton');
        if (!guessButton) {
            console.error('Tombol tebak tidak ditemukan');
            return;
        }
        
        guessButton.addEventListener('click', function() {
            const input = document.getElementById('guessInput');
            const guess = parseInt(input.value);
            const resultDiv = document.getElementById('tebakResult');
            const attemptsSpan = document.getElementById('attempts');
            
            if (!input || !resultDiv || !attemptsSpan) return;
            
            let remaining = parseInt(attemptsSpan.innerText);
            
            if (isNaN(guess) || guess < 1 || guess > 100) {
                resultDiv.innerText = '❌ Masukkan angka 1-100!';
                return;
            }
            
            remaining--;
            attemptsSpan.innerText = remaining;
            
            if (guess === secret) {
                resultDiv.innerText = '🎉 SELAMAT! Tebakanmu benar!';
                this.disabled = true;
            } else if (remaining === 0) {
                resultDiv.innerText = `💥 Yah, kesempatan habis. Angka rahasia: ${secret}`;
                this.disabled = true;
            } else if (guess < secret) {
                resultDiv.innerText = '⬆️ Terlalu kecil!';
            } else {
                resultDiv.innerText = '⬇️ Terlalu besar!';
            }
            
            input.value = '';
        });
    }, 100);
}

// GAME 2: Suit
function renderSuit() {
    let playerScore = 0, compScore = 0;
    
    const gameContent = getGameContent();
    if (!gameContent) return;
    
    gameContent.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3 style="margin:0; color:var(--text-primary);">✂️ Gunting Batu Kertas</h3>
                <button onclick="closeGame()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-primary);">&times;</button>
            </div>
            <div style="display:flex; justify-content:center; gap:40px; margin:20px 0;">
                <div style="text-align:center;">
                    <div style="color:var(--text-secondary);">Kamu</div>
                    <div style="font-size:36px; font-weight:bold; color:var(--accent);" id="playerScore">0</div>
                </div>
                <div style="text-align:center;">
                    <div style="color:var(--text-secondary);">Komputer</div>
                    <div style="font-size:36px; font-weight:bold; color:var(--accent);" id="compScore">0</div>
                </div>
            </div>
            <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin:20px 0;">
                <button class="suit-btn" data-choice="gunting" style="padding:12px 20px; background:var(--accent); color:white; border:none; border-radius:20px; cursor:pointer; font-size:16px;">✂️ Gunting</button>
                <button class="suit-btn" data-choice="batu" style="padding:12px 20px; background:var(--accent); color:white; border:none; border-radius:20px; cursor:pointer; font-size:16px;">🪨 Batu</button>
                <button class="suit-btn" data-choice="kertas" style="padding:12px 20px; background:var(--accent); color:white; border:none; border-radius:20px; cursor:pointer; font-size:16px;">📄 Kertas</button>
            </div>
            <div id="suitResult" style="margin-top:20px; padding:15px; background:var(--bg-card); border-radius:10px; min-height:50px; color:var(--text-primary);"></div>
        </div>
    `;
    
    setTimeout(() => {
        const suitButtons = document.querySelectorAll('.suit-btn');
        
        suitButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const pilihan = this.getAttribute('data-choice');
                const pilihanComp = ['gunting','batu','kertas'][Math.floor(Math.random()*3)];
                let result = '';
                
                if (pilihan === pilihanComp) {
                    result = '🤝 Seri!';
                } else if (
                    (pilihan === 'gunting' && pilihanComp === 'kertas') ||
                    (pilihan === 'batu' && pilihanComp === 'gunting') ||
                    (pilihan === 'kertas' && pilihanComp === 'batu')
                ) {
                    result = '✅ Kamu menang!';
                    playerScore++;
                } else {
                    result = '❌ Komputer menang!';
                    compScore++;
                }
                
                document.getElementById('playerScore').innerText = playerScore;
                document.getElementById('compScore').innerText = compScore;
                document.getElementById('suitResult').innerHTML = `Kamu: ${pilihan} | Komputer: ${pilihanComp} <br> <strong>${result}</strong>`;
                
                if (playerScore === 3 || compScore === 3) {
                    setTimeout(() => {
                        alert(playerScore === 3 ? '🏆 Kamu juara!' : '💻 Komputer juara!');
                        closeGame();
                    }, 500);
                }
            });
        });
    }, 100);
}

// GAME 3: Dadu
function renderDadu() {
    const gameContent = getGameContent();
    if (!gameContent) return;
    
    gameContent.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3 style="margin:0; color:var(--text-primary);">🎲 Lempar Dadu</h3>
                <button onclick="closeGame()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-primary);">&times;</button>
            </div>
            <button id="diceButton" style="padding:15px 40px; background:var(--accent); color:white; border:none; border-radius:30px; font-size:20px; cursor:pointer; margin:30px 0; font-weight:bold;">Lempar Dadu!</button>
            <div id="daduResult" style="font-size:72px; padding:30px; background:var(--bg-card); border-radius:20px; margin:20px 0; color:var(--text-primary);">?</div>
        </div>
    `;
    
    setTimeout(() => {
        const diceButton = document.getElementById('diceButton');
        if (diceButton) {
            diceButton.addEventListener('click', function() {
                const angka = Math.floor(Math.random() * 6) + 1;
                document.getElementById('daduResult').innerHTML = '🎲 ' + angka;
            });
        }
    }, 100);
}

// GAME 4: Kuis dengan Soal Acak
function renderQuiz() {
    const questions = [
        { q: "Apa kepanjangan dari CPU?", a: "central processing unit" },
        { q: "Planet terbesar di tata surya?", a: "jupiter" },
        { q: "Apa bahasa inggris dari 'Gunting'?", a: "scissors" },
        { q: "Apa kepanjangan dari RAM?", a: "random access memory" },
        { q: "Apa kepanjangan dari ROM?", a: "read only memory" },
        { q: "Apa kepanjangan dari GPU?", a: "graphics processing unit" },
        { q: "Apa kepanjangan dari LAN?", a: "local area network" },
        { q: "Apa kepanjangan dari WAN?", a: "wide area network" },
        { q: "Apa kepanjangan dari IP?", a: "internet protocol" },
        { q: "Apa kepanjangan dari URL?", a: "uniform resource locator" },
        { q: "Apa kepanjangan dari HTTP?", a: "hypertext transfer protocol" },
        { q: "Apa kepanjangan dari HTTPS?", a: "hypertext transfer protocol secure" },
        { q: "Bahasa dasar untuk membuat website?", a: "html" },
        { q: "Bahasa untuk mengatur tampilan website?", a: "css" },
        { q: "Bahasa untuk membuat website interaktif?", a: "javascript" },
        { q: "Bahasa pemrograman populer untuk backend web?", a: "php" },
        { q: "Bahasa pemrograman populer untuk AI?", a: "python" },
        { q: "Bahasa pemrograman yang dibuat oleh Sun Microsystems?", a: "java" },
        { q: "Bahasa pemrograman yang digunakan untuk iOS?", a: "swift" },
        { q: "Bahasa pemrograman yang dikembangkan oleh Microsoft untuk .NET?", a: "c#" },
        { q: "Bahasa pemrograman yang banyak dipakai untuk sistem operasi?", a: "c" },
        { q: "Bahasa pemrograman untuk analisis data?", a: "r" },
        { q: "Database open source populer?", a: "mysql" },
        { q: "Database yang sering digunakan dengan PHP?", a: "mysql" },
        { q: "Database dari Oracle?", a: "oracle database" },
        { q: "Database dari Microsoft?", a: "sql server" },
        { q: "Database NoSQL populer?", a: "mongodb" },
        { q: "Bahasa query untuk database?", a: "sql" },
        { q: "Software untuk mengelola database MySQL?", a: "phpmyadmin" },
        { q: "Editor kode populer dari Microsoft?", a: "visual studio code" },
        { q: "Software untuk desain grafis vektor?", a: "adobe illustrator" },
        { q: "Software pengolah gambar populer?", a: "adobe photoshop" },
        { q: "Sistem operasi open source?", a: "linux" },
        { q: "Distribusi Linux populer?", a: "ubuntu" },
        { q: "Sistem operasi buatan Microsoft?", a: "windows" },
        { q: "Sistem operasi dari Apple untuk Mac?", a: "macos" },
        { q: "Sistem operasi untuk smartphone Google?", a: "android" },
        { q: "Browser buatan Google?", a: "google chrome" },
        { q: "Browser open source populer?", a: "mozilla firefox" },
        { q: "Browser bawaan Windows?", a: "microsoft edge" },
        { q: "Mesin pencari terbesar di dunia?", a: "google" },
        { q: "Alat untuk menghubungkan jaringan komputer?", a: "router" },
        { q: "Alat untuk menghubungkan komputer dalam jaringan lokal?", a: "switch" },
        { q: "Alat untuk memperkuat sinyal jaringan?", a: "repeater" },
        { q: "Alat untuk menghubungkan komputer ke jaringan?", a: "network card" },
        { q: "Perangkat keras untuk menyimpan data?", a: "harddisk" },
        { q: "Penyimpanan lebih cepat dari HDD?", a: "ssd" },
        { q: "Penyimpanan portable kecil?", a: "flashdisk" },
        { q: "Media penyimpanan berbasis cloud?", a: "cloud storage" },
        { q: "Layanan cloud dari Google?", a: "google drive" },
        { q: "Layanan cloud dari Microsoft?", a: "onedrive" },
        { q: "Layanan cloud dari Apple?", a: "icloud" },
        { q: "Serangan komputer yang mengunci data korban?", a: "ransomware" },
        { q: "Program berbahaya yang menyebar sendiri?", a: "virus" },
        { q: "Program yang menyamar sebagai aplikasi asli?", a: "trojan" },
        { q: "Program yang memata-matai pengguna?", a: "spyware" },
        { q: "Sistem keamanan jaringan untuk memblokir akses ilegal?", a: "firewall" },
        { q: "Proses melindungi data dengan kode rahasia?", a: "enkripsi" },
        { q: "Platform berbagi kode populer?", a: "github" },
        { q: "Sistem kontrol versi populer?", a: "git" },
        { q: "Framework JavaScript populer untuk frontend?", a: "react" },
        { q: "Framework JavaScript dari Google?", a: "angular" },
        { q: "Framework JavaScript untuk backend?", a: "nodejs" },
        { q: "Framework PHP populer?", a: "laravel" },
        { q: "Framework Python populer?", a: "django" },
        { q: "File gambar dengan transparansi?", a: "png" },
        { q: "Format gambar untuk foto?", a: "jpg" },
        { q: "Format gambar vektor?", a: "svg" },
        { q: "Bahasa markup untuk web?", a: "html" },
        { q: "File style pada website?", a: "css" },
        { q: "Bahasa scripting di browser?", a: "javascript" },
        { q: "Aplikasi untuk membuat website secara lokal?", a: "xampp" },
        { q: "Server web populer?", a: "apache" },
        { q: "Server web ringan populer?", a: "nginx" },
        { q: "Singkatan AI?", a: "artificial intelligence" },
        { q: "Singkatan UI?", a: "user interface" },
        { q: "Singkatan UX?", a: "user experience" },
        { q: "Singkatan API?", a: "application programming interface" },
        { q: "Teknologi untuk membuat mesin belajar dari data?", a: "machine learning" },
        { q: "Bagian AI yang meniru jaringan otak manusia?", a: "neural network" },
        { q: "Teknologi untuk buku besar digital terdistribusi?", a: "blockchain" },
        { q: "Mata uang digital pertama?", a: "bitcoin" },
        { q: "Bahasa pemrograman untuk membuat aplikasi Android?", a: "kotlin" },
        { q: "IDE populer untuk Java?", a: "intellij idea" },
        { q: "IDE resmi untuk Android?", a: "android studio" },
        { q: "Standar jaringan WiFi?", a: "802.11" },
        { q: "Teknologi jaringan generasi kelima?", a: "5g" },
        { q: "Perusahaan pembuat processor Intel?", a: "intel" },
        { q: "Perusahaan pembuat processor Ryzen?", a: "amd" },
        { q: "Bahasa query untuk mengambil data database?", a: "sql" },
        { q: "Perintah SQL untuk mengambil data?", a: "select" },
        { q: "Perintah untuk menambah data database?", a: "insert" },
        { q: "Perintah untuk mengubah data database?", a: "update" },
        { q: "Perintah untuk menghapus data database?", a: "delete" }
    ];
    
    // Buat salinan array soal dan acak urutannya
    let shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    
    let currentQuestionIndex = 0;
    let totalQuestions = shuffledQuestions.length;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    
    const gameContent = getGameContent();
    if (!gameContent) return;
    
    gameContent.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3 style="margin:0; color:var(--text-primary);">❓ Kuis IT & Astronomi</h3>
                <button onclick="closeGame()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-primary);">&times;</button>
            </div>
            
            <!-- Skor -->
            <div style="display:flex; justify-content:center; gap:30px; margin-bottom:20px;">
                <div style="background:var(--bg-card); padding:10px 20px; border-radius:15px;">
                    <span style="color:var(--text-secondary);">✅ Benar:</span>
                    <span id="correctCount" style="font-weight:bold; color:green; font-size:20px;">0</span>
                </div>
                <div style="background:var(--bg-card); padding:10px 20px; border-radius:15px;">
                    <span style="color:var(--text-secondary);">❌ Salah:</span>
                    <span id="wrongCount" style="font-weight:bold; color:red; font-size:20px;">0</span>
                </div>
            </div>
            
            <!-- Progress -->
            <div style="margin-bottom:15px; color:var(--text-secondary);">
                Soal <span id="currentQuestionNumber">1</span> dari <span id="totalQuestions">${totalQuestions}</span>
            </div>
            
            <!-- Soal -->
            <div style="margin:20px 0; padding:25px; background:var(--bg-card); border-radius:15px; border:2px solid var(--accent);">
                <p id="quizQuestion" style="font-size:20px; font-weight:bold; color:var(--text-primary); margin:0;">${shuffledQuestions[0].q}</p>
            </div>
            
            <!-- Input Jawaban -->
            <input type="text" id="quizAnswer" placeholder="Ketik jawabanmu di sini..." 
                   style="width:90%; padding:15px; margin:15px 0; border-radius:15px; border:2px solid var(--border); 
                          background:var(--bg-card); color:var(--text-primary); font-size:16px;"
                   onkeypress="if(event.key === 'Enter') document.getElementById('quizButton').click()">
            <br>
            
            <!-- Tombol Jawab -->
            <button id="quizButton" style="padding:15px 40px; background:var(--accent); color:white; border:none; 
                                           border-radius:30px; font-size:18px; cursor:pointer; font-weight:bold; margin:10px 0;">
                🔍 Jawab
            </button>
            
            <!-- Tombol Next (awalnya disembunyikan) -->
            <button id="nextButton" style="display:none; padding:12px 30px; background:var(--accent); color:white; 
                                           border:none; border-radius:25px; font-size:16px; cursor:pointer; font-weight:bold; margin:10px 0;">
                ⏩ Soal Selanjutnya
            </button>
            
            <!-- Hasil -->
            <div id="quizResult" style="margin-top:20px; padding:15px; background:var(--bg-card); border-radius:10px; 
                                         min-height:60px; color:var(--text-primary); font-size:16px;"></div>
        </div>
    `;
    
    setTimeout(() => {
        const quizButton = document.getElementById('quizButton');
        const nextButton = document.getElementById('nextButton');
        const answerInput = document.getElementById('quizAnswer');
        const quizResult = document.getElementById('quizResult');
        const correctSpan = document.getElementById('correctCount');
        const wrongSpan = document.getElementById('wrongCount');
        const currentNumberSpan = document.getElementById('currentQuestionNumber');
        
        if (!quizButton || !nextButton || !answerInput || !quizResult) return;
        
        // Fungsi untuk menampilkan soal berikutnya
        function showNextQuestion() {
            currentQuestionIndex++;
            
            if (currentQuestionIndex < totalQuestions) {
                // Tampilkan soal berikutnya
                document.getElementById('quizQuestion').innerText = shuffledQuestions[currentQuestionIndex].q;
                currentNumberSpan.innerText = currentQuestionIndex + 1;
                answerInput.value = '';
                answerInput.disabled = false;
                quizButton.style.display = 'inline-block';
                nextButton.style.display = 'none';
                quizResult.innerHTML = '';
                quizButton.disabled = false;
            } else {
                // Kuis selesai
                const percentage = Math.round((correctAnswers / totalQuestions) * 100);
                quizResult.innerHTML = `
                    <div style="text-align:center;">
                        <h3 style="color:var(--accent); margin-bottom:10px;">🏆 KUIS SELESAI! 🏆</h3>
                        <p style="font-size:18px;">✅ Benar: ${correctAnswers}</p>
                        <p style="font-size:18px;">❌ Salah: ${wrongAnswers}</p>
                        <p style="font-size:24px; font-weight:bold; color:${percentage >= 80 ? 'green' : (percentage >= 60 ? 'orange' : 'red')}">
                            Nilai: ${percentage}%
                        </p>
                        <button onclick="renderQuiz()" style="padding:12px 30px; background:var(--accent); color:white; 
                                                               border:none; border-radius:25px; font-size:16px; cursor:pointer; margin-top:15px;">
                            🔄 Main Lagi
                        </button>
                    </div>
                `;
                answerInput.disabled = true;
                quizButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        }
        
        // Event listener untuk tombol jawab
        quizButton.addEventListener('click', function() {
            const answer = answerInput.value.trim().toLowerCase();
            
            if (answer === '') {
                quizResult.innerHTML = '❌ Silakan masukkan jawaban!';
                return;
            }
            
            const currentQuestion = shuffledQuestions[currentQuestionIndex];
            const isCorrect = answer === currentQuestion.a;
            
            if (isCorrect) {
                correctAnswers++;
                correctSpan.innerText = correctAnswers;
                quizResult.innerHTML = '✅ <strong>BENAR!</strong> Jawabanmu tepat!';
                quizResult.style.color = 'green';
            } else {
                wrongAnswers++;
                wrongSpan.innerText = wrongAnswers;
                quizResult.innerHTML = `❌ <strong>SALAH!</strong> Jawaban yang benar adalah: <strong>"${currentQuestion.a}"</strong>`;
                quizResult.style.color = 'red';
            }
            
            // Disable input dan tombol jawab
            answerInput.disabled = true;
            quizButton.disabled = true;
            
            // Tampilkan tombol next
            nextButton.style.display = 'inline-block';
        });
        
        // Event listener untuk tombol next
        nextButton.addEventListener('click', function() {
            showNextQuestion();
        });
        
        // Event listener untuk enter key
        answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !quizButton.disabled) {
                quizButton.click();
            }
        });
        
    }, 100);
}
// GAME 5: Tebak Warna
function renderWarna() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    
    const gameContent = getGameContent();
    if (!gameContent) return;
    
    gameContent.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3 style="margin:0; color:var(--text-primary);">🎨 Tebak Warna RGB</h3>
                <button onclick="closeGame()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-primary);">&times;</button>
            </div>
            <div style="width:150px;height:150px;margin:20px auto; background:rgb(${r},${g},${b}); border-radius:20px; border:3px solid var(--border);"></div>
            <p style="font-family:monospace; font-size:18px; background:var(--bg-card); padding:10px; border-radius:10px; color:var(--text-primary);">RGB(${r}, ${g}, ${b})</p>
            <p style="color:var(--text-primary);">Warna apa ini?</p>
            <input type="text" id="colorGuess" placeholder="Nama warna (merah, biru, dll)" style="width:80%; padding:12px; margin:10px 0; border-radius:10px; border:1px solid var(--border); background:var(--bg-card); color:var(--text-primary); font-size:16px;">
            <br>
            <button id="colorButton" style="padding:12px 30px; background:var(--accent); color:white; border:none; border-radius:25px; font-size:16px; cursor:pointer; font-weight:bold;">Tebak</button>
            <div id="warnaResult" style="margin-top:20px; padding:15px; background:var(--bg-card); border-radius:10px; min-height:50px; color:var(--text-primary);"></div>
        </div>
    `;
    
    setTimeout(() => {
        const colorButton = document.getElementById('colorButton');
        if (colorButton) {
            colorButton.addEventListener('click', function() {
                const answer = document.getElementById('colorGuess').value.trim().toLowerCase();
                let colorName = '';
                
                if (r > 200 && g < 100 && b < 100) colorName = 'merah';
                else if (r < 100 && g > 200 && b < 100) colorName = 'hijau';
                else if (r < 100 && g < 100 && b > 200) colorName = 'biru';
                else if (r > 200 && g > 200 && b < 100) colorName = 'kuning';
                else if (r > 200 && g < 150 && b > 200) colorName = 'pink';
                else colorName = 'warna campuran';
                
                if (answer.includes(colorName)) {
                    document.getElementById('warnaResult').innerText = '✅ Mantap! Warna itu ' + colorName;
                } else {
                    document.getElementById('warnaResult').innerHTML = '❌ Kurang tepat. <br> Petunjuk: warnanya ' + colorName;
                }
            });
        }
    }, 100);
}

// GAME 6: Random Number
function renderRandom() {
    const gameContent = getGameContent();
    if (!gameContent) return;
    
    gameContent.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h3 style="margin:0; color:var(--text-primary);">⚡ Random Number Generator</h3>
                <button onclick="closeGame()" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-primary);">&times;</button>
            </div>
            <p style="margin:20px 0; color:var(--text-primary);">Angka acak 1 - 1000</p>
            <button id="randomButton" style="padding:15px 40px; background:var(--accent); color:white; border:none; border-radius:30px; font-size:20px; cursor:pointer; margin:20px 0; font-weight:bold;">Hasilkan!</button>
            <div id="randomResult" style="font-size:48px; padding:30px; background:var(--bg-card); border-radius:20px; margin:20px 0; color:var(--text-primary);">-</div>
        </div>
    `;
    
    setTimeout(() => {
        const randomButton = document.getElementById('randomButton');
        if (randomButton) {
            randomButton.addEventListener('click', function() {
                const rand = Math.floor(Math.random() * 1000) + 1;
                document.getElementById('randomResult').innerText = rand;
            });
        }
    }, 100);
}