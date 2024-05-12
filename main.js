
// areas de variables
let board=document.querySelector('.board');
let mostrartiempo=document.getElementById('tiempo')
let mostrarmensaje=document.getElementById('mensajeId')
let tiempo=0
let gano=false

let matriz =MatrizInicial()

//llamar a funciones
contartiempo()
pintarpieza()
agregarEvento()


function contartiempo() {
    if (gano==true ) return
   tiemporegresivoId = setInterval(() => {
   tiempo++;
   mostrartiempo.innerHTML = `${formatoHora(tiempo)}`;
    if (tiempo<=1800) // 0.5 Minuto
    { 
        mostrarmensaje.innerHTML = `😀 💪 Tú puedes...`;
    }
    else if (tiempo>1800 && tiempo<=3600) // 1  Minuto
    { 
        mostrarmensaje.innerHTML = `😳 Hagale mijo de una...`;
    }
    else if (tiempo>3600 && tiempo<=5400) // 1.5 Minuto
    { 
        mostrarmensaje.innerHTML = `😒 Estas seguro que puedes con este juego...`;
    }
    else if (tiempo>5400 && tiempo<=7200) // 2 Minuto
    { 
        mostrarmensaje.innerHTML = `🤔 Para completarlo, puedes pedir medio día de vacaciones...`;
    }
    else if (tiempo>7200 && tiempo<=9000) // 2.5 Minuto
    { 
        mostrarmensaje.innerHTML = `😴 Ánimo...`;
    }
    else if (tiempo>9000 && tiempo<=10800) // 3 Minuto
    { 
        mostrarmensaje.innerHTML = `😡 Parece que vamos mal... `;
    }
    else if (tiempo>10800 && tiempo<=12600) // 3 Minuto
    { 
        mostrarmensaje.innerHTML = `👿 Que pasa, que no completas el juego...`;
    }else if (tiempo>12600 && tiempo<=14400) // 3.5 Minuto
    { 
        mostrarmensaje.innerHTML = `🤤 🤒  me siento mareado...`;
    }else if (tiempo>14400) // 3.5 Minuto
    { 
        mostrarmensaje.innerHTML = `⏰ te dejo, esto va para largo...`;
    }

    }, 21);
}
function formatoHora(seconds)
{
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return hour + ':' + minute + ':' + second;

}

function MatrizInicial()
{
    let arreglo=['1','2','3','4','5','6','7','8','']
    arreglo.sort(()=> Math.random() -0.5)

    let matriz =[
        [], [], []  ]

    matriz[0][0]=arreglo[0]
    matriz[0][1]=arreglo[1]
    matriz[0][2]=arreglo[2]

    matriz[1][0]=arreglo[3]
    matriz[1][1]=arreglo[4]
    matriz[1][2]=arreglo[5]

    matriz[2][0]=arreglo[6]
    matriz[2][1]=arreglo[7]
    matriz[2][2]=arreglo[8]
    return matriz
}

// funciones
function agregarEvento()
{
    let pieza =document.querySelectorAll('.pieza')
    /// addEventListener es el evento click en cada ficha.
    pieza.forEach(pieza => pieza.addEventListener('click',()=>
        {
            let actualPosicion = BuscarPosicion(pieza.innerText)
            let actualPosicionEmpty = BuscarPosicion('')
            let proximoMovimiento=NexMovimiento(actualPosicion,actualPosicionEmpty)
            // mover la pieza
            if (proximoMovimiento!='NoMove')
                {
                    // actualizar la pieza que se esta movimiento
                    actualizamatriz(pieza.innerText,actualPosicion,actualPosicionEmpty)
                }
        }))
}
function actualizamatriz(piezaMover,actualPosicion,actualPosicionEmpty)
{

    matriz[actualPosicion[0]][actualPosicion[1]]=''
    matriz[actualPosicionEmpty[0]][actualPosicionEmpty[1]]=piezaMover
    pintarpieza()
    agregarEvento()
    compareMatriz(matriz)

}
function matrizOriginal()
{
    let matrizOriginal =[
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','']
    ]
    return matrizOriginal
}
function compareMatriz(MatrizActual)
    {

    // si las matrices son iguales, ha ganado
    if (matrizOriginal().toString()==MatrizActual.toString())
    {
            gano=true
            mostrarmensaje.innerHTML=`🎆🎑🎁🎉🎊 FELICIDADES !!!`
            var duration = 15 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
            mostrartiempo.innerHTML = `${formatoHora(tiempo)} 🎊 🎇 🏆 Exito....`;
            setTimeout(()=>{
                matriz = MatrizInicial()
                pintarpieza()
                agregarEvento()
                tiempo=0
                gano=false
                contartiempo()
            },8000);



    }
}
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }


function NexMovimiento(posicionActual,PosicionEmpty){

    if (posicionActual[1]==PosicionEmpty[1])
        {
            if (posicionActual[0]-PosicionEmpty[0]==-1)
                { return 'Abajo'}
            else
                if (posicionActual[0]-PosicionEmpty[0]==1)
                    {return 'Arriba'}
                else
                    {return 'NoMove'}
        }else if (posicionActual[0]==PosicionEmpty[0])
            {
                if (posicionActual[1]-PosicionEmpty[1]==-1)
                    {  return 'Derecha'}
                else
                    if (posicionActual[1]-PosicionEmpty[1]==1)
                        {return 'Izquierda'}
                    else
                        {return 'NoMove'}
            }
            else
                {return 'NoMove'}


}

function BuscarPosicion(_elemento)
{
    // buscar el elemento en el arreglo de arreglo
    let rowIndex=0;
    let columnIndex=0;

    matriz.forEach((row,Index)=> {
       let elementodefila = row.findIndex(item=>item==_elemento)
       if (elementodefila!==-1)
        {
            rowIndex=Index
            ColumnIndex=elementodefila
        }
    })
    return[rowIndex,ColumnIndex]
}


function pintarpieza()
{
    let tiempo=0;
    board.innerHTML=''
    matriz.forEach(row=>row.forEach(Element=>{
        if (Element=='')
            {
                board.innerHTML+=`<div class='empty'> ${Element}</div>`
            }
        else
            {
                board.innerHTML+=`<div class='pieza'> ${Element}</div>`
            }
        }))
}



// Scripts Confetti


function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

