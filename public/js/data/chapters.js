/* Chapter registry and searchable pages.
   To add a new chapter later:
   1. Create js/data/<chapter-id>.js using sickle-cell.js as the template.
   2. Change its status below from 'soon' to 'available'.
   3. Add a <script> tag for the new data file on the pages that load sickle-cell.js. */
window.SIG = window.SIG || {};
(function (SIG) {
  SIG.chapters = SIG.chapters || {};
  SIG.registerChapter = function (chapter) { SIG.chapters[chapter.id] = chapter; };

  SIG.chapterList = [
    {
      id: 'sickle-cell',
      title: 'Sickle Cell Disease',
      tagline: 'Live the life of a red blood cell inside Kwesi, a 15-year-old footballer in Kumasi, and discover what happens when haemoglobin changes shape.',
      status: 'available',
      url: '/story?chapter=sickle-cell',
      system: 'Blood',
      inheritance: 'Recessive'
    },
    {
      id: 'g6pd',
      title: 'G6PD Deficiency',
      tagline: 'Why can certain foods, medicines and infections damage red blood cells in some people? And what does it have to do with malaria?',
      status: 'soon',
      system: 'Blood',
      inheritance: 'X-linked'
    },
    {
      id: 'beta-thalassaemia',
      title: 'Beta Thalassaemia',
      tagline: 'A cousin of sickle cell disease: what happens when the body cannot make enough of one part of haemoglobin?',
      status: 'soon',
      system: 'Blood',
      inheritance: 'Recessive'
    },
    {
      id: 'cystic-fibrosis',
      title: 'Cystic Fibrosis',
      tagline: 'Travel through the lungs as a tiny salt channel and see how one gene change makes mucus thick and sticky.',
      status: 'soon',
      system: 'Lungs',
      inheritance: 'Recessive'
    },
    {
      id: 'huntingtons',
      title: 'Huntington’s Disease',
      tagline: 'A story inside the brain about a gene that only needs one copy to cause disease.',
      status: 'soon',
      system: 'Brain',
      inheritance: 'Dominant'
    }
  ];

  /* Pages and page sections that appear in the site search. */
  SIG.pages = [
    { title: 'Home', url: '/', text: 'Interactive stories that teach the science of inherited diseases.', keywords: 'start welcome' },
    { title: 'All chapters', url: '/chapters', text: 'Sickle cell disease and upcoming chapters on other inherited conditions.', keywords: 'stories series' },
    { title: 'Inheritance Lab', url: '/lab', text: 'Choose two parents’ genotypes (AA, AS, SS) and see the chances for their children with a Punnett square.', keywords: 'punnett genotype parents children chance percent couple marriage' },
    { title: 'Blood flow simulation', url: '/learn#simulation', text: 'Watch normal and sickled red blood cells flow through a narrow vessel and see how blockages slow blood flow.', keywords: 'simulation engineering model flow blockage slider' },
    { title: 'What is sickle cell disease?', url: '/learn#what-is-it', text: 'An inherited blood disorder caused by a change in the HBB gene that makes red blood cells sickle-shaped.', keywords: 'basics overview' },
    { title: 'Signs and symptoms', url: '/learn#symptoms', text: 'Pain crises, anaemia, tiredness, swelling of hands and feet, infections and yellow eyes.', keywords: 'symptoms jaundice swelling' },
    { title: 'Common triggers', url: '/learn#triggers', text: 'Dehydration, low oxygen, very hot or cold temperatures, infections and over-exertion can trigger sickling.', keywords: 'triggers heat cold water exercise' },
    { title: 'Emergency warning signs', url: '/learn#warning-signs', text: 'Fever, chest pain, trouble breathing, severe headache, sudden weakness and a swollen belly need urgent care.', keywords: 'emergency hospital fever stroke' },
    { title: 'Treatment and care', url: '/learn#treatment', text: 'Hydroxyurea, folic acid, penicillin, vaccines, transfusions, stem cell transplant and gene therapy.', keywords: 'treatment cure medicine' },
    { title: 'Myths and facts', url: '/learn#myths', text: 'Sickle cell disease is inherited, not contagious, and not caused by a curse or anything a parent did.', keywords: 'myth fact contagious curse' },
    { title: 'Know your genotype', url: '/learn#genotype', text: 'Why knowing whether you are AA, AS or SS helps families make informed decisions.', keywords: 'test genotype marriage couple' },
    { title: 'Glossary', url: '/glossary', text: 'A–Z list of every science word used on this site, with simple definitions.', keywords: 'dictionary words definitions' },
    { title: 'About this project', url: '/about', text: 'Why this project exists, how the science was checked, sources, privacy and feedback.', keywords: 'about sources privacy feedback contact' }
  ];
})(window.SIG);
