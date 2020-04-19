const colors = [
  '#fff',
  '#b7a6bc',
  '#bfcaae',
  '#efb49f',
  '#ba9b28',
  '#406a5e',
  '#cb633d',
];

colors.forEach((color, index) => {
  const button = document.createElement('button');
  button.classList.add('color');
  button.innerHTML = '&nbsp;';
  button.style.background = color;
  if (index === 0) button.classList.add('selected');
  button.addEventListener('click', e => {
    deselectColors();
    e.target.classList.add('selected');
    ctx.strokeStyle = color;
  });
  document.querySelector('#controls').appendChild(button);
});


function deselectColors() {
  const colors = Array.from(document.querySelectorAll('.color'));
  colors.forEach(color => color.classList.remove('selected'));
}
