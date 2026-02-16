/* =========================================
   1. ระบบไฟตามเมาส์ (Cursor Glow)
   ========================================= */
const glow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

// รับค่าตำแหน่งเมาส์
document.addEventListener('mousemove', (e) => { 
    mouseX = e.clientX; 
    mouseY = e.clientY; 
});

function animateGlow() {
    // คำนวณความหน่วงเพื่อให้ไฟวิ่งตามนุ่มนวล
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    
    // อัปเดตตำแหน่ง (CSS จัดกลางให้แล้ว ไม่ต้องลบค่า)
    glow.style.left = glowX + 'px'; 
    glow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateGlow);
}

// เริ่มทำงานเฉพาะเมื่อมี element ไฟในหน้านั้น (ป้องกัน error หน้าอื่น)
if (glow) {
    animateGlow();
}


/* =========================================
   2. ระบบ Playlist เพลง (Music Player)
   ========================================= */

// ลิสต์เพลง (แก้ลิงก์ src ได้ที่นี่)
const playlist = [
    { 
        name: "MONTAGEM HIKARI - BellyJay", 
        src: "https://open.spotify.com/embed/track/0XqgE9UN4MCo5ooIwUYm7l?utm_source=generator" 
    },
    { 
        name: "I Want You to Tell Me the Moon is Beautiful!",
        src: "https://open.spotify.com/embed/track/2CSbGdlvxO4sGBEL9ZPAcZ?utm_source=generator" 
    },
    { 
        name: "MONTAGEM YUKI", 
        src: "https://open.spotify.com/embed/track/3jxcskPUbFoPLI3VSrAh9a?utm_source=generator" 
    },
    { 
        name: "MONTAGEM KOE", 
        src: "https://open.spotify.com/embed/track/5EKH1lbAiycR1EP7VwzfLv?utm_source=generator" 
    },
    { 
    name: "HIKARI FUNK!", 
        src: "https://open.spotify.com/embed/track/1MTCBfzNycWL4MnhnG2ACi?utm_source=generator" 
    }
];

let currentSongIndex = 0; 
const iframe = document.getElementById('spotify-frame');
const songNameDisplay = document.getElementById('song-name');

function loadSong(index) {
    // ถ้าหน้าเว็บไม่มีเครื่องเล่นเพลง ให้ข้ามการทำงาน (เช่นอยู่หน้า About)
    if (!iframe || !songNameDisplay) return;

    iframe.src = playlist[index].src;
    songNameDisplay.innerText = playlist[index].name;
    
    // รีเซ็ต Animation ชื่อเพลง
    songNameDisplay.style.animation = 'none';
    songNameDisplay.offsetHeight; /* trigger reflow */
    songNameDisplay.style.animation = null; 
}

// ฟังก์ชันกดปุ่ม Next
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > playlist.length - 1) {
        currentSongIndex = 0; 
    }
    loadSong(currentSongIndex);
}

// ฟังก์ชันกดปุ่ม Previous
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    loadSong(currentSongIndex);
}

// เริ่มโหลดเพลงแรกทันทีเมื่อเข้าเว็บ
loadSong(currentSongIndex);