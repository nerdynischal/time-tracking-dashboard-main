let isWeekly = true;
let isDaily = false;
let isMonthly = false;

const mainGrid = document.querySelector(".main-grid");

fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // For debugging
    data.forEach((activity) => {
      console.log(activity);
      const cleanActivity = activity.title.toLowerCase().replace(" ", "-");
      console.log(cleanActivity);
      let newHTML = `
      <div class="card">
              <div class="bg-image-container ${cleanActivity}">
                <img src="images/icon-${cleanActivity}.svg" alt="${cleanActivity} icon" />
              </div>
              <div class="title-container">
                <div class="title">${activity.title}</div>
                <div class="icon-container">
                  <img src="images/icon-ellipsis.svg" alt="elipses" />
                </div>
              </div>
              <div class="time-container">
                <div class="total-time">${activity.timeframes.weekly["current"]}hrs</div>
                <div class="previous-time">Last Week - ${activity.timeframes.weekly["previous"]}hrs</div>
              </div>
            </div>
      `;
      mainGrid.innerHTML += newHTML;
    });
  })
  .catch((error) => {
    console.error("Error loading the JSON file:", error);
  });
