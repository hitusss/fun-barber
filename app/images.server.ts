import { createCanvas, loadImage, registerFont } from "canvas";
import type { CanvasRenderingContext2D, Image } from "canvas";

registerFont("public/fonts/LibreBaskerville-Bold.ttf", {
  family: "LibreBaskerville",
  weight: "700",
});

const getLines = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

function drawImageProp({
  ctx,
  img,
  x,
  y,
  w,
  h,
  offsetX,
  offsetY,
}: {
  ctx: CanvasRenderingContext2D;
  img: Image;
  x: number;
  y: number;
  w: number;
  h: number;
  offsetX: number;
  offsetY: number;
}) {
  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r, // new prop. width
    nh = ih * r, // new prop. height
    cx,
    cy,
    cw,
    ch,
    ar = 1;

  // decide which gap to fill
  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}

export async function generateImage({
  origin,
  words,
  featuredImage,
}: {
  origin: string;
  words: string;
  featuredImage: string;
}) {
  const [width, height] = [1280, 720];
  const margin = 64;
  const fontSize = 32;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, width, width, height);
  gradient.addColorStop(0.4, "#2A2A2C");
  gradient.addColorStop(1, "#373739");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const logo = await loadImage(`${origin}/images/logo.png`);

  ctx.drawImage(logo, margin, margin, logo.width, logo.height);

  ctx.font = `bold ${fontSize}px LibreBaskerville`;
  const titleLines = getLines(ctx, words, width / 2 - margin * 2);
  const lineHeight = fontSize * 1.2;
  const textHeight = titleLines.length * lineHeight;

  titleLines
    .map((line, index) => ({
      text: line,
      x: margin,
      y: (height - textHeight) / 1.5 + index * lineHeight,
    }))
    .forEach(({ text, x, y }) => {
      ctx.fillStyle = "#FFFEFE";
      ctx.fillText(text, x, y);
    });

  const img = await loadImage(featuredImage);
  drawImageProp({
    ctx,
    img,
    x: width / 2,
    y: margin,
    w: width / 2 - margin,
    h: height - 2 * margin,
    offsetX: 0.5,
    offsetY: 0.5,
  });

  return canvas.toBuffer("image/png");
}
