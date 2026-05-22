
const inputNota = document.getElementById('inputNota');
const btnAgregar = document.getElementById('btnAgregar');
const listaNotas = document.querySelector('#listaNotas');

console.log("Referencia Input:", inputNota);
console.log("Referencia Botón:", btnAgregar);
console.log("Referencia Lista UL:", listaNotas);


let notas = [];

// Cargar notas desde Local Storage al iniciar la página
window.addEventListener('DOMContentLoaded', () => {
    const notasGuardadas = localStorage.getItem('notas');
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        console.log(`Se cargaron ${notas.length} notas desde Local Storage.`);
        renderizarNotas();
    } else {
        console.log("No hay notas guardadas en Local Storage.");
    }
});


btnAgregar.addEventListener('click', () => {
    const textoNota = inputNota.value.trim();

    
    if (textoNota === "") {
        alert("Por favor, escribe algo antes de agregar la nota.");
        return;
    }

    
    notas.push(textoNota);
    actualizarLocalStorage();

    
    crearElementoNota(textoNota, notas.length - 1);

    console.log(`Nota agregada: "${textoNota}"`);

    
    inputNota.value = "";
    inputNota.focus();
});


function crearElementoNota(texto, index) {
    const li = document.createElement('li');
    li.textContent = texto + " ";

    
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "Eliminar";
    
    btnEliminar.addEventListener('click', () => {
        
        listaNotas.removeChild(li);
        
        
        notas.splice(index, 1);
        actualizarLocalStorage();
        
        console.log(`Se eliminó la nota de la lista.`);
        
        
        renderizarNotas();
    });

    li.appendChild(btnEliminar);
    listaNotas.appendChild(li);
}

function renderizarNotas() {
    listaNotas.innerHTML = ""; 
    notas.forEach((nota, index) => {
        crearElementoNota(nota, index);
    });
}

// Función para actualizar Local Storage
function actualizarLocalStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
}
