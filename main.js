let getAll = (selector, parent) => parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector);
let get = (selector) => document.querySelector(selector);

let companies = (localStorage.getItem('companies') !== null && localStorage.getItem('companies') != '') ? [...localStorage.getItem('companies').split(',')] : [];
localStorage.setItem('companies', companies);
let arrayOfKeys = ['name', 'code', 'profile', 'city', 'zip', 'address', 'email'];
for (let company of companies) {
  let companyData = JSON.parse(localStorage.getItem(company));
  let tableRow = document.createElement('tr');
  const companyId = `company_id:${companyData.code}`;
  tableRow.id = companyId;
  for (let key of arrayOfKeys) {
    let tableСell = document.createElement('td');
    tableСell.textContent = companyData[key];
    tableRow.append(tableСell);
  }
  const buttonDelete = document.createElement('td');
  buttonDelete.textContent = 'x';
  tableRow.append(buttonDelete);
  buttonDelete.addEventListener('click', function() {
    this.parentNode.parentNode.removeChild(this.parentNode);
    localStorage.removeItem(this.parentNode.id);
    let index = companies.indexOf(this.parentNode.id);
    if (index !== -1) {
      companies.splice(index, 1);
      localStorage.setItem('companies', companies);
    }
  })
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
  let index = companies.indexOf(companyId);
  if (index == -1 ) {
    const tableRow = document.createElement('tr');
    tableRow.id = companyId;
    for (let item of companyDataArray) {
      let tableСell = document.createElement('td');
      tableСell.textContent = item;
      tableRow.append(tableСell);
    }
    const buttonDelete = document.createElement('td');
    buttonDelete.textContent = 'x';
    tableRow.append(buttonDelete);
    buttonDelete.addEventListener('click', function() {
      this.parentNode.parentNode.removeChild(this.parentNode);
      localStorage.removeItem(this.parentNode.id);
      let index = companies.indexOf(this.parentNode.id);
      if (index !== -1) {
        companies.splice(index, 1);
        localStorage.setItem('companies', companies);
      } 
    })
    const tableBodyActive = get('.table_active tbody');
    const tableBodyNotActive = get('.table_non-active tbody');
    if(name !== '' && code !== '' && ~~code !== 0 && code.length === 4 && /^[a-zA-Z]*$/.test(name)) {
      if (email === '' || /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
        get('#name').classList.remove('error');
        get('#code').classList.remove('error');
        companies = [...companies, companyId];
        companies = [...new Set(companies)];
        localStorage.setItem('companies', companies);
        localStorage.setItem(companyId, JSON.stringify(company));
        (isActive) ? tableBodyActive.append(tableRow) : tableBodyNotActive.append(tableRow);
      } else {
         get('#email').classList.add('error');
      }
    } else if (name === '' && code !== ''){
      get('#name').classList.add('error');
    } else if (code === '' && name !== '') {
      get('#code').classList.add('error');
    } else {
      get('#name').classList.add('error');
      get('#code').classList.add('error');
    }
  } else {
    get('#code').classList.add('error');
    get('.tip').style.display = 'inline';
    get('#code').addEventListener('focus', () => get('.tip').style.display = 'none');
  }
}

const eraseIcons = document.querySelectorAll('.erase')
for (let eraseIcon of eraseIcons) {
  eraseIcon.addEventListener('click', function() {
    this.parentNode.children[0].value = '';
  })
}

const buttonAddToTable = get('.add')
buttonAddToTable.addEventListener('click', () => createCompany())
