//LG: funcion para borrar todos los datos de localStorage
function borrarDatosDeLocalStorage_COBRO() {
  localStorage.removeItem('tip_com');
  localStorage.removeItem('cliente');
  localStorage.removeItem('raz_soc');
  localStorage.removeItem('vendedor');
  localStorage.removeItem('dir_entrega');
  localStorage.removeItem('tipoMedio');
  localStorage.removeItem('importe');
  localStorage.removeItem('tarjeta');
  localStorage.removeItem('cuotas');
  localStorage.removeItem('banco');
  localStorage.removeItem('promocion');
  localStorage.removeItem('totalPedido');
  localStorage.removeItem('totalMediosCobro');
  localStorage.removeItem('totalMediosCobroInterno');
  localStorage.removeItem('items');
}

//LG: funcion para borrar todos los datos de localStorage
function borrarDatosDeLocalStorage_CARRITO() {

  localStorage.setItem('totalCarrito', '0');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('cartDetails');
  localStorage.removeItem('itemDetails');
}

//LG: funcion para guardar datos en localStorage
function guardarDatosEnLocalStorage() {
  const tip_com = document.getElementById('tip_com').value;
  const cliente = document.getElementById('cliente').value;
  const razSoc = document.getElementById('raz_soc').value;
  const vendedor = document.getElementById('inputState').value;
  const dirEntrega = document.getElementById('dir_entrega').value;
  const tipoMedio = document.getElementById('tipo').value;
  const importe = document.getElementById('importe').value;
  const tarjeta = document.getElementById('tarjeta').value;
  const cuotas = document.getElementById('cuotas').value;
  const banco = document.getElementById('banco').value;
  const promocion = document.getElementById('promocion').value;
  const totalPedido = document.getElementById('total_ped').innerText;
  const totalMediosCobro = document.getElementById('total_med_cob').innerText;
  const totalMediosCobro_Interno = document.getElementById('total_med_cob_interno').innerText;

  //LG: guardar todos los datos en localStorage
  localStorage.setItem('tip_com', tip_com);
  localStorage.setItem('cliente', cliente);
  localStorage.setItem('raz_soc', razSoc);
  localStorage.setItem('vendedor', vendedor);
  localStorage.setItem('dir_entrega', dirEntrega);
  localStorage.setItem('tipoMedio', tipoMedio);
  localStorage.setItem('importe', importe);
  localStorage.setItem('tarjeta', tarjeta);
  localStorage.setItem('cuotas', cuotas);
  localStorage.setItem('banco', banco);
  localStorage.setItem('promocion', promocion);
  localStorage.setItem('totalPedido', totalPedido);
  localStorage.setItem('totalMediosCobro', totalMediosCobro);
  localStorage.setItem('totalMediosCobroInterno', totalMediosCobro_Interno);

  //LG: guardar los datos de la tabla 
  const rows = Array.from(document.querySelectorAll('#med_cob_Table tbody tr'));
  const items = rows.map(row => {
    return {
      tipo: row.cells[0].innerText,
      importe: row.cells[1].innerText,
      tarjeta: row.cells[2].innerText,
      cuotas: row.cells[3].innerText,
      valor_cuota: row.cells[4].innerText,
      banco: row.cells[5].innerText,
      promocion: row.cells[6].innerText,
      imp_a_cob: row.cells[7].innerText
    };
  });
  localStorage.setItem('items', JSON.stringify(items));
}


