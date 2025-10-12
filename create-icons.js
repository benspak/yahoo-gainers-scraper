#!/usr/bin/env node

/**
 * Create PNG icons for Chrome extension without external dependencies
 * Uses Node.js canvas module
 */

const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [16, 32, 48, 128];

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background - Spotify green
  ctx.fillStyle = '#1db954';
  ctx.fillRect(0, 0, size, size);

  // Chart-like design with three rising bars
  const padding = size * 0.15;
  const barWidth = (size - padding * 4) / 3;
  const maxHeight = size - padding * 2;

  // Draw three bars representing rising stock prices
  const bars = [
    { x: padding, height: maxHeight * 0.5 },
    { x: padding * 2 + barWidth, height: maxHeight * 0.7 },
    { x: padding * 3 + barWidth * 2, height: maxHeight * 0.9 }
  ];

  ctx.fillStyle = '#000000';
  bars.forEach(bar => {
    ctx.fillRect(
      bar.x,
      size - padding - bar.height,
      barWidth,
      bar.height
    );
  });

  // Add upward arrow in top right
  const arrowSize = size * 0.12;
  const arrowX = size - padding - arrowSize;
  const arrowY = padding;

  ctx.beginPath();
  ctx.moveTo(arrowX + arrowSize / 2, arrowY);
  ctx.lineTo(arrowX, arrowY + arrowSize);
  ctx.lineTo(arrowX + arrowSize, arrowY + arrowSize);
  ctx.closePath();
  ctx.fill();

  return canvas;
}

// Create icons directory if it doesn't exist
if (!fs.existsSync('./icons')) {
  fs.mkdirSync('./icons');
}

// Generate all icon sizes
sizes.forEach(size => {
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = `./icons/icon${size}.png`;

  fs.writeFileSync(filename, buffer);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All icons generated successfully!');
