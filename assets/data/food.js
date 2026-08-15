/* ==========================================================================
   UTTARPARA — the food story.

   The town page tells the institutional history: the school, the municipality,
   the library, the speech. This is the other history, the one that happened
   three times a day and nobody wrote down.

   THE RULE THIS FILE ENFORCES, AND IT IS THE WHOLE POINT.
   Two different things are being done here and they are never allowed to blur:

     type: 'documented'  — somebody recorded it. Say it plainly, cite it.
     type: 'informed'    — nobody recorded it FOR UTTARPARA, but the wider
                           food history makes it a fair reconstruction. The
                           copy must hedge out loud, in both languages:
                           "would likely have", "a plausible plate",
                           "we can imagine". Never stated as fact.
     type: 'interpretive'— our reading, or an idea for a future menu. Said to
                           be that.

   Every entry also carries `src`, keyed into data/uttarpara-culinary-sources.json,
   and `confidence`, which is NOT rendered. Confidence is a note to whoever
   edits this next, so that a medium-confidence reconstruction does not get
   quietly promoted to a fact — which is exactly how a website ends up
   teaching a town a history it never had.

   WHAT IS NOT HERE. No dish invented in Uttarpara. No Portuguese ship docking
   at Uttarpara. No historical person's favourite food. No "best hilsa in
   Bengal". No named sweet shop — searched, and nothing with a verifiable
   founding date turned up, so the sweet chapter is about the custom and names
   nobody.

   THE BENGALI IS THE FIRST DRAFT HERE, NOT THE SECOND. Three times on this
   site a Bengali line has turned out to be an English sentence in Bengali
   script — দামের সিঁড়ি, the library's টিকিট, বড় অর্ডার. So this chapter was
   written in Bengali first and the English written beside it, which is why
   they do not track sentence for sentence and should not be edited as though
   they do.
   ========================================================================== */

'use strict';

