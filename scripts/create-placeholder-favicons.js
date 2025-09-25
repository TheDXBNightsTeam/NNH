import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the necessary favicon files as placeholders
const createPlaceholderSVG = (size, filename) => {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#D4AF37"/>
    <text x="50%" y="50%" font-family="Arial" font-size="${size/4}px" fill="black" text-anchor="middle" dominant-baseline="middle">NNH</text>
  </svg>`;
  
  fs.writeFileSync(path.join(__dirname, '../public', filename), svg);
  console.log(`Created ${filename}`);
};

// Create favicon files
createPlaceholderSVG(16, 'favicon-16x16.svg');
createPlaceholderSVG(32, 'favicon-32x32.svg');
createPlaceholderSVG(180, 'apple-touch-icon.svg');
createPlaceholderSVG(192, 'android-chrome-192x192.svg');
createPlaceholderSVG(512, 'android-chrome-512x512.svg');

console.log('Placeholder favicons created successfully!');