function iniciarJogo() {
    location.href = "jogo.html";
}


var g_cronometro;
var g_imgLateral = "";


function novoJogo() {
    pararCronometro();
    ligaCronometro();
    document.getElementById("imgLateral").style.opacity = 0;
    setTimeout(mostraImagemLateral, 20000);
    embaralharCartas();
}

function incio() {
    location.href = "index.html";
}

/*  ---------------------------------CRONOMETRO --------------------------------- */
var inicioCont = 0; //incializa e atribui 0 para variável 
var ultimoCont = 0;//incializa e atribui 0 para variável 
var diferenca = 0;//incializa e atribui 0 para variável 
var statusCronometro = 0;
function cronometro() {
    ultimoCont = new Date();//instanciacao de objeto data, com data e horário atual. Using new Date(), creates a new date object with the current date and time:
    diferenca = ultimoCont - inicioCont;//atribui para var diferenca  a diferença entre a data atual e a data que o cronometro foi iniciado, a diferena vai gerar uma data com mintuos e segundos zerados Wed Dec 31 1969 21:00:00 GMT-0300 (BRT)
    diferenca = new Date(diferenca);//cria objeto com a data de diferenca Using new Date(date string), creates a new date object from the specified date and time:
    var sec = diferenca.getSeconds(); //pega segundos 
    var min = diferenca.getMinutes(); //pega minutos
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    var crono = min + ":" + sec;
    document.getElementById("cronometro").innerHTML = crono;
    setTimeout("cronometro()", 10);//chama a função a a cada ??? segundos
}
//função para registrar o tempo máximo atingido pelo cronometro até a finalzação da partida, nesse momento, a 
//deve ser usado sessao não localstorage
function pararCronometro() {
    statusCronometro = 0;
    var atual = new Date();
    var final = atual - inicioCont;
    var tempoFinal = new Date(final);

    var sec = tempoFinal.getSeconds(); //pega segundos 
    var min = tempoFinal.getMinutes(); //pega minutos
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    var logTempo = min + ":" + sec;
    /* armazenamento local= criar função para parar o cronometro e então sim armazenar o tempo*/
    localStorage.tempo = logTempo;
    // Retrieve
    document.getElementById("p2_tempo").innerHTML = localStorage.tempo;
    //localStorage.removeItem("tempo");

    /*armazenamento local*/
}

function ligaCronometro() {
    statusCronometro = 1;
    inicioCont = new Date();// cria data com horario em que o cronometro foi ligado
    cronometro();
}

/* ---------------------------------FIM CRONOMETRO  ---------------------------------*/

/*chama fantasma grande*/
function mostraImagemLateral() {

    document.getElementById("imgLateral").style.opacity = 1;
    setTimeout(apagaImg, 8000);
}


function apagaImg() {
    document.getElementById("imgLateral").style.opacity = 0;
    setTimeout(mostraImagemLateral, 20000);
}


/*chama fantasma grande*/


/*back
 
 var g_estadoImagem1;
 var g_estadoImagem2;
 function dado(limiteInf, limiteSup) {
 return parseInt(Math.random() * (limiteSup - limiteInf) + limiteInf + 0.5);
 }
 function trocarCarta(posicao) {
 document.getElementById("carta_" + (posicao + 1)).style.backgroundImage = "url('imagens/carta_" + vetCartasEmbaralhadas[posicao] + ".png')";
 
 if (g_estadoImagem1 == null) {
 posicaoImg01 = posicao;
 g_estadoImagem1 = vetCartasEmbaralhadas[posicao];
 } else {
 posicaoImg02 = posicao;
 g_estadoImagem2 = vetCartasEmbaralhadas[posicao];
 }
 if (g_estadoImagem1 != null && g_estadoImagem2 != null) {
 if (g_estadoImagem1 != g_estadoImagem2) {
 setTimeout(mostraImagemOriginal, 1000);
 playFail();
 
 } else {
 document.getElementById("carta_" + (posicaoImg01 + 1)).style.backgroundImage = "url('imagens/carta_" + g_estadoImagem1 + ".png')";
 document.getElementById("carta_" + (posicaoImg02 + 1)).style.backgroundImage = "url('imagens/carta_" + g_estadoImagem2 + ".png')";
 g_estadoImagem1 = null;
 g_estadoImagem2 = null;
 playSuccess();
 
 }
 }
 }
 
 back*/



/*---------------------------MOSTRA CARTAS/JOGADA---------------------------*/

