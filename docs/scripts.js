function openMenu(event) {
 console.log("openMenu");
 // setLinkClick();
 var tocContainer = document.getElementById("menu");
 var closeButton = document.getElementById("menu-button");
 tocContainer.style.left = "0";
 closeButton.innerHTML = "　";
 event.stopPropagation(); // クリックイベントの伝播を停止
}

function closeMenu(event) {
 console.log("closeMenu");
 var tocContainer = document.getElementById("menu");
 var closeButton = document.getElementById("menu-button");
 if (closeButton.innerHTML != "　") { return; }
 // removeLinkClick();
 tocContainer.style.left = "-220px";
 closeButton.innerHTML = "&#9776;";

}

// function loadToc() {
//  var tocContainer = document.getElementById("menu");
//  var xhr = new XMLHttpRequest();
//  xhr.open("GET", "LeftPage.htm", true);
//  xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//    tocContainer.innerHTML = xhr.responseText;
//   }
//  };
//  xhr.send();
// }

function loadSection(url, id) {
 var element = document.getElementById(id);
 var xhr = new XMLHttpRequest();
 xhr.open("GET", url, true);
 xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
   element.innerHTML = xhr.responseText;
  }
 };
 xhr.send();
}

function loadMenu(url) {
 var xhr = new XMLHttpRequest();
 xhr.open("GET", url, true);
 xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
   // 外部HTMLコンテンツを解析してDOMツリーを作成
   var parser = new DOMParser();
   var externalDoc = parser.parseFromString(xhr.responseText, "text/html");
   // 指定したタグの前に外部HTMLの内容を挿入
   var element = document.getElementsByClassName("WordSection1")[0];
   element.parentNode.insertBefore(externalDoc.getElementById("menu"), element);
  }
 };
 xhr.send();
}

function linkClick(event) {
 event.preventDefault(); // リンクのデフォルト動作をキャンセル
 console.log("linkClick");
 removeLinkClick();
 closeMenu(event);
 var url = this.getAttribute("href");
 loadSection(url, "content");
}

function setLinkClick() {
 console.log("setLinkClick");
 // すべての<a>要素に対して処理を追加
 var linkElements = document.getElementById("toc-container").querySelectorAll("a");
 linkElements.forEach(function (linkElement) {
  linkElement.addEventListener("click", linkClick);
 });
}

function removeLinkClick() {
 console.log("removeLinkClick");
 // すべての<a>要素に対して処理を追加
 var linkElements = document.getElementById("toc-container").querySelectorAll("a");
 linkElements.forEach(function (linkElement) {
  linkElement.removeEventListener("click", linkClick);
 });
}

// ページ読み込み時にsection1.htmlをデフォルトで表示
window.onload = function () {
 loadMenu('LeftPage.htm');
 createMenuButton();
 // loadSection('Introduction.htm', "content");
}


function createMenuButton() {
 var newDiv = document.createElement("div");
 newDiv.textContent = "☰";
 newDiv.id = "menu-button";  // IDを付与

 // クリックイベントを割り当てる
 newDiv.addEventListener("click", openMenu);

 // 特定のIDを持つ要素の後ろに新しいdiv要素を挿入
 var element = document.getElementsByClassName("WordSection1")[0];
 element.insertAdjacentElement("afterbegin", newDiv);
}


