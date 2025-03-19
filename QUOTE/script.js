const contents = document.getElementById("content");


function fetchQuote() {
    contents.innerHTML = "";


fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
.then((res) => res.json())
.then((data) => {
    const quote = data.data;

    // Create quote text
    const quoteP = document.createElement("p");
    quoteP.textContent = `“${quote.content}”`;
    contents.appendChild(quoteP);

    // Create author text
    const author = document.createElement("p");
    author.textContent = `- ${quote.author}`;
    contents.appendChild(author);

    // Create Copy Button
    const copyButton = document.createElement("button");
    copyButton.textContent = "COPY ";
    
    copyButton.addEventListener("click", () => {
        const fullText = `${quoteP.textContent} ${author.textContent}`;

        // Copy text to clipboard
        navigator.clipboard.writeText(fullText).then(() => {
            alert("Quote copied successfully");
        }).catch((err) => {
            console.error("Error copying text: ", err);
        });
    });

    contents.appendChild(copyButton);

    //new quote

   const refreshButton = document.createElement("button");
   refreshButton.id = "refreshButton";
   refreshButton.textContent = "🔄";
   refreshButton.addEventListener("click", fetchQuote);
   contents.appendChild(refreshButton);

   const twitterButton = document.createElement("button");
    twitterButton.textContent = "Twitter"; 
    twitterButton.addEventListener("click", () => {
        const tweetText = encodeURIComponent(`"${quote.content}" - ${quote.author}`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
        window.open(twitterUrl, "_blank");})

    contents.appendChild(twitterButton)
})
.catch((e) => {
    console.log("API connection error:", e);
});
}
fetchQuote()
