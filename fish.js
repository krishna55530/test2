let fishImages;
let timerIds = [];
let directions = [];

function startMoving() {        
   fishImages = document.getElementsByClassName("fish");

   for (let fish of fishImages) {
      let id = parseInt(fish.id) || 1;
      directions.push("left");
      
      if(!fish.style.right) {
         fish.style.right = "0px";
         fish.style.left = "auto";
      }

      let timerId = setInterval(() => moveFish(fish), 15*id);
      timerIds.push(timerId);

      fish.addEventListener("click", changeSpeed);
   }
}

function changeSpeed(event) {
    let fish = event.currentTarget;
    let id = parseInt(fish.id) || 1;
    let index = id - 1; //array

    // Stop the current timer
    clearInterval(timerIds[index]);

    // Temporarily increase the speed
    timerIds[index] = setInterval(() => moveFish(fish), 7*id);

    // Return to the original speed after 3 seconds
    setTimeout(() => {
        clearInterval(timerIds[index]);

        timerIds[index] = setInterval(() => moveFish(fish), 15*id);
    }, 3000);
}

function moveFish(fish) {
   let id = parseInt(fish.id) || 1;
   let index = id - 1; //array
   //let right = parseInt(fish.style.right) || 0;
   //let left = parseInt(fish.style.left) || 0;
   let max = document.body.clientWidth - fish.width;
   
   if(directions[index] === "left") {
      let right = parseFloat(fish.style.right) || 0;
      
      if (right >= max) { //change to depend on tank
         directions[index] = "right";
         let currentLeft = max - right;
         fish.style.left = currentLeft + "px";
         fish.style.right = "auto";
         fish.style.transform = 'scaleX(-1)';
         //clearInterval(timerIds[index]);
         //timerIds[index] = setInterval(() => moveFish(fish), 15*id);
      } else {
         fish.style.right = (right + 5) + "px";
      }
   } else {
      let left = parseFloat(fish.style.left) || 0;
   
      if (left >= max) { //change to depend on tank
         directions[index] = "left";
         fish.style.left = "auto";
         fish.style.right = "0px";
         fish.style.transform = 'scaleX(-1)';
         //clearInterval(timerIds[index]);
         //timerIds[index] = setInterval(() => moveFish(fish), 15*id);
      } else {
         fish.style.left = (left + 5) + "px";
      }
   }
}
