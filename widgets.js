let list_rels = [];
let elements =
  '{ "elements" : [' +
  '{ "name":"Relay 1", "vPin":"V2", "vPinMode":"V1", "mode":"MANUAL", "state":"0", "led":"V21", "onTime":"18:00", "offTime":"23:15" },' +
  '{ "name":"Relay 2", "vPin":"V4", "vPinMode":"V3", "mode":"MANUAL", "state":"0", "led":"V22", "onTime":"18:00", "offTime":"23:15" },' +
  '{ "name":"Relay 3", "vPin":"V6", "vPinMode":"V5", "mode":"MANUAL", "state":"0", "led":"V23", "onTime":"18:00", "offTime":"23:15" },' +
  '{ "name":"Relay 4", "vPin":"V8", "vPinMode":"V7", "mode":"MANUAL", "state":"0", "led":"V24", "onTime":"18:00", "offTime":"23:15" },' +
  '{ "name":"Relay 5", "vPin":"V10", "vPinMode":"V9", "mode":"MANUAL", "state":"0", "led":"V25", "onTime":"18:00", "offTime":"23:15" },' +
  '{ "name":"Relay 6", "vPin":"V12", "vPinMode":"V11", "mode":"MANUAL", "state":"0", "led":"V26", "onTime":"18:00", "offTime":"23:15" },' +
  '{ "name":"Pwm 7", "vPin":"V14",  "mode":"MANUAL", "state":"0",  "onTime":"18:00", "offTime":"23:15" },' +
  '{ "name":"Pwm 8", "vPin":"V15",  "mode":"MANUAL", "state":"0",  "onTime":"18:00", "offTime":"23:15" }' +
  "]}";

let obj = new Object();



let server = "https://api.blynk.tk/";
let token = "fu9VBk46dSwdxjxKdgG3A0pMvHyOj2U1";
let type_request = ["/get/", "/update/"];
let query_value = "?value=";
let href_action = "https://api.blynk.tk/" + token + type_request[1]; // + vPin + "?value=" // + value

let index = 0;
let vPin = "";
let vLed = "";

// for (let x = 0; x < 14; x += 2) {
//   index++;
//   if (index < 7) {
// vLed = obj.elements[index-1].led;
// list_vpins.push( obj.elements[index-1].vPin);
//   }
// }
// console.log("list_vpins:", list_vpins);




if (localStorage.getItem("relays")) {
  obj = JSON.parse(localStorage.getItem("relays"));
  list_rels = obj.elements;
  console.log("\nObject relays:", obj, "\n");
}
else {
  obj = JSON.parse(elements);   // console.log("obj:", obj);
  list_rels = obj.elements;     // console.log("list_rels:", list_rels);
}

function range_handler(el) {
  let val = el.value; 
  let id = el.id;
  let i = parseInt(id.substring(id.indexOf(" ")))-1;
  console.log("id:", id, "    val:", val)
  obj.elements[i]["state"] = val;
  el.setAttribute("data-pwm", val);
  el.previousSibling.innerHTML = val;
}


function time_handler(el) {
  let dt = el.value;
  let id = el.id;
  let i = parseInt(id.substring(id.indexOf(" ")))-1;

  if (id.includes("onTime")) {
    obj.elements[i]["onTime"] = dt;
  }
  else if (id.includes("offTime")) {
    obj.elements[i]["offTime"] = dt;   
  }
  el.setAttribute("data-time", dt);
  el.setAttribute("value", dt);
}


// function namePage() {
//   let hr = window.location.href;
//   let page = hr.substring(hr.lastIndexOf("/") + 1, hr.lastIndexOf(".html"));   console.log("page:", page);
//   return page;
// }