/*alterado*/
var g_estadoImagem1 = "carta_0";
var g_estadoImagem2 = "carta_0";

var posicaoImg01 = 0;
var posicaoImg02 = 0;
function dado(limiteInf, limiteSup) {
    return parseInt(Math.random() * (limiteSup - limiteInf) + limiteInf + 0.5);
}
function trocarCarta(posicao) {
    document.getElementById("carta_" + (posicao + 1)).style.backgroundImage = "url('imagens/carta_" + vetCartasEmbaralhadas[posicao] + ".png')";

    if (g_estadoImagem1 === "carta_0" /*&& posicaoImg01 === 0*/) {//primeiro clique (carta), ou seja, g_estadoImagem1 é o estado inicial
        posicaoImg01 = posicao;
        g_estadoImagem1 = vetCartasEmbaralhadas[posicao];

    } else if (g_estadoImagem1 !== g_estadoImagem2) {//segundo clique (carta), ou seja, g_estadoImagem1 é o estado da posicao, então a nova posicao é armazenada em posicaoImg02
        posicaoImg02 = posicao;
        g_estadoImagem2 = vetCartasEmbaralhadas[posicao];
    }
    if (g_estadoImagem1 !== "carta_0" && g_estadoImagem2 !== "carta_0") {
        if (g_estadoImagem1 !== g_estadoImagem2) {
            setTimeout(mostraImagemOriginal, 700);
            playFail();

        } else {
            document.getElementById("carta_" + (posicaoImg01 + 1)).style.backgroundImage = "url('imagens/carta_" + g_estadoImagem1 + ".png')";
            document.getElementById("carta_" + (posicaoImg02 + 1)).style.backgroundImage = "url('imagens/carta_" + g_estadoImagem2 + ".png')";
            g_estadoImagem1 = "carta_0";
            g_estadoImagem2 = "carta_0";

            playSuccess();
           contaAcertos();

        }
    }
}
/*alterado*/
function mostraImagemOriginal() {
    document.getElementById("carta_" + (posicaoImg01 + 1)).style.backgroundImage = "url('imagens/carta_0.png')";
    document.getElementById("carta_" + (posicaoImg02 + 1)).style.backgroundImage = "url('imagens/carta_0.png')";
    g_estadoImagem1 = "carta_0";
    g_estadoImagem2 = "carta_0";
}
var acertos = 0;
var nome;
function contaAcertos() {
    if (acertos < 1) {
        acertos = acertos + 1;
    } else {
        setTimeout(finalizaJogo, 1000);
    }

}

function finalizaJogo() {
    var nomeUsuario = prompt("Parabéns, você conclui o jogo! Qual o seu nome?");
    sessionStorage.setItem('userName', nomeUsuario);
    nome = sessionStorage.getItem('userName');
    alert(nome);
    iniciarJogo();

}

/*function contaAcertos(){
 acertos.splice(0, 1);
 if(acertos.length <= 0){
 nomeUsuario = prompt("Qual o seu nome?");
 alert(nomeUsuario);
 }
 }*/



var vetCartasEmbaralhadas = new Array();//vetor com numeros de 0 a 19
function embaralharCartas() {
    var vetCartasNaoEmbaralhadas = new Array();
    for (i = 0; i < 10; i++) { //popula o vetor com nros de 1 a 20
        vetCartasNaoEmbaralhadas[i] = i + 1; //vetor com numeros de 1 a 20
        vetCartasNaoEmbaralhadas[i + 10] = i + 1;
    }

    for (i = 0; i < 20; i++) {
        var aux = dado(0, vetCartasNaoEmbaralhadas.length - 1);//gera uma nro aleatório entre 0 e o tamanho do vetor menos 1
        vetCartasEmbaralhadas[i] = vetCartasNaoEmbaralhadas[aux];// atribui um nro aleatório ao vetor vetCartasEmbaralhadas na posição i
        vetCartasNaoEmbaralhadas.splice(aux, 1);//Remove um item do vetor vetCartasNaoEmbaralhadas na posição aux
    }
}
//delete vetor[i];
/*---------------------------MOSTRA CARTAS/JOGADA---------------------------*/
/*---------------------------Executa audios de sucesso e erro---------------*/
var success = new Audio('audio/success.wav');

var fail = new Audio('audio/fail.wav');

function playSuccess() {
    success.play();
}
function playFail() {
    fail.play();
}
/*---------------------------Executa audios de sucesso e erro---------------*/