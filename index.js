//esto sirve para llamar a los divs y poder usarlos en el codigo luego.
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 6

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)    
    }

    inicializar() {
        //classList = sirve para llamar clases de css con su propiedad
        //aqui lo que busca el codigo es llamar a la propiedad .hide cuando se inicialice el juego, para obtener como resultado ocultar el botón cuando se haga clic. 
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        } 
    }

    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero){
        switch (numero){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2: 
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color){
        switch (color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja': 
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++) {
            let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)           
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick(){
        //se coloca bind(this) con la finalidad de hacer referencia a Juego no al botón que llama este this, si pones con console.log(this) te darás cuenta que el nuevo lugar de referencia es el div y no el juego, para hacerlo de mejor manera enviamos todo el bind a la funcion inicializar
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                    //hay que tener en cuenta esto: al ponerle bind no importa quien llame a la funcion siempre va a estar atada a la clase juego, hubo un error de {undefined} porque al ser llamada por el navegador se salió del ciclo.
                }
            }
        } else {
            this.perdioElJuego()

        }
    }

    ganoElJuego(){
        swal('Hey!', 'Ganaste!', 'sucess')
            .then(() => {
                this.inicializar()
            })
        }


    perdioElJuego(){
        swal('No te rindas', 'Perdiste :(', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }
}


// esta funcion es llamada en el html directamente con el evento onclick
function empezarJuego() {
    window.juego = new Juego()
}



