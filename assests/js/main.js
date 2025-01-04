// Menu
let spanOne = document.querySelector(".spanone");
let spanTwo = document.querySelector(".spantwo");
let spanThree = document.querySelector(".spanthree");
let menu = document.querySelector(".menu");
let nav = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
  spanOne.classList.toggle("one");
  spanTwo.classList.toggle("two");
  spanThree.classList.toggle("three");
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    nav.classList.add("desactive");
  } else {
    nav.classList.remove("hidden");
    nav.classList.remove("desactive");
    nav.classList.add("active");
  } 
});

// Sub Menu
let subMenu = document.querySelector(".subMenu");
let subMenuList = document.querySelector(".sub-menu");
let icon = document.querySelector(".subMenu .fa-angle-down");

subMenu.addEventListener("click", () => {
  if (subMenuList.classList.contains("h-0")) {
    subMenuList.classList.remove("h-0");
    subMenuList.classList.add("h-full");
    icon.classList.remove("rotate-90");
    icon.classList.add("rotate-0");
  } else {
    subMenuList.classList.remove("h-full");
    subMenuList.classList.add("h-0");
    icon.classList.remove("rotate-0");
    icon.classList.add("rotate-90");
  } 
})

// Input
let input = document.querySelector(".input");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");

minus.addEventListener("click", () => {
  if (input.value > 1) {
    input.value--;
  }
})

plus.addEventListener("click", () => {
  input.value++;
})

// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mainImage = document.getElementById('mainProductImage');
  const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
  
  if (mainImage && thumbnailBtns.length > 0) {
    // Add click event to each thumbnail
    thumbnailBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnailBtns.forEach(thumb => {
          thumb.classList.remove('active');
          thumb.classList.remove('border-blue-600');
          thumb.classList.add('border-2');
        });
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        this.classList.add('border-blue-600');
        this.classList.remove('border-2');
        
        // Change main image source
        const newImageSrc = this.getAttribute('data-image');
        if (newImageSrc) {
          // Add fade effect
          mainImage.style.opacity = '0.5';
          
          setTimeout(() => {
            mainImage.src = newImageSrc;
            mainImage.style.opacity = '1';
          }, 150);
        }
      });
    });
    
    // Set initial active state
    if (thumbnailBtns[0]) {
      thumbnailBtns[0].classList.add('active');
      thumbnailBtns[0].classList.add('border-blue-600');
    }
    
    // Keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
      const activeIndex = Array.from(thumbnailBtns).findIndex(btn => btn.classList.contains('active'));
      
      if (e.key === 'ArrowLeft' && activeIndex > 0) {
        thumbnailBtns[activeIndex - 1].click();
      } else if (e.key === 'ArrowRight' && activeIndex < thumbnailBtns.length - 1) {
        thumbnailBtns[activeIndex + 1].click();
      }
    });
  }
});

// Image zoom functionality (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
  const mainImageContainer = document.querySelector('.image');
  const mainImage = document.getElementById('mainProductImage');
  
  if (mainImageContainer && mainImage) {
    mainImageContainer.addEventListener('click', function() {
      // Create modal for image zoom
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
      modal.innerHTML = `
        <div class="relative max-w-4xl max-h-full">
          <img src="${mainImage.src}" alt="${mainImage.alt}" class="max-w-full max-h-full object-contain rounded-lg">
          <button class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
      
      // Add modal to body
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Close modal functionality
      const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
      };
      
      // Close on button click
      modal.querySelector('button').addEventListener('click', closeModal);
      
      // Close on overlay click
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
      
      // Close on escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    });
  }
});

// Enhanced Buy Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Quantity controls
  const minusBtn = document.querySelector('.minus');
  const plusBtn = document.querySelector('.plus');
  const quantityInput = document.querySelector('.input');
  
  if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updatePrice();
      }
    });
    
    plusBtn.addEventListener('click', function() {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
      updatePrice();
    });
  }
  
  // Update price based on quantity
  function updatePrice() {
    const quantity = parseInt(quantityInput.value);
    const basePrice = 499.00;
    const totalPrice = (basePrice * quantity).toFixed(2);
    
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i>Add to Cart - $${totalPrice}`;
    }
  }
  
  // Add to cart functionality
  const addToCartBtn = document.querySelector('.add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      // Add loading state
      this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Adding to Cart...';
      this.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check mr-2"></i>Added to Cart!';
        this.classList.remove('from-blue-600', 'to-blue-700');
        this.classList.add('from-green-600', 'to-green-700');
        
        // Update cart badge
        const cartBadges = document.querySelectorAll('.badge');
        cartBadges.forEach(badge => {
          if (badge.textContent === '0') {
            badge.textContent = quantityInput.value;
          }
        });
        
        // Reset button after 2 seconds
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i>Add to Cart - $499.00';
          this.classList.remove('from-green-600', 'to-green-700');
          this.classList.add('from-blue-600', 'to-blue-700');
          this.disabled = false;
          updatePrice();
        }, 2000);
      }, 1000);
    });
  }
  
  // Buy now functionality
  const buyNowBtn = document.querySelector('.buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      alert('Redirecting to checkout...');
    });
  }
  
  // Wishlist functionality
  const wishlistBtn = document.querySelector('.secondary-actions button:first-child');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        this.classList.add('text-red-600', 'border-red-600');
        this.innerHTML = '<i class="fas fa-heart mr-2"></i>Wishlisted';
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        this.classList.remove('text-red-600', 'border-red-600');
        this.innerHTML = '<i class="far fa-heart mr-2"></i>Wishlist';
      }
    });
  }
});

// Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and panes
      tabBtns.forEach(tab => {
        tab.classList.remove('active', 'text-blue-600', 'border-blue-600');
        tab.classList.add('text-gray-600');
      });
      
      tabPanes.forEach(pane => {
        pane.classList.add('hidden');
        pane.classList.remove('active');
      });
      
      // Add active class to clicked tab
      this.classList.add('active', 'text-blue-600', 'border-blue-600');
      this.classList.remove('text-gray-600');
      
      // Show corresponding pane
      const targetPane = document.getElementById(targetTab + '-tab');
      if (targetPane) {
        targetPane.classList.remove('hidden');
        targetPane.classList.add('active');
      }
    });
  });
  
  // Review filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(filter => {
        filter.classList.remove('active', 'bg-blue-600', 'text-white');
        filter.classList.add('bg-gray-100', 'text-gray-700');
      });
      
      this.classList.add('active', 'bg-blue-600', 'text-white');
      this.classList.remove('bg-gray-100', 'text-gray-700');
    });
  });
  
  // Review helpful buttons
  const helpfulBtns = document.querySelectorAll('.review-actions button:first-child');
  helpfulBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const countMatch = this.textContent.match(/\((\d+)\)/);
      if (countMatch) {
        const currentCount = parseInt(countMatch[1]);
        const newCount = currentCount + 1;
        this.innerHTML = this.innerHTML.replace(/\(\d+\)/, `(${newCount})`);
        this.classList.add('text-blue-600');
      }
    });
  });
});
