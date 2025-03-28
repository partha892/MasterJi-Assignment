const markdownInput = document.getElementById("markdown-input");
const preview = document.getElementById("preview");
const clearBtn = document.getElementById("clear-btn");

// Convert Markdown to HTML in real-time
markdownInput.addEventListener("input", () => {
    preview.innerHTML = marked.parse(markdownInput.value);
});

// Clear Button Functionality
clearBtn.addEventListener("click", () => {
    markdownInput.value = "";
    preview.innerHTML = "";
});
