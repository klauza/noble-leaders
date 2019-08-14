
fetch("auto.json")
  .then(response => response.json())
  .then(json => console.log(json));


  var stolc1 = await fetch("auto.json");
  console.log(stolc1);