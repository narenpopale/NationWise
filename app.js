const flagsDiv = document.querySelector("#flags");
const regionDropdown = document.querySelector("#region-dropdown");
const input = document.querySelector("input");


let data;


// Utility Functions
let getData = async () => {
    let promise = await fetch("./data.json");
    let data = await promise.json();
    return data;
}


let checkNull = (data) => {
    if(data) return data;
    else return "Not Available";
}


let displayData = (data) => {
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


// Regional Data logic
const regions = new Set();

let getAllRegions = (data) => {
    data.forEach((obj) => {
        regions.add(obj.region);
    })
}


let displayRegions = (regions) => {
    let str = `<li><a class="dropdown-item" href="#">All</a></li>`;
    
    regions.forEach((region) => {
        str += `<li><a class="dropdown-item" href="#">${region}</a></li>`;
    })

    regionDropdown.innerHTML = str;
}


let filterByRegion = () => {
    const regionList = document.querySelectorAll("li");
    
    regionList.forEach((e) => {
        e.addEventListener("click", () => {
            let region = e.innerText;
            if(region === "All") {
                displayData(data);
            }
            else {
                let regionalData = data.filter((obj) => {
                    return obj.region === region;
                })
                displayData(regionalData);
            }
        })
    })

}


const displayRegionalData = () => {
    getAllRegions(data);
    displayRegions(regions);
    filterByRegion()
}


// Country Search Logic
const checkCondition = (val, key) => {
    
    switch (key) {
        case "Enter":
            break;
        case "CapsLock":
            break;
        case "Shift":
            break;
        case "Control":
            break;
        case "Backspace":
            val = val.slice(0, val.length - 1);
            break;
        default:
            val += key;
            break;
    }

    return val;
}


const searchByName = () => {

    input.addEventListener("keydown", (e) => {
        let val = input.value;
        val = checkCondition(val, e.key);

        let filteredData = data.filter((obj) => {
            return obj.name.toLowerCase().includes(val.toLowerCase());
        })

        displayData(filteredData);
    })

}


window.addEventListener("load", async () => {
    data = await getData();
    displayData(data);
    displayRegionalData();
    searchByName();
})