
let historico = [];
let ultimoResultado = null;

function obterNumeros() {
    const valor1 = document.getElementById("numero1").value;
    const valor2 = document.getElementById("numero2").value;

    if (valor1.trim() === "" || valor2.trim() === "") {
        mostrarResultado("Preencha os dois campos!");
        return null;
    }

    const numero1 = Number(valor1);
    const numero2 = Number(valor2);

    if (!Number.isFinite(numero1) || !Number.isFinite(numero2)) {
        mostrarResultado("Digite números válidos!");
        return null;
    }

    return { numero1, numero2 };
}

function mostrarResultado(mensagem) {
    document.getElementById("resultado").textContent = mensagem;
}

function formatarNumero(numero) {
    return Number(numero.toFixed(10)).toString();
}

function calcular(operacao, simbolo, funcao) {
    const numeros = obterNumeros();

    if (!numeros) return;

    const { numero1, numero2 } = numeros;

    if (operacao === "Divisão" && numero2 === 0) {
        mostrarResultado("Não é possível dividir por zero!");
        return;
    }

    const resultado = funcao(numero1, numero2);

    if (!Number.isFinite(resultado)) {
        mostrarResultado("Resultado inválido!");
        return;
    }

    const resultadoFormatado = formatarNumero(resultado);

    mostrarResultado(resultadoFormatado);

    adicionarHistorico(
        `${formatarNumero(numero1)} ${simbolo} ${formatarNumero(numero2)} = ${resultadoFormatado}`
    );

    ultimoResultado = resultadoFormatado;
}

function somar() {
    calcular("Adição", "+", (a, b) => a + b);
}

function subtrair() {
    calcular("Subtração", "−", (a, b) => a - b);
}

function multiplicar() {
    calcular("Multiplicação", "×", (a, b) => a * b);
}

function dividir() {
    calcular("Divisão", "÷", (a, b) => a / b);
}

function porcentagem() {
    const numeros = obterNumeros();

    if (!numeros) return;

    const { numero1, numero2 } = numeros;
    const resultado = (numero1 * numero2) / 100;

    const resultadoFormatado = formatarNumero(resultado);

    mostrarResultado(resultadoFormatado);

    adicionarHistorico(
        `${formatarNumero(numero1)}% de ${formatarNumero(numero2)} = ${resultadoFormatado}`
    );

    ultimoResultado = resultadoFormatado;
}

function adicionarHistorico(conta) {
    historico.unshift(conta);

    if (historico.length > 10) {
        historico.pop();
    }

    atualizarHistorico();
}

function atualizarHistorico() {
    const lista = document.getElementById("listaHistorico");

    lista.innerHTML = "";

    if (historico.length === 0) {
        lista.innerHTML = "<li>Nenhum cálculo realizado.</li>";
        return;
    }

    historico.forEach(conta => {
        const item = document.createElement("li");
        item.textContent = conta;
        lista.appendChild(item);
    });
}

function apagarUltimo() {
    if (ultimoResultado === null) {
        mostrarResultado("Nenhum resultado para apagar.");
        return;
    }

    ultimoResultado = null;
    mostrarResultado("Resultado apagado.");
}

function limpar() {
    document.getElementById("numero1").value = "";
    document.getElementById("numero2").value = "";

    ultimoResultado = null;
    mostrarResultado("Aguardando cálculo...");
}

function limparHistorico() {
    historico = [];
    atualizarHistorico();
}
