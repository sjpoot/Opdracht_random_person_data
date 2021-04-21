// Elementen ophalen uit de DOM
const landenLijst = document.getElementById("landen-lijst");
const steenbokVrouwen = document.getElementById("steenbok-vrouwen");
const resetLists = document.getElementById("reset-lists");
const oudeCreditCards = document.getElementById("oude-creditcards");
const sendContent = document.getElementById("print-content");

// De content naar de DOM printen
const printContent = function (data) {
    newLi = document.createElement("li");
    sendContent.appendChild(newLi)
    newLi.innerHTML = data;
};

// landen ophalen, sorteren en ondupliceren
const landenArray = [];
randomPersonData.forEach(function (data) {
    if (!landenArray.includes(data.region)) {
        return landenArray.push(data.region);
    };
});

// Leeftijd ophalen
function getAge(data) {
    let birthDate = data.birthday.mdy;
    let currentDate = new Date();
    let dateDiff = currentDate.getTime() - new Date(birthDate).getTime();
    return Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365.25));
}

// steenbok vrouwen van 30+ ophalen
function getFemaleCapricorn() {
    clearAll();
    randomPersonData.forEach(function (data) {

        let currentAge = getAge(data);
        let date = data.birthday.mdy;
        let birthMonth = new Date(date).getMonth() + 1;
        let birthDay = new Date(date).getDate();

        if (data.gender === "female" && currentAge > 30) {
            if ((birthMonth === 12 && birthDay >= 22) || (birthMonth === 1 && birthDay <= 19)) {
                const newDiv = document.createElement("div")
                const newLi = document.createElement("li");
                const newImage = document.createElement("img");
                sendContent.appendChild(newDiv);
                newDiv.appendChild(newLi);
                newDiv.appendChild(newImage);
                newImage.src = data.photo;
                newLi.innerHTML = `${data.name} ${data.surname}: leeftijd is ${currentAge} jaar`;
            }
        }
    });
}

// Verlooptijd Creditcard ophalen
function getExpDate(data) {
    //formatteren expiration date
    let expYear = data.credit_card.expiration.split("/")[1];
    let expMonth = data.credit_card.expiration.split("/")[0];
    if (expMonth < 10) expMonth = "0" + expMonth;
    let expDate = "" + expYear + expMonth;

    //formatteren current date
    let currentYear = new Date().getFullYear()-2000;
    let currentMonth = new Date().getMonth()+1;
    if (currentMonth < 10) currentMonth = "0" + currentMonth;
    let currentDate = "" + currentYear + currentMonth;

    //return het verschil tussen expiration en current date
    return expDate - currentDate;
}


// Creditcard gegevens ophalen
function getCreditCard(data) {
    clearAll();
    randomPersonData.forEach(function (data) {

        let currentAge = getAge(data);
        let creditCardExp = getExpDate(data);

        if (currentAge >= 18) {
            if (creditCardExp <= 100) {
                const newDiv = document.createElement("div");
                const newUl = document.createElement("ul");
                const phoneLi = document.createElement("li");
                const creditNumLi = document.createElement("li");
                const expDateLi = document.createElement("li");
                const newHr = document.createElement("hr")
                sendContent.appendChild(newDiv);
                newDiv.appendChild(newUl);
                newUl.innerHTML = `${data.name} ${data.surname}`;
                newUl.appendChild(phoneLi);
                phoneLi.innerHTML = `Telnum: ${data.phone}`;
                newUl.appendChild(creditNumLi);
                creditNumLi.innerHTML = `Creditcard nr.: ${data.credit_card.number}`;
                newUl.appendChild(expDateLi);
                expDateLi.innerHTML = `Verloopdatum Creditcard: ${data.credit_card.expiration}`;
                newDiv.appendChild(newHr);
            }
        }
    });
}

// Landen printen
function printLanden() {
    clearAll();
    landenArray.sort().forEach(data => printContent(data))
}

// Lijst clearen
function clearAll() {
    sendContent.innerHTML = ""
}

// de Buttons uitvoeren
landenLijst.addEventListener("click", printLanden);
steenbokVrouwen.addEventListener("click", getFemaleCapricorn);
oudeCreditCards.addEventListener("click", getCreditCard)
resetLists.addEventListener("click", clearAll);