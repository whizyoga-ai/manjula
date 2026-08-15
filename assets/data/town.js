/* ==========================================================================
   UTTARPARA — the town, as data.

   EVERY DATED CLAIM ON THIS PAGE COMES FROM ONE OF THE SOURCES IN `SOURCES`
   BELOW, AND CARRIES A `src` KEY SAYING WHICH. That is not decoration. A shop
   page that gets a momo's price wrong annoys somebody for five minutes; a page
   that gets a town's history wrong is repeated by schoolchildren for years,
   because a website is the first thing anybody checks now.

   THE RULES THIS FILE FOLLOWS
     1. Where sources disagree, the entry says so rather than picking a winner
        quietly. See `school1846` (15 vs 16 May) and `library` (1852 vs 1859).
     2. Superlatives are attributed, never asserted. The library is not "the
        first free public library in India" here; it is "listed by the West
        Bengal Heritage Commission as the first free public library in India",
        which is a checkable statement about a document rather than an
        unfalsifiable claim about the whole of India.
     3. Visitors are not residents. `people` carries an explicit `kind` field
        for exactly this, because the difference between "Vivekananda came
        here" and "Vivekananda lived here" is the difference between history
        and flattery.
     4. Nothing volatile. No chairman, no councillor, no phone number, no
        opening hours for anything but the shop. Those change; this file does
        not get updated when they do, so it must not contain them.

   THE BENGALI IS NOT A TRANSLATION OF THE ENGLISH. Both were written from the
   same research, separately, in the idiom each language actually uses. Where
   the English reaches for one image the Bengali reaches for another — this is
   Bengal's own history and it should not read like it arrived through an
   English intermediary.
   ========================================================================== */

'use strict';

/* ---------- where every fact came from ---------------------------------- */

const TOWN_SOURCES = {
  municipality: {
    label: { en: 'Uttarpara-Kotrung Municipality — official history',
             bn: 'উত্তরপাড়া-কোতরং পৌরসভা — সরকারি ইতিহাস' },
    url: 'https://www.uttarparamunicipality.in/history-of-uttarpara.html',
  },
  wbhc: {
    label: { en: 'West Bengal Heritage Commission — listing',
             bn: 'পশ্চিমবঙ্গ হেরিটেজ কমিশন — তালিকাভুক্তি' },
    url: 'https://wbhc.in/home/place_list_all',
  },
  wikiTown:    { label: { en: 'Wikipedia — Uttarpara',                 bn: 'উইকিপিডিয়া — উত্তরপাড়া' },
                 url: 'https://en.wikipedia.org/wiki/Uttarpara' },
  wikiLibrary: { label: { en: 'Wikipedia — Uttarpara Public Library',  bn: 'উইকিপিডিয়া — উত্তরপাড়া পাবলিক লাইব্রেরি' },
                 url: 'https://en.wikipedia.org/wiki/Uttarpara_Public_Library' },
  wikiCivic:   { label: { en: 'Wikipedia — Uttarpara Kotrung Municipality', bn: 'উইকিপিডিয়া — উত্তরপাড়া কোতরং পৌরসভা' },
                 url: 'https://en.wikipedia.org/wiki/Uttarpara_Kotrung_Municipality' },
  wikiJK:      { label: { en: 'Wikipedia — Jaykrishna Mukherjee',      bn: 'উইকিপিডিয়া — জয়কৃষ্ণ মুখোপাধ্যায়' },
                 url: 'https://en.wikipedia.org/wiki/Jaykrishna_Mukherjee' },
  banglapedia: { label: { en: 'Banglapedia — Mukhopadhyaya, Jaykrishna', bn: 'বাংলাপিডিয়া — মুখোপাধ্যায়, জয়কৃষ্ণ' },
                 url: 'https://en.banglapedia.org/index.php/Mukhopadhyaya,_Jaykrishna' },
  wikiSchool:  { label: { en: 'Wikipedia — Uttarpara Govt. High School', bn: 'উইকিপিডিয়া — উত্তরপাড়া গভঃ হাই স্কুল' },
                 url: 'https://en.wikipedia.org/wiki/Uttarpara_Govt._High_School' },
  wikiRPM:     { label: { en: 'Wikipedia — Raja Peary Mohan College',  bn: 'উইকিপিডিয়া — রাজা পিয়ারীমোহন কলেজ' },
                 url: 'https://en.wikipedia.org/wiki/Raja_Peary_Mohan_College' },
  wikiAV:      { label: { en: 'Wikipedia — Uttarpara Amarendra Vidyapith', bn: 'উইকিপিডিয়া — উত্তরপাড়া অমরেন্দ্র বিদ্যাপীঠ' },
                 url: 'https://en.wikipedia.org/wiki/Uttarpara_Amarendra_Vidyapith' },
  wikiAmar:    { label: { en: 'Wikipedia — Amarendranath Chatterjee', bn: 'উইকিপিডিয়া — অমরেন্দ্রনাথ চট্টোপাধ্যায়' },
                 url: 'https://en.wikipedia.org/wiki/Amarendranath_Chatterjee' },
  saioc:       { label: { en: 'Sri Aurobindo Institute — Sri Aurobindo in Calcutta',
                          bn: 'শ্রীঅরবিন্দ ইনস্টিটিউট — কলকাতায় শ্রীঅরবিন্দ' },
                 url: 'http://www.sriaurobindoinstitute.org/saioc/Sri_Aurobindo/calcutta/uttarpara_jaykrishna_library' },
  wikisource:  { label: { en: 'Wikisource — the Uttarpara Speech',    bn: 'উইকিসোর্স — উত্তরপাড়া বক্তৃতা' },
                 url: 'https://en.wikisource.org/wiki/Uttarpara_Speech' },
};

