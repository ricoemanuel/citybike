const creartabla=(contenido,id)=>{
    contenido.innerHTML+=`<table class="table table-striped principal" id="${id}"></table>`
}
const crearDivEmergente=()=>{
    let contenido=document.getElementById("content2")
    contenido.innerHTML=""
    let div=document.createElement("div")
    div.className="overlay"
    div.id="overlay"
    contenido.appendChild(div)
}