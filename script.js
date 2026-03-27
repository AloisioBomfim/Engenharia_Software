// script.js - JavaScript para interatividade do formulário

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('evaluation-form');
  const progressBar = document.querySelector('.progress-bar');
  const progressText = document.getElementById('progress-text');
  const sections = document.querySelectorAll('.site-section');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnSubmit = document.getElementById('btn-submit');
  const stepIndicator = document.getElementById('current-step');
  const totalQuestions = 36; // 18 por site (9 radios + 9 textareas)
  let currentStep = 1;

  // Função para gerar PDF
  function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Mapeamento dos valores para textos
    const ratingMap = {
      '1': 'Muito Ruim',
      '2': 'Ruim',
      '3': 'Médio',
      '4': 'Bom',
      '5': 'Excelente'
    };

    doc.setFontSize(16);
    doc.text('Formulário de Avaliação de Interfaces', 105, 20, {align: 'center'});
    doc.setFontSize(12);
    doc.text('Atividade da Matéria Engenharia de Software', 105, 30, {align: 'center'});
    doc.text('Professora: Isabela Meneses', 105, 40, {align: 'center'});
    doc.text('Participantes: Aloisio Bomfim / Alisson Januairio / Lucielio de Jesus / Vinicius Vilarino', 105, 50, {align: 'center'});

    let y = 70;

    // Coletar dados do formulário
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Site A - Atacadão
    doc.setFontSize(14);
    doc.text('Avaliação Site Atacadão', 20, y);
    y += 10;
    doc.text('Link: https://www.atacadao.com.br/', 20, y);
    y += 10;
    doc.setFontSize(12);

    // Usabilidade
    doc.text('Usabilidade:', 20, y);
    y += 10;
    const usabA = ['É fácil de aprender a usar?', 'A padronização dos elementos de tela e a navegação são intuitivas?', 'As mensagens instruem o usuário adequadamente?', 'Há muitos passos para concluir uma ação?'];
    usabA.forEach((q, i) => {
      const key = `siteA_usabilidade${i+1}`;
      const val = data[key] || 'Não respondido';
      const displayVal = ratingMap[val] || val;
      doc.text(`${q}: ${displayVal}`, 30, y);
      y += 10;
      const obsKey = `${key}_obs`;
      const obs = data[obsKey];
      if (obs && obs.trim()) {
        doc.text(`Observação: ${obs}`, 40, y);
        y += 10;
      }
    });

    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Eficiência
    doc.text('Eficiência:', 20, y);
    y += 10;
    const efA = data['siteA_eficiencia1'] || 'Não respondido';
    const displayEfA = ratingMap[efA] || efA;
    doc.text(`O tempo de resposta é razoável? ${displayEfA}`, 30, y);
    y += 10;
    const obsEfA = data['siteA_eficiencia1_obs'];
    if (obsEfA && obsEfA.trim()) {
      doc.text(`Observação: ${obsEfA}`, 40, y);
      y += 10;
    }

    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Funcionalidade
    doc.text('Funcionalidade:', 20, y);
    y += 10;
    const funcA = ['Funciona bem em diferentes aparelhos (PC, celular, tablet)?', 'Apresentou falha durante o uso?', 'Há funcionalidades que você sentiu falta?', 'O que você considera que pode confundir o usuário?'];
    funcA.forEach((q, i) => {
      const key = `siteA_funcionalidade${i+1}`;
      const val = data[key] || 'Não respondido';
      const displayVal = ratingMap[val] || val;
      doc.text(`${q}: ${displayVal}`, 30, y);
      y += 10;
      const obsKey = `${key}_obs`;
      const obs = data[obsKey];
      if (obs && obs.trim()) {
        doc.text(`Observação: ${obs}`, 40, y);
        y += 10;
      }
    });

    // Adicionar nova página se necessário
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Site B - Assai Atacadista
    doc.setFontSize(14);
    doc.text('Avaliação Site Assai Atacadista', 20, y);
    y += 10;
    doc.text('Link: https://www.assai.com.br/', 20, y);
    y += 10;
    doc.setFontSize(12);

    // Usabilidade
    doc.text('Usabilidade:', 20, y);
    y += 10;
    const usabB = ['É fácil de aprender a usar?', 'A padronização dos elementos de tela e a navegação são intuitivas?', 'As mensagens instruem o usuário adequadamente?', 'Há muitos passos para concluir uma ação?'];
    usabB.forEach((q, i) => {
      const key = `siteB_usabilidade${i+1}`;
      const val = data[key] || 'Não respondido';
      const displayVal = ratingMap[val] || val;
      doc.text(`${q}: ${displayVal}`, 30, y);
      y += 10;
      const obsKey = `${key}_obs`;
      const obs = data[obsKey];
      if (obs && obs.trim()) {
        doc.text(`Observação: ${obs}`, 40, y);
        y += 10;
      }
    });

    // Eficiência
    doc.text('Eficiência:', 20, y);
    y += 10;
    const efB = data['siteB_eficiencia1'] || 'Não respondido';
    const displayEfB = ratingMap[efB] || efB;
    doc.text(`O tempo de resposta é razoável? ${displayEfB}`, 30, y);
    y += 10;
    const obsEfB = data['siteB_eficiencia1_obs'];
    if (obsEfB && obsEfB.trim()) {
      doc.text(`Observação: ${obsEfB}`, 40, y);
      y += 10;
    }

    // Funcionalidade
    doc.text('Funcionalidade:', 20, y);
    y += 10;
    const funcB = ['Funciona bem em diferentes aparelhos (PC, celular, tablet)?', 'Apresentou falha durante o uso?', 'Há funcionalidades que você sentiu falta?', 'O que você considera que pode confundir o usuário?'];
    funcB.forEach((q, i) => {
      const key = `siteB_funcionalidade${i+1}`;
      const val = data[key] || 'Não respondido';
      const displayVal = ratingMap[val] || val;
      doc.text(`${q}: ${displayVal}`, 30, y);
      y += 10;
      const obsKey = `${key}_obs`;
      const obs = data[obsKey];
      if (obs && obs.trim()) {
        doc.text(`Observação: ${obs}`, 40, y);
        y += 10;
      }
    });

    // Salvar o PDF
    doc.save('avaliacao_interfaces.pdf');
  }

  // Função para atualizar progresso
  function updateProgress() {
    const radios = form.querySelectorAll('input[type="radio"]:checked');
    const textareas = form.querySelectorAll('textarea');
    let filledTextareas = 0;
    textareas.forEach(ta => {
      if (ta.value.trim() !== '') filledTextareas++;
    });
    const totalFilled = radios.length + filledTextareas;
    const percentage = Math.min((totalFilled / totalQuestions) * 100, 100);
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    progressText.textContent = `Pergunta ${totalFilled} de ${totalQuestions} respondida`;
  }

  // Função para trocar de step
  function goToStep(step) {
    if (step < 1 || step > 2) return;
    
    sections.forEach((section, index) => {
      if (index + 1 === step) {
        section.classList.remove('hidden');
        section.classList.add('active');
      } else {
        section.classList.add('hidden');
        section.classList.remove('active');
      }
    });
    
    currentStep = step;
    stepIndicator.textContent = step;
    btnPrev.disabled = currentStep === 1;
    btnNext.style.display = currentStep === 2 ? 'none' : 'block';
    btnSubmit.style.display = currentStep === 2 ? 'block' : 'none';
  }

  // Event listeners para navegação
  if (btnNext) {
    btnNext.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentStep < 2) goToStep(currentStep + 1);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentStep > 1) goToStep(currentStep - 1);
    });
  }

  // Adicionar event listeners para atualizar progresso
  form.addEventListener('change', updateProgress);
  form.addEventListener('input', updateProgress);

  // Validação no submit
  form.addEventListener('submit', function(e) {
    const radios = form.querySelectorAll('input[type="radio"]');
    const groups = {};
    radios.forEach(radio => {
      if (!groups[radio.name]) groups[radio.name] = [];
      groups[radio.name].push(radio);
    });

    let allValid = true;
    for (const group in groups) {
      const checked = groups[group].some(radio => radio.checked);
      if (!checked) {
        allValid = false;
        // Destacar grupo não preenchido
        groups[group][0].closest('.question').style.borderLeftColor = '#dc3545';
      } else {
        groups[group][0].closest('.question').style.borderLeftColor = '#007bff';
      }
    }

    if (!allValid) {
      e.preventDefault();
      alert('Por favor, responda todas as perguntas obrigatórias antes de enviar.');
    } else {
      e.preventDefault(); // Prevenir submit padrão
      generatePDF();
      alert('Avaliação enviada com sucesso! O PDF foi gerado e baixado.');
    }
  });

  // Responsividade ao redimensionar janela
  window.addEventListener('resize', function() {
    // Recarregar se necessário, mas por enquanto não
  });

  // Inicializar
  updateProgress();
  goToStep(1); // Garantir que comece no step 1
});