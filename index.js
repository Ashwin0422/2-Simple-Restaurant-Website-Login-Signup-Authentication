let signUpFormEl = document.getElementById("signUpFormEl");
let signInFormEl = document.getElementById("signInFormEl");

let homePgLoginBtn = document.getElementById("homePgLoginBtn");
let homePgSignUpBtn = document.getElementById("homePgSignUpBtn");

let homePage = document.getElementById("homePage");
let signUpFormPage = document.getElementById("signUpForm");
let signInFormPage = document.getElementById("signInForm");

let convertToSignUp = document.getElementById("convertToSignUp");
let convertToSignIn = document.getElementById("convertToSignIn");

let signUpInputName = document.getElementById("signUpInputName");
let signUpInputUsername = document.getElementById("signUpInputUsername");
let signUpInputPassword = document.getElementById("signUpInputPassword");
let signUpInputNamePara = document.getElementById("signUpInputNamePara");
let signUpInputUserIdPara = document.getElementById("signUpInputUserIdPara");
let signUpPassPara = document.getElementById("signUpPassPara");

let signInInputUsername = document.getElementById("signInInputUsername");
let signInPassword = document.getElementById("signInPassword");
let signInUsernamePara = document.getElementById("signInUsernamePara");
let signInPassPara = document.getElementById("signInPassPara");

let regiterBtn = document.getElementById("regiterBtn");
let submitBtn = document.getElementById("submitBtn");

let signInBackBtn = document.getElementById("signInBackBtn");
let signUpBackBtn = document.getElementById("signUpBackBtn");

// result page

let resultPage = document.getElementById("resultPage");
let resultImg = document.getElementById("resultImg");
let resultHeading = document.getElementById("resultHeading");
let resultPageRegisterBtn = document.getElementById("resultPageRegisterBtn");
let resultPageIcon = document.getElementById("resultPageIcon");



// Local storage save and get options
function saveDetails() {
    let customerDetails = getDetails();
    localStorage.setItem("customerDetails", JSON.stringify(customerDetails));
    
}
saveDetails();

function  getDetails() {
    let parsedData =  localStorage.getItem("customerDetails");
    let customerDetails = JSON.parse(parsedData);
    console.log(customerDetails);
    return customerDetails;
}




signUpFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    signUpValidation();
});

signInFormEl.addEventListener("submit" , function(event) {
    event.preventDefault();
    signInValidation();
});

function signUpValidation() {
    if (signUpInputName.value === ""){
        signUpInputNamePara.textContent = "*Required";
    }
    if (signUpInputUsername.value === ""){
        signUpInputUserIdPara.textContent = "*Required";
    }
    if (signUpInputPassword.value === ""){
        signUpPassPara.textContent = "*Required";
    }
}

function signInValidation() {
    if (signInInputUsername.value === ""){
        signInUsernamePara.textContent = "*Required";
    }
    if (signInPassword.value === ""){
        signInPassPara.textContent = "*Required";
    }

}


// Home Page Login button

homePgLoginBtn.onclick = function() {
    homePage.classList.add("d-none");
    signInFormPage.classList.remove("d-none");
}

homePgSignUpBtn.onclick = function() {
    homePage.classList.add("d-none");
    signUpFormPage.classList.remove("d-none");
}


// signIn to SignUp Or signUp to Signin
convertToSignIn.addEventListener("click", function() {
    signUpFormPage.classList.add("d-none");
    signInFormPage.classList.remove("d-none");
});

convertToSignUp.addEventListener("click" , function() {
    signInFormPage.classList.add("d-none");
    signUpFormPage.classList.remove("d-none");
});