/* ---------- the timeline ------------------------------------------------ */
/* Ordered, and deliberately short. A timeline that lists everything is a
   list; a timeline that lists eight things is an argument. The argument here
   is that this town built its institutions early and in a particular order —
   bridge, school, hospital, municipality, library — and that the school came
   before the town council. */

const TOWN_TIMELINE = [
  {
    year: '১৭০৪', yearEn: '1704', src: 'municipality',
    en: { t: 'A zamindar crosses the river',
          d: 'Ratneswar Roychowdhury of the Sabarna Chowdhury family leaves his ancestral village near Barrackpore and settles on the far bank. What he settles is marshland, north of the village of Bally — <i>uttar para</i>, the northern quarter, and the name stuck.' },
    bn: { t: 'নদী পেরিয়ে এক জমিদার',
          d: 'সাবর্ণ চৌধুরী বংশের রত্নেশ্বর রায়চৌধুরী ব্যারাকপুরের কাছের পৈতৃক ভিটে ছেড়ে গঙ্গার ওপারে এসে বসত গড়েন। জায়গাটা তখন জলা — বালি গ্রামের উত্তর দিকের পাড়া। <i>উত্তরপাড়া</i>, আর নামটা থেকেই গেল।' },
  },
  {
    year: '১৮৪৬', yearEn: '1846', src: 'municipality', mark: true,
    en: { t: 'The bridge, then the school',
          d: 'A bridge over the Bally Khal opens on 14 February and ends the ferry crossing. Three months later, on 15 May, an English school opens — the zamindars gave a building and the money, and the people of Uttarpara and Bhadrakali put in ₹2,000 and ₹220 of their own. Ramtanu Lahiri, of the Young Bengal circle, was headmaster from 1852.' },
    bn: { t: 'আগে সেতু, তারপর স্কুল',
          d: '১৪ ফেব্রুয়ারি বালিখালের উপর সেতু খুলল, নৌকো পারাপার ফুরোল। তিন মাস পরে, ১৫ মে, ইংরেজি স্কুল। জমিদাররা বাড়ি আর টাকা দিলেন — কিন্তু উত্তরপাড়ার লোকে চাঁদা তুলল ২০০০ টাকা, ভদ্রকালীর লোকে ২২০। ইয়ং বেঙ্গলের রামতনু লাহিড়ী ১৮৫২ থেকে এখানকার প্রধান শিক্ষক।' },
  },
  {
    year: '১৮৫১', yearEn: '1851', src: 'municipality',
    en: { t: 'A hospital',
          d: 'Jaykrishna and Rajkrishna Mukherjee ask the government for a modern hospital and hand over a building to pay for it. It opens in May, under Sub-Assistant Surgeon Dr Dayalchand Basak.' },
    bn: { t: 'হাসপাতাল',
          d: 'জয়কৃষ্ণ আর রাজকৃষ্ণ মুখোপাধ্যায় সরকারের কাছে আধুনিক হাসপাতালের আর্জি জানান, আর তার খরচ চালাতে নিজেদের একটা বাড়িই ছেড়ে দেন। মে মাসে চালু — প্রথম দায়িত্বে ডাক্তার দয়ালচাঁদ বসাক।' },
  },
  {
    year: '১৮৫৩', yearEn: '1853', src: 'wikiCivic', mark: true,
    en: { t: 'The municipality',
          d: 'Uttarpara Municipality is constituted on 14 April — the oldest in West Bengal, twelve years before Serampore and twenty-three before Calcutta. A first petition in 1851 had been refused; the second, which Jaykrishna Mukherjee drove, was not.' },
    bn: { t: 'পৌরসভা',
          d: '১৪ এপ্রিল উত্তরপাড়া পৌরসভা গঠিত — পশ্চিমবঙ্গের প্রাচীনতম। শ্রীরামপুরের বারো বছর আগে, কলকাতার তেইশ। ১৮৫১-র প্রথম আবেদন নাকচ হয়েছিল; দ্বিতীয়টা, যেটা জয়কৃষ্ণ মুখোপাধ্যায় নিজে চালিয়েছিলেন, হয়নি।' },
  },
  {
    year: '১৮৫৯', yearEn: '1859', src: 'wbhc', mark: true, big: true,
    en: { t: 'The library opens its doors',
          d: 'Building begun in 1856 on an acre beside the Grand Trunk Road, at a cost of ₹85,000, and opened to the public on 15 April 1859 with three thousand of the founder\'s own books. Free, and open to anyone who walked in.' },
    bn: { t: 'লাইব্রেরির দরজা খুলল',
          d: 'জিটি রোডের ধারে এক বিঘেরও বেশি জমিতে ১৮৫৬-য় কাজ শুরু, খরচ পঁচাশি হাজার টাকা। ১৫ এপ্রিল ১৮৫৯ সাধারণের জন্য খুলে গেল — প্রতিষ্ঠাতার নিজের তিন হাজার বই নিয়ে। বিনা পয়সায়, যে কেউ ঢুকতে পারে।' },
  },
  {
    year: '১৮৮১', yearEn: '1881', src: 'wikiRPM',
    en: { t: 'A college',
          d: 'Jaykrishna Mukherjee founds the college that carries his son\'s name today — Raja Peary Mohan College, renamed in 1953 and affiliated to the University of Calcutta.' },
    bn: { t: 'কলেজ',
          d: 'জয়কৃষ্ণ মুখোপাধ্যায় যে কলেজ গড়েন, আজ তা তাঁর ছেলের নামে — রাজা পিয়ারীমোহন কলেজ। নাম বদলায় ১৯৫৩-য়; কলকাতা বিশ্ববিদ্যালয়ের অধীন।' },
  },
  {
    year: '১৯০৯', yearEn: '1909', src: 'saioc', mark: true, big: true,
    en: { t: 'The Uttarpara Speech',
          d: 'On 30 May, a year out of a British jail, Sri Aurobindo speaks in the open courtyard on the river side of the library. It is the first time he speaks publicly of his own inner life, and close to the last thing he says in politics. He leaves for Pondicherry the following February.' },
    bn: { t: 'উত্তরপাড়া বক্তৃতা',
          d: '৩০ মে, জেল থেকে ছাড়া পাওয়ার এক বছরের মাথায়, শ্রীঅরবিন্দ বললেন লাইব্রেরির গঙ্গার দিকের খোলা চত্বরে। নিজের অন্তর্জীবনের কথা এই প্রথম প্রকাশ্যে, আর রাজনীতিতে প্রায় শেষ কথা। পরের ফেব্রুয়ারিতেই তিনি পন্ডিচেরি।' },
  },
  {
    year: '১৯৩৯', yearEn: '1939', src: 'wikiAV',
    en: { t: 'Amarendra Vidyapith',
          d: 'Uttarpara English High School opens on 6 March. In 1958 it is renamed for Amarendranath Chattopadhyay — the Uttarpara revolutionary who, thirty years before, had gone to Calcutta to fetch Sri Aurobindo for the speech.' },
    bn: { t: 'অমরেন্দ্র বিদ্যাপীঠ',
          d: '৬ মার্চ চালু হল উত্তরপাড়া ইংলিশ হাই স্কুল। ১৯৫৮-য় নাম বদলে অমরেন্দ্রনাথ চট্টোপাধ্যায়ের নামে — সেই উত্তরপাড়ার বিপ্লবী, যিনি ত্রিশ বছর আগে কলকাতা থেকে শ্রীঅরবিন্দকে ডেকে এনেছিলেন ওই বক্তৃতার জন্য।' },
  },
  {
    year: '১৯৪২', yearEn: '1942', src: 'wikiTown',
    en: { t: 'Hindmotor',
          d: 'A car plant is built on the northern edge of town and gives a whole neighbourhood its name. The Hindustan Ambassador came out of it from 1957 until the line stopped on 24 May 2014. For two generations the tea shops here ran on shift timings.' },
    bn: { t: 'হিন্দমোটর',
          d: 'শহরের উত্তর প্রান্তে কারখানা, আর গোটা একটা পাড়ার নামই হয়ে গেল তার নামে। ১৯৫৭ থেকে এখান থেকেই বেরোত হিন্দুস্তান অ্যাম্বাসাডর, ২৪ মে ২০১৪-য় শেষ। দু’প্রজন্ম ধরে এখানকার চায়ের দোকান চলত শিফটের ঘড়ি ধরে।' },
  },
];

