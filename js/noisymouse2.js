$(document).ready(function(){

  var winWidth = $(window).width();
  var winHeight = $(window).height();

  // new noise generators without band js
  var audio = new window.webkitAudioContext(),
  position = 0,
  scale = {
    a: 200,
    b: 800,
    c: 1400
  },
  song = "ccbbaaccbbaa";

  setInterval(play, 1000 / 16);

  function createOscillator(freq) {
    var 
    attack = mouseY,
    decay = mouseY,
    gain = audio.createGain(),
    osc = audio.createOscillator();

    gain.connect(audio.destination);
    gain.gain.setValueAtTime(0, audio.currentTime);
    gain.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 500);
    gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 100);

    osc.frequency.value = freq;
    osc.type = "square";
    osc.connect(gain);
    osc.start(0);

    setTimeout(function() {
      osc.stop(0);
      osc.disconnect(gain);
      gain.disconnect(audio.destination);
    }, decay)
  }

  function play() {
    var 
    note = song.charAt(position),
    freq = ((mouseX) / 2);
    position += 1;
    if(position >= song.length) {
        position = 0;
    }
    if(freq) {
        createOscillator(freq);
    }
  }


  // and colour grid
  var colourSize = (winWidth + winHeight) / 256

  // play notes according to mouseposition
  $(document).mousemove(function( mousey ) {
    // get and show the mouse position
    mouseX = mousey.pageX
    mouseY = mousey.pageY
    $( "#coords-x" ).text(mouseX);
    $( "#coords-y" ).text(mouseY);
    play();

    // make pretty colours
    colourVal = Math.floor((mouseX + mouseY) / colourSize);
    $('body').css('background-color', 'rgb(' + colourVal + ',' + (256 - colourVal) + ',' + 255 + ')');
    console.log(colourVal);
  });
});