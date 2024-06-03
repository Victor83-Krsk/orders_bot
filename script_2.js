
let list_id = [
    "Stakan",
    "Stakan",
    "Stakan",
    "Stakan",
    "Stakan",
    "Stakan",
    "Stakan",
    "Stakan",
    
]

let list_products = [
    "Стакан",
    "Стакан",
    "Стакан",
    "Стакан",
    "Стакан",
    "Стакан",
    "Стакан",
    "Стакан",    
]

let list_images = [
    "./images/stakan.png",
    "./images/stakan.png",
    "./images/stakan.png",
    "./images/stakan.png",
    "./images/stakan.png",
    "./images/stakan.png",
    "./images/stakan.png",
    "./images/stakan.png",    
]

let cnt = 0
let order_item = {}
let tg = {
    token: "6422224583:AAHljlVioG6m9HnBFjLmeKOFX1YPEWxNqEk",
    chat_id: 468763535
};

let str_msg = "";
let arr_msgs = [];

// btn_submit.addEventListener(onclick, sendMessage(order_item))
let btn_submit = document.getElementById("submit");


document.addEventListener("DOMContentLoaded", function (event) {
    console.log("Event:", event)
    let doc = document;
    let docCard = doc.createDocumentFragment();

    for (let x = 0; x < list_products.length; x++) {
        let card = doc.createElement('div');
        card.setAttribute('class', "card_product");
        let quantity = doc.createElement('text');        
        quantity.setAttribute('id', `${list_id[x]}`);
        quantity.setAttribute('class', 'counter');
        quantity.innerHTML = 0;
        quantity.style.visibility = "hidden";
      
        card.appendChild(quantity);

        let img_block = doc.createElement('div');
        img_block.setAttribute('class', "image_block");

        let img_png = doc.createElement('img');
        img_png.setAttribute('src', list_images[x]);
        img_png.setAttribute('alt', "imgage");       

        img_block.appendChild(img_png);
        card.appendChild(img_block);

        let name_lbl = doc.createElement('h4');
        name_lbl.setAttribute('class', "card_title");
        name_lbl.innerHTML = list_products[x]
        card.appendChild(name_lbl);

        let btn_block = doc.createElement('div');
        btn_block.setAttribute('class', "btn_block");

        let btn_minus = doc.createElement('button');
        btn_minus.textContent = '-'
        btn_minus.setAttribute('class', 'decrement btn');
        btn_minus.setAttribute('id', list_products[x] + "-");
        btn_minus.setAttribute('onclick', 'changeValue(this.id)');
 
        let btn_plus = doc.createElement('button');
        btn_plus.textContent = '+'
        btn_plus.setAttribute('class', 'increment btn');
        btn_plus.setAttribute('id', list_products[x] + "+");
        btn_plus.setAttribute('onclick', 'changeValue(this.id)');

        btn_block.appendChild(btn_minus);
        btn_block.appendChild(btn_plus);
        card.appendChild(btn_block);
        docCard.appendChild(card);
    }
    doc.getElementById('container').appendChild(docCard);
});


function changeValue(elemnt) {
    let btn = document.getElementById(elemnt);   //  console.log("btn clicked ", btn) 
    let parentCard = btn.parentNode.parentNode;     // console.log("parentCard ", parentCard) 
    let children = parentCard.childNodes; // console.log("children ", children)  // elemnt[elemnt.length - 1]
    let quanty = children[0];  //   console.log("quanty ", quanty)   // let quanty = children[0].childNodes[0]
    let name = elemnt.substring(0, elemnt.length - 1);
    cnt = Number(quanty.innerHTML)
  
    if (btn.getAttribute("id").endsWith("+")) {
        cnt++;
        order_item[name] = cnt;
    }
    else if (btn.getAttribute("id").endsWith("-") && cnt > 0) {
        cnt--;
        if (cnt == 0) { 
            quanty.style.visibility = "hidden";
            delete order_item[name]; 
        }
        else {
            order_item[name] = cnt;
        }
    }

    quanty.innerHTML = cnt; 
    if (cnt == 0) {quanty.style.style.visibility = "hidden"; }
    else { quanty.style.visibility = "visible"; }

  
     // console.log(elemnt.substring(0, elemnt.length - 1), cnt);
     // значения (которое в строковом формате) в целое число counter.innerText = parseInt(counter.innerText) + 1
}


// function setMessage() {
//     for (let [key, value] of Object.entries(order_item)) {
//         if (key in Object.entries(order_item)) {
//             console.log("уже было");
//         }
//         else {
//             let str = `${key}:${value}`
//             console.log(str);           
//             if (arr_msgs.includes(str.startsWith(key)) == false ){
//                 arr_msgs.push(str)
//             }         
//         }
//     }
//     console.log("arr_msgs:", arr_msgs);
// }


btn_submit.addEventListener("click", function () {
    sendMessage(order_item)
});


function sendMessage(msg) {
    const url = `https://api.telegram.org/bot${tg.token}/sendMessage` // The url to request

    const obj = {
        chat_id: tg.chat_id, // Telegram chat id
        text: msg // The text to send
    };

    const xht = new XMLHttpRequest();
    xht.open("POST", url, true);
    xht.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xht.send(JSON.stringify(obj, undefined, 4));
}





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
