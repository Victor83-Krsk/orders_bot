
let path = document.location.pathname;
console.log("path: ", path)



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

let obj_order = {};



// let btn_cancel = document.createElement('button');
// btn_cancel.textContent = 'отмена'
// btn_cancel.setAttribute('class', 'btn_cancel');
// btn_cancel.setAttribute('id', "cancel");
// btn_cancel.setAttribute('onclick', 'cancel_action()');
// let btn_next = document.createElement('button');
// btn_next.textContent = ' продолжить'
// btn_next.setAttribute('class', 'btn_next');
// btn_next.setAttribute('id', "cancel");
// btn_next.setAttribute('onclick', 'next_action()');
// document.getElementById('content').appendChild(btn_cancel)
// document.getElementById('content').appendChild(btn_next)


function gotoback(){
  console.log("goto back")
}



document.addEventListener("DOMContentLoaded", function (event) {
    console.log("Event:", event)
    if(localStorage.getItem("order")){
        obj_order = JSON.parse(localStorage.getItem("order"));         
        // displayMessages();
    }
    console.log("obj_order", obj_order);

    let doc = document;
    let docCard = doc.createDocumentFragment();
    let index = 0;

    for(let x in obj_order){
        let q = obj_order[x]           // console.log("key " + x + ': value ' + q);        
        index = list_products.indexOf(x)   //    console.log('index: ' + index);
        let card = doc.createElement('div');
        card.setAttribute('name', x);
        card.setAttribute('class', "card_product");
   
     
        let quantity = doc.createElement('text');        
        quantity.setAttribute('id', x);  //  `${list_id[x]}`
        quantity.setAttribute('class', 'counter');
        quantity.innerHTML = obj_order[x];
        quantity.style.visibility = "visibility";
        card.appendChild(quantity);
//////////////////////////////////////////////////////////////////////////

        let img_block = doc.createElement('div');
        img_block.setAttribute('class', "image_block");

        let img_png = doc.createElement('img');        
        img_png.setAttribute('src', list_images[index]);
        img_png.setAttribute('alt', "image");
        
        // console.log("list_images[x] path", list_images[index])
        
        img_block.appendChild(img_png);
        card.appendChild(img_block);

//////////////////////////////////////////////////////////////////////////           
        let name_lbl = doc.createElement('h4');
        name_lbl.setAttribute('class', "card_title");
        name_lbl.innerHTML = x;
        card.appendChild(name_lbl);

        let btn_block = doc.createElement('div');
        btn_block.setAttribute('class', "btn_block");

        let btn_minus = doc.createElement('button');
        btn_minus.textContent = '-'
        btn_minus.setAttribute('class', 'decrement btn');
        btn_minus.setAttribute('id', list_products[index] + "-");
        btn_minus.setAttribute('onclick', 'changeStatus(this.id)');
 
        let btn_plus = doc.createElement('button');
        btn_plus.textContent = '+'
        btn_plus.setAttribute('class', 'increment btn');
        btn_plus.setAttribute('id', list_products[index] + "+");
        btn_plus.setAttribute('onclick', 'changeStatus(this.id)');

        btn_block.appendChild(btn_minus);
        btn_block.appendChild(btn_plus);
        card.appendChild(btn_block);
        docCard.appendChild(card);   
    }

    doc.getElementById('container').appendChild(docCard);


});


function countObjectProperties(params) {
  var count = 0;
  for (var i in params) if (params.hasOwnProperty(i)) count++;
  return count;
}


function changeStatus(element) {
    let btn = document.getElementById(element);  console.log("btn clicked ", btn)
    let parentCard = btn.parentNode.parentNode; // console.log("parentCard ", parentCard)
    let children = parentCard.childNodes; // console.log("children ", children)  // element[element.length - 1]
    let quanty = children[0];  // console.log("quanty ", quanty)   // let quanty = children[0].childNodes[0]
    let quantyVal = quanty.textContent;     
    let name = element.substring(0, element.length - 1); // console.log("name ", name)
    cnt = Number(quanty.textContent);
  
    if (btn.getAttribute("id").endsWith("+")) {
      quantyVal++;
      obj_order[name] = quantyVal;
    } 
    else if (btn.getAttribute("id").endsWith("-") && quantyVal > 0) {
      quantyVal--;
      if (quantyVal < 0) {
        quanty.style.visibility = "hidden"; 
        // btn.setAttribute("disabled", true);
      } else {
        obj_order[name] = quantyVal; 
        // btn.setAttribute("disabled", false);
      }
    }
    console.log("quantyVal ", quantyVal) 
    console.log("obj_order :", obj_order);
    localStorage.setItem("order", JSON.stringify(obj_order));
    quanty.innerHTML = quantyVal;
  
    if (quantyVal == 0) {
      // parentCard.style.visibility = "hidden";
      parentCard.style.display = "none"
    } else {
      // parentCard.style.visibility = "visible";
      parentCard.style.display = "block"
    }
  
    let lenObj = countObjectProperties(obj_order)  
    for (let key in obj_order) {
      let q = obj_order[key];
      console.log(key + ": " + q);
    }
  
    }
  

  // function changeCheckbox(id) {
//   let chkbox = document.getElementById(id);   console.log("chkbox: ", chkbox);
//   let lbl = chkbox.nextElementSibling ;   console.log("lbl: ", lbl); 
//   let parentCard = chkbox.parentNode.parentNode;
//   let state = chkbox.checked;
//   if (state === true) { 
//     //  lbl.textContent = " Купил"
//     // parentCard.style.display = "none";
//   }
//   else {
       //  lbl.textContent = " "
//     //  parentCard.style.display = "block";
//     }
//   console.log("parentCard: ", parentCard);
// }

// function displayMessages() {
//     let displayMsg = "";
//     obj_order.forEach(function (item, i) { 
//         displayMsg += `
//             <li>
//                 <input type="checkbox"  id="item_${i}" ${item.checked ? 'checked':''} >
//                 <label class="${item.important ? 'important':''}"  for="item_${i}">${item.todo}</label>
//                 <input class="btnDell" id="btn_${i}" type="button" value="Удалить">

//             </li>
//         `;
        
//         todo.innerHTML = displayMsg;
//         console.log("function displayMessages item:", item);
//     });
// }


console.log("end cart js")
