const listDiv = document.getElementById("list");
const box = document.getElementById("calculatorBox");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if(listDiv){
  fetch("/api/calculators")
    .then(r=>r.json())
    .then(data=>{
      data.forEach(c=>{
        const d = document.createElement("div");
        d.className="card";
        d.innerHTML=`<b>${c.name}</b><br><small>${c.category}</small>`;
        d.onclick=()=>location.href=`calculator.html?id=${c.id}`;
        listDiv.appendChild(d);
      });
    });
}

if(box && id){
  fetch("/api/calc/"+id)
    .then(r=>r.json())
    .then(c=>{
      document.getElementById("title").innerText = c.name;

      if(id==="bmi") renderBMI();
      else if(id==="age") renderAge();
      else if(id==="percentage") renderPercentage();
      else renderComingSoon();
    });
}

function renderComingSoon(){
  box.innerHTML = `
  <div class="calcBox">
    <h3>Calculator coming soon</h3>
    <p>This calculator is already listed and ready to be implemented.</p>
  </div>`;
}

/* ======================
   REAL CALCULATORS
====================== */

function renderBMI(){
  box.innerHTML=`
  <div class="calcBox">
    <input id="w" type="number" placeholder="Weight (kg)">
    <input id="h" type="number" placeholder="Height (cm)">
    <button onclick="calcBMI()">Calculate</button>
    <h3 id="r"></h3>
  </div>`;
}

function calcBMI(){
  let w=+document.getElementById("w").value;
  let h=+document.getElementById("h").value/100;
  let bmi=(w/(h*h)).toFixed(2);
  document.getElementById("r").innerText="BMI : "+bmi;
}

function renderAge(){
  box.innerHTML=`
  <div class="calcBox">
    <input id="dob" type="date">
    <button onclick="calcAge()">Calculate</button>
    <h3 id="r"></h3>
  </div>`;
}

function calcAge(){
  let d=new Date(document.getElementById("dob").value);
  let diff=Date.now()-d.getTime();
  let age=new Date(diff).getUTCFullYear()-1970;
  document.getElementById("r").innerText="Age : "+age;
}

function renderPercentage(){
  box.innerHTML=`
  <div class="calcBox">
    <input id="a" type="number" placeholder="Value">
    <input id="b" type="number" placeholder="Total">
    <button onclick="calcPer()">Calculate</button>
    <h3 id="r"></h3>
  </div>`;
}

function calcPer(){
  let a=+document.getElementById("a").value;
  let b=+document.getElementById("b").value;
  let p=(a/b*100).toFixed(2);
  document.getElementById("r").innerText=p+" %";
}