document.addEventListener("DOMContentLoaded", function (event) {

  let doc = document;
  let btn_mode = "";
  let on_time = "";
  let off_time = "";
  let btn_toggle = "";
  let slider = "";
  let name_label = "";
  let value_label = "";
  let range = "";

  for (let x = 0; x < list_rels.length; x++) {
    let row_item = doc.createElement("div");
    // console.log("list_rels:", list_rels[x]);      
    row_item.setAttribute("class", "row  my-1 mx-1 p-1 rounded-2 bg-light "); // row_item  btn-group   border border-dark rounded-1 bg-light

    btn_mode = doc.createElement("button");
    btn_mode.id = "Mode " + (x + 1);
    btn_mode.style.maXwidth = 100 + 'px';

    btn_mode.setAttribute("data-pin", list_rels[x].vPinMode);
    btn_mode.setAttribute("data-action", "mode");
    btn_mode.setAttribute("data-mode", list_rels[x].mode);
    let btn_color = list_rels[x].mode === "AUTO" ? "warning" : "info"
    btn_mode.setAttribute("class", "col-sm btn btn-" + btn_color + " m-1 p-1");
    btn_mode.innerHTML = btn_mode.dataset.mode;
    // row_item.appendChild(btn_mode); 

    // const timeControl = document.querySelector('input[type="time"]');  // timeControl.value = "15:30";
    // let time_form = doc.createElement("div");
    // time_form.setAttribute("class", "col-6 row");

    on_time = doc.createElement("input");
    on_time.setAttribute("type", "time");
    on_time.style.maXwidth = 100 + 'px';
    on_time.setAttribute("id", "onTime " + (x + 1));
    on_time.setAttribute("class", "col rounded-1 m-1 "); //list_rels[x].mode === "AUTO" ? "btn btn-warning m-1 p-1" : "btn btn-secondary m-1 p-1");  //  "rounded-1 "
    on_time.setAttribute("value", list_rels[x].onTime);
    on_time.setAttribute("data-time", list_rels[x].onTime);
    on_time.setAttribute("onchange", "time_handler(this)"); 
    // row_item.appendChild(on_time);


    off_time = doc.createElement("input");
    off_time.style.maXwidth = 100 + 'px';
    off_time.setAttribute("type", "time");
    off_time.setAttribute("id", "offTime " + (x + 1));
    off_time.setAttribute("class", "col rounded-1 m-1 "); // list_rels[x].mode === "AUTO" ? "btn btn-warning m-1 p-1" : "btn btn-secondary m-1 p-1"); 
    off_time.setAttribute("value", list_rels[x].offTime);
    off_time.setAttribute("data-time", list_rels[x].offTime);
    off_time.setAttribute("onchange", "time_handler(this)");
    // row_item.appendChild(off_time);
  // row_item.appendChild(time_form);
 
    if((list_rels[x].name).includes("Relay ")) {  
    btn_toggle = doc.createElement("button");
    btn_toggle.setAttribute("data-action", "toggle");
    btn_toggle.setAttribute("data-pin", list_rels[x].vPin);
    btn_toggle.setAttribute("data-state", list_rels[x].state);
    btn_toggle.setAttribute("id", list_rels[x].name);
    let btn_color = list_rels[x].state === "1" ? "danger " : "success "
    btn_toggle.setAttribute("class", "col-sm btn btn-"+ btn_color +" m-1 p-1");
    btn_toggle.innerHTML = list_rels[x].name;

    row_item.appendChild(btn_mode);
    row_item.appendChild(on_time);
    row_item.appendChild(off_time);
  
    row_item.appendChild(btn_toggle);    
    doc.getElementById("container").appendChild(row_item);
  }

  else if(list_rels[x].name.includes("Pwm ")){

    btn_mode.setAttribute("class", "col-sm btn btn-" + btn_color + " m-1 p-1");
    on_time.setAttribute("class", "col-sm rounded-1 m-1 ");
    off_time.setAttribute("class", "col-sm rounded-1 m-1 ");
    
    slider = doc.createElement("div");
    slider.setAttribute("class", " col ");
     row_item.appendChild(btn_mode);  
     row_item.appendChild(on_time);  
     row_item.appendChild(off_time);  

    name_label = doc.createElement("label");
    name_label.for =  "Pwm "+ (x + 1); 
    name_label.className = "col text-primary p-1 m-1 h6"; 
    name_label.innerHTML = list_rels[x].name;
    slider.appendChild(name_label);  

 
    value_label = doc.createElement("text");
    value_label.for =  "Pwm "+ (x + 1);
    value_label.className = "col text-danger p-1 mx-auto h6"; 
    value_label.innerHTML = list_rels[x].state;
    slider.appendChild(value_label); 

    range = doc.createElement("input");
    range.type = "range";
    range.id = "Pwm "+ (x + 1);
    range.className = "row mx-auto float-end align-middle"; 
    range.value = list_rels[x].state;
    range.dataset.pin = list_rels[x].vPin;    
    range.dataset.pwm = list_rels[x].state;
    // range.class = "col m-1 form-range ";  // data_atrs :  DOMStringMap {action: 'toggle', pin: 'V6', state: '0'}
    slider.appendChild(range); 

    row_item.appendChild(slider);

  }
  doc.getElementById("container2").appendChild(row_item);

  }
});

/* <label for="customRange" class="form-label">Custom range</label>
<input type="range" class="form-range" id="customRange" name="points"> */

function httpPost(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true); // false for synchronous request
  xhr.send(null);
  return xhr.responseText;
}

