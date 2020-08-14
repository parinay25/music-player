const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs =[
    {
        name: 'Nuvvunte Naa Jathagaa (Reprise)',
        displayName: 'Nuvvunte Naa Jathagaa',
        artist: 'A.R. Rahman, Issrath Quadhri, Sid Sriram',
    },
    {
        name:'jacinto-3',
        displayName:'GoodNight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name:'Poolane Kunukeyamantaa',
        displayName: 'Poolane Kunukeyamantaa',
        artist: 'A.R. Rahman, Haricharan, Shreya Ghoshal',
    },   
    {
        name: 'let her go',
        displayName: 'Let Her Go - Passenger',
        artist: 'Passenger'
    },
    {
        name: 'Kailove Chedugudu',
        displayName: 'Kailove Chedugudu',
        artist: 'S.P. Balasubramanyam, Naveen, Charan',
    },
    {
        name: 'Memories',
        displayName: 'Maroon 5 - Memories',
        artist: 'Maroon 5',
    },
    {
        name: 'Makhna',
        displayName: 'Makhna - Drive',
        artist: 'Asees Kaur, Tanishk Bagchi, Yasser Desai',
    },
    {
        name: 'Chedkhaniyaan',
        displayName: 'Chedkhaniyaan',
        artist: 'Shankar–Ehsaan–Loy',
    },
    {
        name: 'I dont care',
        displayName: "I Don't Care",
        artist: 'Justin Bieber & Ed Sheeran',
    },
    {
        name: 'laal bindi',
        displayName: "Laal Bindi",
        artist: 'Akull',
    },
    {
        name: 'kaise hua',
        displayName: "Kaise Hua",
        artist: 'Vishal Mishra',
    },
    {
        name: 'tera ban jaunga',
        displayName: "Tera Ban Jaunga",
        artist: 'Tulsi Kumar, Akhil Sachdeva',
    },
    {
        name: 'taare ginn',
        displayName: "Taare Ginn - Dil Bechara",
        artist: 'A.R. Rahman, Mohit Chauhan, Shreya Ghoshal',
    },
    {
        name: 'chali gali chudu',
        displayName: "Chali Gaali Chuuduu",
        artist: 'Haricharan, Padmalatha, Malavika (U.S)',
    },
    {
        name: 'nuvvante na navvu',
        displayName: "Nuvvante Na Navvu",
        artist: 'Haricharan, Sinduri Vishal',
    },
    {
        name: 'wildest dreams',
        displayName: "Wildest Dreams",
        artist: 'Taylor Swift',
    },


];

// Check if Playing 
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
}

// Play or Pause event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// update DOM
function loadSong(song){
    title.textContent =song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

//Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
// On load - Select First Song
loadSong(songs[songIndex]);

//Update progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if( durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay Switching duration element to avoid Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if( currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent =`${currentMinutes}:${currentSeconds}`;
    }
}

// set progress Bar
function setProgressBar (e) {
    const width = this.clientWidth;
    console.log('width', width);
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;


}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);