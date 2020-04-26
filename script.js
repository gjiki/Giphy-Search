const URL = "https://api.giphy.com/v1/gifs/search?";
const TRENDING_URL = "https://api.giphy.com/v1/gifs/trending?";
const KEY = "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB";
const DEFAULT_SEARCHS = ["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

function loadSearchs(history) {
    if (history != null) {
        let history_div = document.getElementById("history-div");
        for (let i = 0; i < history.length; i++) {
            addSearch(history[i]);
        }
    }
}

function addButton(searchValue) {
    addSearch(searchValue);
    addToStorage(searchValue);
}

function xButton(value, id) {
    removeSearch(id);
    removeFromStorage(value);
}

function addSearch(searchValue) {
    let history_div = document.getElementById("history-div");
    let div = document.createElement("div");
    div.setAttribute("class", "rel")
    div.setAttribute("id", "div-" + searchValue);
    history_div.appendChild(div);

    let btn = document.createElement("button");
    btn.innerHTML = searchValue;
    btn.setAttribute("class", "btn");
    btn.setAttribute("id", searchValue);
    div.appendChild(btn);

    let ind = DEFAULT_SEARCHS.indexOf(searchValue);
    if (ind < 0) {
        let x_btn = document.createElement("button");
        x_btn.setAttribute("class", "btn delete-button");
        x_btn.setAttribute("id", "x-" + searchValue);
        x_btn.addEventListener("click", function() {
            xButton(searchValue, "div-" + searchValue);
        }, false);
        x_btn.innerHTML = "x";
        div.appendChild(x_btn);
    }
}

function removeSearch(id) {
    let elem = document.getElementById(id);
    if (elem != null) {
        if (elem.parentNode != null) {
            elem.parentNode.removeChild(elem);
        }
    }
}

function addToStorage(searchValue) {
    let arr = null;
    if (JSON.parse(localStorage.getItem('history')) == null) {
        arr = [];
    } else arr = JSON.parse(localStorage.getItem('history'));

    arr = Array.from(arr);
    arr.push(searchValue);
    localStorage.setItem('history', JSON.stringify(arr));
}

function removeFromStorage(searchValue) {
    let arr = JSON.parse(localStorage.getItem('history'));
    if (arr != null) {
        arr = Array.from(arr);
        let ind = arr.indexOf(searchValue);
        arr.splice(ind, 1);
        localStorage.setItem('history', JSON.stringify(arr));
    }
}

function loadHistory() {
    let history_div = document.getElementById("history-div");
    history_div.innerHTML = "";

    let defaults = DEFAULT_SEARCHS;
    let history = JSON.parse(localStorage.getItem('history'));

    if (history != null) {
        history = Array.from(history);
        let full = defaults.concat(history);
        loadSearchs(full);
    } else {
        loadSearchs(defaults);
    }
}

function search(value) {
    let gifs_div = document.getElementById("gifs-div");
    gifs_div.innerHTML = "";
    if (value == "search") {
        let searchValue = document.getElementById("search-input").value;
        addButton(searchValue);
        getGifs(true);
    } else {
        getGifs(false);
    }
}

window.onload = function() {
    // For debugging : localStorage.clear();
    loadHistory();
};

function getGifs(value) {
    let giphyAPI = "";
    if (value == true) {
        const searchValue = document.getElementById("search-input").value;
        giphyAPI = URL + "q=" + searchValue + "&api_key=" + KEY;
    } else {
        giphyAPI = TRENDING_URL + "&api_key=" + KEY;
    }

    fetch(giphyAPI)
        .then(response => {
            return response.json();
        })
        .then(json => {
            let gifsDiv = document.getElementById("gifs-div");
            for (let i = 0; i < json.data.length; i++) {
                let gifDiv = document.createElement("div");
                gifDiv.setAttribute("class", "gif-div-item");

                gifsDiv.appendChild(gifDiv);
                let curUrl = json.data[i].images.original.url;
                let width = json.data[i].images.fixed_height_small_still.width;

                gifDiv.innerHTML = '<img src="' + curUrl + '">';
                gifDiv.style = "width:" + width + ";";
            }
        })
        .catch(err => console.log(err));
}