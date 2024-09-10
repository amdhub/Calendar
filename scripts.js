// script.js
const readings = {
    '2024-09-10': 'John 3:16, Romans 8:28',
    '2024-09-11': 'Psalm 23, Proverbs 3:5-6',
    '2024-09-12': 'Genesis 1:1, Matthew 5:3-12',
};

let currentMonth = new Date().getMonth(); // Current month
let currentYear = new Date().getFullYear(); // Current year
let today = new Date().getDate(); // Today's date

const calendar = document.getElementById('calendar');
const readingOutput = document.getElementById('bible-reading');
const selectedDateOutput = document.getElementById('selected-date');
const monthYearDisplay = document.getElementById('month-year');

// Navigation buttons
document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    generateCalendar(currentMonth, currentYear);
});

function generateCalendar(month, year) {
    calendar.innerHTML = ''; // Clear previous calendar content

    const firstDay = new Date(year, month, 1).getDay(); // First day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    // Create empty placeholders for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement('div');
        blankDay.className = 'calendar-day empty';
        calendar.appendChild(blankDay);
    }

    // Generate day elements for the calendar
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = date.toISOString().split('T')[0];

        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // Highlight today's date
        if (year === new Date().getFullYear() && month === new Date().getMonth() && day === today) {
            dayElement.classList.add('selected');
            selectedDateOutput.textContent = dateString;
            readingOutput.textContent = readings[dateString] || 'No reading assigned for today.';
        }

        // Event listener for day clicks
        dayElement.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(e => e.classList.remove('selected'));
            dayElement.classList.add('selected');

            selectedDateOutput.textContent = dateString;
            readingOutput.textContent = readings[dateString] || 'No reading assigned for this day.';
        };

        calendar.appendChild(dayElement);
    }
}

// Initialize the calendar
generateCalendar(currentMonth, currentYear);
