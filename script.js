// Get DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// Show new Quote
const newQuote = () => {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if quote has author, if not pass in "Unknown"
  const defineAuthorName = (authorValue) => {
    const authorName = authorValue ? authorValue : "Unkown";
    return authorName;
  };

  // Send data to DOM
  authorText.textContent = defineAuthorName(quote.author);
  quoteText.textContent = quote.text;
};

// Get quotes from API
const getQuotes = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
};

// Run the getQuotes func on load
getQuotes();
