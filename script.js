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
  const totalQuestions = 18; // 9 por site (4 usab + 1 ef + 4 func)
  let currentStep = 1;

  // Função para gerar PDF
  function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Formulário de Avaliação de Interfaces', 20, 20);
    doc.setFontSize(12);
    doc.text('Atividade da Matéria Engenharia de Software', 20, 30);
    doc.text('Professora: Isabela Meneses', 20, 40);
    doc.text('Participantes: Aloisio Bomfim / Alisson Januairio / Lucielio de Jesus', 20, 50);

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
    doc.setFontSize(12);

    // Usabilidade
    doc.text('Usabilidade:', 20, y);
    y += 10;
    const usabA = ['É fácil de aprender a usar?', 'É eficiente de usar?', 'É fácil de lembrar como usar?', 'É satisfatório de usar?'];
    usabA.forEach((q, i) => {
      const key = `siteA_usabilidade${i+1}`;
      const val = data[key] || 'Não respondido';
      doc.text(`${q}: ${val}`, 30, y);
      y += 10;
    });

    // Eficiência
    doc.text('Eficiência:', 20, y);
    y += 10;
    const efA = data['siteA_eficiencia1'] || 'Não respondido';
    doc.text(`É eficiente? ${efA}`, 30, y);
    y += 10;

    // Funcionalidade
    doc.text('Funcionalidade:', 20, y);
    y += 10;
    const funcA = ['Possui todas as funcionalidades necessárias?', 'As funcionalidades são acessíveis?', 'As funcionalidades são compreensíveis?', 'As funcionalidades são confiáveis?'];
    funcA.forEach((q, i) => {
      const key = `siteA_funcionalidade${i+1}`;
      const val = data[key] || 'Não respondido';
      doc.text(`${q}: ${val}`, 30, y);
      y += 10;
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
    doc.setFontSize(12);

    // Usabilidade
    doc.text('Usabilidade:', 20, y);
    y += 10;
    const usabB = ['É fácil de aprender a usar?', 'É eficiente de usar?', 'É fácil de lembrar como usar?', 'É satisfatório de usar?'];
    usabB.forEach((q, i) => {
      const key = `siteB_usabilidade${i+1}`;
      const val = data[key] || 'Não respondido';
      doc.text(`${q}: ${val}`, 30, y);
      y += 10;
    });

    // Eficiência
    doc.text('Eficiência:', 20, y);
    y += 10;
    const efB = data['siteB_eficiencia1'] || 'Não respondido';
    doc.text(`É eficiente? ${efB}`, 30, y);
    y += 10;

    // Funcionalidade
    doc.text('Funcionalidade:', 20, y);
    y += 10;
    const funcB = ['Possui todas as funcionalidades necessárias?', 'As funcionalidades são acessíveis?', 'As funcionalidades são compreensíveis?', 'As funcionalidades são confiáveis?'];
    funcB.forEach((q, i) => {
      const key = `siteB_funcionalidade${i+1}`;
      const val = data[key] || 'Não respondido';
      doc.text(`${q}: ${val}`, 30, y);
      y += 10;
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