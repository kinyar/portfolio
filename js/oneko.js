let oneko = document.getElementById('oneko');
let mouseX = 0;
let mouseY = 0;
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let frame = 0;
let lastFrameTime = 0;
let paused = false; 

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// when you click pause
document.addEventListener('click', () => {
  paused = !paused;
});

function update(timestamp) {
  if (!paused) {
    let dx = mouseX - x;
    let dy = mouseY - y;
    let distance = Math.hypot(dx, dy);

    if (distance > 1) {
      x += dx / distance;  // move small steps
      y += dy / distance;
      oneko.style.left = x + 'px';
      oneko.style.top = y + 'px';
      
      // change frame every 200ms
      if (timestamp - lastFrameTime > 200) {
        frame = (frame + 1) % 2; // flip between 0 and 1
        lastFrameTime = timestamp;
      }
      
      // choose correct sprite frame depending on direction
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          // moving right
          if (frame === 0) {
            oneko.style.backgroundPosition = "-96px 0px"; 
          } else {
            oneko.style.backgroundPosition = "-96px -32px";
          }
        } else {
          // moving left
          if (frame === 0) {
            oneko.style.backgroundPosition = "-128px -64px"; 
          } else {
            oneko.style.backgroundPosition = "-128px -96px"; 
          }
        }
      } else {
        if (dy > 0) {
          // moving down
          if (frame === 0) {
            oneko.style.backgroundPosition = "-224px -64px"; 
          } else {
            oneko.style.backgroundPosition = "-192px -96px"; 
          }
        } else {
          // moving up
          if (frame === 0) {
            oneko.style.backgroundPosition = "-32px -96px"; 
          } else {
            oneko.style.backgroundPosition = "-32px -64px"; 
          }
        }
      }
    }
  } else {
    // idle frame for pausin
    oneko.style.backgroundPosition = "-224px -96px"; 
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);


