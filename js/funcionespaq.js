const urlpa = 'https://backend-proyect.onrender.com/api/paquetes' // link de la api

const listarDatospaq = async() => {
    let respuesta= ''
    let body = document.getElementById('contenido')

    //url: es la url de la api
    // Al despegar en el servidor colocar la api del servidor
    fetch(urlpa, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type":"application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data){
        let listapaquetes = data.paquetes
        return listapaquetes.map(function(paquetes){
          respuesta += `<tr><td>${paquetes.paquetes}</td>` +
                `<td>${paquetes.servicios}</td>` +
                `<td>${paquetes.cantidad}</td>` +
                `<td>${paquetes.total}</td>` +
                `<td>${paquetes.estado}</td>` +
                `<td>
                  <a class="waves-effect waves-light btn orange" href="editarPaquete.html"><i class="material-icons left">create</i>Editar</a>                     
                  <button id="btnEliminar" class="btn red waves-effect waves-light" onclick='eliminar("${paquetes._id}")' type="button" name="action">Eliminar
                  <i class="material-icons left">delete</i></button>                  
                  </td></tr>`;
            body.innerHTML=respuesta
        })
    })
}

 // Agregar el evento input al campo "Cantidad"
 const cantidadInput = document.getElementById('cantidad');
 if (cantidadInput) {
   cantidadInput.addEventListener('input', generarOpcionesServicio);
 }
 function generarOpcionesServicio() {
   const cantidad = document.getElementById('cantidad').value;
   const serviciosContainer = document.getElementById('serviciosContainer');
   serviciosContainer.innerHTML = ''; // Limpiar las opciones existentes

   const opcionesServicio = ['Rumba', 'Spa', 'Spinning', 'Maquinas', 'Nutricion', 'Evaluacion', 'Clase', 'Acompañamiento'];

   if (cantidad > 0 && cantidad <= 5) {
     for (let i = 0; i < cantidad; i++) {
       const rowDiv = document.createElement('div');
       rowDiv.className = 'row';
       const inputFieldDiv = document.createElement('div');
       inputFieldDiv.className = 'input-field col s6';
       const select = document.createElement('select');
       select.className = 'browser-default';

       const defaultOption = document.createElement('option');
       defaultOption.value = '';
       defaultOption.disabled = true;
       defaultOption.selected = true;
       defaultOption.textContent = 'Seleccionar servicio';

       select.appendChild(defaultOption);

       opcionesServicio.forEach((opcion) => {
         const option = document.createElement('option');
         option.value = opcion;
         option.textContent = opcion;
         select.appendChild(option);
       });

       inputFieldDiv.appendChild(select);
       rowDiv.appendChild(inputFieldDiv);
       serviciosContainer.appendChild(rowDiv);
     }
   }
 }

 const registrarpaq = async () => {
  let _paquetes = document.getElementById('paquetes').value;
  let _cantidad = document.getElementById('cantidad').value;
  let _total = document.getElementById('total').value;
  let _estado = document.getElementById('estado').value;

  const serviciosSelects = document.querySelectorAll('#serviciosContainer select');
  const _servicios = Array.from(serviciosSelects).map((select) => select.value);

  // Validación de campos vacíos
  if (
    _paquetes.trim() === '' ||
    _cantidad.trim() === '' ||
    _total.trim() === '' ||
    _estado.trim() === ''
  ) {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
    );
    return;
  }

  // Validación de paquetes
  if (!/^[A-Za-z0-9]+$/.test(_paquetes)) {
    Swal.fire(
      'El nombre de paquete solo debe contener letras y números',
      '',
      'error'
    );
    return;
  }

  // Validación de la cantidad
  if (!/^\d+$/.test(_cantidad)) {
    Swal.fire(
      'La cantidad debe ser un número entero',
      '',
      'error'
    );
    return;
  }

  // Validación del rango de la cantidad
  if (_cantidad < 1 || _cantidad > 5) {
    Swal.fire(
      'La cantidad debe estar entre 1 y 5',
      '',
      'error'
    );
    return;
  }

  // Validación del total
  if (!/^\d+$/.test(_total)) {
    Swal.fire(
      'El total debe ser un número entero',
      '',
      'error'
    );
    return;
  }

  // Validación del rango del total
  if (_total < 4000 || _total > 1000000) {
    Swal.fire(
      'El total debe estar entre 4000 y 1000000',
      '',
      'error'
    );
    return;
  }

  let paquete = {
    paquetes: _paquetes,
    cantidad: _cantidad,
    servicios: _servicios,
    total: _total,
    estado: _estado,
  };

  fetch(urlpa, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(paquete),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
      // Aquí puedes realizar otras acciones después de registrar el paquete
    })
    .then(() => {
      setTimeout(() => {
        window.location.href = "listarDatospaq.html";
      }, 4000);
    })
    .catch(error => {
      Swal.fire(
        'Error al registrar el paquete',
        '',
        'error'
      );
    });
};

