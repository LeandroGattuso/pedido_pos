
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function (e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function (e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  /* LG, poner
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })
*/


})();

/* LG ********************************************************************************************** */

/*LG: al hacer click sobre la imagen de la grilla la abre en una ventana modal*/
function showModal_Foto(imageSrc) {
  var modalImage = document.getElementById('modalImage');
  modalImage.src = imageSrc;
  var myModal = new bootstrap.Modal(document.getElementById('imageModal'));
  myModal.show();
}


/*LG: logica para llenar el carrito modal dinamicamente */

let items = {};
let itemDET_COM = []; //LG: array para almacenar los detalles de los items
let itemDetails = {}; //LG: objeto para almacenar temporalmente los valores de los inputs

function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
}

function updateTotal() {
  let total = 0;
  Object.values(items).forEach(item => {
    total += item.price * item.quantity;
  });
  document.getElementById('total-general').textContent = `Total: ${formatCurrency(total)}`;

  //LG: guardar el total para compararlo en los medios de cobro
  const totalCarrito = total.toFixed(2); //LG: mantener dos decimales
  localStorage.setItem('totalCarrito', totalCarrito.toString());
}

//LG: funcion para incrementar numero del carrito visual
function ActualizarContCarrito() {
  const cartCount = Object.values(items).reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cant_carrito').innerText = cartCount;
}

function updateModal() {
  const carritoItems = document.getElementById('carrito-items');
  //LG: se para la leyenda del carrito vacio
  const carritoVacio = document.getElementById('carrito-vacio');

  carritoItems.innerHTML = '';
  let count = 0; //LG: contador para los elementos que cumplen la condición

  Object.values(items).forEach(item => {
    if (item.quantity > 0) {
      const itemRow = document.createElement('div');
      count++;

      //LG: aplicar clase especial de la linea solo a partir del segundo elemento
      if (count > 1) {
        itemRow.className = 'row mt-4 border-top pt-4';
      } else {
        itemRow.className = 'row';
      }

      itemRow.innerHTML = `
        <div class="col-md-2">
          <img src="${item.imgSrc}" alt="${item.name}" class="flex-shrink-0" width="48" height="48">
        </div>
        <div class="col-md-5 ms-auto">${item.name}</div>
        <div class="col-md-5">
          <button type="button" class="btn btn-primary btn-sm" onclick="decreaseItem('${item.data_id}')"><i class="bi bi-dash"></i></button>
          <button type="button" class="btn btn-primary btn-sm" onclick="increaseItem('${item.data_id}')"><i class="bi bi-plus"></i></button>
          <button type="button" class="btn btn-primary btn-sm" onclick="removeItem('${item.data_id}')"><i class="bi bi-trash"></i></button>
          <button type="button" class="btn btn-outline-primary btn-sm toggle-more-btn" onclick="VerMas_Menos(this)">Ver más</button>
        </div>
        
          <div class="row" id="${item.data_id}">
            <div class="col-sm-4"><strong>${formatCurrency(item.price)}</strong></div>
            <div class="col-sm-4"><strong>Cant.: ${item.quantity}</strong></div>
            <div class="col-sm-4"><strong>${formatCurrency(item.price * item.quantity)}</strong></div>
          </div>
          <div class="row hidden-fields" style="display: none;">
            <div class="row"  id="${item.data_id}">
              <div class="col-sm-6">
                <label for="bonif-${item.data_id}" class="form-label">Bonif. %</label>
                <input type="number" class="form-control" id="bonif-${item.data_id}" data-id="${item.data_id}">
              </div>
              <div class="col-sm-6">
                <label for="deposito-${item.data_id}" class="form-label">Depósito</label>
                <select id="deposito-${item.data_id}" class="form-select" required>
                 <option value="" selected disabled></option>
                  <option>RUTA 21</option>
                  <option>LOPEZ M</option>
                  <option>CATAN JD</option>
                  <option>LURO</option>
                  <option>WEB</option>
                </select>
              </div>              
            </div>
            <div class="row" id="${item.data_id}">
              <div class="col-sm-6">
                <label for="entrega-${item.data_id}" class="form-label">Entrega</label>
                <select id="entrega-${item.data_id}" class="form-select" required>
                 <option value="" selected disabled></option>
                  <option>Retira</option>
                  <option>Envío</option>
                  <option>A definir</option>
                </select>
              </div>              
              <div class="col-sm-6">
                <label for="fec_ent-${item.data_id}" class="form-label">Fec. Entrega</label>
                <input type="date" class="form-control" id="fec_ent-${item.data_id}">
              </div>
            </div>

            <div class="row" id="${item.data_id}">
              <div class="col-sm-6">
                <label for="dep_entrega-${item.data_id}" class="form-label">Dep. entrega</label>
                <select id="dep_entrega-${item.data_id}" class="form-select" required>
                 <option value="" selected disabled></option>
                  <option>RUTA 21</option>
                  <option>LOPEZ M</option>
                  <option>CATAN JD</option>
                  <option>LURO</option>
                  <option>WEB</option>
                </select>
              </div>
              <div class="col-sm-6">
                
              </div>
            </div>

            <div class="row" id="${item.data_id}">
             <div class="col-6" style="visibility: hidden">
               <button type="button" class="btn btn-outline-primary btn-sm toggle-more-btn" id="guardar_art_interno"
                    data-bs-dismiss="modal">Guardar</button> 
              </div>
              <div class="col-6">
               <button type="button" class="btn btn-outline-primary btn-sm toggle-more-btn" id="guardaArtDet"
                        onclick="guardarArtCarrito('${item.data_id}')">Guardar</button>
              </div>
            </div>

          </div>
        
      `;
      carritoItems.appendChild(itemRow);

      //LG: restaurar los valores de los inputs si existen en itemDetails
      if (itemDetails[item.data_id]) {
        document.getElementById(`bonif-${item.data_id}`).value = itemDetails[item.data_id].bonif;
        document.getElementById(`entrega-${item.data_id}`).value = itemDetails[item.data_id].entrega;
        document.getElementById(`dep_entrega-${item.data_id}`).value = itemDetails[item.data_id].depEntrega;
        document.getElementById(`fec_ent-${item.data_id}`).value = itemDetails[item.data_id].fecEnt;
        document.getElementById(`deposito-${item.data_id}`).value = itemDetails[item.data_id].deposito;
      }

    }
  });

  ActualizarContCarrito(); //LG: actualiza el contador del carrito

  //LG: se para la leyenda del carrito vacio
  if (count === 0) {
    carritoVacio.style.display = 'block';
  } else {
    carritoVacio.style.display = 'none';
  }
}

