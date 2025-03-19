const videoContainer = document.getElementById("youtubeData");
const searchInput = document.getElementById("search");

let allVideos = []; // Store fetched data globally

// Fetch YouTube videos from API
fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
    .then((res) => res.json())
    .then((obj) => {
        allVideos = obj.data.data; // Store data globally
        displayVideos(allVideos); // Initial display
    })
    .catch((e) => {
        console.log(`Your fetch error is: ${e}`);
    });

// Function to display videos
function displayVideos(videos) {
    videoContainer.innerHTML = ""; // Clear previous videos

    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");

        const videoLink = document.createElement("a");
        videoLink.href = `https://www.youtube.com/watch?v=${video.items.id}`;
        videoLink.target = "_blank"; // Open in new tab

        const thumbnail = document.createElement("img");
        thumbnail.src = video.items.snippet.thumbnails.maxres.url ;
        thumbnail.alt = "Video Thumbnail";

        const title = document.createElement("p");
        title.innerText = video.items.snippet.title;

        const description = document.createElement("p");
        description.innerText = video.items.snippet.channelTitle;

        videoLink.appendChild(thumbnail);
        videoLink.appendChild(title);
        videoLink.appendChild(description);
        videoCard.appendChild(videoLink);
        videoContainer.appendChild(videoCard);
    });
}

// Search functionality
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredVideos = allVideos.filter(video =>
        video.items.snippet.title.toLowerCase().includes(searchText)
    );
    displayVideos(filteredVideos);
});
