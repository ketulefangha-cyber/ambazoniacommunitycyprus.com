document.addEventListener("DOMContentLoaded", function () {

    // ISO 3166-1 country list (official names)
    const isoCountries = [
        "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
        "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
        "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
        "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
        "Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde",
        "Central African Republic","Chad","Chile","China","Colombia","Comoros",
        "Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
        "Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
        "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
        "Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
        "Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
        "Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
        "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati",
        "Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya",
        "Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
        "Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius",
        "Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco",
        "Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand",
        "Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
        "Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru",
        "Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
        "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines",
        "Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal",
        "Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia",
        "Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka",
        "Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
        "Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago",
        "Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine",
        "United Arab Emirates","United Kingdom","United States","Uruguay",
        "Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen",
        "Zambia","Zimbabwe"
    ];

    // Major cities for selected countries (others will use "Other")
    const majorCities = {
        "Afghanistan": ["Kabul", "Herat", "Kandahar", "Mazar-i-Sharif", "Jalalabad", "Ghazni",],
        "Albania": ["Tirana", "Durrës", "Vlorë", "Shkodër", "Elbasan", "Fier", "Berat",],
        "Algeria": ["Algiers", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Sétif",],
        "Andorra": ["Andorra la Vella", "Escaldes-Engordany", "La Massana", "Encamp", "Sant Julià de Lòria", "Ordino", "Canillo",],
        "Angola": ["Luanda", "Huambo", "Lobito", " Benguela", "Lubango", "Kuito", "Malanje", "Ndalatando",],
        "Argentina": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "San Miguel de Tucumán",],
        "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra", "Gold Coast",],
        "Austria": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt",],
        "Bahrain": ["Manama", "Riffa", "Muharraq", "Hamala", "Isa Town", "Sitra",],
        "Bangladesh": ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Comilla",],
        "Belarus": ["Minsk", "Gomel", "Mogilev", "Vitebsk", "Hrodna", "Brest", "Babruysk", "Baranovichi", "Pinsk",],
        "Belgium": ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges", "Namur", "Leuven", "Mons", "Aalst", "Mechelen", "La Louvière", "Kortrijk", "Hasselt", "Ostend", "Tournai", "Seraing", "Roeselare", "Verviers", "Dendermonde",],
        "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte",],
        "BUrkina Faso": ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Banfora", "Ouahigouya", "Fada N'gourma",],
        "Cameroon": ["Buea", "Bamenda", "Douala", "Yaoundé", "Limbe", "Kumba", "Bafoussam", "Nkongsamba", "Ebolowa", "Garoua", "Maroua", "Ngaoundéré", "Bertoua", "Foumban", "Dschang", "Mbouda", "Loum", "Kumbo", "Mbalmayo", "Edéa", "Kribi", "Yagoua", "Tiko", "Fundong", "Wum", "Batouri", "Abong-Mbang", "Bafia", "Banyo", "Fontem", "Guider", "Léré", "Mora", "Ngaoundal", "Pitoa", "Tibati", "Yokadouma", "Nkambe",],
        "Canada": ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Oshawa", "Windsor", "Saskatoon", "Regina", "St. John's", "Barrie", "Kelowna", "Abbotsford", "Sherbrooke", "Guelph", "Trois-Rivières", "Peterborough", "Lethbridge", "Kamloops", "Red Deer", "Chicoutimi", "Prince George", "Medicine Hat", "Grande Prairie", "Drummondville", "Saint John", "Moncton", "Fredericton", "Charlottetown", "Yellowknife", "Iqaluit", "Whitehorse",],
        "Chile": ["Santiago", "Valparaíso", "Concepción", "Viña del Mar", "Temuco", "Antofagasta",],
        "China": ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Chongqing", "Wuhan", "Nanjing", "Tianjin", "Xi'an", "Suzhou", "Qingdao", "Dalian", "Jinan", "Fuzhou", "Zhengzhou", "Changsha", "Kunming", "Shenyang", "Harbin", "Urumqi", "Nanning", "Hefei", "Nanchang", "Xiamen", "Taiyuan", "Lanzhou", "Yinchuan", "Haikou", "Sanya",],
        "Cyprus": ["Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta", "Kyrenia", "Morphou", "Paralimni", "Deryneia", "Ayia Napa", "Protaras", "Kato Pyrgos", "Kakopetria", "Tala", "Polis", "Pano Lefkara", "Lefkara", "Kissonerga", "Geroskipou", "Choirokoitia", "Dali", "Agios Athanasios", "Agios Tychonas", "Pano Polemidia", "Mesa Geitonia", "Ypsonas", "Aradippou", "Livadia", "Kiti", "Kalo Chorio", "Ormidia", "Paralimni", "Frenaros", "Avgorou", "Dromolaxia", "Xylofagou", "Liopetri", "Sotira", "Kapparis", "Ayia Trias", "Psematismenos", "Vrysoulles", "Melouseia", "Kofinou", "Anafotia", "Maroni", "Kalo Chorio Oreinis", "Palaichori Morphou", "Palaichori Oreinis", "Pelendri", "Mandria", "Akaki", "Milia", "Dali", "Agios Georgios", "Agios Ioannis", "Agios Nikolaos", "Agios Theodoros", "Agios Vasileios", "Agios Yeoryios", "Agios Zenon", "Agios Zinas", "Agios Zygos", "Agios Epifanios", "Agios Fotios", "Agios Charalambos", "Agios Christoforos", "Agios Dimitrios", "Agios Efstratios", "Agios Georgios Pegeias", "Agios Ioannis Pafou", "Agios Nikolaos Lefkas", "Agios Theodoros Limassol",],
        "Denmark": ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens", "Vejle", "Roskilde", "Herning", "Sønderborg", "Silkeborg", "Næstved", "Fredericia", "Hjørring", "Holstebro", "Taastrup", "Slagelse", "Hillerød", "Svendborg", "Skive", "Ringsted", "Viborg", "Birkerød", "Brønderslev", "Frederikshavn", "Helsingør", "Køge", "Lillerød", "Nykøbing Falster", "Rønne", "Søllested", "Thisted", "Vordingborg", "Ærøskøbing", "Bogense", "Ebeltoft", "Fåborg", "Gilleleje", "Haderslev", "Kalundborg", "Lemvig", "Maribo", "Nibe", "Nysted", "Odder", "Ribe", "Skagen", "Struer", "Tønder", "Varde", "Aabenraa", "Allerød", "Ballerup", "Brande", "Dragør", "Egå", "Faxe", "Gjern", "Hinnerup", "Jægerspris", "Kerteminde", "Løgstør", "Middelfart", "Nørresundby", "Præstø", "Rødovre", "Sakskøbing", "Stenløse", "Tårnby", "Vallensbæk", "Ølstykke", "Ørsted", "Aars", "Billund", "Hals", "Hørsholm", "Juelsminde", "Korsør", "Lemvig", "Morsø", "Nykøbing Mors", "Rudersdal", "Skælskør", "Sønder Omme", "Tisvildeleje", "Vallensbæk Strand", "Østerbro", "Åbyhøj", "Ålborg", "Århus", "Ærø",],
        "Equatorial Guinea": ["Malabo", "Bata", "Ebebiyín", "Evinayong", "Mongomo", "Aconibe", "Anisoc", "Ayene", "Bikomo", "Bitica", "Cogo", "Corisco", "Mikomeseng", "Nsok", "Rebola", "Riaba", "Santiago de Baney",],
        "Egypt": ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Asyut", "Tanta", "Ismailia", "Faiyum", "Zagazig", "Mansoura", "Aswan", "Damanhur", "Daqahlia", "Minya", "Sohag", "Qena", "Hurghada", "Beni Suef", "New Cairo", "6th of October City", "Obour City", "El Mahalla El Kubra", "Kafr El Sheikh", "Al Minya", "Al Mansurah", "Al Fayyum", "Al Ismailia", "Al Jizah", "Al Qalyubiyah", "Al Sharqiyah", "As Suways", "Asyut", "Beheira", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai",],
        "Ethiopia": ["Addis Ababa", "Dire Dawa", "Mekelle", "Gondar", "Bahir Dar", "Adama", "Jimma",],
        "Finland": ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä", "Lahti", "Kuopio", "Pori", "Lappeenranta", "Vaasa", "Rovaniemi", "Seinäjoki", "Kouvola", "Mikkeli", "Kotka", "Salo", "Hyvinkää", "Järvenpää", "Nurmijärvi", "Porvoo", "Kirkkonummi", "Jämsä", "Kemi", "Kokkola", "Lohja", "Rauma", "Savonlinna", "Tornio", "Ylivieska", "Äänekoski", "Imatra", "Kajaani", "Kangasala", "Keuruu", "Kittilä", "Kristiinankaupunki", "Kuusamo", "Laitila", "Lapua", "Lempäälä", "Lohja", "Mänttä-Vilppula", "Nivala", "Orivesi", "Paimio", "Parkano", "Pedersöre", "Pieksämäki", "Pietarsaari", "Pudasjärvi", "Pyhäjärvi", "Raahe", "Raisio", "Riihimäki", "Sastamala", "Siilinjärvi", "Somero", "Sysmä", "Tervo", "Uurainen", "Varkaus", "Ylöjärvi", "Ähtäri", "Hamina", "Hankasalmi", "Haukipudas", "Heinola", "Hollola", "Huittinen", "Ikaalinen", "Ilmajoki", "Janakkala", "Joroinen", "Juuka", "Juva", "Kaarina", "Kankaanpää", "Kannus", "Karijoki", "Karstula", "Kaskinen", "Kauniainen", "Keitele", "Kihniö", "Kimitoön", "Kirkkonummi", "Kivijärvi", "Kokemäki", "Kolari", "Konnevesi", "Kontiolahti", "Korpo", "Koski Tl", "Kotka", "Kouvola", "Kristinestad", "Kruunupyy", "Kuorevesi", "Kurikka", "Kuusankoski", "Lapinjärvi", "Lavia", "Lemi", "Lieto", "Liminka", "Liperi", "Loimaa", "Loppi", "Luhanka", "Lumijoki", "Lumparland", "Maaninka", "Marttila", "Masku", "Merikarvia", "Merimasku", "Miehikkälä", "Muhos", "Multia", "Muurame", "Mynämäki", "Naantali", "Nakkila", "Nastola", "Nivala", "Nousiainen", "Nurmes", "Närpes", "Orimattila", "Oripää", "Orivesi", "Oulainen", "Outokumpu", "Padasjoki", "Paimio", "Parainen", "Pedersöre", "Pelkosenniemi", "Perho", "Pertunmaa", "Petäjävesi", "Pihtipudas", "Pielavesi", "Piikkiö", "Pomarkku", "Pori", "Posio", "Pudasjärvi", "Pyhäjoki", "Pyhäjärvi", "Pyhäranta", "Raahe", "Raisio", "Rantasalmi", "Ranua", "Rautalampi", "Rautavaara", "Reisjärvi", "Renko", "Riihimäki", "Ristijärvi", "Rovaniemi", "Ruokolahti", "Rusko", "Rääkkylä", "Saarijärvi", "Salla", "Salo", "Saltvik", "Sastamala", "Sauvo", "Savonlinna", "Savukoski", "Seinäjoki", "Sievi", "Siilinjärvi", "Simo", "Sipoo", "Siuntio", "Sodankylä", "Somero", "Sonkajärvi", "Sotkamo", "Sulkava", "Sysmä", "Tampere", "Tervo", "Teuva", "Tohmajärvi", "Toivakka", "Tornio", "Turku", "Tuusniemi", "Ulvila", "Uurainen", "Uusikaupunki", "Vaasa", "Varkaus", "Vehmaa", "Vesanto", "Veteli", "Vihti", "Vimpeli", "Virrat", "Vöyri", "Ylivieska", "Ylöjärvi", "Ähtäri", "Äänekoski",],
        "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon", "Grenoble", "Dijon", "Angers", "Nîmes", "Villeurbanne", "Clermont-Ferrand", "Le Mans", "Aix-en-Provence", "Brest", "Limoges", "Tours", "Amiens", "Perpignan", "Metz", "Besançon", "Orléans", "Mulhouse", "Rouen", "Caen", "Nancy", "Saint-Denis", "Argenteuil", "Montreuil", "Avignon", "Poitiers", "Nanterre", "Créteil", "Versailles", "Courbevoie", "Vitry-sur-Seine", "Colombes", "Asnières-sur-Seine", "Aulnay-sous-Bois", "Rueil-Malmaison", "Pau", "Antibes", "La Rochelle", "Cannes", "Calais", "Saint-Maur-des-Fossés", "Champigny-sur-Marne", "Drancy", "Levallois-Perret", "Issy-les-Moulineaux", "Noisy-le-Grand", "Neuilly-sur-Seine", "Clichy", "Villejuif", "Sarcelles", "Bondy", "Meaux", "Clamart",],
        "Gabon": ["Libreville", "Port-Gentil", "Franceville", "Oyem", "Moanda", "Lambaréné", "Koulamoutou", "Bitam", "Tchibanga", "Mouila", "Ndjolé", "Makokou", "Lastoursville", "Bongoville", "Okondja", "Médouneu", "Minvoul", "Nkan", "Oyem", "Bitam", "Koulamoutou", "Lambaréné", "Moanda", "Franceville", "Libreville",],
        "Germany": ["Berlin", "Hamburg", "Munich", "Frankfurt", "Cologne", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster", "Karlsruhe", "Mannheim", "Augsburg", "Wiesbaden", "Gelsenkirchen", "Mönchengladbach", "Braunschweig", "Chemnitz", "Kiel", "Aachen", "Halle (Saale)", "Magdeburg", "Freiburg im Breisgau", "Krefeld", "Lübeck", "Oberhausen", "Erfurt", "Mainz", "Rostock", "Kassel", "Hagen", "Saarbrücken", "Hamm", "Potsdam", "Ludwigshafen am Rhein", "Oldenburg", "Leverkusen", "Osnabrück", "Solingen", "Heidelberg", "Herne", "Neuss", "Darmstadt", "Paderborn", "Regensburg", "Ingolstadt", "Würzburg", "Fürth", "Ulm", "Heilbronn", "Pforzheim",],
        "Ghana": ["Accra", "Kumasi", "Takoradi", "Tamale", "Ashaiman", "Obuasi", "Cape Coast", "Sunyani", "Tema", "Ho", "Koforidua", "Sekondi", "Bolgatanga", "Wa", "Techiman", "Tarkwa", "Bibiani", "Axim", "Dunkwa-on-Offin", "Berekum", "Mampong", "Nkawkaw", "Yendi", "Salaga", "Nkoranza", "Gushegu", "Damongo", "Keta", "Navrongo", "Sogakope", "Atebubu", "Bawku", "Dambai", "Juaso", "Kpandu", "Molepolole",],
        "India": ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad", "Pune", "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati",],
        "Ireland": ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Swords", "Dún Laoghaire", "Bray", "Navan", "Ennis", "Tralee", "Kilkenny", "Carlow", "Wexford", "Clonmel", "Athlone", "Letterkenny", "Mullingar", "Balbriggan", "Naas", "Newbridge", "Celbridge", "Maynooth", "Portlaoise", "Tullamore", "Longford", "Cavan", "Monaghan", "Arklow", "Gorey", "Killarney", "Skibbereen", "Bantry", "Westport",],
        "Italy": ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania", "Venice", "Verona", "Messina", "Padua", "Trieste", "Taranto", "Brescia", "Prato", "Reggio Calabria", "Modena", "Cagliari", "Parma", "Livorno", "Foggia", "Ravenna", "Salerno", "Ferrara", "Sassari", "Latina", "Giugliano in Campania", "Monza", "Siracusa", "Pescara", "Bergamo",],
        "Japan": ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Chiba", "Kitakyushu", "Sagamihara", "Shizuoka", "Okayama", "Hamamatsu", "Funabashi", "Hachioji", "Utsunomiya", "Matsudo", "Kumamoto", "Nagasaki", "Kanazawa", "Oita", "Toyama", "Akita", "Mito", "Fukushima",],
        "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Kitale", "Malindi", "Naivasha", "Embu", "Meru", "Machakos", "Garissa", "Kakamega", "Bungoma", "Lamu", "Wajir", "Isiolo", "Marsabit", "Turkana",],
        "Malaysia": ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Shah Alam", "Petaling Jaya", "Kota Kinabalu", "Kuching", "Seremban", "Alor Setar", "Melaka", "Kuantan", "Sungai Petani", "Miri", "Sandakan", "Bintulu", "Taiping", "Kuala Terengganu", "Kuala Selangor", "Batu Pahat", "Segamat", "Keningau", "Lahad Datu", "Tawau", "Kulim", "Kampar", "Bentong", "Gopeng", "Mentakab", "Sibu", "Limbang", "Semporna",],
        "Morocco": ["Rabat", "Casablanca", "Marrakesh", "Fez", "Tangier", "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan",],
        "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen",],
        "Nigeria": ["Lagos", "Abuja", "Port Harcourt", "Onitsha", "Enugu", "Kano", "Ibadan", "Benin City", "Kaduna", "Aba", "Jos", "Ilorin", "Ogbomosho", "Abeokuta", "Warri", "Zaria", "Calabar", "Uyo", "Makurdi", "Sokoto",],
        "Norway": ["Oslo", "Bergen", "Trondheim", "Stavanger", "Tromsø", "Drammen", "Fredrikstad", "Porsgrunn", "Skien", "Kristiansand",],
        "Poland": ["Warsaw", "Kraków", "Gdańsk", "Wrocław", "Poznań", "Łódź", "Szczecin", "Bydgoszcz", "Lublin", "Katowice",],
        "Portugal": ["Lisbon", "Porto", "Braga", "Coimbra", "Faro", "Aveiro", "Setúbal", "Viseu", "Guimarães", "Leiria",],
        "Qatar": ["Doha", "Al Rayyan", "Umm Salal Muhammad", "Al Wakrah", "Al Khor", "Al Daayen", "Al Shamal", "Al Ghuwariyah", "Dukhan", "Mesaieed",],
        "Romania": ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Craiova", "Brașov", "Galați", "Ploiești", "Oradea",],
        "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod", "Kazan", "Chelyabinsk", "Omsk", "Samara", "Rostov-on-Don",],
        "Rwanda": ["Kigali", "Huye", "Musanze", "Rubavu", "Nyagatare", "Rwamagana", "Muhanga", "Gisenyi",],
        "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Tabuk", "Buraidah", "Khamis Mushait", "Hail",],
        "Senegal": ["Dakar", "Thiès", "Saint-Louis", "Kaolack", "Ziguinchor", "Touba", "Mbour", "Diourbel",],
        "South Africa": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London", "Pietermaritzburg", "Nelspruit", "Kimberley",],
        "South Korea": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan", "Changwon", "Goyang",],
        "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao",],
        "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping",],
        "Switzerland": ["Zurich", "Geneva", "Basel", "Lausanne", "Bern", "Winterthur", "St. Gallen", "Lugano", "Biel/Bienne", "Thun", "Köniz",],
        "Thailand": ["Bangkok", "Chiang Mai", "Pattaya", "Phuket", "Hat Yai", "Nakhon Ratchasima", "Udon Thani", "Khon Kaen", "Nakhon Si Thammarat",],
        "Tanzania": ["Dar es Salaam", "Dodoma", "Arusha", "Mwanza", "Zanzibar City", "Mbeya", "Morogoro", "Tanga",],
        "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Gaziantep", "Konya", "Kayseri", "Mersin",],
        "Uganda": ["Kampala", "Gulu", "Mbale", "Mbarara", "Jinja", "Lira", "Masaka", "Fort Portal", "Soroti",],
        "UAE": ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain",],
        "United Kingdom": ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Sheffield", "Bradford", "Liverpool", "Edinburgh", "Bristol", "Cardiff", "Coventry", "Nottingham", "Leicester", "Sunderland", "Southampton", "Reading", "Derby", "Wolverhampton", "Plymouth","Newcastle upon Tyne", "Stoke-on-Trent", "Walsall", "West Bromwich", "Bournemouth", "Swindon", "Milton Keynes", "York", "Blackpool", "Preston", "Lincoln", "Bath", "Exeter", "Chester", "Durham", "Canterbury", "Hereford", "Lichfield", "Ripon", "Truro", "Worcester",],
        "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Atlanta", "Columbus", "Miami", "Seattle", "Denver", "Boston", "Cleveland", "Baltimore",],
        "Vietnam": ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang", "Hue", "Vung Tau", "Bien Hoa",],
        "Zambia": ["Lusaka", "Ndola", "Kitwe", "Livingstone", "Chingola", "Kabwe", "Mufulira",  "Kasama",],
        "Zimbabwe": ["Harare", "Bulawayo", "Mutare", "Gweru", "Kwekwe", "Masvingo", "Chinhoyi", "Kadoma",],
    };

    const countrySelect = document.getElementById("country");
    const citySelect = document.getElementById("city");
    const otherCityInput = document.getElementById("otherCity");

    // Populate country dropdown
    isoCountries.forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // Handle country change
    countrySelect.addEventListener("change", function () {
        citySelect.innerHTML = '<option value="">Select City</option>';
        otherCityInput.style.display = "none";
        otherCityInput.value = "";

        const cities = majorCities[this.value] || [];

        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });

        // Always add "Other"
        const otherOption = document.createElement("option");
        otherOption.value = "Other";
        otherOption.textContent = "Other";
        citySelect.appendChild(otherOption);
    });

    // Handle city change
    citySelect.addEventListener("change", function () {
        if (this.value === "Other") {
            otherCityInput.style.display = "block";
        } else {
            otherCityInput.style.display = "none";
            otherCityInput.value = "";
        }
    });

});
