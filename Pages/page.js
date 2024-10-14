let countryInfo = document.querySelector("#info")
let btn = document.querySelector("button");


let data;
let id = JSON.parse(localStorage.getItem("data"));


// Utility Functions
let getData = async () => {
    let promise = await fetch("../data.json");
    let data = await promise.json();
    return data;
}


let findDataById = () => {
    let countryData = data.filter((obj) => {
        return obj.numericCode === id;
    })
    return countryData;
}


let checkNull = (data) => {
    if(data) return data;
    else return "Not Available";
}


// Display Borders Logic
let getBoarderNames = (borderData) => {
    let borderNames = [];

    borderData.forEach((code) => {
        data.forEach((obj) => {
            if(obj.alpha3Code === code) borderNames.push(obj.name);
        })
    })

    return borderNames;
}


let displayBorders = (borderData) => {
    let str = "";
    
    if(borderData) {
        let borderCountryNames = getBoarderNames(borderData);
        borderCountryNames.forEach((e) => {
            str += `<p class="px-4 border border-1 shadow-sm">${e}</p>`
        });
    }
    else {
        str = `<p class="px-4 border border-1 shadow-sm">Not Available</p>`
    }

    return str;
}


// Display Info Logic
let displayData = (data) => {
    let flagUrl = checkNull(data.flags.png);
    let name = checkNull(data.name);
    let nativeName = checkNull(data.nativeName);
    let population = checkNull(data.population);
    let region = checkNull(data.region);
    let subRegion = checkNull(data.subregion);
    let capital = checkNull(data.capital);
    let topLevelDomain = checkNull(data.topLevelDomain) !== "Not Available" ? data.topLevelDomain[0] : "Not Available";
    let currencyName = checkNull(data.currencies) !== "Not Available" ? data.currencies[0].name : "Not Available";
    let languages = checkNull(data.languages) !== "Not Available" ? data.languages[0].name : "Not Available";

    let str = displayBorders(data.borders);
    

    countryInfo.innerHTML = `
            <div class="img">
                <img class="shadow" src="${flagUrl}" alt="img">
            </div>
            <div class="content">
                <div class="first mt-4">
                    <h2><b>${name}</b></h2>
                </div>
                <div class="second mt-4">
                    <div class="left">
                        <p> <b>Native Name:</b> ${nativeName} </p>
                        <p> <b>Population:</b> ${population} </p>
                        <p> <b>Region:</b> ${region} </p>
                        <p> <b>Sub Region:</b> ${subRegion} </p>
                        <p> <b>Capital:</b> ${capital} </p>
                    </div>
                    <div class="right">
                        <p> <b>Top Level Domain:</b> ${topLevelDomain} </p>
                        <p> <b>Currencies:</b> ${currencyName} </p>
                        <p> <b>Languages:</b> ${languages} </p>
                    </div>
                </div>
                <div class="third mt-5">
                    <div class="left">
                        <p> <b>Border Countries:</b> </p>
                    </div>
                    <div class="right">
                        ${str}
                    </div>
                </div>
            </div>
    `;
}


btn.addEventListener("click", () => {
    window.open("../index.html", "_self");
})


window.addEventListener("load", async () => {
    data = await getData();
    let info = findDataById()[0];
    displayData(info);
})