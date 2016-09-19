var audio = function() {
  this.channels = []
}

audio.prototype.addChannel = function(src) {

}
var channel1 = document.createElement('audio');
var channel2 = document.createElement('audio');
var channel3 = document.createElement('audio');
var channel4 = document.createElement('audio');

document.writeln(channel1.canPlayType('audio/mpeg'));
document.writeln(channel1.canPlayType('audio/ogg'));
document.writeln(channel1.canPlayType('audio/wav'));

if (channel1.canPlayType('audio/wav')) {
  channel1.setAttribute('src','audio/1.wav');
}

if (channel2.canPlayType('audio/wav')) {
  channel2.setAttribute('src','audio/2.wav');
}

if (channel3.canPlayType('audio/wav')) {
  channel3.setAttribute('src','audio/3.wav');
}

if (channel4.canPlayType('audio/wav')) {
  channel4.setAttribute('src','audio/4.wav');
}

channel1.play();
channel2.play();
channel3.play();
channel4.play();
