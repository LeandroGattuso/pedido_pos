function showAlert(titulo, mensaje, icono, boton) {
  Swal.fire({
    buttonsStyling: false,
    showCancelButton: false,
    customClass: {
      confirmButton: 'btn btn-primary btn-lg mr-2',
      loader: 'custom-loader',
    },

    position: 'top',
    title: titulo,
    text: mensaje,
    icon: icono,
    confirmButtonText: boton,
    toast: false
  });
}
