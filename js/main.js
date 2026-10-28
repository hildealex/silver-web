/**
 * ==========================================================================
 * SILVER - LÓGICA & COMPORTAMIENTOS INTERACTIVOS (ES6)
 * Identidad: "Optimizamos tu tecnología, desarrollamos tu potencial"
 * Arquitectura estática ultra rápida, modular y sin dependencias externas.
 * ==========================================================================
 */

// Configuración centralizada editable para el usuario
const SILVER_CONFIG = {
  // Contactos oficiales
  contacts: {
    hildemar: {
      name: "Ing. Hildemar Govea",
      role: "Ingeniería & Software",
      phoneDisplay: "0412-7856282",
      whatsappNumber: "584127856282",
      email: "hildemargovea6@gmail.com"
    },
    socio: {
      name: "Javier Barrios",
      role: "Infraestructura, Redes & Soporte",
      phoneDisplay: "0424-6205933",
      whatsappNumber: "584246205933",
      email: "jabg500@gmail.com"
    }
  },

  linkedin: "https://www.linkedin.com",
  
  // Control de funcionalidad de descargas:
  // Como solicitó el usuario, las descargas quedan sin funcionalidad para ser habilitadas
  // cuando tenga listos los demás paquetes.
  downloadsEnabled: false,

  // Diccionario de paquetes para cuando el usuario decida activarlos
  downloadPackages: {
    axioma: {
      name: "Axioma_ERP_Demo.zip",
      fileUrl: "assets/downloads/Axioma_ERP_Demo_v1.0.zip",
      driveOrGithubUrl: "", // Pega aquí tu enlace de Google Drive o GitHub Release
      version: "Próxima versión"
    },
    myrmidon: {
      name: "Project_Myrmidon.zip",
      fileUrl: "assets/downloads/Project_Myrmidon_Demo_v1.0.zip",
      driveOrGithubUrl: "",
      version: "Próxima versión"
    },
    infrastructure: {
      name: "ZeroTrust_Suite.zip",
      fileUrl: "assets/downloads/Axioma_ERP_Demo_v1.0.zip",
      driveOrGithubUrl: "",
      version: "Próxima versión"
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initDemosFilter();
  initInteractiveSystemStages();
  initPendingDownloadsHandler();
  initWhatsAppGenerator();
  initSmoothScroll();
});

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
   2. FILTRO INTERACTIVO DE SISTEMAS (UMAMI, ÑANGO, AXIOMA)
   -------------------------------------------------------------------------- */
function initDemosFilter() {
  const filterButtons = document.querySelectorAll(".demo-filter-btn");
  const systemCards = document.querySelectorAll(".interactive-system-card");
  const groups = document.querySelectorAll(".demo-group-container");

  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.getAttribute("data-filter");

      // Actualizar estado activo en botones
      filterButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Filtrado directo de Fichas Interactivas por Sistema
      if (systemCards.length) {
        systemCards.forEach(card => {
          const sysKey = card.getAttribute("data-system");
          if (selectedFilter === "all" || selectedFilter === sysKey) {
            card.style.display = "flex";
            requestAnimationFrame(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(10px)";
            setTimeout(() => {
              const currentFilter = document.querySelector(".demo-filter-btn.active")?.getAttribute("data-filter");
              if (currentFilter !== "all" && currentFilter !== sysKey) {
                card.style.display = "none";
              }
            }, 220);
          }
        });
      }

      // Compatibilidad con subsecciones si se agregan en el futuro
      groups.forEach(group => {
        const groupType = group.getAttribute("data-group");
        if (selectedFilter === "all" || selectedFilter === groupType) {
          group.style.display = "block";
        } else {
          group.style.display = "none";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2.B REPRODUCTOR DE CAPÍTULOS EN FICHAS INTERACTIVAS & COTIZACIÓN DIRECTA
   -------------------------------------------------------------------------- */
function initInteractiveSystemStages() {
  const stages = document.querySelectorAll(".interactive-stage");
  const sceneOrder = ["reto", "funciones", "resultado"];

  stages.forEach(stage => {
    const chapterBtns = Array.from(stage.querySelectorAll(".chapter-btn"));
    const scenes = Array.from(stage.querySelectorAll(".stage-scene"));
    const progressBar = stage.querySelector(".stage-progress-bar");
    const autoplayBtn = stage.querySelector(".stage-autoplay-btn");
    let autoplayTimer = null;
    let currentIndex = 0;

    function activateSceneByIndex(index) {
      currentIndex = index % sceneOrder.length;
      const targetScene = sceneOrder[currentIndex];

      chapterBtns.forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-target-scene") === targetScene);
      });

      scenes.forEach(scene => {
        scene.classList.toggle("active", scene.getAttribute("data-scene") === targetScene);
      });

      if (progressBar) {
        progressBar.style.width = `${((currentIndex + 1) / sceneOrder.length) * 100}%`;
      }
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
      if (autoplayBtn) {
        autoplayBtn.classList.remove("playing");
        const icon = autoplayBtn.querySelector(".play-icon");
        const label = autoplayBtn.querySelector(".play-label");
        if (icon) icon.textContent = "▶";
        if (label) label.textContent = "Tour";
      }
    }

    chapterBtns.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        stopAutoplay();
        activateSceneByIndex(idx);
      });
    });

    if (autoplayBtn) {
      autoplayBtn.addEventListener("click", () => {
        if (autoplayTimer) {
          stopAutoplay();
        } else {
          autoplayBtn.classList.add("playing");
          const icon = autoplayBtn.querySelector(".play-icon");
          const label = autoplayBtn.querySelector(".play-label");
          if (icon) icon.textContent = "⏸";
          if (label) label.textContent = "Pausar";
          activateSceneByIndex((currentIndex + 1) % sceneOrder.length);
          autoplayTimer = setInterval(() => {
            activateSceneByIndex((currentIndex + 1) % sceneOrder.length);
          }, 3800);
        }
      });
    }
  });

  // Botón de cotización de sistema específico hacia el generador de WhatsApp
  const quoteButtons = document.querySelectorAll(".system-quote-trigger");
  quoteButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const systemName = btn.getAttribute("data-system-name") || "Sistema a Medida";
      const waServiceSelect = document.getElementById("waServiceSelect");
      const waCustomMessage = document.getElementById("waCustomMessage");
      const contactBox = document.querySelector(".contact-box") || document.getElementById("contacto");

      if (waServiceSelect) {
        waServiceSelect.value = "software";
      }
      if (waCustomMessage) {
        waCustomMessage.value = `Me interesó la ficha interactiva del sistema ${systemName} y deseo cotizar una solución o implementación para mi negocio.`;
      }

      if (contactBox) {
        const headerOffset = 88;
        const offsetPosition = contactBox.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }

      showToast(
        `Consulta preparada: ${systemName}`,
        "Completa tu nombre o empresa y abre la conversación en WhatsApp."
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
   4. GENERADOR DIRECTO DE MENSAJE DE WHATSAPP (CON SELECTOR DE DESTINATARIO)
   -------------------------------------------------------------------------- */
function initWhatsAppGenerator() {
  const waSubmitBtn = document.getElementById("waSubmitBtn");
  const waRecipientSelect = document.getElementById("waRecipientSelect");
  const waServiceSelect = document.getElementById("waServiceSelect");
  const waClientName = document.getElementById("waClientName");
  const waCustomMessage = document.getElementById("waCustomMessage");

  if (!waSubmitBtn) return;

  waSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const recipientKey = waRecipientSelect ? waRecipientSelect.value : "hildemar";
    const selectedContact = SILVER_CONFIG.contacts[recipientKey] || SILVER_CONFIG.contacts.hildemar;

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
      `Hola ${selectedContact.name} (SILVER),\n\n` +
      `Mi nombre / empresa es: *${clientName}*.\n` +
      `Estoy interesado en el área de: *${serviceName}*.\n\n` +
      `*Consulta o requerimiento:* \n${customMsg}\n\n` +
      `Quedo atento a su respuesta para optimizar nuestros sistemas.`;

    const encodedMessage = encodeURIComponent(fullMessage);
    const targetUrl = `https://wa.me/${selectedContact.whatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña
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