const FOOD_CHAPTERS = [
  {
    id: '1704',
    img: '1704-river',
    era:   { bn: '১৭০৪',  en: '1704' },
    type: 'informed', src: ['municipality'], confidence: 'medium',
    ttl: { bn: 'নদী আগে, বই পরে',
           en: 'The river fed the town before the books did' },
    lede: {
      bn: 'পৌরসভার নিজের ইতিহাস বলছে, ১৭০৪ সালে রত্নেশ্বর রায়চৌধুরী পরিবার নিয়ে এখানে এসে বসেন। জায়গাটা তখন জলা, লোকবসতি পাতলা, আর যাঁরা ছিলেন তাঁদের মধ্যে পাটনি ও মালো — মাছ ধরা আর নৌকো বাওয়াই ছিল কাজ।',
      en: 'The municipality’s own history records Ratneswar Roychowdhury settling here with his family in 1704. The ground was marsh, the settlement thin, and among the people already living on it were Patni and Malo families whose trades were fishing and ferrying.',
    },
    body: {
      bn: 'তাহলে হেঁশেলে কী উঠত? লেখা নেই কোথাও। কিন্তু জায়গাটা দেখলে আন্দাজ করা যায় — আর আন্দাজটা আন্দাজ বলেই বলা ভালো। ভাত। সকালে জাল যা তুলেছে, সেই ছোট মাছ। ভেজা মাটির শাক। ডাল। সরষে। মরসুমি সবজি, কলা, নারকেল, একটু গুড়।',
      en: 'So what went on the fire? Nobody wrote it down. But you can read it off the ground itself — and it is better said as a reading than as a fact. Rice. Whatever the net brought up that morning. Greens off the wet earth. Dal. Mustard. Seasonal vegetables, banana, coconut, a little jaggery.',
    },
    plate: {
      label: { bn: 'সম্ভাব্য এক থালা, আনুমানিক ১৭০৪', en: 'A plausible plate, c. 1704' },
      items: {
        bn: ['ভাত', 'নদীর ছোট মাছ', 'ভেজা জমির শাক', 'ডাল', 'সরষে', 'মরসুমি সবজি'],
        en: ['Rice', 'Small river fish', 'Greens from the wet ground', 'Dal', 'Mustard', 'Whatever was in season'],
      },
    },
    kicker: {
      bn: 'উত্তরপাড়ার প্রথম রান্না কোনও রাঁধুনির আবিষ্কার নয়। ভূগোল যা দিয়েছে, তাই।',
      en: 'The first Uttarpara cooking was not invented by any cook. It was dictated by geography.',
    },
  },

  {
    id: '1750',
    img: '1750-trade',
    era:   { bn: '১৭৫০–১৮০০', en: '1750–1800' },
    type: 'documented', src: ['sahapedia', 'creoleBengal', 'chhanaPaper'], confidence: 'high',
    ttl: { bn: 'হুগলি তখনই আন্তর্জাতিক',
           en: 'The Hooghly was already global' },
    lede: {
      bn: 'উত্তরপাড়া যে নদীর ধারে গড়ে উঠল, সে নদী ততদিনে দুনিয়ার রাস্তা। হুগলি জেলার ওপরেই ইউরোপীয় শক্তিগুলোর আনাগোনা — আর তার ছাপ পড়ে বাঙালির হেঁশেলে।',
      en: 'The river Uttarpara grew up beside was, by then, an international road. European powers were operating up and down the Hooghly district, and the mark of that landed in the Bengali kitchen.',
    },
    body: {
      bn: 'লঙ্কা আসে মধ্য আমেরিকা থেকে, লম্বা মরিচ আর গোলমরিচের জায়গা নিতে নিতে। আলু ইউরোপে পৌঁছয় ১৫৭০-এ, কলকাতায় জনপ্রিয় হয় ১৮৬০ নাগাদ — আর গোঁড়া বাড়িতে তারও অনেক পরে। পাউরুটি, ভিনিগার, চিজ তৈরির কৌশল — সবই এই পথ ধরেই।',
      en: 'Chillies came from Central America and worked their way in as a substitute for long pepper and black pepper. The potato reached Europe in 1570 and was popular in Calcutta by about 1860 — and avoided in orthodox households for a good while after that. Bread, vinegar and cheese-making technique travelled the same road.',
    },
    note: {
      bn: 'সাবধানে: পর্তুগিজ জাহাজ উত্তরপাড়ায় ভিড়ত — এমন কোনও প্রমাণ নেই, আর এই পাতা সেটা বলেও না। যেটা বলা যায়, উত্তরপাড়ার জন্ম এমন এক নদীর পাড়ে যে নদী দিয়ে এসব ইতিমধ্যেই যাতায়াত করছিল।',
      en: 'Carefully: there is no evidence that Portuguese ships docked at Uttarpara, and this page does not say so. What can be said is that Uttarpara was born beside a river along which all of this was already moving.',
    },
  },

  {
    id: '1800',
    img: '1800-sweets',
    era:   { bn: '১৮০০–১৮৫০', en: '1800–1850' },
    type: 'documented', src: ['creoleBengal', 'chhanaPaper'], confidence: 'high',
    ttl: { bn: 'ছানা এল, আর মিষ্টির ভাষাটাই বদলে গেল',
           en: 'Chhana arrives, and the whole language of sweets changes' },
    lede: {
      bn: 'ষোড়শ শতকের আগে বাংলা লেখায় ছানার নাম নেই। দুধ ইচ্ছে করে কাটানো হিন্দু রান্নায় অচল ছিল। তারপর সেটা বদলায় — আর পর্তুগিজদের ছানা তৈরির পদ্ধতির সঙ্গে বাংলার ছানার মিল এত কাছের যে গবেষকরা দুটোকে একসঙ্গে পড়েন।',
      en: 'There is no mention of chhana in Bengali writing before the sixteenth century; deliberately curdling milk was improper in Hindu practice. Then it changed — and Portuguese cheese-making is close enough in method to Bengali chhana that scholars read the two together.',
    },
    body: {
      bn: 'আগে মিষ্টি মানে ছিল দুধ আর গুড়ের কারবার — পায়েস, ক্ষীর, নাড়ু। ছানা আসার পর এল সন্দেশ, রসগোল্লা, পান্তুয়া। গবেষণাপত্র বলছে সন্দেশের উঠে আসা ওই ‘ক্রেওল বাংলা’-র সময়ে, যখন হুগলি জেলায় ইউরোপীয়দের আনাগোনা; আর রসগোল্লার কৃতিত্ব লোকে দেয় ১৮৬৮-র কলকাতায়, নবীনচন্দ্র দাশকে।',
      en: 'Before, a sweet meant milk and jaggery — payesh, kheer, naru. After chhana came sandesh, rosogolla, pantua. The scholarship places sandesh’s emergence in what it calls creole Bengal, when European powers were working the Hooghly district; rosogolla is popularly credited to Nabin Chandra Das in Calcutta in 1868.',
    },
    note: {
      bn: 'পর্তুগিজরা সন্দেশ বা রসগোল্লা বানিয়েছিলেন — এমন দাবি এখানে নেই। যেটা বলা হচ্ছে, তাঁদের ছানা তৈরির কৌশল বাংলার ছানার ঐতিহ্য গড়ে উঠতে সাহায্য করেছিল। গবেষণাপত্রটিও কথাটাকে ‘প্রচলিত ধারণা’ বলেই লিখেছে, আর আমরাও তাই লিখছি।',
      en: 'Nobody here is claiming the Portuguese invented sandesh or rosogolla. The claim is that their cheese-making contributed to Bengal’s chhana tradition — and the paper itself calls the attribution a popular one, so this page calls it that too.',
    },
  },

  {
    id: '1859',
    img: '1859-table',
    era:   { bn: '১৮৫৯–১৯০০', en: '1859–1900' },
    type: 'informed', src: ['municipality', 'wikiLibrary', 'wbhc'], confidence: 'medium',
    ttl: { bn: 'লাইব্রেরি খুলল, দরজাও খুলল',
           en: 'The library opens, and so do the doors' },
    lede: {
      bn: 'জয়কৃষ্ণ পাবলিক লাইব্রেরি খোলে ১৮৫৯-এ, আর উত্তরপাড়ায় লোক আসতে থাকে — শিক্ষক, লেখক, সংস্কারক, প্রশাসক, ইংরেজ অতিথি। পাতার অন্য দিকটায় সেই নামগুলো আছে। এখানে প্রশ্নটা আলাদা: এঁরা এলে টেবিলে কী পড়ত?',
      en: 'The Jaykrishna Public Library opened in 1859 and people started coming to Uttarpara — teachers, writers, reformers, administrators, English visitors. The other half of this page has their names. The question here is a different one: when they came, what went on the table?',
    },
    body: {
      bn: 'লাইব্রেরির উনিশ শতকের দুপুরের মেনু কারও কাছে নেই, আমাদের কাছেও না। তবে ওই সময়ের সচ্ছল বাঙালি বাড়ির আতিথেয়তা কেমন ছিল, সেটা জানা — ভাত, ডাল, শুক্তো, ভাজা, তরকারি, মাছের ঝোল, উৎসবে কালিয়া, চাটনি, দই, মিষ্টি। বিশেষ দিনে লুচি আর পোলাও।',
      en: 'Nobody has the library’s nineteenth-century lunch menu, and neither do we. But the shape of hospitality in a comfortable Bengali household of the period is known — rice, dal, shukto, something fried, vegetables, a fish jhol, a richer kalia when the occasion asked for it, chutney, curd, a sweet. Luchi and pulao on a day that mattered.',
    },
    kicker: {
      bn: 'ভাবনার দরজা যত খুলেছে, খাওয়ার টেবিলও তত।',
      en: 'As the town’s doors opened to ideas, its tables opened to visitors.',
    },
  },

  {
    id: '1900',
    img: '1900-adda',
    era:   { bn: '১৯০০–১৯৪৭', en: '1900–1947' },
    type: 'documented', src: ['sahapedia'], confidence: 'high',
    ttl: { bn: 'বাংলা কোনও পদ ধার করেনি — তর্ক করে নিজের করে নিয়েছে',
           en: 'Bengal never merely borrowed a dish. It argued with it until it turned Bengali' },
    lede: {
      bn: 'চা, পাউরুটি, বিস্কুট, কেক, পুডিং, কাটলেট — উনিশ শতকের শেষ আর বিশ শতকের গোড়ায় এগুলো শহুরে বাঙালি জীবনে ঢুকে পড়ে। পাউরুটি আর বিস্কুট নিয়ে তখন রীতিমতো তর্ক — কারও কাছে প্রগতি, কারও কাছে জাত খোয়ানো।',
      en: 'Tea, bread, biscuits, cake, pudding, cutlets — these came into urban Bengali life in the late nineteenth and early twentieth centuries. Bread and biscuits were argued over: progress to some, a caste transgression to others.',
    },
    body: {
      bn: 'কিন্তু নকল হয়নি কিছুই। ইউরোপীয় কাটলেটের বড় মাংসের টুকরো ছোট হয়ে হয়ে দাঁড়াল বাঙালি চপ। omelette মুখে মুখে হয়ে গেল ‘মামলেট’। tea হল চা, pão হল পাউরুটি। সরষে, কাঁচালঙ্কা, আদা আর নদীর মাছ ঢুকে পড়ল ইউরোপীয় কায়দার ভিতরে — আর পদগুলো আর ইউরোপীয় রইল না।',
      en: 'None of it was copied. The European cutlet’s big pieces of meat got smaller and smaller until they were a Bengali chop. Omelette became mamlet in Bengali mouths. Tea became cha and pão became pauruti. Mustard, green chilli, ginger and river fish went inside the European method, and the dishes stopped being European.',
    },
  },

  {
    id: 'today',
    img: 'today-market',
    era:   { bn: 'আজ', en: 'Today' },
    type: 'documented', src: ['hilsaHooghly', 'hooghlyFish', 'wikiTown'], confidence: 'high',
    ttl: { bn: 'তিনশো বছর পরেও নদীটা দুপুরের পাতে',
           en: 'Three centuries on, the river is still part of lunch' },
    lede: {
      bn: 'ইলিশের ভারতীয় আঁতুড়ঘর মূলত গঙ্গা-ভাগীরথী-হুগলির এই অংশটাই — গবেষণাপত্রের কথা। হুগলি জেলার বাজারে রুই, মৃগেল, ইলিশ, কই, পাবদা রোজকার জিনিস। উত্তরপাড়ার মাছবাজার রাজেন্দ্র অ্যাভিনিউতে।',
      en: 'The main Indian home of hilsa is this stretch of the Ganga–Bhagirathi–Hooghly system — that is from the research, not from us. Rohu, mrigel, hilsa, koi and pabda are everyday fish in Hooghly district markets. Uttarpara’s own fish market is on Rajendra Avenue.',
    },
    body: {
      bn: 'কোন বাজারের ইলিশ সেরা, সেটা তথ্য নয় — মত। আর উত্তরপাড়ায় সেই মত জিজ্ঞেস করলে ঠিকানা পাবেন, সঙ্গে বিনামূল্যে একটা তর্কও।',
      en: 'Which market has the best hilsa is not a fact, it is an opinion. Ask for one in Uttarpara and you will get directions, and an argument thrown in free.',
    },
    kicker: {
      bn: 'যে শহরের গোড়ার বসতিতেই জেলে ছিলেন, সেখান থেকে মাছ আর সরেনি।',
      en: 'For a town whose earliest recorded households included fishermen, fish never really left the story.',
    },
  },

  {
    id: 'mishti',
    img: null,
    era:   { bn: 'যে কোনও দিন', en: 'Any given day' },
    type: 'interpretive', src: [], confidence: 'high',
    ttl: { bn: 'ভালো খবর একা আসে না, সঙ্গে বাক্স আনে',
           en: 'In Uttarpara good news rarely travels alone. It brings a box' },
    lede: {
      bn: 'জন্মদিন। অতিথি। পুজো। রেজাল্ট। বিয়ে। নতুন চাকরি। বহুদিন পর মামারবাড়ির লোক। — যা-ই হোক না কেন, কোথাও থেকে একটা মিষ্টির বাক্স এসে পড়ে, আর সুতো বাঁধা অবস্থাতেই টেবিলে ওঠে।',
      en: 'A birthday. A guest. Pujo. Exam results. A wedding. A new job. Relatives nobody has seen in two years. Whatever it is, a box of mishti turns up from somewhere and goes on the table still tied with string.',
    },
    note: {
      bn: 'উত্তরপাড়ার কোনও মিষ্টির দোকানের নাম এখানে নেই, আর সেটা ইচ্ছে করেই। খুঁজে দেখা হয়েছে — কোন দোকান কবেকার, তার যাচাই করা মতো কিছু পাওয়া যায়নি। দোকানের ইতিহাস বানিয়ে লেখার চেয়ে না লেখা ভালো।',
      en: 'No Uttarpara sweet shop is named here, and that is deliberate. We looked; nothing turned up with a verifiable founding date or history. Better to name none than to invent one a shop never had.',
    },
  },

  {
    id: 'manjula',
    img: 'manjula-table',
    era:   { bn: 'আজ ও আগামী', en: 'Now, and next' },
    type: 'interpretive', src: [], confidence: 'high',
    ttl: { bn: 'আর এখন, আরও একটা ছোট রান্নাঘর',
           en: 'And now, one more small kitchen' },
    lede: {
      bn: 'তিনশো বছর ধরে এখানকার খাওয়া বদলেছে যখনই নতুন লোক, নতুন জিনিস আর নতুন ভাবনা এসেছে — নদী দিয়ে, সড়ক দিয়ে, রেল দিয়ে। মঞ্জুলা সেই ধারাবাহিকতার শেষ নাম, এইটুকুই।',
      en: 'For three hundred years the food here has changed whenever new people, new ingredients and new ideas arrived — by river, by road, by rail. Manjula is the latest name in that sequence, and no more than that.',
    },
    body: {
      bn: 'আমরা উত্তরপাড়ার হারানো রেসিপি উদ্ধার করিনি, করার দাবিও নেই। দুই বোন মোমো বানান, চা করেন, স্কুলের ছুটি হলে ভিড় হয়। গল্পটা শহরের, আমরা কেবল আরেকটা পাতা।',
      en: 'We have not recovered Uttarpara’s lost recipes and are not claiming to. Two sisters make momos and brew tea, and there is a queue when the school bell goes. The story belongs to the town. We are one more page of it.',
    },
  },
];

