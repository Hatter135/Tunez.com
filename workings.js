
//loading folder structure and files
console.log('Initializing folder loading process...');

const videoFolder = 'folders/videos/';
const tracksFolder = 'folders/tracks/';

// placeholder will be assigned after DOM is ready
let placeholder = null;
let smretrovideo = null;
let smtechnovideo = null;
let hotcarvideo = null;

let volumeRestoreText = '';
let volumeRestoreTimeout = null;

function setVolume(value) {
    const vol = value / 200;
    techno.volume = vol;
    retro.volume = vol;
    hotcar.volume = vol;

    const info = document.getElementById('trackinfo');
    const volumeValue = document.getElementById('volume-value');
    if (info && !volumeRestoreTimeout) {
        volumeRestoreText = info.textContent;
    }
    if (info) {
        info.textContent = 'Volume: ' + value + '%';
    }
    if (volumeValue) {
        volumeValue.textContent = value + '%';
    }

    clearTimeout(volumeRestoreTimeout);
    volumeRestoreTimeout = setTimeout(() => {
        if (info) {
            info.textContent = volumeRestoreText;
        }
        volumeRestoreTimeout = null;
    }, 1500);
}
document.addEventListener('DOMContentLoaded', () => {
    placeholder = document.getElementById('placeholder');
    smretrovideo = document.getElementById('smretrovideo');
    smtechnovideo = document.getElementById('smtechnovideo');
    hotcarvideo = document.getElementById('hotcarvideo');
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function () {
            setVolume(this.value);
        });
        setVolume(volumeSlider.value);
    }
});

console.log('Loading all tracks...');
console.log('Loading techno...');
let techno = new Audio(`${tracksFolder}Techno-Enhanced.mp3`);

console.log('Loading retro...');
let retro = new Audio(`${tracksFolder}Retro-Enhanced.mp3`);

console.log('Loading hot car...');
let hotcar = new Audio(`${tracksFolder}Hot-Car.mp3`);

console.log('All tracks loaded successfully!');

console.log('Folder loading process completed successfully!');
//loading folder structure and files completed successfully!

//set default loaded tack as none
console.log('Setting default loaded track to none...');
let trackLoaded = 'none';
let trackstopped = 'true';

//function to hide all videos
function hideallvideos() {
    if (placeholder) placeholder.style.display = 'none';
    if (smretrovideo) smretrovideo.style.display = 'none';
    if (smtechnovideo) smtechnovideo.style.display = 'none';
    if (hotcarvideo) hotcarvideo.style.display = 'none';
    
}

function pauseallvideos() {
    if (smretrovideo) smretrovideo.pause();
    if (smtechnovideo) smtechnovideo.pause();
    if (hotcarvideo) hotcarvideo.pause();
}

function resetbuttoncolors() {
    document.getElementById('techno-button').style.backgroundColor = '';
    document.getElementById('retro-button').style.backgroundColor = '';
    document.getElementById('hotcar-button').style.backgroundColor = '';
    document.getElementById('rock-button').style.backgroundColor = '';
}

function resetallvideos() {
    if (smretrovideo) {
        smretrovideo.currentTime = 0;
        smretrovideo.pause();
    }
    if (smtechnovideo) {
        smtechnovideo.currentTime = 0;
        smtechnovideo.pause();
    }
    if (hotcarvideo) {
        hotcarvideo.currentTime = 0;
        hotcarvideo.pause();
    }
}

// function if tree code to load tracks
console.log('Defining function to load Techno track...');
function stopalltracks() {
    techno.pause();
    retro.pause();
    hotcar.pause();
    pauseallvideos();
    if (trackstopped === "true") {
        document.getElementById('trackinfo').textContent = 'Track already stopped!';
    }
    else if (trackLoaded === 'none') {
        document.getElementById('trackinfo').textContent = 'No track loaded!';
        if (placeholder) placeholder.style.display = 'block';
    }
    else if (trackstopped === 'false') {
        document.getElementById('trackinfo').textContent = 'Track stopped';
        trackstopped = 'true';
    }

}
//allowing the user to reset all tracks to the beginning
function resetalltracks() {

    techno.pause();
    retro.pause();
    hotcar.pause();

    resetallvideos();

    techno.currentTime = 0;
    retro.currentTime = 0;
    hotcar.currentTime = 0;

    document.getElementById('trackinfo').textContent = 'track reset';
}

function unloadtrack() {
    resetbuttoncolors();
    stopalltracks();
    trackLoaded = 'none';
    document.getElementById('trackinfo').textContent = 'Track unloaded';
    hideallvideos();
    if (placeholder) placeholder.style.display = 'block';
}

function load_Retro() {
    trackLoaded = 'retro';
    document.getElementById('trackinfo').textContent = 'Retro track loaded';
    resetbuttoncolors();
    document.getElementById('retro-button').style.backgroundColor = 'blue';
    hideallvideos();
    if (smretrovideo) {
        smretrovideo.style.display = 'block';
        smretrovideo.currentTime = 0;
        smretrovideo.pause();
    }
}

function load_Techno() {
    trackLoaded = 'techno';
    document.getElementById('trackinfo').textContent = 'Techno track loaded';
    resetbuttoncolors();
    document.getElementById('techno-button').style.backgroundColor = 'blue';
    hideallvideos();
    if (smtechnovideo) {
        smtechnovideo.style.display = 'block';
        smtechnovideo.currentTime = 0;
        smtechnovideo.pause();
    }
}

function load_Hot_Car() {
    trackLoaded = 'hotcar';
    document.getElementById('trackinfo').textContent = 'Hot Car track loaded';
    resetbuttoncolors();
    document.getElementById('hotcar-button').style.backgroundColor = 'blue';
    hideallvideos();
    if (placeholder) placeholder.style.display = 'block';
    if (hotcarvideo) {
        hotcarvideo.style.display = 'block';
        hotcarvideo.currentTime = 0;
        hotcarvideo.pause();
    }
}

function load_Rock() {
    trackLoaded = 'none';
    hideallvideos();
    if (placeholder) placeholder.style.display = 'block';
    document.getElementById('trackinfo').textContent = 'Rock track not available yet';
}
// function code to load techno track

//main function to play the loaded track
function playtrack(){

    stopalltracks();

    if (trackLoaded === 'techno') {
        techno.play();
        trackstopped = 'false';
        document.getElementById('trackinfo').textContent = 'Now playing: Techno';
        hideallvideos();
        if (smtechnovideo) {
        smtechnovideo.style.display = 'block';
        smtechnovideo.play();
        }

    }

    else if (trackLoaded === 'retro') {
        retro.play();
        document.getElementById('trackinfo').textContent = 'Now playing: Retro';
        if (placeholder) placeholder.style.display = 'none';
        if (smretrovideo) {
        smretrovideo.style.display = 'block';
        smretrovideo.play();
        }
    }

    else if (trackLoaded === 'hotcar') {
        hotcar.play();
        document.getElementById('trackinfo').textContent = 'Now playing: Hot Car';
        if (placeholder) placeholder.style.display = 'none';
        if (hotcarvideo) {
            hotcarvideo.style.display = 'block';
            hotcarvideo.play();
        }
    }

    else if (trackLoaded === 'none') {
        document.getElementById('trackinfo').textContent = 'No track loaded!';
        if (placeholder) placeholder.style.display = 'block';
    }
}


console.log('Functions defined successfully.' );

console.log("All tracks stopped and reset successfully!");

console.log('Your ready to go, play ahead!');
//all checks completed successfully, all functions defined successfully, all tracks loaded successfully, and all videos loaded successfully!