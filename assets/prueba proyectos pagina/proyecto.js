// Mostrar/ocultar tarjetas al abrir y cerrar
document.addEventListener("DOMContentLoaded", function() {
  // Ocultar todos los subniveles al inicio
  document.querySelectorAll(".subcards, .final-cards").forEach(el => {
    el.style.display = "none";
  });

  // Abrir subcards o final-cards
  document.querySelectorAll(".open-btn").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      const targetId = btn.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (!target) return;
     
      // Si es final-cards, cerramos todos los del mismo row antes
      if (target.classList.contains("final-cards")) {
        btn.parentElement.parentElement.querySelectorAll(".final-cards").forEach(f => f.style.display = "none");
      }
      target.style.display = "flex";
    });
  });

  // Cerrar tarjetas finales solo con el botón "cerrar" de la derecha
  document.querySelectorAll(".close-btn").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      const targetId = btn.getAttribute("data-close");
      const target = document.getElementById(targetId);
      if (target) target.style.display = "none";
    });
  });
});