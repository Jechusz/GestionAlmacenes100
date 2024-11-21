// Función de verificación de inputs
const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
}



const limpiar = () => {
    document.querySelector('form').reset();  // Resetear el formulario
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById(`e-${item.name}`).innerHTML = '';
    });
    
    // Resetear también los valores de los selects
    document.getElementById('almacen').selectedIndex = 0;  // Restaurar el primer valor del select (vacío o por defecto)
    document.getElementById('categoria').selectedIndex = 0;  // Restaurar el primer valor del select (vacío o por defecto)
    
    //vuelve a permitir escritura en el input run    
    document.getElementById('btnGuardar').value = 'Guardar';
}


const soloNumeros = (evt) => {
    if (/^[0-9]$/.test(evt.key)) {
        return true;
    }
    evt.preventDefault();  // Impide la entrada de cualquier otra tecla
}

