
let url = "http://api.citybik.es/v2/networks/";
const consultarFetch = async () => {
    await fetch(url)
        .then((response) => response.json())
        .then(async (data) => {
            guardarDatos(data.networks)
        })
        .catch((error) => console.log(error));
}

const guardarDatos = async (data) => {
   
    let contenido = document.getElementById("content");
    creartabla(contenido, "empresas");
    let tabla = document.getElementById("empresas")
    let tr = document.createElement("tr")
    let td = document.createElement("td")
    td.textContent = "Redes City bike"
    td.className = "azul sidebar"
    tr.appendChild(td)
    tabla.appendChild(tr)
    let cont = 0

    data.forEach(doc => {
        if (cont % 2 == 0) {
            tabla.innerHTML += `<tr><td id="${doc.id}" onclick="seleccionarEmpresa(this)" class="gris cursor">${doc.name} (${doc.location.city}, ${doc.location.country})</td></tr>`
        } else {
            tabla.innerHTML += `<tr><td id="${doc.id}" onclick="seleccionarEmpresa(this)" class="cursor">${doc.name} (${doc.location.city}, ${doc.location.country})</td></tr>`
        }

        cont += 1
    })






}
consultarFetch()

const seleccionarEmpresa = async (objeto) => {

    let url = `http://api.citybik.es/v2/networks/${objeto.id}`
    await fetch(url)
        .then((response) => response.json())
        .then(async (data) => {
            mostrarDatosEmpresa(data.network)
        })
        .catch((error) => console.log(error));
}
const mostrarDatosEmpresa = (objeto) => {
    
    crearDivEmergente();
    let overlay=document.getElementById("overlay")
    overlay.innerHTML=`
        <center><h4>${objeto.name}</h4></center>
        <div class="descripcion">
        <p><b>Empresas:</b> ${objeto.company}</p>
        <p><b>Ubicación:</b> ${objeto.location.city}, ${objeto.location.country}</p>
        <p><b>Espacios libres:</b> ${contadorEstaciones(objeto.stations)}</p>
        <p><b>Bicicletas libres:</b> ${contadorBicis(objeto.stations)}</p></div>
        <center><button id="${objeto.id}" onclick="verEstaciones(this)" class="btn btn-info estaciones">Ver estaciones</button></center>
    `
    
}
const verEstaciones=async(objeto)=>{
    let url = `http://api.citybik.es/v2/networks/${objeto.id}`
    await fetch(url)
        .then((response) => response.json())
        .then(async (data) => {
            mostrarDatosEstaciones(data.network)
        })
        .catch((error) => console.log(error));
}
const mostrarDatosEstaciones=(objeto)=>{
    let estaciones=objeto.stations;
    crearDivEmergente()
    let overlay=document.getElementById("overlay");
    overlay.innerHTML=`<button id="${objeto.id}" onclick="seleccionarEmpresa(this)" class="btn btn-secondary pegar">Atrás</button><br>`
    
    estaciones.forEach(element => {
        if(estaciones.empty_slots==null){
            element.empty_slots=0
        }
        if(estaciones.free_bikes==null){
            element.free_bikes=0
        }
        overlay.innerHTML+=`<br><b>${element.name}</b><br>
        Fecha de actualizacion: ${element.timestamp}<br>
        Espacios libre: ${element.empty_slots}<br>
        Bicicletas libre: ${element.free_bikes}<br>
        total espacios: ${element.free_bikes+element.empty_slots}<br><hr>`
    });

}

const contadorEstaciones=(station)=>{
    let acum=0
    station.forEach(element => {
        acum=acum+element.empty_slots
    });
    return acum
}
const contadorBicis=(station)=>{
    let acum=0
    station.forEach(element => {
        acum=acum+element.free_bikes
    });
    return acum
}

$(document).click(function(){
    let contenido=document.getElementById("content2")
    
    contenido.innerHTML=""
})