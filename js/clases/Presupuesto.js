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
        this.totalGastado=Number(0)
        

        
    }
    reset () {
        this.presupuesto = Number(0)
        this.restante = Number(0)
        this.gastos = []
        this.categorias=[]
        this.filtterArray=[]
        this.cantidadCategoria=Number(0)
        this.porcentajeGastado=Number(0)
        this.totalGastado=Number(0)
        
        
        
    }

    filtrarCategoria( categoria){
      this.filtterArray=this.gastos.filter(elem=>elem.campo===categoria)// aqui me traigo del campo los objetos 
      this.cantidadCategoria=this.filtterArray.reduce((acc, elem)=>acc+elem.cantidad, 0)//del los objetos que obtuvo se hace una sumatoria

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
        this.totalGastado=gastado        
    }
}
export default Presupuesto;