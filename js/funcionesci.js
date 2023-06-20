const urlci = 'https://backend-proyect.onrender.com/api/citas' // link de la api

const listarDatosci = async() => {
  let respuesta = '';
  let body = document.getElementById('contenido');

  fetch(urlci, {
      method: 'GET',
      mode: 'cors',
      headers: {"Content-type":"application/json; charset=UTF-8"}
  })
  .then((resp) => resp.json())
  .then(function(data){
      let listacitas = data.citas;
      return listacitas.map(function(citas){
          // Obtener solo la fecha en formato local
          let fecha = new Date(citas.fecha).toLocaleDateString();

          respuesta += `<tr><td>${citas.nombreYapellido}</td>` +
              `<td>${citas.telefono}</td>` +
              `<td>${fecha}</td>` +
              `<td>${citas.hora}</td>` +
              `<td>${citas.restrincciones}</td>` +
              `<td>${citas.estado}</td>` +
              `<td><a class="waves-effect waves-light btn orange" href="editarCita.html"><i class="material-icons left">create</i>Editar</a>` +
              ` <button id="btnEliminar" class="btn red waves-effect waves-light" onclick='eliminar("${citas._id}")' type="button" name="action">Eliminar
              <i class="material-icons left">delete</i></button>                  
              </td></tr>`;
          body.innerHTML = respuesta;
      })
  });
}

const registrarci = async () => {
  let _nombreYapellido = document.getElementById('nombreYapellido').value;
  let _telefono = document.getElementById('telefono').value;
  let _fecha = document.getElementById('fecha').value;
  let _hora = document.getElementById('hora').value;
  let _restrincciones = document.getElementById('restrincciones').value;
  let _estado = document.getElementById('estado').value;

  // Validación de campos vacíos
  if (
    _nombreYapellido.trim() === '' ||
    _telefono.trim() === '' ||
    _fecha.trim() === '' ||
    _hora.trim() === '' ||
    _restrincciones.trim() === '' ||
    _estado.trim() === ''
  ) {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
    );
    return;
  }

  // Validación del nombre y apellido
  if (!/^[A-Za-z\s]+$/.test(_nombreYapellido)) {
    Swal.fire(
      'El nombre y apellido solo deben contener letras y espacios',
      '',
      'error'
    );
    return;
  }

  // Validación del teléfono
  if (!/^\d+$/.test(_telefono)) {
    Swal.fire(
      'El teléfono solo debe contener números',
      '',
      'error'
    );
    return;
  }

  // Validación de la longitud del teléfono
  if (_telefono.length < 7 || _telefono.length > 10) {
    Swal.fire(
      'El teléfono debe tener entre 7 y 10 caracteres',
      '',
      'error'
    );
    return;
  }

  // Validación de la fecha
  if (new Date(_fecha) < new Date()) {
    Swal.fire(
      'La fecha no puede ser anterior a la fecha actual',
      '',
      'error'
    );
    return;
  }

  // Validación de la hora
  if (!/^\d{2}:\d{2}$/.test(_hora)) {
    Swal.fire(
      'La hora debe tener el formato HH:MM',
      '',
      'error'
    );
    return;
  }

  // Validación de las restricciones
  if (!/^[A-Za-z0-9\s]+$/.test(_restrincciones)) {
    Swal.fire(
      'Las restricciones solo deben contener letras, números y espacios',
      '',
      'error'
    );
    return;
  }

  let cita = {
    nombreYapellido: _nombreYapellido,
    telefono: _telefono,
    fecha: _fecha,
    hora: _hora,
    restrincciones: _restrincciones,
    estado: _estado,
  }

  fetch(urlci, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(cita),
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
    .then(() => {
      setTimeout(() => {
        window.location.href = "listarDatosci.html";
      }, 4000);
    })
    .catch(error => {
      Swal.fire(
        'Error al registrar la cita',
        '',
        'error'
      );
    });
}

// ACTUALIZAR DATOS
const actualizar = async () => {
  let _id = ''; // Obtén el ID de la cita que deseas editar

  // Obtener los elementos del formulario
  let _nombreYapellido = document.getElementById('nombreYapellido').value;
  let _telefono = document.getElementById('telefono').value;
  let _fecha = document.getElementById('fecha').value;
  let _hora = document.getElementById('hora').value;
  let _restrincciones = document.getElementById('restrincciones').value;
  let _estado = document.getElementById('estado').value;

  // let fechaISO = new Date(_fecha).toISOString().split('T')[0];

  // Validación de campos vacíos
  if (
    _nombreYapellido.trim() === '' ||
    _telefono.trim() === '' ||
    _fecha.trim() === '' ||
    _hora.trim() === '' ||
    _restrincciones.trim() === '' ||
    _estado.trim() === ''
  ) {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
    );
    return;
  }

  // Validación del nombre y apellido
  if (!/^[A-Za-z\s]+$/.test(_nombreYapellido)) {
    Swal.fire(
      'El nombre y apellido solo deben contener letras y espacios',
      '',
      'error'
    );
    return;
  }

  // Validación del teléfono
  if (!/^\d+$/.test(_telefono)) {
    Swal.fire(
      'El teléfono solo debe contener números',
      '',
      'error'
    );
    return;
  }

  // Validación de la longitud del teléfono
  if (_telefono.length < 7 || _telefono.length > 10) {
    Swal.fire(
      'El teléfono debe tener entre 7 y 10 caracteres',
      '',
      'error'
    );
    return;
  }

  // Validación de la fecha
  if (new Date(_fecha) < new Date()) {
    Swal.fire(
      'La fecha no puede ser anterior a la fecha actual',
      '',
      'error'
    );
    return;
  }

  // Validación de la hora
  if (!/^\d{2}:\d{2}$/.test(_hora)) {
    Swal.fire(
      'La hora debe tener el formato HH:MM',
      '',
      'error'
    );
    return;
  }

  // Validación de las restricciones
  if (!/^[A-Za-z0-9\s]+$/.test(_restrincciones)) {
    Swal.fire(
      'Las restricciones solo deben contener letras, números y espacios',
      '',
      'error'
    );
    return;
  }

  let cita = {
    nombreYapellido: _nombreYapellido,
    telefono: _telefono,
    fecha: fechaISO,
    hora: _hora,
    restrincciones: _restrincciones,
    estado: _estado,
  };

  // Realizar la solicitud PUT para actualizar la cita
  fetch(`${urlci}/${_id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(cita),
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
        window.location.href = "listarDatosci.html";
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
      fetch(urlci + "/?_id="+_id, {
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
            window.location.href = "listarDatosci.html";
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
  document.querySelector('#btnRegistrar').addEventListener('click', registrarci);
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}
