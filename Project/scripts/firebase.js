// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
//librería que permite utilizar funciones
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN:
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2PPAEju9_eOSEaWglK6WnGKWVdeyEVjA",
    authDomain: "almacen-9ff3b.firebaseapp.com",
    projectId: "almacen-9ff3b",
    storageBucket: "almacen-9ff3b.firebasestorage.app",
    messagingSenderId: "538060293956",
    appId: "1:538060293956:web:4b627da0b7fa97caeaf911",
    measurementId: "G-RH1ZYGSX7S"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//función de firestore que retorna la base de datos para ser utilizada
const db = getFirestore(app);


//Almacenes
export const saveAlmacen = (almacen) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento a la colección 
    //collection es una función de firestore que permite recibir la base de datos y el nombre de la colección
    addDoc(collection(db, 'Almacen'), almacen)
}
//función para listar todos los registros
export const getDataAlmacen = (data) => {
    //onSnapshot es la función que permite retornar la colección y asignarla a una variable
    onSnapshot(collection(db, 'Almacen'), data)
}

//función eliminar 
export const eliminarAlmacen = (id) =>{
    //deleteDoc es la función de firestore que permite eliminar un documento por su id
    //doc es la función que permite buscar el documento por su id 
    deleteDoc(doc(db,'Almacen',id))
}

//getDoc obtener un documento, porque debe esperar a traer el resultado  
export const obtenerAlmacen = (id) => getDoc(doc(db,'Almacen',id))

//función para actualizar los datos del documento 
export const updateAlmacen = (id,almacen) =>{
    //updateDoc es una función de firestore permite modificar un documento seleccionado 
    updateDoc(doc(db,'Almacen',id),almacen)
}











//Categoria
export const saveCategoria = (categoria) => {
    //addDoc es una función de firestore que permite añadir un nuevo documento a la colección 
    //collection es una función de firestore que permite recibir la base de datos y el nombre de la colección
    addDoc(collection(db, 'Categoria'), categoria)
}
//función para listar todos los registros
export const getDataCategoria = (data) => {
    //onSnapshot es la función que permite retornar la colección y asignarla a una variable
    onSnapshot(collection(db, 'Categoria'), data)
}

//función eliminar 
export const eliminarCategoria = (id) =>{
    //deleteDoc es la función de firestore que permite eliminar un documento por su id
    //doc es la función que permite buscar el documento por su id 
    deleteDoc(doc(db,'Categoria',id))
}

//getDoc obtener un documento, porque debe esperar a traer el resultado  
export const obtenerCategoria = (id) => getDoc(doc(db,'Categoria',id))

//función para actualizar los datos del documento 
export const updateCategoria = (id,categoria) =>{
    //updateDoc es una función de firestore permite modificar un documento seleccionado 
    updateDoc(doc(db,'Categoria',id),categoria)
}





//Producto
export const saveProducto = (producto) => {
    // Modificación: Guardar con Almacén y Categoría
    addDoc(collection(db, 'Producto'), producto);
};
//función para listar todos los registros
export const getDataProducto = (data) => {
    // Modificación: No cambia, pero relevante para el flujo
    onSnapshot(collection(db, 'Producto'), data);
};

//función eliminar 
export const eliminarProducto = (id) =>{
    //deleteDoc es la función de firestore que permite eliminar un documento por su id
    //doc es la función que permite buscar el documento por su id 
    deleteDoc(doc(db,'Producto',id))
}

//getDoc obtener un documento, porque debe esperar a traer el resultado  
export const obtenerProducto = (id) => getDoc(doc(db,'Producto',id))

//función para actualizar los datos del documento 
export const updateProducto = (id, producto) => {
    // Modificación: Ahora se actualiza con Almacén y Categoría
    updateDoc(doc(db, 'Producto', id), producto);
};


