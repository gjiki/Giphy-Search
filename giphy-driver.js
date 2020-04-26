import * as CONFIG from "./config.js";

export class GiphyDriver {
    constructor(url, key) {
        this._url = url;
        this._key = key;
    }

    getGifs() {
        const searchValue = document.getElementById("search-input").value;
        const giphyAPI = CONFIG.URL + "q=" + searchValue + "&api_key=" + CONFIG.KEY;

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
}