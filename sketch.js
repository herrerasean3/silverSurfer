var sound;

function preload(){
  //Loads an mp3 from the audio folder. Try out neets.mp3, robocop.mp3, run.mp3, shrek.mp3, surfer.mp3, or tamusic.mp3
  sound = loadSound('audio/robocop.mp3');
}

function setup() {
  createCanvas (1200, 720);
   fft = new p5.FFT();
 sound.amp(.5);
  sound.loop();
}

function draw() {
  // background
  background(0);
  var spectrum = fft.analyze();
  noStroke();
  fill(255); // spectrum is white
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
}