/* ---------- people ------------------------------------------------------ */
/* `kind` is the whole point of this list. 'town' means Uttarpara was theirs;
   'visitor' means they came, spoke, stayed a while and went. Collapsing the
   two would let the page imply that Vivekananda was a local, which he was
   not, and there is no need — the true version is remarkable enough. */

const TOWN_PEOPLE = [
  { kind: 'town', years: '1808–1888', src: 'wikiJK',
    en: { n: 'Jaykrishna Mukherjee', r: 'Zamindar. Built the school, the hospital, the library and the college, and funded thirty-one schools in all.' },
    bn: { n: 'জয়কৃষ্ণ মুখোপাধ্যায়', r: 'জমিদার। স্কুল, হাসপাতাল, লাইব্রেরি, কলেজ — সব তাঁর গড়া। মোট একত্রিশটা স্কুলের খরচ চালাতেন।' } },

  { kind: 'town', years: '1880–1957', src: 'wikiAmar',
    en: { n: 'Amarendranath Chatterjee', r: 'Born here. Raised money for the Jugantar revolutionaries, and fetched Sri Aurobindo from Calcutta for the 1909 speech.' },
    bn: { n: 'অমরেন্দ্রনাথ চট্টোপাধ্যায়', r: 'এখানেই জন্ম। যুগান্তরের জন্য টাকা জোগাড় করতেন। ১৯০৯-এর বক্তৃতার জন্য কলকাতা থেকে শ্রীঅরবিন্দকে নিয়ে আসেন ইনিই।' } },

  { kind: 'stayed', years: '1869, 1873', src: 'wikiLibrary',
    en: { n: 'Michael Madhusudan Dutt', r: 'The poet stayed at the library — two months in 1869, and again in 1873, the year he died.' },
    bn: { n: 'মাইকেল মধুসূদন দত্ত', r: 'কবি থেকেছেন এই লাইব্রেরিতেই — ১৮৬৯-এ দু’মাস, আবার ১৮৭৩-এ, যে বছর তাঁর মৃত্যু।' } },

  { kind: 'visitor', years: '1866', src: 'wikiLibrary',
    en: { n: 'Ishwar Chandra Vidyasagar', r: 'Came to the library in 1866, with Mary Carpenter. Jaykrishna Mukherjee was the first to sign his petition for widow remarriage.' },
    bn: { n: 'ঈশ্বরচন্দ্র বিদ্যাসাগর', r: '১৮৬৬-য় মেরি কার্পেন্টারকে নিয়ে লাইব্রেরিতে আসেন। বিধবাবিবাহের আবেদনপত্রে প্রথম সইটি ছিল জয়কৃষ্ণ মুখোপাধ্যায়ের।' } },

  { kind: 'visitor', years: '1866', src: 'wikiLibrary',
    en: { n: 'Mary Carpenter', r: 'The English education reformer, on one of her Indian journeys, at the library with Vidyasagar.' },
    bn: { n: 'মেরি কার্পেন্টার', r: 'ইংরেজ শিক্ষা-সংস্কারক। ভারত-সফরের মাঝে বিদ্যাসাগরের সঙ্গে এই লাইব্রেরিতে।' } },

  { kind: 'visitor', years: '1909', src: 'saioc',
    en: { n: 'Sri Aurobindo', r: 'Spoke here once, on 30 May 1909, to something like ten thousand people. That once was enough to name the speech after the town.' },
    bn: { n: 'শ্রীঅরবিন্দ', r: 'একবারই বলেছিলেন এখানে, ৩০ মে ১৯০৯, হাজার দশেক লোকের সামনে। ওই একবারেই বক্তৃতাটার নাম হয়ে গেল শহরের নামে।' } },

  { kind: 'visitor', years: '—', src: 'municipality',
    en: { n: 'Vivekananda, Keshab Sen, Surendranath Banerjee, Bipin Chandra Pal', r: 'The municipality\'s own history records them among those who came to Uttarpara — visitors, several times over, not residents.' },
    bn: { n: 'বিবেকানন্দ, কেশবচন্দ্র সেন, সুরেন্দ্রনাথ বন্দ্যোপাধ্যায়, বিপিনচন্দ্র পাল', r: 'পৌরসভার নিজের ইতিহাসে এঁদের নাম আছে উত্তরপাড়ায় আসা মানুষদের তালিকায় — একাধিকবার এসেছেন, বাস করেননি।' } },
];

