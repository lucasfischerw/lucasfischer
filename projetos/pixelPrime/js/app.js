var pixelsPerRow = 1000;
var pixelsPerColumn = 400;

var selectedPixels = 0;

const timer = ms => new Promise(res => setTimeout(res, ms));

window.onload = setTimeout(async function() {
    for(var i = 0; i < pixelsPerRow; i++) {
        var column = document.createElement('div');
        column.className = 'column';
        for(var j = 0; j < pixelsPerColumn; j++) {
            var pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.id = 'pixel-' + j + '-' + i;
            pixel.onclick = function() {
                if(this.classList.contains('active')) {
                    this.classList.remove('active');
                    selectedPixels--;
                } else {
                    this.classList.add('active');
                    selectedPixels++;
                }
                document.getElementById('selectedPixelsValue').innerText = selectedPixels;
                if(selectedPixels > 0) {
                    document.getElementById('buyPixels').style.display = 'block';
                    document.getElementById('absolute').style.height = '100px';
                } else {
                    document.getElementById('buyPixels').style.display = 'none';
                    document.getElementById('absolute').style.height = '60px';
                }
                var selectedPixelsArray = document.getElementsByClassName('active');
                var xCordinates = [];
                var yCordinates = [];

                for(var i = 0; i < selectedPixelsArray.length; i++) {
                    xCordinates.push(parseInt(selectedPixelsArray[i].id.split('-')[1]));
                    yCordinates.push(parseInt(selectedPixelsArray[i].id.split('-')[2]));
                }
                var startingX = Math.min(...xCordinates);
                var startingY = Math.min(...yCordinates);
                var endingX = Math.max(...xCordinates);
                var endingY = Math.max(...yCordinates);
                var incosistentPixels = false;
                for(var i = startingX; i <= endingX; i++) {
                    for(var j = startingY; j <= endingY; j++) {
                        if(!document.getElementById('pixel-' + i + '-' + j).classList.contains('active')) {
                            incosistentPixels = true;
                        }
                        //document.getElementById('pixel-' + i + '-' + j).style.background = '#c5c5c5';
                   }
                }
                if(incosistentPixels) {
                    document.getElementById('buyPixels').style.display = 'none';
                    //document.getElementById('absolute').style.height = '60px';
                    document.getElementById('inconsistente').style.display = 'block';
                } else {
                    document.getElementById('buyPixels').style.display = 'block';
                    document.getElementById('absolute').style.height = '100px';
                    document.getElementById('inconsistente').style.display = 'none';
                }
            };
            column.appendChild(pixel);
        }
        document.getElementById('pixel-canvas').appendChild(column);
        if(i > 500) {
            document.getElementById('content').style.display = 'block';
            document.getElementById('loader').style.display = 'none';
            await timer(20);
        } else {
            await timer(0.1);
        }
    }
}, 150);

var startingX = 0;
var startingY = 0;
var endingX = 0;
var endingY = 0;


function buyPixels() {
    var selectedPixels = document.getElementsByClassName('active');
    var xCordinates = [];
    var yCordinates = [];
    document.getElementById('buy-popup').style.display = 'flex';
    document.getElementById('content').style.filter = 'blur(5px)';
    for(var i = 0; i < selectedPixels.length; i++) {
        xCordinates.push(parseInt(selectedPixels[i].id.split('-')[1]));
        yCordinates.push(parseInt(selectedPixels[i].id.split('-')[2]));
    }
    startingX = Math.min(...xCordinates);
    startingY = Math.min(...yCordinates);
    endingX = Math.max(...xCordinates);
    endingY = Math.max(...yCordinates);
    startingY = document.getElementById('pixel-' + startingX + '-' + startingY).offsetTop;
    startingX = document.getElementById('pixel-' + startingX + '-' + startingY).offsetLeft;
    endingY = document.getElementById('pixel-' + endingX + '-' + endingY).offsetTop + 15;
    endingX = document.getElementById('pixel-' + endingX + '-' + endingY).offsetLeft + 15;
}

