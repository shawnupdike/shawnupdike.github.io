class LetterGlitch {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'.split('');
    this.colors = ['#64d6c7', '#5cdb94', '#00f5a3'];
    this.fontSize = 14;
    this.charWidth = 10;
    this.charHeight = 16;
    this.letters = [];
    this.lastTime = Date.now();

    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.animate();
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.canvas.width = width;
    this.canvas.height = height;

    this.columns = Math.floor(width / this.charWidth);
    this.rows = Math.floor(height / this.charHeight);

    const total = this.columns * this.rows;
    this.letters = Array.from({ length: total }, () => ({
      char: this.characters[Math.floor(Math.random() * this.characters.length)],
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    }));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = `${this.fontSize}px monospace`;
    this.ctx.textBaseline = "top";

    this.letters.forEach((l, i) => {
      const x = (i % this.columns) * this.charWidth;
      const y = Math.floor(i / this.columns) * this.charHeight;
      this.ctx.fillStyle = l.color;
      this.ctx.fillText(l.char, x, y);
    });
  }

  animate() {
    const now = Date.now();
    if (now - this.lastTime > 50) {
      this.letters.forEach(l => {
        if (Math.random() < 0.075) {
          l.char = this.characters[Math.floor(Math.random() * this.characters.length)];
          l.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        }
      });
      this.draw();
      this.lastTime = now;
    }
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize glitch background
new LetterGlitch(document.getElementById("glitch-canvas"));