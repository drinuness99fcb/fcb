/**
 * FCB Automações - Interactive Scripts v2.0
 * Enhanced with AOS, GSAP, Vanilla Tilt, and premium micro-interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgressBar();
  initCursorGlow();
  initAOSAttributes();
  initAOS();
  initHeroGSAP();
  initCounterAnimation();
  initNavbarScroll();
  initMobileNav();
  initDemoPlayer();
  initLeadForm();
  initSmoothScroll();
  initVanillaTilt();
  initRoiCalculator();
  initFloatingWhatsApp();
});

/* ==========================================================================
   Cursor Glow Follower
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || window.innerWidth < 860) return;

  document.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  });

  document.body.addEventListener("mouseenter", () => {
    glow.style.opacity = "1";
  });

  document.body.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
}

/* ==========================================================================
   AOS Data Attributes (Programmatic - keeps HTML clean)
   ========================================================================== */
function initAOSAttributes() {
  // Section headers
  document.querySelectorAll(".sec-head").forEach((el) => {
    el.setAttribute("data-aos", "fade-up");
  });

  // Pillar cards — staggered fade-up
  document.querySelectorAll(".pillar-card").forEach((el, i) => {
    el.setAttribute("data-aos", "fade-up");
    el.setAttribute("data-aos-delay", String(i * 100));
  });

  // ROI comparison table
  const tableWrap = document.querySelector(".compare-table-wrapper");
  if (tableWrap) tableWrap.setAttribute("data-aos", "fade-up");

  // KPI banner
  const kpiBanner = document.querySelector(".kpi-banner");
  if (kpiBanner) {
    kpiBanner.setAttribute("data-aos", "fade-up");
    kpiBanner.setAttribute("data-aos-delay", "100");
  }

  // Sector cards — staggered zoom-in
  document.querySelectorAll(".sector-card").forEach((el, i) => {
    el.setAttribute("data-aos", "zoom-in");
    el.setAttribute("data-aos-delay", String(i * 80));
  });

  // Plan cards — staggered fade-up
  document.querySelectorAll(".plan-card").forEach((el, i) => {
    el.setAttribute("data-aos", "fade-up");
    el.setAttribute("data-aos-delay", String(i * 120));
  });

  // Timeline steps — sequential
  document.querySelectorAll(".t-step").forEach((el, i) => {
    el.setAttribute("data-aos", "fade-up");
    el.setAttribute("data-aos-delay", String(i * 100));
  });

  // FAQ items — subtle stagger
  document.querySelectorAll(".faq-item").forEach((el, i) => {
    el.setAttribute("data-aos", "fade-up");
    el.setAttribute("data-aos-delay", String(i * 60));
  });

  // CTA box — zoom-in for impact
  const ctaBox = document.querySelector(".cta-box");
  if (ctaBox) {
    ctaBox.setAttribute("data-aos", "zoom-in");
    ctaBox.setAttribute("data-aos-duration", "800");
  }

  // Demo tabs
  const demoTabs = document.querySelector(".demo-tabs");
  if (demoTabs) demoTabs.setAttribute("data-aos", "fade-up");

  // Demo player grids
  document.querySelectorAll(".demo-player-container .player-grid").forEach((el) => {
    el.setAttribute("data-aos", "fade-up");
    el.setAttribute("data-aos-delay", "100");
  });
}

/* ==========================================================================
   AOS Initialization
   ========================================================================== */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: window.innerWidth < 768,
    });
  }
}

/* ==========================================================================
   GSAP Hero Entrance Animation (Cinematic Reveal)
   ========================================================================== */
