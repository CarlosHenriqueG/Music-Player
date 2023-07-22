let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let curr_track = document.createElement("audio");

let track_index = 0;
let updateTimer;
let isPlaying = false

let music_list = [
  {
    music:
      "./songs/Cartoon - Why We Lose (feat. Coleman Trapp) [NCS Release].mp3",
    name: "Cartoon - Why We Lose",
    artist: "Cartoon",
  },
  {
    music: "./songs/Senndy - Ironicamente (Official Music Vídeo).mp3",
    name: "Senndy - Ironicamente",
    artist: "Senndy",
  },
  {
    music: "./songs/Tz da Coronel - Alma (Prod. Ariel Donato).mp3",
    name: "Tz da Coronel - Alma",
    artist: "Tz da Coronel",
  },
  {
    music: "./songs/Disfigure - Blank [NCS Release].mp3",
    name: "Disfigure - Blank",
    artist: "Disfigure",
  },
  {
    music: "./songs/Janji - Heroes Tonight (feat. Johnning) [NCS Release].mp3",
    name: "Janji - Heroes Tonight (feat. Johnning)",
    artist: "Janji",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
 isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true
  playpause_btn.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false
  playpause_btn.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
}

function nextTrack() {
  if (track_index < music_list.length - 1) {
    track_index += 1;
    playpause_btn.innerHTML = '<ion-icon name="play-circle-outline"></ion-icon>';
  } else if (track_index < music_list.length - 1) {
    track_index = 0;
  }

  loadTrack(track_index);
  playTrack();

}

function prevTrack() {
  if(track_index > 0) {
    track_index -= 1
    playpause_btn.innerHTML = '<ion-icon name="play-circle-outline"></ion-icon>';
  }else {
    track_index = music_list.length -1;

  }
  loadTrack(track_index)
  playTrack()
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100)
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0

  if(!isNaN(curr_track.duration)){
    seekPosition = curr_track.currentTime * (100 / curr_track.duration)
    seek_slider.value = seekPosition

    let currentMinutes = Math.floor(curr_track.currentTime / 60)
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60)
    let durationMinutes = Math.floor(curr_track.duration / 60)
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60)


    if(currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds
    }
    if(durationSeconds <10) {
      durationSeconds = "0" + durationSeconds
    }
    if(currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes
    }
    if(durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes
    }


    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;



  }
}