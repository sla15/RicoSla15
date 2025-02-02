const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");

// Set initial canvas size
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

class Spider {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1; // Random horizontal velocity
    this.vy = Math.random() * 2 - 1; // Random vertical velocity
    this.size = Math.random() * 4 + 2; // Random size
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x <= 0 || this.x >= w) this.vx *= -1;
    if (this.y <= 0 || this.y >= h) this.vy *= -1;

    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
}

// Create spider instances
const spiders = [];
for (let i = 0; i < 25; i++) {
  spiders.push(new Spider(Math.random() * w, Math.random() * h));
}

// Animation loop
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Subtle trail effect
  ctx.fillRect(0, 0, w, h);

  spiders.forEach((spider) => spider.update());

  requestAnimationFrame(animate);
}

animate();

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
let hoverTimeout;

// Add this function to handle scroll-based active states
function updateActiveSection() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight * 0.25) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
            // Add breathing animation to active link
            link.style.animation = 'breath 3s ease-in-out infinite';
        } else {
            link.style.animation = '';
        }
    });
}

// Optimized hover handler
function handleHover(expand) {
    cancelAnimationFrame(hoverTimeout);
    hoverTimeout = requestAnimationFrame(() => {
        navbar.classList.toggle('expanded', expand);
    });
}

// Event listeners with debouncing
document.querySelector('.nav-links').addEventListener('mouseover', e => {
    if (e.target.tagName === 'A') handleHover(true);
});

document.querySelector('.nav-links').addEventListener('mouseout', e => {
    if (e.target.tagName === 'A') handleHover(false);
});

// Scroll listener for active section
window.addEventListener('scroll', () => {
    updateActiveSection();
    cancelAnimationFrame(hoverTimeout);
});

// Initialize active section on load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveSection();
});

// Smooth scroll behavior
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = e.target.querySelector('.form-submit-btn');
  
  // Show loading state
  button.classList.add('loading');
  button.innerHTML = 'Sending';

  try {
    // Simulate API call
    await fetch('your-endpoint');
    
    // Show success state
    button.classList.remove('loading');
    button.classList.add('success');
    button.innerHTML = '✓ Sent!';
    
    // Reset after 2 seconds
    setTimeout(() => {
      button.classList.remove('success');
      button.innerHTML = 'Send Message';
    }, 2000);
    
  } catch (error) {
    button.classList.remove('loading');
    button.innerHTML = 'Error! Try Again';
  }
});
// Add this to your script.js for better multi-line handling
document.addEventListener('DOMContentLoaded', () => {
  const heroHeading = document.querySelector('.hero-content h1');
  const text = heroHeading.innerText;
  
  // Wrap each character in a span for better control
  heroHeading.innerHTML = text.split('').map(char => 
    `<span style="opacity:0">${char}</span>`
  ).join('');

  // Animate characters sequentially
  const chars = heroHeading.querySelectorAll('span');
  let delay = 0;
  
  chars.forEach((char, index) => {
    delay += index < text.indexOf('Stunning') ? 50 : 100;
    setTimeout(() => {
      char.style.opacity = 1;
      if(index === chars.length - 1) {
        heroHeading.style.borderRight = 'none';
      }
    }, delay);
  });
});
//shows text or element when it is seen
document.addEventListener('DOMContentLoaded', () => {
  // Configure animation settings
  const animationSettings = {
      threshold: 0.2, // 20% of element visible
      rootMargin: '0px',
      animationClasses: [
          'fade-in-up',
          'slide-left',
          'slide-right',
          'scale-in'
      ]
  };

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const element = entry.target;
              const animationType = element.dataset.animate || 'fade-in-up';
              
              element.classList.add('animate-active', animationType);
          }
      });
  }, {
      threshold: animationSettings.threshold,
      rootMargin: animationSettings.rootMargin
  });

  // Target elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(element => {
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.6s ease-out';
      
      // Start observing
      observer.observe(element);
  });

  // Add resize listener for responsive adjustments
  window.addEventListener('resize', () => {
      document.querySelectorAll('[data-animate]').forEach(element => {
          element.style.transform = ''; // Reset transforms on resize
      });
  });
});

//eyes
document.addEventListener('mousemove', function(e) {
  // Select all eyes
  const eyes = document.querySelectorAll('.eye');
  
  eyes.forEach(eye => {
    const pupil = eye.querySelector('.pupil');
    const rect = eye.getBoundingClientRect();
    
    // Calculate the center coordinates of the eye
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;
    
    // Get the vector from the eye center to the mouse cursor
    const dx = e.clientX - eyeCenterX;
    const dy = e.clientY - eyeCenterY;
    
    // Limit the pupil's movement to a maximum distance (e.g., 15px)
    const maxDistance = 15;
    const distance = Math.min(maxDistance, Math.hypot(dx, dy));
    const angle = Math.atan2(dy, dx);
    
    const offsetX = distance * Math.cos(angle);
    const offsetY = distance * Math.sin(angle);
    
    // Update pupil position relative to its initial centered position
    // Note: The pupil already has a translate(-50%, -50%) to center it,
    // so we add our offset using calc().
    pupil.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  });
});

