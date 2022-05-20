let getAll = (selector, parent) => parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector);
let get = (selector) => document.querySelector(selector);

const createCompany = () => {
  const [name, code, profile, city, zip, address, email] = [
    get('#name').value,
    get('#code').value,
    get('input[name="profile"]:checked').value,
    get('#city').value,
    get('#zip').value,
    get('#address').value,
    get('#email').value,
  ]
  const company = {};
  company.name = name;
  company.code = code;
  company.profile = profile;
  company.city = city;
  company.zip = zip;
  company.address = address;
  company.email = email;
  console.log(company);
  localStorage.setItem(`company_id:${company.code}`, JSON.stringify(company));
}

const eraseIcons = document.querySelectorAll('.erase')
for (let eraseIcon of eraseIcons) {
  eraseIcon.addEventListener('click', function() {
    this.parentNode.children[0].value = '';
  })
}

const buttonAddToTable = get('.add')
buttonAddToTable.addEventListener('click', () => createCompany())

