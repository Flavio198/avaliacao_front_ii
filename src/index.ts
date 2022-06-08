let btnAcessar = document.getElementById('btn-acessar') as HTMLButtonElement;
let btnCadastrar = document.getElementById('btn-cadastrar') as HTMLButtonElement;
let container = document.getElementById('container') as HTMLDivElement;

btnAcessar.addEventListener('click', () => {
    container.classList.remove('painel-direita-ativo');
})

btnCadastrar.addEventListener('click', () => {
    container.classList.add('painel-direita-ativo');
})