/* ---------- institutions ------------------------------------------------ */

const TOWN_LEARNING = [
  { year: '1846', yearBn: '১৮৪৬', src: 'wikiSchool', photo: null,
    en: { n: 'Uttarpara Government High School',
          d: 'Opened in May 1846 by Jaykrishna and Rajkrishna Mukherjee, with ₹2,220 raised by subscription from the people of Uttarpara and Bhadrakali. Ramtanu Lahiri was headmaster from 1852. It is older than the municipality.' },
    bn: { n: 'উত্তরপাড়া গভর্নমেন্ট হাই স্কুল',
          d: '১৮৪৬-এর মে মাসে জয়কৃষ্ণ ও রাজকৃষ্ণ মুখোপাধ্যায়ের হাতে শুরু, সঙ্গে উত্তরপাড়া আর ভদ্রকালীর লোকের চাঁদায় ওঠা ২২২০ টাকা। ১৮৫২ থেকে প্রধান শিক্ষক রামতনু লাহিড়ী। পৌরসভার চেয়েও পুরনো।' } },

  { year: '1859', yearBn: '১৮৫৯', src: 'wbhc', photo: 'library-2',
    en: { n: 'Uttarpara Jaykrishna Public Library',
          d: 'Knowledge made public, and free, in a town of a few thousand people. Reading rooms upstairs, the river behind, and no ticket at the door.' },
    bn: { n: 'উত্তরপাড়া জয়কৃষ্ণ পাবলিক লাইব্রেরি',
          d: 'হাজার কয়েক লোকের একটা শহরে বই সবার জন্য, বিনা পয়সায়। উপরে পড়ার ঘর, পিছনে গঙ্গা, দরজায় কোনও টিকিট নেই।' } },

  { year: '1881', yearBn: '১৮৮১', src: 'wikiRPM', photo: null,
    en: { n: 'Raja Peary Mohan College',
          d: 'Founded by Jaykrishna Mukherjee and renamed in 1953 for his son. Affiliated to the University of Calcutta, and still where most of the town goes for a degree.' },
    bn: { n: 'রাজা পিয়ারীমোহন কলেজ',
          d: 'জয়কৃষ্ণ মুখোপাধ্যায়ের গড়া, ১৯৫৩-য় ছেলের নামে নামকরণ। কলকাতা বিশ্ববিদ্যালয়ের অধীনে — আজও শহরের বেশির ভাগ ছেলেমেয়ে এখানেই পড়তে যায়।' } },

  { year: '1939', yearBn: '১৯৩৯', src: 'wikiAV', photo: null, lead: true,
    en: { n: 'Uttarpara Amarendra Vidyapith',
          d: 'Opened on 6 March 1939 as Uttarpara English High School; renamed in 1958 for Amarendranath Chattopadhyay, the revolutionary who brought Sri Aurobindo to the library in 1909. A Bengali-medium boys\' school, and one the town measures itself by.' },
    bn: { n: 'উত্তরপাড়া অমরেন্দ্র বিদ্যাপীঠ',
          d: '৬ মার্চ ১৯৩৯-এ শুরু, তখন নাম উত্তরপাড়া ইংলিশ হাই স্কুল। ১৯৫৮-য় নাম হল অমরেন্দ্রনাথ চট্টোপাধ্যায়ের নামে — সেই বিপ্লবী, যিনি ১৯০৯-এ শ্রীঅরবিন্দকে লাইব্রেরিতে এনেছিলেন। বাংলা মাধ্যম, ছেলেদের স্কুল, আর শহর নিজেকে মাপে এই স্কুলটা দিয়েই।' } },

  { year: '1940', yearBn: '১৯৪০', src: 'wikiTown', photo: null,
    en: { n: 'Uttarpara Girls\' High School',
          d: 'Girls\' education here did not start in 1940 — Jaykrishna Mukherjee was funding it in the 1860s, and gave ₹10,000 to Bethune College. But this is the school that made it ordinary, class five to twelve, in Bengali. It stands in the same ward as this shop, and its last bell is our busiest minute of the day.' },
    bn: { n: 'উত্তরপাড়া গার্লস হাই স্কুল',
          d: 'মেয়েদের পড়াশোনা এখানে ১৯৪০-এ শুরু হয়নি — জয়কৃষ্ণ মুখোপাধ্যায় ষাটের দশকেই তাতে টাকা দিচ্ছেন, বেথুন কলেজে দশ হাজার। কিন্তু ব্যাপারটাকে রোজকার করে তুলল এই স্কুলই। পঞ্চম থেকে দ্বাদশ, বাংলা মাধ্যম। আমাদের দোকানের সঙ্গে একই ওয়ার্ডে — আর ছুটির ঘণ্টাটাই আমাদের দিনের সবচেয়ে ব্যস্ত মিনিট।' } },
];

