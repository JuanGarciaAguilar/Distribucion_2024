var openForm = function() {
    button.className = 'active';
};
function subirlabel() {
    var checkInput = function (input) {
        if (input.value.length > 0) {
            input.className = 'active';
        } else {
            input.className = '';
        }
    };
}
var checkInput = function(input) {
    if (input.value.length > 0) {
        input.className = 'active';
    } else {
        input.className = '';
    }
};

////Funciones para modal Cambiar Seccion
function closeModal(state) {
    $("#"+state).css({
      "display": "none"
    });
    $('body').removeClass('overlay');
}

function openModal(state) {
    $("#"+state).css({
      "display": "block"
    });
    $('body').addClass('overlay');
}

function confirmModal(opcion, rTitle, rText, uTitle, uText, dTitle, dText) {
  if (opcion == 'register') {
    swal(rTitle, rText, "success");
  } else if (opcion == 'update') {
    swal(uTitle, uText, "success");
  } else {
    swal(dTitle, dText, "success");
  }
  $(".btn-info").show();
}
