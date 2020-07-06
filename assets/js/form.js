$(document).ready(function () {
  $("#cpf-pf, #cpf-pj").mask('000.000.000-00');
  $(".data-format").mask('00/00/0000')
  $(".phone-format").mask('(00) 0000-00009');
  $(".phone-format").blur(function (event) {
    if ($(this).val().length == 15) { // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
      $(".phone-format").mask('(00) 00000-0009');
    } else {
      $(".phone-format").mask('(00) 0000-00009');
    }
  });

  var valid = true

  $("#select-people").change(function () {
    $(".contact-form #form-precatorios .text-danger").addClass('hidden');

    switch ($(this).val()) {
      case "Pessoa Física":
        $(".type-credit, .pf, .hr-after-selectbox, .hr-before-type-credit").removeClass("hidden")
        $(".pj").addClass("hidden")
        break;

      case "Pessoa Jurídica":
        $(".hr-after-selectbox, .pj, .type-credit, .hr-before-type-credit").removeClass("hidden")
        $(".pf").addClass("hidden")
        break;

      default:
        $(".select-people-required").removeClass("hidden")
        $(".hr-after-selectbox, .pf, .pj, .type-credit, .hr-before-type-credit").addClass("hidden")
        break;
    }
  })

  const required = (name) => {
    $(`.${name}-required`).removeClass("hidden")
    valid = false
  }

  const fullName = (fullName) => (fullName ? fullName.split(" ").length : 0) > 2

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const util = function () {
    return {
      validCpf: function (cpf) {
        if (!cpf || cpf.length != 11
          || cpf == "00000000000"
          || cpf == "11111111111"
          || cpf == "22222222222"
          || cpf == "33333333333"
          || cpf == "44444444444"
          || cpf == "55555555555"
          || cpf == "66666666666"
          || cpf == "77777777777"
          || cpf == "88888888888"
          || cpf == "99999999999")
          return false
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(9, 10))) return false
        soma = 0
        for (var i = 1; i <= 10; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(10, 11))) return false
        return true
      },
      validCnpj: function (cnpj) {
        if (!cnpj || cnpj.length != 14
          || cnpj == "00000000000000"
          || cnpj == "11111111111111"
          || cnpj == "22222222222222"
          || cnpj == "33333333333333"
          || cnpj == "44444444444444"
          || cnpj == "55555555555555"
          || cnpj == "66666666666666"
          || cnpj == "77777777777777"
          || cnpj == "88888888888888"
          || cnpj == "99999999999999")
          return false
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho)
        var digitos = cnpj.substring(tamanho)
        var soma = 0
        var pos = tamanho - 7
        for (var i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--
          if (pos < 2) pos = 9
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(0)) return false;
        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7
        for (var i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--
          if (pos < 2) pos = 9
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != digitos.charAt(1)) return false
        return true;
      }
    }
  }

  $("#form-precatorios").submit(function (e) {
    e.preventDefault();
    valid = true;
    $(".contact-form #form-precatorios .text-danger").addClass('hidden');

    switch ($("#select-people").val()) {
      case "Pessoa Física":
        if (!$("#name-pf").val()) required("name-pf")
        else if (!fullName($("#name-pf").val())) {
          $('.name-pf-full').removeClass("hidden")
          valid = false
        }
        if (!$("#cpf-pf").val()) required("cpf-pf")
        else if (!util().validCpf($("#cpf-pf").val().replace(/[./-]/g, ''))) {
          $('.cpf-pf-invalid').removeClass("hidden")
          valid = false
        }
        if (!$("#data-pf").val()) required("data-pf")
        if (!$("#phone-pf").val()) required("phone-pf")
        if (!$("#email-pf").val()) required("email-pf")
        else if (!validateEmail($("#email-pf").val())) {
          $('.email-pf-invalid').removeClass("hidden")
          valid = false
        }

        break;

      case "Pessoa Jurídica":
        if (!$("#company-name-pj").val()) required("company-name-pj")
        else if (!fullName($("#company-name-pj").val())) {
          $('.company-name-pj-full').removeClass("hidden")
          valid = false
        }
        if (!$("#name-socio-pj").val()) required("name-socio-pj")
        else if (!fullName($("#name-socio-pj").val())) {
          $('.name-socio-pj-full').removeClass("hidden")
          valid = false
        }
        if (!$("#cnpj-pj").val()) required("cnpj-pj")
        else if (!util().validCnpj($("#cnpj-pj").val().replace(/[./-]/g, ''))) {
          $('.cnpj-pj-invalid').removeClass("hidden")
          valid = false
        }
        if (!$("#cpf-pj").val()) required("cpf-pj")
        else if (!util().validCpf($("#cpf-pj").val().replace(/[./-]/g, ''))) {
          $('.cpf-pj-invalid').removeClass("hidden")
          valid = false
        }
        if (!$("#phone-pj").val()) required("phone-pj")
        if (!$("#email-pj").val()) required("email-pj")
        else if (!validateEmail($("#email-pf").val())) {
          $('.email-pf-invalid').removeClass("hidden")
          valid = false
        }

        break;

      default:
        $(".select-people-required").removeClass("hidden")
        $(".hr-after-selectbox, .pf, .pj, .type-credit, .hr-before-type-credit").addClass("hidden")
        valid = false
        break;
    }

    if (!$('input[name="type-credit"]:checked').val()) {
      $('.type-credit-required').removeClass("hidden")
      valid = false
    }

    if (valid) {

      let message = ""
      if ($("#select-people").val() === "Pessoa Física") {
        message = `*Contato para buscar precatórios*
Pessoa: ${$("#select-people").val()}
Nome completo: ${$("#name-pf").val()}
CPF: ${$("#cpf-pf").val()}
Data de nascimento: ${$("#data-pf").val()}
Telefone: ${$("#phone-pf").val()}
E-mail: ${$("#email-pf").val()}
Tipo de Crédito : ${$('input[name="type-credit"]:checked').val()}
`
      } else if ($("#select-people").val() === "Pessoa Jurídica") {
        message = `*Contato para buscar precatórios*
Pessoa: ${$("#select-people").val()}
Nome da empresa: ${$("#company-name-pj").val()}
Nome do Sócio Administrador ou Preposto : ${$("#name-socio-pj").val()}
CNPJ: ${$("#cnpj-pj").val()}
CPF: ${$("#cpf-pj").val()}
Telefone: ${$("#phone-pj").val()}
E-mail: ${$("#email-pj").val()}
Tipo de Crédito : ${$('input[name="type-credit"]:checked').val()}
`
      }

      const settings = {
        "url": "https://pristine-great-basin-34326.herokuapp.com/precatory",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "message": message
        }),
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });

      let button = $('.contact-form .theme-btn.btn-style-one');
      let buttonText = $('.contact-form .theme-btn.btn-style-one .btn-title');

      const tickMark = `
        <svg width="58" height="45" viewBox="0 0 58 45" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" fill-rule="nonzero" d="M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65"/>
        </svg>
      `;

      buttonText.html(tickMark)
      buttonText.addClass("button__circle").removeClass("btn-title")
      button.addClass("btn-animation-custon-send-first")

      setTimeout(() => {
        buttonText.text("Entrar em contato");
        buttonText.removeClass("button__circle").addClass("btn-title")
        button.removeClass("btn-animation-custon-send-first")
        $("#contact-form").get(0).reset()
      }, 3000);

    }

    return valid;
  });
})
