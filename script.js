
let list_id = [
  "chicken",
  "ogurtcy",
  "tomato",
  "pekinka",
  "carrot",
  "salat",
  "rukkola",
  "spinach",
  "rosemaryn",
  "thyme",
  "imbir",
  "milk",
  "maionez",
  "ogurchiki",
  "olive",
]
let list_images = [
  "images/chicken.png",
  "images/ogurtcy.png",
  "images/tomato.png",
  "images/pepper.png",
  "images/pekinka.png",
  "images/carrot.png",
  "images/salat.png",
  "images/rukkola.png",
  "images/spinach.png",
  "images/rosemaryn.png",
  "images/thyme.png",
  "images/imbir.png",
  "images/milk.png",
  "images/maionez.png",
  "images/ogurchiki.png",
  "images/olive.png",
]

let list_products = [
  "Курица",
  "Огурцы",
  "Помидоры",
  "Перец",
  "Пекинка",
  "Морковь",
  "Салат",
  "Руккола",
  "Шпинат",
  "Розмарин",
  "Тимьян",
  "Имбирь",
  "Молоко",
  "Майонез",
  "Огурчики",
  "Оливки",
];


let all_cnt = 0;
let cnt = 0;
let allOrder = [];
let order_item = {};

let tg = {
  token: "6422224583:AAHljlVioG6m9HnBFjLmeKOFX1YPEWxNqEk",
  chat_id: 468763535,
};

let btn_submit = document.getElementById("submit");
// btn_submit.addEventListener(onclick, sendMessage(order_item))

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("Event:", event);

  let doc = document;
  let docCard = doc.createDocumentFragment();

  for (let x = 0; x < list_products.length; x++) {
    let card = doc.createElement("div");
    card.setAttribute("name", list_id[x]);
    card.setAttribute("class", "card_product");

    let quantity = doc.createElement("text");
    quantity.setAttribute("id", list_id[x]);
    quantity.setAttribute("class", "counter");
    quantity.innerHTML = 0;
    quantity.style.visibility = "hidden";

    card.appendChild(quantity);

    let img_block = doc.createElement("div");
    img_block.setAttribute("class", "image_block");

    let img_png = doc.createElement("img");
    img_png.setAttribute("src", list_images[x]);
    img_png.setAttribute("alt", "imgage");

    img_block.appendChild(img_png);
    card.appendChild(img_block);

    let name_lbl = doc.createElement("h4");
    name_lbl.setAttribute("class", "card_title");
    name_lbl.innerHTML = list_products[x];
    card.appendChild(name_lbl);

    let btn_block = doc.createElement("div");
    btn_block.setAttribute("class", "btn_block");

    let btn_minus = doc.createElement("button");
    btn_minus.textContent = "-";
    btn_minus.setAttribute("class", "decrement btn");
    btn_minus.setAttribute("id", list_products[x] + "-");
    btn_minus.setAttribute("onclick", "changeValue(this.id)");

    let btn_plus = doc.createElement("button");
    btn_plus.textContent = "+";
    btn_plus.setAttribute("class", "increment btn");
    btn_plus.setAttribute("id", list_products[x] + "+");
    btn_plus.setAttribute("onclick", "changeValue(this.id)");

    btn_block.appendChild(btn_minus);
    btn_block.appendChild(btn_plus);
    card.appendChild(btn_block);
    docCard.appendChild(card);
  }
  doc.getElementById("container").appendChild(docCard);
});



function changeValue(elemnt) {
  let btn = document.getElementById(elemnt); // console.log("btn clicked ", btn)
  let parentCard = btn.parentNode.parentNode; // console.log("parentCard ", parentCard)
  let children = parentCard.childNodes; // console.log("children ", children)  // elemnt[elemnt.length - 1]
  let quanty = children[0]; //   console.log("quanty ", quanty)   // let quanty = children[0].childNodes[0]
  let name = elemnt.substring(0, elemnt.length - 1); //console.log("name ", name)
  cnt = Number(quanty.innerHTML);

  if (btn.getAttribute("id").endsWith("+")) {
    cnt++;
    order_item[name] = cnt;
  } else if (btn.getAttribute("id").endsWith("-") && cnt > 0) {
    cnt--;
    if (cnt < 0) {
      quanty.style.visibility = "hidden"; // btn.setAttribute("disabled", true);
    } else {
      order_item[name] = cnt; // btn.setAttribute("disabled", false);
    }
  }
  console.log("order_item :", order_item);
  localStorage.setItem("order", JSON.stringify(order_item));
  quanty.innerHTML = cnt;

  if (cnt == 0) {
    quanty.style.style.visibility = "hidden";
  } else {
    quanty.style.visibility = "visible";
  }

  // let lenObj = countObjectProperties(order_item)

  for (let key in order_item) {
    let q = order_item[key];
    console.log(key + ": " + q);
  }

  // console.log("Всего продуктов: ", lenObj);
  // all_cnt = cnt;
  // console.log(elemnt.substring(0, elemnt.length - 1), cnt);
  // значения (которое в строковом формате) в целое число counter.innerText = parseInt(counter.innerText) + 1
}



btn_submit.addEventListener("click", function () {
  sendMessage(order_item)
});


function sendMessage(msg) {
  const url = `https://api.telegram.org/bot${tg.token}/sendMessage`; // The url to request

  const obj = {
    chat_id: tg.chat_id, // Telegram chat id
    text: msg, // The text to send
  };

  const xht = new XMLHttpRequest();
  xht.open("POST", url, true);
  xht.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xht.send(JSON.stringify(obj, undefined, 4));
  console.log("\nЗаявка: ", msg);
}

// function countObjectProperties(params) {
//   var count = 0;
//   for (var i in params) if (params.hasOwnProperty(i)) count++;
//   return count;
// }



// function getKeyByValue(object, value) {
//   return Object.keys(object).find((key) => object[key] === value);
// }


// for (let i = 0; i < lenObj; i++) {
//     let val = getKeyByValue(order_item, name)
//     console.log("val", val)
//     // let q = element
// }

// var name = children[i].getAttribute("id")||children[i].getAttribute("class");
// elemnts[i]=name;

// let children = [].slice.call(document.getElementById('container').getElementsByTagName('*'), 0);

// let elemnts = new Array(children.length);
// let arrayLength = children.length;
// for (let i = 0; i < arrayLength; i++) {
//     let name = children[i].getAttribute("id") || children[i].getAttribute("class");
//     elemnts[i] = name;
// }
// document.getElementById('output').innerHTML = elemnts.join('\</br>');
