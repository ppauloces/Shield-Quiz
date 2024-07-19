// scripts/encodeImages.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtém o diretório atual do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../public/images');
const outputPath = path.join(__dirname, '../src/encoded_images.json');

const images = fs.readdirSync(directoryPath);

const base64Images = images.reduce((acc, image) => {
  const imagePath = path.join(directoryPath, image);
  const imageData = fs.readFileSync(imagePath);
  const base64 = Buffer.from(imageData).toString('base64');
  const mimeType = 'image/png'; // ajuste conforme o tipo da sua imagem
  acc[image] = `data:${mimeType};base64,${base64}`;
  return acc;
}, {});

fs.writeFileSync(outputPath, JSON.stringify(base64Images, null, 2));

console.log('Imagens convertidas para Base64 e salvas em encoded_images.json');
