  const card = document.getElementById('card');
  const btnRegistrar = document.getElementById('btn-registrar');
  const btnLogin = document.getElementById('btn-iniciar');

  btnRegistrar.addEventListener('click', () => {
    card.classList.add('flipped');
  });

  btnLogin.addEventListener('click', () => {
    card.classList.remove('flipped');
  });