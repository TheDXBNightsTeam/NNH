const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create the icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate different sizes of favicons
const sizes = [16, 32, 180, 192, 512];
const sourceIcon = path.join(__dirname, '../public/favicon.ico');

sizes.forEach(size => {
  const outputFile = size === 180 
    ? path.join(__dirname, '../public/apple-touch-icon.png')
    : size === 16
      ? path.join(__dirname, '../public/favicon-16x16.png')
      : size === 32
        ? path.join(__dirname, '../public/favicon-32x32.png')
        : path.join(__dirname, `../public/android-chrome-${size}x${size}.png`);
  
  try {
    // Using ImageMagick's convert command
    execSync(`convert ${sourceIcon} -resize ${size}x${size} ${outputFile}`);
    console.log(`Generated ${outputFile}`);
  } catch (error) {
    console.error(`Error generating ${outputFile}:`, error.message);
    console.log('Creating a placeholder image instead');
    
    // Create a simple placeholder image using Node.js
    const { createCanvas } = require('canvas');
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Draw a simple colored square with text
    ctx.fillStyle = '#D4AF37'; // Gold color
    ctx.fillRect(0, 0, size, size);
    
    if (size >= 32) {
      ctx.fillStyle = '#000000';
      ctx.font = `${size / 4}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('NNH', size / 2, size / 2);
    }
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputFile, buffer);
    console.log(`Created placeholder for ${outputFile}`);
  }
});

console.log('Favicon generation complete!');