function httpGet(url, pin, value) {
  var xhr = new XMLHttpRequest();
  let URL = String(url + pin + query_value + value)
  console.log("URL : ", URL);

  xhr.open("GET", URL, true); // false for synchronous request
  xhr.send(null);
  return xhr.responseText;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("click", function (event) {
  let item = event.target; 
  let pin = "";
  let value = "";
  let data_atrs = item.dataset;  console.log("data_atrs : ", data_atrs); 

  let id = item.getAttribute("id"); console.log("ID : ", id);
  let i = parseInt(id.substring(id.indexOf(" ")));
  i = i - 1;

  if (data_atrs.hasOwnProperty("ontime") || data_atrs.hasOwnProperty("offtime")) {
    // console.log("input time clicked : ", data_atrs);
    return;
  }

  else if (data_atrs.hasOwnProperty("mode")) {
    if (data_atrs.mode === "MANUAL") { value = "AUTO", state = "1"; }
    else { value = "MANUAL", state = '0'; }

    pin = data_atrs.pin;
    obj.elements[i]["mode"] = value;    // console.log("obj.elements${[i]} : ", obj.elements[i]);
    value === "AUTO" ? item.setAttribute("class", "col btn btn-warning m-1 p-1") : item.setAttribute("class", "col btn btn-info m-1 p-1");

    item.dataset.mode = value;
    item.innerHTML = value;

  }
  else if (data_atrs.hasOwnProperty("state")) {
    pin = data_atrs.pin;   
    state = item.dataset.state === "1" ? "0" : "1";   
    item.dataset.state = state;
    obj.elements[i]["state"] = state;  
    state === "1" ? item.setAttribute("class", "col btn btn-danger m-1 p-1") : item.setAttribute("class", "col btn btn-success m-1 p-1");
  } 
  
  else if (data_atrs.hasOwnProperty("pwm")) {
    pin = data_atrs.pin;     
    state = item.value;    
    item.dataset.pwm = state;
    obj.elements[i]["state"] = state;  
    console.log(pin, "=",  state);
    let v = item;  
    console.log("v", "=",  v.previousSibling);
     v.previousSibling.innerText = state;
    // document.getElementById("")
    // state === "1" ? item.setAttribute("class", "col btn btn-danger m-1 p-1") : item.setAttribute("class", "col btn btn-success m-1 p-1");
  }
  httpGet(href_action, pin, state);
  localStorage.setItem("relays", JSON.stringify(obj));
  console.log("data_atrs : ", data_atrs);

});

    // time_form.appendChild(off_time);
    // row_item.appendChild(time_form);

    // let wgt = doc.createDocumentFragment();

    // let ledWgt = doc.createElement("div");
    // ledWgt.setAttribute("class", " btn btn-light ");

    // let led = doc.createElement("div");
    // led.setAttribute("class", list_rels[x].state == "1" ? "led on m-1 p-1" : "led m-1 p-1");
    // ledWgt.appendChild(led);
    // wgt.appendChild(ledWgt);
    // row_item.appendChild(wgt);

    // let led = item.previousSibling;
    // let ledwidget = led.querySelector(".led");
    // state === "1" ? ledwidget.classList.add("on") : ledwidget.classList.remove("on");

    
// let span_counter = "";
// let quantity = 0;

// if (act === "minus" || act === "plus") {
//   name_elem = item.closest("[name]").getAttribute("name");
//   let elem = doc.querySelector("[name=" + CSS.escape(name_elem) + "]");

//   let counterWrapper = item.closest(".btn-group-sm");
//   span_counter = counterWrapper.querySelector("[span_counter]");

//   if (act === "plus") {
//     quantity = ++span_counter.innerText;
//     span_counter.innerText = quantity;
//     span_counter.dataset.counter = quantity;

//     if (parseInt(quantity) > 0) {
//       elem.classList.add("border-info", "border-2", "bg-light");
//     }
//   }
//   if (act === "minus") {
//     quantity = --span_counter.innerText;
//     span_counter.innerText = quantity;

//     if (parseInt(span_counter.innerText) < 1) {
//       delete obj_items[name_elem];
//       quantity = 0;
//       span_counter.innerText = quantity;
//       elem.classList.remove("border-info", "border-2", "bg-light");
//     }
//     if (parseInt(span_counter.innerText) > 0) {
//       console.log("targ.classList:", item.classList);
//     }
//   }

//   if (parseInt(span_counter.innerText) > 0) {
//     obj_items[name_elem] = parseInt(span_counter.innerText);
//   }

//   if (namePage === "ware"){
//     localStorage.setItem("wares", JSON.stringify(obj_items));
//     cnt_ware = countObjectKeys(obj_items);
//     span_counter.innerText = cnt_ware;
//     doc.getElementById("cnt_wares").innerText = cnt_ware;

//   }
//   else{
//     localStorage.setItem("products", JSON.stringify(obj_items));
//     cnt_prod = countObjectKeys(obj_items);
//     span_counter.innerText = cnt_prod;
//     doc.getElementById("cnt_products").innerText = cnt_prod;
//   }

//   summ_cnt = cnt_prod + cnt_ware;
//   console.log("summ_cnt", summ_cnt);
//   console.log("obj_items", obj_items);

//   doc.getElementById("cnt_cart").innerText = summ_cnt;
//   console.log(name_elem, act, span_counter.textContent);
// }
// });