function VerMas_Menos(button) {
  const hiddenFields = button.closest('.row').querySelector('.hidden-fields');
  if (hiddenFields) {
    if (hiddenFields.style.display === 'none') {
      hiddenFields.style.display = 'block';
      button.textContent = 'Ver menos';
    } else {
      hiddenFields.style.display = 'none';
      button.textContent = 'Ver más';
    }
  }
}

//LG: esta funcion es para actualizar el array de det_com sin guardar, solo cuando se tocan los botones de mas y menos del carrito
function updateItemDET_COM(data_id) {
  // Encuentra el ítem en `items`
  const item = items[data_id];

  if (item) {
    // Obtiene los valores actuales de los inputs para el item
    const bonif = document.querySelector(`#bonif[data-id="${data_id}"]`)?.value || '';
    const entrega = document.querySelector(`#entrega[data-id="${data_id}"]`)?.value || '';
    const depEntrega = document.querySelector(`#dep_entrega[data-id="${data_id}"]`)?.value || '';
    const fecEnt = document.querySelector(`#fec_ent[data-id="${data_id}"]`)?.value || '';
    const deposito = document.querySelector(`#deposito[data-id="${data_id}"]`)?.value || '';

    //LG: crea un objeto para los detalles del item
    const itemDetails = {
      data_id: item.data_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
      bonif: bonif,
      entrega: entrega,
      depEntrega: depEntrega,
      fecEnt: fecEnt,
      deposito: deposito
    };

    //LG: actualiza itemDET_COM, reemplaza el ítem si ya existe
    const index = itemDET_COM.findIndex(det => det.data_id === data_id);
    if (index !== -1) {
      itemDET_COM[index] = itemDetails;
    } else {
      itemDET_COM.push(itemDetails);
    }
  }
}