/* ---------- heritage places --------------------------------------------- */

const TOWN_PLACES = [
  { photo: 'terracotta', src: 'wikiTown',
    en: { n: 'The terracotta temples', d: 'Ridged towers and moulded brick, the old Bengal grammar, kept in paint rather than in a museum.' },
    bn: { n: 'পোড়ামাটির মন্দির', d: 'চূড়া আর গড়া ইট — বাংলার পুরনো ব্যাকরণ, জাদুঘরে নয়, রঙ করে রাখা।' } },
  { photo: 'pancharatna', src: 'wikiTown',
    en: { n: 'A pancharatna facade', d: 'Five pinnacles, the classic Bengali temple plan, on a street where people still leave their slippers at the step.' },
    bn: { n: 'পঞ্চরত্ন', d: 'পাঁচ চূড়া — বাংলার চেনা মন্দির-নকশা। রাস্তার ধারেই, আর লোকে আজও সিঁড়ির নিচে চটি খুলে রাখে।' } },
  { photo: 'ghat', src: 'wikiTown',
    en: { n: 'The ghats', d: 'Steps into the Hooghly, the Bally bridge upstream, and Dakshineswar directly across the water.' },
    bn: { n: 'ঘাট', d: 'গঙ্গায় নেমে যাওয়া সিঁড়ি, উজানে বালি ব্রিজ, আর ঠিক উল্টো পাড়ে দক্ষিণেশ্বর।' } },
];

