let url="https://northwind.vercel.app/api/suppliers/"
let tbody=document.querySelector(".tbody")
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((supplier, index) => {
        tbody.innerHTML+=
        `<tr class="table-active">
        <td>${supplier.id}</td>
        <td>${supplier.companyName}</td>
        <td>${supplier.contactName}</td>
        <td>${supplier.contactTitle}</td>
        <td>${supplier.address?.country}</td>
        <td><button name="${index}" class="info btn btn-secondary">Info</button></td>
        <td><button name="${supplier.id}" class="delete btn btn-danger">Delete</button></td>
    </tr>`

              // INFO SUPPLIER START
let infos = document.querySelectorAll(".info");
infos.forEach(info=>{
  info.addEventListener("click", function(){
    Swal.fire({
      title: `<strong>Company Name: </strong>${data[info.name].companyName}`,
     html: `<strong>Contact Name: </strong>${data[info.name].contactName} <br>
     <strong>City:  </strong>${data[info.name].address?.city} <br>
     <strong>Country:</strong>${data[info.name].address?.country}`,
     footer: `${data[info.name].address?.phone}`
    });
});
})
// INFO SUPPLIER END

          // delete 
          let deletes = document.querySelectorAll(".delete");
          deletes.forEach(del=> {
            del.addEventListener("click", delete_func)
          })

        })

    

// POST START
let my_form=document.querySelector(".my_form")
my_form.addEventListener("submit", function (e) {
  let new_supplier = {
    companyName: {},
    address: {},
  };
  let company_name=document.querySelector(".company_name")
  let contact_name=document.querySelector(".contact_name")
  let contact_title=document.querySelector(".contact_title")
  let country=document.querySelector(".country")


  new_supplier.companyName = company_name.value;
  new_supplier.contactName = contact_name.value;
  new_supplier.contactTitle = contact_title.value;
  new_supplier.address.country = country.value;

  console.log(new_supplier);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new_supplier),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.id);


      tbody.innerHTML+=
        `<tr class="table-active">
        <td>${new_supplier.id}</td>
        <td>${new_supplier.companyName}</td>
        <td>${new_supplier.contactName}</td>
        <td>${new_supplier.contactTitle}</td>
        <td>${new_supplier.address?.country}</td>
        <td><button class="info btn btn-secondary">Info</button></td>
        <td><button name="${new_supplier.id}" class="delete btn btn-danger">Delete</button></td>
    </tr>`;
     
      // delete 
      let deletes = document.querySelectorAll(".delete");
deletes.forEach(del=> {
  del.addEventListener("click", delete_func)
})
// info
              let infos = document.querySelectorAll(".info");
              infos.forEach(info=>{
                info.addEventListener("click", function(){
                  Swal.fire({
                    title: `<strong>Company Name: </strong>${data[info.name].companyName}`,
                   html: `<strong>Contact Name: </strong>${data[info.name].contactName} <br>
                   <strong>City:  </strong>${data[info.name].address?.city} <br>
                   <strong>Country:</strong>${data[info.name].address?.country}`,
                   footer: `${data[info.name].address?.phone}`
                  });
              });
              })
    });

  e.preventDefault();
});
// POST END
})


// DELETE SUPPLIER START
let deletes = document.querySelectorAll(".delete");
deletes.forEach(del=> {
  del.addEventListener("click", delete_func)
})
function delete_func() {
  this.parentElement.parentElement.remove();
  console.log(this.parentElement.parentElement)
  console.log(this.name);
  fetch(url + this.name, {
    method: "Delete",
  });
};
// DELETE SUPPLIER END