/* ---------- the library table: people, and what is actually known -------- */
/* Each card says which of the two things it is doing. Where a person's food
   is documented it is labelled and cited; where it is not, the card says so
   in as many words rather than filling the gap with a plausible favourite. */

const FOOD_PEOPLE = [
  {
    id: 'vidyasagar', src: ['vidyasagarWiki'], confidence: 'medium',
    name: { bn: 'ঈশ্বরচন্দ্র বিদ্যাসাগর', en: 'Ishwar Chandra Vidyasagar' },
    years: '1820–1891',
    stamp: { kind: 'documented', bn: 'নথিভুক্ত', en: 'Documented' },
    body: {
      bn: 'জীবনীগুলোয় যেটা বারবার আসে তা হল অত্যন্ত সাদাসিধে খাওয়া। ছোটবেলা কেটেছে টানাটানিতে — স্কুলের পর ঘরের কাজ, আর রাতে রাস্তার গ্যাসবাতির নীচে পড়া, যাতে পরদিনের রান্নার তেলটুকু বাঁচে। কোন পদ তাঁর প্রিয় ছিল, সে কথা কোনও নির্ভরযোগ্য সূত্রে পাইনি, তাই লিখছিও না।',
      en: 'What the biographies return to is how plainly he ate. A childhood of scarcity in Calcutta — chores after school, and reading at night under the street lamps so the next day’s cooking oil would not be spent. Which dish he loved, no reliable source told us, so we are not telling you.',
    },
  },
  {
    id: 'aurobindo', src: ['aurobindoDiet', 'aurobindoOnFood', 'saioc'], confidence: 'high',
    name: { bn: 'শ্রীঅরবিন্দ', en: 'Sri Aurobindo' },
    years: '1872–1950',
    stamp: { kind: 'documented', bn: 'নথিভুক্ত', en: 'Documented' },
    body: {
      bn: 'এখানে মজার কথাটা ‘তিনি অমুক ভালোবাসতেন’ নয়। তাঁর খাওয়া জীবনভর বদলেছে — গোড়ায় নিরামিষ ছিলেন না, পন্ডিচেরিতেও বিশের দশক পর্যন্ত মাংস খেয়েছেন, তারপর সাধনা গভীর হতে হতে মাংস ছেড়ে দেন; আবেগের কারণে নয়, প্রয়োজন ফুরিয়ে যাওয়ায়। নিজের পরামর্শও ছিল হালকা, যতটুকু শরীরের দরকার ততটুকু।',
      en: 'The interesting thing here is not that he loved some dish. His eating changed across his life — he was not vegetarian early on and still ate meat in Pondicherry into the 1920s, then gave it up as the sadhana deepened, not out of sentiment but because the need for it fell away. His own advice was light food, enough for strength and no more.',
    },
    kicker: {
      bn: 'তাঁর কাছে খাওয়া ক্রমে রুচির প্রশ্ন থেকে সরে গিয়ে উদ্দেশ্যের প্রশ্ন হয়ে দাঁড়ায়।',
      en: 'For him, food moved gradually from being a matter of preference to being a matter of purpose.',
    },
  },
  {
    id: 'madhusudan', src: ['wikiLibrary'], confidence: 'high',
    name: { bn: 'মাইকেল মধুসূদন দত্ত', en: 'Michael Madhusudan Dutt' },
    years: '1824–1873',
    stamp: { kind: 'unknown', bn: 'যে টেবিল কেবল কল্পনা করা যায়', en: 'A table we can only imagine' },
    body: {
      bn: 'তিনি এই লাইব্রেরিতেই থেকেছেন — ১৮৬৯-এ দু’মাস, আবার ১৮৭৩-এ, যে বছর তাঁর মৃত্যু। কী খেতেন, তার কোনও সূত্র আমরা পাইনি। তাই এখানে তাঁর প্রিয় পদ বসানো হয়নি। বাংলা আর ইউরোপ — দুই জগতের মাঝখানে দাঁড়ানো একজন মানুষের পাত কেমন হতে পারত, সেটা ভাবা যায়; কিন্তু ভাবা আর জানা এক নয়, আর পার্থক্যটা এই পাতা মুছে দেবে না।',
      en: 'He stayed in this library — two months in 1869, and again in 1873, the year he died. What he ate, we found no source for. So no favourite dish has been put in his mouth here. You can imagine the plate of a man standing between the Bengali and European worlds; but imagining is not knowing, and this page will not blur the two.',
    },
  },
  {
    id: 'host', src: ['municipality'], confidence: 'medium',
    name: { bn: 'বাড়ির কর্তার টেবিল', en: 'The host’s table' },
    years: '1859–1900',
    stamp: { kind: 'informed', bn: 'ঐতিহাসিক অনুমান', en: 'Historically informed' },
    body: {
      bn: 'জয়কৃষ্ণ মুখোপাধ্যায়ের নিজের পছন্দের পদ কী ছিল, তার কোনও খোঁজ নেই — তাই বানানোও হয়নি। বদলে এটা সেই সময়ের একটা সচ্ছল উত্তরপাড়ার বাড়ি অতিথিকে কী দিতে পারত তার একটা যুক্তিসঙ্গত ছবি: ভাত, ডাল, শুক্তো, ভাজা, তরকারি, মাছ, চাটনি, দই, মিষ্টি।',
      en: 'What Jaykrishna Mukhopadhyay himself liked to eat, nobody records — so nothing has been made up. This is instead a fair picture of what a comfortable Uttarpara household of the period could put in front of a guest: rice, dal, shukto, something fried, vegetables, fish, chutney, curd, a sweet.',
    },
  },
  {
    id: 'carpenter', src: ['wikiLibrary', 'sahapedia'], confidence: 'medium',
    name: { bn: 'ইংরেজ অতিথিরা', en: 'The English visitors' },
    years: '1866–',
    stamp: { kind: 'informed', bn: 'ঐতিহাসিক অনুমান', en: 'Historically informed' },
    body: {
      bn: '১৮৬৬-য় মেরি কার্পেন্টার বিদ্যাসাগরের সঙ্গে লাইব্রেরিতে আসেন। ইংরেজ অতিথি আর ঝালে নাজেহাল — এই ঠাট্টাটা এখানে নেই। যেটা সত্যি সেটা বেশি আকর্ষণীয়: চা, পাউরুটি, বাংলা মিষ্টি আর নদীর মাছ একই টেবিলে ওঠা শুরু করে, আর দুটো খাওয়ার রীতি পাশাপাশি বসতে শেখে।',
      en: 'Mary Carpenter came to the library with Vidyasagar in 1866. There is no joke here about English visitors and chilli. The true version is more interesting: tea, bread, Bengali sweets and river fish began appearing on the same table, and two ways of eating learned to sit beside each other.',
    },
  },
];

