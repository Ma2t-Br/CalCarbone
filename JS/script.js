var data = {
    "TGV": 0.0024,
    "Tramway": 0.0027,
    "Metro": 0.0027,
    "Intercité" : 0.0059,
    "RER": 0.0073,
    "Moto": 0.1920,
    "Bus": 0.1127,
    "Autocar": 0.0294,
    "TER": 0.0296,
    "Scooter": 0.0763,
    "Voiture": 0.2176
}


function discover(visible){
    if (visible){
        document.getElementsByTagName('input')[11].style.display = 'block';
    } else {
        document.getElementsByTagName('input')[11].style.display = 'none';
    }
}

function generer_2(){
    var monTableau = document.getElementById("sec-tab-calc");

    var newLine = document.createElement("tr");

    var travel = document.createElement("td");
    var week = document.createElement("td");
    var month = document.createElement("td");
    var year = document.createElement("td");

    /*duree.classList.add("DDV");*/

    var EmpTravel = CalculeTravel(document.forms.Calculate);

    travel.textContent = EmpTravel;
    week.textContent = EmpTravel*7;
    month.textContent = EmpTravel*30;
    year.textContent = EmpTravel*365;

    newLine.append(travel, week, month, year);
    monTableau.appendChild(newLine);
    
    document.Calculate.reset();
}

function CalculeTravel(form){
    var Result = 0;

    Result += form.elements["tgv"].value*data.TGV;
    Result += form.elements["tram"].value*data.Tramway;
    Result += form.elements["metro"].value*data.Metro;
    Result += form.elements["intercite"].value*data.Intercité;
    Result += form.elements["moto"].value*data.Moto;
    Result += form.elements["rer"].value*data.RER;
    Result += form.elements["autocar"].value*data.Autocar;
    Result += form.elements["ter"].value*data.TER;
    Result += form.elements["scooter"].value*data.Scooter;
    Result += form.elements["bus"].value*data.Bus;
    Result += form.elements["voiture"].value*data.Voiture;

    return Result;
}

function generer(){
    /*Création de la carte générale*/
    var Card = document.getElementById("Card");
    var newCard = document.createElement("div");
    newCard.classList.add("calculateur");

    /*Création et Ajout du titre*/
    var Title = document.createElement("h3");
    Title.textContent = "Estimation de votre empreinte carbone (en kg CO2e)";
    newCard.append(Title);

    /*Création et Ajout du conteneur div*/
    var Conteneur = document.createElement("div");
    Conteneur.setAttribute("id", "Resultats");
    newCard.append(Conteneur);

    /*Redéfinition de maCarte */
    var maCarte = Conteneur;

    /*Création et Ajout du sous titre*/
    var forTitle = document.createElement("h3");
    var titleTravel = document.createElement("strong");
    titleTravel.textContent = travelString(document.forms.Calculate);
    forTitle.textContent = "Pour : ";
    forTitle.append(titleTravel);
    maCarte.append(forTitle);

    /*Création de la table*/
    var myTable = document.createElement("table");
    myTable.setAttribute("id", "sec-tab-calc");
    
    /*Création et Ajout à la table des titres header du tableau*/
    var head = document.createElement("thead");
    var theads = document.createElement("tr");
    var a = document.createElement("th");a.textContent = "Sur un trajet";
    var b = document.createElement("th");b.textContent = "Sur une semaine";
    var c = document.createElement("th");c.textContent = "Sur un mois";
    var d = document.createElement("th");d.textContent = "Sur un an";
    theads.append(a, b, c, d);
    head.appendChild(theads);
    myTable.appendChild(head);

    /*Création et ajout à la table de la ligne calculée */
    var newLine = document.createElement("tr");

    var travel = document.createElement("td");
    var week = document.createElement("td");
    var month = document.createElement("td");
    var year = document.createElement("td");
    var EmpTravel = CalculeTravel(document.forms.Calculate);
    travel.textContent = EmpTravel;
    week.textContent = EmpTravel*7;
    month.textContent = EmpTravel*30;
    year.textContent = EmpTravel*365;
    newLine.append(travel, week, month, year);
    myTable.appendChild(newLine);

    /*Ajout des éléments table et conteneur à la carte générale*/
    maCarte.appendChild(myTable);
    newCard.appendChild(maCarte);
    Card.append(newCard);
    
    document.Calculate.reset();
}

function travelString(response){
    if (response.elements["trajet"].value === "Autre"){
        response = response.elements["NameAutre"].value;
        return response;
    }
    return response.elements["trajet"].value;
}