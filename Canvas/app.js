const canvas = document.querySelector('#draw');
// grab the context of the canvas
const ctx = canvas.getContext('2d');
// set size for the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// blend mode 
// ctx.globalCompositeOperation ='multiply';
// click down: true; click up, out: false
let isDrawing = false; 
// where to start and end the line
let lastX = 0; 
let lastY = 0;
let hue = 0;
let direction = true;


function draw(e) {
    // stop a function form running when they are not moused down
    if(!isDrawing) return; 

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    //start from
    ctx.moveTo(lastX, lastY);
    //go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    //update lastX, lastY
    // lastX = e.offsetX;
    // lastY = e.offsetY;
    [lastX, lastY] = [e.offsetX, e.offsetY]; // destructuring and array
    hue++;
    if(hue >= 350) {
        hue = 0;
    }

    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if(direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

// events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
// update lastX, lastY to not start at 0 and not draw one continuous line
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

