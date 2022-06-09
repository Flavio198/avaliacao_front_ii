"use strict";
let btnAcessar = document.getElementById('btn-acessar');
let btnCadastrar = document.getElementById('btn-cadastrar');
let container = document.getElementById('container');
btnAcessar.addEventListener('click', () => {
    container.classList.remove('painel-direita-ativo');
});
btnCadastrar.addEventListener('click', () => {
    container.classList.add('painel-direita-ativo');
});
//CAD USUARIO
let formularioCadastro = document.querySelector('#formulario-cadastro');
let inputCadastroNome = document.querySelector('#input-cadastro-nome');
let inputCadastroEmail = document.querySelector('#input-cadastro-email');
let inputCadastroSenha = document.querySelector('#input-cadastro-senha');
formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault();
    verificaCamposCadastro();
});
function verificaCamposCadastro() {
    if (inputCadastroNome.value === '' || inputCadastroNome.value.length < 3) {
        inputCadastroNome.focus();
        inputCadastroNome.value = '';
        inputCadastroNome.setAttribute('style', 'outline-color: red');
        return;
    }
    if (inputCadastroEmail.value === '' || inputCadastroEmail.value.length < 8) {
        inputCadastroEmail.focus();
        inputCadastroEmail.value = '';
        inputCadastroEmail.setAttribute('style', 'outline-color: red');
        return;
    }
    if (inputCadastroSenha.value === '' || inputCadastroSenha.value.length < 6) {
        inputCadastroSenha.focus();
        inputCadastroSenha.value = '';
        inputCadastroSenha.setAttribute('style', 'outline-color: red');
        return;
    }
    inputCadastroNome.removeAttribute('style');
    inputCadastroEmail.removeAttribute('style');
    inputCadastroSenha.removeAttribute('style');
    let novoUsuario = {
        nome: inputCadastroNome.value,
        login: inputCadastroEmail.value,
        senha: inputCadastroSenha.value,
        tarefas: []
    };
    cadastrarUsuario(novoUsuario);
}
function cadastrarUsuario(novoUsuario) {
    let listaUsuarios = buscarUsuariosNoStorage();
    let exist = listaUsuarios.some((usuario) => {
        return usuario.login === novoUsuario.login;
    });
    if (exist) {
        let confirma = confirm("Este e-mail já está sendo utilizado. Deseja ir para a página de login?");
        if (confirma) {
            container.classList.remove('painel-direita-ativo');
        }
        return;
    }
    listaUsuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    alert('Contra criada com sucesso!');
    formularioCadastro.reset();
    setTimeout(() => {
        container.classList.remove('painel-direita-ativo');
    }, 1000);
}
function buscarUsuariosNoStorage() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
//Login usuario na aplicação
let formularioLogin = document.querySelector('#formulario-login');
let inputLoginEmail = document.querySelector('#input-login-email');
let inputLoginSenha = document.querySelector('#input-login-senha');
formularioLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();
    validarCamposLogin();
});
function validarCamposLogin() {
    if (inputLoginEmail.value === '') {
        inputLoginEmail.focus();
        inputLoginEmail.setAttribute('style', 'outline-color: red');
        return;
    }
    if (inputLoginSenha.value === '') {
        inputLoginSenha.focus();
        inputLoginSenha.setAttribute('style', 'outline-color: red');
        return;
    }
    inputLoginEmail.removeAttribute('style');
    inputLoginSenha.removeAttribute('style');
    let usuarioLogando = {
        login: inputLoginEmail.value,
        senha: inputLoginSenha.value
    };
    logarNoSistema(usuarioLogando);
}
function logarNoSistema(usuarioLogando) {
    let listaUsuarios = buscarUsuariosNoStorage();
    let existe = listaUsuarios.some((usuario) => {
        return usuario.login === usuarioLogando.login && usuario.senha === usuarioLogando.senha;
    });
    if (!existe) {
        alert("E-mail ou senha incorretos!");
        return;
    }
    sessionStorage.setItem('usuarioLogado', inputLoginEmail.value);
    //FALTA REFATORAR O ALERT
    alert(`Olá ${usuarioLogando}! Organize suas tarefas e aproveite bem o seu dia ;)`);
    window.location.href = 'home.html';
}
