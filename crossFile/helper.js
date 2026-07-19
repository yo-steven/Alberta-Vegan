//////////////////
// HTML Reveal
//////////////////
const revealInserts = ["animateUp", "animateLeft", "animateRight", "animateDown", "animate" /*opacity only*/, "typeWrote", "underlined", "customA"]

const phaseInElements = document.querySelectorAll(".phaseInElements");
let revealingNewElement = false;
var targetYLevel = window.innerHeight * 0.8;

function htmlDetection() {
  if (!revealingNewElement) {

    // If scroll is at the bottom, animate all elements to avoid lacking the bottom elements (Like a lever flick yk)
    if (Math.ceil(window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight) {
      targetYLevel = window.innerHeight;
    }
    else {
      targetYLevel = window.innerHeight * 0.8;
    }

    for (let i = 0; i < phaseInElements.length; i++) {
      var element = phaseInElements[i];
      var bounding = element.getBoundingClientRect();

      // If in seeking range to appear
      if (bounding.top < targetYLevel && hasntBeenAnimated(element) && !revealingNewElement) {
        revealElements(element);
      } 
        // Out of the seeking range to disappear
      else if (
        bounding.top >= window.innerHeight && hasBeenAnimated(element)) {
        revealInserts.forEach(insert => {
          element.classList.remove(insert);
        })
        if (element.classList.contains("typewriter")) {
          clearTypewriter(element);
        }
      }
    }
  }
}


setInterval(htmlDetection, 1000 / 60);


// Testing if current element has already been elemented by testing for a possible insert
function hasBeenAnimated(element) {
  return revealInserts.some(insert => {
    return element.classList.contains(insert);
  })
}

function hasntBeenAnimated(element) {
  return revealInserts.every(insert => {
    return !element.classList.contains(insert);
  })
}



function revealElements(element) {
    revealingNewElement = true;
    // cooldowns & custom cooldowns
    var cooldown = 0;
    // Cooldown adders
    if (element.hasAttribute('animateCooldown')) {
        // Check if the element's top position is more than targetYLevel + threshold
        if ((element.getBoundingClientRect().top+450) < targetYLevel) {
            cooldown = 0; // Maintain cooldown as 0
        } else {
            cooldown = parseInt(element.getAttribute('animateCooldown'), 10);
        }
    }

    //
    if (cooldown <= 0) {
      revealingNewElement = false;
    }
    else {
      setTimeout(function () {
        revealingNewElement = false;
      }, cooldown);
    }
    if (element.classList.contains("typewriter")) {
      element.classList.add("typeWrote");
      if ((element.getBoundingClientRect().top+450) < targetYLevel) {
        typeTextOnElement(element, element.getAttribute("typeWriterText"), 0, false, 0.25);
      }
      else {
        typeTextOnElement(element, element.getAttribute("typeWriterText"), parseInt(element.getAttribute("typeWriterSpeed")), false, 0.25);
      }
    } else if (element.classList.contains("opacityOnly")) {
    element.classList.add("animate");
  } else if (element.classList.contains("rightSide")) {
    element.classList.add("animateRight");
  } else if (element.classList.contains("leftSide")) {
    element.classList.add("animateLeft");
  } else if (element.classList.contains("downSide")) {
    element.classList.add("animateDown");
  } else if (element.classList.contains("underline")) {
    element.classList.add("underlined");
  } else if (element.classList.contains("custom")) {
    element.classList.add("customA");
  } else {
    element.classList.add("animateUp");
  }
}

// TypeWriter
const typewriterLoops = new Map();

function typeTextOnElement(element, text, speed, increasingSpeed, delayAmount) {
  let entireText = "";
  let typewriterCount = 0;
  let underscoring = false;
  let loopSpeed = speed;

  if (increasingSpeed) {
    loopSpeed = speed + (delayAmount * text.length);
  }

  function type() {
    if (loopSpeed > speed) {
      loopSpeed /= 1.1;
      if (loopSpeed <= speed) {
        loopSpeed = speed;
      }
    }
    if (typewriterCount <= text.length) {
      if (typewriterCount % 4 === 0) {
        underscoring = !underscoring;
      }

      if (underscoring && typewriterCount !== text.length) {
        element.innerHTML = text.substring(0, typewriterCount) + "_";
      } else {
        element.innerHTML = text.substring(0, typewriterCount);
      }

      typewriterCount++;
      const timeoutId = setTimeout(type, loopSpeed);
      typewriterLoops.set(element, timeoutId);
    } else {
      // Set the text to the entire text
      element.innerHTML = text;
      typewriterLoops.delete(element);
    }
  }

  type();
}

function clearTypewriter(element) {
  if (typewriterLoops.has(element)) {
    clearTimeout(typewriterLoops.get(element));
    typewriterLoops.delete(element);
  }
}
