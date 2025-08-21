// Estruturas de dados
let lista = [];
let listadupla = [];
let listaCircular = [];
let currentDoubleIndex = 0;
let currentCircularIndex = 0;
let pilha = [];
let fila = [];

// Funções para Listas
function insertInList() {
    const value = document.getElementById('listValue').value.trim();
    const position = document.getElementById('listPosition').value;
    
    if (!value) {
        alert('Por favor, digite um valor!');
        return;
    }
    
    if (position === '' || position < 0) {
        // Inserir no final
        lista.push(value);
    } else {
        // Inserir na posição específica
        const pos = Math.min(parseInt(position), lista.length);
        lista.splice(pos, 0, value);
    }
    
    updateListDisplay();
    document.getElementById('listValue').value = '';
    document.getElementById('listPosition').value = '';
    
    showMessage('Valor inserido na lista!', 'success');
}

function removeFromList() {
    const value = document.getElementById('listValue').value.trim();
    const position = document.getElementById('listPosition').value;
    
    if (lista.length === 0) {
        alert('Lista está vazia!');
        return;
    }
    
    if (value) {
        // Remover por valor
        const index = lista.indexOf(value);
        if (index !== -1) {
            lista.splice(index, 1);
            showMessage(`Valor "${value}" removido da lista!`, 'success');
        } else {
            showMessage(`Valor "${value}" não encontrado na lista!`, 'error');
        }
    } else if (position !== '') {
        // Remover por posição
        const pos = parseInt(position);
        if (pos >= 0 && pos < lista.length) {
            const removedValue = lista.splice(pos, 1)[0];
            showMessage(`Valor "${removedValue}" removido da posição ${pos}!`, 'success');
        } else {
            showMessage('Posição inválida!', 'error');
        }
    } else {
        // Remover do final
        const removedValue = lista.pop();
        showMessage(`Valor "${removedValue}" removido do final da lista!`, 'success');
    }
    
    updateListDisplay();
    document.getElementById('listValue').value = '';
    document.getElementById('listPosition').value = '';
}

function searchInList() {
    const value = document.getElementById('listValue').value.trim();
    
    if (!value) {
        alert('Por favor, digite um valor para buscar!');
        return;
    }
    
    const index = lista.indexOf(value);
    if (index !== -1) {
        showMessage(`Valor "${value}" encontrado na posição ${index}!`, 'success');
        highlightElement('list', index);
    } else {
        showMessage(`Valor "${value}" não encontrado na lista!`, 'error');
    }
    
    document.getElementById('listValue').value = '';
}

function clearList() {
    lista = [];
    updateListDisplay();
    showMessage('Lista limpa!', 'success');
}

function updateListDisplay() {
    const display = document.getElementById('listDisplay');
    
    if (lista.length === 0) {
        display.innerHTML = '<div class="empty-message">Lista vazia</div>';
        return;
    }
    
    display.innerHTML = lista.map((value, index) => 
        `<div class="list-node" data-index="${index}">${value}</div>`
    ).join('');
}

// Funções para Listas Duplas
function insertInDoubleList() {
    const value = document.getElementById('doubleListValue').value.trim();
    const position = document.getElementById('doubleListPosition').value;
    
    if (!value) {
        alert('Por favor, digite um valor!');
        return;
    }
    
    if (position === '' || position < 0) {
        // Inserir no final
        listadupla.push(value);
    } else {
        // Inserir na posição específica
        const pos = Math.min(parseInt(position), listadupla.length);
        listadupla.splice(pos, 0, value);
    }
    
    updateDoubleListDisplay();
    document.getElementById('doubleListValue').value = '';
    document.getElementById('doubleListPosition').value = '';
    
    showMessage('Valor inserido na lista dupla!', 'success');
}

