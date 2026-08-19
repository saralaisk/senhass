const senha = document.getElementById("senha");

const quantidade = document.getElementById("quantidade");

const diminuir = document.getElementById("diminuir");
const aumentar = document.getElementById("aumentar");

const gerar = document.getElementById("gerar");
const copiar = document.getElementById("copiar");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const forca = document.getElementById("forca");
const textoForca = document.getElementById("texto-forca");


// QUANTIDADE INICIAL

let tamanhoSenha = 12;


// CONJUNTOS DE CARACTERES

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";

const numerosDisponiveis = "0123456789";

const simbolosDisponiveis = "!@#$%&*?+-_=<>";


// DIMINUIR QUANTIDADE

diminuir.addEventListener("click", () => {

    if (tamanhoSenha > 4) {

        tamanhoSenha--;

        atualizarQuantidade();

        gerarSenha();
    }

});


// AUMENTAR QUANTIDADE

aumentar.addEventListener("click", () => {

    if (tamanhoSenha < 30) {

        tamanhoSenha++;

        atualizarQuantidade();

        gerarSenha();
    }

});


// ATUALIZA O TEXTO DA QUANTIDADE

function atualizarQuantidade() {

    quantidade.textContent = tamanhoSenha;

}


// GERA UM CARACTERE ALEATÓRIO

function caractereAleatorio(conjunto) {

    const indice = Math.floor(
        Math.random() * conjunto.length
    );

    return conjunto[indice];
}


// GERA A SENHA

function gerarSenha() {

    let caracteres = "";

    let senhaGerada = "";


    // Verifica quais características foram selecionadas

    if (maiusculas.checked) {
        caracteres += letrasMaiusculas;
    }

    if (minusculas.checked) {
        caracteres += letrasMinusculas;
    }

    if (numeros.checked) {
        caracteres += numerosDisponiveis;
    }

    if (simbolos.checked) {
        caracteres += simbolosDisponiveis;
    }


    // Caso nenhuma opção esteja selecionada

    if (caracteres.length === 0) {

        senha.value = "";

        atualizarForca(0);

        return;
    }


    // Garante pelo menos um caractere de cada categoria selecionada

    const obrigatorios = [];

    if (maiusculas.checked) {
        obrigatorios.push(
            caractereAleatorio(letrasMaiusculas)
        );
    }

    if (minusculas.checked) {
        obrigatorios.push(
            caractereAleatorio(letrasMinusculas)
        );
    }

    if (numeros.checked) {
        obrigatorios.push(
            caractereAleatorio(numerosDisponiveis)
        );
    }

    if (simbolos.checked) {
        obrigatorios.push(
            caractereAleatorio(simbolosDisponiveis)
        );
    }


    senhaGerada = obrigatorios.join("");


    // Completa a senha até atingir o tamanho escolhido

    while (senhaGerada.length < tamanhoSenha) {

        senhaGerada += caractereAleatorio(caracteres);

    }


    // Embaralha a senha

    senhaGerada = senhaGerada
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");


    senha.value = senhaGerada;


    // Calcula a força

    calcularForca();
}


// CALCULA A FORÇA DA SENHA

function calcularForca() {

    let pontos = 0;


    // Pontos pelo tamanho

    if (tamanhoSenha >= 8) {
        pontos += 2;
    }

    if (tamanhoSenha >= 12) {
        pontos += 2;
    }

    if (tamanhoSenha >= 16) {
        pontos += 2;
    }


    // Pontos pelas características

    if (maiusculas.checked) {
        pontos += 1;
    }

    if (minusculas.checked) {
        pontos += 1;
    }

    if (numeros.checked) {
        pontos += 2;
    }

    if (simbolos.checked) {
        pontos += 2;
    }


    atualizarForca(pontos);
}


// ATUALIZA A BARRA DE FORÇA

function atualizarForca(pontos) {

    let porcentagem = 0;
    let cor = "#f52f50";
    let texto = "Fraca";


    if (pontos <= 3) {

        porcentagem = 25;
        cor = "#f52f50";
        texto = "Fraca";

    } else if (pontos <= 6) {

        porcentagem = 55;
        cor = "#ffd400";
        texto = "Média";

    } else {

        porcentagem = 100;
        cor = "#21d17c";
        texto = "Forte";

    }


    forca.style.width = porcentagem + "%";

    forca.style.backgroundColor = cor;

    textoForca.textContent = texto;

    textoForca.style.color = cor;
}


// COPIAR SENHA

copiar.addEventListener("click", async () => {

    if (senha.value === "") {
        return;
    }

    try {

        await navigator.clipboard.writeText(senha.value);

        copiar.textContent = "Copiado!";

        setTimeout(() => {
            copiar.textContent = "Copiar";
        }, 1500);

    } catch (erro) {

        senha.select();

        document.execCommand("copy");

        copiar.textContent = "Copiado!";

        setTimeout(() => {
            copiar.textContent = "Copiar";
        }, 1500);
    }

});


// BOTÃO GERAR

gerar.addEventListener("click", gerarSenha);


// ALTERAÇÃO NAS OPÇÕES

maiusculas.addEventListener("change", gerarSenha);

minusculas.addEventListener("change", gerarSenha);

numeros.addEventListener("change", gerarSenha);

simbolos.addEventListener("change", gerarSenha);


// GERA UMA SENHA QUANDO A PÁGINA É ABERTA

atualizarQuantidade();

gerarSenha();
