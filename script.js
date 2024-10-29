const API_URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json"

const quoteContainer = document.querySelector("#qoute-container")
const quoteElement = document.querySelector("#quote")
const quoteAuthor = document.getElementById("author")
const twitterBtn = document.querySelector("#twitter")
const generateQuoteBtn = document.querySelector("#generate-quote")
const spinnerElement = document.querySelector(".loader")

const getJSON = async function (url) {
    try {
        showSpinner()
        const response = await fetch(url)
        if (!response) throw new Error("Fetching Data failed")
        
        const data = response.json()
        return data
    } catch (err) {
        throw err
    }
}

const showSpinner = function () {
    spinnerElement.hidden = false
    quoteContainer.hidden = true
}

const hideSpinner = function () {
    spinnerElement.hidden = true
    quoteContainer.hidden = false
}


const getQuotes = async function () {
    try {
        const quotes = await getJSON(API_URL)
        
        generateRandomQuote(quotes)
        hideSpinner()
    }catch (err) {
        console.log(err.message)
    }
}


const generateRandomQuote = function  (quote) {
    const randomQuote = quote[Math.floor(Math.random() * quote.length)]
    const {author, text} = randomQuote

    if(!author) quoteAuthor.textContent = "Anonnymous"
    else quoteAuthor.textContent = author

    if (text.length > 50) quoteElement.classList.add("long-quote")
    else quoteElement.classList.remove("long-quote")

    quoteElement.textContent = text

}

const tweetQuote = function () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteElement.textContent} - ${quoteAuthor.textContent}`
    window.open(twitterUrl, "_blank")
}
getQuotes()
// Onload
twitterBtn.addEventListener("click", tweetQuote)
generateQuoteBtn.addEventListener("click", getQuotes)