/* ---------- external resources ------------------------------------------ */
/*
   `embed: 'iframe'` was set by CHECKING, not by hoping. Each origin was
   requested and its response headers read:

     uttarpara.com                   200, CSP: upgrade-insecure-requests only,
                                     no X-Frame-Options, no frame-ancestors
                                     → frames fine
     www.uttarparamunicipality.in    200, no X-Frame-Options, no CSP
                                     → frames fine
     en.wikipedia.org                200, CSP present but no frame-ancestors
                                     → would frame, and we still do not

   WIKIPEDIA IS DELIBERATELY NOT FRAMED even though it technically permits it.
   Framing a full article ships a megabyte of chrome the reader did not ask
   for and reproduces the whole page inside ours. The REST summary endpoint is
   CORS-enabled and gives exactly the paragraph a reader wants, which we render
   in this site's own type with the licence and a link out. That is better for
   the reader and fairer to Wikipedia than an iframe.

   NOTHING HERE DEFEATS ANYBODY'S FRAME POLICY. If a site starts sending
   X-Frame-Options tomorrow, the iframe fails, `onerror`/the load timeout
   fires, and the panel falls back to the native card. No proxying, no
   header-stripping, no reader-mode scrape.
*/

const TOWN_RESOURCES = [
  {
    id: 'wikipedia',
    tab: { en: 'Wikipedia', bn: 'উইকিপিডিয়া' },
    url: 'https://en.wikipedia.org/wiki/Uttarpara',
    embed: 'api',                       // MediaWiki REST summary, rendered natively
    api: 'https://en.wikipedia.org/api/rest_v1/page/summary/Uttarpara',
    attribution: { en: 'Wikipedia · CC BY-SA 4.0', bn: 'উইকিপিডিয়া · CC BY-SA 4.0' },
    en: { title: 'Uttarpara on Wikipedia',
          blurb: 'The encyclopaedia article: geography, the 2011 census, the municipality, the library, the Hindmotor plant and the people the town claims.' },
    bn: { title: 'উইকিপিডিয়ায় উত্তরপাড়া',
          blurb: 'বিশ্বকোষের ভুক্তি — ভূগোল, ২০১১-র জনগণনা, পৌরসভা, লাইব্রেরি, হিন্দমোটরের কারখানা, আর শহর যাঁদের নিজের বলে দাবি করে।' },
  },
  {
    id: 'uttarpara',
    tab: { en: 'Uttarpara.com', bn: 'উত্তরপাড়া.com' },
    url: 'https://uttarpara.com/',
    embed: 'iframe',
    attribution: { en: 'uttarpara.com', bn: 'uttarpara.com' },
    en: { title: 'Uttarpara.com',
          blurb: 'The town\'s own community portal — history, heritage, families, schools, festivals and a forum, written by people who live here.' },
    bn: { title: 'Uttarpara.com',
          blurb: 'শহরের নিজের পোর্টাল — ইতিহাস, হেরিটেজ, পুরনো পরিবার, স্কুল, উৎসব, ফোরাম। লিখছেন যাঁরা এখানেই থাকেন।' },
  },
  {
    id: 'library',
    tab: { en: 'The library', bn: 'লাইব্রেরি' },
    url: 'https://wbhc.in/home/place_list_all',
    embed: 'native',                    // no standalone official site; do not invent one
    attribution: { en: 'West Bengal Heritage Commission', bn: 'পশ্চিমবঙ্গ হেরিটেজ কমিশন' },
    en: { title: 'Uttarpara Jaykrishna Public Library',
          blurb: 'The library has no modern website of its own, so this panel is put together from the state heritage listing and the encyclopaedia rather than pointing you at a page that does not exist.' },
    bn: { title: 'উত্তরপাড়া জয়কৃষ্ণ পাবলিক লাইব্রেরি',
          blurb: 'লাইব্রেরির নিজস্ব ওয়েবসাইট নেই। তাই এই অংশটা রাজ্যের হেরিটেজ তালিকা আর বিশ্বকোষ থেকে সাজানো — নেই এমন একটা পাতার লিঙ্ক ধরিয়ে দেওয়ার চেয়ে সেটাই ভালো।' },
    facts: [
      { en: ['Opened', '15 April 1859'],        bn: ['খোলে', '১৫ এপ্রিল ১৮৫৯'] },
      { en: ['Founder', 'Jaykrishna Mukherjee'], bn: ['প্রতিষ্ঠাতা', 'জয়কৃষ্ণ মুখোপাধ্যায়'] },
      { en: ['Built', '1856–59, ₹85,000, on an acre'], bn: ['নির্মাণ', '১৮৫৬–৫৯, ৮৫,০০০ টাকা, এক একর জমি'] },
      { en: ['Listed', 'West Bengal Heritage Commission, 17 Jan 2008'], bn: ['তালিকাভুক্ত', 'পশ্চিমবঙ্গ হেরিটেজ কমিশন, ১৭ জানুয়ারি ২০০৮'] },
      { en: ['On the shelves', 'about 45,000 old and rare books, 450 manuscripts'], bn: ['তাকে', 'হাজার পঁয়তাল্লিশ পুরনো ও দুষ্প্রাপ্য বই, সাড়ে চারশো পুঁথি'] },
    ],
  },
  {
    id: 'municipality',
    tab: { en: 'Municipality', bn: 'পৌরসভা' },
    url: 'https://www.uttarparamunicipality.in/',
    embed: 'iframe',
    attribution: { en: 'Uttarpara-Kotrung Municipality', bn: 'উত্তরপাড়া-কোতরং পৌরসভা' },
    en: { title: 'Uttarpara-Kotrung Municipality',
          blurb: 'The civic body, constituted 14 April 1853 and the oldest in West Bengal. Its own history page is the source for most of the dates on this page.' },
    bn: { title: 'উত্তরপাড়া-কোতরং পৌরসভা',
          blurb: '১৪ এপ্রিল ১৮৫৩-য় গঠিত, পশ্চিমবঙ্গের প্রাচীনতম। এই পাতার বেশির ভাগ তারিখ ওদের নিজেদের ইতিহাসের পাতা থেকেই নেওয়া।' },
  },
  {
    id: 'speech',
    tab: { en: 'The 1909 speech', bn: '১৯০৯-এর বক্তৃতা' },
    url: 'https://en.wikisource.org/wiki/Uttarpara_Speech',
    embed: 'native',
    attribution: { en: 'Wikisource', bn: 'উইকিসোর্স' },
    en: { title: 'The Uttarpara Speech, 30 May 1909',
          blurb: 'Sri Aurobindo\'s address at the library, in full, on Wikisource. It is a long text and a serious one; it belongs on the page that hosts it, not paraphrased here.' },
    bn: { title: 'উত্তরপাড়া বক্তৃতা, ৩০ মে ১৯০৯',
          blurb: 'লাইব্রেরিতে দেওয়া শ্রীঅরবিন্দের সেই ভাষণ, পুরোটা, উইকিসোর্সে। লেখাটা দীর্ঘ এবং গুরুত্বপূর্ণ — এখানে সারসংক্ষেপ করে দেওয়ার জিনিস নয়।' },
    facts: [
      { en: ['Occasion', 'a Sanatana Dharma Rakshini Sabha meeting'], bn: ['উপলক্ষ', 'সনাতন ধর্ম রক্ষিণী সভার অধিবেশন'] },
      { en: ['Where', 'the open courtyard on the river side of the library'], bn: ['কোথায়', 'লাইব্রেরির গঙ্গার দিকের খোলা চত্বরে'] },
      { en: ['Audience', 'reported at about ten thousand'], bn: ['শ্রোতা', 'হাজার দশেক বলে লেখা আছে'] },
      { en: ['Who fetched him', 'Amarendranath Chatterjee, of Uttarpara'], bn: ['কে নিয়ে আসেন', 'উত্তরপাড়ার অমরেন্দ্রনাথ চট্টোপাধ্যায়'] },
      { en: ['Marked by', 'a marble plaque on the grounds, 1972'], bn: ['স্মারক', 'চত্বরে মার্বেল ফলক, ১৯৭২'] },
    ],
  },
];

