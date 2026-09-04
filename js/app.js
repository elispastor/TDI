document.getElementById('btn-generar').addEventListener('click', function() {
    // 1. Obtener datos
    const datos = {
        nombre: document.getElementById('nombre').value,
        cargo: document.getElementById('cargo').value,
        empresa: document.getElementById('empresa').value,
        foto: document.getElementById('foto').value || 'https://i.pravatar.cc/300?img=11',
        logo: document.getElementById('logo').value || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        web: document.getElementById('web').value,
        carrusel: document.getElementById('carrusel-imgs').value.split(',').map(url => url.trim()).filter(url => url)
    };

    // 2. Rellenar la tarjeta
    document.getElementById('card-nombre').textContent = datos.nombre;
    document.getElementById('card-cargo').textContent = datos.cargo;
    document.getElementById('card-empresa').textContent = datos.empresa;
    document.getElementById('card-foto').src = datos.foto;
    document.getElementById('card-logo').src = datos.logo;

    // 3. Configurar enlaces
    document.getElementById('btn-whatsapp').href = `https://wa.me/${datos.telefono}?text=Hola%20${encodeURIComponent(datos.nombre)},%20vi%20tu%20tarjeta%20digital.`;
    
    const emailLink = document.getElementById('card-email');
    emailLink.href = `mailto:${datos.email}`;
    emailLink.querySelector('span').textContent = datos.email;

    const webLink = document.getElementById('card-web');
    webLink.href = datos.web;
    webLink.querySelector('span').textContent = datos.web.replace('https://', '').replace('http://', '');

    // 4. Generar Carrusel
    const carruselContainer = document.getElementById('carrusel-container');
    carruselContainer.innerHTML = '';
    if (datos.carrusel.length > 0) {
        datos.carrusel.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = 'Portafolio';
            carruselContainer.appendChild(img);
        });
    } else {
        carruselContainer.innerHTML = '<p style="color:#999; font-size:14px; padding:10px;">No hay imágenes en el carrusel.</p>';
    }

    // 5. Mostrar tarjeta y ocultar editor
    document.getElementById('editor-panel').classList.add('oculto');
    document.getElementById('card-panel').classList.remove('oculto');

    // 6. Configurar botón Guardar Contacto (vCard)
    document.getElementById('btn-guardar').onclick = function() {
        const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${datos.nombre}\nTITLE:${datos.cargo}\nORG:${datos.empresa}\nTEL;TYPE=CELL:${datos.telefono}\nEMAIL:${datos.email}\nURL:${datos.web}\nEND:VCARD`;
        const blob = new Blob([vCard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${datos.nombre.replace(/\s+/g, '_')}.vcf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // 7. Configurar botón Compartir (API nativa del celular)
    document.getElementById('btn-compartir').onclick = function() {
        if (navigator.share) {
            navigator.share({
                title: `${datos.nombre} - ${datos.cargo}`,
                text: `Conoce más sobre ${datos.nombre} y ${datos.empresa}.`,
                url: window.location.href
            }).catch(err => console.log('Error al compartir', err));
        } else {
            alert('Copia este enlace para compartir: ' + window.location.href);
        }
    };
});

// Botón para volver a editar
document.getElementById('btn-editar').addEventListener('click', function() {
    document.getElementById('card-panel').classList.add('oculto');
    document.getElementById('editor-panel').classList.remove('oculto');
});
