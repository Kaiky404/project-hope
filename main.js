const toggleCheckbox = document.getElementById('alternador');
const icons = document.querySelectorAll('.icon');
const backs = document.querySelectorAll('.back-to-svg');

// Function to activate dark mode
function activateDarkMode() {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark'); // Saves the theme state as 'dark'
    applySvgColor('var(--txt-color-dark)', 'dark'); // Changes SVG colors for dark mode
}

// Function to deactivate dark mode
function deactivateDarkMode() {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light'); // Saves the theme state as 'light'
    applySvgColor('var(--txt-color)', 'light'); // Changes SVG colors for light mode
}

// Function to apply color to SVGs
function applySvgColor(color, mode) {
    // Changes color for SVGs with the .icon class
    icons.forEach(icon => {
        icon.querySelectorAll('path').forEach(path => {
            path.setAttribute('fill', color); // Applies color to the 'fill' of each path
        });
    });

    // Changes color for SVGs with the .back-to-svg class
    backs.forEach(back => {
        back.querySelectorAll('path').forEach(path => {
            path.setAttribute('fill', mode === 'dark' ? 'var(--back-to-svg-dark)' : 'var(--back-to-svg-light)');
        });
    });
}

// Checks the theme state when loading the page
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        activateDarkMode(); // Activates dark mode if the theme is saved as 'dark'
        toggleCheckbox.checked = true; // Checks the checkbox according to the saved state
    } else {
        deactivateDarkMode(); // Deactivates dark mode if the theme is not 'dark'
        toggleCheckbox.checked = false; // Unchecks the checkbox
    }

    // Checkbox change event to switch between modes
    toggleCheckbox.addEventListener('change', () => {
        if (toggleCheckbox.checked) {
            activateDarkMode(); // Activates dark mode
        } else {
            deactivateDarkMode(); // Deactivates dark mode
        }
    });
});

// Calls the function to apply SVG color when the page loads
applySvgColor(
    document.documentElement.classList.contains('dark-mode') ? 'var(--txt-color-dark)' : 'var(--txt-color)',
    document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light'
);


function toggleVisibility(element) {
    // Finds the parent container `creditos-content` of the clicked element
    const creditosContent = element.closest('.creditos-content');

    // Selects the `.creditos-content-merito` and all `.creditos-content-links-link` within the current container
    const meritElement = creditosContent.querySelector('.creditos-content-merito');
    const linksElements = creditosContent.querySelectorAll('.creditos-content-links-link');

    // Checks if the merit is already visible for the current item
    const isVisible = meritElement.style.display === 'block';

    // Hides all `.creditos-content-merito` and `.creditos-content-links-link` elements in all sections
    document.querySelectorAll('.creditos-content-merito').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.creditos-content-links-link').forEach(el => el.style.display = 'none');

    // If the clicked element was already visible, do nothing but hide (toggle on click)
    if (!isVisible) {
        // Otherwise, displays the merit and links for the clicked item
        meritElement.style.display = 'block';
        linksElements.forEach(link => link.style.display = 'inline-block');
    }
}


const gearItems = document.querySelectorAll('.gear-item');

gearItems.forEach(gearItem => {
    const gear = gearItem.querySelector('i');
    const text = gearItem.querySelector('p');

    gear.addEventListener('click', () => {
        gear.classList.toggle('active');
        text.classList.toggle('active');
    });
});

// Function for smooth navigation redirect
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);

    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

const func = document.querySelector('a[href="#func"]');
const cred = document.querySelector('a[href="#cred"]');

func.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToElement('func');
});

cred.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToElement('cred');
});