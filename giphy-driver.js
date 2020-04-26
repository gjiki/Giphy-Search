export class GiphyDriver {
    constructor(url, key) {
        this._url = url;
        this._key = key;
    }

    getGifs(searchOrTrend, searchValue) {
        let giphyAPI;
        if (searchOrTrend) {
            giphyAPI = this._url + "q=" + searchValue + "&api_key=" + this._key;
        } else {
            giphyAPI = this._url + "&api_key=" + this._key;
        }

        fetch(giphyAPI)
            .then(response => {
                return response.json();
            })
            .then(json => {
                let gifsDiv = document.getElementById("gifs-div");
                for (let i = 0; i < json.data.length; i++) {
                    const curUrl = json.data[i].images.original.url;
                    const width = json.data[i].images.fixed_height_small_still.width;

                    let gifDivItem = document.createElement("div");
                    gifDivItem.setAttribute("class", "gif-div-item");

                    let imgDiv = document.createElement("div");
                    imgDiv.innerHTML = "Rating: " + json.data[i].rating;
                    imgDiv.setAttribute('class', 'rating');

                    gifDivItem.innerHTML = '<img src="' + curUrl + '">';
                    gifDivItem.appendChild(imgDiv);
                    gifDivItem.style = "width:" + width + ";";
                    gifsDiv.appendChild(gifDivItem);
                }
            })
            .catch(err => console.log(err));
    }
}