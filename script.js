function fetchRSSFeed() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS Proxy
    const feedUrl = 'https://depinhub.io/news/feed'; // RSS feed URL
    fetch(proxyUrl + feedUrl)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            const container = document.getElementById('rss-feed-widget');
            items.forEach(el => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${el.querySelector("title").textContent}</h2>
                    <p>${el.querySelector("description").textContent}</p>
                `;
                container.appendChild(postElement);
            });
        })
        .catch(err => console.error('Error fetching RSS feed:', err));
}

document.addEventListener('DOMContentLoaded', fetchRSSFeed);
