document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const shareBtn = document.getElementById('share-btn');
    const body = document.body;

    // --- MODO CLARO / OSCURO (CON PERSISTENCIA) ---
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        // Cambiar icono entre Sol y Luna
        if (isLight) {
            themeToggle.classList.replace('fa-sun', 'fa-moon');
        } else {
            themeToggle.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // --- COMPARTIR ENLACE ---
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Tobias | Links',
            text: 'Mira los links de Tobias!',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error al compartir:', err);
            }
        } else {
            // Alternativa: Copiar al portapapeles
            try {
                await navigator.clipboard.writeText(shareData.url);
                showToast('¡Enlace copiado al portapapeles!');
            } catch (err) {
                console.error('Error al copiar:', err);
                alert('No se pudo copiar el enlace.');
            }
        }
    });

    // Función auxiliar para un aviso visual mejor que un alert
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: #fff;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
});
