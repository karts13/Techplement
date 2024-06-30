document.addEventListener("DOMContentLoaded", function() {
    const quote = document.getElementById('quote'),
          author = document.getElementById('author'),
          searchButton = document.getElementById('search'),
          searchInput = document.getElementById('search-author');

    function randomQuote() {
        fetch('https://type.fit/api/quotes')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.length);
            quote.textContent = data[randomIndex].text;
            author.textContent = `-- ${data[randomIndex].author}`;
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
        });
    }

    function searchQuote() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        fetch('https://type.fit/api/quotes')
        .then(response => response.json())
        .then(data => {
            const filteredQuotes = data.filter(q => q.author && q.author.toLowerCase().includes(searchTerm));

            if (filteredQuotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
                quote.textContent = filteredQuotes[randomIndex].text;
                author.textContent = `-- ${filteredQuotes[randomIndex].author}`;
            } else {
                quote.textContent = "No quotes found for this author.";
                author.textContent = "";
            }
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
        });
    }

    randomQuote();
    searchButton.addEventListener('click', searchQuote);

    // Add Hammer.js swipe detection
    const quoteWrapper = document.querySelector('.quote-wrapper');
    const hammer = new Hammer(quoteWrapper);

    hammer.on('swipeleft swiperight', function() {
        randomQuote();
    });
});
