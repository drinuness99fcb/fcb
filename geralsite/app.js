/**
 * FCB Automações - Interactive Scripts
 * Handles demo players, tab switching, mobile navigation, and lead interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initDemoPlayer();
  initLeadForm();
  initSmoothScroll();
});

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
          text: "Olá! Seja muito bem-vindo à <strong>FCB Automações</strong> 🚀<br><br>Sou o assistente de IA da FCB. Atendemos 24h por dia para empresas que querem acelerar vendas e atendimento sem filas.",
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
          text: "Olá! Seja muito bem-vindo à <strong>FCB Automações</strong> 🚀<br><br>Sou o assistente de IA da FCB. Atendemos 24h por dia para empresas que querem acelerar vendas e atendimento sem filas.",
          time: "14:20",
        },
        {
          type: "in",
          text: "Para te direcionar com a melhor solução: <strong>qual é o segmento da sua empresa</strong> e o principal gargalo no seu atendimento hoje?",
          time: "14:20",
        },
        {
          type: "out",
          text: "Temos uma clínica médica com 4 unidades. Perdemos muitos pacientes e orçamentos fora do horário comercial.",
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
          text: "Entendido perfeitamente! Para clínicas, implementamos o <strong>Agendador Inteligente 24/7</strong> com triagem e confirmação automática, eliminando faltas e perda de leads.",
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
            desc: "<strong>Contato:</strong> Clínica Médica (4 unid.)<br><strong>Etapa:</strong> Reunião Diagnóstica Marcada<br><strong>Prioridade:</strong> Alta · Origem: WhatsApp Oficial",
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
          <div style="display: flex; gap: 8px;">
            <button class="agent-btn-take" style="background: #2563EB;">Enviar Proposta PDF</button>
            <button class="agent-btn-take" style="background: #10B981;">Aprovar Orçamento</button>
          </div>
        </div>
      `,
    },
    {
      title: "Dashboard de Métricas & ROI",
      render: () => `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div style="background: #131A26; padding: 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="font-size: 11px; color: #94A3B8; text-transform: uppercase;">Atendimentos Hoje</div>
            <div style="font-size: 26px; font-weight: 800; color: #fff;">184</div>
            <div style="font-size: 12px; color: #34D399;">87% finalizados 100% pela IA</div>
          </div>
          <div style="background: #131A26; padding: 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
            <div style="font-size: 11px; color: #94A3B8; text-transform: uppercase;">Tempo Médio de Resposta</div>
            <div style="font-size: 26px; font-weight: 800; color: #A78BFA;">2.8s</div>
            <div style="font-size: 12px; color: #94A3B8;">Antes da FCB: 34 minutos</div>
          </div>
        </div>
        <div style="background: #131A26; padding: 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="font-size: 12.5px; font-weight: 700; color: #fff; margin-bottom: 6px;">Receita em Pipeline Automatizado</div>
          <div style="font-size: 20px; font-weight: 800; color: #38BDF8;">R$ 42.850,00</div>
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

    // Render messages
    chatBody.innerHTML = "";
    data.messages.forEach((msg, i) => {
      const bubble = document.createElement("div");
      bubble.className = `msg-bubble msg-${msg.type}`;

      let contentHtml = "";
      if (msg.text) {
        contentHtml += `<div>${msg.text}</div>`;
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
    });

    // Auto scroll chat to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
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
