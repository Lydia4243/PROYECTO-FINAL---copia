import Presupuesto from './clases/Presupuesto.js'
import UI from './clases/UI.js'
import { formulario } from './selectores.js'

const ui = new UI();
let presupuesto;

//Funciones
export function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    //(Notas de Vane Rodríguez) la instanciamos dentro para que quede solo como parte de esta función, puesto que no requiere ser llamada desde otros lados.
    //llamada de una sola vez
    //siendo un presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario) //estamos instanciando mi clase
        //console.log(presupuesto)
    ui.insertarPresupuesto(presupuesto)
}

export function agregarGasto(e) {
    e.preventDefault();
    //leer del formulario los gtos 
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value)
    const campo= document.querySelector('#campo').value;
    const maximo = presupuesto.restante

    //Comprobar que los campos no esten vacios
    if (nombre === '' || cantidad === ''|| campo==='') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error')

    } else if (cantidad > maximo) {
        ui.imprimirAlerta('La cantidad de este gasto excede el presupuesto restante', 'error')
    } else {

        const gasto = { nombre, cantidad, campo, id: Date.now() }



        //añadir nuevo gasto
        presupuesto.nuevoGasto(gasto)

        //insertar HTML
        ui.imprimirAlerta('Correcto', 'correcto')

        //imprimir el gasto
        const { gastos } = presupuesto
        ui.agregarGastoLista(gastos)

        //actualizar el presupuesto restante
        const { restante } = presupuesto
        ui.actualizarRestante(presupuesto)

        //cambiar la clase que nos avisa si el presupuesto se va terminando
        ui.comprobarPresupuesto(presupuesto)

        //reiniciar formulario
        formulario.reset()
    }
}

export function eliminarGasto(id) {
    presupuesto.eliminarGasto(id)

    const { gastos, restante } = presupuesto;
    ui.agregarGastoLista(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

}
export function resetApp() {
    presupuesto.reset()
    ui.limpiarHTML()
    document.querySelector('#restante').textContent =  ""
    document.querySelector('#porcentajeGastado').textContent = ""
    document.querySelector('#TotalGastado').textContent = ""
    document.querySelector('#total').textContent = ""
    //console.log('reset',presupuesto)
}









