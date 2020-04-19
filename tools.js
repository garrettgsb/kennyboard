class Tool {
  constructor(ctx, pCtx, button) {
    this.ctx = ctx;
    this.pCtx = pCtx;
    this.button = button;
  }

  select() {
    this.button.classList.add('selected');
  }

  deselect() {
    this.button.classList.remove('selected');
  }

  startDrawing() {}
  stopDrawing() {}
  draw() {}
  clearPreview() { this.pCtx.clearRect(0, 0, this.pCtx.canvas.width, this.pCtx.canvas.height); }
}

class Pen extends Tool {
  startDrawing() {
    this.ctx.beginPath();
  }

  stopDrawing() {
    this.ctx.stroke();
    this.ctx.closePath();
  }

  draw(e) {
    this.ctx.lineTo(e.layerX, e.layerY);
    this.ctx.stroke();
  }
}

class Line extends Tool {

  startDrawing(e) {
    this.shapeStart = { x: e.layerX, y: e.layerY };
    this.ctx.beginPath();
    this.ctx.moveTo(e.layerX, e.layerY);
  }

  stopDrawing(e) {
    this.ctx.lineTo(e.layerX, e.layerY);
    this.ctx.stroke();
    this.ctx.closePath();
    this.clearPreview();
  }

  draw(e) {
    this.clearPreview();
    this.pCtx.beginPath();
    this.pCtx.moveTo(this.shapeStart.x, this.shapeStart.y);
    this.pCtx.lineTo(e.layerX, e.layerY);
    this.pCtx.stroke();
    this.pCtx.closePath();
  }
}

class Rect extends Tool {

  startDrawing(e) {
    this.shapeStart = { x: e.layerX, y: e.layerY };
    this.ctx.beginPath();
  }

  stopDrawing(e) {
    const topLeft = { x: Math.min(this.shapeStart.x, e.layerX), y: Math.min(this.shapeStart.y, e.layerY) };
    const bottomRight = { x: Math.max(this.shapeStart.x, e.layerX), y: Math.max(this.shapeStart.y, e.layerY) };
    const size = { x: bottomRight.x - topLeft.x, y: bottomRight.y - topLeft.y };
    this.ctx.strokeRect(topLeft.x, topLeft.y, size.x, size.y);
    this.ctx.closePath();
    this.clearPreview();
  }

  draw(e) {
    this.clearPreview();
    const topLeft = { x: Math.min(this.shapeStart.x, e.layerX), y: Math.min(this.shapeStart.y, e.layerY) };
    const bottomRight = { x: Math.max(this.shapeStart.x, e.layerX), y: Math.max(this.shapeStart.y, e.layerY) };
    const size = { x: bottomRight.x - topLeft.x, y: bottomRight.y - topLeft.y };
    this.pCtx.strokeRect(topLeft.x, topLeft.y, size.x, size.y);
    this.pCtx.closePath();
  }
}