function increaseItem(data_id) {

  //LG: guarda los valores actuales de los inputs antes de modificar el item
  saveInputValues(data_id);

  Object.values(items).forEach(item => {
    if (item.data_id === data_id) {
      item.quantity += 1;
    }
  });

  //LG: esta funcion es para actualizar el array de det_com sin guardar, solo cuando se tocan los botones de mas y menos del carrito
  updateItemDET_COM(data_id);

  updateModal();
  updateTotal();
  guardarArtCarrito(data_id); // Guarda los detalles después de actualizar

  //console.log('Detalles guardados increase:', itemDET_COM);
}

function decreaseItem(data_id) {

  //LG: guarda los valores actuales de los inputs antes de modificar el item
  saveInputValues(data_id);

  Object.values(items).forEach(item => {
    if (item.data_id === data_id && item.quantity > 0) {
      item.quantity -= 1;
    }
  });

  //LG: esta funcion es para actualizar el array de det_com sin guardar, solo cuando se tocan los botones de mas y menos del carrito  
  updateItemDET_COM(data_id);

  updateModal();
  updateTotal();
  guardarArtCarrito(data_id); // Guarda los detalles después de actualizar

  //console.log('Detalles guardados decrease:', itemDET_COM);
}

function removeItem(data_id) {

  //LG: eliminar el item del array itemDET_COM
  itemDET_COM = itemDET_COM.filter(item => item.data_id !== data_id);
  delete itemDetails[data_id];

  Object.values(items).forEach(item => {
    if (item.data_id === data_id) {
      item.quantity = 0;
    }
  });
  updateModal();
  updateTotal();

  //console.log('Detalles guardados:', itemDET_COM);
}

//LG: es la funcion para no perder los valores de los campos del carrito al tocar las cantidades
function saveInputValues(data_id) {
  const bonifInput = document.getElementById(`bonif-${data_id}`);
  const entregaSelect = document.getElementById(`entrega-${data_id}`);
  const depEntregaSelect = document.getElementById(`dep_entrega-${data_id}`);
  const fecEntInput = document.getElementById(`fec_ent-${data_id}`);
  const depositoSelect = document.getElementById(`deposito-${data_id}`);

  if (bonifInput && entregaSelect && depEntregaSelect && fecEntInput && depositoSelect) {
    itemDetails[data_id] = {
      bonif: bonifInput.value,
      entrega: entregaSelect.value,
      depEntrega: depEntregaSelect.value,
      fecEnt: fecEntInput.value,
      deposito: depositoSelect.value
    };
  }
}

//LG: es para guardar todos los articulos del carrito, luego usarlo para agregar el detalle en la api
function guardarArtCarrito(data_id) {

  saveInputValues(data_id); //LG: guardar los valores antes de actualizar

  const bonifInput = document.getElementById(`bonif-${data_id}`);
  const entregaSelect = document.getElementById(`entrega-${data_id}`);
  const depEntregaSelect = document.getElementById(`dep_entrega-${data_id}`);
  const fecEntInput = document.getElementById(`fec_ent-${data_id}`);
  const depositoSelect = document.getElementById(`deposito-${data_id}`);

  const bonif = bonifInput.value;
  const entrega = entregaSelect.value;
  const depEntrega = depEntregaSelect.value;
  const fecEnt = fecEntInput.value;
  const deposito = depositoSelect.value;

  const item = items[data_id];
  const price = item.price;
  const quantity = item.quantity;
  const totalPrice = price * quantity;

  const existingItemIndex = itemDET_COM.findIndex(det => det.data_id === data_id);

  if (existingItemIndex !== -1) {
    //LG: si el item ya existe, actualiza sus valores
    itemDET_COM[existingItemIndex] = {
      data_id,
      name: item.name,
      bonif,
      entrega,
      depEntrega,
      fecEnt,
      deposito,
      price,
      quantity,
      totalPrice
    };
  } else {
    //LG: si el item no existe, lo agrega al array
    itemDET_COM.push({
      data_id,
      name: item.name,
      bonif,
      entrega,
      depEntrega,
      fecEnt,
      deposito,
      price,
      quantity,
      totalPrice
    });

    //LG: cerrar el div correspondiente al data_id, no anda **
    /*const detailRow = document.getElementById(data_id);
    if (detailRow) {
      alert('aaaa');
      detailRow.style.display = 'none';
    }*/

  }

  //console.log('Detalles guardados:', itemDET_COM);
}

