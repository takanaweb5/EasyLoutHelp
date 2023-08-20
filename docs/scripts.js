function openMenu(event) {
 var menu = document.getElementById("menu");
 var menuButton = document.getElementById("menu-button");
 menu.style.left = "0";
 menuButton.innerHTML = "　";
 event.stopPropagation(); // クリックイベントの伝播を停止
}

function closeMenu(event) {
 var menu = document.getElementById("menu");
 var menuButton = document.getElementById("menu-button");
 if (menuButton.innerHTML != "　") { return; }
 menu.style.left = "-200px";
 menuButton.innerHTML = "☰";
}

function makeMenu() {
 const url = "LeftPage.htm";
 var xhr = new XMLHttpRequest();
 xhr.open("GET", url, true);
 xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
   // 外部HTMLコンテンツを解析してDOMツリーを作成
   var parser = new DOMParser();
   var externalDoc = parser.parseFromString(xhr.responseText, "text/html");
   // 指定したタグの前に外部HTMLの内容を挿入
   var main = document.getElementsByClassName("WordSection1")[0];
   main.parentNode.insertBefore(externalDoc.getElementById("menu"), main);
  }
 };
 xhr.send();
}

// ページ読み込み時
window.onload = function () {
 makeMenu();
 const main = document.getElementsByClassName("WordSection1")[0];
 createMenuButton(main);
 main.addEventListener("click", closeMenu);
}

function createMenuButton(main) {
 const newDiv = document.createElement("div");
 newDiv.textContent = "☰";
 newDiv.id = "menu-button";  // IDを付与
 newDiv.addEventListener("click", openMenu);
 main.insertAdjacentElement("afterbegin", newDiv);
}