// Normal Validation 
function validation() {

    // SignUp page
    signUpInputName.addEventListener("blur" , function() {
        if (signUpInputName.value === ""){
            signUpInputNamePara.textContent = "*Required";
        }else {
            signUpInputNamePara.textContent = "";
        }
    });
    signUpInputUsername.addEventListener("blur", function() {
        if (signUpInputUsername.value === ""){
            signUpInputUserIdPara.textContent = "*Required";
        }else if(!(signUpInputUsername.value).endsWith("@gmail.com")) {
            signUpInputUserIdPara.textContent = "Gmail must ends with @gmail.com";
        }else {
            signUpInputUserIdPara.textContent = "";
        }
    });

    signUpInputPassword.addEventListener("blur", function() {
        if (signUpInputPassword.value === ""){
            signUpPassPara.textContent = "*Required";
        }else {
            signUpPassPara.textContent = "";
        }
    });

    // signIn 

    signInInputUsername.addEventListener("blur" , function() {
        if (signInInputUsername.value === ""){
            signInUsernamePara.textContent = "*Required";
        }else if (!(signInInputUsername.value).endsWith("@gmail.com")){
            signInUsernamePara.textContent = "Gmail must ends with @gmail.com";
        }else {
            signInUsernamePara.textContent = "";
        }
    });

    signInPassword.addEventListener("blur", function() {
        if (signInPassword.value === ""){
            signInPassPara.textContent = "*Required";
        }else {
            signInPassPara.textContent = "";
        }
    });
}
validation();

// register button
regiterBtn.addEventListener("click", function(){
    validation();
    if (!((signUpInputName.value === "") || (signUpInputUsername.value === "") || (signUpInputPassword.value === "")) ){
        let data = {
            name : signUpInputName.value.trim(),
            email : signUpInputUsername.value.trim(),
            password : signUpInputPassword.value.trim()
        };
        let customerDetails = getDetails();
        if (customerDetails === null) {
            customerDetails = [];
        }
        customerDetails.push(data);
        localStorage.setItem("customerDetails", JSON.stringify(customerDetails));
        saveDetails();
        displaySignUpCorrectPage();
        
    }
});
// submit button 
submitBtn.addEventListener("click", function(){
    validation();
    if (!((signInInputUsername.value === "") || (signInPassword.value === ""))) {
        let data = {
            email : signInInputUsername.value.trim(),
            password : signInPassword.value.trim()
        };

        let UserName = "";
        let isPresent = false;
        let customerDetails = getDetails();
        for (let eachCustomer of customerDetails) {
            if ((eachCustomer.email === data.email) && (eachCustomer.password === data.password)) {
                isPresent = true;
                UserName = eachCustomer.name;
                break;
            }
        }
        if (isPresent) {
            console.log(`Welcome Back ${UserName}. You Have Successfully Login to our Website`)
            displaySignInCorrectPage(UserName);
        }else {
            console.log("You Don't have an account Please Register")
            displaySignInWrongPage();
        }
    }
});

// Back button
signInBackBtn.addEventListener("click", function() {
    signInFormPage.classList.add("d-none");
    signUpFormPage.classList.add("d-none");
    homePage.classList.remove("d-none");
});

signUpBackBtn.addEventListener("click", function(){
    signInFormPage.classList.add("d-none");
    signUpFormPage.classList.add("d-none");
    homePage.classList.remove("d-none");
});


// result page manipulations

function displaySignInWrongPage() {
    homePage.classList.add("d-none");
    signUpFormPage.classList.add("d-none");
    signInFormPage.classList.add("d-none");
    resultPage.classList.remove("d-none");

    resultImg.src = "result-failed.png";
    resultHeading.textContent = "You Don't Have an account, Please Register.";
    resultPageRegisterBtn.classList.remove("d-none");
}

function displaySignInCorrectPage(name) {
    homePage.classList.add("d-none");
    signUpFormPage.classList.add("d-none");
    signInFormPage.classList.add("d-none");
    resultPage.classList.remove("d-none");

    resultImg.src = "result-success.png";
    resultHeading.textContent = `Welcome Back, ${name}. You Have Successfully Login to our Website.`;
    resultPageRegisterBtn.classList.add("d-none");
    resultPageIcon.classList.remove("d-none");

}

function displaySignUpCorrectPage() {
    homePage.classList.add("d-none");
    signUpFormPage.classList.add("d-none");
    signInFormPage.classList.add("d-none");
    resultPage.classList.remove("d-none");

    resultImg.src = "result-success.png";
    resultHeading.textContent = "You Have Successfully registered. Welcome to our Website";
    resultPageRegisterBtn.classList.add("d-none");
    resultPageIcon.classList.remove("d-none");
}

resultPageRegisterBtn.onclick = function() {
    homePage.classList.add("d-none");
    resultPage.classList.add("d-none");
    signInFormPage.classList.add("d-none");
    signUpFormPage.classList.remove("d-none")
}

