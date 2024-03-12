// Define the URL of the Google Sheets document in CSV format
// const api_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQOZ5pT8riOQkdZwIAGNirQb26Lgvrffoq4MzXjUerfMJtwXFCSYemXkX-yd9o2zyD9Yksv2hqFPpsL/pub?output=csv";
const api_url = "https://docs.google.com/spreadsheets/d/1p4C70zedh8IlBMM66c2u1ElIZbH90Y9bwsE_q0hCTb4/pub?output=csv";

// Variables to store fetched data and processed arrays
let data;
const arr = [];
const arr1 = [];

// Async function to fetch data from the provided URL
async function getapi(url) {
    try {
        // Fetch data from the URL
        const response = await fetch(url);
        // Convert response to text
        data = await response.text();
        console.log(data);
        // Split data into lines
        const dataLines = data.split("\n");
        
        // Process each line of data
        dataLines.forEach(line => {
            // Split line by comma and store values in arrays
            const [value1, value2] = line.split(",");
            arr.push(value1);
            arr1.push(value2);
        });
        
        // Select elements with class name "cursor leaderboard-MentorPickname rg_5"
        // // const MentorPickElements = document.getElementsByClassName("cursor leaderboard-MentorPickname rg_5");
        // const leaderboardEntries = document.querySelectorAll('.mantine-1avyp1d > div');
        // if (!leaderboardEntries.length) {
        //     console.error('Leaderboard entries not found.');
        //     return;
        // }

        // // Iterate over MentorPick elements and update based on fetched data
        // Array.from(MentorPickElements).forEach((element, index) => {
        //     const hrefParts = element.href.split("/");
        //     const mentorPickId = hrefParts[hrefParts.length - 1];
        //     const foundIndex = arr1.indexOf(mentorPickId);

        //     if (foundIndex !== -1) {
        //         // MentorPick ID found, update element style and text
        //         element.style.color = "green";
        //         element.textContent = arr1[foundIndex];
        //     } else {
        //         // MentorPick ID not found, update element style and text
        //         element.style.color = "red";
        //         element.textContent = "...........";
        //     }
        // });

        // // Select elements with class name "row padding-small top bottom leaderboard-row"
        // const rowElements = document.getElementsByClassName("row padding-small top bottom leaderboard-row");

        // // Append extracted MentorPick IDs to row elements
        // Array.from(rowElements).forEach((element, index) => {
        //     const mentorPickId = arr[index] || "";
        //     const mentorPickIdElement = document.createElement("div");
        //     mentorPickIdElement.textContent = mentorPickId;
        //     element.appendChild(mentorPickIdElement);
        // });

        // // Remove class "rg_5" from all elements with class name "cursor leaderboard-MentorPickname rg_5"
        // Array.from(MentorPickElements).forEach(element => {
        //     element.classList.remove("rg_5");
        // });

        // Add the new column to the leaderboard
        addColumnToLeaderboard();
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

// Function to add a new column to the leaderboard
function addColumnToLeaderboard() {
    // Find all leaderboard entries
    const leaderboardEntries = document.querySelectorAll('#test-box > div.mantine-1avyp1d > div > div > div > div:nth-child(1)');
    console.log(leaderboardEntries);
    // if (!leaderboardEntries.length) {
    //     console.error('Leaderboard entries not found.');
    //     return;
    // }

    // Define the new column's properties
    const newColumnWidth = 100; // Width of the new column
    const newColumnContent = 'New Data'; // Content of the new column

    // Add the new column to each leaderboard entry
    leaderboardEntries.forEach(entry => {
        // Create a new div for the new column
        const newColumn = document.createElement('div');
        newColumn.style.position = 'absolute';
        newColumn.style.width = `${newColumnWidth}px`;
        newColumn.style.height = '80px';
        newColumn.style.border = '0.5px solid rgb(55, 58, 64)';
        newColumn.style.backgroundColor = 'rgb(26, 27, 30)';
        newColumn.style.display = 'flex';
        newColumn.style.alignItems = 'center';
        newColumn.style.justifyContent = 'center';
        newColumn.style.padding = '0.5em';
        newColumn.textContent = newColumnContent;

        // Calculate the new column's position
        const entryLeft = parseInt(entry.style.left, 10) || 0;
        const entryWidth = parseInt(entry.style.width, 10) || 0;
        newColumn.style.left = `${entryLeft + entryWidth + 10}px`; // Adjust the position as needed

        // Append the new column to the leaderboard entry
        entry.appendChild(newColumn);
    });
}


// Initial data fetch
getapi(api_url);

// Listen for changes in page URL
let currentPage = location.href;
setInterval(function() {
    if (currentPage !== location.href) {
        // Page URL has changed, fetch data again
        currentPage = location.href;
        getapi(api_url);
    }
}, 500);
