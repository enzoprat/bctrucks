/* ==========================================================================
   BC Trucks — interactions front-end
   Vanilla JS, sans dépendance. Léger et progressif.
   ========================================================================== */
(function () {
  "use strict";

  /* -------- Menu mobile -------- */
  var toggle = document.querySelector(".nav-toggle");
  var body = document.body;
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      body.style.overflow = open ? "hidden" : "";
    });
    // Fermer au clic sur un lien du menu mobile
    document.querySelectorAll(".mobile-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      });
    });
    // Fermer avec Échap
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("nav-open")) {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      }
    });
  }

  /* -------- Apparitions au scroll -------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* -------- FAQ / accordéon -------- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var answer = item.querySelector(".faq-a");
      var open = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0px";
    });
  });

  /* -------- Formulaire de contact -------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var feedback = form.querySelector(".form-feedback");
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validation native + champs requis
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // NOTE INTÉGRATION : aucun back-end n'est branché.
      // Pour mise en production, remplacer ce bloc par :
      //  - un envoi fetch() vers une route serveur / service mail (Formspree, etc.)
      //  - ou l'action POST d'un formulaire géré par l'hébergeur.
      var data = Object.fromEntries(new FormData(form).entries());
      console.log("[BC Trucks] Demande à transmettre :", data);

      if (feedback) {
        feedback.textContent =
          "Merci, votre demande a bien été prise en compte. L'équipe BC Trucks vous recontacte dans les meilleurs délais. (Démo : aucun e-mail n'est encore envoyé, voir note d'intégration.)";
        feedback.classList.remove("is-error");
        feedback.classList.add("is-visible", "is-success");
        feedback.setAttribute("role", "status");
      }
      form.reset();
      feedback && feedback.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* -------- Année dynamique dans le footer -------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
