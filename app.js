document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('themeButton');
    const currentYear = document.getElementById('currentYear');
    const revealElements = document.querySelectorAll('.reveal');

    const form = document.getElementById('form-contacto');
    const btnVerMensajes = document.getElementById('btn-ver-mensajes');

    // Año automático en el footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Cambio de tema claro / oscuro
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');

            const modoOscuroActivo = document.body.classList.contains('dark-theme');

            themeButton.textContent = modoOscuroActivo ? '☀️' : '🌙';
            themeButton.setAttribute(
                'aria-label',
                modoOscuroActivo ? 'Activar tema claro' : 'Activar tema oscuro'
            );
        });
    }

    // Animación al aparecer en pantalla
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });

    // Validación del formulario de contacto
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre || !email || !mensaje) {
                mostrarMensaje('Por favor completa todos los campos.', 'error');
                return;
            }

            if (!validarEmail(email)) {
                mostrarMensaje('Escribe un correo electrónico válido.', 'error');
                return;
            }

            guardarEnStorage({ nombre, email, mensaje });

            mostrarMensaje('¡Mensaje enviado correctamente! ✅', 'exito');

            form.reset();
        });
    }

    // BONUS: botón visible para mostrar mensajes guardados
    if (btnVerMensajes) {
        btnVerMensajes.addEventListener('click', () => {
            verMensajesGuardados();
        });
    }
});


// Valida el formato del correo electrónico
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


// Muestra mensajes de error o éxito debajo del formulario
function mostrarMensaje(texto, tipo) {
    const el = document.getElementById('msg-respuesta');

    if (!el) {
        return;
    }

    el.textContent = texto;
    el.className = tipo === 'error' ? 'msg-error' : 'msg-exito';
}


// Guarda los datos del formulario en localStorage
function guardarEnStorage(datos) {
    const mensajes = JSON.parse(localStorage.getItem('mensajes-contacto')) || [];

    datos.fecha = new Date().toLocaleString('es-MX');

    mensajes.push(datos);

    localStorage.setItem('mensajes-contacto', JSON.stringify(mensajes));
}


// BONUS: muestra los mensajes guardados en consola y en la página
function verMensajesGuardados() {
    const mensajes = JSON.parse(localStorage.getItem('mensajes-contacto')) || [];
    const contenedor = document.getElementById('mensajes-guardados');

    console.table(mensajes);

    if (!contenedor) {
        return;
    }

    if (mensajes.length === 0) {
        contenedor.innerHTML = '<p class="msg-error">Todavía no hay mensajes guardados.</p>';
        return;
    }

    contenedor.innerHTML = mensajes
        .map((mensaje, index) => {
            return `
                <article class="mensaje-card">
                    <h4>Mensaje ${index + 1}: ${mensaje.nombre}</h4>
                    <p><strong>Correo:</strong> ${mensaje.email}</p>
                    <p><strong>Mensaje:</strong> ${mensaje.mensaje}</p>
                    <small>Enviado el: ${mensaje.fecha}</small>
                </article>
            `;
        })
        .join('');
}


// Permite ejecutar la función desde la consola si el profesor lo pide
window.verMensajesGuardados = verMensajesGuardados;