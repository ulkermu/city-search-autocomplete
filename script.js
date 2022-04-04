cities = [
  "Adana",
  "Adıyaman",
  "Afyon",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Isparta",
  "İçel (Mersin)",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce",
];

const searchInput = document.querySelector(".main-input");

function findMatches(wordToMatch, cities) {
  return cities.filter((city) => {
    // Here we need to figure out if the city matches what was searched
    const regex = new RegExp(wordToMatch, "gi"); // gi; global, insensitive
    return city.match(regex);
  });
}

function autoComplete() {
  let currentFocus;

  searchInput.addEventListener("input", function (e) {
    let autoCompleteDiv, autoCompleteValue;
    let val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    autoCompleteDiv = document.createElement("div");
    autoCompleteDiv.setAttribute("id", `${this.id} main-input-list`);
    autoCompleteDiv.setAttribute("class", "main-input-items");
    this.parentNode.appendChild(autoCompleteDiv);

    const matchArray = findMatches(val, cities);

    matchArray.map((city) => {
      const regex = new RegExp(val, "gi");
      const cityName = city.replace(
        regex,
        `<span class='hl'>${val}</span>`
      );

      autoCompleteValue = document.createElement("div");
      autoCompleteValue.setAttribute("class", "main-input-value");
      autoCompleteValue.innerHTML = `${cityName}`
      autoCompleteValue.addEventListener("click", function (e) {
        searchInput.value = city;
        closeAllLists();
      });
      autoCompleteDiv.appendChild(autoCompleteValue);
    });
  });

  searchInput.addEventListener("keydown", function (e) {
    let item = document.getElementById(`${this.id} main-input-list`);
    if (item) item = item.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(item);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(item);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (item) item[currentFocus].click();
      }
    }
  });

  const addActive = (item) => {
    if (!item) return false;
    removeActive(item);
    if (currentFocus >= item.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = item.length - 1;
    item[currentFocus].classList.add("main-input-active");
  };

  const removeActive = (item) => {
    for (i = 0; i < item.length; i++) {
      item[i].classList.remove("main-input-active");
    }
  };

  const closeAllLists = (element) => {
    let item = document.getElementsByClassName("main-input-items");
    for (i = 0; i < item.length; i++) {
      if (element != item[i] && element != searchInput) {
        item[i].parentNode.removeChild(item[i]);
      }
    }
  };

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autoComplete(document.getElementById("input"), cities);