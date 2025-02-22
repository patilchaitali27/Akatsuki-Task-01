class Calculator {
    constructor() {
        this.previousOperandElement = document.querySelector('.previous-operand');
        this.currentOperandElement = document.querySelector('.current-operand');
        this.clear();
        this.setupEventListeners();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    backspace() {
        if (this.currentOperand.length > 1) {
            this.currentOperand = this.currentOperand.slice(0, -1);
        } else {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number;
        }
        this.updateDisplay();
        
        const hiddenValue = atob("MTM4Nzc="); 
        if (this.currentOperand === hiddenValue) {
            this.checkSpecialCondition(hiddenValue);
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    checkSpecialCondition(result) {
        const hiddenValue = atob("MTM4Nzc="); 
        if (result === hiddenValue) {
            const modal = document.querySelector('.congratulations-modal');
            modal.style.display = 'flex';
            
            setTimeout(() => {
                window.location.href = '/mission.html';
            }, 3000);
            return true;
        }
        return false;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        const expression = `${prev} ${this.getOperationSymbol()} ${current}`;
        
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression: expression.replace('×', '*').replace('÷', '/') })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                this.currentOperand = 'Error';
            } else {
                this.currentOperand = data.result.toString();
                this.previousOperand = '';
                this.operation = undefined;
              
                const hiddenValue = atob("MTM4Nzc=");
                if (this.currentOperand === hiddenValue) {
                    this.checkSpecialCondition(hiddenValue);
                }
            }
            this.updateDisplay();
        })
        .catch(() => {
            this.currentOperand = 'Error';
            this.updateDisplay();
        });
    }

    getOperationSymbol() {
        switch (this.operation) {
            case '+': return '+';
            case '-': return '-';
            case '×': return '*';
            case '÷': return '/';
            default: return '';
        }
    }

    toggleSign() {
        if (this.currentOperand === '0') return;
        this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
        this.updateDisplay();
    }

    percentage() {
        this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }

        this.currentOperandElement.classList.add('number-change');
        setTimeout(() => {
            this.currentOperandElement.classList.remove('number-change');
        }, 200);
    }

    setupEventListeners() {
        document.querySelectorAll('.buttons button').forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('operator')) {
                    if (button.textContent === '=') {
                        this.compute();
                    } else {
                        this.chooseOperation(button.textContent);
                    }
                } else if (button.classList.contains('clear')) {
                    this.clear();
                } else if (button.classList.contains('backspace')) {
                    this.backspace();
                } else if (button.textContent === '±') {
                    this.toggleSign();
                } else if (button.textContent === '%') {
                    this.percentage();
                } else {
                    this.appendNumber(button.textContent);
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
