// 100 villes françaises pour les pages SEO locales
// Chaque page : /creer-site-vtc/[slug]

export interface City {
  slug: string;
  name: string;
  region: string;
  department: string;
  departmentNumber: string;
  population: number;
}

export const CITIES: City[] = [
  // Top 20 villes
  { slug: "paris", name: "Paris", region: "Ile-de-France", department: "Paris", departmentNumber: "75", population: 2103000 },
  { slug: "marseille", name: "Marseille", region: "Provence-Alpes-Cote d'Azur", department: "Bouches-du-Rhone", departmentNumber: "13", population: 873000 },
  { slug: "lyon", name: "Lyon", region: "Auvergne-Rhone-Alpes", department: "Rhone", departmentNumber: "69", population: 522000 },
  { slug: "toulouse", name: "Toulouse", region: "Occitanie", department: "Haute-Garonne", departmentNumber: "31", population: 498000 },
  { slug: "nice", name: "Nice", region: "Provence-Alpes-Cote d'Azur", department: "Alpes-Maritimes", departmentNumber: "06", population: 342000 },
  { slug: "nantes", name: "Nantes", region: "Pays de la Loire", department: "Loire-Atlantique", departmentNumber: "44", population: 322000 },
  { slug: "montpellier", name: "Montpellier", region: "Occitanie", department: "Herault", departmentNumber: "34", population: 295000 },
  { slug: "strasbourg", name: "Strasbourg", region: "Grand Est", department: "Bas-Rhin", departmentNumber: "67", population: 290000 },
  { slug: "bordeaux", name: "Bordeaux", region: "Nouvelle-Aquitaine", department: "Gironde", departmentNumber: "33", population: 259000 },
  { slug: "lille", name: "Lille", region: "Hauts-de-France", department: "Nord", departmentNumber: "59", population: 235000 },
  { slug: "rennes", name: "Rennes", region: "Bretagne", department: "Ille-et-Vilaine", departmentNumber: "35", population: 220000 },
  { slug: "reims", name: "Reims", region: "Grand Est", department: "Marne", departmentNumber: "51", population: 183000 },
  { slug: "le-havre", name: "Le Havre", region: "Normandie", department: "Seine-Maritime", departmentNumber: "76", population: 170000 },
  { slug: "saint-etienne", name: "Saint-Etienne", region: "Auvergne-Rhone-Alpes", department: "Loire", departmentNumber: "42", population: 173000 },
  { slug: "toulon", name: "Toulon", region: "Provence-Alpes-Cote d'Azur", department: "Var", departmentNumber: "83", population: 171000 },
  { slug: "grenoble", name: "Grenoble", region: "Auvergne-Rhone-Alpes", department: "Isere", departmentNumber: "38", population: 158000 },
  { slug: "dijon", name: "Dijon", region: "Bourgogne-Franche-Comte", department: "Cote-d'Or", departmentNumber: "21", population: 157000 },
  { slug: "angers", name: "Angers", region: "Pays de la Loire", department: "Maine-et-Loire", departmentNumber: "49", population: 154000 },
  { slug: "nimes", name: "Nimes", region: "Occitanie", department: "Gard", departmentNumber: "30", population: 151000 },
  { slug: "villeurbanne", name: "Villeurbanne", region: "Auvergne-Rhone-Alpes", department: "Rhone", departmentNumber: "69", population: 152000 },

  // 21-50
  { slug: "saint-denis", name: "Saint-Denis", region: "Ile-de-France", department: "Seine-Saint-Denis", departmentNumber: "93", population: 113000 },
  { slug: "aix-en-provence", name: "Aix-en-Provence", region: "Provence-Alpes-Cote d'Azur", department: "Bouches-du-Rhone", departmentNumber: "13", population: 143000 },
  { slug: "clermont-ferrand", name: "Clermont-Ferrand", region: "Auvergne-Rhone-Alpes", department: "Puy-de-Dome", departmentNumber: "63", population: 147000 },
  { slug: "le-mans", name: "Le Mans", region: "Pays de la Loire", department: "Sarthe", departmentNumber: "72", population: 143000 },
  { slug: "brest", name: "Brest", region: "Bretagne", department: "Finistere", departmentNumber: "29", population: 139000 },
  { slug: "tours", name: "Tours", region: "Centre-Val de Loire", department: "Indre-et-Loire", departmentNumber: "37", population: 136000 },
  { slug: "amiens", name: "Amiens", region: "Hauts-de-France", department: "Somme", departmentNumber: "80", population: 133000 },
  { slug: "limoges", name: "Limoges", region: "Nouvelle-Aquitaine", department: "Haute-Vienne", departmentNumber: "87", population: 130000 },
  { slug: "annecy", name: "Annecy", region: "Auvergne-Rhone-Alpes", department: "Haute-Savoie", departmentNumber: "74", population: 128000 },
  { slug: "perpignan", name: "Perpignan", region: "Occitanie", department: "Pyrenees-Orientales", departmentNumber: "66", population: 120000 },
  { slug: "boulogne-billancourt", name: "Boulogne-Billancourt", region: "Ile-de-France", department: "Hauts-de-Seine", departmentNumber: "92", population: 121000 },
  { slug: "besancon", name: "Besancon", region: "Bourgogne-Franche-Comte", department: "Doubs", departmentNumber: "25", population: 116000 },
  { slug: "orleans", name: "Orleans", region: "Centre-Val de Loire", department: "Loiret", departmentNumber: "45", population: 117000 },
  { slug: "metz", name: "Metz", region: "Grand Est", department: "Moselle", departmentNumber: "57", population: 117000 },
  { slug: "rouen", name: "Rouen", region: "Normandie", department: "Seine-Maritime", departmentNumber: "76", population: 115000 },
  { slug: "mulhouse", name: "Mulhouse", region: "Grand Est", department: "Haut-Rhin", departmentNumber: "68", population: 108000 },
  { slug: "caen", name: "Caen", region: "Normandie", department: "Calvados", departmentNumber: "14", population: 106000 },
  { slug: "nancy", name: "Nancy", region: "Grand Est", department: "Meurthe-et-Moselle", departmentNumber: "54", population: 104000 },
  { slug: "argenteuil", name: "Argenteuil", region: "Ile-de-France", department: "Val-d'Oise", departmentNumber: "95", population: 110000 },
  { slug: "montreuil", name: "Montreuil", region: "Ile-de-France", department: "Seine-Saint-Denis", departmentNumber: "93", population: 111000 },
  { slug: "saint-paul", name: "Saint-Paul", region: "La Reunion", department: "La Reunion", departmentNumber: "974", population: 104000 },
  { slug: "roubaix", name: "Roubaix", region: "Hauts-de-France", department: "Nord", departmentNumber: "59", population: 98000 },
  { slug: "tourcoing", name: "Tourcoing", region: "Hauts-de-France", department: "Nord", departmentNumber: "59", population: 97000 },
  { slug: "nanterre", name: "Nanterre", region: "Ile-de-France", department: "Hauts-de-Seine", departmentNumber: "92", population: 96000 },
  { slug: "avignon", name: "Avignon", region: "Provence-Alpes-Cote d'Azur", department: "Vaucluse", departmentNumber: "84", population: 92000 },
  { slug: "vitry-sur-seine", name: "Vitry-sur-Seine", region: "Ile-de-France", department: "Val-de-Marne", departmentNumber: "94", population: 95000 },
  { slug: "creteil", name: "Creteil", region: "Ile-de-France", department: "Val-de-Marne", departmentNumber: "94", population: 92000 },
  { slug: "dunkerque", name: "Dunkerque", region: "Hauts-de-France", department: "Nord", departmentNumber: "59", population: 87000 },
  { slug: "poitiers", name: "Poitiers", region: "Nouvelle-Aquitaine", department: "Vienne", departmentNumber: "86", population: 90000 },
  { slug: "asnieres-sur-seine", name: "Asnieres-sur-Seine", region: "Ile-de-France", department: "Hauts-de-Seine", departmentNumber: "92", population: 87000 },

  // 51-100
  { slug: "courbevoie", name: "Courbevoie", region: "Ile-de-France", department: "Hauts-de-Seine", departmentNumber: "92", population: 82000 },
  { slug: "versailles", name: "Versailles", region: "Ile-de-France", department: "Yvelines", departmentNumber: "78", population: 85000 },
  { slug: "colombes", name: "Colombes", region: "Ile-de-France", department: "Hauts-de-Seine", departmentNumber: "92", population: 86000 },
  { slug: "fort-de-france", name: "Fort-de-France", region: "Martinique", department: "Martinique", departmentNumber: "972", population: 79000 },
  { slug: "aulnay-sous-bois", name: "Aulnay-sous-Bois", region: "Ile-de-France", department: "Seine-Saint-Denis", departmentNumber: "93", population: 85000 },
  { slug: "la-rochelle", name: "La Rochelle", region: "Nouvelle-Aquitaine", department: "Charente-Maritime", departmentNumber: "17", population: 77000 },
  { slug: "saint-maur-des-fosses", name: "Saint-Maur-des-Fosses", region: "Ile-de-France", department: "Val-de-Marne", departmentNumber: "94", population: 75000 },
  { slug: "champigny-sur-marne", name: "Champigny-sur-Marne", region: "Ile-de-France", department: "Val-de-Marne", departmentNumber: "94", population: 77000 },
  { slug: "rueil-malmaison", name: "Rueil-Malmaison", region: "Ile-de-France", department: "Hauts-de-Seine", departmentNumber: "92", population: 79000 },
  { slug: "saint-nazaire", name: "Saint-Nazaire", region: "Pays de la Loire", department: "Loire-Atlantique", departmentNumber: "44", population: 71000 },
  { slug: "calais", name: "Calais", region: "Hauts-de-France", department: "Pas-de-Calais", departmentNumber: "62", population: 67000 },
  { slug: "boulogne-sur-mer", name: "Boulogne-sur-Mer", region: "Hauts-de-France", department: "Pas-de-Calais", departmentNumber: "62", population: 42000 },
  { slug: "saint-omer", name: "Saint-Omer", region: "Hauts-de-France", department: "Pas-de-Calais", departmentNumber: "62", population: 14000 },
  { slug: "arras", name: "Arras", region: "Hauts-de-France", department: "Pas-de-Calais", departmentNumber: "62", population: 41000 },
  { slug: "bethune", name: "Bethune", region: "Hauts-de-France", department: "Pas-de-Calais", departmentNumber: "62", population: 24000 },
  { slug: "lens", name: "Lens", region: "Hauts-de-France", department: "Pas-de-Calais", departmentNumber: "62", population: 31000 },
  { slug: "antibes", name: "Antibes", region: "Provence-Alpes-Cote d'Azur", department: "Alpes-Maritimes", departmentNumber: "06", population: 73000 },
  { slug: "cannes", name: "Cannes", region: "Provence-Alpes-Cote d'Azur", department: "Alpes-Maritimes", departmentNumber: "06", population: 74000 },
  { slug: "beziers", name: "Beziers", region: "Occitanie", department: "Herault", departmentNumber: "34", population: 79000 },
  { slug: "colmar", name: "Colmar", region: "Grand Est", department: "Haut-Rhin", departmentNumber: "68", population: 70000 },
  { slug: "bourges", name: "Bourges", region: "Centre-Val de Loire", department: "Cher", departmentNumber: "18", population: 64000 },
  { slug: "valence", name: "Valence", region: "Auvergne-Rhone-Alpes", department: "Drome", departmentNumber: "26", population: 64000 },
  { slug: "quimper", name: "Quimper", region: "Bretagne", department: "Finistere", departmentNumber: "29", population: 63000 },
  { slug: "chambery", name: "Chambery", region: "Auvergne-Rhone-Alpes", department: "Savoie", departmentNumber: "73", population: 58000 },
  { slug: "niort", name: "Niort", region: "Nouvelle-Aquitaine", department: "Deux-Sevres", departmentNumber: "79", population: 58000 },
  { slug: "vannes", name: "Vannes", region: "Bretagne", department: "Morbihan", departmentNumber: "56", population: 54000 },
  { slug: "saint-malo", name: "Saint-Malo", region: "Bretagne", department: "Ille-et-Vilaine", departmentNumber: "35", population: 46000 },
  { slug: "la-roche-sur-yon", name: "La Roche-sur-Yon", region: "Pays de la Loire", department: "Vendee", departmentNumber: "85", population: 54000 },
  { slug: "lorient", name: "Lorient", region: "Bretagne", department: "Morbihan", departmentNumber: "56", population: 57000 },
  { slug: "cholet", name: "Cholet", region: "Pays de la Loire", department: "Maine-et-Loire", departmentNumber: "49", population: 54000 },
  { slug: "pau", name: "Pau", region: "Nouvelle-Aquitaine", department: "Pyrenees-Atlantiques", departmentNumber: "64", population: 77000 },
  { slug: "bayonne", name: "Bayonne", region: "Nouvelle-Aquitaine", department: "Pyrenees-Atlantiques", departmentNumber: "64", population: 51000 },
  { slug: "biarritz", name: "Biarritz", region: "Nouvelle-Aquitaine", department: "Pyrenees-Atlantiques", departmentNumber: "64", population: 26000 },
  { slug: "troyes", name: "Troyes", region: "Grand Est", department: "Aube", departmentNumber: "10", population: 61000 },
  { slug: "laval", name: "Laval", region: "Pays de la Loire", department: "Mayenne", departmentNumber: "53", population: 49000 },
  { slug: "charleville-mezieres", name: "Charleville-Mezieres", region: "Grand Est", department: "Ardennes", departmentNumber: "08", population: 46000 },
  { slug: "evry", name: "Evry", region: "Ile-de-France", department: "Essonne", departmentNumber: "91", population: 69000 },
  { slug: "cergy", name: "Cergy", region: "Ile-de-France", department: "Val-d'Oise", departmentNumber: "95", population: 65000 },
  { slug: "saint-brieuc", name: "Saint-Brieuc", region: "Bretagne", department: "Cotes-d'Armor", departmentNumber: "22", population: 43000 },
  { slug: "hyeres", name: "Hyeres", region: "Provence-Alpes-Cote d'Azur", department: "Var", departmentNumber: "83", population: 56000 },
  { slug: "frejus", name: "Frejus", region: "Provence-Alpes-Cote d'Azur", department: "Var", departmentNumber: "83", population: 53000 },
  { slug: "draguignan", name: "Draguignan", region: "Provence-Alpes-Cote d'Azur", department: "Var", departmentNumber: "83", population: 40000 },
  { slug: "ajaccio", name: "Ajaccio", region: "Corse", department: "Corse-du-Sud", departmentNumber: "2A", population: 71000 },
  { slug: "bastia", name: "Bastia", region: "Corse", department: "Haute-Corse", departmentNumber: "2B", population: 47000 },
  { slug: "hazebrouck", name: "Hazebrouck", region: "Hauts-de-France", department: "Nord", departmentNumber: "59", population: 22000 },
  { slug: "saumur", name: "Saumur", region: "Pays de la Loire", department: "Maine-et-Loire", departmentNumber: "49", population: 27000 },
  { slug: "la-baule", name: "La Baule", region: "Pays de la Loire", department: "Loire-Atlantique", departmentNumber: "44", population: 15000 },
  { slug: "longwy", name: "Longwy", region: "Grand Est", department: "Meurthe-et-Moselle", departmentNumber: "54", population: 14000 },
  { slug: "epernay", name: "Epernay", region: "Grand Est", department: "Marne", departmentNumber: "51", population: 23000 },
  // Tier 3 — villes aeroports / gares TGV (forte demande VTC)
  { slug: "beauvais", name: "Beauvais", region: "Hauts-de-France", department: "Oise", departmentNumber: "60", population: 56000 },
  { slug: "carcassonne", name: "Carcassonne", region: "Occitanie", department: "Aude", departmentNumber: "11", population: 47000 },
  { slug: "bergerac", name: "Bergerac", region: "Nouvelle-Aquitaine", department: "Dordogne", departmentNumber: "24", population: 27000 },
  { slug: "deauville", name: "Deauville", region: "Normandie", department: "Calvados", departmentNumber: "14", population: 4000 },
  { slug: "saint-tropez", name: "Saint-Tropez", region: "Provence-Alpes-Cote d'Azur", department: "Var", departmentNumber: "83", population: 4000 },
  { slug: "arcachon", name: "Arcachon", region: "Nouvelle-Aquitaine", department: "Gironde", departmentNumber: "33", population: 11000 },
];

