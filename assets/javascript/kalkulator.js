/*console.log("Selamat anda telah membuka file javascript");

var fnama = prompt("Halo, Masukkan Nama Awal Kamu!");
var lnama = prompt("Masukkan Nama Akhir Kamu !");
var negara = prompt("Kamu Dari Negara Mana?")

var bio = {
    nama: {
        first: fnama,
        last: lnama,
    },
    asal: negara
}

if(negara == "Pangasean"){
    alert("sup? " + bio.nama.first + " " + bio.nama.last);
}else if(negara == "Rabbit"){
    alert("bwa bwa bwa " + bio.nama.first + " " + bio.nama.last);
}else{
    alert("Nice To Meet You " + bio.nama.first + " " + bio.nama.last + "!")
}*/

const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
 }

function clearCalculator(){
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
            calculator.displayNumber = digit;
    } else {
        if (calculator.displayNumber === '0') {
            calculator.displayNumber = digit;
        } else {
            calculator.displayNumber += digit;
        }
    }
 }

 function inverseNumber(){
     if(calculator.displayNumber === '0'){
         return;
     }
     calculator.displayNumber = calculator.displayNumber * -1;
 }

 function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert('Operator sudah ditetapkan')
    }
 }

 function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }
  
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
  
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
 }

const buttons = document.querySelectorAll(".box");
for(let box of buttons){
    box.addEventListener('click', function(event){
        const target = event.target;

        if(target.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')){
            performCalculation();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')){
            handleOperator(target.innerText);
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}