var s = Snap("#svg-container");

// Function to update the circle position and outer ring
function updateCirclePosition(circle, outerRing, centerX, centerY) {
  // Set the radius of the circle and outer ring
  var circleRadius = 150;
  var outerRingRadius = circleRadius + 40; // Adjust the size of the outer ring

  // Update the circle's position and attributes
  circle.attr({
    cx: centerX,
    cy: centerY,
    r: circleRadius
  });

  // Update the outer ring's position and attributes
  outerRing.attr({
    cx: centerX,
    cy: centerY,
    r: outerRingRadius
  });
}

// Create the center circle (Bylen)
var bylenCircle = s.circle(0, 0, 150);
bylenCircle.attr({
  fill: "#00FFFF",
  cursor: "pointer"
});

// Create the outer ring for the center circle
var bylenOuterRing = s.circle(0, 0, 140); // Adjust the size of the outer ring
bylenOuterRing.attr({
  fill: "none",
  stroke: "#BCC1B4",
  strokeWidth: 2
});

// Click event listener on the center circle (Bylen)
bylenCircle.click(function () {
  // Hide all planet info menus
  hideAllPlanetInfoMenus();

  // Show the planet info menu for Bylen
  document.getElementById("bylen-info").style.display = "block";
});

// Create Agaris planet circle
var agarisCircle = s.circle(-100, -100, 40); // Adjust the position and size
agarisCircle.attr({
  fill: "#00ff00",
  cursor: "pointer"
});

// Click event listener on Agaris planet circle
agarisCircle.click(function () {
  // Hide all planet info menus
  hideAllPlanetInfoMenus();

  // Show the planet info menu for Agaris
  document.getElementById("agaris-info").style.display = "block";
});

// Create The Moon planet circle
var theMoonCircle = s.circle(-100, -150, 25); // Adjust the position and size
theMoonCircle.attr({
  fill: "#ffffff",
  cursor: "pointer"
});

// Click event listener on The Moon planet circle
theMoonCircle.click(function () {
  // Hide all planet info menus
  hideAllPlanetInfoMenus();

  // Show the planet info menu for The Moon
  document.getElementById("the-moon-info").style.display = "block";
});

// Create Lezuno planet circle
var lezunoCircle = s.circle(-100, 100, 40); // Adjust the position and size
lezunoCircle.attr({
  fill: "#CC6322",
  cursor: "pointer"
});

// Click event listener on Lezuno planet circle
lezunoCircle.click(function () {
  // Hide all planet info menus
  hideAllPlanetInfoMenus();

  // Show the planet info menu for Lezuno
  document.getElementById("lezuno-info").style.display = "block";
});

// Create Lezuno's Moon planet circle
var lezunoMoonCircle = s.circle(-150, 100, 25); // Adjust the position and size
lezunoMoonCircle.attr({
  fill: "#99967D",
  cursor: "pointer"
});

// Click event listener on Lezuno's Moon planet circle
lezunoMoonCircle.click(function () {
  // Hide all planet info menus
  hideAllPlanetInfoMenus();

  // Show the planet info menu for Lezuno's Moon
  document.getElementById("lezuno-moon-info").style.display = "block";
});

// Create Thora4 planet circle
var thora4Circle = s.circle(100, -100, 35); // Adjust the position and size
thora4Circle.attr({
  fill: "#48AEFF",
  cursor: "pointer"
});

// Click event listener on Thora4 planet circle
thora4Circle.click(function () {
  // Hide all planet info menus
  hideAllPlanetInfoMenus();

  // Show the planet info menu for Thora4
  document.getElementById("thora4-info").style.display = "block";
});

// Create Crait planet circle
var craitCircle = s.circle(200, 100, 40); // Adjust the position and size
craitCircle.attr({
  fill: "#FF006E",
  cursor: "pointer"
});

// Click event listener on Crait planet circle
craitCircle.click(function () {
  // Hide all planet info menus
  hideAllPlanetInfoMenus();

  // Show the planet info menu for Crait
  document.getElementById("crait-info").style.display = "block";
});

// Create Agaris planet circle
var S27Diamond = s.ellipse(200, 100, 12,24); // Adjust the position and size
S27Diamond.attr({
  fill: "#7F593F",
  cursor: "pointer"
});

// Click event listener on Agaris planet circle
S27Diamond.click(function () {
  // Hide all planet info menus
  hideAllPlanetInfoMenus();

  // Show the planet info menu for Agaris
  document.getElementById("S27-info").style.display = "block";
});

// Function to hide all planet info menus
function hideAllPlanetInfoMenus() {
  var planetInfoMenus = document.getElementsByClassName("planet-info");
  for (var i = 0; i < planetInfoMenus.length; i++) {
    planetInfoMenus[i].style.display = "none";
  }
}

// Update the circle positions and outer rings on window resize
function updateCirclePositions() {
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    const elements  = document.getElementsByClassName('ore-grid');
    const PlanetsInfo  = document.getElementsByClassName('planet-info');
    const TitelContainer  = document.getElementsByClassName('titel-container');
    
    if(window.innerWidth>1700){
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.gridTemplateColumns = 'repeat(4, 1fr)';
            }
        var images = document.querySelectorAll('img');

        // Iterate over all images
        images.forEach((image) => {
            // Manipulate each image
            image.style.width = '400px';
        });

        for (let i = 0; i < PlanetsInfo.length; i++) {
            PlanetsInfo[i].style.maxWidth = '420px';
            }
        for (let i = 0; i < TitelContainer.length; i++) {
          TitelContainer[i].style.visibility = 'visible';
          }



    }
    else if(window.innerWidth<1700){
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.gridTemplateColumns = 'repeat(2, 1fr)';
            }

        var images = document.querySelectorAll('img');    
        images.forEach((image) => {
            // Manipulate each image
            image.style.width = '200px';
        });
        for (let i = 0; i < PlanetsInfo.length; i++) {
            PlanetsInfo[i].style.maxWidth = '210px';
            }
        for (let i = 0; i < TitelContainer.length; i++) {
          TitelContainer[i].style.visibility = 'hidden';
          }
       

            
        
    }




    
    // Update Bylen circle position and outer ring
    updateCirclePosition(bylenCircle, bylenOuterRing, centerX, centerY);

    // Update Agaris circle position
    agarisCircle.attr({
      cx: centerX - 300, // Adjust the position
      cy: centerY - 200 // Adjust the position
    });

    // Update The Moon circle position
    theMoonCircle.attr({
      cx: centerX - 400, // Adjust the position
      cy: centerY - 250 // Adjust the position
    });

    // Update Lezuno circle position
    lezunoCircle.attr({
      cx: centerX + 285, // Adjust the position
      cy: centerY - 200 // Adjust the position
    });

    // Update Lezuno's Moon circle position
    lezunoMoonCircle.attr({
      cx: centerX + 340, // Adjust the position
      cy: centerY - 250 // Adjust the position
    });

    // Update Thora4 circle position
    thora4Circle.attr({
      cx: centerX - 40, // Adjust the position
      cy: centerY + 225 // Adjust the position
    });

    // Update Crait circle position
    craitCircle.attr({
      cx: centerX + 500, // Adjust the position
      cy: centerY + 150 // Adjust the position
    });

    S27Diamond.attr({
      cx: centerX + 40, // Adjust the position
      cy: centerY + 175 // Adjust the position
    });
    
}

// Call the updateCirclePositions function initially and on window resize
updateCirclePositions();
window.addEventListener("resize", updateCirclePositions);