/* ---------- what Manjula could do with it ------------------------------- */
/* CONCEPTS. Not recipes, not claims, and explicitly not "what Uttarpara ate
   in 1704". Each one names the chapter it takes from, so a reader can see it
   is an idea inspired by a period rather than a dish recovered from it. */

const FOOD_IDEAS = [
  { from: '1704',
    bn: { n: 'নদী', d: 'ভাত, ডাল, শাক আর মরসুমি মাছ — গোড়ার উত্তরপাড়ার ভূগোল থেকে ভাবা একটা সাদাসিধে থালা।' },
    en: { n: 'The River', d: 'Rice, dal, greens and a seasonal fish — a deliberately plain plate, thought out from the landscape early Uttarpara stood on.' } },
  { from: '1750',
    bn: { n: 'হুগলির পথ', d: 'পাউরুটি, লঙ্কা আর ছানা — নদী যা যা এনেছিল, তার একটা কিছু।' },
    en: { n: 'What the River Brought', d: 'Bread, chilli and chhana — something built out of the things that came up the Hooghly.' } },
  { from: '1859',
    bn: { n: 'লাইব্রেরির পাত', d: 'উনিশ শতকের শহুরে বাঙালি রান্নার ধাঁচে একটা মাছ বা সবজির কাটলেট। লাইব্রেরিতে এটা পরিবেশন করা হত — এমন দাবি নেই।' },
    en: { n: 'The Library Cutlet', d: 'A fish or vegetable cutlet in the manner of nineteenth-century urban Bengali cooking. No claim that it was ever served at the library.' } },
  { from: '1900',
    bn: { n: 'আড্ডা', d: 'চা, একটা চপ বা কাটলেট, আর শেষে ছোট একটা মিষ্টি। বিকেলটার জন্য।' },
    en: { n: 'The Adda', d: 'Tea, a chop or a cutlet, and one small sweet at the end. Built for an afternoon.' } },
];
