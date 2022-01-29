const numeros = {};
let cantidad = 0

const calculo = () => {
  for (let i = 0; i < cantidad; i++) {
    const numero = getRandom();
    if (!numeros[numero]) {
      numeros[numero] = 0;
    }
    numeros[numero]++;
  }
  return numeros;
}

function getRandom() {
  return parseInt(Math.random() * 1000) + 1;
}

process.on('exit', () => {
  console.log(`worker #${process.pid} cerrado`)
})

process.on('message', msg => {
  cantidad = msg
  console.log(cantidad)
  console.log(`worker #${process.pid} iniciando su tarea`)
  const sum = calculo()
  process.send(sum)
  console.log(`worker #${process.pid} finalizó su trabajo`)
  process.exit()
})

process.send('listo');