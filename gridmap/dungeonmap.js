var canvas = document.getElementById("dungeon_map");
var ctx    = canvas.getContext("2d");
var width  = 50;
var height = 50;
var Nx     =  8;
var Ny     =  8;

// Define sprites
var samusAran = {
   active : false,
   sprite : new Image(),
   width  : 40,
   height : 40,
   posX   : 1,
   posY   : 1
}
samusAran.sprite.src = "samus.png";
var pikachu = {
   active : false,
   sprite : new Image(),
   width  : 40,
   height : 40,
   posX   : 3,
   posY   : 3
}
pikachu.sprite.src = "pikachu.png";


var sprites = [];
sprites[0] = samusAran;
sprites[1] = pikachu;

function selectSprite() {
   character = parseInt(document.getElementById("character").value);
   console.log(character);
   return character ;
}

// Mouse control
canvas.addEventListener('mousedown', function(e) {
   var mouseXY  = mousePosition(canvas, e);
   var spriteXY = crByPosition(mouseXY.x, mouseXY.y);
   var N        = selectSprite();
   var sprite   = sprites[N];
   if (sprite.active) {
      ctx.clearRect(sprite.posX, sprite.posY, sprite.width, sprite.height);
   }
   ctx.drawImage(sprite.sprite, 0, 0, 40, 40,  spriteXY.x + 3, spriteXY.y + 3, 40, 40);
   sprites[N].posX   = spriteXY.x + 3;
   sprites[N].posY   = spriteXY.y + 3;
   sprites[N].active = true;
}, false);
function mousePosition(canvas, e) {
   var rect = canvas.getBoundingClientRect();
   return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
   };
}

// Grid definition + drawing
function defineGrid() {
   Nx     = document.getElementById("nx").value
   Ny     = document.getElementById("ny").value
   rectangles = [];
   for (c=0; c < Nx; c++) {
      rectangles[c] = [];
      for (r=0; r<Ny; r++) {
         rectangles[c][r] = { 
            x:0, y:0, 
            xfin: 0, yfin: 0 };
      }
   }
}

function drawRectangles() {
   for (c=0; c < Nx; c++) {
      for (r=0; r<Ny; r++) {
         var recX = (c*(width)) ;
         var recY = (r*(height));
         rectangles[c][r].x = recX;
         rectangles[c][r].y = recY;
         rectangles[c][r].xfin = recX + width
         rectangles[c][r].yfin = recY + height
         ctx.beginPath();
         ctx.rect(recX, recY, width, height);
         ctx.stroke();
         ctx.closePath();
      }
   }
}

// Find rectangle by position
function crByPosition(x, y) {
   for (c=0; c < Nx; c++) {
      refX = rectangles[c][0].xfin;
      if ( x < refX ) {
         for (r=0; r < Ny; r++) {
            refY = rectangles[c][r].yfin;
            if( y < refY) {
               break;
            }
         }
         break;
      }
   }
   console.log("Rectangle: " + c + "," + r);
   return {
      x: rectangles[c][r].x,
      y: rectangles[c][r].y
   };
}



// Draw the grid
function draw() {
   console.log("call function draw");
   defineGrid();
   ctx.clearRect( 0, 0, canvas.width, canvas.height);
   drawRectangles();
}

console.log("script: %o", document.getElementById("dungeon_map"));
draw();

