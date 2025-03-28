const booksdata = document.getElementById("book-body");
const search = document.getElementById("input");
const titleAtoZ = document.getElementById("A-Z");
const titleZtoA = document.getElementById("Z-A");
const filternew = document.getElementById("NEW");
const filterold = document.getElementById("OLD");
const grid = document.getElementById("grid");
const list = document.getElementById("non-grid");

let data = []; // Global book data storage

// Fetch books from API
fetch("https://api.freeapi.app/api/v1/public/books")
  .then((res) => res.json())
  .then((datas) => {
    data = datas.data.data; // Store fetched data globally
    displayBooks(data);
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });

// Function to display books
function displayBooks(bookList) {
  booksdata.innerHTML = ""; // Clear previous results
  bookList.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("grid-viewd"); // Default class    
  
    // Title
    const title = document.createElement("p");
    title.innerHTML = book.volumeInfo.title;

    // Author
    const author = document.createElement("p");
    author.innerHTML = book.volumeInfo.authors?.join(", ") || "Unknown";

    // Publisher
    const publisher = document.createElement("p");
    publisher.innerHTML = book.volumeInfo.publisher || "N/A";

    // Published Date
    const publishedDate = document.createElement("p");
    publishedDate.innerHTML = book.volumeInfo.publishedDate || "N/A";

    // Thumbnail
    const thumbnail = document.createElement("img");
    thumbnail.src = book.volumeInfo.imageLinks?.thumbnail || "default-thumbnail.jpg";
    thumbnail.alt = book.volumeInfo.title;

    // Read More Link
    const link = document.createElement("a");
    link.href = book.volumeInfo.canonicalVolumeLink;
    link.target = "_blank";
    link.innerHTML = "Read More";

    // Append elements to book card
    div.appendChild(thumbnail);
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(publisher);
    div.appendChild(publishedDate);
    div.appendChild(link);

    booksdata.appendChild(div);
  });
}

// Search functionality (by title or author)
search.addEventListener("input", () => {
    const searchText = search.value.toLowerCase();
    
    const filteredData = data.filter((book) => {
      const titleMatch = book.volumeInfo.title?.toLowerCase().includes(searchText);
      const authorMatch = book.volumeInfo.authors?.some(author => author.toLowerCase().includes(searchText));
      return titleMatch || authorMatch; // Match either title or author
    });
  
    displayBooks(filteredData);
  }); 

    // Toggle between Grid and List view
grid.addEventListener("click", () => {
  booksdata.classList.remove("list-view");
  booksdata.classList.add("grid-view");
});

list.addEventListener("click", () => {
  booksdata.classList.remove("grid-view");
  booksdata.classList.add("list-view");
});


  // Sort A-Z
titleAtoZ.addEventListener("click", () => {
  const sortedData = [...data].sort((a, b) => {
      return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
  });
  displayBooks(sortedData);
});

// Sort Z-A
titleZtoA.addEventListener("click", () => {
  const sortedData = [...data].sort((a, b) => {
      return b.volumeInfo.title.localeCompare(a.volumeInfo.title);
  });
  displayBooks(sortedData);
});

// Sort New to Old (by published date)
filternew.addEventListener("click", () => {
  const sortedData = [...data].sort((a, b) => {
      return new Date(b.volumeInfo.publishedDate || "0000-00-00") - new Date(a.volumeInfo.publishedDate || "0000-00-00");
  });
  displayBooks(sortedData);
});

// Sort Old to New (by published date)
filterold.addEventListener("click", () => {
  const sortedData = [...data].sort((a, b) => {
      return new Date(a.volumeInfo.publishedDate || "0000-00-00") - new Date(b.volumeInfo.publishedDate || "0000-00-00");
  });
  displayBooks(sortedData);
});





