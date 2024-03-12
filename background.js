// Define the URL of the Google Sheets document in CSV format
const api_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQOZ5pT8riOQkdZwIAGNirQb26Lgvrffoq4MzXjUerfMJtwXFCSYemXkX-yd9o2zyD9Yksv2hqFPpsL/pub?output=csv";

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
        
        // Split data into lines
        const dataLines = data.split("\n");
        
        // Process each line of data
        dataLines.forEach(line => {
            // Split line by comma and store values in arrays
            const [value1, value2] = line.split(",");
            arr.push(value1);
            arr1.push(value2);
        });
        
        // Select elements with class name "cursor leaderboard-hackername rg_5"
        const hackerElements = document.getElementsByClassName("cursor leaderboard-hackername rg_5");

        // Iterate over hacker elements and update based on fetched data
        Array.from(hackerElements).forEach((element, index) => {
            const hrefParts = element.href.split("/");
            const hackerId = hrefParts[hrefParts.length - 1];
            const foundIndex = arr1.indexOf(hackerId);

            if (foundIndex !== -1) {
                // Hacker ID found, update element style and text
                element.style.color = "green";
                element.textContent = arr1[foundIndex];
            } else {
                // Hacker ID not found, update element style and text
                element.style.color = "red";
                element.textContent = "...........";
            }
        });

        // Select elements with class name "row padding-small top bottom leaderboard-row"
        const rowElements = document.getElementsByClassName("row padding-small top bottom leaderboard-row");

        // Append extracted hacker IDs to row elements
        Array.from(rowElements).forEach((element, index) => {
            const hackerId = arr[index] || "";
            const hackerIdElement = document.createElement("div");
            hackerIdElement.textContent = hackerId;
            element.appendChild(hackerIdElement);
        });

        // Remove class "rg_5" from all elements with class name "cursor leaderboard-hackername rg_5"
        Array.from(hackerElements).forEach(element => {
            element.classList.remove("rg_5");
        });
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
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