// Points d'interet (aeroports, gares, lieux) par ville pour enrichir le contenu SEO
export const CITY_POIS: Record<string, { airports?: string[]; trainStations?: string[]; events?: string[]; tgvConnections?: string[] }> = {
  "paris": {
    airports: ["Aeroport Roissy-Charles-de-Gaulle (CDG)", "Aeroport d'Orly (ORY)", "Aeroport de Beauvais"],
    trainStations: ["Gare du Nord", "Gare de Lyon", "Gare Montparnasse", "Gare Saint-Lazare", "Gare de l'Est", "Gare d'Austerlitz"],
    tgvConnections: ["Lyon (2h)", "Marseille (3h)", "Bordeaux (2h05)", "Lille (1h)", "Strasbourg (1h45)", "Londres (2h20)", "Bruxelles (1h25)"],
    events: ["Roland-Garros", "Fashion Week", "Salon de l'Automobile", "Foire de Paris"],
  },
  "lyon": {
    airports: ["Aeroport Lyon Saint-Exupery (LYS)", "Aeroport Bron"],
    trainStations: ["Gare Part-Dieu", "Gare Perrache"],
    tgvConnections: ["Paris (2h)", "Marseille (1h40)", "Montpellier (1h40)", "Strasbourg (3h45)", "Geneve (2h)"],
    events: ["Fete des Lumieres", "Nuits de Fourviere", "Biennale de Lyon"],
  },
  "marseille": {
    airports: ["Aeroport Marseille Provence (MRS)"],
    trainStations: ["Gare Saint-Charles"],
    tgvConnections: ["Paris (3h)", "Lyon (1h40)", "Montpellier (1h40)", "Nice (2h30)", "Barcelone (4h30)"],
    events: ["Festival de Marseille", "Mondial la Marseillaise a Petanque"],
  },
  "toulouse": {
    airports: ["Aeroport Toulouse-Blagnac (TLS)"],
    trainStations: ["Gare Matabiau"],
    tgvConnections: ["Paris (4h)", "Bordeaux (2h05)", "Montpellier (2h)"],
    events: ["Marathon de Toulouse", "Rio Loco"],
  },
  "nice": {
    airports: ["Aeroport Nice Cote d'Azur (NCE)"],
    trainStations: ["Gare de Nice-Ville"],
    tgvConnections: ["Paris (5h30)", "Marseille (2h30)", "Lyon (4h15)", "Monaco (20min)"],
    events: ["Carnaval de Nice", "Festival de Cannes (a proximite)"],
  },
  "nantes": {
    airports: ["Aeroport Nantes Atlantique (NTE)"],
    trainStations: ["Gare de Nantes"],
    tgvConnections: ["Paris (2h)", "Lille (4h)", "Bordeaux (4h)", "Rennes (1h15)"],
    events: ["Voyage a Nantes", "La Folle Journee"],
  },
  "montpellier": {
    airports: ["Aeroport Montpellier-Mediterranee"],
    trainStations: ["Gare Saint-Roch", "Gare Sud de France (TGV)"],
    tgvConnections: ["Paris (3h10)", "Lyon (1h40)", "Marseille (1h40)", "Barcelone (3h)"],
    events: ["Festival Radio France", "Montpellier Danse"],
  },
  "strasbourg": {
    airports: ["Aeroport Strasbourg-Entzheim"],
    trainStations: ["Gare de Strasbourg"],
    tgvConnections: ["Paris (1h45)", "Lyon (3h45)", "Francfort (1h40)", "Luxembourg (1h45)"],
    events: ["Marche de Noel", "Foire europeenne"],
  },
  "bordeaux": {
    airports: ["Aeroport Bordeaux-Merignac (BOD)"],
    trainStations: ["Gare Saint-Jean"],
    tgvConnections: ["Paris (2h05)", "Toulouse (2h05)", "Nantes (4h)", "Biarritz (2h)"],
    events: ["Bordeaux Fete le Vin", "Marathon du Medoc"],
  },
  "lille": {
    airports: ["Aeroport Lille-Lesquin (LIL)"],
    trainStations: ["Gare Lille-Europe (TGV)", "Gare Lille-Flandres"],
    tgvConnections: ["Paris (1h)", "Bruxelles (35min)", "Londres (1h25)", "Amsterdam (2h30)"],
    events: ["Braderie de Lille", "Lille3000"],
  },
  "rennes": {
    airports: ["Aeroport Rennes-Saint-Jacques"],
    trainStations: ["Gare de Rennes (TGV)"],
    tgvConnections: ["Paris (1h25)", "Nantes (1h15)", "Saint-Malo (50min)"],
    events: ["Les Tombees de la Nuit", "Trans Musicales"],
  },
  "beauvais": {
    airports: ["Aeroport Paris-Beauvais (BVA)"],
    trainStations: ["Gare de Beauvais"],
  },
  "cannes": {
    airports: ["Aeroport Cannes-Mandelieu", "Aeroport Nice Cote d'Azur a proximite"],
    trainStations: ["Gare de Cannes"],
    events: ["Festival de Cannes", "MIPIM", "Lions du Cannes Lions"],
  },
  "biarritz": {
    airports: ["Aeroport Biarritz-Pays Basque (BIQ)"],
    trainStations: ["Gare de Biarritz"],
    events: ["Biarritz Surf Festival"],
  },
  "deauville": {
    trainStations: ["Gare de Deauville-Trouville"],
    events: ["Festival du film americain", "Grand Prix de Deauville (hippisme)"],
  },
  "saint-tropez": {
    airports: ["Aeroport de Toulon-Hyeres a proximite"],
    events: ["Les Voiles de Saint-Tropez", "Polo Club"],
  },
  "arcachon": {
    trainStations: ["Gare d'Arcachon"],
    events: ["Fetes de la Mer"],
  },
};


export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
