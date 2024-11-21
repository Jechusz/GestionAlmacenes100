import { eliminarProducto, getDataProducto, obtenerProducto, saveProducto, updateProducto, getDataCategoria, getDataAlmacen } from "../scripts/firebase.js"

let id = 0

const cargarAlmacenes = () => {
    getDataAlmacen((collection) => {
        const select = document.getElementById('almacen');
        let options = '<option value="">Seleccione un almacén</option>';
        collection.forEach((doc) => {
            const almacen = doc.data();
            options += `<option value="${doc.id}">${almacen.nombre}</option>`;
        });
        select.innerHTML = options;
    });
};

const cargarCategorias = () => {
    getDataCategoria((collection) => {
        const select = document.getElementById('categoria');
        let options = '<option value="">Seleccione una categoría</option>';
        collection.forEach((doc) => {
            const categoria = doc.data();
            options += `<option value="${doc.id}">${categoria.nombre}</option>`;
        });
        select.innerHTML = options;
    });
};

//addEventListener me permite capturar un evento 
// Cambiar en funcionesProducto.js (guardar y actualizar)
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const producto = {
            'nombre': document.getElementById('nombre').value.trim(),
            'almacen': document.getElementById('almacen').value,
            'categoria': document.getElementById('categoria').value,
            'stock': document.getElementById('stock').value.trim() // Obtener el valor de "stock"
        }

        if (document.getElementById('btnGuardar').value == 'Guardar') {
            saveProducto(producto)
            limpiar()
        } else {
            updateProducto(id, producto)
            limpiar()
            id = 0
        }
    }
})

//DOMEventLister es un evento que se ejecuta cuando se recarga la página 
window.addEventListener('DOMContentLoaded', () => {

    cargarAlmacenes(); // Modificación: Cargar Almacenes
    cargarCategorias(); 

    getDataProducto((collection) => {
        let tabla = ''
        //se recorre la colección y se crear el item doc para mostrar los datos
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.nombre}</td>
            <td>${item.almacen}</td>
            <td>${item.categoria}</td>
            <td>${item.stock}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botón y eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //añadir sweetalert para confirmar la eliminación
                        eliminarProducto(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        //seleccionar el documento
        document.querySelectorAll('.btn-warning').forEach( btn => {
            //async indica que necesitamos un await para esperar a que la función responda
            btn.addEventListener('click',async() => {
                //invocar función para buscar el documento por su id
                const doc = await obtenerProducto(btn.id);
                //obtener los valores del documento
                const d = doc.data();
                
                //asignar los valores a los inputs
                document.getElementById('nombre').value = d.nombre;
                document.getElementById('almacen').value = d.almacen;  // Modificación: asignar el almacén
                document.getElementById('categoria').value = d.categoria;  // Modificación: asignar la categoría
                document.getElementById('stock').value = d.stock // Asigna el stock
        
                //modificar el valor del botón 
                document.getElementById('btnGuardar').value = 'Modificar';
                //asignar el id del documento a nuestra variable
                id = btn.id;
            });
        });
        
    })
})