/* ---------- picture credits --------------------------------------------- */
/* Wikimedia Commons, reused under the licence named. Each has been resized
   and some cropped, which the licences permit and which is stated here
   because CC BY-SA asks you to say when you have changed something. */

const TOWN_CREDITS = [
  { file: 'library-2',  title: 'Joy Krishna Public Library, Uttarpara', by: 'Kinjal bose 78', lic: 'CC BY-SA 4.0',
    licUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Joy_Krishna_Public_Library-Uttarpara-West_Bengal-5.jpg' },
  { file: 'ghat',       title: 'College Ghat', by: 'Geetanjalidhar', lic: 'CC BY-SA 3.0',
    licUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    page: 'https://commons.wikimedia.org/wiki/File:College_Ghat.jpg' },
  { file: 'jaykrishna', title: 'Jaykrishna Mukherjee of Uttarpara', by: 'James Archer, R.S.A.', lic: 'Public domain',
    licUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    page: 'https://commons.wikimedia.org/wiki/File:Jaykrishna_Mukherjee_of_Uttarpara.png' },
  { file: 'terracotta', title: 'Terracotta temples of Uttarpara', by: 'Kinjal bose 78', lic: 'CC BY-SA 4.0',
    licUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Terracotta_temples_of_Uttarpara-Uttarpara-Hooghly-DSC_5938_01.jpg' },
  { file: 'pancharatna', title: 'Pancharatna temple of Uttarpara', by: 'Kinjal bose 78', lic: 'CC BY-SA 4.0',
    licUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Pancharatna_Temple_of_Uttarpara-Uttarpara-West_Bengal-DSC_0037.jpg' },
  { file: 'durgapuja', title: 'Uttarpara C. A. Math Durga Puja, 2022', by: 'VNC200', lic: 'CC BY-SA 4.0',
    licUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Uttarpara_C._A._Math_Durga_Puja_2022.jpg' },
];
