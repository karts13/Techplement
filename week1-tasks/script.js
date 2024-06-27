const quote = document.getElementById('quote'),
      author = document.getElementById('author'),
      generate = document.getElementById('generate');

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

randomQuote();
generate.addEventListener('click', randomQuote);
