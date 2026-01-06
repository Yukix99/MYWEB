// 1. ควบคุมเมาส์ลูกไฟ
const glow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.left = (glowX - 30) + 'px'; 
    glow.style.top = (glowY - 30) + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();

// 2. ควบคุมอนิเมชั่น UI (เปลี่ยนรูปปุ่ม Play/Pause)
// หมายเหตุ: นี่เป็นแค่ Visual Effect เพราะตัวควบคุมจริงคือ YouTube iframe
let isPlaying = false;

function togglePlayState() {
    const icon = document.getElementById('play-icon');
    const wave = document.getElementById('sound-wave');
    
    // สลับสถานะ (Flip state)
    isPlaying = !isPlaying;

    if (isPlaying) {
        // ถ้าเล่น: เปลี่ยนไอคอนเป็น Pause, คลื่นเสียงเต้น
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        wave.classList.add('playing');
    } else {
        // ถ้าหยุด: เปลี่ยนไอคอนเป็น Play, คลื่นเสียงหยุด
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        wave.classList.remove('playing');
    }
}