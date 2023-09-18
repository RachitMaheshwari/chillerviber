  // Gallery variables
  var modal = document.getElementById("myModal");
  var img = document.querySelectorAll(".img-fluid");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  // Gallery variables

  // Form variables
  var open=document.querySelector('.open');
  var formClose=document.querySelector('.close');
  var formContainer=document.querySelector('.contact-form-container');
  var form=document.querySelector('.contact-form');
  // Form variables

  // Preloader setting
  window.onload = function(){
    document.querySelector(".preloader-container").style.display = "none";
    document.querySelector("body").style.overflow= "visible";
  }
  // Preloader setting

  // Nav links active
  let navlinks=document.querySelectorAll('.nav-link');
  navlinks.forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('.nav-link.active').classList.remove("active");
      button.classList.add("active")
    });
  });
  // Nav links active

  // Form open close
  const myTimeout = setTimeout(openForm, 5000);
  function openForm() {
    formContainer.classList.add("open");
  }

  formClose.addEventListener('click', function(){
    formContainer.classList.remove("open");
  })
  form.addEventListener('click', function(event){
    event.stopPropagation();
    if(event.target.classList.contains("form-submit")){
      for (const el of document.querySelector('#contact').querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
          return;
        }
      }
      sendEmail();
    }
    
  })
  formContainer.addEventListener('click', function(event){
    formContainer.classList.remove("open");
  })
  // Form open close

  // gallery modal
  img.forEach((button) => {
    button.addEventListener('click', () => {
      modal.style.display = "block";
      modalImg.src = button.firstElementChild.src;
      captionText.innerHTML = button.firstElementChild.alt;
    });
  });

  var span = document.getElementsByClassName("closeModal")[0];
  span.onclick = function() { 
    modal.style.display = "none";
  }
  // gallery modal

  // home page slider
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: true,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  // home page slider