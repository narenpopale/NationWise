const flagsDiv = document.querySelector("#flags");


// Fetching Data
let data;

let getData = async () => {
    let promise = await fetch("./data.json");
    let data = await promise.json();
    return data;
}


// Displaying All Data
let checkNull = (data) => {
    if(data) return data;
    else return "Not Available";
}


let populateAllData = (data) => {
    let str = "";

    data.forEach((obj) => {
        let name = checkNull(obj.name);
        let population = checkNull(obj.population);
        let region = checkNull(obj.region);
        let capital = checkNull(obj.capital);
        let flagUrl = checkNull(obj.flags.png);
        
        str += `<div class="card border border-0 shadow-sm" style="width: 18rem;">
                <img src="${flagUrl}" class="card-img-top" alt="img">
                <div class="card-body c-body px-4">
                    <h5 class="mt-2"><b>${name}</b></h5>
                    <p class="card-text mb-1 mt-3"> <b>Population:</b> <span class="population">${population}</span> </p>
                    <p class="card-text mb-1"> <b>Region:</b> <span class="region">${region}</span> </p>
                    <p class="card-text mb-4"> <b>Capital:</b> <span class="capital">${capital}</span> </p>
                </div>
            </div>`
    });

    flagsDiv.innerHTML = str;
}


window.addEventListener("load", async () => {
    data = await getData();
    populateAllData(data);
})