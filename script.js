const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    fetch("http://localhost:3000/artists") // Busca todos os artistas
        .then(response => response.json())
        .then(result => {
            // Aplicar filtro manualmente no JavaScript
            const filteredResults = result.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            displayResults(filteredResults);
        })
        .catch(error => console.error("Erro ao buscar artistas:", error));
}


function displayResults(result) {
    resultPlaylist.classList.add("hidden");

    // Limpar resultados anteriores
    resultArtist.innerHTML = ''; 

    if (result.length === 0) {
        resultArtist.innerHTML = `<p>Nenhum artista encontrado.</p>`;
        return;
    }

    result.forEach(element => {
        // Criar um elemento apenas para artistas que correspondem à pesquisa
        const artistContainer = document.createElement('div');
        artistContainer.classList.add('artist-card');

        const artistName = document.createElement('p');
        artistName.innerText = element.name;

        const artistImage = document.createElement('img');
        artistImage.src = element.urlImg;
        artistImage.alt = `Imagem de ${element.name}`;
        artistImage.style.width = '100px';

        // Adicionar evento de hover para mostrar o play button
        artistContainer.addEventListener('mouseenter', function() {
            const playButton = artistContainer.querySelector('.play');
            playButton.style.opacity = '1';
            playButton.style.transform = 'translateY(-20px)';
        });

        artistContainer.addEventListener('mouseleave', function() {
            const playButton = artistContainer.querySelector('.play');
            playButton.style.opacity = '0';
            playButton.style.transform = 'translateY(0)';
        });

        // Criação do botão de play
        const playButton = document.createElement('div');
        playButton.classList.add('play');
        const playIcon = document.createElement('i');
        playIcon.classList.add('fa', 'fa-play');
        playButton.appendChild(playIcon);
        artistContainer.appendChild(playButton);

        artistContainer.appendChild(artistImage);
        artistContainer.appendChild(artistName);

        resultArtist.appendChild(artistContainer);
    });

    resultArtist.classList.remove('hidden');
}



document.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log("Termo pesquisado:", searchTerm); // Verifica o termo pesquisado

    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        resultArtist.innerHTML = ''; // Limpar a área de resultados
        return;
    }

    requestApi(searchTerm);
});

