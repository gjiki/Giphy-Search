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

    let defaults = CONFIG.DEFAULT_SEARCHS;
    let history = JSON.parse(localStorage.getItem('history'));

    if (history != null) {
        history = Array.from(history);
        let full = defaults.concat(history);
        loadSearchs(full);
    } else {
        loadSearchs(defaults);
    }
}

function search() {
    let g = new GiphyDriver();
    g.getGifs();
}

loadHistory();

/*
<input type="button" onclick="search()" class="btn submit-btn" value="Submit">
<input type="button" onclick="search()" class="btn trending-btn" value="See what 's trending">
*/