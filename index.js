let myJSON=[
    {"nombre":"pizza", "cantidad":200, "campo":"comida", "id":"02112022" },
    {"nombre":"pizza", "cantidad":200, "campo":"comida", "id":"02112022" },
    {"nombre":"pizza", "cantidad":1000, "campo":"suscripciones", "id":"02112022" },
    {"nombre":"pizza", "cantidad":200, "campo":"otros", "id":"02112022" },
    {"nombre":"pizza", "cantidad":500, "campo":"suscripciones", "id":"02112022" }
]
//console.log(myJSON)
const lista = [...new Set(myJSON.map(elem =>elem.campo))] //trae todas las nuevas categorias diferentes con un new set y las guarda en un nuevo arreglo
//console.log(lista)
const filtterArray=myJSON.filter(elem=>elem.campo==='suscripciones')//hace el filtrado por categoria y solo trae elementos del mismo valor(ej. suscripciones)
console.log(filtterArray)
const cantidadCategoria=filtterArray.reduce((acc, elem)=>acc+elem.cantidad, 0)
console.log(cantidadCategoria)