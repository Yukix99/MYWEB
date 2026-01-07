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
        name: "N0. 1 Party Anthem", 
        src: "https://open.spotify.com/embed/track/5TTGoX70AFrTvuEtqHK37S?utm_source=generator&theme=0" 
    },
    { 
        name: "sombr - back to friends",
        src: "https://open.spotify.com/embed/track/0FTmksd2dxiE5e3rWyJXs6?utm_source=generator" 
    },
    { 
        name: "Multo", 
        src: "https://open.spotify.com/embed/track/4cBm8rv2B5BJWU2pDaHVbF?utm_source=generator" 
    },
    { 
        name: "HEAVENLY JUMPSTYLE", 
        src: "https://open.spotify.com/embed/track/6jC36NU3sSAFy5YjUkGGKd?utm_source=generator" 
    },
    { 
    name: "Umamusume Wei", 
        src: "https://open.spotify.com/embed/episode/6NBVhQVTWn8WGPoVzTFPa0?utm_source=generator" 
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