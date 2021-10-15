const numeros = {}

function getNumeroAleatorio(){
    return parseInt(Math.random() * 20) + 1;
}

for (let i = 0; i < 1000; i++){
    const numero = getNumeroAleatorio();
    if (!numeros[numero]) {
        numeros[numero] = 0;
    }
    numeros[numero]++;
}

console.log(numeros)