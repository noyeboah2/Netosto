/* Chapter 1 in Twi (DRAFT: needs review by a fluent speaker and a health worker).
   Same structure as sickle-cell.js: scene ids, choices in the same order,
   [[glossary-id|label]] markup kept so definitions still pop up. */
window.SIG = window.SIG || {};
window.SIG.translations = window.SIG.translations || {};
window.SIG.translations['sickle-cell'] = window.SIG.translations['sickle-cell'] || {};
window.SIG.translations['sickle-cell'].tw = {
  title: 'Sickle Cell Yareɛ',
  storyTitle: 'Mogya Ketewa Kɔkɔɔ Akwantuo',

  scenes: {
    marrow: {
      title: 'Wɔwo Wo',
      text: [
        'Kwesi srɛ dompe mu [[bone-marrow|bone marrow]] mu baabi a ɛkɔ akyire no, ɛhɔ na wɔwo wo. Woyɛ [[red-blood-cell|mogya ketewa kɔkɔɔ]], baako wɔ ɔpepem mmienu a ne nipadua yɛ sɛkan biara mu.',
        'W’adwuma baako pɛ a wobɛyɛ wɔ w’asetena nyinaa mu ne sɛ wobɛsoa [[oxygen]] akɔ Kwesi nipadua mu baabiara.',
        'Kwesi adi mfeɛ 15, ɔte Kumase, na n’ani gye bɔɔlobɔ ho paa. Nanso ɔwɔ [[sickle-cell-disease|sickle cell yareɛ]]. Yei kyerɛ sɛ protein a ahyɛ wo ma no, [[haemoglobin]], ne nnipa dodoɔ no ara deɛ nse koraa.'
      ],
      note: {
        title: 'Baabi a mogya nketewa kɔkɔɔ firi',
        text: [
          'Bone marrow mu na wɔyɛ mogya nketewa kɔkɔɔ. Wɔ mmabunu ne mpanin mu no, ɛtaa yɛ nnompe akɛseɛ te sɛ asene, akyi dompe, mfe ne srɛ dompe atifi mu.',
          'Mogya ketewa kɔkɔɔ biara kura haemoglobin bɛyɛ ɔpepem 270. Haemoglobin yɛ protein a ɛfa oxygen wɔ ahrawa mu na ɛde gyae wɔ nipadua mu.'
        ]
      },
      choices: [
        'Hwɛ wo haemoglobin no yie',
        'Kyɛ wo ho fi kɔ mogya asubɔnten no mu'
      ]
    },

    gene: {
      title: 'Nkyerɛwdeɛ Baako Asesa',
      text: [
        'Wohwɛ akwankyerɛ a wɔde yɛɛ wo haemoglobin no yie. Ɛfiri [[hbb-gene|HBB gene]] no mu. Wɔ Kwesi DNA mu no, saa gene yi nkyerɛwdeɛ baako pɛ nse: [[mutation|nsesaeɛ]] ketewa baako wɔ nkyerɛwdeɛ ɔpepem pii mu.',
        'Saa nsesaeɛ baako yi sesa haemoglobin protein no ntoboaseɛ baako: glutamic acid dane valine. Deɛ ɛfiri mu ba ne [[haemoglobin-s|haemoglobin S]].',
        'Kwesi nyaa saa gene a asesa yi baako firi ne maame hɔ, na baako nso firi ne papa hɔ. Ne [[genotype]] yɛ SS.'
      ],
      note: {
        title: 'Sɛdeɛ gene nsesaeɛ baako firi awofoɔ hɔ ba',
        text: [
          'Obiara wɔ HBB gene mmienu: baako firi ɔwofoɔ biara hɔ. Onipa a ɔwɔ daa deɛ (A) baako ne sickle deɛ (S) baako no wɔ [[sickle-cell-trait|sickle cell trait]] (AS). Ne ho taa yɛ no den, nanso ɔtumi de S ma ne mma.',
          'Onipa a ɔwɔ S mmienu (SS) no wɔ sickle cell yareɛ. Yɛfrɛ yei [[recessive]] awoɔ. Kwesi awofoɔ anyɛ bɔne biara. Wɔn baanu nyinaa yɛ [[carrier|akurafoɔ]] kɛkɛ.'
        ],
        link: 'Sɔ hwɛ wɔ Gene Nhwehwɛmu no mu'
      },
      choices: [
        'Kɔ mogya asubɔnten no mu'
      ]
    },

    bloodstream: {
      title: 'Asubɔnten No Mu',
      text: [
        'Wofiri bone marrow no mu kɔ ntini ketewa bi mu, na wo ne mogya nketewa ɔpepepem pii bɔ mu sen.',
        'Seesei wo nsusuiɛ te sɛ mogya ketewa kɔkɔɔ biara: wo yɛ kurukuruwa, wo ho yɛ mmrɛ, na wotumi kyea wo ho, te sɛ kurukuruwa a wɔamia ne mfimfini.',
        'Saa kyea a wotumi kyea wo ho no ho hia. [[capillary|Ntini nketewa]] bi yɛ teaa sene wo, enti ɛsɛ sɛ wobɔ wo ho mu na wokyea wo ho ansa na woatumi atwa mu.'
      ],
      note: {
        title: 'Deɛ enti a kyea a wotumi kyea wo ho ho hia',
        text: [
          'Mogya ketewa kɔkɔɔ trɛ bɛyɛ micrometre 7 kɔsi 8, nanso ntini nketewa a ɛyɛ teaa sene biara bi sua sene saa. Mogya nketewa a ɛho yɛ den fa kyea so twa mu.',
          'Mogya ketewa a ɛntumi nkyea ne ho no tumi ka hɔ. Kae yei: ɛno ne sickle cell yareɛ ntease safoa.'
        ]
      },
      choices: [
        'Fa mogya asuo no so kɔ ahrawa mu'
      ]
    },

    lungs: {
      title: 'Oxygen Home Bi',
      text: [
        'Wɔ ahrawa mu no, oxygen hyɛ mu ma. Wo haemoglobin fa no, na wo ho yɛ kɔkɔɔ paa.',
        'Bere a oxygen ahyɛ wo ma no, haemoglobin S yɛ ne ho sɛ daa deɛ, enti wo ho yɛ toro na wotumi kyea wo ho.',
        'Seesei wowɔ biribi a ɛsɛ sɛ wode kɔma. Ɛhe na worekɔ?'
      ],
      note: {
        title: 'Haw no ba bere a oxygen fi mu',
        text: [
          'Mogya a oxygen wom yɛ kɔkɔɔ paa; mogya a ɛde ne oxygen agyae no yɛ tumtum kakra.',
          'Haemoglobin S de haw ba titiriw bere a ɛde oxygen agyae, bere a mogya ketewa no yɛ [[deoxygenated]]. Sɛdeɛ mogya ketewa no tena hɔ a oxygen nni mu kyɛ no, saa ara na ɛbɛtumi akyea.'
        ]
      },
      choices: [
        'Kɔ Kwesi nan ntini mu. Ɔrebɔ bɔɔl wɔ awia ɔhyeɛ mu.',
        'Kɔ Kwesi amemene mu. Ɔresua ade wɔ nwunu ase ama ne sɔhwɛ.'
      ]
    },

    football: {
      title: 'Awia Bɔɔlobɔ',
      text: [
        'Kwesi retu mmirika di bɔɔl no akyi. Ewiem hyeɛ yɛ 33°C, na ɔnnom nsuo biara firi awia aduane akyi. Ne nan ntini hia oxygen paa, na wode wo deɛ ma no ntɛm.',
        'Bere a oxygen nni wo mu no, biribi nwanwa si wo mu. Haemoglobin S no fiti aseɛ bɔ mu yɛ ahoma tenten a ɛyɛ den. Yɛfrɛ yei [[polymerisation]].',
        'Ahoma no twe wo ma wo nsusuiɛ sesa. Wo yɛ den, wofam nneɛma ho, na wokyea te sɛ nnaboa (sickle), adwinneɛ a akuafoɔ de twa wura. [[dehydration|Nsuo a ɛso atew wɔ nipadua mu]] ma ɛyɛ den kɛse: sɛ nsuo sua a, haemoglobin a ɛwɔ wo mu no hyɛ mu ma na ɛbɔ mu ntɛm.'
      ],
      note: {
        title: 'Deɛ ɛma mogya nketewa kyea',
        text: [
          'Oxygen sua, nsuo a ɛso atew, ɔhyeɛ anaa awɔ kɛseɛ, nyarewa ne apɔmuteɛ a ano yɛ den nyinaa tumi ma mogya nketewa kyea ntɛm.',
          'Ɛno nti na yɛka kyerɛ nnipa a wɔwɔ sickle cell yareɛ sɛ wɔnnom nsuo pii, wɔnhome bere a wɔabrɛ, na wɔnhwɛ na ɔhyeɛ anaa awɔ ammu wɔn so. Wɔbɛtumi adi agorɔ; ɛsɛ sɛ wɔhome bere ano bere ano kɛkɛ.'
        ]
      },
      choices: [
        'Kwesi gyae kakra wɔ nwunu ase na ɔnom nsuo',
        'Kwesi mfa n’abrɛ nyɛ hwee na ɔkɔ so bɔ bɔɔl'
      ]
    },

    study: {
      title: 'Awia A Ɛyɛ Dinn',
      text: [
        'Wosen kɔ amemene mu, wode wo oxygen ma, na wosan kɔ ahrawa mu kɔhyɛ ma bio. Mpɛn pii, da biara da.',
        'Kwesi ani agye, wahome, na ɔnom nsuo, enti w’akwantuo no dodoɔ no ara kɔ yie.',
        'Nanso bere biara a wode oxygen ma no, haemoglobin S a ɛwɔ wo mu no twetwe wo honam ani, wo membrane. Kakra kakra ɛsɛe. Woreyɛ akwakora ntɛm.'
      ],
      note: {
        title: 'Deɛ enti a nnipa a wɔwɔ sickle cell brɛ',
        text: [
          'Mogya ketewa kɔkɔɔ a ɛyɛ daa deɛ tena ase bɛyɛ nnafua 120. Sickle mogya ketewa bi tena ase nnafua 10 kɔsi 20 pɛ. Bone marrow ntumi nyɛ foforɔ ntɛm sɛdeɛ ɛbɛsi deɛ awuwu anan.',
          'Yei de [[anaemia]] ba: mogya nketewa kɔkɔɔ a ɛso atew. Ɛno na ɛma nnipa pii a wɔwɔ sickle cell yareɛ brɛ, wɔyɛ mmerɛ, na wɔn home yɛ tiawa, wɔ nna pa mpo mu.'
        ]
      },
      choices: [
        'Kɔ so na hwɛ baabi a w’akwantuo de wo kɔ'
      ]
    },

    recover: {
      title: 'Ɛkaa Kakra',
      text: [
        'Kwesi te mango dua ase na ɔnom nsuo toa ma. Mogya foforɔ a oxygen wom duru wo nkyɛn, ahoma a ɛyɛ den a ɛwɔ wo mu no gyae, na wosan yɛ mmrɛ kɔ wo kurukuruwa nsusuiɛ mu.',
        'Phew! Saa bere yi deɛ, woasan ayɛ sɛdeɛ na wote.',
        'Nanso bere biara a wokyea no gyaw nsɛnkyerɛnneɛ wɔ wo membrane so. Sɛ ɛba mpɛn pii a, mogya nketewa bi kyea koraa na wɔnsan nsiesie.'
      ],
      note: {
        title: 'Nneɛma nketewa yɛ nsonsonoeɛ kɛseɛ',
        text: [
          'Sɛ mogya nketewa fiti aseɛ kyea na oxygen san ba a, ɛtaa san yɛ sɛdeɛ na ɛte. Nanso sɛ ɛba mpɛn pii a, membrane no sɛe, na mogya nketewa bi kyea koraa.',
          'Nsuo a wobɛnom, ahomegyeɛ ne sɛ wobɛma wo ho ayɛ hyew no nsa yareɛ no, nanso ampa ara ɛtumi tew ɛyaw kɛseɛ so.'
        ]
      },
      choices: [
        'Toa w’akwantuo no so',
        'Hwɛ deɛ anka ɛbɛsi sɛ Kwesi kɔɔ so bɔɔ bɔɔl a'
      ]
    },

    crisis: {
      title: 'Kwan Asi',
      text: [
        'Kwesi kɔ so tu mmirika. Wo ne mogya nketewa ɔhaha pii a akyea duru ntini ketewa teaa bi a ɛbɛn ne kotodwe, na mo nyinaa kyere mu, si kwan no te sɛ kar a abɔ mu wɔ Nkran–Kumase kwan so.',
        'Yei ne [[vaso-occlusion]]. Baabi a ɛwɔ akyire no, nam no nnya oxygen.',
        'Kwesi te ɛyaw kɛseɛ mpofirim wɔ ne nan mu. Ɔwɔ [[pain-crisis|ɛyaw kɛseɛ (pain crisis)]].'
      ],
      note: {
        title: 'Deɛ ɛyaw kɛseɛ (pain crisis) yɛ',
        text: [
          'Ɛyaw kɛseɛ ne deɛ ɛtaa ma nnipa a wɔwɔ sickle cell yareɛ kɔ ayaresabea. Ɛyaw no firi nam a oxygen nni mu, na ɛtumi tena nnɔnhwerew pii anaa nnafua pii.',
          'Ɛtumi ka nnompe, nkwaa nkabaeɛ, akyi, koko anaa yafunu. Ɛyaw no yɛ nokorɛ na ano taa yɛ den, enti ɛsɛ sɛ yɛgye nnipa a ɛte wɔn saa no di na yɛboa wɔn ntɛm.'
        ]
      },
      choices: [
        'Kwesi ka kyerɛ ne maame ntɛm ara',
        'Kwesi suma ɛyaw no ɛfiri sɛ ɔmpɛ sɛ bɔɔlobɔ no twam no'
      ]
    },

    warning: {
      title: 'Kɔkɔbɔ Nsɛnkyerɛnneɛ',
      text: [
        'Kwesi anka hwee. Anwummerɛ no, mogya kwan a asi no atrɛ. Seesei mogya nketewa a akyea reka ntini nketewa a ɛwɔ n’ahrawa mu.',
        'Ne koko yɛ no yaw, atiridii aka no, na ɔnhome yie. Ebia yei yɛ [[acute-chest-syndrome|acute chest syndrome]], sickle cell yareɛ haw a ano yɛ den sene biara no baako.',
        'Ne maame hunu sɛ ɔrebrɛ, na ɔde no tu mmirika kɔ ayaresabea.'
      ],
      note: {
        title: 'Ɔhaw nsɛnkyerɛnneɛ a ɛnsɛ sɛ wobu w’ani gu so da',
        text: [
          'Ma obi a ɔwɔ sickle cell yareɛ no, atiridii, koko yaw, ahome a ɛyɛ den, tipae kɛseɛ, mmerɛyɛ mpofirim anaa kasa a ɛyɛ den, anaa yafunu a ahonhon mpofirim yɛ ɔhaw kɛseɛ ho nsɛnkyerɛnneɛ.',
          'Ɛhia ayaresa ntɛm ara. Sɛ wobɛka akyerɛ obi ntɛm no yɛ adeɛ pa bere biara.'
        ],
        link: 'Kenkan kɔkɔbɔ nsɛnkyerɛnneɛ no nyinaa'
      },
      choices: [
        'Di Kwesi akyi kɔ ayaresabea'
      ]
    },

    hospital: {
      title: 'Mmoa Aba',
      text: [
        'Wɔ ayaresabea hɔ no, nɔɔse no fa drip so de nsuo ma Kwesi na ɛsan ma ne mogya nsuo, wɔma no aduro de tew ɛyaw no so, na wɔma no oxygen ka ho ma ɔhome yie.',
        'Nkakrankakra, mogya fiti aseɛ sen bio fa baabi a asi no ho.',
        'Dɔkota bi hwɛ sɛ yareɛ mmoawa biara wɔ ne mu anaa, na ɔkyerɛkyerɛ Kwesi ne ne maame sɛdeɛ wɔbɛhunu kɔkɔbɔ nsɛnkyerɛnneɛ ntɛm bere foforɔ.'
      ],
      note: {
        title: 'Sɛdeɛ wɔsa ɛyaw kɛseɛ',
        text: [
          'Ayaresabea ayaresa ma ɛyaw kɛseɛ taa ka ɛyaw aduro, nsuo ne nhwɛsoɔ a ɛkɔ so bere nyinaa ho. Ɛtɔ da a ɛhia [[blood-transfusion|mogya a wɔde ma]] de mogya nketewa kɔkɔɔ a ɛho yɛ den ka ho.',
          'Ayaresa ankasa gyina deɛ dɔkota no hunu so bere biara. Wɛbsaete yi kyerɛkyerɛ nyansahu no mu; ɛnyɛ ayaresa ho afotuo.'
        ]
      },
      choices: [
        'Kɔ w’akwantuo no awieeɛ'
      ]
    },

    spleen: {
      title: 'Ntwitwiiɛ No',
      text: [
        'W’akwantuo no ama woabrɛ. Wo membrane asɛe, na wo ho yɛ den bere a oxygen wɔ wo mu mpo. Wosen kɔ [[spleen]] no mu, baabi a nipadua twitwi mogya nketewa a anyini anaa asɛe.',
        'Spleen no kyere wo na ɛbubu wo. Wɔbɛsan de wo dade (iron) ayɛ mogya nketewa kɔkɔɔ foforɔ wɔ bone marrow mu.',
        'Nanso mogya nketewa a akyea asi Kwesi spleen kwan firi bere a ɔyɛ abofra ketewa. Apirapira, na ɛnyɛ adwuma yie bio.'
      ],
      note: {
        title: 'Deɛ enti a nyarewa yɛ hu',
        text: [
          'Wɔ sickle cell yareɛ mu no, spleen no taa sɛe wɔ mmofraase. Spleen a asɛe ntumi nko ntia yareɛ mmoawa bi yie.',
          'Ɛno nti na wɔtaa ma mmofra nketewa a wɔwɔ sickle cell penicillin da biara ne vaccine foforɔ, na ɛno nti na wɔfa atiridii (honam hyeɛ) sɛ ɔhaw a ɛhia ntɛm.'
        ]
      },
      choices: [
        'Hwɛ sɛdeɛ adɔkotafoɔ boa Kwesi ma ɔtena ase yie'
      ]
    },

    treatments: {
      title: 'Asetena Pa',
      text: [
        'Ansa na wobɛkɔ no, wohunu Kwesi daakye kakra. Ɔnom [[hydroxyurea]] da biara. Saa aduro yi boa ne nipadua ma ɛyɛ [[fetal-haemoglobin|fetal haemoglobin]] pii, haemoglobin bi a ɛnkyea. Mogya nketewa kɔkɔɔ foforɔ a ɛkura bi no nkyea pii.',
        'Ɔnom folic acid de boa ma ne nipadua yɛ mogya nketewa kɔkɔɔ foforɔ, ɔkɔ ayaresabea bere a ɛsɛ sɛ ɔkɔ na ɔgye vaccine, na ɔkura nsuo toa kɔ baabiara, bɔɔlobɔ mpo.',
        'Ayarefoɔ bi deɛ, [[stem-cell-transplant|stem cell transplant]] tumi sa yareɛ no, na seesei wɔapene [[gene-therapy|gene therapy]] foforɔ so wɔ aman bi so.'
      ],
      note: {
        title: 'Ayaresa nnɛ ne ɔkyena',
        text: [
          'Nkokoaa yɛ fetal haemoglobin bere a wɔda wɔn maame yafunu mu ne abosome kakra wɔ awoɔ akyi. Sɛ wɔma ɛsan dɔɔso bio akyire yi a, ɛboa ma mogya nketewa nkyea.',
          'Stem cell (bone marrow) transplant a ɛfiri obi a ne mogya hyia hɔ tumi sa sickle cell yareɛ. Wɔpenee gene therapy so wɔ Amerika wɔ afe 2023 mu, nanso ne boɔ yɛ den paa, na ennuruu baabiara ɛ, titiriw wɔ Afrika.'
        ]
      },
      choices: [
        'Wie w’akwantuo no'
      ]
    },

    endingGood: {
      title: 'Akwantuo A Ɛkɔɔ Yie',
      ending: 'Awieeɛ: Akwantuo A Ɛkɔɔ Yie',
      text: [
        'Wo nkwa sɛ mogya ketewa kɔkɔɔ no yɛɛ tiawa, nanso wode oxygen kɔmaa mpɛn mpempem pii. Esiane sɛ Kwesi homee, ɔnomm nsuo, na ɔhwɛɛ ne ho yie nti, ne nna pii yɛɛ nna pa.',
        'Sickle cell yareɛ tena onipa ho n’asetena nyinaa. Nanso nimdeɛ, ayaresa a ɛba ntɛm, ne mmoa a ɛfiri abusua ne nnamfo hɔ ma nnipa a wɔwɔ yareɛ yi kɔ sukuu, di agorɔ, yɛ adwuma, na wɔtete mma.'
      ],
      note: {
        title: 'Sickle cell wɔ Ghana ne wiase nyinaa',
        text: [
          'Sickle cell yareɛ ka nnipa ɔpepem pii wɔ wiase nyinaa, na ɛtaa ba titiriw wɔ Afrika fam, a Ghana ka ho.',
          '[[newborn-screening|Nkokoaa a wɔawo wɔn foforɔ sɔhwɛ]] tumi hunu no wɔ nkwa nna a ɛdi kan no mu, sɛdeɛ ɛbɛyɛ a wɔbɛhyɛ ayaresa ase ansa na haw aba.'
        ]
      }
    },

    endingLesson: {
      title: 'Adesua A Ɛfiri Ɔhaw Mu',
      ending: 'Awieeɛ: Adesua A Ɛfiri Ɔhaw Mu',
      text: [
        'W’akwantuo no yɛɛ den, nanso Kwesi ho tɔɔ no. Ɔsuaa sɛ ɛnsɛ sɛ ɔsuma ɛyaw ne kɔkɔbɔ nsɛnkyerɛnneɛ.',
        'Sɛ wobɛka akyerɛ obi ntɛm, wobɛnom nsuo, na wobɛnya ayaresa ntɛm a, ɛtumi siw ɛyaw kɛseɛ ano ansa na ɛdane ɔhaw kɛseɛ.',
        'Sickle cell yareɛ tena onipa ho n’asetena nyinaa. Nanso nimdeɛ, ayaresa a ɛba ntɛm ne mmoa ma nnipa a wɔwɔ yareɛ yi tena ase yie.'
      ],
      note: {
        title: 'Sickle cell wɔ Ghana ne wiase nyinaa',
        text: [
          'Sickle cell yareɛ ka nnipa ɔpepem pii wɔ wiase nyinaa, na ɛtaa ba titiriw wɔ Afrika fam, a Ghana ka ho.',
          '[[newborn-screening|Nkokoaa a wɔawo wɔn foforɔ sɔhwɛ]] tumi hunu no wɔ nkwa nna a ɛdi kan no mu, sɛdeɛ ɛbɛyɛ a wɔbɛhyɛ ayaresa ase ansa na haw aba.'
        ]
      }
    }
  },

  quiz: [
    {
      q: 'Haemoglobin adwuma titiriw ne deɛn?',
      options: ['Ɛko tia yareɛ mmoawa', 'Ɛsoa oxygen kɔ nipadua mu baabiara', 'Ɛboa ma mogya kyere', 'Ɛboa ma aduane bubu'],
      explain: 'Haemoglobin yɛ protein a ɛwɔ mogya nketewa kɔkɔɔ mu a ɛfa oxygen wɔ ahrawa mu na ɛde ma nipadua mu nam.'
    },
    {
      q: 'Ɛdeɛn na ɛde sickle cell yareɛ ba?',
      options: ['Ntontom a ɛka wo', 'Aduane bɔne a wodi', 'HBB gene a asesa a wonya firi awofoɔ baanu nyinaa hɔ', 'Ɛsan firi obi a ɔwɔ hɔ'],
      explain: 'Sickle cell yareɛ firi awoɔ mu. Onipa nya sickle (S) gene baako firi ɔwofoɔ biara hɔ. Ɛnyɛ nsanyareɛ, na ɛnyɛ aduane anaa biribi a ɔwofoɔ yɛeɛ na ɛde ba.'
    },
    {
      q: 'Ɛberɛ bɛn na mogya nketewa kɔkɔɔ a haemoglobin S wom taa kyea?',
      options: ['Bere a wɔafa oxygen wɔ ahrawa mu ara pɛ', 'Bere a wɔde wɔn oxygen agyae', 'Bere a onipa no ada nko ara', 'Bere a onipa no adi asikyire nko ara'],
      explain: 'Haemoglobin S bɔ mu yɛ ahoma a ɛyɛ den titiriw bere a oxygen nni mu, bere a mogya ketewa no de ne oxygen akɔma.'
    },
    {
      q: 'Yeinom mu deɛ ɛwɔ he na ɛtumi ma mogya nketewa kyea?',
      options: ['Nsuo pii a wonom', 'Ahomegyeɛ wɔ nwunu ase', 'Nsuo a ɛso atew wɔ nipadua mu', 'Ntadeɛ a ɛma wo ho yɛ hyew bere a awɔ wɔ hɔ'],
      explain: 'Sɛ nsuo so atew wɔ nipadua mu a, haemoglobin a ɛwɔ mogya ketewa no mu hyɛ mu ma, enti ɛbɔ mu na ɛkyea ntɛm. Nsuo, ahomegyeɛ ne ɔhyew nyinaa boa ma mogya nketewa nkyea.'
    },
    {
      q: 'Adɛn nti na ɛyaw kɛseɛ (pain crisis) yɛ yaw?',
      options: ['Mogya nketewa a akyea si ntini nketewa kwan, enti nam no nnya oxygen', 'Nnompe no nyini ntɛm dodo', 'Akoma no gyae bɔ', 'Oxygen dodo duru ntini mu'],
      explain: 'Mogya nketewa a ɛyɛ den na ɛfam kyere ntini nketewa mu (vaso-occlusion). Nam a ɛwɔ akyire no nnya oxygen, na ɛde ɛyaw ba.'
    },
    {
      q: 'Genotype AS kyerɛ deɛn?',
      options: ['Onipa no wɔ sickle cell yareɛ a ano yɛ den', 'Onipa no wɔ sickle cell trait, na ɛtaa ba sɛ nsɛnkyerɛnneɛ biara nni hɔ', 'Onipa no ntumi nwo', 'Onipa no nni sickle gene koraa'],
      explain: 'AS kyerɛ daa gene baako ne sickle gene baako. Nnipa a wɔwɔ trait no yɛ akurafoɔ: wɔn ho taa yɛ wɔn den, nanso wɔtumi de S ma wɔn mma.'
    },
    {
      q: 'Awofoɔ baanu nyinaa genotype yɛ AS. Hokwan bɛn na ɛwɔ hɔ sɛ wɔn mma no mu biara bɛnya sickle cell yareɛ (SS)?',
      options: ['0%', '25%', '50%', '100%'],
      explain: 'Ɔwofoɔ biara wɔ hokwan 1 wɔ 2 mu sɛ ɔde S bɛma. Hokwan a ɛwɔ hɔ sɛ wɔn baanu nyinaa de bɛma ne ½ × ½ = ¼, anaa 25%. Yei fa nyinsɛn biara ho ɔno nko.'
    },
    {
      q: 'Sɛdeɛn na hydroxyurea boa nnipa a wɔwɔ sickle cell yareɛ?',
      options: ['Ɛkum sickle gene no', 'Ɛboa nipadua ma ɛyɛ fetal haemoglobin pii, a ɛnkyea', 'Ɛsesa mogya no nyinaa', 'Ɛyɛ vaccine'],
      explain: 'Hydroxyurea ma fetal haemoglobin dɔɔso. Mogya nketewa a fetal haemoglobin pii wom no nkyea pii, na yei tew ɛyaw kɛseɛ ne haw foforɔ so.'
    },
    {
      q: 'Yeinom mu deɛ ɛwɔ he na ɛyɛ ɔhaw kɛseɛ ho nsɛnkyerɛnneɛ ma obi a ɔwɔ sickle cell yareɛ?',
      options: ['Ɛkɔm a ɛde wo', 'Atiridii ne koko yaw ne ahome a ɛyɛ den', 'Ɔtwe ketewa', 'Nna a ɛkɔ wo so awia aduane akyi'],
      explain: 'Atiridii, koko yaw ne ahome a ɛyɛ den tumi kyerɛ yareɛ mmoawa anaa acute chest syndrome. Yeinom hia ayaresa ntɛm ara.'
    },
    {
      q: 'Adɛn nti na wɔtaa ma mmofra nketewa a wɔwɔ sickle cell yareɛ penicillin ne vaccine foforɔ?',
      options: ['Ebia wɔn spleen asɛe, enti wɔntumi nko ntia nyarewa bi yie', 'De ma wɔn nnompe yɛ den', 'De sa yareɛ no', 'De ma wɔnyini tenten'],
      explain: 'Mogya nketewa a akyea sɛe spleen no wɔ mmofraase. Sɛ spleen nyɛ adwuma yie a, yareɛ mmoawa bi yɛ hu, enti ɛho hia sɛ wɔbɔ wɔn ho ban.'
    }
  ],

  summary: [
    'Haemoglobin soa oxygen. Wɔ sickle cell yareɛ mu no, nkyerɛwdeɛ baako nsesaeɛ wɔ HBB gene mu yɛ haemoglobin S.',
    'Sickle cell yareɛ firi awoɔ mu, ɛyɛ recessive, na ɛnyɛ nsanyareɛ. Ɛsɛ sɛ onipa nya S gene firi n’awofoɔ baanu nyinaa hɔ (SS).',
    'Nnipa a wɔwɔ sickle cell trait (AS) taa nni nsɛnkyerɛnneɛ biara, nanso wɔtumi de S ma wɔn mma. Awofoɔ baanu a wɔyɛ AS wɔ hokwan 25% sɛ wɔbɛwo abofra SS wɔ nyinsɛn biara mu.',
    'Sɛ haemoglobin S de oxygen gyae a, ɛbɔ mu yɛ ahoma a ɛyɛ den, na ɛkyea mogya nketewa ma ɛyɛ sɛ nnaboa a ɛtumi si ntini nketewa kwan.',
    'Kwan a asi no ma nam no nnya oxygen na ɛde ɛyaw kɛseɛ ba. Sickle mogya nketewa nso wuwu ntɛm, na ɛde mogya sua ne abrɛ ba.',
    'Nsuo a ɛso atew, oxygen sua, ɔhyeɛ anaa awɔ kɛseɛ, nyarewa ne adwumaden yɛ deɛ ɛtaa kanyan. Nsuo ne ahomegyeɛ boa.',
    'Atiridii, koko yaw, ahome a ɛyɛ den, tipae kɛseɛ anaa mmerɛyɛ mpofirim yɛ ɔhaw kɛseɛ a ɛhia ayaresa ntɛm ara.',
    'Hydroxyurea, penicillin, vaccine ahodoɔ ne ayaresabea nkɔ daa boa nnipa ma wɔtena ase yie. Stem cell transplant ne gene therapy tumi sa ayarefoɔ bi.'
  ]
};
