const rootElm = document.getElementById('areaSelector')

async function init() {
  await updatePref();
  await updateCity();
}

async function getPrefs() {
  const prefResponse = await fetch('./prefectures.json');
  return await prefResponse.json();
}

async function getCities(cityCode) {
  const cityResponse = await fetch(`./cities/${cityCode}.json`);
  return await cityResponse.json();
}

async function updatePref() {
  const prefs = await getPrefs();
  createPrefOptionsHtml(prefs);
}

async function updateCity() {
  const prefSelectorElm = rootElm.querySelector('.prefectures');
  const cities = await getCities(prefSelectorElm.value);
  createCityOptionsHtml(cities);
}

async function createPrefOptionsHtml(prefs) {
  const optionStrs = [];
  for(let i = 0; prefs.length > i; i++) {
    let pref = prefs[i];
    optionStrs.push(`
      <option name="${pref.name}" value="${pref.code}">
        ${pref.name}
      </option>
    `);
  }

  const prefSelectorElm = rootElm.querySelector('.prefectures');
  prefSelectorElm.innerHTML = optionStrs.join('\n');
  prefSelectorElm.addEventListener('change', async(event) => {
    updateCity(event.target.value);
  });
}

function createCityOptionsHtml(cities) {
  const optionStrs = [];
  for(let i = 0; cities.length > i; i++) {
    let city = cities[i];
    optionStrs.push(`
      <option name="${city.name}" value="${city.code}">
        ${city.name}
      </option>
    `);
  }
    
  const citySelectorElm = rootElm.querySelector('.cities');
  citySelectorElm.innerHTML = optionStrs.join('\n');
}

init();