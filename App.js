const formulario = document.getElementById('agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
    formulario.addEventListener('submit', agregarGasto)
    gastoListado.addEventListener('click', eliminarGasto)
}
//Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
        this.categorias=[]
        this.filtterArray=[]
        this.cantidadCategoria=Number(0)
        this.porcentajeGastado=Number(0)
    }

    filtrarCategoria( categoria){
      filtterArray=this.gastos.filter(elem=>elem.campo===categoria)// aqui me traigo del campo los objetos 
      cantidadCategoria=filtterArray.reduce((acc, elem)=>acc+elem.cantidad, 0)//del los objetos que obtuvo se hace una sumatoria

    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        //this.categorias=[...this.categorias, gasto]
        this.categoriasDistintas()
        console.log(this.categorias)
        this.calcularRestante()
    }

    categoriasDistintas(){
        this.categorias = [...new Set(this.gastos.map(elem =>elem.campo))] //se trae solo los campos que existe
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id); //tal vez se necesite cambiar a string
        this.calcularRestante()
    }

    //reduce calculo cuanto llevo gastado y obtener el total
    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - gastado
        this.porcentajeGastado=(gastado/this.presupuesto)*100
    }
}


class UI {
    insertarPresupuesto(cantidad) {
        //Extrayendo los valores 
        const { presupuesto, restante } = cantidad;
        //agregando al HTML
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
    }
    imprimirAlerta(mensaje, tipo) {
            const divMensaje = document.createElement('div')
            divMensaje.classList.add('text-center', 'alert')

            //si es de tipo error se agrega una clase
            if (tipo === 'error') {
                divMensaje.classList.add('alert-danger')

            } else {
                divMensaje.classList.add('alert-success')
            }
            //mensaje de error
            divMensaje.textContent = mensaje;

            //Insertar en el DOM
            document.querySelector('.primario').insertBefore(divMensaje, formulario)

            //quitar el mensaje despues de 3s
            setTimeout(() => {
                document.querySelector('.primario .alert').remove();
            }, 3000)
        }
        //insertar los gastos a la lista 
    agregarGastoLista(gastos) {
        this.limpiarHTML()
            //iterar nuestro arreglo de gastos
        gastos.forEach(gasto => {
            const { nombre, cantidad, id, campo} = gasto

            //Crear un li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
            nuevoGasto.dataset.id = id;

            //console.log(nuevoGasto)
            //insertar el gasto
            nuevoGasto.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-phill">$ ${cantidad}</span>
            ${campo}

            `
                //borrar gasto boton
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.textContent = 'Borrar'
            btnBorrar.onclick = () => {
                eliminarGasto(id)
            }
            nuevoGasto.appendChild(btnBorrar);

            //Insertar en HTML
            gastoListado.appendChild(nuevoGasto)
        });
    }
    actualizarRestante(restante) {
        document.querySelector('span#restante').textContent = restante
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj
        const restanteDiv = document.querySelector('.restante')
        formulario.querySelector('button[type="submit"]').disabled = false

        //Para controlar como vamos, comprobar el 25%
        if ((presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning')
            restanteDiv.classList.add('alert-danger')
        } else if ((presupuesto / 2) > restante) {
            //checar de nuevo, comprobar el 50%
            restanteDiv.classList.remove('alert-success', 'alert-danger')
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning')
            restanteDiv.classList.add('alert-success');
        }
        //si el presupuesto es igual a 0
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error')
            formulario.querySelector('button[type="submit"]').disabled = true
        }
    }

    limpiarHTML() {
        //eliminar todo y dejar limpio
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }
}
const ui=new UI();
let presupuesto;

//Funciones
function preguntarPresupuesto() {
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

function agregarGasto(e) {
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
        ui.actualizarRestante(restante)

        //cambiar la clase que nos avisa si el presupuesto se va terminando
        ui.comprobarPresupuesto(presupuesto)

        //reiniciar formulario
        formulario.reset()
    }
}

function eliminarGasto(id) {
    presupuesto.eliminarGasto(id)

    const { gastos, restante } = presupuesto;
    ui.agregarGastoLista(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

}
















