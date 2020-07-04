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

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    return false
  });
})
