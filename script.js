import * as CONFIG from "./config.js";
import { GiphyDriver } from "./giphy-driver.js";

function loadSearchs(history) {
    if (history != null) {
        let history_div = document.getElementById("history-div");
        for (let i = 0; i < history.length; i++) {
            addSearch(history[i]);
        }
    }
}

function addButton(searchValue) {
    let arr = JSON.parse(localStorage.getItem('history'));
    if (arr == null) arr = [];
    arr = Array.from(arr);
    let ind = arr.indexOf(searchValue);

    if (ind < 0) {
        addSearch(searchValue);
        addToStorage(searchValue);
    }
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
    btn.addEventListener("click", function() {
        searchButtonClick(searchValue);
    }, false);

    btn.setAttribute("id", searchValue);
    div.appendChild(btn);

    let ind = CONFIG.DEFAULT_SEARCHS.indexOf(searchValue);
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
    elem.parentNode.removeChild(elem);
}

function addToStorage(searchValue) {
    let arr = JSON.parse(localStorage.getItem('history'));
    if (arr == null) arr = [];
    arr = Array.from(arr);
    arr.push(searchValue);
    localStorage.setItem('history', JSON.stringify(arr));
}

function removeFromStorage(searchValue) {
    let arr = JSON.parse(localStorage.getItem('history'));
    if (arr == null) arr = [];
    arr = Array.from(arr);
    let ind = arr.indexOf(searchValue);
    arr.splice(ind, 1);
    localStorage.setItem('history', JSON.stringify(arr));
}

function loadHistory() {
    let history_div = document.getElementById("history-div");
    history_div.innerHTML = "";

    let defaults = CONFIG.DEFAULT_SEARCHS;
    let history = JSON.parse(localStorage.getItem('history'));
    if (history == null) history = [];

    history = Array.from(history);
    let full = defaults.concat(history);
    loadSearchs(full);

    let searchInputValue = document.getElementById("submit-btn");
    searchInputValue.addEventListener("click", function() {
        searchInput();
    }, false);

    let searchTrend = document.getElementById("trend-btn");
    searchTrend.addEventListener("click", function() {
        searchTrends();
    }, false);
}

function searchInput() {
    let gifs_div = document.getElementById("gifs-div");
    gifs_div.innerHTML = "";
    const searchValue = document.getElementById("search-input").value;
    addButton(searchValue);
    let g = new GiphyDriver(CONFIG.URL, CONFIG.KEY);
    g.getGifs(true, searchValue);
}

function searchTrends() {
    let gifs_div = document.getElementById("gifs-div");
    gifs_div.innerHTML = "";
    let g = new GiphyDriver(CONFIG.TRENDING_URL, CONFIG.KEY);
    g.getGifs(false, " ");
}

function searchButtonClick(searchValue) {
    let gifs_div = document.getElementById("gifs-div");
    gifs_div.innerHTML = "";
    let g = new GiphyDriver(CONFIG.URL, CONFIG.KEY);
    g.getGifs(true, searchValue);
}

window.onload = function() {
    // For debugging : localStorage.clear();
    loadHistory();
}