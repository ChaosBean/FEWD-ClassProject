function Song(title, album, duration) {
    this.title = title;
    this.album = album;
    this.duration = duration;
    this.isPlaying = false;
}

Song.prototype.play = function() {
    this.isPlaying = true;
};

Song.prototype.stop = function() {
    this.isPlaying = false;
};

Song.prototype.toHTML = function() {
    var htmlString = '<li class="song';
    if(this.isPlaying) {
    htmlString += ' current';
    }
    htmlString += '">';
    htmlString += this.title;
    htmlString += ' - '
    htmlString += this.album;
    htmlString +=  '<span class="duration">'
    htmlString += this.duration;
    htmlString += '</span></li>';
    return htmlString;
};

function Playlist() {
    this.songs = [];
    this.nowPlayingIndex = 0;
}

Playlist.prototype.add = function(song) {
    this.songs.push(song);
};

Playlist.prototype.play = function() {
    var currentSong = this.songs[this.nowPlayingIndex];
    currentSong.play();
};

Playlist.prototype.stop = function() {
    var currentSong = this.songs[this.nowPlayingIndex];
    currentSong.stop();
};

Playlist.prototype.next = function() {
    this.stop();
    this.nowPlayingIndex++;
    if(this.nowPlayingIndex === this.songs.length) {
        this.nowPlayingIndex = 0;
    }

    this.play();
};

Playlist.prototype.renderInElement = function(list) {
    list.innerHTML = "";
    for(var i = 0; i < this.songs.length; i++) {
        list.innerHTML += this.songs[i].toHTML();

};
};


var playlist = new Playlist ();

var theMemoryMan = new Song("The Memory Man", "Hospital Museum", "3:26");
var rnrVison = new Song("Rnr Vison", "Memorial Day", "4:39");
var danielCraigFerguson = new Song("Daniel Craig Ferguson",  "Hospital Museum", "3:58");
var realEternity = new Song("Real Eternity", "Memorial Day", "3:26");

playlist.add(theMemoryMan);
playlist.add(rnrVison);
playlist.add(danielCraigFerguson);
playlist.add(realEternity);

var playlistElement = document.getElementById ("playlist");

playlist.renderInElement(playlistElement); 

var playButton = document.getElementById("play");
playButton.onclick = function(){
    playlist.play();
    playlist.renderInElement(playlistElement);
}

var nextButton = document.getElementById("next");
nextButton.onclick = function() {
    playlist.next();
    playlist.renderInElement(playlistElement);
}

var stopButton = document.getElementById("stop");
stopButton.onclick = function() {
    playlist.stop();
    playlist.renderInElement(playlistElement);
}

