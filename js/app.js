document.getElementById('form-tarjeta').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const datos = {
        nombre: document.getElementById('nombre').value,
        cargo: document.getElementById('cargo').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        empresa: document.getElementById('empresa').value,
        linkedin: document.getElementById('linkedin').value,
        plantilla: document.getElementById('plantilla').value
    };
    
    console.log('Datos capturados:', datos);
    alert('¡Formulario enviado! Próximo paso: mostrar vista previa');
});
