import { preguntarPresupuesto, agregarGasto, eliminarGasto, resetApp  } from '../funciones.js'
import { categoriaListado, formulario, gastoListado,btnResetApp } from '../selectores.js'

class App {
    constructor() {
        this.initApp()
        
    }

    initApp() {

        //eventos
        eventListeners()
            

        function eventListeners() {
            document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
            formulario.addEventListener('submit', agregarGasto)
            gastoListado.addEventListener('click', eliminarGasto)
            btnResetApp.addEventListener('click',resetApp)
        }
    }
}
export default App;