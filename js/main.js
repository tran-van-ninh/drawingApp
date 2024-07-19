window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

let color = $('#color');
let eraser = $('#eraser');
let decrease = $('#decrease');
let sizeElement = $('#size');
let increase = $('#increase');
let save = $('#save');
let clear = $('#clear');
let canvas = $('#canvas');
let ctx = canvas.getContext("2d");


let pos1 = {
    x: 0,
    y: 0
}
let pos2 = {
    x: 0,
    y: 0
}
let size = 5;
let isDrawing = false;
let colorPaint = '#000';

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientWidth * 1 / 2;
sizeElement.innerText = size;
document.addEventListener('mousedown' ,function(e) {
    pos1 = {
        x: e.clientX,
        y: e.clientY
    }
    isDrawing = true;
})

document.addEventListener('mousemove' ,function(e) {
    if(isDrawing){
        pos2 = {
            x: e.clientX,
            y: e.clientY
        }

        //! fill nét vẽ
        ctx.beginPath();
        ctx.arc(pos1.x, pos1.y, size, 0, 2 * Math.PI);
        ctx.fillStyle = colorPaint;
        ctx.fill();

        //! Vẽ outline
        ctx.beginPath();
        ctx.moveTo(pos1.x,pos1.y);
        ctx.lineTo(pos2.x,pos2.y);
        ctx.strokeStyle = colorPaint;
        ctx.lineWidth = size*2;
        ctx.stroke();

        pos1.x = pos2.x;
        pos1.y = pos2.y;
    }
})

document.addEventListener("mouseup" , function(e){
    isDrawing = false
})

color.addEventListener("change", function(e){
    colorPaint = e.target.value;
})

eraser.addEventListener("click", function(e){
    colorPaint = "#fff";
})

decrease.addEventListener("click", function(e){
    size -= 5;
    size = size > 5 ? size : 5;
    sizeElement.innerText = size;
});

increase.addEventListener("click" , function(e){
    size += 5;
    size = size < 30 ? size : 30;
    sizeElement.innerText = size;
})

clear.addEventListener('click', function(e){
    let canvasStart = canvas.getClientRects();
    console.log(canvasStart);
    let clearCanvas = ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener("click", function(e){
    // let link = document.createElement('a');
    // link.download = 'drawing.png';
    // link.href = canvas.toDataURL('image/png');
    // link.click();
    var output = canvas.toDataURL('image/jpg').replace("image/jpg", "image/octet-stream");
    save.setAttribute('href', output);
    
});