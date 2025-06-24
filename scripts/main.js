const buttons = document.querySelectorAll(".date-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    button.classList.toggle("active");
    console.log(button.value);
    renderActivityTimes(button.value);
  });
});

const mainGrid = document.querySelector(".main-grid");

function setPrefix(timeFrame) {
  if (timeFrame === "daily") {
    return "Yesterday";
  } else if (timeFrame === "weekly") {
    return "Last week";
  } else if (timeFrame === "monthly") {
    return "Last month";
  }
}

function renderActivityTimes(timeFrame) {
  mainGrid.innerHTML = "";

  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((activity) => {
        const cleanActivity = activity.title.toLowerCase().replace(" ", "-");
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
                <div class="total-time">${
                  activity.timeframes[timeFrame]["current"]
                }hrs</div>
                <div class="previous-time">${setPrefix(timeFrame)} - ${
          activity.timeframes[timeFrame]["previous"]
        }hrs</div>
              </div>
            </div>
      `;
        mainGrid.innerHTML += newHTML;
      });
    })
    .catch((error) => {
      console.error("Error loading the JSON file:", error);
    });
}

renderActivityTimes("weekly");
buttons[1].classList.add("active");
