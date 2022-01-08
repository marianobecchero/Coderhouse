const formLogin = document.getElementById('formLogin')
formLogin.addEventListener('submit', e => {
    // prevengo que el formulario recargue la pagina al hacer submit
    e.preventDefault()

    // armo el login extrayendo los datos de los campos del formulario
    const login = {
        nombre: document.getElementById('txtNombre').value // document.getElementById('txtTitle').value
    }

    const urlApi = 'http://localhost:8080/api/sesiones/login/'
    fetch(urlApi, {
        method: 'POST',
        body: JSON.stringify(login),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response)
            window.location.href = "http://localhost:8080";
        })
})