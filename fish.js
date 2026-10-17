
let fishImages;
let timerIds = [];
let directions = [];
let flipIds = [];

document.addEventListener("DOMContentLoaded", () => {
    const fishElements = document.querySelectorAll(".fish");
    const tank = document.querySelector(".tank");

    // Randomly assign an image and position to each fish
    fishElements.forEach(fish => {
        const randomImageNumber = Math.floor(Math.random() * 7) + 1;
        fish.src = `fish${randomImageNumber}.png`;

        const id = parseInt(fish.id) || 1;
        const index = id - 1;

        directions[index] = "right";
        
        // Randomly position each fish
        fish.style.top =
            `${Math.random() * Math.max(0, tank.clientHeight - fish.offsetHeight)}px`;

        fish.style.left =
            `${Math.random() * Math.max(0, tank.clientWidth - fish.offsetWidth)}px`;

        fish.style.right = "auto";
    });

    // Start swimming when the page loads
    startMoving();
});

function startMoving() {
    fishImages = document.getElementsByClassName("fish");

    for (let fish of fishImages) {
        const id = parseInt(fish.id) || 1;
        const index = id - 1;

        // Start normal movement
        timerIds[index] = setInterval(() => moveFish(fish), 30);

        // Randomly check whether to flip direction
        flipIds[index] = setInterval(
            () => flipFish(fish),
            Math.floor(Math.random() * 6000) + 2000
        );

        // Speed up when clicked
        fish.addEventListener("click", changeSpeed);
    }
}

function flipFish(fish) {
    const id = parseInt(fish.id) || 1;
    const index = id - 1;

    if (Math.random() < 0.6) {
        directions[index] =
            directions[index] === "left" ? "right" : "left";

        fish.style.transform =
            directions[index] === "left" ? "scaleX(-1)" : "scaleX(1)";
    }
}

function changeSpeed(event) {
    const fish = event.currentTarget;
    const id = parseInt(fish.id) || 1;
    const index = id - 1;

    // Stop the current movement timer
    clearInterval(timerIds[index]);

    // Temporarily increase speed
    timerIds[index] = setInterval(() => moveFish(fish), 15);

    // Return to normal speed after 3 seconds
    setTimeout(() => {
        clearInterval(timerIds[index]);
        timerIds[index] = setInterval(() => moveFish(fish), 30);
    }, 3000);
}

function moveFish(fish) {
    const id = parseInt(fish.id) || 1;
    const index = id - 1;
    const tank = document.querySelector(".tank");
    const max = tank.clientWidth - fish.offsetWidth;

    let left = parseFloat(fish.style.left);

    if (fish.style.left === "auto" || fish.style.left === "") {
        left = tank.clientWidth - fish.offsetWidth -
               (parseFloat(fish.style.right) || 0);
        fish.style.right = "auto";
        fish.style.left = left + "px";
    }

    if (directions[index] === "right") {
        left += 5;

        if (left >= max) {
            left = max;
            directions[index] = "left";
            fish.style.transform = "scaleX(-1)";
        }
    } else {
        left -= 5;

        if (left <= 0) {
            left = 0;
            directions[index] = "right";
            fish.style.transform = "scaleX(1)";
        }
    }

    fish.style.left = left + "px";
}
