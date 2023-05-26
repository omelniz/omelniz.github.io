var $contactForm = $(".js-contact-form");

$contactForm.parsley({
  errorsContainer: function(ParsleyField) {
    return ParsleyField.$element.parent();
  },
  classHandler: function (ParsleyField) {
    return ParsleyField.$element.parent();
  }
})

function redirect(url) {
  window.location.href = url;
}

$contactForm.submit(function(event) {
  event.preventDefault();

  var name = $("#name").val();
  var contact = $("#contact").val();
  var message = $("#message").val();

  redirect('mailto:omelniz@siberian.io?subject=Hello siberian&body=' + message + '%0D%0D' + name + '%0D' + contact)
});

function scrollToAnchor(anchor, speed) {
  var offset = 30;
  var positionToScroll = $(anchor).offset().top - offset;

  $('html, body').stop().animate({scrollTop: positionToScroll}, speed || "slow");
}

$(".js-scroll-to-anchor").click(function(e) {
  e.preventDefault();

  var anchor = $(this).attr('href');
  var speed = 300;

  scrollToAnchor(anchor, speed);
});

$('.js-alpha-only').bind('keyup input cut copy paste change', function() {
  var field = $(this);

  field.val(field.val().replace(/[^a-zA-Zа-яА-Я]/g,'') );
});

window.Parsley.addValidator('emailOrPhone', {
  validateString: function(value) {
    var pattern = /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|\d+$/;

    return pattern.test(value);
  },
  messages: {
    en: 'Please, enter valid phone or email',
  }
});

particlesJS('intro-animation', {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 10,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});