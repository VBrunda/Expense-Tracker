let totalAmount = document.getElementById("total-amount");

let outputTotalAmount = document.getElementById("output-total-amount");
let outputExpenseAmount = document.getElementById("output-expense-amount");
let outputBalanceAmount = document.getElementById("output-balance-amount");

//expense tab
const expenseBtn = document.getElementById("exp-amount-button");
const expenseName = document.getElementById("ename");
const expenseAmount = document.getElementById("eamount");

const list = document.getElementById("list");
const totalAmountBtn = document.getElementById("total-amount-button");
const bugetExpenseTab = document.getElementById("tab-1");

//get Total expenses
totalAmountBtn.addEventListener("click", () => {
    let tAmount = parseInt(totalAmount.value);
    if (tAmount != '' && tAmount > 0) {
        outputTotalAmount.innerHTML = tAmount;
        outputBalanceAmount.innerHTML = tAmount - outputExpenseAmount.innerHTML;
        totalAmount.value = '';
    } else {
        alert("invalid Budget amount");
    }
});

modifyExpense = (button, edit = false) => {
    let parentEle = button.parentElement;
    console.log(parentEle);    
    let parentName = parentEle.querySelector(".expname").innerText;
    let parentAmount =  parentEle.querySelector(".expamount").innerText;
    if(edit) {        
        expenseName.value = parentName;
        expenseAmount.value = parentAmount;
        let editBtn = parentEle.querySelector('.edit');
        editBtn.disabled = true;
        bugetExpenseTab.checked = true;
    }
    outputExpenseAmount.innerHTML = parseInt(outputExpenseAmount.innerHTML) - parentAmount;
    outputBalanceAmount.innerHTML = parseInt(outputTotalAmount.innerHTML) - outputExpenseAmount.innerHTML;
    parentEle.remove();
}

listExpenditure = (name, amount) => {
    console.log(name, amount);
    let sublistContent = document.createElement("div");
    sublistContent.classList.add('sub-list');

    sublistContent.innerHTML = `<p class="expname">${name}</p><p class="expamount">${amount}</p>`;

    let editbtn = document.createElement('button');
    editbtn.classList.add('fa-solid', 'fa-pen-to-square', 'edit');
    editbtn.addEventListener("click", () => modifyExpense(editbtn, true));

    let deletebtn = document.createElement('button');
    deletebtn.classList.add('fa-solid', 'fa-trash-can', 'delete');
    deletebtn.addEventListener("click", () => modifyExpense(deletebtn));

    sublistContent.appendChild(editbtn);
    sublistContent.appendChild(deletebtn);
    list.appendChild(sublistContent);
}

//Add expense details
expenseBtn.addEventListener("click", () => {
    if (expenseAmount.value > 0 && expenseName.value != '') {
        let expenditure = parseInt(expenseAmount.value);
        outputExpenseAmount.innerHTML = parseInt(outputExpenseAmount.innerHTML) + expenditure;
        outputBalanceAmount.innerHTML = parseInt(outputTotalAmount.innerHTML) - outputExpenseAmount.innerHTML;
        console.log(outputExpenseAmount.innerHTML, outputBalanceAmount.innerHTML);
        listExpenditure(expenseName.value, expenseAmount.value);
        expenseAmount.value = '';
        expenseName.value = '';
    } else {
        alert("Enter Expense detaisl");
    }
})