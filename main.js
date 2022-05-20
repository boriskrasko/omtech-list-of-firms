let getAll = (selector, parent) => parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector);
let get = (selector) => document.querySelector(selector);

let companies = (localStorage.getItem('companies') !== null && localStorage.getItem('companies') != '') ? [...localStorage.getItem('companies').split(',')] : [];
localStorage.setItem('companies', companies);
let arrayOfKeys = ['name', 'code', 'profile', 'city', 'zip', 'address', 'email'];
for (let company of companies) {
  let companyData = JSON.parse(localStorage.getItem(company));
  let tableRow = document.createElement('tr');
  for (let key of arrayOfKeys) {
    let tableСell = document.createElement('td');
    tableСell.textContent = companyData[key];
    tableRow.append(tableСell);
  }
  let tableBodyActive = get('.table_active tbody');
  let tableBodyNotActive = get('.table_non-active tbody');
  (companyData.active) ? tableBodyActive.append(tableRow) : tableBodyNotActive.append(tableRow);
}

const createCompany = () => {
  const [isActive, name, code, profile, city, zip, address, email] = [
    get('#active').checked,
    get('#name').value,
    get('#code').value,
    get('input[name="profile"]:checked').value,
    get('#city').value,
    get('#zip').value,
    get('#address').value,
    get('#email').value,
  ]
  let companyDataArray = [name, code, profile, city, zip, address, email];
  const company = {};
  company.active = isActive;
  company.name = name;
  company.code = code;
  company.profile = profile;
  company.city = city;
  company.zip = zip;
  company.address = address;
  company.email = email;
  const companyId = `company_id:${company.code}`;
  companies = [...companies, companyId];
  localStorage.setItem('companies', companies);
  localStorage.setItem(companyId, JSON.stringify(company));

  const tableRow = document.createElement('tr');
  for (let item of companyDataArray) {
    let tableСell = document.createElement('td');
    tableСell.textContent = item;
    tableRow.append(tableСell);
  }
  const tableBodyActive = get('.table_active tbody');
  const tableBodyNotActive = get('.table_non-active tbody');
  (isActive) ? tableBodyActive.append(tableRow) : tableBodyNotActive.append(tableRow);
}

const eraseIcons = document.querySelectorAll('.erase')
for (let eraseIcon of eraseIcons) {
  eraseIcon.addEventListener('click', function() {
    this.parentNode.children[0].value = '';
  })
}

const buttonAddToTable = get('.add')
buttonAddToTable.addEventListener('click', () => createCompany())
