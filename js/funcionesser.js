const url = 'https://backend-proyect.onrender.com/api/servicios' // link de la api

const listarDatosser = async() => {
    let respuesta= ''
    let body = document.getElementById('contenido')

    //url: es la url de la api
    // Al despegar en el servidor colocar la api del servidor
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type":"application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data){
        let listaservicios = data.servicios
        return listaservicios.map(function(servicios){
          respuesta += `<tr><td>${servicios.servicios}</td>` +
                `<td>${servicios.clases}</td>` +
                `<td>${servicios.precio}</td>` +
                `<td>${servicios.estado}</td>` +
                `<td>
                  <a class="waves-effect waves-light btn orange" href="editarServicio.html"><i class="material-icons left">create</i>Editar</a>                     
                  <button id="btnEliminar" class="btn red waves-effect waves-light" onclick='eliminar("${servicios._id}")' type="button" name="action">Eliminar
                  <i class="material-icons left">delete</i></button>                  
                  </td></tr>`;
      
            body.innerHTML=respuesta
        })
    })
}

const registrarser = async () => {
  let _servicios = document.getElementById('servicios').value;
  let _clases = document.getElementById('clases').value;
  let _precio = document.getElementById('precio').value;
  let _estado = document.getElementById('estado').value;

  // Validación de campos vacíos
  if (
    _servicios.trim() === '' ||
    _clases.trim() === '' ||
    _precio.trim() === '' ||
    _estado.trim() === ''
  ) {
    Swal.fire(
      'Por favor, complete todos los campos',
      '',
      'error'
    );
    return;
  }

  // Validación de servicios
  if (!/^[A-Za-z0-9]+$/.test(_servicios)) {
    Swal.fire(
      'El nombre de servicio solo debe contener letras y números',
      '',
      'error'
    );
    return;
  }

  // Validación del precio
  if (!/^\d+$/.test(_precio)) {
    Swal.fire(
      'El precio debe ser un número entero',
      '',
      'error'
    );
    return;
  }

  // Validación del rango del precio
  if (_precio < 6000 || _precio > 1000000) {
    Swal.fire(
      'El precio debe estar entre 6000 y 1000000',
      '',
      'error'
    );
    return;
  }

  let servicio = {
    servicios: _servicios,
    clases: _clases,
    precio: _precio,
    estado: _estado,
  };

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(servicio),
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
        window.location.href = "listarDatosser.html";
      },3000);
     })
    .catch(error => {
      Swal.fire(
        'Error al guardar el servicio',
        '',
        'error'
      );
    });
};

// ACTUALIZAR DATOS
const actualizar = async () => {
  let _id = ''; // Obtén el ID de la cita que deseas editar

  // Obtener los elementos del formulario
  let _servicios= document.getElementById('servicios').value
  let _clases= document.getElementById('clases').value
  let _precio= document.getElementById('precio').value
  let _estado= document.getElementById('estado').value 
  
  let servicio = {
    servicios: _servicios,
    clases:_clases,
    precio: _precio, 
    estado:_estado,
  }

  // Realizar la solicitud PUT para actualizar la cita
  fetch(`${url}/${_id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(servicio),
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
        window.location.href = "listarDatosser.html";
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
      fetch(url + "/?_id="+_id, {
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
            window.location.href = "listarDatosser.html";
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
   document.querySelector('#btnRegistrar').addEventListener('click', registrarser);
 }

 if(document.querySelector('#btnActualizar')){
  document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}