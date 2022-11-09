import { gastoListado, formulario, categoriaListado, ListadoFiltrado } from '../selectores.js'
import { eliminarGasto } from '../funciones.js'

class UI {
    insertarPresupuesto(cantidad) {
        //Extrayendo los valores 
        const { presupuesto, restante, porcentajeGastado } = cantidad;
        //agregando al HTML
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante
        document.querySelector('#porcentajeGastado').textContent = porcentajeGastado
        
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
            const { nombre, cantidad, id, campo } = gasto

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
    actualizarRestante(presupuesto) {
        document.querySelector('span#restante').textContent = presupuesto.restante
        document.querySelector('span#porcentajeGastado').textContent = presupuesto.porcentajeGastado +" %"
        //document.querySelector('span#totalgastado').textContent= presupuesto.totalGastado
        document.querySelector('#TotalGastado').textContent = presupuesto.totalGastado
       console.log('totalgastado',presupuesto.totalGastado)
       document.getElementById('selectcategoria').onclick= ()=>{
           const select=document.querySelector('#selectcategoria')
           const categoria=select.value
           console.log('Categoriaelegida',categoria) 
           presupuesto.filtrarCategoria(categoria)
           console.log('Arreglocategorias',presupuesto.filtterArray)
           while (categoriaListado.firstChild) {
            categoriaListado.removeChild(categoriaListado.firstChild)
        }
           presupuesto.filtterArray.forEach(categoria => {
            const { nombre, cantidad, campo } = categoria
            //Crear un li
            const nuevaCategoria = document.createElement('div');
            nuevaCategoria.className = 'list-group-item d-flex justify-content-between align-items-center'

            //console.log(nuevoGasto)
            //insertar el gasto
            nuevaCategoria.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-phill">$ ${cantidad}</span>
            ${campo}
            `
            categoriaListado.appendChild(nuevaCategoria)
        });
          
       }
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
    actualizarGastado(porcentajeGastado) {
        document.querySelector('span#porcentajeGastado').textContent = porcentajeGastado
    }

    limpiarHTML() {
        //eliminar todo y dejar limpio
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
        while (ListadoFiltrado.firstChild) {
            ListadoFiltrado.removeChild(ListadoFiltrado.firstChild)
        }
    }
}
export default UI;