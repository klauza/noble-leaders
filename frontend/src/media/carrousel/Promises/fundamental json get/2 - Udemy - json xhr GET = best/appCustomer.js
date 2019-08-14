// json - javascript object notation

document.getElementById('button1').addEventListener('click', loadCustomer);

function loadCustomer(e){
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'customer.json', true);

  xhr.onload = function(){
    
    if(this.status === 200){
      // console.log(this.responseText)

      const customer = JSON.parse(this.responseText);
      
      const output = `
      <ul>
        <li>ID: ${customer.id}</li>
        <li>Name: ${customer.name}</li>
        <li>Company: ${customer.company}</li>
        <li>Phone: ${customer.phone}</li>
      `;

      document.getElementById('customer').innerHTML = output;
    }

    
  }

  xhr.send();

  // e.preventDefault();
}