function preview() {
    document.getElementById('buy-popup').style.display = 'none';
    var image = document.createElement('img');
    image.classList.add('overlay-image');
    image.style.top = startingY + 'px';
    image.style.left = startingX + 'px';
    image.style.width = (endingX - startingX) + 'px';
    image.style.height = (endingY - startingY) + 'px';
    var files = document.getElementById('file').files;
        
    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            image.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }

    document.getElementById('pixel-canvas-container').appendChild(image);
    document.getElementById('content').style.filter = 'none';

    document.getElementById('buyPixels').innerHTML = 'Proceder ao Chekout';
}





let canvas = document.getElementById("pixel-canvas-container")
let ctx = canvas.getContext('2d')

let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
let cameraZoom = 5
let MAX_ZOOM = 5
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.0005

function draw()
{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
    ctx.translate( window.innerWidth / 2, window.innerHeight / 2 )
    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    //ctx.fillStyle = "#991111"
    //drawRect(-50,-50,100,100)
    
    //ctx.fillStyle = "#eecc77"
    //drawRect(-35,-35,20,20)
    //drawRect(15,-35,20,20)
    //drawRect(-35,15,70,20)
    
    //ctx.fillStyle = "#fff"
    //drawText("Simple Pan and Zoom Canvas", -255, -100, 32, "courier")
    
    //ctx.rotate(-31*Math.PI / 180)
    //ctx.fillStyle = `#${(Math.round(Date.now()/40)%4096).toString(16)}`
    //drawText("Now with touch!", -110, 100, 32, "courier")
    
   // ctx.fillStyle = "#fff"
    //ctx.rotate(31*Math.PI / 180)
    
   //drawText("Wow, you found me!", -260, -2000, 48, "courier")
    //
    requestAnimationFrame( draw )
}

// Gets the relevant location from a mouse or single touch event
function getEventLocation(e)
{
    if (e.touches && e.touches.length == 1)
    {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY)
    {
        return { x: e.clientX, y: e.clientY }        
    }
}

function drawRect(x, y, width, height)
{
    ctx.fillRect( x, y, width, height )
}

function drawText(text, x, y, size, font)
{
    ctx.font = `${size}px ${font}`
    ctx.fillText(text, x, y)
}

let isDragging = false
let dragStart = { x: 0, y: 0 }

function onPointerDown(e)
{
    isDragging = true
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
}

function onPointerUp(e)
{
    isDragging = false
    initialPinchDistance = null
    lastZoom = cameraZoom
}

function onPointerMove(e)
{
    if (isDragging)
    {
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
    }
}

function handleTouch(e, singleTouchHandler)
{
    if ( e.touches.length == 1 )
    {
        singleTouchHandler(e)
    }
    else if (e.type == "touchmove" && e.touches.length == 2)
    {
        isDragging = false
        handlePinch(e)
    }
}

let initialPinchDistance = null
let lastZoom = cameraZoom

function handlePinch(e)
{
    e.preventDefault()
    
    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
    
    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2
    
    if (initialPinchDistance == null)
    {
        initialPinchDistance = currentDistance
    }
    else
    {
        adjustZoom( null, currentDistance/initialPinchDistance )
    }
}

function adjustZoom(zoomAmount, zoomFactor)
{
    if (!isDragging)
    {
        if (zoomAmount)
        {
            cameraZoom += zoomAmount
        }
        else if (zoomFactor)
        {
            console.log(zoomFactor)
            cameraZoom = zoomFactor*lastZoom
        }
        
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM )
        
        console.log(zoomAmount)
    }
}

canvas.addEventListener('mousedown', onPointerDown)
canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
canvas.addEventListener('mouseup', onPointerUp)
canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
canvas.addEventListener('mousemove', onPointerMove)
canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))
