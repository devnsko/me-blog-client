'use client';

import '@/styles/not-found.css'
import { useEffect } from 'react';

const radian = 180.0/Math.PI;

// let angle = getRandom(179.0) - 90.0;
let angle = 50;
let rad = toRad(angle);
const r = 1.0;

function toRad(angle: number): number {
  return angle as number / radian as number;
}

// function getRandom(max: number = 180.0): number {
  
//   return Math.random() * max;
// }

function changeColor(block: HTMLElement) {
  const oldColor = block.style.backgroundColor;
  block.style.backgroundColor = newColor(oldColor);
}

function newColor(oldColor: string): string {
  // Generate a new random color different from the oldColor
  let newCol = oldColor;
  while (newCol === oldColor) {
    newCol = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  }
  return newCol;
}

function animate() {
  const block = document.getElementById('movement');
  const borderRight = document.body.offsetWidth;
  const borderBottom = document.body.offsetHeight;
  
  if (!block) return;

  const blockRight = block.offsetLeft + (block.offsetWidth / 2.0);
  const blockLeft = block.offsetLeft - (block.offsetWidth / 2.0);
  const blockBottom = block.offsetTop + (block.offsetHeight / 2.0);
  const blockTop = block.offsetTop - (block.offsetHeight / 2.0);

  if ((blockBottom >= borderBottom && Math.sin(rad) > 0) || (blockTop <= 0 && Math.sin(rad) < 0)) {
    console.log('Horizontal border!');
    angle = -angle;
    changeColor(block);
  }
  if ((blockRight >= borderRight && Math.abs(angle) < 90) || (blockLeft <= 0 && Math.abs(angle) > 90)) {
    console.log('Vertical border!');
    angle = 180 - angle;
    angle = angle % 360.0;
    changeColor(block);

  }

  rad = toRad(angle);

  const posY = r * Math.sin(rad) + block.offsetTop;
  const posX = r * Math.cos(rad) + block.offsetLeft;

  block.style.top = posY + 'px';
  block.style.left = posX + 'px';
}

export default function NotFound() {

  useEffect(() => {
    const block = document.getElementById('movement');
    const id = setInterval(animate, 5);
    if (!block) clearInterval(id);
  }, []);
  
  return (
    <>
      <div className="animation-block">
        <div className='movement-block' id="movement">
          <span className='movement-text'>Not Found</span>
        </div>
      </div>

    </>
  );
}