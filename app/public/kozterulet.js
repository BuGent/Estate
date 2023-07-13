const kozteruletList = ["akna", "akna-alsó", "akna-felső", "alagút", "állat és növ.kert", "állomás", "alsórakpart", "arborétum", "árnyék", "árok", "átjáró", "autóút", "bánya", "bányatelep", "barakképület", "barlang", "bástya", "bástyája", "bejáró", "bekötőút", "csárda", "csónakházak", "domb", "dűlő", "dűlők", "dűlősor", "dűlőterület", "dűlőút", "egyéb", "egyetemváros", "elágazás", "emlékút", "erdészház", "erdészlak", "erdő", "erdősor", "fasor", "fasora", "felső", "forduló", "föld", "főmérnökség", "főtér", "főút", "gát", "gátőrház", "gátsor", "gyár", "gyártelep", "gyárváros", "gyümölcsös", "határsor", "határút", "ház", "hegy", "hegyhát", "hegyhát", "hegyhát dűlő", "hídfő", "hrsz", "hrsz.", "iskola", "játszótér", "kapu", "kastély", "kert", "kertsor", "kerület", "kilátó", "kioszk", "kocsiszín", "kolónia", "korzó", "kör", "körönd", "körtér", "körút", "körvasútsor", "körzet", "köz", "köz", "kultúrpark", "kunyhó", "kút", "kültelek", "lakóház", "lakókert", "lakónegyed", "lakópark", "lakótelep", "lejáró", "lejtő", "lépcső", "liget", "major", "malom", "mélyút", "menedékház", "munkásszálló", "műút", "oldal", "orom", "őrház", "őrházak", "őrházlak", "pálya", "pályaudvar", "park", "parkja", "parkoló", "part", "pavilon", "piac", "pihenő", "pince", "pincesor", "postafiók", "puszta", "rakpart", "repülőtér", "rész", "rét", "sánc", "sarok", "sávház", "sétány", "sor", "sora", "sportpálya", "sporttelep", "stadion", "strandfürdő", "sugárút", "szállás", "szállások", "szél", "szer", "sziget", "szivattyútelep", "szőlő", "szőlőhegy", "szőlők", "tag", "tanya", "tanyák", "telep", "téli kikötő", "temető", "tér", "tere", "tető", "tömb", "turistaház", "udvar", "út", "utak", "utca", "utcája", "útja", "útőrház", "üdülő", "üdülő-part", "üdülő-sor", "üdülő-telep", "vadaskert", "vadászház", "vágóhíd", "vár", "várköz", "város", "vasútállomás", "vasúti megálló", "vasúti őrház", "vasútsor", "vezetőút", "villasor", "vízmű", "völgy", "zug", "zsilip"];

const adatlista = document.querySelector('#kozteruletek');
kozteruletList.forEach((kozterulet) => {
    const option = document.createElement('option');
    option.value = kozterulet;
    adatlista.appendChild(option);
  });

document.getElementById('kozterulet').oninput = function() {

    const input = document.querySelector('#kozterulet');
    const value = input.value.toLowerCase();        
    
    while (adatlista.firstChild) {
        adatlista.removeChild(adatlista.firstChild);
    }
    
    for (let i = 0; i < kozteruletList.length; i++) {
        const kozterulet = kozteruletList[i];
        if (kozterulet.toLowerCase().startsWith(value)) {
            const option = document.createElement('option');
            option.value = kozterulet;
            adatlista.appendChild(option);
        }
    }

};