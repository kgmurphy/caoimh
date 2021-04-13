let root = document.documentElement;
let cells = document.querySelectorAll('.wrap');
let myWidth;
let myHeight;
let multiplier = 0;

let tw;
let th;
let ah;
let aw;
let ar;
let pa;
let pt;


var stats = function(){
for(var i = 0; i < cells.length; i++){
  var widthSpan        = cells[i].querySelector('.widthSpan');
  var heightSpan       = cells[i].querySelector('.heightSpan');
  var aspectSpan       = cells[i].querySelector('.aspectSpan');
  var availWidthSpan   = cells[i].querySelector('.availWidthSpan');
  var availHeightSpan  = cells[i].querySelector('.availHeightSpan');
  var paddingFactor    = cells[i].querySelector('.paddingFactor');
  var paddingSize      = cells[i].querySelector('.paddingSize');
  var paddingTopFactor = cells[i].querySelector('.paddingTopFactor');
  var paddingTopSize   = cells[i].querySelector('.paddingTopSize');


let paddy = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding'), 10);
let paddy_factor = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding-factor'), 10);
    myWidth = parseInt(cells[i].offsetWidth, 10);
    myHeight = parseInt(cells[i].offsetHeight, 10);
    
    widthSpan.innerHTML = '<span class="deets">Tile total width&nbsp;  = </span>' + ' '  + myWidth + 'px' + ' ' ;
    heightSpan.innerHTML = '<span class="deets">Tile total height  = </span>' + ' ' +  myHeight + 'px' + ' ' ;

    availWidthSpan.innerHTML    = '<span class="deets">Available width&nbsp; &nbsp;= </span>';
    availHeightSpan.innerHTML   = '<span class="deets">Available height&nbsp; = </span>';
    availWidthSpan.innerHTML   += myWidth - (paddy*4) + 'px' ;
    availHeightSpan.innerHTML  += myHeight - (paddy*6) + 'px' ;
    

    aspectSpan.innerHTML        = '<span class="deets">Height/Width aspect ratio = </span>';
    aspectSpan.innerHTML       += myWidth/myHeight;

    paddingFactor.innerHTML     = '<span class="deets">Padding left, right and bottom &nbsp;(%) = </span>';
    paddingSize.innerHTML       = '<span class="deets">Padding left, right and bottom (px) = </span>';
    paddingFactor.innerHTML    += paddy_factor + '%';
    paddingSize.innerHTML      += parseInt(myWidth/100 * paddy_factor) + 'px';

    paddingTopFactor.innerHTML  = '<span class="deets">Padding top &nbsp;(%) &nbsp;= </span>';
    paddingTopSize.innerHTML    = '<span class="deets">Padding top (px) &nbsp;= </span>';
    paddingTopFactor.innerHTML += paddy_factor * 2 + '%';
    paddingTopSize.innerHTML   += parseInt(myWidth/100 * (paddy_factor * 2)) + 'px';
    


ah = myHeight - (paddy*6) + 'px' ;
aw = myWidth - (paddy*4) + 'px' ;
ar = myWidth/myHeight;
pa = parseInt(myWidth/100 * paddy_factor) + 'px';
pt = parseInt(myWidth/100 * (paddy_factor * 2)) + 'px';
    root.style.setProperty('--padding', (myWidth/100 * paddy_factor) / 2 + 'px');

    console.log(
      'Actual tile width:', tw,'\n',
      'Actual tile height:', th,'\n',
      'Available width:', aw,'\n',
      'Avalaible height:', ah,'\n',
      'Aspect ratio:', ar,'\n', 
      'Padding L,R,B:', pa,'\n',
      'Padding T:', pt,'\n',
      );


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
padding_percent: 2
};


const pane = new Tweakpane({
title: 'Instrument test lab',
container: document.getElementById('result'),
});

// Gap
pane.addInput(PARAMS, 'padding_percent', {
step: 1,min: 0,max: 10,
}).on('change', (value) => {
root.style.setProperty('--padding-factor', value + 'px');
stats();
});

pane.addInput(PARAMS, 'title_size', {
step: 1,min: 12,max: 32,
}).on('change', (value) => {
root.style.setProperty('--title', value + 'px');
});
