// json - javascript object notation

document.getElementById('button2').addEventListener('click', loadCustomers);

function loadCustomers(e){
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'customers.json', true);

  xhr.onload = function(){
    
    if(this.status === 200){
      // console.log(this.responseText)

      const customers = JSON.parse(this.responseText);
      

      let output = '';
      customers.forEach(function(customer){
        output += `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone: ${customer.phone}</li>
        </ul>
        `;
      })

      

      document.getElementById('customers').innerHTML = output;
    }

    
  }

  xhr.send();

  // e.preventDefault();
}