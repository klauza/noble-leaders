var output = document.getElementById('output');
var ajaxhttp = new XMLHttpRequest();
var url = "json.json";

ajaxhttp.open("GET", url, true); // true -> async
ajaxhttp.setRequestHeader("content-type", "application/json"); // telling server what type of content we expect to receive
ajaxhttp.onreadystatechange = function(){
  if(ajaxhttp.readyState == 4 && ajaxhttp.status == 200){
    var jcontent = JSON.parse(ajaxhttp.responseText);
    console.log(jcontent);

    fillUi(jcontent);   // sending data to the function
  }
}

ajaxhttp.send(null);

const fillUi = (data) => {
  output.innerHTML = `
  My name is ${data.firstname} ${data.lastname} <br/>
  and my interests are ${data.interests}
  `;
}


