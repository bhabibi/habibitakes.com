const REF_DATA = {
  era: {
    "11": { label: "2000s–2010s Generation", years: "approx. 2000–2019", note: "Transitional era introducing ceramic bezels and updated movements." },
    "12": { label: "2020s Generation (Current)", years: "2020–present", note: "Latest generation with updated case proportions, improved luminescence, and modern calibers." },
    "16": { label: "1990s–2000s Generation", years: "approx. 1990–2002", note: "Transitional era between vintage and modern; highly collectible for purists." },
    "14": { label: "1980s–1990s Generation", years: "approx. 1980–1995", note: "Classic vintage era. Matte dials, tritium lume, and original bracelet designs." },
    "22": { label: "2020s Premium Generation", years: "2020–present", note: "Current high-end and precious metal generation." }
  },

  model: {
    "116610": { name: "Submariner Date", material: "Stainless Steel", era: "pre-2020", category: "Dive Watch", significance: "The definitive modern Submariner before the 2020 refresh. Highly liquid market with strong collector demand.", communityNames: { "LV": "Hulk" } },
    "116613": { name: "Submariner Date", material: "Steel + Yellow Gold (Two-Tone)", era: "pre-2020", category: "Dive Watch", significance: "The Rolesor two-tone Submariner. Nicknamed 'Bluesy' in blue dial spec; balances sportiness with luxury.", communityNames: { "LB": "Bluesy" } },
    "116618": { name: "Submariner Date", material: "Full Yellow Gold", era: "pre-2020", category: "Dive Watch", significance: "All-gold Submariner — the pinnacle of the line's luxury expression before the 2020 update." },
    "126610": { name: "Submariner Date", material: "Stainless Steel", era: "2020–present", category: "Dive Watch", significance: "The current-generation steel Submariner with a wider bezel and updated Cal. 3235 movement.", communityNames: { "LV": "Starbucks" } },
    "126613": { name: "Submariner Date", material: "Steel + Yellow Gold (Two-Tone)", era: "2020–present", category: "Dive Watch", significance: "Updated Rolesor Submariner with modern proportions and improved 3235 caliber.", communityNames: { "LB": "Bluesy" } },
    "116500": { name: "Daytona", material: "Stainless Steel", era: "pre-2023", category: "Chronograph", significance: "The steel Daytona with ceramic bezel — one of the most sought-after references in modern watchmaking. Notorious waitlists.", communityNames: { "LN": "Panda" } },
    "126500": { name: "Daytona", material: "Stainless Steel", era: "2023–present", category: "Chronograph", significance: "The newest Daytona generation, featuring a larger 40mm case and updated in-house movement." },
    "116520": { name: "Daytona", material: "Stainless Steel", era: "pre-2016", category: "Chronograph", significance: "Pre-ceramic bezel Daytona. The last generation with a steel bezel — a benchmark of collectibility." },
    "116710": { name: "GMT-Master II", material: "Stainless Steel", era: "pre-2019", category: "GMT / Traveler", significance: "Previous-gen GMT-Master II — origin of the Batman (BLNR) and Pepsi (BLRO) references.", communityNames: { "BLNR": "Batman", "BLRO": "Pepsi" } },
    "126710": { name: "GMT-Master II", material: "Stainless Steel", era: "2019–present", category: "GMT / Traveler", significance: "Current GMT-Master II with Jubilee bracelet option and upgraded Cal. 3285 movement.", communityNames: { "BLNR": "Batgirl", "BLRO": "Pepsi" } },
    "126711": { name: "GMT-Master II", material: "Steel + Everose Gold (Two-Tone)", era: "2018–present", category: "GMT / Traveler", significance: "The two-tone GMT in Everose Rolesor, beloved for its warm Root Beer brown/black ceramic bezel.", communityNames: { "CHNR": "Root Beer" } },
    "228238": { name: "Day-Date 40", material: "18k Yellow Gold", era: "2015–present", category: "Dress Watch", significance: "The 'President's Watch' in 40mm. Symbol of achievement — worn by world leaders for decades." },
    "116233": { name: "Datejust 36", material: "Steel + Yellow Gold (Two-Tone)", era: "pre-2016", category: "Dress Watch", significance: "Classic Rolesor Datejust — the original luxury sports watch, refined over generations." },
    "126334": { name: "Datejust 41", material: "Stainless Steel", era: "2016–present", category: "Dress Watch", significance: "The modern large Datejust. Versatile enough for boardroom or weekend wear." },
    "114060": { name: "Submariner (No Date)", material: "Stainless Steel", era: "2012–2020", category: "Dive Watch", significance: "The purist's Submariner — no date window means a cleaner, symmetrical dial. Beloved by collectors for its understated elegance.", communityName: "No-Date Sub" },
    "124060": { name: "Submariner (No Date)", material: "Stainless Steel", era: "2020–present", category: "Dive Watch", significance: "Current-generation No-Date Submariner with Cal. 3230 and 41mm case. The purist choice in the modern lineup.", communityName: "No-Date Sub" },
    "116400": { name: "Milgauss", material: "Stainless Steel", era: "2007–2019", category: "Anti-Magnetic", significance: "Rolex's magnetic-field resistant watch, built for scientists. The 116400GV is famous for its green sapphire crystal — unique in the entire Rolex catalogue.", communityNames: { "GV": "Green Milgauss" } }
  },

  bezel: {
    "0": { label: "Fixed Bezel (Smooth or Tachymeter)", description: "A non-rotating bezel. May be smooth and polished on dress watches, or carry tachymeter markings on the Daytona." },
    "1": { label: "Rotating Bezel (Dive / GMT)", description: "A functional rotating bezel used for elapsed-time tracking on dive watches (unidirectional) or GMT tracking (bidirectional)." },
    "2": { label: "Engraved Bezel", description: "Decoratively engraved bezel, often found on vintage and anniversary references." },
    "3": { label: "Fluted Bezel", description: "Iconic engine-turned fluting pattern. Originally functional to tighten the case; now a hallmark of precious metal and dress references." },
    "4": { label: "Gem-Set Bezel", description: "Set with diamonds or other precious stones. Found on luxury and precious metal variants." },
    "5": { label: "Bidirectional Rotating Bezel (GMT)", description: "24-hour graduated bezel that rotates in both directions to track a second time zone. Signature of the GMT-Master family." },
    "6": { label: "Tachymeter Bezel", description: "Fixed bezel calibrated to measure speed over a known distance. Exclusive to the Daytona chronograph." }
  },

  bracelet: {
    "0": { label: "Oyster Bracelet — Stainless Steel", description: "The most iconic Rolex bracelet — three-link solid steel construction, introduced in 1947. Robust, sporty, and water-resistant." },
    "1": { label: "Jubilee Bracelet — Stainless Steel", description: "Five-link bracelet with center links. More refined appearance; originally created for the Datejust's debut in 1945." },
    "3": { label: "Oyster Bracelet — Two-Tone (SS + Yellow Gold)", description: "Oyster construction in Rolesor: steel outer links, yellow gold center links. Bridges sport and luxury." },
    "4": { label: "Jubilee Bracelet — Two-Tone", description: "Five-link Jubilee in Rolesor two-tone. Classic dress bracelet with precious metal warmth." },
    "8": { label: "Oyster / President Bracelet — Full Yellow Gold", description: "Solid 18k yellow gold bracelet construction. Heavy, substantial, and unmistakably luxurious." },
    "9": { label: "Oyster Bracelet — White Gold", description: "Solid 18k white gold Oyster bracelet. Cool-toned precious metal for platinum-adjacent aesthetic." }
  },

  suffix: {
    "LN":   { label: "Black Ceramic Bezel", color: "#2a2a2a", description: "Cerachrom insert in solid black. Timelessly elegant. Scratch-resistant and UV-stable." },
    "LV":   { label: "Green Ceramic Bezel", color: "#2d4a2d", description: "Cerachrom insert in vivid green. 'Hulk' on the 116610LV; 'Kermit' on the older 16610LV; 'Starbucks' on the 126610LV." },
    "LB":   { label: "Blue Ceramic Bezel", color: "#1a2d4a", description: "Cerachrom insert in deep blue. Paired with white gold indices for a crisp nautical aesthetic." },
    "BLNR": { label: "Black / Blue Ceramic Bezel", color: "#1a1a3a", description: "Bicolor Cerachrom in black and blue. Day half blue, night half black — a technically remarkable single-piece ceramic bezel." },
    "BLRO": { label: "Blue / Red Ceramic Bezel (Pepsi)", color: "#3a1a1a", description: "Bicolor Cerachrom in blue and red. Revives the original 1955 GMT-Master 'Pepsi' color scheme in ultra-hard ceramic." },
    "CHNR": { label: "Brown / Black Ceramic Bezel (Root Beer)", color: "#3a2010", description: "Bicolor Cerachrom in chocolate brown and black. The modern 'Root Beer' — a warm, earthy tone that pairs with Everose gold Rolesor." },
    "GV":   { label: "Green Sapphire Crystal", color: "#1a3a1a", description: "Not a bezel insert but a unique green-tinted sapphire crystal — the only Rolex to feature a colored crystal. Exclusive to the Milgauss 116400GV." }
  }
};
