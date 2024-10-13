let countryInfo = document.querySelector("#info")
let btn = document.querySelector("button");


let data = JSON.parse(localStorage.getItem("data"))[0];


btn.addEventListener("click", () => {
    window.open("../index.html", "_self");
})


window.addEventListener("load", () => {
    let str = "";

    if(data.borders) {
        data.borders.forEach((e) => {
            str += `<p class="px-4 border border-1 shadow-sm">${e}</p>`
        });
    }
    else {
        str = "Not Available"
    }

    countryInfo.innerHTML = `
            <div class="img w-50">
                <img src="${data.flags.png}" alt="img">
            </div>
            <div class="content w-50">
                <div class="first mt-4">
                    <h2><b>${data.name}</b></h2>
                </div>
                <div class="second mt-4">
                    <div class="left w-50">
                        <p> <b>Native Name:</b> ${data.nativeName} </p>
                        <p> <b>Population:</b> ${data.population} </p>
                        <p> <b>Region:</b> ${data.region} </p>
                        <p> <b>Sub Region:</b> ${data.subregion} </p>
                        <p> <b>Capital:</b> ${data.capital} </p>
                    </div>
                    <div class="right w-50">
                        <p> <b>Top Level Domain:</b> ${data.topLevelDomain[0]} </p>
                        <p> <b>Currencies:</b> ${data.currencies[0].name} </p>
                        <p> <b>Languages:</b> ${data.languages[0].name} </p>
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
})