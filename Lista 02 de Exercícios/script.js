// Dados dos exercícios
const exercises = [
    { id: 1, title: "Maioridade", icon: "fa-id-card", desc: "Verifica se é maior ou menor de 18 anos." },
    { id: 2, title: "Mais Velho", icon: "fa-user-group", desc: "Compara idade de duas pessoas." },
    { id: 3, title: "Positivo/Negativo", icon: "fa-plus-minus", desc: "Verifica o sinal de um número." },
    { id: 4, title: "Faixa Etária", icon: "fa-children", desc: "Classifica: Criança, Adolescente, Adulto, Idoso." },
    { id: 5, title: "Maior Número", icon: "fa-greater-than", desc: "Exibe o maior entre dois números." },
    { id: 6, title: "Aprovação (Média)", icon: "fa-scroll", desc: "Média 7 para aprovar." },
    { id: 7, title: "Par ou Ímpar", icon: "fa-divide", desc: "Verifica se número inteiro é par ou ímpar." },
    { id: 8, title: "Bônus Salarial", icon: "fa-money-bill-trend-up", desc: "10% se > 2000, senão 5%." },
    { id: 9, title: "Dias do Mês", icon: "fa-calendar-days", desc: "Exibe dias do mês digitado." },
    { id: 10, title: "Ordenar Números", icon: "fa-arrow-up-1-9", desc: "Ordena 3 números crescentemente." },
    { id: 11, title: "Faltas Escolares", icon: "fa-user-xmark", desc: "Reprova se faltas > 15." },
    { id: 12, title: "Total Produto", icon: "fa-cart-shopping", desc: "Valor total baseado em código e qtd." },
    { id: 13, title: "Aposentadoria", icon: "fa-wheelchair", desc: "Regras de idade por sexo." },
    { id: 14, title: "Classificação IMC", icon: "fa-weight-scale", desc: "Cálculo e tabela completa de IMC." },
    { id: 15, title: "Recuperação", icon: "fa-file-signature", desc: "Aprovado ou Recuperação (Nota 7)." },
    { id: 16, title: "Mercado Maçãs", icon: "fa-apple-whole", desc: "Preço muda se comprar 12 ou mais." },
    { id: 17, title: "Salários Mínimos", icon: "fa-coins", desc: "Quantos S.M. cabem no salário." },
    { id: 18, title: "Turno Escolar", icon: "fa-sun", desc: "Saudação Matutino ou Vespertino." },
    { id: 19, title: "Eleitor", icon: "fa-check-to-slot", desc: "Voto obrigatório, facultativo ou proibido." },
    { id: 20, title: "Status Final", icon: "fa-graduation-cap", desc: "Média aritmética e status." }
];

// Elementos Globais
const menuContainer = document.getElementById('menu-container');
const appContainer = document.getElementById('app-container');

// Inicialização
function init() {
    renderMenu();
    loadExercise(1);
}

// Renderiza Menu Lateral
function renderMenu() {
    menuContainer.innerHTML = exercises.map(ex => `
        <button onclick="loadExercise(${ex.id})" class="menu-btn" id="btn-${ex.id}">
            <i class="fa-solid ${ex.icon}"></i>
            <span>${ex.id}. ${ex.title}</span>
        </button>
    `).join('');
}

