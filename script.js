let dropdowns = document.querySelectorAll(".selectcontain select");
let btn = document.querySelector("form button");
let fromcurr= document.querySelector(".from select");
let tocurr= document.querySelector(".to select");
let msg= document.querySelector(".msg");


let calculate = async()=>{
    let amt=  document.querySelector("form input");
    console.log(amt.value);
    console.log(fromcurr.value,tocurr.value) 
    let URL= `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    rate = await data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
    console.log(rate)
    msg.innerText=`${amt.value} ${fromcurr.value} = ${rate*amt.value} ${tocurr.value}`;
    // let response =await fetch(URL);
    // let rate = data[tocurr.value.toLowerCase()]; old api syntax
}

btn.addEventListener("click",(async (evt)=>{
    evt.preventDefault();
    calculate();
}));

const updateflag=(element)=>{
    console.log(countrylist[element.value]);
    let newsrc = `https://flagsapi.com/${countrylist[element.value]}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newsrc;
};

for (let select of dropdowns){  //there are two dropdown from and to first is from
    for(currcode in countrylist)
        {
            let newoption = document.createElement("option");  // create new option and add it in select of from first
            newoption.innerText= currcode;
            newoption.value= currcode;
            select.append(newoption)

            if(select.name ==="from" && newoption.value =="USD")   //Condition to make usd and inr selected
            {
                newoption.selected="selected";
            }
            else if(select.name ==="to" && newoption.value =="INR")
                {
                    newoption.selected="selected";
                }
        }
select.addEventListener("change",((evt)=>{     //first we change select in from so we add el and change the flag
    updateflag(evt.target);
}));
}




