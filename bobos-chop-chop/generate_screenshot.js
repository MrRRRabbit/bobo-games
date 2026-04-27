const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 800;
const height = 600;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, '#1a1a2e');
gradient.addColorStop(0.5, '#16213e');
gradient.addColorStop(1, '#0f3460');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Draw some decorative circles
ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 100 + 50;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

// Draw Bobo the Lobster (center)
function drawBobo(ctx, x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    // Claws
    ctx.fillStyle = '#ff6348';
    
    // Left claw
    ctx.save();
    ctx.translate(-50, -40);
    ctx.rotate(-Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-50, -40, -60, 0);
    ctx.quadraticCurveTo(-50, 40, 0, 15);
    ctx.fill();
    ctx.strokeStyle = '#e55039';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    
    // Right claw
    ctx.save();
    ctx.translate(50, -40);
    ctx.rotate(Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(50, -40, 60, 0);
    ctx.quadraticCurveTo(50, 40, 0, 15);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    
    // Body
    ctx.fillStyle = '#ff6348';
    ctx.beginPath();
    ctx.ellipse(0, 0, 45, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#e55039';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Segments
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 2;
    for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(-40, i * 20);
        ctx.lineTo(40, i * 20);
        ctx.stroke();
    }
    
    // Tail
    ctx.fillStyle = '#ff6348';
    ctx.beginPath();
    ctx.arc(0, 60, 35, 0, Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Antennae
    ctx.strokeStyle = '#ff6348';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-15, -50);
    ctx.quadraticCurveTo(-30, -80, -20, -100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(15, -50);
    ctx.quadraticCurveTo(30, -80, 20, -100);
    ctx.stroke();
    
    // Eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-15, -20, 12, 0, Math.PI * 2);
    ctx.arc(15, -20, 12, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(-12, -20, 6, 0, Math.PI * 2);
    ctx.arc(18, -20, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Shine in eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-10, -23, 2, 0, Math.PI * 2);
    ctx.arc(20, -23, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Smile
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 5, 12, 0.2, Math.PI - 0.2);
    ctx.stroke();
    
    // Blush
    ctx.fillStyle = 'rgba(255,182,193,0.6)';
    ctx.beginPath();
    ctx.arc(-25, 0, 8, 0, Math.PI * 2);
    ctx.arc(25, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

// Draw Bobo at center-top
ctx.save();
ctx.translate(width/2, 160);
// Glow effect
ctx.shadowColor = '#ff6348';
ctx.shadowBlur = 30;
drawBobo(ctx, 0, 0, 1.5);
ctx.shadowBlur = 0;
ctx.restore();

// Draw fruits around
function drawApple(ctx, x, y, r) {
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.arc(x-r*0.3, y-r*0.3, r*0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.ellipse(x+r*0.5, y-r-3, 8, 4, Math.PI/4, 0, Math.PI * 2);
    ctx.fill();
}

function drawWatermelon(ctx, x, y, r) {
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(x, y, r*0.85, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2d3436';
    for (let i = 0; i < 5; i++) {
        const angle = (i/5) * Math.PI * 2 + Math.PI/5;
        ctx.beginPath();
        ctx.ellipse(x+Math.cos(angle)*r*0.4, y+Math.sin(angle)*r*0.4, 2, 4, angle, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawOrange(ctx, x, y, r) {
    ctx.fillStyle = '#ff9f43';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.ellipse(x, y-r-2, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Draw scattered fruits
const fruits = [
    {type: 'apple', x: 80, y: 150, r: 35},
    {type: 'apple', x: 720, y: 180, r: 30},
    {type: 'watermelon', x: 120, y: 450, r: 45},
    {type: 'watermelon', x: 680, y: 420, r: 40},
    {type: 'orange', x: 200, y: 120, r: 32},
    {type: 'orange', x: 600, y: 140, r: 28},
];

fruits.forEach(f => {
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    if (f.type === 'apple') drawApple(ctx, f.x, f.y, f.r);
    else if (f.type === 'watermelon') drawWatermelon(ctx, f.x, f.y, f.r);
    else drawOrange(ctx, f.x, f.y, f.r);
});
ctx.shadowBlur = 0;
ctx.shadowOffsetY = 0;

// Draw sliced fruit effect
ctx.save();
ctx.translate(700, 350);
ctx.rotate(0.3);
ctx.fillStyle = '#ff4444';
ctx.beginPath();
ctx.arc(0, 0, 30, Math.PI/2, -Math.PI/2, false);
ctx.closePath();
ctx.fill();
ctx.fillStyle = '#ffeaa7';
ctx.beginPath();
ctx.arc(0, 0, 20, Math.PI/2, -Math.PI/2, false);
ctx.closePath();
ctx.fill();
ctx.restore();

ctx.save();
ctx.translate(740, 380);
ctx.rotate(-0.2);
ctx.fillStyle = '#ff4444';
ctx.beginPath();
ctx.arc(0, 0, 30, -Math.PI/2, Math.PI/2, false);
ctx.closePath();
ctx.fill();
ctx.fillStyle = '#ffeaa7';
ctx.beginPath();
ctx.arc(0, 0, 20, -Math.PI/2, Math.PI/2, false);
ctx.closePath();
ctx.fill();
ctx.restore();

// Title text
ctx.font = 'bold 64px "Arial Black", sans-serif';
ctx.textAlign = 'center';
ctx.fillStyle = '#ff6b6b';
ctx.shadowColor = 'rgba(0,0,0,0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 3;
ctx.shadowOffsetY = 3;
ctx.fillText("BOBO'S", width/2, 320);

ctx.fillStyle = '#ffd700';
ctx.fillText('CHOP CHOP', width/2, 390);

// Subtitle
ctx.font = 'bold 24px Arial, sans-serif';
ctx.fillStyle = 'white';
ctx.shadowBlur = 5;
ctx.fillText('🦞 Slice the food, avoid the bombs! 🦞', width/2, 440);

// Decorative swipe line
ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.shadowColor = '#ff6b6b';
ctx.shadowBlur = 15;
ctx.beginPath();
ctx.moveTo(100, 500);
ctx.quadraticCurveTo(200, 450, 350, 520);
ctx.quadraticCurveTo(500, 590, 700, 480);
ctx.stroke();

// Particles
for (let i = 0; i < 15; i++) {
    const x = 100 + Math.random() * 600;
    const y = 480 + Math.random() * 100;
    const size = Math.random() * 8 + 3;
    const colors = ['#ff4444', '#ff9f43', '#feca57', '#2ecc71', '#ff6b6b'];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}
ctx.globalAlpha = 1;

// Save the image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('screenshot.png', buffer);
console.log('Screenshot saved to screenshot.png');
