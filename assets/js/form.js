$(document).ready(function () {
  $("#select-people").change(function () {
    var typePerson = $(this).val()
    $("input[type=hidden]").remove()
    switch (typePerson) {
      case "Pessoa Física":
        $("#form-precatorios").append(
          $('<input type="hidden" name="entry.170406703" value="Pessoa Física">')
        )
        break;

      case "Pessoa Jurídica":
        $("#form-precatorios").append(
          $('<input type="hidden" name="entry.170406703" value="Pessoa Jurídica">')
        )

        break;

      default:
        break;
    }
  })
})
