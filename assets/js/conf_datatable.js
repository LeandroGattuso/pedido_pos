//CONFIGURACION DATA TABLE ***************************************************************************** 
let dataTable = null;
let dataTableIsInitialized = false;

const dataTableOptions = {


  colReorder: false,
  autoWidth: false,
  columnDefs: [
    { width: '5%', targets: 0, orderable: false },
    { width: '10%', targets: 1, orderable: false },
    { width: '50%', targets: 2, orderable: false },
    { width: '10%', targets: 3, orderable: false },
    { width: '10%', targets: 4, orderable: false },
    { width: '5%', targets: 5, orderable: false },
    { width: '5%', targets: 6, orderable: false },
    { width: '5%', targets: 7, orderable: false },
    { width: '5%', targets: 8, orderable: false },
    { width: '5%', targets: 9, orderable: false }
  ],
  fixedColumns: true,
  language: {
    lengthMenu: "_MENU_",
    zeroRecords: "No se encontraron resultados",
    info: "",
    infoEmpty: "",
    infoFiltered: "",
    oPaginate: {
      sFirst: "Primero",
      sLast: "Último",
      sNext: "Siguiente",
      sPrevious: "Anterior"
    },
    sSearch: "Buscar",
    sProcessing: "Procesando..."
  }
};

const initDataTable = () => {
  if (!dataTableIsInitialized) {
    if (dataTable) {
      dataTable.destroy();
    }
    dataTable = $('#productTable').DataTable(dataTableOptions);
    dataTableIsInitialized = true;
  }
};

/* FIN DATA TABLE LG */

document.addEventListener('DOMContentLoaded', function () {
  //initDataTable(); //LG: si se activa no anda la paginacion del data table
});