//LG: funcion para guardar el estado del carrito en localStorage para no perderlo cuando se va a cobro
function saveCartState() {
  localStorage.setItem('cartItems', JSON.stringify(items));
  localStorage.setItem('cartDetails', JSON.stringify(itemDET_COM));
  localStorage.setItem('itemDetails', JSON.stringify(itemDetails));
}


//LG: funcion para la api
const mainFunc = async () => {

  const app = '39';
  const config = '195';
  const username = 'administrador';
  const password = 'Its4779';

  try {
    // LG: obtener token inicial
    const authResponse = await authenticate(app, config, username, password);

    if (!authResponse || !authResponse.access_token) {
      throw new Error('Error con token API');
    }

    const token = authResponse.access_token;

    //LG: GET a clases
    const dsData = await getData('ERP_ART_BUS_POS', token);
    let dsListaIntegral = dsData.data;

    //LG: tomar los datos
    const productTableBody = document.querySelector('#productTable tbody');
    productTableBody.innerHTML = ''; //LG: limpia cualquier fila existente

    dsListaIntegral.forEach(item => {
      const newRow = document.createElement('tr');


      //LG: formatear la mascara del campo precio del datatable 
      const formattedPrice = new Intl.NumberFormat('es-AR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(item.PRECIO);

      //LG: tomar la foto de la base o ver...

      newRow.innerHTML = `
        <th>
          <div class="img-container">
            <img src="assets/img/celular_2.png" class="img-thumbnail imagen-grilla-hover" alt=""
              onclick="showModal_Foto('assets/img/celular_2.png')">  
          </div>
        </th>
        <td class="item-id">${item.ID}</td>
        <td>${item.DESCRIPCION}</td>
        <td>${item.Z_FK_ERP_AGR_ART}</td>
        <td>${item.Z_FK_ERP_MARCAS}</td>
        <td class="price">${formattedPrice}</td>
        <td>${item.STOCK_SUCURSAL}</td>
        <td>${item.STOCK_DEPOSITO}</td>
        <td>${item.STOCK_TOTAL}</td>
        <td>
          <button id="agregar_item" class="btn btn-primary incrementar-btn" data-id="${item.ID}">
            <i class="bi bi-plus"></i>
          </button>
        </td>
      `;

      productTableBody.appendChild(newRow);

      //LG: agregar el artículo al objeto items
      items[item.ID] = {
        name: item.DESCRIPCION,
        category: item.Z_FK_ERP_AGR_ART,
        brand: item.Z_FK_ERP_MARCAS,
        price: parseFloat(item.PRECIO),
        quantity: 0,
        imgSrc: 'assets/img/celular_2.png' //LG: traer de la base
      };

    });


    //LG: agregar los event listeners iniciales
    addIncrementListeners();

    //LG: agregar event listeners cada vez que se redibuja la tabla
    table.on('draw.dt', function () {
      addIncrementListeners();
    });

    //LG: inicializar DataTable
    if (!dataTableIsInitialized) {
      initDataTable();
    }

    //LG: agregar evento listeners a los botones de incremento y al de animacion porque sino no andan por el recargar del datatable
    function addIncrementListeners() {

      //LG: Inicializar los datos de la tabla
      //LG: Recorrer las filas de la tabla
      const resume_table = document.getElementById("productTable");
      const tableRows = resume_table.getElementsByTagName('tr');

      for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const itemIdElement = row.querySelector('.item-id');

        if (itemIdElement) {

          const itemId = itemIdElement.textContent.trim();
          const itemName = row.querySelector('td:nth-child(3)').textContent.trim();
          const itemCategory = row.querySelector('td:nth-child(4)').textContent.trim();
          const itemBrand = row.querySelector('td:nth-child(5)').textContent.trim();
          const itemPrice = parseFloat(row.querySelector('td:nth-child(6)').textContent.trim().replace('.', '').replace(',', '.'));
          const itemStock = parseInt(row.querySelector('td:nth-child(7)').textContent.trim(), 10);
          const itemImgSrc = row.querySelector('img')?.src || '';


          items[itemId] = {
            data_id: itemId,
            name: itemName,
            category: itemCategory,
            brand: itemBrand,
            price: itemPrice,
            quantity: 0,
            imgSrc: itemImgSrc
          };

          //console.log(`Data ID: ${items[itemId].data_id}`);
        }

      }

      /**¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ */
      //LG: restaurar el estado del carrito desde localStorage cuando se viene de cobro.html
      const storedItems = localStorage.getItem('cartItems');
      const storedDetails = localStorage.getItem('cartDetails');
      const storedItemDetails = localStorage.getItem('itemDetails');

      if (storedItems) {
        items = JSON.parse(storedItems);
      }
      if (storedDetails) {
        itemDET_COM = JSON.parse(storedDetails);
      }
      if (storedItemDetails) {
        itemDetails = JSON.parse(storedItemDetails);
      }

      updateModal();
      updateTotal();
      /**¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ */

      document.querySelectorAll('.incrementar-btn').forEach(function (button) {
        button.addEventListener('click', function () {
          const itemId = this.getAttribute('data-id');
          if (items[itemId]) {

            if (items[itemId].quantity === 0) {
              items[itemId].quantity = 1;
            } else {
              //LG: con este else, sigue sumando "Cant." cada vez que se agrega desde la grilla con el boton +
              items[itemId].quantity += 1;
            }
            updateModal();
            updateTotal();

            //LG: llamar a guardarArtCarrito despues de incrementar
            guardarArtCarrito(itemId);
            ActualizarContCarrito(); //LG: actualiza el contador del carrito

          } else {
            console.error(`error con art. ID ${itemId} `);
          }
        });
      });

      /*LG: animacion de cuando se agregan articulos al carrito arriba grilla */
      const carritoButton = document.getElementById('carritoButton');

      document.querySelectorAll('.incrementar-btn').forEach(function (button) {
        button.addEventListener('click', function () {
          // Añade la animación
          carritoButton.classList.add('animate__animated', 'animate__tada');

          // Elimina la animación después de que termine
          carritoButton.addEventListener('animationend', function () {
            carritoButton.classList.remove('animate__animated', 'animate__tada');
          }, { once: true });

        });
      });

    }

  } catch (error) {
    console.error('Error:', error);
  }

}



