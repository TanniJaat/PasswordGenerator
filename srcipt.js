const passwordDisplay = document.querySelector(".gen-pass");
const indicator = document.querySelector(".strength-indicator");
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const number = document.querySelector("#numbers");
const symbol = document.querySelector("#symbols");
const lengthDisplay = document.querySelector(".length");
const inputSlider = document.querySelector("#slide");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]"); 
const symbols = "~!@#$%^&*()_+`[]\{}|;:<>,.?/";



let password = "";
let passwordLength = 10;
let checkCount = 0;
setIndicator("#FF0000")
handleSlider();

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max-min)) + "% 100%";
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})



//copy button

//->>>>
// function to handle check box change or maintain checkbox count
function handleCheckboxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    // special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider;
    }
}

// adding event listner on all checkbox
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
})



// function to get random integer
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

// function to get random number
function generateRandomNumber() {
     return getRandomInteger(0, 9);
}

// function to get random lowercase letter
function  generateLowercaseLetter() {
    return String.fromCharCode(getRandomInteger(97, 123)); 
}

// function to get random uppercase letter 
function  generateUppercaseLetter() {
    return String.fromCharCode(getRandomInteger(65, 91)); 
}

// function to get random symbols
function generateSymbols() {
     const randomNumber = getRandomInteger(0, symbols.length);
     return symbols.charAt(randomNumber);
}

function calculateStrength(){
    let hasNum =false;
    let hasUpper = false;
    let hasLower =false;
    let hasSymbol = false;
    if(upperCase.checked){
        hasUpper=true;

    }
    if(lowerCase.checked){
        hasLower=true;

    }
    if(number.checked){
        hasNum=true;

    }
    if(symbol.checked){
        hasSymbol=true;
    }
    if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
        setIndicator("#00ff00");
    }
    else if ((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength >= 6) {
        setIndicator("006db0");
    }
    else {
        setIndicator("#FF0000");
    }
}
function setIndicator(color){
    indicator.style.backgroundColor = color;

}
generateBtn.addEventListener('click',()=>{
    console.log("hello");
    
    if(checkCount <=0){
        console.log(password);
        return;
    }
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    password="";
    

    let functionArray =[];
    if (upperCase.checked) {
        functionArray.push(generateUppercaseLetter);
    }
    if (lowerCase.checked) {
        functionArray.push(generateLowercaseLetter);
    }

    if (number.checked) {
        functionArray.push(generateRandomNumber);
    }

    if (symbol.checked) {
        functionArray.push(generateSymbols);
    }
       // cumpulsory additon of password
       for (let i=0; i<functionArray.length; i++) {
        password += functionArray[i]();
    }
    // remaining Addition
    for (let i=0; i<passwordLength-functionArray.length; i++) {
        let randomIndex = getRandomInteger(0, functionArray.length);
        password += functionArray[randomIndex]();
    }
     // shuffle the password
     password = shufflePassword(Array.from(password));
       // show in UI
    passwordDisplay.value = password;
    // call calculate password strength function
    calculateStrength();
    

});
function shufflePassword(array) {
    //  Fisher Yates Method
    for (let i=array.length-1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    let str = "";
    array.forEach((el) => {
        str += el;
    })

    return str;
}


