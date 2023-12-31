let searchBtnEl = document.getElementById('searchButton');
let searchInputEl = document.getElementById('searchInput');
let resultContainerEl = document.getElementById('resultContainer');

var date = new Date().getTime();

// const superHeroApi = "6892054020806695";
let timestamp = "1691453170698";
const apikey = "20e00c1407fc4a0bb65638f058fde679";
const hashValue = "54b9b99a9e2badca952f126a7e14540e";

function saveToLocalStorage(data) {
    localStorage.setItem('marvelCharacter', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('marvelCharacter');
    if (savedData) {
        return JSON.parse(savedData);
    }
    return null;
}


function marvelSearch() {
    searchInputEl.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
            event.preventDefault();
        }
    });

    searchBtnEl.addEventListener('click', function(event) {
        performSearch();
        event.preventDefault();
    });

    function performSearch() {
        let requesturl = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&name=${searchInputEl.value}`;

        fetch(requesturl)
            .then(function(response) {
                return response.json();
            })
            .then(function(marvalData) {
                console.log(marvalData)
                if (marvalData.data.results.length > 0) {
                    const marvelCharName = marvalData.data.results[0].name;
                    const marvelCharDescipt = marvalData.data.results[0].description;
                    const marvelPic = marvalData.data.results[0].thumbnail.path + ".jpg"

                    console.log('mp', marvelPic);

                    let marvelPicture = document.createElement('img');
                    marvelPicture.src = marvelPic;
                    resultContainerEl.appendChild(marvelPicture);

                    let marvelName = document.createElement('p');
                    marvelName.textContent = marvelCharName;
                    resultContainerEl.appendChild(marvelName);

                    let marvelDescContainer = document.createElement('div');
                    marvelDescContainer.classList.add('desc-container');

                    let marvelDesc = document.createElement('p');
                    marvelDesc.classList.add('desc')
                    if (marvelCharDescipt.length > 0) {
                        marvelDesc.textContent = marvelCharDescipt;
                    } else {
                        marvelDesc.textContent = "Description coming soon";
                    }
                    marvelDescContainer.appendChild(marvelDesc);
                    resultContainerEl.appendChild(marvelDescContainer);

                    saveToLocalStorage({
                        name: marvelCharName,
                        description: marvelCharDescipt,
                        image: marvelPic
                    });
                    
                } else {
                resultContainerEl.textContent = "Character not in Marvel API database";
                }

                searchInputEl.value = '';
            });
        clearSearch();
    }
}

function clearSearch() {
    resultContainerEl.textContent = '';
}

function initSavedData() {
    const savedData = loadFromLocalStorage();
    if (savedData) {
        const marvelPicture = document.createElement('img');
        marvelPicture.src = savedData.image;
        resultContainerEl.appendChild(marvelPicture);

        const marvelName = document.createElement('p');
        marvelName.textContent = savedData.name;
        resultContainerEl.appendChild(marvelName);

        const marvelDescContainer = document.createElement('div');
        marvelDescContainer.classList.add('desc-container');

        const marvelDesc = document.createElement('p');
        marvelDesc.classList.add('desc');
        marvelDesc.textContent = savedData.description;
        marvelDescContainer.appendChild(marvelDesc);
        resultContainerEl.appendChild(marvelDescContainer);
    }
}

initSavedData();

marvelSearch();
