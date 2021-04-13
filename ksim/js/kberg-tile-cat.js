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
    var availAspectSpan  = cells[i].querySelector('.availAspectSpan');
    
    

    let paddy = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding'), 10);
    let paddy_factor = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding-factor'), 10);
    let multy = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--multiplier'), 10);
    let multy_top = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--multiplier-top'), 10);
    myWidth   = cells[i].offsetWidth, 10;
    myHeight  = cells[i].offsetHeight, 10;

    one_pc = myWidth/100 * multy;

    one_pc_w = myWidth/100 * multy;
    one_pc_h = myHeight/100 * multy;

    top_pc = myWidth/100 * multy_top;

    root.style.setProperty('--padding', one_pc + 'px');
    root.style.setProperty('--padding-top', top_pc + 'px');


    root.style.setProperty('--padding-l-r', one_pc_w + 'px');
    root.style.setProperty('--padding-t-b', one_pc_h + 'px');

    widthSpan.innerHTML         = '<span class="deets">Tile width = </span>' +  myWidth + 'px';
    heightSpan.innerHTML        = '<span class="deets">Tile height = </span>' +  myHeight + 'px';
    aspectSpan.innerHTML        = '<span class="deets">Height/Width aspect ratio = </span>';
    aspectSpan.innerHTML       += myWidth/myHeight;



    availWidthSpan.innerHTML    = '<span class="deets">Available width&nbsp; &nbsp;= </span>';
    availHeightSpan.innerHTML   = '<span class="deets">Available height&nbsp; = </span>';
    availWidthSpan.innerHTML   += myWidth - one_pc * 2 + 'px' ;
    availHeightSpan.innerHTML  += myHeight - (one_pc + top_pc) + 'px' ;
    paddingSize.innerHTML       = '<span class="deets">Padding left & right (px) = </span>' + one_pc_w + 'px';
    paddingTopSize.innerHTML    = '<span class="deets">Padding top (px) &nbsp;= </span>' + one_pc_h + 'px';

/*
    availAspectSpan.innerHTML        = '<span class="deets">Available space aspect ratio = </span>';
    availAspectSpan.innerHTML       += (myWidth - one_pc * 2) / (myHeight - (one_pc + top_pc));
    */
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



// TWEAKPANE

const PARAMS = {
title_size: 0,
padding_multiplier: 0
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


pane.addInput(PARAMS, 'title_size', {
step: 1,min: 12,max: 32,
}).on('change', (value) => {
root.style.setProperty('--title', value + 'px');
});