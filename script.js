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
  const isMobile = window.innerWidth <= 768;

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

  // Função para mostrar/ocultar navegação mobile
  function updateMobileNavigation() {
    if (!isMobile) return;
    
    btnPrev.disabled = currentStep === 1;
    btnNext.style.display = currentStep === 2 ? 'none' : 'block';
    btnSubmit.style.display = currentStep === 2 ? 'block' : 'none';
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
    updateMobileNavigation();
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
      alert('Avaliação enviada com sucesso!');
    }
  });

  // Responsividade ao redimensionar janela
  window.addEventListener('resize', function() {
    const nowMobile = window.innerWidth <= 768;
    if (isMobile !== nowMobile) {
      location.reload();
    }
  });

  // Inicializar
  updateProgress();
  if (isMobile) {
    updateMobileNavigation();
  } else {
    // Em desktop, esconde os controles mobile
    const navMobile = document.querySelector('.navigation-mobile');
    if (navMobile) navMobile.style.display = 'none';
  }
});