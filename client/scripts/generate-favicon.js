const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const sizes = [16, 32, 48, 64, 192, 512];
  const inputSvg = path.join(__dirname, '../public/favicon.svg');
  
  // Read the SVG file
  const svgBuffer = fs.readFileSync(inputSvg);
  
  // Generate different sizes
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .toFile(path.join(__dirname, `../public/favicon-${size}x${size}.png`));
  }
  
  // Generate favicon.ico (16x16, 32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile(path.join(__dirname, '../public/favicon.ico'));
  
  // Copy specific sizes to standard filenames
  fs.copyFileSync(
    path.join(__dirname, '../public/favicon-192x192.png'),
    path.join(__dirname, '../public/logo192.png')
  );
  
  fs.copyFileSync(
    path.join(__dirname, '../public/favicon-512x512.png'),
    path.join(__dirname, '../public/logo512.png')
  );
  
  console.log('Favicons generated successfully!');
}

generateFavicons().catch(console.error); 