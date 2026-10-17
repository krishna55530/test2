
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

        // Set initial direction based on the fish image
        if (randomImageNumber === 1 || randomImageNumber === 3) {
            directions[index] = "left";
            fish.style.transform = "scaleX(1)";
        } else {
            directions[index] = "right";
            fish.style.transform = "scaleX(-1)";
        }

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
            Math.floor(Math.random() * 5000) + 2000
        );

        // Speed up when clicked
        fish.addEventListener("click", changeSpeed);
    }
}

function flipFish(fish) {
    const id = parseInt(fish.id) || 1;
    const index = id - 1;

    // 60% chance to flip
    if (Math.random() < 0.6) {
        if (directions[index] === "left") {
            directions[index] = "right";
            fish.style.transform = "scaleX(-1)";
        } else {
            directions[index] = "left";
            fish.style.transform = "scaleX(1)";
        }
    }
}

function changeSpeed(event) {
    const fish = event.currentTarget;
    const id = parseInt(fish.id) || 1;
    const index = id - 1;

    // Stop the current movement timer
    clearInterval(timerIds[index]);

    // Temporarily increase speed
    timerIds[index] = setInterval(() => moveFish(fish, 15), 15);

    // Return to normal speed after 3 seconds
    setTimeout(() => {
        clearInterval(timerIds[index]);
        timerIds[index] = setInterval(() => moveFish(fish, 5), 30);
    }, 3000);
}

function moveFish(fish, step = 5) {
    const id = parseInt(fish.id) || 1;
    const index = id - 1;
    const tank = document.querySelector(".tank");

    const max = tank.clientWidth - fish.offsetWidth;
    let left = parseFloat(fish.style.left) || 0;

    // Move left
    if (directions[index] === "left") {
        left -= step;

        // Turn around at the left edge
        if (left <= 0) {
            left = 0;
            directions[index] = "right";
            fish.style.transform = "scaleX(-1)";
        }
    } else {
        // Move right
        left += step;

        // Turn around at the right edge
        if (left >= max) {
            left = max;
            directions[index] = "left";
            fish.style.transform = "scaleX(1)";
        }
    }

    // Update horizontal position
    fish.style.left = `${left}px`;
}
