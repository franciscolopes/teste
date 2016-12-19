function iniciarJogo() {
    location.href = "jogo.html";
}


var g_cronometro;
var g_imgLateral = "";
function mudarCor(id, cor) {
    document.getElementById(id).style.backgroundColor = cor;
}
function inserirMarcacao(idtxt) {
    document.getElementById(idtxt).innerHTML = g_marcacao;
    (g_marcacao === 'X') ? g_marcacao = '0' : g_marcacao = 'X';
}

function novoJogo() {
    pararCronometro();
    ligaCronometro();
    document.getElementById("imgLateral").style.opacity = 0;
    setTimeout(mostraImagemLateral, 20000);
    setTimeout(mostraImagemPequena, 10000);
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

/*chama fantasma pequeno*/
function dado() {
    return parseInt(Math.random() * (800 - 0) + 0 + 0.5);
}

function mostraImagemPequena() {
    document.getElementById("id_caixaFP").style.left = dado() + "px";
    document.getElementById("id_caixaFP").style.right = dado() + "px";
    document.getElementById("id_caixaFP").style.top = dado() + "px";
    document.getElementById("imgPequena").style.opacity = 1;
    setTimeout(apagaImgPequena, 4000);
}


function apagaImgPequena() {
    document.getElementById("imgPequena").style.opacity = 0;
    setTimeout(mostraImagemPequena, 10000);
}

/*chama fantasma pequeno*/


/*---------------------------MOSTRA CARTAS/JOGADA---------------------------*/
var g_sorteado;
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
            document.getElementById("carta_" + (posicaoImg01 + 1)).style.backgroundImage = "url('imagens/carta_0.png')";
            document.getElementById("carta_" + (posicaoImg02 + 1)).style.backgroundImage = "url('imagens/carta_0.png')";
            g_estadoImagem1 = null;
            g_estadoImagem2 = null;
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

function validaPares() {

}
var vetCartasEmbaralhadas = new Array();
function embaralharCartas() {
    var vetCartasNaoEmbaralhadas = new Array();
    for (i = 0; i < 10; i++) {
        vetCartasNaoEmbaralhadas[i] = i + 1;
        vetCartasNaoEmbaralhadas[i + 10] = i + 1;
    }

    for (i = 0; i < 20; i++) {
        var aux = dado(0, vetCartasNaoEmbaralhadas.length - 1);
        vetCartasEmbaralhadas[i] = vetCartasNaoEmbaralhadas[aux];
        vetCartasNaoEmbaralhadas.splice(aux, 1);
    }
}
//delete vetor[i];
/*---------------------------MOSTRA CARTAS/JOGADA---------------------------*/
/*---------------------------Executa audios de sucesso e erro---------------------------*/


var success = new Audio('audio/success.mp3');

var fail = new Audio('audio/fail.wav');

function playSuccess() {
    success.play();
}

function playFail() {
    fail.play();
}
/*---------------------------Executa audios de sucesso e erro---------------------------*/