document.addEventListener('DOMContentLoaded', async function () {

  //LG: llamado a la API 
  mainFunc().then(() => {
    initDataTable();
  });
  //fin API

  //LG: evento para abrir mas iconos en el detalle del carrito"
  document.querySelectorAll('.toggle-more-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      const hiddenFields = this.closest('.row').nextElementSibling.querySelector('.hidden-fields');
      if (hiddenFields) {
        if (hiddenFields.style.display === 'none' || hiddenFields.style.display === '') {
          hiddenFields.style.display = 'flex';
          this.textContent = 'Ver menos';
        } else {
          hiddenFields.style.display = 'none';
          this.textContent = 'Ver más';
        }
      }
    });
  });

  //LG: evento para redirigir a "cobro.html"
  document.getElementById('iniciarVentaButton').addEventListener('click', function () {

    let totalGeneralText = document.getElementById('total-general').innerText;
    totalGeneralText = totalGeneralText.replace(/\s+/g, ''); //LG: sacar los espacios   
    if (totalGeneralText == "Total:$0,00") {
      showAlert('Atención!', 'Debe agregar artículos al pedido', 'info', 'Aceptar');
    } else {
      saveCartState(); //LG: guardar el estado del carrito
      window.location.href = 'cobro.html';
    }

  });


  //LG: se Llama aca esta funcion para asegurar que el estado inicial se refleja correctamente (solo para el cartel de carrito vacio)
  updateModal();

});