function initHeroGSAP() {
  if (typeof gsap === "undefined") return;

  // Set initial hidden state to prevent FOUC
  gsap.set(".eyebrow-badge", { opacity: 0, y: -20 });
  gsap.set(".hero-title", { opacity: 0, y: 30 });
  gsap.set(".hero-lead", { opacity: 0, y: 20 });
  gsap.set(".hero-actions .btn", { opacity: 0, y: 15, scale: 0.95 });
  gsap.set(".tag", { opacity: 0, scale: 0.85 });
  gsap.set(".proof-card", { opacity: 0, y: 25 });

  // Build cinematic timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

  tl.to(".eyebrow-badge", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    clearProps: "transform",
  })
    .to(
      ".hero-title",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        clearProps: "transform",
      },
      "-=0.2"
    )
    .to(
      ".hero-lead",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        clearProps: "transform",
      },
      "-=0.3"
    )
    .to(
      ".hero-actions .btn",
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.12,
        clearProps: "transform",
      },
      "-=0.2"
    )
    .to(
      ".tag",
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.06,
        clearProps: "transform",
      },
      "-=0.2"
    )
    .to(
      ".proof-card",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        clearProps: "transform",
      },
      "-=0.3"
    );
}

/* ==========================================================================
   Counter Animation for KPI Numbers
   ========================================================================== */
function initCounterAnimation() {
  const proofCards = document.querySelectorAll(".proof-card .glow-num");
  if (!proofCards.length) return;

  const countersData = [
    { prefix: "~", value: 3, suffix: "s" },
    { text: "24/7" },
    { prefix: "+", value: 65, suffix: "%" },
    { text: "1 clique" },
  ];

  function animateCounters() {
    proofCards.forEach((el, i) => {
      const data = countersData[i];
      if (!data) return;

      if (data.text) {
        // Non-numeric: reveal with delay
        setTimeout(() => {
          el.textContent = data.text;
        }, i * 200 + 200);
        return;
      }

      // Numeric: count up animation
      const duration = 1500;
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * data.value);
        el.textContent = (data.prefix || "") + current + (data.suffix || "");

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      setTimeout(() => requestAnimationFrame(tick), i * 150);
    });
  }

  // If GSAP is handling hero entrance, sync counter timing with card reveal
  if (typeof gsap !== "undefined") {
    // Cards appear ~2s into the GSAP timeline; start counters after that
    setTimeout(animateCounters, 2100);
  } else {
    // Fallback: use IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const proofGrid = document.querySelector(".proof-grid");
    if (proofGrid) observer.observe(proofGrid);
  }
}

/* ==========================================================================
   Navbar Scroll Effect (Blur Transition)
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    },
    { passive: true }
  );
}

/* ==========================================================================
   Vanilla Tilt for Cards (Subtle 3D Tilt on Hover)
   ========================================================================== */
function initVanillaTilt() {
  if (typeof VanillaTilt === "undefined" || window.innerWidth < 860) return;

  const tiltElements = document.querySelectorAll(
    ".pillar-card, .sector-card, .plan-card"
  );

  VanillaTilt.init(Array.from(tiltElements), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.08,
    scale: 1.02,
  });
}

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById("mobileToggle");
  const drawer = document.getElementById("mobileDrawer");

  if (!toggle || !drawer) return;

  toggle.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });

  // Close when clicking any link
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
    });
  });
}

/* ==========================================================================
   Smooth Scrolling for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/* ==========================================================================
   Interactive Demo Player (Client Journey + Agent View)
   ========================================================================== */
