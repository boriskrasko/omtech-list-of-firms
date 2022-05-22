const getAll = (selector, parent) => parent 
? parent.querySelectorAll(selector) 
: document.querySelectorAll(selector); // function to get elements by selector like $('selector') jQuery;

const get = (selector) => document.querySelector(selector); // function to get single element by selector like $('selector') jQuery;

const getParentNode = (elem, n) => n === 0 ? elem : getParentNode(elem.parentNode, n - 1); // recursion to get the boring node

let companies = (localStorage.getItem('companies') !== null && localStorage.getItem('companies') != '') 
? [...localStorage.getItem('companies').split(',')] 
: []; // create Array with company IDs from LocalStorage: 'company_id:1234'

const arrayOfKeys = ['name', 'code', 'profile', 'city', 'zip', 'address', 'email'];
const tableActive = get('table .active');
const tableNotActive = get('table .not-active');

// add delete icon for each table row
const addDeleteIcon = (parrent) => {
  const iconDelete = document.createElement('td');
  iconDelete.textContent = 'x';
  parrent.append(iconDelete);
  iconDelete.addEventListener('click', function() {
    getParentNode(this, 2).removeChild(this.parentNode); // remove company from table
    localStorage.removeItem(this.parentNode.id); // remove company from local storage
    const index = companies.indexOf(this.parentNode.id);
    companies.splice(index, 1); // remove company from Array with company IDs
    localStorage.setItem('companies', companies); // update company list in local storage
  })
}

// create table rows from local storage data
for (let company of companies) { 
  const companyData = JSON.parse(localStorage.getItem(company));
  const tableRow = document.createElement('tr');
  const companyId = `company_id:${companyData.code}`;
  tableRow.id = companyId;
  for (let key of arrayOfKeys) {
    const tableСell = document.createElement('td');
    tableСell.textContent = companyData[key];
    tableRow.append(tableСell);
  }
  addDeleteIcon(tableRow);
  // add row to table
  companyData.active ? tableActive.append(tableRow) : tableNotActive.append(tableRow);
}

// create company Object from form data
const createCompany = () => {
  let [isActive, name, code, profile, city, zip, address, email] = [
    get('#active').checked,
    get('#name').value,
    get('#code').value,
    get('input[name="profile"]:checked').value,
    get('#city').value,
    get('#zip').value,
    get('#address').value,
    get('#email').value,
  ]
  // add properties to company Object
  const companyPropertyArray = [name, code, profile, city, zip, address, email];
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

  const getError = (item, itemTooltip, text) => {
    itemTooltip.textContent = text;
    itemTooltip.style.display = 'inline';
    item.classList.add('error');
    isValid = false;
  }

  const checkName = () => {
    const nameInput = get('#name');
    const nameInputTooltip = get('#name ~.tip');
    if (name.trim() === '') {
      getError(nameInput, nameInputTooltip, 'To pole jest wymagane!');
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      getError(nameInput, nameInputTooltip, 'Tylko litery A-z!');
    }

    nameInput.onclick = () => {
      nameInputTooltip.style.display = 'none';
      nameInput.classList.remove('error');
    }
  }

  const checkCode = () => {
    const codeInput = get('#code');
    const codeInputTooltip = get('#code ~.tip');
    const index = companies.indexOf(companyId);
    if (code.trim() === '') {
      getError(codeInput, codeInputTooltip, 'To pole jest wymagane!');
    }
    if (code !== '' && !~~code) {
      getError(codeInput, codeInputTooltip, 'Tylko cyfry!');
    }
    if (code !== '' && ~~code && code.length < 4) {
      getError(codeInput, codeInputTooltip, 'Składa się z 4 cyfr!');

    }
    if (index !== -1) {
      getError(codeInput, codeInputTooltip, 'Ten kod już istneje!');
    }

    if (!/^[0-9]*$/.test(code)) {
      getError(codeInput, codeInputTooltip, 'Tylko cyfry!');
    }

    codeInput.onclick = () => {
      codeInputTooltip.style.display = 'none';
      codeInput.classList.remove('error');
    }
  }

  const checkEmail = () => {
    const emailInput = get('#email');
    const emailInputTooltip = get('#email ~.tip');
    if (email !== '' && !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
      getError(emailInput, emailInputTooltip, 'Nieprawidlowy format!');
    }
    emailInput.onclick = () => {
      emailInputTooltip.style.display = 'none';
      emailInput.classList.remove('error');
    }
  }

  const checkZip = () => {
    const zipInput = get('#zip');
    const zipInputTooltip = get('#zip ~.tip');
    if (zip !== '' && !~~zip) {
      getError(zipInput, zipInputTooltip, 'Tylko cyfry!');
    }
    zipInput.onclick = () => {
      zipInputTooltip.style.display = 'none';
      zipInput.classList.remove('error');
    }
  }

  let isValid = true;
  checkName();
  checkCode();
  checkEmail();
  checkZip();
  if(isValid) {
    const tableRow = document.createElement('tr');
    tableRow.id = companyId;
    for (let item of companyPropertyArray) {
      let tableСell = document.createElement('td');
      tableСell.textContent = item;
      tableRow.append(tableСell);
    }
    addDeleteIcon(tableRow);
    get('#name').classList.remove('error');
    get('#code').classList.remove('error');
    companies = [...companies, companyId];
    companies = [...new Set(companies)];
    localStorage.setItem('companies', companies);
    localStorage.setItem(companyId, JSON.stringify(company));
    (isActive) ? tableActive.append(tableRow) : tableNotActive.append(tableRow);
    let inputs = getAll('.input');
    for (let input of inputs) {
      input.value = '';
    }
  }
}

const eraseIcons = document.querySelectorAll('.erase')
for (let eraseIcon of eraseIcons) {
  eraseIcon.addEventListener('click', function() {
    this.parentNode.children[0].value = '';
  })
}

const getRandomCode = () => {
  get('#code').value = Math.floor(Math.random() * 9000 + 1000);
  get('#code ~.tip').style.display = 'none';
  get('#code').classList.remove('error');
}

const buttonGenCode = get('.button_generating-code');
buttonGenCode.onclick = () => getRandomCode();

const buttonAddToTable = get('.add')
buttonAddToTable.addEventListener('click', () => createCompany())