function removeFromDoubleList() {
    const value = document.getElementById('doubleListValue').value.trim();
    
    if (listadupla.length === 0) {
        alert('Lista dupla está vazia!');
        return;
    }
    
    if (value) {
        // Remover por valor
        const index = listadupla.indexOf(value);
        if (index !== -1) {
            listadupla.splice(index, 1);
            if (currentDoubleIndex >= listadupla.length) {
                currentDoubleIndex = Math.max(0, listadupla.length - 1);
            }
            showMessage(`Valor "${value}" removido da lista dupla!`, 'success');
        } else {
            showMessage(`Valor "${value}" não encontrado na lista dupla!`, 'error');
        }
    } else {
        // Remover do final
        const removedValue = listadupla.pop();
        if (currentDoubleIndex >= listadupla.length) {
            currentDoubleIndex = Math.max(0, listadupla.length - 1);
        }
        showMessage(`Valor "${removedValue}" removido do final da lista dupla!`, 'success');
    }
    
    updateDoubleListDisplay();
    document.getElementById('doubleListValue').value = '';
}

function navigateDoubleList(direction) {
    if (listadupla.length === 0) {
        alert('Lista dupla está vazia!');
        return;
    }
    
    if (direction === 'forward') {
        currentDoubleIndex = (currentDoubleIndex + 1) % listadupla.length;
        showMessage(`Navegando para frente: "${listadupla[currentDoubleIndex]}"`, 'info');
    } else {
        currentDoubleIndex = currentDoubleIndex === 0 ? listadupla.length - 1 : currentDoubleIndex - 1;
        showMessage(`Navegando para trás: "${listadupla[currentDoubleIndex]}"`, 'info');
    }
    
    updateDoubleListDisplay();
}

function clearDoubleList() {
    listadupla = [];
    currentDoubleIndex = 0;
    updateDoubleListDisplay();
    showMessage('Lista dupla limpa!', 'success');
}

function updateDoubleListDisplay() {
    const display = document.getElementById('doubleListDisplay');
    
    if (listadupla.length === 0) {
        display.innerHTML = '<div class="empty-message">Lista dupla vazia</div>';
        return;
    }
    
    display.innerHTML = listadupla.map((value, index) => 
        `<div class="double-list-node ${index === currentDoubleIndex ? 'current' : ''}" data-index="${index}">${value}</div>`
    ).join('');
}

// Funções para Listas Circulares
function insertInCircularList() {
    const value = document.getElementById('circularListValue').value.trim();
    
    if (!value) {
        alert('Por favor, digite um valor!');
        return;
    }
    
    listaCircular.push(value);
    updateCircularListDisplay();
    document.getElementById('circularListValue').value = '';
    
    showMessage('Valor inserido na lista circular!', 'success');
}

function removeFromCircularList() {
    if (listaCircular.length === 0) {
        alert('Lista circular está vazia!');
        return;
    }
    
    const removedValue = listaCircular.splice(currentCircularIndex, 1)[0];
    
    if (listaCircular.length === 0) {
        currentCircularIndex = 0;
    } else if (currentCircularIndex >= listaCircular.length) {
        currentCircularIndex = 0;
    }
    
    updateCircularListDisplay();
    showMessage(`Valor "${removedValue}" removido da lista circular!`, 'success');
}

function rotateCircularList() {
    if (listaCircular.length === 0) {
        alert('Lista circular está vazia!');
        return;
    }
    
    currentCircularIndex = (currentCircularIndex + 1) % listaCircular.length;
    updateCircularListDisplay();
    showMessage(`Rotacionando para: "${listaCircular[currentCircularIndex]}"`, 'info');
}

function clearCircularList() {
    listaCircular = [];
    currentCircularIndex = 0;
    updateCircularListDisplay();
    showMessage('Lista circular limpa!', 'success');
}

function updateCircularListDisplay() {
    const display = document.getElementById('circularListDisplay');
    
    if (listaCircular.length === 0) {
        display.innerHTML = '<div class="empty-message">Lista circular vazia</div>';
        return;
    }
    
    let html = '<div class="circular-container">';
    
    const angleStep = 360 / listaCircular.length;
    const radius = 120;
    
    listaCircular.forEach((value, index) => {
        const angle = (index * angleStep - 90) * (Math.PI / 180); // -90 para começar no topo
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        html += `<div class="circular-list-node ${index === currentCircularIndex ? 'current' : ''}" 
                      style="transform: translate(${x}px, ${y}px)" 
                      data-index="${index}">${value}</div>`;
    });
    
    html += '</div>';
    display.innerHTML = html;
}

