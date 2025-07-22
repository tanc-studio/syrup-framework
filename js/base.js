async function includeHTML(elementId, filePath) {2
    let response = await fetch(filePath);
    let html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  }


  function animateImage() {
    const image = document.querySelector('.card_img');

    // First, enlarge the image
    image.classList.add('enlarge');

    // After a short delay, apply the fade-and-grow effect
    setTimeout(() => {
        image.classList.add('fade-and-grow');
    }, 2000); // Adjust time as needed

    // Finally, reset the image after a couple of seconds
    setTimeout(() => {
        image.classList.remove('enlarge', 'fade-and-grow');
    }, 4000); // Adjust time as needed
}

// Trigger the animation
animateImage();
