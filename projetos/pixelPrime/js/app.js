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