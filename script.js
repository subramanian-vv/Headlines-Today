const api = {
    token: '6bf4c1c35c1c5fa3dec7b8c910377ed8',
    baseURL: 'https://gnews.io/api/v4/top-headlines?'
}

let country = document.getElementById('country').value;
let language = document.getElementById('lang').value;
const newsBody = document.getElementById('news');

//Function to fetch data from API
function fetchData() {
    fetch(`${api.baseURL}country=${country}&lang=${language}&token=${api.token}`)
        .then(function(news) {
            return news.json();
        }).then(displayNews);
}

//Function to display the headlines
function displayNews(news) {
    if(news.articles.length == 0) {
        newsBody.innerHTML = `<h3 class="text-center"> No news found! </h3>`
    } else {
        for(let i = 0; i < news.articles.length; i++) {
            newsBody.innerHTML
            += `<div class="card mt-4 mb-4">
            <div class="card-header" id="title"> ${i+1}) ${news.articles[i].title} </div>
            <div class="card-body">
                <div class="card-title float-right"> 
                    <img src="${news.articles[i].image}" id="img" width="200" height="200" draggable="false" alt="Image not found">
                </div>
                <div class="card-title" id="desc"> <span> Description: </span> ${news.articles[i].description} </div>
                <a href="${news.articles[i].url}" target="_blank" id="link"> <span> Read more </span> </a>
            </div>
            <div class="card-footer">
                <div class="card-date float-right" id="pub"> <span> Source: </span> <a href="${news.articles[i].source.url}" target="_blank"> ${news.articles[i].source.name} </a> </div>
                <div class="card-date" id="date"> <span> Published at: </span> ${new Date(news.articles[i].publishedAt)} </div>
            </div>`
        }
    }
}

//Listening on pressing ENTER key
window.addEventListener('keyup', function(event) {
    
    if(event.keyCode == 13) {
        newsBody.innerHTML = '';
        country = document.getElementById('country').value;
        language = document.getElementById('lang').value;
        fetchData();
    }

});

fetchData();