/**
 * ==========================================================================
 * SILVER - LÓGICA & COMPORTAMIENTOS INTERACTIVOS (ES6)
 * Identidad: "Optimizamos tu tecnología, desarrollamos tu potencial"
 * Arquitectura estática ultra rápida, modular y sin dependencias externas.
 * ==========================================================================
 */

// Configuración centralizada oficial de SILVER Soluciones Tecnológicas
const SILVER_CONFIG = {
  company: {
    name: "SILVER Soluciones Tecnológicas",
    phoneDisplay: "+58 414-6886719",
    whatsappNumber: "584146886719",
    email: "silver2026ca@gmail.com"
  },

  downloadsEnabled: false
};

document.addEventListener("DOMContentLoaded", () => {
  initCodeProtection();
  initNavbar();
  initDemosFilter();
  initInteractiveSystemStages();
  initPendingDownloadsHandler();
  initWhatsAppGenerator();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   0. PROTECCIÓN DE CÓDIGO FUENTE Y BLOQUEO DE INSPECCIÓN
   -------------------------------------------------------------------------- */
function initCodeProtection() {
  // Bloquear clic derecho (menú contextual / Inspeccionar)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // Bloquear atajos de teclado de DevTools y Ver Código Fuente
  document.addEventListener("keydown", (e) => {
    const key = (e.key || "").toUpperCase();
    const ctrlOrCmd = e.ctrlKey || e.metaKey;

    // F12
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I (Inspector), Ctrl+Shift+J (Consola), Ctrl+Shift+C (Selector), Ctrl+Shift+K
    if (ctrlOrCmd && e.shiftKey && ["I", "J", "C", "K"].includes(key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U (Ver código fuente) o Ctrl+S (Guardar página)
    if (ctrlOrCmd && ["U", "S"].includes(key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  // Evitar arrastrar imágenes o logotipos
  document.addEventListener("dragstart", (e) => {
    if (e.target && e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });
}

/* --------------------------------------------------------------------------
   1. NAVBAR & NAVEGACIÓN MÓVIL
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector(".header");
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-open");
    });

    // Cerrar menú al hacer clic en cualquier enlace en móviles
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("mobile-open");
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. FILTRO INTERACTIVO Y TARJETA ALARGADA HORIZONTALMENTE (AXIOMA, UMAMI, ÑAMGO)
   -------------------------------------------------------------------------- */
function initDemosFilter() {
  const filterButtons = document.querySelectorAll(".demo-filter-btn");
  const systemCards = document.querySelectorAll(".interactive-system-card");
  const showcaseGrid = document.getElementById("interactiveSystemsGrid");
  const expandTriggers = document.querySelectorAll(".system-expand-trigger");
  const backAllBtns = document.querySelectorAll("[data-back-all]");

  if (!filterButtons.length || !showcaseGrid) return;

  function applySystemFilter(selectedFilter) {
    // 1. Actualizar estado activo en los botones de filtro superiores
    filterButtons.forEach(b => {
      const isMatch = b.getAttribute("data-filter") === selectedFilter;
      b.classList.toggle("active", isMatch);
      b.setAttribute("aria-selected", isMatch ? "true" : "false");
    });

    // 2. Alternar entre Vista de 3 Columnas ("all") y Vista de Tarjeta Alargada Horizontal
    const isExpanded = selectedFilter !== "all";
    showcaseGrid.classList.toggle("expanded-mode", isExpanded);

    // 3. Mostrar las 3 tarjetas compactas o alargar horizontalmente la tarjeta elegida
    systemCards.forEach(card => {
      const sysKey = card.getAttribute("data-system");
      if (selectedFilter === "all") {
        card.classList.remove("is-expanded-card");
        card.style.display = "flex";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      } else if (selectedFilter === sysKey) {
        card.classList.add("is-expanded-card");
        card.style.display = "grid";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      } else {
        card.classList.remove("is-expanded-card");
        card.style.display = "none";
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.getAttribute("data-filter") || "all";
      applySystemFilter(selectedFilter);
    });
  });

  // Botón "Ampliar Información" dentro de cada tarjeta
  expandTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const targetSys = trigger.getAttribute("data-expand-system");
      if (targetSys) {
        applySystemFilter(targetSys);
      }
    });
  });

  // Botón "← Ver los 3 Sistemas" dentro de la tarjeta alargada
  backAllBtns.forEach(backBtn => {
    backBtn.addEventListener("click", () => {
      applySystemFilter("all");
    });
  });
}

/* --------------------------------------------------------------------------
   2.B COTIZACIÓN DIRECTA DE PRODUCTOS HACIA EL GENERADOR DE WHATSAPP
   -------------------------------------------------------------------------- */
function initInteractiveSystemStages() {
  const quoteButtons = document.querySelectorAll(".system-quote-trigger");
  quoteButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const systemName = btn.getAttribute("data-system-name") || "Producto SILVER";
      const waServiceSelect = document.getElementById("waServiceSelect");
      const waCustomMessage = document.getElementById("waCustomMessage");
      const contactBox = document.querySelector(".contact-box") || document.getElementById("contacto");

      if (waServiceSelect) {
        waServiceSelect.value = "software";
      }
      if (waCustomMessage) {
        waCustomMessage.value = `Me interesa el producto ${systemName} y deseo recibir información y cotización para mi negocio.`;
      }

      if (contactBox) {
        const headerOffset = 88;
        const offsetPosition = contactBox.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }

      showToast(
        `Consulta preparada: ${systemName}`,
        "Completa tu nombre o empresa y envía tu consulta al WhatsApp de SILVER."
      );
    });
  });
}

/* --------------------------------------------------------------------------
   3. MANEJO DE ENLACES DE DESCARGA Y DEMOS EN PREPARACIÓN
   -------------------------------------------------------------------------- */
function initPendingDownloadsHandler() {
  const pendingButtons = document.querySelectorAll(".pending-download-trigger, .btn-pending");

  pendingButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const itemName = btn.getAttribute("data-item") || "este proyecto";
      const isWeb = itemName.toLowerCase().includes("web");
      
      if (isWeb) {
        showToast(
          "Demo Web en Preparación",
          `El acceso interactivo a ${itemName} se habilitará al completar las especificaciones técnicas.`
        );
      } else {
        showToast(
          "Módulo en Preparación",
          `La descarga de ${itemName} se habilitará próximamente en la nueva versión de SILVER.`
        );
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. TOAST DE NOTIFICACIÓN FLOTANTE
   -------------------------------------------------------------------------- */
let toastTimeout = null;

function showToast(title, description) {
  const toast = document.getElementById("toastNotification");
  const titleEl = document.getElementById("toastTitle");
  const descEl = document.getElementById("toastDesc");

  if (!toast) return;

  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = description;

  toast.classList.add("show");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

/* --------------------------------------------------------------------------
   4. GENERADOR DIRECTO DE MENSAJE AL WHATSAPP CORPORATIVO DE SILVER
   -------------------------------------------------------------------------- */
function initWhatsAppGenerator() {
  const waSubmitBtn = document.getElementById("waSubmitBtn");
  const waServiceSelect = document.getElementById("waServiceSelect");
  const waClientName = document.getElementById("waClientName");
  const waCustomMessage = document.getElementById("waCustomMessage");

  if (!waSubmitBtn) return;

  waSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const serviceMap = {
      software: "Desarrollo de Software a Medida / ERP",
      redes: "Redes & Cableado Estructurado",
      hardware: "Mantenimiento de Hardware y Servidores",
      seguridad: "Ciberseguridad y Arquitectura Zero Trust",
      consultoria: "Asesoría y Consultoría Tecnológica Integral",
      general: "Información General de Servicios SILVER"
    };

    const selectedServiceKey = waServiceSelect ? waServiceSelect.value : "general";
    const serviceName = serviceMap[selectedServiceKey] || "Servicios Tecnológicos";
    const clientName = waClientName && waClientName.value.trim() ? waClientName.value.trim() : "Cliente Interesado";
    const customMsg = waCustomMessage && waCustomMessage.value.trim() ? waCustomMessage.value.trim() : "Deseo recibir más detalles y coordinar una reunión técnica.";

    const fullMessage = 
      `Hola equipo de *${SILVER_CONFIG.company.name}*,\n\n` +
      `Mi nombre / empresa es: *${clientName}*.\n` +
      `Estoy interesado en el área de: *${serviceName}*.\n\n` +
      `*Consulta o requerimiento:* \n${customMsg}\n\n` +
      `Quedo atento a su respuesta.`;

    const encodedMessage = encodeURIComponent(fullMessage);
    const targetUrl = `https://wa.me/${SILVER_CONFIG.company.whatsappNumber}?text=${encodedMessage}`;

    window.open(targetUrl, "_blank");
  });
}

/* --------------------------------------------------------------------------
   5. NAVEGACIÓN SUAVE PARA ENLACES INTERNOS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Si el objetivo es contacto, enfocar directamente la caja de contacto para un encuadre perfecto
        const scrollTarget = (targetId === "#contacto" && document.querySelector(".contact-box")) 
          ? document.querySelector(".contact-box") 
          : targetElement;

        const headerOffset = 88;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