document.addEventListener('DOMContentLoaded', function () {

  /* *************************************************************************************************************** */
  // Recuperar datos del localStorage
  const tip_com = localStorage.getItem('tip_com');
  const cliente = localStorage.getItem('cliente');
  const razSoc = localStorage.getItem('raz_soc');
  const vendedor = localStorage.getItem('vendedor');
  const dirEntrega = localStorage.getItem('dir_entrega');
  const tipoMedio = localStorage.getItem('tipoMedio');
  const importe = localStorage.getItem('importe');
  const tarjeta = localStorage.getItem('tarjeta');
  const cuotas = localStorage.getItem('cuotas');
  const banco = localStorage.getItem('banco');
  const promocion = localStorage.getItem('promocion');
  const totalPedido = localStorage.getItem('totalPedido');
  const totalMediosCobro = localStorage.getItem('totalMediosCobro');
  const totalMediosCobroInterno = localStorage.getItem('totalMediosCobroInterno');
  const items = JSON.parse(localStorage.getItem('items')) || [];

  // Rellenar los campos del formulario
  if (tip_com) document.getElementById('tip_com').value = tip_com;
  if (cliente) document.getElementById('cliente').value = cliente;
  if (razSoc) document.getElementById('raz_soc').value = razSoc;
  if (vendedor) document.getElementById('inputState').value = vendedor;
  if (dirEntrega) document.getElementById('dir_entrega').value = dirEntrega;
  if (tipoMedio) document.getElementById('tipo').value = tipoMedio;
  if (importe) document.getElementById('importe').value = importe;
  if (tarjeta) document.getElementById('tarjeta').value = tarjeta;
  if (cuotas) document.getElementById('cuotas').value = cuotas;
  if (banco) document.getElementById('banco').value = banco;
  if (promocion) document.getElementById('promocion').value = promocion;
  if (totalPedido) document.getElementById('total_ped').innerText = totalPedido;
  if (totalMediosCobro) document.getElementById('total_med_cob').innerText = totalMediosCobro;
  if (totalMediosCobroInterno) document.getElementById('total_med_cob_interno').value = totalMediosCobroInterno;
  
  // Rellenar la tabla con los datos almacenados
  const tableBody = document.querySelector('#med_cob_Table tbody');
  items.forEach(item => {
    //LG: formatear la mascara del campo precio del datatable 
    const formattedPrice = new Intl.NumberFormat('es-AR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(item.importe);

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.tipo}</td>        
        <td>${formattedPrice}</td>
        <td>${item.tarjeta}</td>
        <td>${item.cuotas}</td>
        <td>${item.valor_cuota}</td>
        <td>${item.banco}</td>
        <td>${item.promocion}</td>
        <td>${item.imp_a_cob}</td>
        <td>
            <button class="btn btn-primary incrementar-btn borra-det-cob">
              <i class="bi bi-trash"></i>
            </button>
        </td>
    `;
    tableBody.appendChild(row);
  });

  /* *************************************************************************************************************** */


  // LG: total del carrito de la pantalla anterior index, obtenida desde localStorage   
  const totalCarrito = localStorage.getItem('totalCarrito');

  //LG: verificar si el totalCarrito es un numero valido antes de formatearlo
  if (totalCarrito && !isNaN(totalCarrito)) {
    const formattedTotal = new Intl.NumberFormat('es-AR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(totalCarrito));

    //LG: Asignar el valor al label "total_ped" para tener visible el total del comprobante
    const totalPedLabel = document.getElementById('total_ped');
    //totalPedLabel.textContent = totalCarrito;
    totalPedLabel.textContent = formattedTotal;
  }

  const inputState = document.getElementById('tipo');
  const importeInput = document.getElementById('importe');

  //LG: asignar el valor inicial del importe al seleccionar un tipo
  inputState.addEventListener('change', function () {

    //LG: el return total updateTotal() sirve para ir trayendo la diferencia en el importe
    importeInput.value = totalCarrito - updateTotal();

  });

  const agregarDetCobBtn = document.getElementById('agregar_det_cob');
  const medCobTable = document.getElementById('med_cob_Table').querySelector('tbody');
  const aceptarBtn = document.getElementById('aceptar_btn');
  const totalSpan = document.getElementById('total_med_cob');
  const totalSpanInterno = document.getElementById('total_med_cob_interno');

  //LG: función para agregar una nueva fila a la tabla
  agregarDetCobBtn.addEventListener('click', function () {

    const tipo = document.getElementById('tipo').value;
    const importeValue = document.getElementById('importe').value;
    const importe = parseFloat(importeValue);
    const tarjeta = document.getElementById('tarjeta').value;
    const cuotas = document.getElementById('cuotas').value;
    const valor_cuota = 0.00;
    const banco = document.getElementById('banco').value;
    const promocion = document.getElementById('promocion').value;
    const imp_a_cob = 0.00;

    //LG: si no completa tipo e importe, no agrega datos en la grilla de medios de cobro
    if (!tipo || !importe) {
      //alert('Por favor, complete los campos obligatorios.');
      return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
          <td>${tipo}</td>
          <td>${importe.toFixed(2)}</td>
          <td>${tarjeta}</td>
          <td>${cuotas}</td>
          <td>${valor_cuota.toFixed(2)}</td> 
          <td>${banco}</td>
          <td>${promocion}</td>
          <td>${imp_a_cob.toFixed(2)}</td>
          <td>
            <button class="btn btn-primary incrementar-btn borra-det-cob">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;

    medCobTable.appendChild(newRow);
    updateTotal();
    resetForm();

  });

  //LG: función para eliminar una fila de la tabla
  medCobTable.addEventListener('click', function (event) {
    if (event.target.closest('.borra-det-cob')) {
      const row = event.target.closest('tr');
      row.parentNode.removeChild(row);
      updateTotal();
    }
  });

  //LG: funcion para verificar los totales y actualizar el icono check
  function verificarTotales_Check() {
    const totalMediosCobroInterno = parseFloat(totalSpanInterno.innerText).toFixed(2);
    const totalCarrito = parseFloat(localStorage.getItem('totalCarrito')).toFixed(2);

    const checkIcon = document.getElementById('check_tot_ok');

    if (totalMediosCobroInterno === totalCarrito) {
      checkIcon.style.display = 'inline'; // Mostrar el icono
    } else {
      checkIcon.style.display = 'none'; // Ocultar el icono
    }
  }

  ////LG: función para actualizar el total
  function updateTotal() {
    let total = 0;
    const rows = medCobTable.querySelectorAll('tr');
    rows.forEach(row => {
      const importe = parseFloat(row.cells[1].innerText);
      if (!isNaN(importe)) {
        total += importe;
      }
    });
    totalSpanInterno.innerText = total.toFixed(2);

    // LG: esto formatea la mascara del total pedido, pero al validar, da mal la comparacion
    const formattedTotal = new Intl.NumberFormat('es-AR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(total));

    totalSpan.textContent = formattedTotal;

    verificarTotales_Check(); //LG: llama a la función para verificar los totales y actualizar el icono 

    return total; // LG: se usa en el cambiar del campo "Tipo" para poder ir actualizando el importe a asignar
  }

  //LG: funcion para resetear el formulario después de agregar un registro
  function resetForm() {
    document.getElementById('tipo').value = '';
    document.getElementById('importe').value = '';
    document.getElementById('tarjeta').value = '';
    document.getElementById('cuotas').value = '';
    document.getElementById('banco').value = '';
    document.getElementById('promocion').value = '';


  }

  //LG: VALIDACIONES AL ACEPTAR:
  //verificar si la tabla está vacía antes de permitir el submit
  aceptarBtn.addEventListener('click', function () {

    const tip_comSelect = document.getElementById('tip_com');
    const clienteSelect = document.getElementById('cliente');
    const razSocInput = document.getElementById('raz_soc');
    const vendedorSelect = document.getElementById('inputState');

    if (tip_comSelect.value === '') {
      event.preventDefault(); //LG: previene el envio del formulario

      showAlert('Atención!', 'El campo "Tipo comp." debe contener un valor', 'info', 'Aceptar');
      return;
    }
    
    if (clienteSelect.value === '') {
      event.preventDefault();

      showAlert('Atención!', 'El campo "Cliente" debe contener un valor', 'info', 'Aceptar');
      return;
    }

    if (razSocInput.value.trim() === '') {
      event.preventDefault(); 

      showAlert('Atención!', 'El campo "Nombre y apellido / Raz. social" debe contener un valor', 'info', 'Aceptar');
      return;
    }

    if (vendedorSelect.value === '') {
      event.preventDefault();

      showAlert('Atención!', 'El campo "Vendedor" debe contener un valor', 'info', 'Aceptar');
      return;
    }    

    const rowCount = medCobTable.rows.length;
    const totalMediosCobro = parseFloat(totalSpan.innerText).toFixed(2); //LG: se usa para mostrar con la mascara
    const totalMediosCobro_interno = parseFloat(totalSpanInterno.innerText).toFixed(2); //LG: se usa para la validacion

    // LG: total del carrito de la pantalla anterior index, obtenida desde localStorage    
    const totalCarrito = localStorage.getItem('totalCarrito');

    if (rowCount === 0) {
      event.preventDefault();

      showAlert('Atención!', 'Debe agregar los medios de cobro', 'info', 'Aceptar');
      return; //ver
    }
    if (totalMediosCobro <= 0) {
      event.preventDefault();

      showAlert('Atención!', 'El total debe ser mayor a cero', 'info', 'Aceptar');
      return; //ver
    }

    if (totalMediosCobro_interno !== totalCarrito) {
      event.preventDefault();

      showAlert('Atención!', 'El total del pedido no coincide con el total de medios de cobro', 'info', 'Aceptar');
      return; //ver
    }


    borrarDatosDeLocalStorage_CARRITO();
    borrarDatosDeLocalStorage_COBRO();

    window.location.href = 'index.html';

  });

  //LG: vuelve al index para ver el carrito con lo que tenia guardado
  document.getElementById('atras_ir_a_carrito').addEventListener('click', function () {

    guardarDatosEnLocalStorage(); //LG: guarda los datos antes de redirigir
    window.location.href = 'index.html';

  });

});


