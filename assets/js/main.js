// Módulo principal
async function getApi (){
    const apirest = await fetch ("https://mindicador.cl/api/")
    const data = await apirest.json()
    return data
}
getApi()
// Funcion para obtener los tipos de divisas
let optionDivisas = document.querySelector("#tipo-moneda");
async function renderDivisas (){
    try {
    const divisas = await getApi (); 
    let option = "";
    for (let divisa in divisas) {
        if(divisas[divisa].nombre)
        option+= `
        <option id="monedas" value="${divisas[divisa].codigo}">${divisas[divisa].nombre}</option>`;
    };
    optionDivisas.innerHTML = option;      
    } catch (e) {
        alert (`Algo salio mal!! Error: ${e.message}`)
    }
}
renderDivisas()

// Funciones Operacionales
let pesos = document.querySelector("#pesos");
let resultadohtml = document.querySelector(".resultado-conversion")
let btnconvertir = document.querySelector("#boton-convertir")

// Evento click a boton convertir
btnconvertir.addEventListener ("click", convertir)
async function convertir (){
    try {
    let moneda = optionDivisas.value
    const divisas = await getApi ();
    let resultado = "";
    
    // Conversor UF    
    if ( moneda === "uf"){
        let a = Number(`${divisas.uf.valor}`);
        let b = Number (pesos.value)
        let resultadoFinal = (b / a);
        resultado = `<h4>Resultado: ${resultadoFinal} ${optionDivisas.value}</h4>`
        }
    // Conversor indice de valor promedio IVP
    else if ( moneda === "ivp"){
        let a = Number(`${divisas.ivp.valor}`);
        let b = Number (pesos.value)
        let resultadoFinal = (b / a)
        resultado = `<h4>Resultado: ${resultadoFinal} ${optionDivisas.value}</h4>`
        }
    // Conversor Dolar obsevado
    else if ( moneda === "dolar"){
        let a = Number(`${divisas.dolar.valor}`);
        let b = Number (pesos.value)
        let resultadoFinal = (b / a)
        resultado = `<h4>Resultado: ${resultadoFinal} $Dolares</h4>`
        }
    // Conversor Dolar acuerdo
    else if ( moneda === "dolar_intercambio"){
        let a = Number(`${divisas.dolar_intercambio.valor}`);
        let b = Number (pesos.value)
        let resultadoFinal = (b / a)
        resultado = `<h4>Resultado: ${resultadoFinal} $Dolares</h4>`
        }
    // Conversor euro
    else if ( moneda === "euro"){
        let a = Number(`${divisas.euro.valor}`);
        let b = Number (pesos.value)
        let resultadoFinal = (b / a)
        resultado = `<h4>Resultado: ${resultadoFinal} $Euros</h4>`
        }
    // Conversor indice precio al consumidor
    else if ( moneda === "ipc"){
        let a = Number(`${divisas.ipc.valor}`);
        let b = Number (pesos.value)
        let resultadoFinal = (((a*b)/(100))+b)
        resultado = `<h4>Aumento total con el ${divisas.ipc.valor}% IPC: ${resultadoFinal} $CLP</h4>`
        }
    // Conversor UTM
    else if ( moneda === "utm"){
        let a = Number(`${divisas.utm.valor}`);
        let b = Number (pesos.value)
        let resultadoFinal = (b / a)
        resultado = `<h4>Resultado: ${resultadoFinal} ${optionDivisas.value}</h4>`
        }
    // Porcentaje IMACEC
    else if ( moneda === "imacec"){
        resultado = `<h4>El porcentanje actual del IMACEC es ${divisas.imacec.valor}%</h4>`
        }
    // Porcentaje TPM
    else if ( moneda === "tpm"){
        resultado = `<h4>El porcentanje actual del TPM es ${divisas.tpm.valor}%</h4>`
        }
    // Cotizacion libra de cobre
    else if ( moneda === "libra_cobre"){
        resultado = `<h4>La Libra de cobre se cotiza a ${divisas.libra_cobre.valor} $Dolares</h4>`
        }
    // Porcentaje desempleo
    else if ( moneda === "tasa_desempleo"){
        resultado = `<h4>La tasa de desempleo actual es del ${divisas.tasa_desempleo.valor}%</h4>`
        }
    // Conversor Bitcoin
    else if ( moneda === "bitcoin"){
        let a = Number(`${divisas.bitcoin.valor}`);
        let b = Number (pesos.value)
        let c = Number(`${divisas.dolar.valor}`)
        let resultadoFinal = ((b) / (a*c))
        resultado = `<h4>Resultado: ${resultadoFinal} ${optionDivisas.value}</h4>`
        }
    resultadohtml.innerHTML = resultado; 
} catch (e){
    alert (`Algo salio mal!! Error: ${e.message}`)
}
   
    // Render Grafica
async function getAndCreateDataToChart(){
    try {
    let urlapi = "https://mindicador.cl/api/" + optionDivisas.value;
    const apiGrafica = await fetch (urlapi);
    let fechas = await apiGrafica.json();
    
    let labels1 = fechas.serie.map ((fecha) => {
        return (fecha.fecha.substring(0,10));
    });
    let labels = labels1.slice(0,10)
    let data = fechas.serie.map ((fecha) => {
        return fecha.valor;
    });
    const datasets = [
        {
            label: "Tipo de divisa " + optionDivisas.value,
            borderColor : "rgb(70, 70, 255)",
            data
        }];
        
    return {labels ,datasets};
    } catch (e){
    alert (`Algo salio mal!! Error: ${e.message}`)
    }
}

async function renderGrafica(){
    try {
    let data = await getAndCreateDataToChart();
    const config = {
        type: "line",
        data,
    };
    const myChart = document.getElementById("myChart");
    myChart.style.backgroundColor = "white";
    new Chart(myChart, config);
    }catch (e){
    alert (`Algo salio mal!! Error: ${e.message}`)
    }
    };
renderGrafica()
}



    

