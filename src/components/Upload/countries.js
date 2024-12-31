const data = [
  {
    country: "Aruba",
    code: "ABW",
  },
  {
    country: "Africa Eastern and Southern",
    code: "AFE",
  },
  {
    country: "Afghanistan",
    code: "AFG",
  },
  {
    country: "Africa",
    code: "AFR",
  },
  {
    country: "Africa Western and Central",
    code: "AFW",
  },
  {
    country: "Angola",
    code: "AGO",
  },
  {
    country: "Albania",
    code: "ALB",
  },
  {
    country: "Andorra",
    code: "AND",
  },
  {
    country: "Arab World",
    code: "ARB",
  },
  {
    country: "United Arab Emirates",
    code: "ARE",
  },
  {
    country: "Argentina",
    code: "ARG",
  },
  {
    country: "Armenia",
    code: "ARM",
  },
  {
    country: "American Samoa",
    code: "ASM",
  },
  {
    country: "Antigua and Barbuda",
    code: "ATG",
  },
  {
    country: "Australia",
    code: "AUS",
  },
  {
    country: "Austria",
    code: "AUT",
  },
  {
    country: "Azerbaijan",
    code: "AZE",
  },
  {
    country: "Burundi",
    code: "BDI",
  },
  {
    country: "East Asia & Pacific (IBRD-only countries)",
    code: "BEA",
  },
  {
    country: "Europe & Central Asia (IBRD-only countries)",
    code: "BEC",
  },
  {
    country: "Belgium",
    code: "BEL",
  },
  {
    country: "Benin",
    code: "BEN",
  },
  {
    country: "Burkina Faso",
    code: "BFA",
  },
  {
    country: "Bangladesh",
    code: "BGD",
  },
  {
    country: "Bulgaria",
    code: "BGR",
  },
  {
    country: "IBRD countries classified as high income",
    code: "BHI",
  },
  {
    country: "Bahrain",
    code: "BHR",
  },
  {
    country: "Bahamas, The",
    code: "BHS",
  },
  {
    country: "Bosnia and Herzegovina",
    code: "BIH",
  },
  {
    country: "Latin America & the Caribbean (IBRD-only countries)",
    code: "BLA",
  },
  {
    country: "Belarus",
    code: "BLR",
  },
  {
    country: "Belize",
    code: "BLZ",
  },
  {
    country: "Middle East & North Africa (IBRD-only countries)",
    code: "BMN",
  },
  {
    country: "Bermuda",
    code: "BMU",
  },
  {
    country: "Bolivia",
    code: "BOL",
  },
  {
    country: "Brazil",
    code: "BRA",
  },
  {
    country: "Barbados",
    code: "BRB",
  },
  {
    country: "Brunei Darussalam",
    code: "BRN",
  },
  {
    country: "Sub-Saharan Africa (IBRD-only countries)",
    code: "BSS",
  },
  {
    country: "Bhutan",
    code: "BTN",
  },
  {
    country: "Botswana",
    code: "BWA",
  },
  {
    country: "Sub-Saharan Africa (IFC classification)",
    code: "CAA",
  },
  {
    country: "Central African Republic",
    code: "CAF",
  },
  {
    country: "Canada",
    code: "CAN",
  },
  {
    country: "East Asia and the Pacific (IFC classification)",
    code: "CEA",
  },
  {
    country: "Central Europe and the Baltics",
    code: "CEB",
  },
  {
    country: "Europe and Central Asia (IFC classification)",
    code: "CEU",
  },
  {
    country: "Switzerland",
    code: "CHE",
  },
  {
    country: "Channel Islands",
    code: "CHI",
  },
  {
    country: "Chile",
    code: "CHL",
  },
  {
    country: "China",
    code: "CHN",
  },
  {
    country: "Cote d'Ivoire",
    code: "CIV",
  },
  {
    country: "Latin America and the Caribbean (IFC classification)",
    code: "CLA",
  },
  {
    country: "Middle East and North Africa (IFC classification)",
    code: "CME",
  },
  {
    country: "Cameroon",
    code: "CMR",
  },
  {
    country: "Congo, Dem. Rep.",
    code: "COD",
  },
  {
    country: "Congo, Rep.",
    code: "COG",
  },
  {
    country: "Colombia",
    code: "COL",
  },
  {
    country: "Comoros",
    code: "COM",
  },
  {
    country: "Cabo Verde",
    code: "CPV",
  },
  {
    country: "Costa Rica",
    code: "CRI",
  },
  {
    country: "South Asia (IFC classification)",
    code: "CSA",
  },
  {
    country: "Caribbean small states",
    code: "CSS",
  },
  {
    country: "Cuba",
    code: "CUB",
  },
  {
    country: "Curacao",
    code: "CUW",
  },
  {
    country: "Cayman Islands",
    code: "CYM",
  },
  {
    country: "Cyprus",
    code: "CYP",
  },
  {
    country: "Czechia",
    code: "CZE",
  },
  {
    country: "East Asia & Pacific (IDA-eligible countries)",
    code: "DEA",
  },
  {
    country: "Europe & Central Asia (IDA-eligible countries)",
    code: "DEC",
  },
  {
    country: "Germany",
    code: "DEU",
  },
  {
    country: "Djibouti",
    code: "DJI",
  },
  {
    country: "Latin America & the Caribbean (IDA-eligible countries)",
    code: "DLA",
  },
  {
    country: "Dominica",
    code: "DMA",
  },
  {
    country: "Middle East & North Africa (IDA-eligible countries)",
    code: "DMN",
  },
  {
    country: "Denmark",
    code: "DNK",
  },
  {
    country:
      "IDA countries in Sub-Saharan Africa not classified as fragile situations ",
    code: "DNS",
  },
  {
    country: "Dominican Republic",
    code: "DOM",
  },
  {
    country: "South Asia (IDA-eligible countries)",
    code: "DSA",
  },
  {
    country:
      "IDA countries in Sub-Saharan Africa classified as fragile situations ",
    code: "DSF",
  },
  {
    country: "Sub-Saharan Africa (IDA-eligible countries)",
    code: "DSS",
  },
  {
    country: "Algeria",
    code: "DZA",
  },
  {
    country: "East Asia & Pacific (excluding high income)",
    code: "EAP",
  },
  {
    country: "Early-demographic dividend",
    code: "EAR",
  },
  {
    country: "East Asia & Pacific",
    code: "EAS",
  },
  {
    country: "Europe & Central Asia (excluding high income)",
    code: "ECA",
  },
  {
    country: "Europe & Central Asia",
    code: "ECS",
  },
  {
    country: "Ecuador",
    code: "ECU",
  },
  {
    country: "Egypt, Arab Rep.",
    code: "EGY",
  },
  {
    country: "Euro area",
    code: "EMU",
  },
  {
    country: "Eritrea",
    code: "ERI",
  },
  {
    country: "Spain",
    code: "ESP",
  },
  {
    country: "Estonia",
    code: "EST",
  },
  {
    country: "Ethiopia",
    code: "ETH",
  },
  {
    country: "European Union",
    code: "EUU",
  },
  {
    country: "Fragile and conflict affected situations",
    code: "FCS",
  },
  {
    country: "Finland",
    code: "FIN",
  },
  {
    country: "Fiji",
    code: "FJI",
  },
  {
    country: "France",
    code: "FRA",
  },
  {
    country: "Faroe Islands",
    code: "FRO",
  },
  {
    country: "Micronesia, Fed. Sts.",
    code: "FSM",
  },
  {
    country:
      "IDA countries classified as fragile situations, excluding Sub-Saharan Africa",
    code: "FXS",
  },
  {
    country: "Gabon",
    code: "GAB",
  },
  {
    country: "United Kingdom",
    code: "GBR",
  },
  {
    country: "Georgia",
    code: "GEO",
  },
  {
    country: "Ghana",
    code: "GHA",
  },
  {
    country: "Gibraltar",
    code: "GIB",
  },
  {
    country: "Guinea",
    code: "GIN",
  },
  {
    country: "Gambia, The",
    code: "GMB",
  },
  {
    country: "Guinea-Bissau",
    code: "GNB",
  },
  {
    country: "Equatorial Guinea",
    code: "GNQ",
  },
  {
    country: "Greece",
    code: "GRC",
  },
  {
    country: "Grenada",
    code: "GRD",
  },
  {
    country: "Greenland",
    code: "GRL",
  },
  {
    country: "Guatemala",
    code: "GTM",
  },
  {
    country: "Guam",
    code: "GUM",
  },
  {
    country: "Guyana",
    code: "GUY",
  },
  {
    country: "High income",
    code: "HIC",
  },
  {
    country: "Hong Kong SAR, China",
    code: "HKG",
  },
  {
    country: "Honduras",
    code: "HND",
  },
  {
    country: "Heavily indebted poor countries (HIPC)",
    code: "HPC",
  },
  {
    country: "Croatia",
    code: "HRV",
  },
  {
    country: "Haiti",
    code: "HTI",
  },
  {
    country: "Hungary",
    code: "HUN",
  },
  {
    country: "IBRD, including blend",
    code: "IBB",
  },
  {
    country: "IBRD only",
    code: "IBD",
  },
  {
    country: "IDA & IBRD total",
    code: "IBT",
  },
  {
    country: "IDA total",
    code: "IDA",
  },
  {
    country: "IDA blend",
    code: "IDB",
  },
  {
    country: "Indonesia",
    code: "IDN",
  },
  {
    country: "IDA only",
    code: "IDX",
  },
  {
    country: "Isle of Man",
    code: "IMN",
  },
  {
    country: "India",
    code: "IND",
  },
  {
    country: "Not classified",
    code: "INX",
  },
  {
    country: "Ireland",
    code: "IRL",
  },
  {
    country: "Iran, Islamic Rep.",
    code: "IRN",
  },
  {
    country: "Iraq",
    code: "IRQ",
  },
  {
    country: "Iceland",
    code: "ISL",
  },
  {
    country: "Israel",
    code: "ISR",
  },
  {
    country: "Italy",
    code: "ITA",
  },
  {
    country: "Jamaica",
    code: "JAM",
  },
  {
    country: "Jordan",
    code: "JOR",
  },
  {
    country: "Japan",
    code: "JPN",
  },
  {
    country: "Kazakhstan",
    code: "KAZ",
  },
  {
    country: "Kenya",
    code: "KEN",
  },
  {
    country: "Kyrgyz Republic",
    code: "KGZ",
  },
  {
    country: "Cambodia",
    code: "KHM",
  },
  {
    country: "Kiribati",
    code: "KIR",
  },
  {
    country: "St. Kitts and Nevis",
    code: "KNA",
  },
  {
    country: "Korea, Rep.",
    code: "KOR",
  },
  {
    country: "Kuwait",
    code: "KWT",
  },
  {
    country: "Latin America & Caribbean (excluding high income)",
    code: "LAC",
  },
  {
    country: "Lao PDR",
    code: "LAO",
  },
  {
    country: "Lebanon",
    code: "LBN",
  },
  {
    country: "Liberia",
    code: "LBR",
  },
  {
    country: "Libya",
    code: "LBY",
  },
  {
    country: "St. Lucia",
    code: "LCA",
  },
  {
    country: "Latin America & Caribbean ",
    code: "LCN",
  },
  {
    country: "Least developed countries: UN classification",
    code: "LDC",
  },
  {
    country: "Low income",
    code: "LIC",
  },
  {
    country: "Liechtenstein",
    code: "LIE",
  },
  {
    country: "Sri Lanka",
    code: "LKA",
  },
  {
    country: "Lower middle income",
    code: "LMC",
  },
  {
    country: "Low & middle income",
    code: "LMY",
  },
  {
    country: "Lesotho",
    code: "LSO",
  },
  {
    country: "Late-demographic dividend",
    code: "LTE",
  },
  {
    country: "Lithuania",
    code: "LTU",
  },
  {
    country: "Luxembourg",
    code: "LUX",
  },
  {
    country: "Latvia",
    code: "LVA",
  },
  {
    country: "Macao SAR, China",
    code: "MAC",
  },
  {
    country: "St. Martin (French part)",
    code: "MAF",
  },
  {
    country: "Morocco",
    code: "MAR",
  },
  {
    country: "Monaco",
    code: "MCO",
  },
  {
    country: "Moldova",
    code: "MDA",
  },
  {
    country: "Middle East (developing only)",
    code: "MDE",
  },
  {
    country: "Madagascar",
    code: "MDG",
  },
  {
    country: "Maldives",
    code: "MDV",
  },
  {
    country: "Middle East & North Africa",
    code: "MEA",
  },
  {
    country: "Mexico",
    code: "MEX",
  },
  {
    country: "Marshall Islands",
    code: "MHL",
  },
  {
    country: "Middle income",
    code: "MIC",
  },
  {
    country: "North Macedonia",
    code: "MKD",
  },
  {
    country: "Mali",
    code: "MLI",
  },
  {
    country: "Malta",
    code: "MLT",
  },
  {
    country: "Myanmar",
    code: "MMR",
  },
  {
    country: "Middle East & North Africa (excluding high income)",
    code: "MNA",
  },
  {
    country: "Montenegro",
    code: "MNE",
  },
  {
    country: "Mongolia",
    code: "MNG",
  },
  {
    country: "Northern Mariana Islands",
    code: "MNP",
  },
  {
    country: "Mozambique",
    code: "MOZ",
  },
  {
    country: "Mauritania",
    code: "MRT",
  },
  {
    country: "Mauritius",
    code: "MUS",
  },
  {
    country: "Malawi",
    code: "MWI",
  },
  {
    country: "Malaysia",
    code: "MYS",
  },
  {
    country: "North America",
    code: "NAC",
  },
  {
    country: "North Africa",
    code: "NAF",
  },
  {
    country: "Namibia",
    code: "NAM",
  },
  {
    country: "New Caledonia",
    code: "NCL",
  },
  {
    country: "Niger",
    code: "NER",
  },
  {
    country: "Nigeria",
    code: "NGA",
  },
  {
    country: "Nicaragua",
    code: "NIC",
  },
  {
    country: "Netherlands",
    code: "NLD",
  },
  {
    country: "Norway",
    code: "NOR",
  },
  {
    country: "Nepal",
    code: "NPL",
  },
  {
    country: "Non-resource rich Sub-Saharan Africa countries",
    code: "NRS",
  },
  {
    country: "Nauru",
    code: "NRU",
  },
  {
    country:
      "IDA countries not classified as fragile situations, excluding Sub-Saharan Africa",
    code: "NXS",
  },
  {
    country: "New Zealand",
    code: "NZL",
  },
  {
    country: "OECD members",
    code: "OED",
  },
  {
    country: "Oman",
    code: "OMN",
  },
  {
    country: "Other small states",
    code: "OSS",
  },
  {
    country: "Pakistan",
    code: "PAK",
  },
  {
    country: "Panama",
    code: "PAN",
  },
  {
    country: "Peru",
    code: "PER",
  },
  {
    country: "Philippines",
    code: "PHL",
  },
  {
    country: "Palau",
    code: "PLW",
  },
  {
    country: "Papua New Guinea",
    code: "PNG",
  },
  {
    country: "Poland",
    code: "POL",
  },
  {
    country: "Pre-demographic dividend",
    code: "PRE",
  },
  {
    country: "Puerto Rico",
    code: "PRI",
  },
  {
    country: "Korea, Dem. People's Rep.",
    code: "PRK",
  },
  {
    country: "Portugal",
    code: "PRT",
  },
  {
    country: "Paraguay",
    code: "PRY",
  },
  {
    country: "West Bank and Gaza",
    code: "PSE",
  },
  {
    country: "Pacific island small states",
    code: "PSS",
  },
  {
    country: "Post-demographic dividend",
    code: "PST",
  },
  {
    country: "French Polynesia",
    code: "PYF",
  },
  {
    country: "Qatar",
    code: "QAT",
  },
  {
    country: "Romania",
    code: "ROU",
  },
  {
    country: "Resource rich Sub-Saharan Africa countries",
    code: "RRS",
  },
  {
    country: "Russian Federation",
    code: "RUS",
  },
  {
    country: "Rwanda",
    code: "RWA",
  },
  {
    country: "South Asia",
    code: "SAS",
  },
  {
    country: "Saudi Arabia",
    code: "SAU",
  },
  {
    country: "Sudan",
    code: "SDN",
  },
  {
    country: "Senegal",
    code: "SEN",
  },
  {
    country: "Singapore",
    code: "SGP",
  },
  {
    country: "Solomon Islands",
    code: "SLB",
  },
  {
    country: "Sierra Leone",
    code: "SLE",
  },
  {
    country: "El Salvador",
    code: "SLV",
  },
  {
    country: "San Marino",
    code: "SMR",
  },
  {
    country: "Somalia",
    code: "SOM",
  },
  {
    country: "Serbia",
    code: "SRB",
  },
  {
    country: "Sub-Saharan Africa (excluding high income)",
    code: "SSA",
  },
  {
    country: "South Sudan",
    code: "SSD",
  },
  {
    country: "Sub-Saharan Africa ",
    code: "SSF",
  },
  {
    country: "Small states",
    code: "SST",
  },
  {
    country: "Sao Tome and Principe",
    code: "STP",
  },
  {
    country: "Suriname",
    code: "SUR",
  },
  {
    country: "Slovak Republic",
    code: "SVK",
  },
  {
    country: "Slovenia",
    code: "SVN",
  },
  {
    country: "Sweden",
    code: "SWE",
  },
  {
    country: "Eswatini",
    code: "SWZ",
  },
  {
    country: "Sint Maarten (Dutch part)",
    code: "SXM",
  },
  {
    country: "Sub-Saharan Africa excluding South Africa",
    code: "SXZ",
  },
  {
    country: "Seychelles",
    code: "SYC",
  },
  {
    country: "Syrian Arab Republic",
    code: "SYR",
  },
  {
    country: "Turks and Caicos Islands",
    code: "TCA",
  },
  {
    country: "Chad",
    code: "TCD",
  },
  {
    country: "East Asia & Pacific (IDA & IBRD countries)",
    code: "TEA",
  },
  {
    country: "Europe & Central Asia (IDA & IBRD countries)",
    code: "TEC",
  },
  {
    country: "Togo",
    code: "TGO",
  },
  {
    country: "Thailand",
    code: "THA",
  },
  {
    country: "Tajikistan",
    code: "TJK",
  },
  {
    country: "Turkmenistan",
    code: "TKM",
  },
  {
    country: "Latin America & the Caribbean (IDA & IBRD countries)",
    code: "TLA",
  },
  {
    country: "Timor-Leste",
    code: "TLS",
  },
  {
    country: "Middle East & North Africa (IDA & IBRD countries)",
    code: "TMN",
  },
  {
    country: "Tonga",
    code: "TON",
  },
  {
    country: "South Asia (IDA & IBRD)",
    code: "TSA",
  },
  {
    country: "Sub-Saharan Africa (IDA & IBRD countries)",
    code: "TSS",
  },
  {
    country: "Trinidad and Tobago",
    code: "TTO",
  },
  {
    country: "Tunisia",
    code: "TUN",
  },
  {
    country: "Turkiye",
    code: "TUR",
  },
  {
    country: "Tuvalu",
    code: "TUV",
  },
  {
    country: "Tanzania",
    code: "TZA",
  },
  {
    country: "Uganda",
    code: "UGA",
  },
  {
    country: "Ukraine",
    code: "UKR",
  },
  {
    country: "Upper middle income",
    code: "UMC",
  },
  {
    country: "Uruguay",
    code: "URY",
  },
  {
    country: "United States",
    code: "USA",
  },
  {
    country: "Uzbekistan",
    code: "UZB",
  },
  {
    country: "St. Vincent and the Grenadines",
    code: "VCT",
  },
  {
    country: "Venezuela, RB",
    code: "VEN",
  },
  {
    country: "British Virgin Islands",
    code: "VGB",
  },
  {
    country: "Virgin Islands (U.S.)",
    code: "VIR",
  },
  {
    country: "Viet Nam",
    code: "VNM",
  },
  {
    country: "Vanuatu",
    code: "VUT",
  },
  {
    country: "World",
    code: "WLD",
  },
  {
    country: "Samoa",
    code: "WSM",
  },
  {
    country: "Kosovo",
    code: "XKX",
  },
  {
    country: "Sub-Saharan Africa excluding South Africa and Nigeria",
    code: "XZN",
  },
  {
    country: "Yemen, Rep.",
    code: "YEM",
  },
  {
    country: "South Africa",
    code: "ZAF",
  },
  {
    country: "Zambia",
    code: "ZMB",
  },
  {
    country: "Zimbabwe",
    code: "ZWE",
  },
];

export default data;
