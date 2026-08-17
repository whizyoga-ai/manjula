/* ==========================================================================
   UTTARPARA — the food story.

   The town page tells the institutional history: the school, the municipality,
   the library, the speech. This is the other history, the one that happened
   three times a day and nobody wrote down.

   THE RULE THIS FILE ENFORCES, AND IT IS THE WHOLE POINT.
   Two different things are being done here and they are never allowed to blur:

     type: 'documented'  — somebody wrote it down. Say it plainly, cite it.
     type: 'local'       — held in the town and in the family that settled it
                           in 1704, and not in any book. ATTRIBUTED, not
                           sourced, which is what oral history is. This is
                           not a weaker kind of evidence than a citation; for
                           a town's food it is frequently the better one, and
                           the first version of this file was wrong to have
                           no category for it. A written source is a record of
                           what somebody once bothered to write; most of what
                           a place knows about itself nobody bothered to.
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
    cap: { bn: 'ভোরের কুয়াশা, পাড়ে টানা নৌকো, শুকোতে দেওয়া জাল, আর রান্নার ধোঁয়া।',
           en: 'Dawn mist, boats pulled up on the mud, nets out to dry, and smoke from the morning fire.' },
    era:   { bn: '১৭০৪',  en: '1704' },
    type: 'informed', src: ['municipality'], confidence: 'medium',
    ttl: { bn: 'প্রথমে ছিল নদী, কাদামাটি আর সকালের জাল',
           en: 'The river fed the town before the books did' },
    lede: {
      bn: 'পৌরসভার নিজের ইতিহাস বলছে, ১৭০৪ সালে রত্নেশ্বর রায়চৌধুরী পরিবার নিয়ে এখানে এসে বসেন। চারদিকে তখন আজকের মতো পাকা শহর নয় — জলা, নদীর পাড়, ছড়ানো বসতি; যাঁরা আগে থেকে ছিলেন তাঁদের মধ্যে পাটনি ও মালো, মাছ ধরা আর নৌকো বাওয়াই যাঁদের জীবিকা।',
      en: 'The municipality’s own history records Ratneswar Roychowdhury settling here with his family in 1704. The ground was marsh, the settlement thin, and among the people already living on it were Patni and Malo families whose trades were fishing and ferrying.',
    },
    body: {
      bn: 'হেঁশেলে তখন কী উঠত, তার কোনও রান্নার খাতা আমাদের হাতে নেই — তাই এই অংশ ইতিহাসের দাবি নয়, ভূগোল আর বাংলার সমকালীন খাদ্যাভ্যাস থেকে একটা সম্ভাব্য ছবি। ভাত ছিল সবচেয়ে স্বাভাবিক কেন্দ্র; তার পাশে সকালে জালে ওঠা ছোট নদীর মাছ, ভেজা মাটির শাক, ডাল, সরষে, মরসুমি সবজি, কলা, নারকেল, একটু গুড় — যা স্থানীয়ভাবে মেলে আর দীর্ঘ সংরক্ষণ ছাড়াই খাওয়া যায়। জীবনানন্দ পরে লিখবেন, “বাংলার মুখ আমি দেখিয়াছি” — সেই মুখে নদী, ধান আর সদ্য-ধরা মাছের গন্ধও আছে, আর উত্তরপাড়ার প্রথম দিককার থালাকেও সেই ভূদৃশ্যের ভিতরেই কল্পনা করা সংগত।',
      en: 'So what went on the fire? Nobody wrote it down. But you can read it off the ground itself — and it is better said as a reading than as a fact. Rice. Whatever the net brought up that morning. Greens off the wet earth. Dal. Mustard. Seasonal vegetables, banana, coconut, a little jaggery.',
    },
    plate: {
      label: { bn: 'সম্ভাব্য একটা থালা, আনুমানিক ১৭০৪', en: 'A plausible plate, c. 1704' },
      items: {
        bn: ['ভাত', 'নদীর ছোট মাছ', 'ভেজা জমির শাক', 'ডাল', 'সরষে', 'মরসুমি সবজি'],
        en: ['Rice', 'Small river fish', 'Greens from the wet ground', 'Dal', 'Mustard', 'Whatever was in season'],
      },
    },
    kicker: {
      bn: 'এই রান্নার প্রথম রাঁধুনি কোনও এক ব্যক্তি নন — এই রান্নার প্রথম রেসিপি লিখেছিল নদী ও মাটি।',
      en: 'The first Uttarpara cooking was not invented by any cook. It was dictated by geography.',
    },
  },

  {
    id: '1750',
    img: '1750-trade',
    cap: { bn: 'নদীর ধারে বাণিজ্য — ঝুড়িতে পাউরুটি, শুকনো লঙ্কা আর রসুন, দূরে নোঙর করা জাহাজ।',
           en: 'Trade on the bank: bread, dried chillies and garlic in the baskets, a ship at anchor beyond.' },
    era:   { bn: '১৭৫০–১৮০০', en: '1750–1800' },
    type: 'documented', src: ['sahapedia', 'creoleBengal', 'chhanaPaper'], confidence: 'high',
    ttl: { bn: 'হুগলি নদী তখন শুধু জলধারা নয় — দুনিয়ার সঙ্গে বাংলার পথ',
           en: 'The Hooghly was already global' },
    lede: {
      bn: 'হুগলির দুই পারে বাণিজ্য, বন্দর আর বহিরাগত বসতির দীর্ঘ ইতিহাস বাংলার খাদ্যভাষাকেও বদলে দিয়েছিল। উত্তরপাড়া যে নদীর ধারে গড়ে উঠল, সে নদী ততদিনে দুনিয়ার রাস্তা — আর তার ছাপ পড়েছিল বাঙালির হেঁশেলেও।',
      en: 'The river Uttarpara grew up beside was, by then, an international road. European powers were operating up and down the Hooghly district, and the mark of that landed in the Bengali kitchen.',
    },
    body: {
      bn: 'লঙ্কা এল মধ্য আমেরিকা থেকে, লম্বা মরিচ আর গোলমরিচের জায়গা নিতে নিতে। আলু ইউরোপে পৌঁছয় ১৫৭০-এ, কলকাতায় জনপ্রিয় হয় ১৮৬০ নাগাদ — আর গোঁড়া বাড়িতে তারও অনেক পরে। পাউরুটি, ভিনিগার, ছানা তৈরির কৌশল — সবই এই পথ ধরেই এসেছিল, এক দিনে বা এক জায়গায় নয়; ধীরে ধীরে পুরোনো রান্নার সঙ্গে মিশে। উত্তরপাড়া কোনও বিচ্ছিন্ন দ্বীপ ছিল না — নদী একে কলকাতা, হুগলি আর আরও দূরের বাজারের সঙ্গে যুক্ত রেখেছিল। বাঙালি রান্নার শক্তি নতুন জিনিসকে অক্ষত রাখায় নয়; তাকে নিজের স্বাদের ব্যাকরণে টেনে নেওয়ায়।',
      en: 'Chillies came from Central America and worked their way in as a substitute for long pepper and black pepper. The potato reached Europe in 1570 and was popular in Calcutta by about 1860 — and avoided in orthodox households for a good while after that. Bread, vinegar and cheese-making technique travelled the same road.',
    },
  },

  {
    id: '1800',
    img: '1800-sweets',
    cap: { bn: 'মিষ্টির দোকানের কাউন্টার — বাঁয়ে গুড় আর নাড়ু, মাঝখানে কাপড়ে ছানা, ডানে সন্দেশ আর রসগোল্লা।',
           en: 'A confectioner’s counter: jaggery and coconut sweets on the left, chhana in the muslin, sandesh and rosogolla on the right.' },
    era:   { bn: '১৮০০–১৮৫০', en: '1800–1850' },
    type: 'documented', src: ['creoleBengal', 'chhanaPaper'], confidence: 'high',
    ttl: { bn: 'দুধ কাটল, ছানা হল — মিষ্টির বাংলা বদলে গেল',
           en: 'Chhana arrives, and the whole language of sweets changes' },
    lede: {
      bn: 'ষোড়শ শতকের আগে বাংলা লেখায় ছানার নাম মেলে না — দুধ ইচ্ছাকৃত কাটানো তখন হিন্দু রান্নায় অচল ছিল। তারপর তা বদলায়, আর পর্তুগিজদের ছানা তৈরির পদ্ধতির সঙ্গে বাংলার ছানার মিল এতটাই কাছের যে গবেষকেরা দুটোকে একসঙ্গে পড়েন।',
      en: 'There is no mention of chhana in Bengali writing before the sixteenth century; deliberately curdling milk was improper in Hindu practice. Then it changed — and Portuguese cheese-making is close enough in method to Bengali chhana that scholars read the two together.',
    },
    body: {
      bn: 'ছানার আগেও বাংলায় মিষ্টি ছিল — দুধ ঘন করে ক্ষীর, পায়েস, গুড়-নারকেলের নাড়ু। কিন্তু ছানা জনপ্রিয় হওয়ার পর মিষ্টির সম্ভাবনা অন্য মাত্রা পেল — সন্দেশ, তারপর রসগোল্লা আর পান্তুয়া। গবেষণাপত্র সন্দেশের উঠে আসাকে বসায় সেই সময়ে, যখন হুগলি জেলায় ইউরোপীয়দের আনাগোনা; রসগোল্লার কৃতিত্ব লোকে দেয় ১৮৬৮ সালের কলকাতাকে, নবীনচন্দ্র দাশকে। উত্তরপাড়ার নিজস্ব কোনও নির্দিষ্ট মিষ্টির জন্মকাহিনি প্রমাণ ছাড়া বানানো ঠিক নয় — তবে কলকাতার এত কাছে, হুগলির এই সাংস্কৃতিক অঞ্চলে, নতুন মিষ্টির ভাষা দ্রুত পৌঁছেছিল বলে ভাবার যথেষ্ট ঐতিহাসিক কারণ আছে। একসময় যে দুধ কেটে যাওয়া ছিল অশুভ, সেই ছানাই পরে বাঙালির আনন্দের সবচেয়ে পরিচিত স্বাদগুলোর জন্ম দিল।',
      en: 'Before, a sweet meant milk and jaggery — payesh, kheer, naru. After chhana came sandesh, rosogolla, pantua. The scholarship places sandesh’s emergence in what it calls creole Bengal, when European powers were working the Hooghly district; rosogolla is popularly credited to Nabin Chandra Das in Calcutta in 1868.',
    },
  },

  {
    id: '1859',
    img: '1859-table',
    cap: { bn: 'কাঁসা-পিতলের থালায় ভাত, মাছের ঝোল, লুচি আর তরকারি — পাশে বইপত্র সরানো।',
           en: 'Rice, fish curry, luchi and vegetables on bell-metal, with the books pushed to one side.' },
    era:   { bn: '১৮৫৯–১৯০০', en: '1859–1900' },
    type: 'informed', src: ['municipality', 'wikiLibrary', 'wbhc'], confidence: 'medium',
    ttl: { bn: 'লাইব্রেরি খুলল, দরজাও খুলল',
           en: 'The library opens, and so do the doors' },
    lede: {
      bn: 'জয়কৃষ্ণ পাবলিক লাইব্রেরি খোলে ১৮৫৯ সালে, আর উত্তরপাড়ায় লোক আসতে শুরু করে — শিক্ষক, লেখক, সংস্কারক, প্রশাসক, ইংরেজ অতিথি। তাঁদের নাম পাতার অন্য অংশে আছে; এখানে প্রশ্নটা আলাদা — তাঁরা এলে টেবিলে কী উঠত?',
      en: 'The Jaykrishna Public Library opened in 1859 and people started coming to Uttarpara — teachers, writers, reformers, administrators, English visitors. The other half of this page has their names. The question here is a different one: when they came, what went on the table?',
    },
    body: {
      bn: 'লাইব্রেরির উনিশ শতকের দুপুরের মেনু কারও কাছে নেই, আমাদের কাছেও না। তবে সেই সময়ের সচ্ছল বাঙালি বাড়ির আতিথেয়তা কেমন ছিল তা জানা যায় — তেতো বা শাক দিয়ে শুরু, তারপর ডাল, তরকারি, মাছের ঝোল, উপলক্ষ বুঝে কালিয়া, শেষে চাটনি, দই, মিষ্টি; বিশেষ দিনে লুচি আর পোলাও। আহারের এই ক্রমই তখনকার মধ্যবিত্ত গৃহস্থে একরকম সামাজিক ভাষা হয়ে উঠেছিল। জয়কৃষ্ণ মুখোপাধ্যায় বা বিদ্যাসাগর উত্তরপাড়ায় এসে ঠিক কী খেয়েছিলেন, তেমন কোনও নির্ভরযোগ্য দলিল নেই বলে তা এখানে লেখা হয়নি — ইতিহাসের প্রতি সম্মান কখনও কখনও ‘জানি না’ বলতে জানার মধ্যেই থাকে।',
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
    cap: { bn: 'বারান্দার টেবিলে চা, পাউরুটি আর কাটলেট, আর কেউ কাগজটা যেখানে রেখে গেছে।',
           en: 'Tea, bread and cutlets on a verandah table, and the newspaper where somebody left it.' },
    era:   { bn: '১৯০০–১৯৪৭', en: '1900–1947' },
    type: 'documented', src: ['sahapedia'], confidence: 'high',
    ttl: { bn: 'বাংলা কোনও পদ ধার করেনি — তর্ক করে নিজের করে নিয়েছে',
           en: 'Bengal never merely borrowed a dish. It argued with it until it turned Bengali' },
    lede: {
      bn: 'চা, পাউরুটি, বিস্কুট, কেক, পুডিং, কাটলেট — উনিশ শতকের শেষ আর বিশ শতকের গোড়ায় এসব শহুরে বাঙালি জীবনে ঢুকে পড়ল। পাউরুটি আর বিস্কুট নিয়ে তখন রীতিমতো তর্ক চলত — কারও কাছে অগ্রগতি, কারও কাছে জাত খোয়ানো।',
      en: 'Tea, bread, biscuits, cake, pudding, cutlets — these came into urban Bengali life in the late nineteenth and early twentieth centuries. Bread and biscuits were argued over: progress to some, a caste transgression to others.',
    },
    body: {
      bn: 'কিন্তু নকল হয়নি কিছুই। ইউরোপীয় কাটলেটের বড় মাংসের টুকরো ছোট হতে হতে দাঁড়াল বাঙালি চপ। omelette মুখে মুখে হয়ে গেল ‘মামলেট’, tea হল চা, pão হল পাউরুটি। সরষে, কাঁচালঙ্কা, আদা আর নদীর মাছ ঢুকে পড়ল ইউরোপীয় কায়দার ভিতরে — আর পদগুলো তখন থেকেই আর ইউরোপীয় রইল না।',
      en: 'None of it was copied. The European cutlet’s big pieces of meat got smaller and smaller until they were a Bengali chop. Omelette became mamlet in Bengali mouths. Tea became cha and pão became pauruti. Mustard, green chilli, ginger and river fish went inside the European method, and the dishes stopped being European.',
    },
  },

  {
    id: 'today',
    img: 'today-market',
    cap: { bn: 'সকালের মাছবাজার — সারি সারি ইলিশ, চিংড়ির স্তূপ, বরফ আর ভেজা মেঝে।',
           en: 'The morning market: hilsa in rows, a heap of prawns, ice, and a wet floor.' },
    era:   { bn: 'আজ', en: 'Today' },
    type: 'documented', src: ['hilsaHooghly', 'hooghlyFish', 'wikiTown'], confidence: 'high',
    ttl: { bn: 'তিনশো বছর পরেও নদীটা দুপুরের পাতে',
           en: 'Three centuries on, the river is still part of lunch' },
    lede: {
      bn: 'ইলিশের প্রধান ভারতীয় আঁতুড়ঘর মূলত গঙ্গা-ভাগীরথী-হুগলির এই অংশ — এটা গবেষণাপত্রের কথা, আমাদের নয়। হুগলি জেলার বাজারে রুই, মৃগেল, ইলিশ, কই, পাবদা রোজকার মাছ। উত্তরপাড়ার নিজের মাছবাজার রাজেন্দ্র অ্যাভিনিউতে।',
      en: 'The main Indian home of hilsa is this stretch of the Ganga–Bhagirathi–Hooghly system — that is from the research, not from us. Rohu, mrigel, hilsa, koi and pabda are everyday fish in Hooghly district markets. Uttarpara’s own fish market is on Rajendra Avenue.',
    },
    body: {
      bn: 'কোন বাজারের ইলিশ সবচেয়ে ভালো, সেটা তথ্য নয়, মত। উত্তরপাড়ায় সেই মত জিজ্ঞেস করলে ঠিকানা মিলবে, সঙ্গে বিনামূল্যে একটা তর্কও।',
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
  },

  {
    id: 'manjula',
    img: 'manjula-collage',
    cap: { bn: 'কার্ডের কুড়িটা পদ, কুড়িটাই।',
           en: 'The twenty dishes on the card, all twenty of them.' },
    era:   { bn: '২০২৬ ও তারপর', en: '2026 and beyond' },
    type: 'interpretive', src: [], confidence: 'high',
    ttl: { bn: 'এবার নিজেদের একটু ইতিহাস গড়ার পালা',
           en: 'Here to make a little history of our own' },
    lede: {
      bn: 'তিনশো বছর ধরে এখানকার খাওয়া বদলেছে যখনই নতুন লোক, নতুন জিনিস আর নতুন ভাবনা এসেছে — নদী দিয়ে, সড়ক দিয়ে, রেল দিয়ে। এতক্ষণ যা পড়লেন, তা অন্যদের গড়ে তোলা ইতিহাস। এই অধ্যায় এখনও লেখা হয়নি।',
      en: 'For three hundred years the food here has changed whenever new people, new ingredients and new ideas arrived — by river, by road, by rail. Everything above this was built by other people. This chapter has not been written yet.',
    },
    body: {
      bn: 'মঞ্জুলা বাইট অ্যান্ড ব্রু ২০২৬ সালে খুলেছে, ১৭/এ ব্যানার্জি পাড়া স্ট্রিটে — উত্তরপাড়া গার্লস হাই স্কুলের সঙ্গে একই ওয়ার্ডে। এক কামরার দোকান, চালান দুই বোন। উদ্বোধনের দিন চা আর কফি ছিল বিনা পয়সায়, শুধু সেই একদিনই। রোজ সকাল ন’টায় স্টিমার বসে, নামে রাত ন’টায়। ছুটির ঘণ্টা পড়লে কাউন্টারে যে ভিড় হয়, সেটাই দিনের সবচেয়ে ব্যস্ত মিনিট।',
      en: 'Manjula Bite & Brew opened in 2026 at 17/A Banerjee Para Street, in the same municipal ward as the Uttarpara Girls’ High School. One room, run by two sisters. On the opening day the tea and the coffee were free, and on that day only. The steamer goes on at nine in the morning and comes off at nine at night. The rush when the school bell goes is the busiest minute of the day.',
    },
    plate: {
      label: { bn: 'কার্ডে যা আছে, আজ', en: 'What is on the card, today' },
      items: {
        bn: ['পাঁচ রকম মোমো', 'স্টু পাউরুটি', 'চার রকম টোস্ট', 'চার রকম ডিম', 'চার রকম ম্যাগি', 'চর্বি ঘুগনি', 'চা ও কফি'],
        en: ['Five kinds of momo', 'Bread and chicken stew', 'Four toasts', 'Four eggs', 'Four maggis', 'Mutton fat ghugni', 'Tea and coffee'],
      },
    },
    kicker: {
      bn: 'গঙ্গার পলিমাটির উনুন থেকে আজকের মোমোর ভাপ—মাঝখানে বয়ে গেছে তিনশো বছরের উত্তরপাড়া।',
      en: 'The town has been cooking for three hundred years. We have only just lit the stove.',
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
