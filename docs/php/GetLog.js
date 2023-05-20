// XMLHttpRequestオブジェクト作成
var xmlhttp = createXmlHttp();

var url = "php/AccessLog.php";
var post = "href="      + encodeURIComponent(location.href)
         + "&referer="  + encodeURIComponent(document.referrer)
         + "&userAgent="+ encodeURIComponent(navigator.userAgent);
var url = url + "?" + post;

if (xmlhttp != null) {
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

function createXmlHttp(){
  if(window.ActiveXObject){
    //Windows IE用
    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        return new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        return null;
      }
    }
  }
  else if(window.XMLHttpRequest){
    //Windows IE以外のXMLHttpRequestオブジェクト実装ブラウザ用
    return new XMLHttpRequest();
  }
  else {
    return null;
  }
}