// ACTUALIZAR DATOS
const actualizar = async () => {
  let _id = ''; // Obtén el ID de la cita que deseas editar

  // Obtener los elementos del formulario
  let _paquetes = document.getElementById('paquetes').value;
  let _cantidad = document.getElementById('cantidad').value;
  let _total = document.getElementById('total').value;
  let _estado = document.getElementById('estado').value;

  const serviciosSelects = document.querySelectorAll('#serviciosContainer select');
  const _servicios = Array.from(serviciosSelects).map((select) => select.value);

  // Validación de campos vacíos
  if (
    _paquetes.trim() === '' ||
    _cantidad.trim() === '' ||
    _total.trim() === '' ||
    _estado.trim() === ''
  ) {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
    );
    return;
  }

  // Validación de paquetes
  if (!/^[A-Za-z0-9]+$/.test(_paquetes)) {
    Swal.fire(
      'El nombre de paquete solo debe contener letras y números',
      '',
      'error'
    );
    return;
  }

  // Validación de la cantidad
  if (!/^\d+$/.test(_cantidad)) {
    Swal.fire(
      'La cantidad debe ser un número entero',
      '',
      'error'
    );
    return;
  }

  // Validación del rango de la cantidad
  if (_cantidad < 1 || _cantidad > 5) {
    Swal.fire(
      'La cantidad debe estar entre 1 y 5',
      '',
      'error'
    );
    return;
  }

  // Validación del total
  if (!/^\d+$/.test(_total)) {
    Swal.fire(
      'El total debe ser un número entero',
      '',
      'error'
    );
    return;
  }

  // Validación del rango del total
  if (_total < 4000 || _total > 1000000) {
    Swal.fire(
      'El total debe estar entre 4000 y 1000000',
      '',
      'error'
    );
    return;
  }

  let paquete = {
    paquetes: _paquetes,
    cantidad: _cantidad,
    servicios: _servicios,
    total: _total,
    estado: _estado,
  };

  // Realizar la solicitud PUT para actualizar la cita
  fetch(`${urlpa}/${_id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(paquete),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resp) => resp.json())
    .then(json => {
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    })
    .then(()=>{
      setTimeout(()=>{
        window.location.href = "listarDatospaq.html";
      },3000);
     })
    .catch(error => {
      Swal.fire(
        'Error al actualizar la cita',
        '',
        'error'
      );
    });
}

const eliminar = (_id) => {
  Swal.fire({
    title: 'Esta seguro de realizar la eliminacion',
  
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No'

  }).then((result) => {
    if (result.isConfirmed) {
      // alert(_id)
      fetch(urlpa + "/?_id="+_id, {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
        .then((resp) => resp.json())
        .then(json => {
          console.log(json.msg)
          Swal.fire('Eliminacion exitosa', json.msg, 'success');
        })
        .then(()=>{
          setTimeout(()=>{
            window.location.href = "listarDatospaq.html";
          },3000);
         })
        .catch(error => {
          alert(error.message)
          Swal.fire('Error en la eliminacion', error.message, 'error');
        });
    }
  });
};

 if (document.querySelector('#btnRegistrar')) {
   document.querySelector('#btnRegistrar').addEventListener('click', registrarpaq);
 }

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}