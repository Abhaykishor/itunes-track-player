const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audio-player');

searchButton.addEventListener('click', searchTracks);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchTracks();
    }
});

function searchTracks() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') return;

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=music&limit=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.results);
        })
        .catch(error => console.error('Error:', error));
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    results.forEach(track => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${track.artworkUrl100}" alt="${track.trackName} cover" width="50">
            <span>${track.trackName}</span> - <span>${track.artistName}</span>
        `;
        li.addEventListener('click', () => addToPlaylist(track));
        searchResults.appendChild(li);
    });
}

function addToPlaylist(track) {
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${track.artworkUrl100}" alt="${track.trackName} cover" width="50">
        <span>${track.trackName}</span> - <span>${track.artistName}</span>
    `;
    li.addEventListener('click', () => playTrack(track));
    playlist.appendChild(li);
}

function playTrack(track) {
    audioPlayer.src = track.previewUrl;
    audioPlayer.play();
}