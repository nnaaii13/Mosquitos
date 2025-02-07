const contenedor = document.getElementById("contenedor");
let contador = 0;
const maximoMosquitos = 5;

class Mosquito {
    constructor() {
        this.div = document.createElement("div");
        this.div.className = "mosquito";
        this.div.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
        this.div.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
        contenedor.appendChild(this.div);

        this.clicks = 0;
        this.velocidad = 2;

        this.div.addEventListener("click", () => {
            this.clicks++;

            if (this.clicks < 3) {
                this.mensaje();
            }

            if (this.clicks >= 3) {
                contenedor.removeChild(this.div);
                this.sangre();
            } else {
                this.aumentarVelocidad();
                console.log("velocidad");
            }
        });

        this.direccionX = Math.random() < 0.5 ? 1 : -1;
        this.direccionY = Math.random() < 0.5 ? 1 : -1;

        this.moverMosquitos();
        this.direccionAleatoria();
    }

    mensaje(){
        const mensaje = document.createElement("div");
        mensaje.className = "mensaje";
        mensaje.innerHTML = "¡Auch!";
        mensaje.style.left = `${parseInt(this.div.style.left) + 20}px`;
        mensaje.style.top = `${parseInt(this.div.style.top) - 20}px`;
        contenedor.appendChild(mensaje);

        setTimeout(() => {
            contenedor.removeChild(mensaje);
        }, 500);
    }

    aumentarVelocidad() {
        this.velocidad += 1;
        this.moverMosquitos();
    }

    moverMosquitos() {
        setInterval(() => {
            let currentLeft = parseInt(this.div.style.left, 10);
            let currentTop = parseInt(this.div.style.top, 10);

            if (currentLeft >= window.innerWidth - this.div.offsetWidth || currentLeft <= 0) {
                this.direccionX *= -1;
            }
            if (currentTop >= window.innerHeight - this.div.offsetHeight || currentTop <= 0) {
                this.direccionY *= -1;
            }

            this.div.style.left = `${currentLeft + this.direccionX * 5}px`;
            this.div.style.top = `${currentTop + this.direccionY * 5}px`;
            console.log("moviendo");
        }, 110);
    }

    direccionAleatoria() {
        setInterval(() => {
            this.direccionX = Math.random() < 0.5 ? 1 : -1;
            this.direccionY = Math.random() < 0.5 ? 1 : -1;
        }, 500);
    }

    sangre() {
        const sangre = document.createElement("img");
        sangre.className = "sangre";
        sangre.style.left = this.div.style.left;
        sangre.style.top = this.div.style.top;
        contenedor.appendChild(sangre);

        setTimeout(() => {
            contenedor.removeChild(sangre);
        }, 1000);
    }
}

setInterval(() => {
    if (contador < maximoMosquitos) {
        new Mosquito();
        contador++;
    }
}, 500);