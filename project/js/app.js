let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

function createOption(x,y,z){
    let o =document.createElement("option");
    let t =document.createTextNode(y);
    o.setAttribute("value",toNum(z));
    o.appendChild(t);
    x.appendChild(o);
}
function toNum(x){
    return Number( x.replace(",",""));
}

for(x in data.rates){
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);

}
function createTr(x){

    let rowSpacer = document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }

    let tr= document.createElement("tr");
    x.map(function(el){

        let td = document.createElement("td");
        let t = document.createTextNode(el);
        td.appendChild(t);
        tr.appendChild(td);

    })
    
    historyList.appendChild(tr);
   
}

function store(){
    localStorage.setItem("record",historyList.innerHTML);
}
document.getElementById("calc").addEventListener("submit",function(e){
     // get state
     e.preventDefault();
     let x= input.value;
     let y= from.value;
     let z= to.value;
     

     //process state
     let fromtext = from.options[from.selectedIndex].innerText;
     let totext = to.options[to.selectedIndex].innerText;
     let first = x * y;
     let second = first/z;
     let resultNum = (second.toFixed(2));
    let date = new Date().toLocaleString();
     let arr = [date,fromtext,totext,resultNum];
    createTr(arr);
    store();



     
     //set state 
    result.innerHTML = resultNum ;
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
    });

    
    (function (){
        if (localStorage.getItem("record")){
            historyList.innerHTML = localStorage.getItem("record");
        }else{
            historyList.innerHTML='<tr id="rowSpacer"><td colspan="4">There is no record</td></tr>';
        }
    })();


   

