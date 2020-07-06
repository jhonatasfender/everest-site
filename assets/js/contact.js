const fullName = (fullName) => (fullName ? fullName.split(" ").length : 0) > 2

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

$(document).ready(function () {
  $("#contact-form").submit(function (e) {
    e.preventDefault();
    $(".contact-form #contact-form .text-danger").addClass("hidden")

    if (!$("#name").val()) {
      $(".username-require").removeClass("hidden");
      return false;
    } else if (!fullName($("#name").val())) {
      $(".username-full-name").removeClass("hidden");
      return false;
    }

    if (!$("#email").val()) {
      $(".email-require").removeClass("hidden");
      return false;
    } else if (!validateEmail($("#email").val())) {
      $(".email-invalid").removeClass("hidden");
      return false;
    }

    if (!$("#message").val()) {
      $(".message-require").removeClass("hidden");
      return false;
    } else if ($("#message").val().length < 100) {
      $(".message-very-short").removeClass("hidden");
      return false;
    }

    const settings = {
      "url": "https://pristine-great-basin-34326.herokuapp.com/contact",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "name": $("#name").val(),
        "email": $("#email").val(),
        "message": $("#message").val()
      }),
    };

    $.ajax(settings).done(function (response) { });

    let button = $('.contact-form .theme-btn.btn-style-one, .contact-section .theme-btn.btn-style-one');
    let buttonText = $('.contact-form .theme-btn.btn-style-one .btn-title, .contact-section .theme-btn.btn-style-one .btn-title');

    const tickMark = `
      <svg width="58" height="45" viewBox="0 0 58 45" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" fill-rule="nonzero" d="M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65"/>
      </svg>
    `;

    buttonText.html(tickMark)
    buttonText.addClass("button__circle").removeClass("btn-title")
    button.addClass("btn-animation-custon-send-first")

    setTimeout(() => {
      buttonText.text("Clique para enviar");
      buttonText.removeClass("button__circle").addClass("btn-title")
      button.removeClass("btn-animation-custon-send-first")
      $("#contact-form").get(0).reset()
    }, 3000);

    return false
  });
})