// Funções para Pilhas
function pushToStack() {
    const value = document.getElementById('stackValue').value.trim();
    
    if (!value) {
        alert('Por favor, digite um valor!');
        return;
    }
    
    pilha.push(value);
    updateStackDisplay();
    document.getElementById('stackValue').value = '';
    
    showMessage(`Valor "${value}" adicionado ao topo da pilha!`, 'success');
}

function popFromStack() {
    if (pilha.length === 0) {
        alert('Pilha está vazia!');
        return;
    }
    
    const value = pilha.pop();
    updateStackDisplay();
    
    showMessage(`Valor "${value}" removido do topo da pilha!`, 'success');
}

function peekStack() {
    if (pilha.length === 0) {
        alert('Pilha está vazia!');
        return;
    }
    
    const topValue = pilha[pilha.length - 1];
    showMessage(`Valor no topo da pilha: "${topValue}"`, 'info');
    highlightElement('stack', pilha.length - 1);
}

function clearStack() {
    pilha = [];
    updateStackDisplay();
    showMessage('Pilha limpa!', 'success');
}

function updateStackDisplay() {
    const display = document.getElementById('stackDisplay');
    
    if (pilha.length === 0) {
        display.innerHTML = '<div class="empty-message">Pilha vazia</div>';
        return;
    }
    
    display.innerHTML = pilha.map((value, index) => 
        `<div class="stack-item" data-index="${index}">${value}</div>`
    ).join('');
}

// Funções para Filas
function enqueue() {
    const value = document.getElementById('queueValue').value.trim();
    
    if (!value) {
        alert('Por favor, digite um valor!');
        return;
    }
    
    fila.push(value);
    updateQueueDisplay();
    document.getElementById('queueValue').value = '';
    
    showMessage(`Valor "${value}" adicionado ao fim da fila!`, 'success');
}

function dequeue() {
    if (fila.length === 0) {
        alert('Fila está vazia!');
        return;
    }
    
    const value = fila.shift();
    updateQueueDisplay();
    
    showMessage(`Valor "${value}" removido do início da fila!`, 'success');
}

function frontQueue() {
    if (fila.length === 0) {
        alert('Fila está vazia!');
        return;
    }
    
    const frontValue = fila[0];
    showMessage(`Valor no início da fila: "${frontValue}"`, 'info');
    highlightElement('queue', 0);
}

function clearQueue() {
    fila = [];
    updateQueueDisplay();
    showMessage('Fila limpa!', 'success');
}

function updateQueueDisplay() {
    const display = document.getElementById('queueDisplay');
    
    if (fila.length === 0) {
        display.innerHTML = '<div class="empty-message">Fila vazia</div>';
        return;
    }
    
    display.innerHTML = fila.map((value, index) => 
        `<div class="queue-item" data-index="${index}">${value}</div>`
    ).join('');
}

// Função para mostrar código
function showCode(structure, language) {
    // Remover classe active de todas as abas da estrutura
    const tabs = document.querySelectorAll(`#${structure}Code + .code-content .tab-btn`);
    const tabBtns = document.querySelectorAll('.code-tabs .tab-btn');
    
    // Encontrar as abas corretas para esta estrutura
    let structureTabs;
    if (structure === 'list') {
        structureTabs = document.querySelectorAll('.simulator-section:nth-of-type(2) .tab-btn');
    } else if (structure === 'stack') {
        structureTabs = document.querySelectorAll('.simulator-section:nth-of-type(3) .tab-btn');
    } else if (structure === 'queue') {
        structureTabs = document.querySelectorAll('.simulator-section:nth-of-type(4) .tab-btn');
    }
    
    structureTabs.forEach(tab => tab.classList.remove('active'));
    
    // Adicionar classe active na aba clicada
    event.target.classList.add('active');
    
    // Esconder todos os blocos de código da estrutura
    const codeBlocks = document.querySelectorAll(`[id^="${structure}Code"]`);
    codeBlocks.forEach(block => block.classList.remove('active'));
    
    // Mostrar o bloco de código selecionado
    const targetCode = document.getElementById(`${structure}Code${language.charAt(0).toUpperCase() + language.slice(1)}`);
    if (targetCode) {
        targetCode.classList.add('active');
    }
}