// Carrega Interface do Exercício
function loadExercise(id) {
    // Atualiza classe ativa no menu
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${id}`).classList.add('active');

    const ex = exercises.find(e => e.id === id);
    const formHTML = getFormHTML(id);

    appContainer.innerHTML = `
        <header>
            <h2><i class="fa-solid ${ex.icon}"></i> ${ex.title}</h2>
            <p>${ex.desc}</p>
        </header>
        
        <div class="exercise-body">
            ${formHTML}
            
            <button onclick="runLogic(${id})" class="btn-action">
                <i class="fa-solid fa-play"></i> Executar
            </button>

            <div id="result-area" class="result-box"></div>
        </div>
    `;
}

// Gerador de Formulários (HTML Dinâmico)
function getFormHTML(id) {
    const numInput = (id, label) => `<div class="form-group"><label>${label}</label><input type="number" id="${id}" step="any"></div>`;
    const txtInput = (id, label) => `<div class="form-group"><label>${label}</label><input type="text" id="${id}"></div>`;
    
    switch(id) {
        case 1: return numInput('age', 'Digite a idade:');
        case 2: return `
            <div class="form-group"><label>Nome Pessoa 1:</label><input type="text" id="name1"></div>
            <div class="form-group"><label>Idade Pessoa 1:</label><input type="number" id="age1"></div>
            <hr class="form-group">
            <div class="form-group"><label>Nome Pessoa 2:</label><input type="text" id="name2"></div>
            <div class="form-group"><label>Idade Pessoa 2:</label><input type="number" id="age2"></div>`;
        case 3: return numInput('n1', 'Digite um número:');
        case 4: return numInput('age', 'Digite a idade:');
        case 5: return numInput('n1', 'Número 1:') + numInput('n2', 'Número 2:');
        case 6: return numInput('grade1', 'Nota 1:') + numInput('grade2', 'Nota 2:') + numInput('grade3', 'Nota 3:');
        case 7: return numInput('n1', 'Digite um número inteiro:');
        case 8: return numInput('salary', 'Salário Atual (R$):');
        case 9: return `<div class="form-group"><label>Nome do Mês (ex: Janeiro):</label><input type="text" id="monthName"></div>`;
        case 10: return numInput('n1', 'Num 1:') + numInput('n2', 'Num 2:') + numInput('n3', 'Num 3:');
        case 11: return numInput('faults', 'Número de faltas:');
        case 12: return `
            <div class="form-group"><label>Código do Produto (1-5):</label><input type="number" id="code"></div>
            <div class="form-group text-sm text-gray-500">1: Mouse (R$50), 2: Teclado (R$100), 3: Monitor (R$500), 4: PC (R$2000), 5: Cadeira (R$800)</div>
            ${numInput('qty', 'Quantidade:')}`;
        case 13: return `
            ${numInput('age', 'Idade:')}
            <div class="form-group"><label>Sexo:</label>
                <select id="sex"><option value="M">Masculino</option><option value="F">Feminino</option></select>
            </div>`;
        case 14: return numInput('weight', 'Peso (kg):') + numInput('height', 'Altura (m):');
        case 15: return txtInput('name', 'Nome do Aluno:') + numInput('grade', 'Nota Final:');
        case 16: return numInput('apples', 'Quantidade de Maçãs:');
        case 17: return numInput('minWage', 'Valor do Salário Mínimo:') + numInput('salary', 'Salário do Funcionário:');
        case 18: return `
            ${txtInput('name', 'Nome do Aluno:')}
            <div class="form-group"><label>Turno:</label>
                <select id="shift"><option value="M">Matutino (Manhã)</option><option value="V">Vespertino (Tarde)</option></select>
            </div>`;
        case 19: return numInput('age', 'Idade:');
        case 20: return numInput('n1', 'Número 1:') + numInput('n2', 'Número 2:') + numInput('n3', 'Número 3:');
        default: return '<p>Erro ao carregar formulário</p>';
    }
}

// Motor de Execução (Lógica JS)
function runLogic(id) {
    const resDiv = document.getElementById('result-area');
    resDiv.className = 'result-box'; // Reset classes
    
    // Helpers para pegar valores
    const getVal = (id) => parseFloat(document.getElementById(id).value);
    const getStr = (id) => document.getElementById(id).value;
    const setRes = (msg, type = 'success') => {
        resDiv.innerHTML = msg;
        resDiv.classList.add(type);
        resDiv.style.display = 'block';
    };

    try {
        // Verificação básica de campos vazios para inputs numéricos
        const inputs = document.querySelectorAll('input[type="number"]');
        for(let i of inputs) {
            if(i.value === '') throw "Preencha todos os campos numéricos.";
        }

        switch(id) {
            case 1: // Maioridade
                const age1 = getVal('age');
                setRes(age1 >= 18 ? "Você é <strong>MAIOR</strong> de idade." : "Você é <strong>MENOR</strong> de idade.");
                break;

            case 2: // Mais velho
                const p1Name = getStr('name1'), p1Age = getVal('age1');
                const p2Name = getStr('name2'), p2Age = getVal('age2');
                if(p1Age > p2Age) setRes(`${p1Name} é mais velho(a).`);
                else if(p2Age > p1Age) setRes(`${p2Name} é mais velho(a).`);
                else setRes("Ambos têm a mesma idade.");
                break;

            case 3: // Pos/Neg
                const n3 = getVal('n1');
                if(n3 > 0) setRes("O número é <strong>POSITIVO</strong>.");
                else if(n3 < 0) setRes("O número é <strong>NEGATIVO</strong>.");
                else setRes("O número é <strong>ZERO</strong>.");
                break;

            case 4: // Faixa Etária
                const age4 = getVal('age');
                if(age4 < 12) setRes("Classificação: <strong>Criança</strong>");
                else if(age4 < 18) setRes("Classificação: <strong>Adolescente</strong>");
                else if(age4 < 60) setRes("Classificação: <strong>Adulto</strong>");
                else setRes("Classificação: <strong>Idoso</strong>");
                break;

            case 5: // Maior
                const n5a = getVal('n1'), n5b = getVal('n2');
                setRes(`O maior número é: <strong>${Math.max(n5a, n5b)}</strong>`);
                break;

            case 6: // Aprovado
                const avg6 = (getVal('grade1') + getVal('grade2') + getVal('grade3')) / 3;
                setRes(`Média: ${avg6.toFixed(1)} - ${avg6 >= 7 ? "APROVADO" : "REPROVADO"}`);
                break;

            case 7: // Par/Impar
                const n7 = getVal('n1');
                setRes(n7 % 2 === 0 ? "O número é <strong>PAR</strong>" : "O número é <strong>ÍMPAR</strong>");
                break;

            case 8: // Bonus
                const sal8 = getVal('salary');
                const bonus = sal8 > 2000 ? sal8 * 0.10 : sal8 * 0.05;
                setRes(`Salário: R$${sal8}<br>Bônus: R$${bonus.toFixed(2)}`);
                break;

            case 9: // Meses
                const m = getStr('monthName').toLowerCase().trim();
                let days;
                switch(m) {
                    case 'fevereiro': days = "28 ou 29"; break;
                    case 'abril': case 'junho': case 'setembro': case 'novembro': days = 30; break;
                    case 'janeiro': case 'março': case 'maio': case 'julho': case 'agosto': case 'outubro': case 'dezembro': days = 31; break;
                    default: days = null;
                }
                if(days) setRes(`${m} tem <strong>${days} dias</strong>.`);
                else setRes("Mês inválido.", "error");
                break;

            case 10: // Ordenar
                const arr10 = [getVal('n1'), getVal('n2'), getVal('n3')];
                arr10.sort((a, b) => a - b);
                setRes(`Ordem crescente: ${arr10.join(' - ')}`);
                break;

            case 11: // Faltas
                setRes(getVal('faults') > 15 ? "Situação: <strong>REPROVADO POR FALTA</strong>" : "Situação: <strong>Frequência Aceitável</strong>");
                break;

            case 12: // Produto
                const code = getVal('code');
                const qty = getVal('qty');
                let price = 0;
                // Simulado tabela de preços
                const prices = {1: 50, 2: 100, 3: 500, 4: 2000, 5: 800};
                if(prices[code]) {
                    setRes(`Total a pagar: R$ ${(prices[code] * qty).toFixed(2)}`);
                } else {
                    setRes("Código de produto inválido.", "error");
                }
                break;

            case 13: // Aposentadoria
                const age13 = getVal('age');
                const sex13 = document.getElementById('sex').value;
                let canRetire = false;
                if(sex13 === 'M' && age13 >= 65) canRetire = true;
                if(sex13 === 'F' && age13 >= 60) canRetire = true;
                setRes(canRetire ? "Pode se aposentar." : "Ainda não pode se aposentar.");
                break;

            case 14: // IMC Classificação
                const imc = getVal('weight') / (getVal('height') ** 2);
                let classif = "";
                if(imc < 18.5) classif = "Abaixo do peso";
                else if(imc < 25) classif = "Peso normal";
                else if(imc < 30) classif = "Sobrepeso";
                else if(imc < 35) classif = "Obesidade Grau I";
                else if(imc < 40) classif = "Obesidade Grau II";
                else classif = "Obesidade Grau III";
                setRes(`IMC: ${imc.toFixed(2)}<br>Classificação: <strong>${classif}</strong>`);
                break;

            case 15: // Nota Situação
                const g15 = getVal('grade');
                setRes(`Aluno ${getStr('name')}: ${g15 >= 7 ? "APROVADO" : "EM RECUPERAÇÃO"}`);
                break;

            case 16: // Maças
                const macas = getVal('apples');
                const priceApple = macas < 12 ? 0.50 : 0.40;
                setRes(`Total: R$ ${(macas * priceApple).toFixed(2)} (R$${priceApple}/unid)`);
                break;

            case 17: // Qtd Salarios
                const qtdS = getVal('salary') / getVal('minWage');
                setRes(`O funcionário recebe <strong>${qtdS.toFixed(1)}</strong> salários mínimos.`);
                break;

            case 18: // Turno
                const t = document.getElementById('shift').value;
                const name18 = getStr('name');
                setRes(t === 'M' ? `Bom dia, ${name18}!` : `Boa tarde, ${name18}!`);
                break;

            case 19: // Voto
                const age19 = getVal('age');
                if(age19 < 16) setRes("Não pode votar.");
                else if((age19 >= 16 && age19 < 18) || age19 > 70) setRes("Voto Facultativo.");
                else setRes("Voto Obrigatório.");
                break;

            case 20: // Média final
                const m20 = (getVal('n1') + getVal('n2') + getVal('n3')) / 3;
                setRes(`Média: ${m20.toFixed(1)} - ${m20 >= 7 ? "Aprovado" : "Reprovado"}`);
                break;
        }

    } catch (err) {
        setRes(err, "error");
    }
}

// Inicia app
init();