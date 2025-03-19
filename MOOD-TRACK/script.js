document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calender");
    const moodButtons = document.querySelectorAll(".mood");
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); 
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate(); 

    let calendarHTML = `<h2>${monthNames[currentMonth]} ${currentYear}</h2>`;
    calendarHTML += `<div class="calendar-grid">`;

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let day of weekdays) {
        calendarHTML += `<div class="weekday">${day}</div>`;
    }

    for (let i = 0; i < firstDay; i++) {
        calendarHTML += `<div class="empty"></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {
        let storedMood = localStorage.getItem(`${currentYear}-${currentMonth + 1}-${day}`) || "";
        let todayClass = day === today.getDate() ? "today" : "";
        calendarHTML += `<div class="day ${todayClass}" data-day="${day}">${storedMood || day}</div>`;
    }

    calendarHTML += `</div>`;
    calendarContainer.innerHTML = calendarHTML;

    moodButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedMood = this.innerHTML;
            const currentDay = today.getDate();
            const moodKey = `${currentYear}-${currentMonth + 1}-${currentDay}`;
            const storedMood = localStorage.getItem(moodKey);

            if (!storedMood) { // Only allow setting a mood if it hasn't been set
                localStorage.setItem(moodKey, selectedMood);
                const dayElement = document.querySelector(`.day[data-day="${currentDay}"]`);
                if (dayElement) dayElement.innerHTML = selectedMood;
            } else {
                alert("You have already selected a mood for today. You can't change it!");
            }
        });
    });
});
