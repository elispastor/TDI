document.getElementById('btn-ver').addEventListener('click', function() {
    // 1. Capturar datos
    const datos = {
        nombre: document.getElementById('nombre').value,
        cargo: document.getElementById('cargo').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        empresa: document.getElementById('empresa').value,
        linkedin: document.getElementById('linkedin').value,
        plantilla: document.getElementById('plantilla').value
    };

    // 2. Corregir URL si es necesario
    let linkFinal = datos.linkedin;
    if (linkFinal && !linkFinal.includes('://')) {
        linkFinal = 'https://' + linkFinal;
    }

    // 3. Generar HTML según la plantilla elegida
    let claseCSS = 'tarjeta-' + datos.plantilla;
    let htmlTarjeta = `
        <div class="${claseCSS}">
            <h2>${datos.nombre}</h2>
            <p class="cargo">${datos.cargo}</p>
            ${datos.empresa ? `<p class="empresa">🏢 ${datos.empresa}</p>` : ''}
            <div class="datos">
                <p>📧 <a href="mailto:${datos.email}">${datos.email}</a></p>
                <p>📱 <a href="tel:${datos.telefono}">${datos.telefono}</a></p>
                ${linkFinal ? `<p>🔗 <a href="${linkFinal}" target="_blank">Visitar sitio web</a></p>` : ''}
            </div>
        </div>
    `;

    // 4. Mostrar en pantalla
    document.getElementById('tarjeta-render').innerHTML = htmlTarjeta;
    document.getElementById('contenedor-preview').classList.remove('oculto');
    document.getElementById('contenedor-preview').scrollIntoView({ behavior: 'smooth' });

    // 5. Configurar botón de descargar contacto (vCard)
    document.getElementById('btn-descargar').onclick = function() {
        const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${datos.nombre}\nTITLE:${datos.cargo}\nORG:${datos.empresa}\nTEL:${datos.telefono}\nEMAIL:${datos.email}\nURL:${linkFinal}\nEND:VCARD`;
        const blob = new Blob([vCard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${datos.nombre.replace(/\s+/g, '_')}.vcf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
});
