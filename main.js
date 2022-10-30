let spinner;
let newQuoteButton;
let twitterButton;
const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

window.onload = function () {
  newQuoteButton = document.querySelector("#js-new-quote");
  newQuoteButton.addEventListener("click", getQuote);
  spinner = document.querySelector("#js-spinner");
  twitterButton = document.querySelector("#js-tweet");
  getQuote();
};

async function getQuote() {
  // Remove 'hidden' class on spinner
  spinner.classList.remove("hidden");
  // Disable quote button
  newQuoteButton.disabled = true;

  try {
    const response = await fetch(endpoint);
    // If response isn't 200 OK
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    displayQuote(json.message);
    setTweetButton(json.message);
  } catch {
    alert("Failed to fetch new quote");
  } finally {
    // Enable quote button
    newQuoteButton.disabled = false;
    // Add "hidden" class back to spinner
    spinner.classList.add("hidden");
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector("#js-quote-text");
  quoteText.textContent = quote;
}

function setTweetButton(quote) {
  twitterButton.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - Donald Trump`
  );
}
