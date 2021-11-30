// Get DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Toggle loading spinner
const toggleLoadingSpinner = (state) => {
  loader.hidden = state === "show" ? false : true;
  quoteContainer.hidden = state === "show" ? true : false;
};

// Show new Quote
const newQuote = () => {
  toggleLoadingSpinner("show");
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
  toggleLoadingSpinner("hide");
};

// Get quotes from API
const getQuotes = async () => {
  toggleLoadingSpinner("show");
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
};

// Tweet quote

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Run the getQuotes func on load
getQuotes();
