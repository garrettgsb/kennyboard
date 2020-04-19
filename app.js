const multiCanvas = document.querySelector('#multicanvas');

const canvas = document.querySelector('#canvas-main');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const ctx = canvas.getContext('2d');


const previewCanvas = document.querySelector('#canvas-preview');
previewCanvas.width = previewCanvas.clientWidth;
previewCanvas.height = previewCanvas.clientHeight;
const pCtx = previewCanvas.getContext('2d');
pCtx.strokeStyle = '#faa';
pCtx.setLineDash([5,5]);



const tools = [
  new Pen(ctx, pCtx, document.querySelector('#pen-button')),
  new Line(ctx, pCtx, document.querySelector('#line-button')),
  new Rect(ctx, pCtx, document.querySelector('#rect-button')),
];

let selectedTool = tools[0];

tools.forEach(tool => tool.button.addEventListener('click', selectTool));

let drawing = false;

const canvasEventHandlers = {
  mousedown: e => { drawing = true; selectedTool.startDrawing(e); },
  mouseup: e => { drawing = false; selectedTool.stopDrawing(e); },
  mousemove: e => { if (drawing) selectedTool.draw(e); },
};

Object.entries(canvasEventHandlers).forEach(([event, handler]) => {
  multiCanvas.addEventListener(event, handler);
});

function selectTool(e) {
  tools.forEach(tool => {
    if (e.target === tool.button) {
      tool.select();
      selectedTool = tool;
    } else {
      tool.deselect();
    }
  });
}
