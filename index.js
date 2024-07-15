document.addEventListener("DOMContentLoaded", function (event) {
    console.log("event:", event);
    let doc = document;

});

// let btn_ard = document.querySelector('#device');
// let btn_add = document.querySelector('#add_wgt');


// document.addEventListener("click", function (event) {
//     let item = event.target;
//     console.log("TARGET : ", item);

//     if (item.id === "start_stop") {
//         let curImg = item.getAttribute("src");

//         if (curImg.includes("stop")) {
//             item.setAttribute("src", "./img/play.png")
//             btn_ard.classList.add("invisible")
//             btn_add.classList.remove("invisible")

//         } else if (curImg.includes("play")){
//             item.setAttribute("src", "./img/stop.png")
//             btn_ard.classList.remove("invisible")
//             btn_add.classList.add("invisible")
//         }
//     }

//     if (item.id === "add_wgt") {
//        console.log("add widget clicked!")
//     }

// });
