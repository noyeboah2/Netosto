/* Chapter 1: Sickle Cell Disease
   All characters are fictional. Science is summarised from the sources listed
   at the bottom of this file (also shown on the About page).

   Scene fields
   - step:    position used by the progress bar (1..totalSteps)
   - art:     illustration key from js/art.js
   - text:    paragraphs; [[glossary-id]] or [[glossary-id|label]] become pop-ups
   - note:    the “What's really happening” science box
   - choices: { label, to } or { label, route(history) } for conditional paths
   - ending:  present on final scenes */
(function (SIG) {
  SIG.registerChapter({
    id: 'sickle-cell',
    title: 'Sickle Cell Disease',
    storyTitle: 'The Journey of a Red Blood Cell',
    start: 'marrow',
    totalSteps: 11,

    scenes: {
      marrow: {
        step: 1,
        title: 'You Are Born',
        art: 'marrow',
        text: [
          'Deep inside the [[bone-marrow|bone marrow]] of Kwesi’s thigh bone, you are born. You are a [[red-blood-cell|red blood cell]], one of about two million made in his body every second.',
          'Your one job for the rest of your life is to carry [[oxygen]] to every corner of Kwesi’s body.',
          'Kwesi is 15, lives in Kumasi and loves football. He also has [[sickle-cell-disease|sickle cell disease]]. That means the protein packed inside you, [[haemoglobin]], is a little different from most people’s.'
        ],
        note: {
          title: 'Where red blood cells come from',
          text: [
            'Red blood cells are made in the bone marrow. In teenagers and adults this happens mostly in large bones such as the hips, spine, ribs and the top of the thigh bones.',
            'Each red blood cell is packed with roughly 270 million haemoglobin molecules, the protein that grabs oxygen in the lungs and lets it go in the tissues.'
          ]
        },
        choices: [
          { label: 'Look closely at your haemoglobin', to: 'gene' },
          { label: 'Squeeze out into the bloodstream', to: 'bloodstream' }
        ]
      },

      gene: {
        step: 2,
        title: 'One Letter Changed',
        art: 'dna',
        text: [
          'You zoom in on the instructions that built your haemoglobin. They come from the [[hbb-gene|HBB gene]]. In Kwesi’s DNA, a single letter of this gene is different: one tiny [[mutation]] among millions of letters.',
          'That one change swaps a single building block in the haemoglobin protein: glutamic acid becomes valine. The result is [[haemoglobin-s|haemoglobin S]].',
          'Kwesi received one copy of this changed gene from his mother and one from his father. His [[genotype]] is SS.'
        ],
        note: {
          title: 'How a single gene change is inherited',
          text: [
            'Everyone has two copies of the HBB gene, one from each parent. A person with one usual copy (A) and one sickle copy (S) has [[sickle-cell-trait|sickle cell trait]] (AS). They usually have no symptoms but can pass S to their children.',
            'A person with two S copies (SS) has sickle cell disease. This is called [[recessive]] inheritance. Neither of Kwesi’s parents did anything wrong. Both were simply [[carrier|carriers]].'
          ],
          link: { href: '/lab', label: 'Try it yourself in the Inheritance Lab' }
        },
        choices: [
          { label: 'Head out into the bloodstream', to: 'bloodstream' }
        ]
      },

      bloodstream: {
        step: 3,
        title: 'Into the River',
        art: 'vessel',
        text: [
          'You slip out of the marrow into a tiny blood vessel and join a river of trillions of cells.',
          'Right now you look like every other red blood cell: round, soft and flexible, like a disc pressed in at the middle.',
          'That flexibility matters. Some [[capillary|capillaries]] are narrower than you are, so you have to fold and squeeze to get through.'
        ],
        note: {
          title: 'Why flexibility is everything',
          text: [
            'A red blood cell is about 7 to 8 micrometres wide, but the narrowest capillaries can be smaller than that. Healthy red cells get through by bending.',
            'A cell that cannot bend can get stuck. Hold on to that idea: it is the key to understanding sickle cell disease.'
          ]
        },
        choices: [
          { label: 'Ride the current to the lungs', to: 'lungs' }
        ]
      },

      lungs: {
        step: 4,
        title: 'A Breath of Oxygen',
        art: 'lungs',
        text: [
          'In the lungs, oxygen floods in. Your haemoglobin grabs it and you glow bright red.',
          'While you are full of oxygen, haemoglobin S behaves almost normally, so you stay smooth and flexible.',
          'Now you have a delivery to make. Where are you headed?'
        ],
        note: {
          title: 'The problem appears when oxygen leaves',
          text: [
            'Oxygen-rich blood is bright red; blood that has given away its oxygen is darker.',
            'Haemoglobin S mostly causes trouble after it releases oxygen, when the cell is [[deoxygenated]]. The more time a cell spends low on oxygen, the more likely it is to sickle.'
          ]
        },
        choices: [
          { label: 'To Kwesi’s leg muscles. He is playing football in the afternoon heat.', to: 'football' },
          { label: 'To Kwesi’s brain. He is studying for an exam in the shade.', to: 'study' }
        ]
      },

      football: {
        step: 5,
        title: 'The Afternoon Match',
        art: 'sickle',
        text: [
          'Kwesi is sprinting after the ball. It is 33°C and he has not had water since lunch. His leg muscles are hungry for oxygen, and you hand yours over fast.',
          'Without oxygen, something strange happens inside you. The haemoglobin S molecules start sticking together into long, stiff fibres. This is called [[polymerisation]].',
          'The fibres stretch you out of shape. You become stiff, sticky and curved like a sickle, the farming tool. [[dehydration|Dehydration]] makes it worse: with less water, the haemoglobin inside you is packed more tightly and clumps faster.'
        ],
        note: {
          title: 'What triggers sickling',
          text: [
            'Low oxygen, dehydration, very hot or cold temperatures, infections and very hard exercise can all make sickling more likely.',
            'That is why people with sickle cell disease are encouraged to drink plenty of water, rest when tired and avoid getting too hot or too cold. They can still be active; they just need to take breaks.'
          ]
        },
        choices: [
          { label: 'Kwesi takes a break in the shade and drinks water', to: 'recover' },
          { label: 'Kwesi ignores how tired he feels and keeps playing', to: 'crisis' }
        ]
      },

      study: {
        step: 5,
        title: 'A Quiet Afternoon',
        art: 'calm',
        text: [
          'You glide to the brain, release your oxygen and loop back to the lungs to refill. Round after round, day after day.',
          'Kwesi is calm, rested and drinking water, so most of your trips go smoothly.',
          'But each time you give up your oxygen, the haemoglobin S inside you tugs at your outer layer, your membrane. Bit by bit it gets damaged. You are ageing fast.'
        ],
        note: {
          title: 'Why people with sickle cell feel tired',
          text: [
            'A normal red blood cell lives about 120 days. A sickle cell may last only 10 to 20 days. The bone marrow cannot replace them fast enough.',
            'This causes [[anaemia]]: too few red blood cells. It explains the tiredness, weakness and shortness of breath many people with sickle cell disease feel, even on good days.'
          ]
        },
        choices: [
          { label: 'Keep going and see where your journey leads', to: 'spleen' }
        ]
      },

      recover: {
        step: 6,
        title: 'A Close Call',
        art: 'recover',
        text: [
          'Kwesi sits under a mango tree and drinks a full bottle of water. Fresh, oxygen-rich blood reaches you, the stiff fibres inside you loosen, and you soften back towards your round shape.',
          'Phew. You have unsickled this time.',
          'But each sickling leaves a mark on your membrane. After enough cycles, some cells stay sickled for good.'
        ],
        note: {
          title: 'Small choices make a real difference',
          text: [
            'Early sickling can often reverse when oxygen returns. Repeated cycles damage the membrane and can leave cells permanently sickled.',
            'Drinking water, resting and staying warm do not cure the disease, but they really can lower the chance of a painful crisis.'
          ]
        },
        choices: [
          { label: 'Continue your journey', to: 'spleen' },
          { label: 'See what would have happened if Kwesi kept playing', to: 'crisis' }
        ]
      },

      crisis: {
        step: 6,
        title: 'Traffic Jam',
        art: 'blocked',
        text: [
          'Kwesi keeps running. You and hundreds of other sickled cells reach a narrow capillary near his knee and jam together, blocking the vessel like a traffic pile-up on the Accra–Kumasi road.',
          'This is [[vaso-occlusion]]. Behind the blockage, tissue is not getting oxygen.',
          'Kwesi feels a sudden, deep pain in his leg. He is having a [[pain-crisis|pain crisis]].'
        ],
        note: {
          title: 'What a pain crisis is',
          text: [
            'Pain crises are the most common reason people with sickle cell disease go to hospital. The pain comes from tissue starved of oxygen and can last hours or days.',
            'Crises can affect the bones, joints, back, chest or belly. The pain is real and often severe, so people having a crisis deserve to be believed and helped quickly.'
          ]
        },
        choices: [
          { label: 'Kwesi tells his mother right away', to: 'hospital' },
          { label: 'Kwesi hides the pain because he doesn’t want to miss the match', to: 'warning' }
        ]
      },

      warning: {
        step: 7,
        title: 'Warning Signs',
        art: 'warning',
        text: [
          'Kwesi says nothing. By evening the blockages have spread. Now sickled cells are getting stuck in tiny vessels in his lungs.',
          'He has chest pain, a fever and finds it hard to breathe. This could be [[acute-chest-syndrome|acute chest syndrome]], one of the most serious complications of sickle cell disease.',
          'His mother sees him struggling and rushes him to hospital.'
        ],
        note: {
          title: 'Emergency signs to never ignore',
          text: [
            'For someone with sickle cell disease, fever, chest pain, trouble breathing, a severe headache, sudden weakness or trouble speaking, or a suddenly swollen belly are emergency warning signs.',
            'They need medical care right away. Telling someone early is always the right call.'
          ],
          link: { href: '/learn#warning-signs', label: 'Read the full list of warning signs' }
        },
        choices: [
          { label: 'Follow Kwesi to the hospital', to: 'hospital' }
        ]
      },

      hospital: {
        step: 8,
        title: 'Help Arrives',
        art: 'hospital',
        text: [
          'At the hospital, nurses give Kwesi fluids through a drip to rehydrate his blood, medicine for the pain and extra oxygen to help him breathe.',
          'Slowly, blood starts moving again around the blockage.',
          'A doctor checks him for infection and explains to Kwesi and his mother how to spot warning signs earlier next time.'
        ],
        note: {
          title: 'How a crisis is treated',
          text: [
            'Hospital care for a crisis usually includes pain relief, fluids and close monitoring. Sometimes a [[blood-transfusion|blood transfusion]] is needed to add healthy red blood cells.',
            'The exact treatment always depends on the doctor’s assessment. This website explains the science; it is not medical advice.'
          ]
        },
        choices: [
          { label: 'Continue to the end of your journey', to: 'spleen' }
        ]
      },

      spleen: {
        step: 9,
        title: 'The Filter',
        art: 'spleen',
        text: [
          'Your journey has worn you out. Your membrane is damaged and you are stiff even when you have oxygen. You drift into the [[spleen]], the body’s filter for old and damaged blood cells.',
          'The spleen catches you and breaks you down. Your iron will be recycled into new red blood cells back in the marrow.',
          'But sickled cells have been clogging Kwesi’s spleen since he was a small child. It is scarred and does not work well any more.'
        ],
        note: {
          title: 'Why infections are dangerous',
          text: [
            'In sickle cell disease the spleen is often damaged in early childhood. A damaged spleen cannot fight certain bacteria well.',
            'That is why young children with sickle cell are usually given daily penicillin and extra vaccines, and why a fever is treated as urgent.'
          ]
        },
        choices: [
          { label: 'See how doctors help Kwesi live well', to: 'treatments' }
        ]
      },

      treatments: {
        step: 10,
        title: 'Living Well',
        art: 'medicine',
        text: [
          'Before you are gone, you catch a glimpse of Kwesi’s future. He takes [[hydroxyurea]], a daily medicine that helps his body make more [[fetal-haemoglobin|fetal haemoglobin]], a type that does not sickle. New red cells carrying it sickle less.',
          'He takes folic acid to help make new red cells, keeps up with vaccines and clinic visits, and carries a water bottle everywhere, even to football.',
          'For some patients a [[stem-cell-transplant|stem cell transplant]] can cure the disease, and new [[gene-therapy|gene therapies]] are now approved in some countries.'
        ],
        note: {
          title: 'Treatments today and tomorrow',
          text: [
            'Babies make fetal haemoglobin before birth and for a few months after. Raising it again later in life helps prevent sickling.',
            'A stem cell (bone marrow) transplant from a matched donor can cure sickle cell disease. Gene therapies were approved in the United States in 2023, but they are very expensive and not yet widely available, especially in Africa.'
          ]
        },
        choices: [
          {
            label: 'Finish your journey',
            route: function (history) { return history.indexOf('crisis') !== -1 ? 'endingLesson' : 'endingGood'; }
          }
        ]
      },

      endingGood: {
        step: 11,
        title: 'A Smooth Journey',
        art: 'ending',
        ending: { label: 'Ending: A Smooth Journey' },
        text: [
          'Your life as a red blood cell was short, but you made thousands of oxygen deliveries. Because Kwesi rested, drank water and kept up with his care, many of his days were good ones.',
          'Sickle cell disease is lifelong. But with knowledge, early care and support from family and friends, people with it go to school, play sport, work and raise families.'
        ],
        note: {
          title: 'Sickle cell in Ghana and the world',
          text: [
            'Sickle cell disease affects millions of people worldwide and is especially common in sub-Saharan Africa, including Ghana.',
            '[[newborn-screening|Newborn screening]] can find it in the first days of life, so care can start before problems appear.'
          ]
        },
        choices: []
      },

      endingLesson: {
        step: 11,
        title: 'Lessons from a Crisis',
        art: 'ending',
        ending: { label: 'Ending: Lessons from a Crisis' },
        text: [
          'Your journey was rough, but Kwesi recovered. He learned that pain and warning signs are not something to hide.',
          'Telling someone early, staying hydrated and getting care quickly can stop a crisis from turning into an emergency.',
          'Sickle cell disease is lifelong. But with knowledge, early care and support, people with it live full lives.'
        ],
        note: {
          title: 'Sickle cell in Ghana and the world',
          text: [
            'Sickle cell disease affects millions of people worldwide and is especially common in sub-Saharan Africa, including Ghana.',
            '[[newborn-screening|Newborn screening]] can find it in the first days of life, so care can start before problems appear.'
          ]
        },
        choices: []
      }
    },

    quiz: [
      {
        q: 'What is the main job of haemoglobin?',
        options: ['To fight germs', 'To carry oxygen around the body', 'To help blood clot', 'To digest food'],
        answer: 1,
        explain: 'Haemoglobin is the protein inside red blood cells that picks up oxygen in the lungs and releases it in the tissues.'
      },
      {
        q: 'What causes sickle cell disease?',
        options: ['A mosquito bite', 'Eating the wrong foods', 'Inheriting a changed HBB gene from both parents', 'Catching it from someone who has it'],
        answer: 2,
        explain: 'Sickle cell disease is inherited. A person gets one sickle (S) gene from each parent. It is not contagious and is not caused by diet or anything a parent did.'
      },
      {
        q: 'When are red blood cells with haemoglobin S most likely to sickle?',
        options: ['Right after picking up oxygen in the lungs', 'After they release their oxygen', 'Only while a person is asleep', 'Only when a person eats sugar'],
        answer: 1,
        explain: 'Haemoglobin S clumps into stiff fibres mainly when it is deoxygenated, after the cell has delivered its oxygen.'
      },
      {
        q: 'Which of these can trigger sickling?',
        options: ['Drinking plenty of water', 'Resting in the shade', 'Dehydration', 'Wearing warm clothes in the cold'],
        answer: 2,
        explain: 'Dehydration packs haemoglobin more tightly inside the cell, so it clumps and sickles faster. Water, rest and staying warm all help prevent sickling.'
      },
      {
        q: 'Why does a pain crisis hurt?',
        options: ['Sickled cells block small vessels, so tissue does not get oxygen', 'The bones grow too fast', 'The heart stops beating', 'Too much oxygen reaches the muscles'],
        answer: 0,
        explain: 'Stiff, sticky sickled cells jam in small vessels (vaso-occlusion). Tissue behind the blockage is starved of oxygen, which causes pain.'
      },
      {
        q: 'What does the genotype AS mean?',
        options: ['The person has severe sickle cell disease', 'The person has sickle cell trait and usually has no symptoms', 'The person cannot have children', 'The person has no sickle gene at all'],
        answer: 1,
        explain: 'AS means one usual gene and one sickle gene. People with the trait are carriers: usually healthy, but they can pass S to their children.'
      },
      {
        q: 'Two parents both have the genotype AS. What is the chance that each of their children will have sickle cell disease (SS)?',
        options: ['0%', '25%', '50%', '100%'],
        answer: 1,
        explain: 'Each parent has a 1 in 2 chance of passing on S. The chance both pass it on is ½ × ½ = ¼, or 25%. This is true for every pregnancy separately.'
      },
      {
        q: 'How does hydroxyurea help people with sickle cell disease?',
        options: ['It kills the sickle gene', 'It helps the body make more fetal haemoglobin, which does not sickle', 'It replaces all the blood', 'It is a vaccine'],
        answer: 1,
        explain: 'Hydroxyurea raises fetal haemoglobin. Cells with more fetal haemoglobin sickle less, which reduces pain crises and other complications.'
      },
      {
        q: 'Which of these is an emergency warning sign for someone with sickle cell disease?',
        options: ['Feeling hungry', 'Fever with chest pain and trouble breathing', 'A mild itch', 'Feeling sleepy after lunch'],
        answer: 1,
        explain: 'Fever, chest pain and trouble breathing can signal infection or acute chest syndrome. These need medical care straight away.'
      },
      {
        q: 'Why are young children with sickle cell disease often given penicillin and extra vaccines?',
        options: ['Their spleen may be damaged, so they fight some infections poorly', 'To make their bones stronger', 'To cure the disease', 'To help them grow taller'],
        answer: 0,
        explain: 'Sickled cells damage the spleen early in life. Without a working spleen, certain bacterial infections become dangerous, so prevention is important.'
      }
    ],

    summary: [
      'Haemoglobin carries oxygen. In sickle cell disease, a one-letter change in the HBB gene produces haemoglobin S.',
      'Sickle cell disease is inherited, recessive and not contagious. A person needs an S gene from both parents (SS).',
      'People with sickle cell trait (AS) usually have no symptoms but can pass S on. Two AS parents have a 25% chance of an SS child in each pregnancy.',
      'When haemoglobin S releases oxygen it clumps into stiff fibres, bending cells into sickles that can block small blood vessels.',
      'Blockages starve tissue of oxygen and cause pain crises. Sickle cells also die early, causing anaemia and tiredness.',
      'Dehydration, low oxygen, extreme temperatures, infection and over-exertion are common triggers. Water and rest help.',
      'Fever, chest pain, trouble breathing, severe headache or sudden weakness are emergencies that need care right away.',
      'Hydroxyurea, penicillin, vaccines and regular check-ups help people live well. Stem cell transplant and gene therapy can cure some patients.'
    ],

    sources: [
      { label: 'World Health Organization, Africa region: Sickle cell disease', url: 'https://www.afro.who.int/publications/sickle-cell-disease' },
      { label: 'US Centers for Disease Control and Prevention: What you should know about sickle cell disease', url: 'https://www.cdc.gov/sickle-cell/communication-resources/what-you-should-know-about-sickle-cell-disease.html' },
      { label: 'US National Heart, Lung, and Blood Institute: Sickle cell disease', url: 'https://www.nhlbi.nih.gov/health/sickle-cell-disease' },
      { label: 'MedlinePlus Genetics: Sickle cell disease', url: 'https://medlineplus.gov/genetics/condition/sickle-cell-disease/' },
      { label: 'MedlinePlus Genetics: HBB gene', url: 'https://medlineplus.gov/genetics/gene/hbb/' },
      { label: 'US FDA (2023): First gene therapies approved for sickle cell disease', url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-gene-therapies-treat-patients-sickle-cell-disease' }
    ]
  });
})(window.SIG);
