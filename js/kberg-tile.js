let root = document.documentElement;
let cells = document.querySelectorAll('.wrap');
let myWidth;
let myHeight;
let one_pc;


var stats = function(){
for(var i = 0; i < cells.length; i++)
    {
    var widthSpan        = cells[i].querySelector('.widthSpan');
    var heightSpan       = cells[i].querySelector('.heightSpan');
    var aspectSpan       = cells[i].querySelector('.aspectSpan');
    var availWidthSpan   = cells[i].querySelector('.availWidthSpan');
    var availHeightSpan  = cells[i].querySelector('.availHeightSpan');
    var paddingFactor    = cells[i].querySelector('.paddingFactor');
    var paddingSize      = cells[i].querySelector('.paddingSize');
    var paddingTopFactor = cells[i].querySelector('.paddingTopFactor');
    var paddingTopSize   = cells[i].querySelector('.paddingTopSize');
    var infoWrap         = cells[i].querySelector('.infoWrap');
    

    let paddy = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding'), 10);
    let paddy_factor = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding-factor'), 10);
    let multy = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--multiplier'), 10);
    let multy_top = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--multiplier-top'), 10);
    myWidth   = cells[i].offsetWidth, 10;
    myHeight  = cells[i].offsetHeight, 10;

    one_pc = myHeight/100 * multy;
    top_pc = myHeight/100 * multy_top;

    root.style.setProperty('--padding', one_pc + 'px');
    root.style.setProperty('--padding-top', top_pc + 'px');

    widthSpan.innerHTML         = '<span class="deets">Tile width &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = </span>' +  myWidth + 'px';
    heightSpan.innerHTML        = '<span class="deets">Tile height &nbsp;&nbsp;&nbsp;&nbsp; = </span>' +  myHeight + 'px';
    aspectSpan.innerHTML        = '<span class="deets">Aspect ratio &nbsp;&nbsp;&nbsp; = </span>';
    aspectSpan.innerHTML       += myWidth/myHeight;



    availWidthSpan.innerHTML    = '<span class="deets">Available width&nbsp; = </span>';
    availHeightSpan.innerHTML   = '<span class="deets">Available height = </span>';
    availWidthSpan.innerHTML   += myWidth - one_pc * 2 + 'px' ;
    availHeightSpan.innerHTML  += myHeight - (one_pc + top_pc) + 'px' ;
    paddingSize.innerHTML       = '<span class="deets">Padding lrb (px) = </span>' + one_pc + 'px';
    paddingTopSize.innerHTML    = '<span class="deets">Padding top (px) = </span>' + top_pc + 'px';
    }
}


stats();

// Setup a timer
var timeout;
// Listen for resize events
window.addEventListener('resize', function () {
// If there's a timer, cancel it
if (timeout) {
window.cancelAnimationFrame(timeout);
}
// Setup the new requestAnimationFrame()
timeout = window.requestAnimationFrame(function () {
// Run our scroll functions
stats();
});

}, false);

// RANDOM BG's


var classes = [ 'bg-echo', 'bg-ap', 'bg-magcomp', 'bg-throttle' ]; // the classes you want to add


// TWEAKPANE

const PARAMS = {
title_size: 0,
padding_multiplier: 4,
padding_multiplier_top: 8,
show_deets: false,
show_bgs: false,
show_title_padding: false,
show_tile_padding: false,
};

const pane = new Tweakpane({
title: 'Instrument test lab',
container: document.getElementById('result'),
});

pane.addInput(PARAMS, 'padding_multiplier', {
step: 1,min: 0,max: 10,
}).on('change', (value) => {
root.style.setProperty('--multiplier', value);
stats();
});

pane.addInput(PARAMS, 'padding_multiplier_top', {
step: 1,min: 0,max: 10,
}).on('change', (value) => {
root.style.setProperty('--multiplier-top', value);
stats();
});

pane.addInput(PARAMS, 'title_size', {
step: 1,min: 10,max: 32,
}).on('change', (value) => {
root.style.setProperty('--title', value + 'px');
});

pane.addInput(PARAMS, 'show_deets').on('change', (boolean) => {
    let deets = document.querySelectorAll('.infoWrap_deets');
    for(var i = 0; i < deets.length; i++){
        if (boolean){
            deets[i].style.setProperty('visibility', 'visible');
          } else {
            deets[i].style.setProperty('visibility', 'hidden');
          }        
    }
});

let infoWraps = document.querySelectorAll('.infoWrap');
pane.addInput(PARAMS, 'show_bgs').on('change', (boolean) => {
    
    
    for(var i = 0; i < infoWraps.length; i++){
        let randomClass = classes[ Math.floor( Math.random()*classes.length ) ] ;
        if (boolean){
            infoWraps[i].classList.add('infoWrap_bg');
            
            infoWraps[i].classList.add(randomClass);
            console.log(randomClass);
            
          } else {
            //infoWraps[i].classList.remove(randomClass);
            infoWraps[i].setAttribute("class", "");
            infoWraps[i].classList.add('infoWrap');
        }
    }
});

pane.addInput(PARAMS, 'show_title_padding').on('change', (boolean) => {
    let titlebars = document.querySelectorAll('.titleBar');
    for(var i = 0; i < titlebars.length; i++){
        if (boolean){
            titlebars[i].classList.add('green-hatch');
          } else {
            titlebars[i].classList.remove('green-hatch');
          }        
    }
});

pane.addInput(PARAMS, 'show_tile_padding').on('change', (boolean) => {
    let tiles = document.querySelectorAll('.wrap');
    for(var i = 0; i < tiles.length; i++){
        if (boolean){
            tiles[i].classList.add('blue-hatch');
          } else {
            tiles[i].classList.remove('blue-hatch');
          }        
    }
});
