// wrapper for audio elements
var Audio = function(props) {
  this.channels = []
  this.activeChannel = null;
  this.playType = this.choiseSource();
  // extend from props, just in case
  for (var field in props) {
    if (props.hasOwnProperty(field)) {
      this[field] = props[field];
    }
  }
}

// mp3 and ogg give maximum coverage
Audio.prototype.choiseSource = function() {
  var testAudio = document.createElement('audio');
  if (testAudio.canPlayType('audio/mpeg'))
    return 'mp3';
  if (testAudio.canPlayType('audio/ogg'))
    return 'ogg';
  if (testAudio.canPlayType('audio/wav'))
    return 'wav';
  return '';
}

Audio.prototype.addChannel = function(src) {
  var newChannel = document.createElement('audio');
  newChannel.setAttribute('src', src);
  this.channels.push(newChannel);
}

Audio.prototype.play = function(channel) {
  this.channels[channel].play();
}

Audio.prototype.pause = function(channel) {
  this.channels[channel].pause();
}

Audio.prototype.mute = function(channel) {
  this.channels[channel].volume = 0;
}

Audio.prototype.muteAll = function() {
  for (var i=0; i<this.channels.length; i++) {
    this.mute(i);
  }
}

Audio.prototype.unmute = function(channel) {
  this.channels[channel].volume = 1;
}


var timeToElement = function (audio, element) {
  // this one should be changed to remove from listeners
  audio.addEventListener("timeupdate", function() {
    element.innerHTML = audio.currentTime;
  });
}

var InfoTable = function(audio) {
  var table = document.createElement('table');
  table.width = '100%';
  for (var i = 0; i < audio.channels.length; i++) {
    var tr = document.createElement('tr');

    var tdName = document.createElement('td');
    tdName.innerHTML = audio.channels[i].getAttribute('src');
    tr.appendChild(tdName);

    var tdTime = document.createElement('td');
    tdTime.innerHTML = '0.00';
    timeToElement(audio.channels[i], tdTime);
    tr.appendChild(tdTime);

    var tdCtrl = document.createElement('td');

    var play = document.createElement('button');
    play.innerHTML = 'play';
    play.addEventListener('click', (function (channel) {
      return function() {
        audio.play(channel);
      }
    })(i));
    tr.appendChild(play);

    var pause = document.createElement('button');
    pause.innerHTML = 'pause';
    pause.addEventListener('click', (function (channel) {
      return function() {
        audio.pause(channel);
      }
    })(i));
    tr.appendChild(pause);

    var unmute = document.createElement('button');
    unmute.innerHTML = 'only this';
    unmute.addEventListener('click', (function (channel) {
      return function() {
        audio.muteAll();
        audio.unmute(channel);
      }
    })(i));
    tr.appendChild(unmute);

    table.appendChild(tr);
  }
  document.body.appendChild(table);
}

var audio = new Audio();
audio.addChannel('audio/1.wav');
audio.addChannel('audio/2.wav');
audio.addChannel('audio/3.wav');
audio.addChannel('audio/4.wav');

var table = new InfoTable(audio);