function initDemoPlayer() {
  // Tabs switching: Visão do Cliente vs Visão do Gestor
  const tabBtns = document.querySelectorAll(".demo-tabs .tab-btn");
  const playerCliente = document.getElementById("player-cliente");
  const playerAgente = document.getElementById("player-agente");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.dataset.view;
      if (view === "cliente") {
        playerCliente.classList.add("active");
        playerAgente.classList.remove("active");
      } else {
        playerCliente.classList.remove("active");
        playerAgente.classList.add("active");
      }
    });
  });

  // -------------------------------------------------------------
  // Data for Client WhatsApp Journey (5 Steps)
  // -------------------------------------------------------------
  const clientStepsData = [
    {
      title: "Chegada do Lead no WhatsApp",
      messages: [
        {
          type: "out",
          text: "Olá! Gostaria de saber mais sobre as soluções de automação e chatbots da FCB.",
          time: "14:20",
        },
        {
          type: "in",
          text: 'Olá! Seja muito bem-vindo à <strong>FCB Automações</strong> 🚀<br><br>Sou o assistente de IA da FCB. Atendemos 24h por dia para empresas que querem acelerar vendas e atendimento sem filas.',
          time: "14:20",
        },
      ],
    },
    {
      title: "Resposta Imediata & Qualificação (~3s)",
      messages: [
        {
          type: "out",
          text: "Olá! Gostaria de saber mais sobre as soluções de automação e chatbots da FCB.",
          time: "14:20",
        },
        {
          type: "in",
          text: 'Olá! Seja muito bem-vindo à <strong>FCB Automações</strong> 🚀<br><br>Sou o assistente de IA da FCB. Atendemos 24h por dia para empresas que querem acelerar vendas e atendimento sem filas.',
          time: "14:20",
        },
        {
          type: "in",
          text: 'Para te direcionar com a melhor solução: <strong>qual é o segmento da sua empresa</strong> e o principal gargalo no seu atendimento hoje?',
          time: "14:20",
        },
        {
          type: "out",
          audio: {
            duration: "0:14",
          },
          time: "14:21",
        },
        {
          type: "in",
          text: '🎙️ <em>Áudio recebido e compreendido:</em><br>Entendido perfeitamente! Para clínicas com múltiplas unidades, nossa IA agenda consultas 24h, faz triagem de convênios e envia confirmações automáticas.',
          time: "14:21",
        },
      ],
    },
    {
      title: "Apresentação de Opções / Catálogo",
      messages: [
        {
          type: "out",
          text: "Temos uma clínica médica com 4 unidades. Perdemos muitos pacientes e orçamentos fora do horário comercial.",
          time: "14:21",
        },
        {
          type: "in",
          text: 'Entendido perfeitamente! Para clínicas, implementamos o <strong>Agendador Inteligente 24/7</strong> com triagem e confirmação automática, eliminando faltas e perda de leads.',
          time: "14:21",
        },
        {
          type: "in",
          card: {
            title: "🏥 Pacote FCB Saúde & Clínicas",
            desc: "• Agendamento direto no WhatsApp<br>• Triagem inteligente de convênios/particular<br>• Lembretes e confirmação 24h antes<br>• Integração ao prontuário/sistema",
            btnText: "Solicitar Demonstração Rápida",
          },
          time: "14:21",
        },
      ],
    },
    {
      title: "Fechamento & Checkout com Pix",
      messages: [
        {
          type: "out",
          text: "Excelente! Como podemos fazer para receber uma proposta personalizada para as 4 unidades?",
          time: "14:22",
        },
        {
          type: "in",
          text: "Perfeito! Já preparei o agendamento de um diagnóstico gratuito com nosso especialista sênior em automações:",
          time: "14:22",
        },
        {
          type: "in",
          card: {
            title: "📅 Diagnóstico Estratégico Reservado",
            desc: "Horário: Amanhã às 14:30h<br>Canal: Google Meet / WhatsApp<br>Status: Confirmado no sistema",
            btnText: "✓ Agendamento Confirmado",
          },
          time: "14:22",
        },
      ],
    },
    {
      title: "Sincronização no CRM & Notificação",
      messages: [
        {
          type: "in",
          text: "Seu agendamento foi registrado com sucesso! Acabei de sincronizar os dados no CRM da sua empresa e seu time já recebeu a notificação no painel de controle.",
          time: "14:23",
        },
        {
          type: "in",
          card: {
            title: "⚡ Lead Sincronizado no CRM",
            desc: '<strong>Contato:</strong> Clínica Médica (4 unid.)<br><strong>Etapa:</strong> Reunião Diagnóstica Marcada<br><strong>Prioridade:</strong> Alta · Origem: WhatsApp Oficial',
            btnText: "Operação 100% Integrada",
          },
          time: "14:23",
        },
      ],
    },
  ];

  // -------------------------------------------------------------
  // Data for Agent / Manager Console (4 Steps)
  // -------------------------------------------------------------
  const agentStepsData = [
    {
      title: "Fila Centralizada Multicanal",
      render: () => `
        <div class="agent-card-preview">
          <div class="agent-meta-row">
            <span class="agent-lead-name">Clínica Médica (4 unidades)</span>
            <span class="agent-tag">WhatsApp Oficial</span>
          </div>
          <div class="agent-summary">
            <strong>IA em atendimento:</strong> Triagem concluída. Cliente solicitou informações de automação de agendamentos.
          </div>
          <button class="agent-btn-take">Assumir Conversa</button>
        </div>

        <div class="agent-card-preview">
          <div class="agent-meta-row">
            <span class="agent-lead-name">Loja Varejo & E-commerce</span>
            <span class="agent-tag">Webchat Site</span>
          </div>
          <div class="agent-summary">
            <strong>IA em atendimento:</strong> Pedido #4082 gerado via Pix. Aguardando conciliação automática.
          </div>
          <button class="agent-btn-take">Ver Detalhes do Pedido</button>
        </div>
      `,
    },
    {
      title: "Resumo Inteligente para o Atendente",
      render: () => `
        <div class="agent-card-preview" style="border-color: var(--primary);">
          <div class="agent-meta-row">
            <span class="agent-lead-name">Resumo Pré-Atendimento gerado por IA</span>
            <span class="agent-tag" style="background: rgba(16, 185, 129, 0.2); color: #34D399;">Qualificado</span>
          </div>
          <div class="agent-summary" style="font-size: 13.5px;">
            <strong>Perfil do Lead:</strong> Gestor de clínica com 4 unidades.<br>
            <strong>Gargalo:</strong> Perda de agendamentos no período noturno e finais de semana.<br>
            <strong>Solução Recomendada:</strong> Plano Pro com Agendador com IA e lembretes automáticos.<br>
            <strong>Ação sugerida:</strong> Apresentar a demonstração técnica e modelo de proposta.
          </div>
          <div style="font-size: 12px; color: #94A3B8; margin-top: 6px;">Tempo poupado pelo atendente: ~6 minutos de triagem.</div>
        </div>
      `,
    },
    {
      title: "Intervenção Humana sem Ruído",
      render: () => `
        <div class="agent-card-preview" style="background: #141A29;">
          <div class="agent-meta-row">
            <span class="agent-lead-name">Atendimento Assumido por: Carlos (Consultor Sênior)</span>
            <span class="agent-tag">Modo Híbrido Ativo</span>
          </div>
          <p style="font-size: 13px; color: #E2E8F0; margin-bottom: 10px;">
            O atendente humano agora responde diretamente pela interface unificada, enquanto a IA monitora o envio de dados e orçamentos em segundo plano.
          </p>
          <div class="agent-actions-row">
            <button class="agent-btn-take btn-blue">Enviar Proposta PDF</button>
            <button class="agent-btn-take btn-green">Aprovar Orçamento</button>
          </div>
        </div>
      `,
    },
    {
      title: "Dashboard de Métricas & ROI",
      render: () => `
        <div class="agent-metrics-grid">
          <div class="agent-metric-card">
            <div class="agent-metric-label">Atendimentos Hoje</div>
            <div class="agent-metric-val">184</div>
            <div class="agent-metric-sub text-success">87% finalizados 100% pela IA</div>
          </div>
          <div class="agent-metric-card">
            <div class="agent-metric-label">Tempo Médio de Resposta</div>
            <div class="agent-metric-val val-purple">2.8s</div>
            <div class="agent-metric-sub">Antes da FCB: 34 minutos</div>
          </div>
        </div>
        <div class="agent-metric-card full-width">
          <div class="agent-metric-label">Receita em Pipeline Automatizado</div>
          <div class="agent-metric-val val-cyan">R$ 42.850,00</div>
        </div>
      `,
    },
  ];

  // -------------------------------------------------------------
  // Controller: Client Player
  // -------------------------------------------------------------
  let currentClientStep = 0;
  const chatBody = document.getElementById("chatBody");
  const stepCounter = document.getElementById("stepCounter");
  const clientStepItems = document.querySelectorAll("#clientStepsList .step-item");
  const replayBtn = document.getElementById("replayStep");
  const nextBtn = document.getElementById("nextStep");

  function renderClientStep(stepIndex) {
    if (!chatBody) return;

    currentClientStep = stepIndex;
    const data = clientStepsData[stepIndex];

    // Update active class on steps list
    clientStepItems.forEach((item, idx) => {
      if (idx === stepIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    if (stepCounter) {
      stepCounter.textContent = `${stepIndex + 1} / ${clientStepsData.length}`;
    }

    // Render messages with staggered reveal (simulates real-time conversation)
    chatBody.innerHTML = "";
    data.messages.forEach((msg, i) => {
      const bubble = document.createElement("div");
      bubble.className = `msg-bubble msg-${msg.type}`;
      bubble.style.opacity = "0";
      bubble.style.transform = "translateY(10px)";

      let contentHtml = "";
      if (msg.text) {
        contentHtml += `<div>${msg.text}</div>`;
      }

      if (msg.audio) {
        contentHtml += `
          <div class="msg-audio-player">
            <button class="audio-play-btn" type="button" aria-label="Reproduzir áudio">▶</button>
            <div class="audio-waveform">
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
              <span class="audio-bar"></span>
            </div>
            <span class="audio-time">${msg.audio.duration}</span>
          </div>
          <div class="audio-transcription-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            <span>Áudio compreendido por IA</span>
          </div>
        `;
      }

      if (msg.card) {
        contentHtml += `
          <div class="msg-card">
            <div class="msg-card-title">${msg.card.title}</div>
            <div style="font-size: 11.5px; line-height: 1.4; color: #CBD5E1;">${msg.card.desc}</div>
            <span class="msg-btn-action">${msg.card.btnText}</span>
          </div>
        `;
      }

      contentHtml += `<span class="msg-time">${msg.time}</span>`;
      bubble.innerHTML = contentHtml;
      chatBody.appendChild(bubble);

      // Staggered reveal — each message appears after a short delay
      setTimeout(() => {
        bubble.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        bubble.style.opacity = "1";
        bubble.style.transform = "translateY(0)";
      }, i * 250 + 100);
    });

    // Auto scroll after all messages appear
    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, data.messages.length * 250 + 300);
  }

  // Click on list item
  clientStepItems.forEach((item) => {
    item.addEventListener("click", () => {
      const stepIdx = parseInt(item.dataset.step, 10);
      renderClientStep(stepIdx);
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let next = currentClientStep + 1;
      if (next >= clientStepsData.length) next = 0;
      renderClientStep(next);
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      renderClientStep(currentClientStep);
    });
  }

  // Initial render
  renderClientStep(0);

  // -------------------------------------------------------------
  // Controller: Agent Player
  // -------------------------------------------------------------
  let currentAgentStep = 0;
  const agentConsoleBody = document.getElementById("agentConsoleBody");
  const agentStepCounter = document.getElementById("agentStepCounter");
  const agentStepItems = document.querySelectorAll("#agentStepsList .step-item");
  const replayAgentBtn = document.getElementById("replayAgentStep");
  const nextAgentBtn = document.getElementById("nextAgentStep");

  function renderAgentStep(stepIndex) {
    if (!agentConsoleBody) return;

    currentAgentStep = stepIndex;
    const data = agentStepsData[stepIndex];

    agentStepItems.forEach((item, idx) => {
      if (idx === stepIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    if (agentStepCounter) {
      agentStepCounter.textContent = `${stepIndex + 1} / ${agentStepsData.length}`;
    }

    agentConsoleBody.innerHTML = data.render();
  }

  agentStepItems.forEach((item) => {
    item.addEventListener("click", () => {
      const stepIdx = parseInt(item.dataset.step, 10);
      renderAgentStep(stepIdx);
    });
  });

  if (nextAgentBtn) {
    nextAgentBtn.addEventListener("click", () => {
      let next = currentAgentStep + 1;
      if (next >= agentStepsData.length) next = 0;
      renderAgentStep(next);
    });
  }

  if (replayAgentBtn) {
    replayAgentBtn.addEventListener("click", () => {
      renderAgentStep(currentAgentStep);
    });
  }

  // Initial render agent view
  renderAgentStep(0);
}

/* ==========================================================================
   Lead Form Handler
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById("leadForm");
  const feedback = document.getElementById("formFeedback");

  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("leadName").value;
    const phone = document.getElementById("leadPhone").value;
    const segment = document.getElementById("leadSegment").value;

    // Simulate saving lead
    const leadData = {
      name,
      phone,
      segment,
      date: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("fcb_leads") || "[]");
      existing.push(leadData);
      localStorage.setItem("fcb_leads", JSON.stringify(existing));
    } catch (err) {
      console.warn("Storage not available", err);
    }

    // Hide form, show feedback
    form.style.display = "none";
    feedback.style.display = "block";

    // Scroll to feedback
    feedback.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* ==========================================================================
   Scroll Progress Bar
   ========================================================================== */
function initScrollProgressBar() {
  const bar = document.getElementById("scrollProgressBar");
  if (!bar) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = Math.min(progress, 100) + "%";
    },
    { passive: true }
  );
}

/* ==========================================================================
   Interactive ROI Calculator
   ========================================================================== */
function initRoiCalculator() {
  const rangeLeads = document.getElementById("rangeLeads");
  const rangeTicket = document.getElementById("rangeTicket");
  const rangeAttendants = document.getElementById("rangeAttendants");

  const valLeads = document.getElementById("valLeads");
  const valTicket = document.getElementById("valTicket");
  const valAttendants = document.getElementById("valAttendants");

  const calcRecoveredSales = document.getElementById("calcRecoveredSales");
  const calcHoursSaved = document.getElementById("calcHoursSaved");
  const calcAutomatedCalls = document.getElementById("calcAutomatedCalls");

  if (!rangeLeads || !rangeTicket || !rangeAttendants) return;

  function formatBRL(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function updateCalculator() {
    const leadsPerDay = parseInt(rangeLeads.value, 10);
    const ticket = parseFloat(rangeTicket.value);
    const attendants = parseInt(rangeAttendants.value, 10);

    // Update label badges
    if (valLeads) valLeads.textContent = `${leadsPerDay} contatos/dia`;
    if (valTicket) valTicket.textContent = formatBRL(ticket);
    if (valAttendants) valAttendants.textContent = `${attendants} atendente${attendants > 1 ? "s" : ""}`;

    // Calculations:
    const monthlyLeads = leadsPerDay * 30;
    const offHoursLeads = monthlyLeads * 0.35;
    const conversionsRecovered = offHoursLeads * 0.15;
    const recoveredRevenue = conversionsRecovered * ticket;
    const hoursSavedTotal = Math.round(attendants * 48);
    const automatedInteractions = Math.round(monthlyLeads * 0.85);

    if (calcRecoveredSales) {
      calcRecoveredSales.textContent = formatBRL(recoveredRevenue);
    }
    if (calcHoursSaved) {
      calcHoursSaved.textContent = `~${hoursSavedTotal}h /mês`;
    }
    if (calcAutomatedCalls) {
      calcAutomatedCalls.textContent = `~${automatedInteractions.toLocaleString("pt-BR")} /mês`;
    }
  }

  rangeLeads.addEventListener("input", updateCalculator);
  rangeTicket.addEventListener("input", updateCalculator);
  rangeAttendants.addEventListener("input", updateCalculator);

  // Initial calculation
  updateCalculator();
}

/* ==========================================================================
   Floating WhatsApp Widget
   ========================================================================== */
function initFloatingWhatsApp() {
  const triggerBtn = document.getElementById("waTriggerBtn");
  const popover = document.getElementById("waPopover");
  const closeBtn = document.getElementById("closeWaPopover");
  const badge = document.getElementById("waNotifyBadge");

  if (!triggerBtn || !popover) return;

  function togglePopover(show) {
    const isOpen = typeof show === "boolean" ? show : !popover.classList.contains("open");
    if (isOpen) {
      popover.classList.add("open");
      if (badge) badge.style.display = "none";
    } else {
      popover.classList.remove("open");
    }
  }

  triggerBtn.addEventListener("click", () => togglePopover());

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePopover(false);
    });
  }

  // Close when clicking quick actions chips and scroll smoothly
  document.querySelectorAll(".wa-action-chip, .wa-direct-btn").forEach((link) => {
    link.addEventListener("click", () => {
      togglePopover(false);
    });
  });

  // Auto pop-up once after 5 seconds to grab attention
  const hasAutoPopped = sessionStorage.getItem("fcb_wa_popped");
  if (!hasAutoPopped && window.innerWidth > 768) {
    setTimeout(() => {
      togglePopover(true);
      sessionStorage.setItem("fcb_wa_popped", "true");
    }, 5000);
  }
}