// Função para mostrar mensagens
function showMessage(message, type) {
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup message-${type}`;
    messageDiv.textContent = message;
    
    // Estilos da mensagem
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Cores baseadas no tipo
    switch (type) {
        case 'success':
            messageDiv.style.background = '#27ae60';
            break;
        case 'error':
            messageDiv.style.background = '#e74c3c';
            break;
        case 'info':
            messageDiv.style.background = '#3498db';
            break;
        default:
            messageDiv.style.background = '#95a5a6';
    }
    
    document.body.appendChild(messageDiv);
    
    // Remover após 3 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Função para destacar elementos
function highlightElement(structure, index) {
    // Remover destaque anterior
    const previousHighlight = document.querySelector('.highlighted');
    if (previousHighlight) {
        previousHighlight.classList.remove('highlighted');
    }
    
    // Adicionar destaque ao elemento
    let selector;
    switch (structure) {
        case 'list':
            selector = `.list-node[data-index="${index}"]`;
            break;
        case 'stack':
            selector = `.stack-item[data-index="${index}"]`;
            break;
        case 'queue':
            selector = `.queue-item[data-index="${index}"]`;
            break;
    }
    
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add('highlighted');
        
        // Remover destaque após 2 segundos
        setTimeout(() => {
            element.classList.remove('highlighted');
        }, 2000);
    }
}

// Adicionar estilos para animações e destaque
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .highlighted {
        animation: highlight 0.5s ease;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.8) !important;
        transform: scale(1.05) !important;
    }
    
    @keyframes highlight {
        0%, 100% {
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            transform: scale(1);
        }
        50% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Event listeners para Enter nos inputs
document.addEventListener('DOMContentLoaded', function() {
    // Lista
    document.getElementById('listValue').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            insertInList();
        }
    });
    
    document.getElementById('listPosition').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            insertInList();
        }
    });
    
    // Lista Dupla
    document.getElementById('doubleListValue').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            insertInDoubleList();
        }
    });
    
    document.getElementById('doubleListPosition').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            insertInDoubleList();
        }
    });
    
    // Lista Circular
    document.getElementById('circularListValue').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            insertInCircularList();
        }
    });
    
    // Pilha
    document.getElementById('stackValue').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            pushToStack();
        }
    });
    
    // Fila
    document.getElementById('queueValue').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enqueue();
        }
    });
    
    // Inicializar displays
    updateListDisplay();
    updateDoubleListDisplay();
    updateCircularListDisplay();
    updateStackDisplay();
    updateQueueDisplay();
});

// Função para salvar estado no localStorage
function saveState() {
    const state = {
        lista: lista,
        listadupla: listadupla,
        listaCircular: listaCircular,
        currentDoubleIndex: currentDoubleIndex,
        currentCircularIndex: currentCircularIndex,
        pilha: pilha,
        fila: fila
    };
    localStorage.setItem('ed_modulo3_state', JSON.stringify(state));
}

// Função para carregar estado do localStorage
function loadState() {
    const savedState = localStorage.getItem('ed_modulo3_state');
    if (savedState) {
        const state = JSON.parse(savedState);
        lista = state.lista || [];
        listadupla = state.listadupla || [];
        listaCircular = state.listaCircular || [];
        currentDoubleIndex = state.currentDoubleIndex || 0;
        currentCircularIndex = state.currentCircularIndex || 0;
        pilha = state.pilha || [];
        fila = state.fila || [];
        
        updateListDisplay();
        updateDoubleListDisplay();
        updateCircularListDisplay();
        updateStackDisplay();
        updateQueueDisplay();
    }
}

// Salvar estado automaticamente
setInterval(saveState, 5000); // Salva a cada 5 segundos

// Carregar estado ao inicializar
document.addEventListener('DOMContentLoaded', loadState);

// Salvar estado antes de sair da página
window.addEventListener('beforeunload', saveState);

