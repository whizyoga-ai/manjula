/* ==========================================================================
   The seven dish stories, as data.

   These used to be seven hand-written <article> blocks inside one very long
   origins page. They live here now because the site is paginated: the same
   content renders as a card on origins.html and as a full page on
   dish.html?d=<slug>, and neither should be able to drift from the other.

   TWO KINDS OF WRITING, AND THE PAGE LABELS WHICH IS WHICH.
     `route`   — sourced history. Every line is traceable to docs/SOURCES.md.
     `kitchen` — the shop's own account of how it cooks. This used to be an
                 argument about pricing: which rung of the ladder a dish sat
                 on, why the sum on the card was split, what the plate count
                 implied. All true, all correct, and unreadable — a page about
                 food that talked about arithmetic. It is about the cooking
                 now: what the dish asks of a pair of hands, what had to
                 change to make it belong here rather than where it came from,
                 and what goes wrong when it goes wrong.

                 THE LINE THIS COPY DOES NOT CROSS. Nobody has interviewed the
                 two women who run this kitchen. So there is no childhood in
                 here, no hardship anybody described to me, no scene I was not
                 in. What is here is true of the work itself — the pleat, the
                 steam, the fat, the twenty seconds a poach gives you — which
                 is knowable, and which is the part worth reading anyway. An
                 invented struggle would be worse than a dull paragraph.

   `clip` names a six-second loop of the dish being made, generated locally on
   the RTX 5090 with CogVideoX from a food-only crop of the real dish — no face
   went in, so no face can come out. Only dish.html plays it, lazily, and only
   the dishes that are actually cooked have one: ghugni is a slate dish nobody
   filmed, and the egg shelf is four treatments rather than one thing.

   `art` names a <symbol> in the sprite that dish.html and origins.html both
   inline. The drawings are original because there is no photograph of a
   fourteenth-century Lhasa dumpling, and stock food photography of somebody
   else's momo would be the same small lie the rest of this site avoids.
   ========================================================================== */

'use strict';

const DISHES = [
  {
    slug: 'momo',
    covers: ['chsteam', 'chfried', 'mtsteam', 'mtfried', 'chmtmomo'],
    clip: 'momo-steam',
    art: 'd-momo',
    tone: 'ink',
    price: '₹50 – ₹100',
    priceNote: { bn: 'ভাপের প্লেটে ৫ পিস', en: '5 pieces to a steamed plate' },
    name: { bn: 'মোমো', en: 'Momo' },
    sub: {
      bn: 'লাসা থেকে ব্যানার্জি পাড়া — প্রায় ছ’শো বছর',
      en: 'Lhasa to Banerjee Para, in about six hundred years',
    },
    lede: {
      bn: 'পৃথিবীর সবচেয়ে বেশি পথ হেঁটে আসা খাবারগুলোর একটা। পাহাড়ের রাখাল, সন্ন্যাসী আর বণিকদের কথা ভেবেই তৈরি — এক হাতে ধরা যায়, ঠান্ডায় নষ্ট হয় না, আর ভিতরে গোটা একটা খাবার মুড়ে রাখা।',
      en: 'One of the most travelled foods on earth. It was built for herders, monks and traders crossing hard country — something you can hold in one hand, that survives the cold, and that has an entire meal folded inside it.',
    },
    route: [
      { when: '14–15c', where: { bn: 'তিব্বত', en: 'Tibet' },
        what: { bn: 'হিমালয় পেরোনো মানুষের বহনযোগ্য খাবার হিসেবে মোমোর জন্ম।',
                en: 'Born as portable food for people crossing the Himalaya.' } },
      { when: '17c', where: { bn: 'কাঠমান্ডু', en: 'Kathmandu' },
        what: { bn: 'লাসার সঙ্গে বাণিজ্যপথ ধরে নেপালে পৌঁছয়, আর সেখানকার মশলার সঙ্গে মেশে।',
                en: 'Carried down the Lhasa trade route into Nepal, where it met local spicing.' } },
      { when: '1835+', where: { bn: 'দার্জিলিং, কালিম্পং', en: 'Darjeeling, Kalimpong' },
        what: { bn: 'গোর্খা সৈনিক আর নেপালি-ভাষী বসতিকারীরা নিয়ে আসেন; তিব্বতি বণিকেরা খচ্চরের সারিতে চাপিয়ে আনেন।',
                en: 'Brought by Gorkha soldiers and Nepali-speaking settlers, and carried in by Tibetan traders on mule caravans.' } },
      { when: '1959', where: { bn: 'শরণার্থীর ঢল', en: 'The refugee wave' },
        what: { bn: 'লাসার পতনের পর তিব্বতি শরণার্থীরা দলে দলে ভারতে আসেন। মোমো আর পাহাড়ে আটকে থাকে না।',
                en: 'After Lhasa fell, Tibetan refugees came into India in numbers. The momo stopped being a hill food.' } },
      { when: '1960s–70s', where: { bn: 'উত্তরবঙ্গ, কলকাতা', en: 'North Bengal, then Kolkata' },
        what: { bn: 'শহরের রাস্তার খাবার হয়ে ওঠে — আর তারপর হুগলির প্রতিটা পাড়ার।',
                en: 'It became a city street food, and then a food of every neighbourhood in Hooghly.' } },
    ],
    chips: [
      { bn: 'ভাপে', en: 'Steamed' }, { bn: 'ভাজা', en: 'Fried' },
      { bn: 'চিকেন', en: 'Chicken' }, { bn: 'মাটন', en: 'Mutton' },
      { bn: 'সঙ্গে স্যুপ', en: 'Soup on the side' },
    ],
    kitchen: [
      { bn: 'মোমো গড়া হাতের কাজ, আর হাতটা শিখতে সময় লাগে। এক টুকরো লেচি, পাতলা করে বেলা, মাঝখানে পুর, তারপর আঙুলের ডগায় কুঁচি — একটার পর একটা, গোল হয়ে এসে মুখটা বন্ধ। কুঁচি কম পড়লে ভাপে ফেটে যায়, বেশি পড়লে মুখের কাছটা শক্ত। দিনে কয়েকশো। প্রথম দিকে আঙুল ব্যথা করে; পরে আর করে না, কিন্তু কুঁচি গোনা বন্ধ হয় না।',
        en: 'A momo is made by hand, and the hand takes time to learn. A ball of dough rolled thin, filling in the middle, then the pleat — thumb and forefinger, one fold after another, walking round until the top closes. Too few pleats and it splits in the steam. Too many and the crown goes tough. Several hundred in a day. Early on the fingers ache; later they stop aching, but nobody stops counting the folds.' },
      { bn: 'লাসার মোমোয় পুর সাদামাটা — মাংস, একটু পেঁয়াজ, নুন। উত্তরপাড়ায় ওটুকুতে চলে না। এখানকার জিভ চায় আরও পেঁয়াজ, আদা-রসুন, ধনেপাতা, আর ঝাল যেন টের পাওয়া যায়। তাই পুর বদলেছে — পাহাড়ের রান্নাটা ধরে রেখে, মশলাটা এই রাস্তার মাপে গড়া। সঙ্গের লঙ্কা-রসুনের চাটনিও পাহাড়ের নয়; ওটা এই দোকানের।',
        en: 'A Lhasa momo is plain inside: meat, a little onion, salt. That does not carry in Uttarpara. The palate here wants more onion, ginger and garlic, coriander through it, and enough chilli that you notice. So the filling changed — the hill dish kept, the seasoning rebuilt to the measure of the street it is sold on. The chilli-garlic chutney beside it is not a hill thing either. That one belongs to this shop.' },
      { bn: 'তারপর ভাপ। ঢাকনা তোলার সময় মুখ ঘুরিয়ে নিতে হয়, নইলে গরম বাষ্প সোজা চোখে। ঢাকনা ওঠে ঠিক যতক্ষণ দরকার, তার এক সেকেন্ড বেশি নয় — এক সেকেন্ড বেশি মানে নেতিয়ে যাওয়া মোমো। রান্নাটা মশলায় নয়, ওই সেকেন্ডটায়।',
        en: 'Then the steam. You turn your face away as the lid comes off or it goes straight into your eyes. The lid comes up for exactly as long as it needs and not a second longer, because a second longer is a slack, wet momo. The cooking is not in the spice. It is in that second.' },
    ],
  },

  {
    slug: 'stew',
    covers: ['stew'],
    clip: 'stew',
    art: 'd-stew',
    tone: 'paper',
    price: '₹60',
    priceNote: { bn: 'পাউরুটি ১০ · স্টু ৫০', en: 'bread 10 · stew 50' },
    name: { bn: 'স্টু পাউরুটি', en: 'Bread & chicken stew' },
    sub: { bn: 'কলকাতার কেবিন থেকে সোজা', en: 'Straight out of a Calcutta cabin' },
    lede: {
      bn: 'মেনুর সবচেয়ে কলকাতার পদ। অথচ জন্ম ইউরোপে। ব্রিটিশ আমলে অ্যাংলো-ইন্ডিয়ান হেঁশেলে ইউরোপের স্টু রাঁধার ধরনটা মিশল ভারতীয় মশলার সঙ্গে — আর যা দাঁড়াল, সেটা আর কোনওটাই রইল না। মাখন-ক্রিম সরে গিয়ে এল হালকা ঝোল, তাতে গোলমরিচ, তেজপাতা, লবঙ্গ।',
      en: 'The most Calcutta thing on Manjula’s menu, and it was born in Europe. In Anglo-Indian kitchens under the British, the European method of stewing met Indian aromatics and became neither — the butter and cream gave way to a light broth carrying peppercorn, bay leaf and clove.',
    },
    route: [
      { when: 'Colonial', where: { bn: 'ব্রিটিশ হেঁশেল', en: 'The British kitchen' },
        what: { bn: 'স্টু তখন সাধারণ ব্রিটিশ খাবার — ধীরে সেদ্ধ মাংস, সঙ্গে রুটি।',
                en: 'Stew was ordinary British cooking: meat cooked slow, eaten with bread.' } },
      { when: '19c', where: { bn: 'অ্যাংলো-ইন্ডিয়ান রান্নাঘর', en: 'Anglo-Indian kitchens' },
        what: { bn: 'ক্রিম আর মাখন সরে গিয়ে এল মশলাদার হালকা ঝোল — পেটে সইবে, শরীর জুড়োবে।',
                en: 'Cream and butter out, a light spiced broth in — food meant to be easy to digest.' } },
      { when: '1900s', where: { bn: 'কেবিন', en: 'The cabins' },
        what: { bn: 'কলকাতার ‘কেবিন’ — পর্দা টানা কাঠের খোপ, যাতে মেয়েরা পরিবারের সঙ্গে বাইরে খেতে পারেন। সেখান থেকেই স্টু হয়ে ওঠে শহরের খাবার।',
                en: 'Calcutta’s cabins — curtained plywood booths built so women could eat out with their families away from public view. The stew became a city dish there.' } },
      { when: 'Now', where: { bn: 'উত্তরপাড়া', en: 'Uttarpara' },
        what: { bn: 'কেবিনের পর্দা নেই, কাঠের খোপ নেই — আছে ফুটপাথে বেগুনি টুল। খাবারটা একই।',
                en: 'No curtain, no booth — a purple stool on the pavement instead. The dish is the same one.' } },
    ],
    chips: [
      { bn: 'গোলমরিচ', en: 'Peppercorn' }, { bn: 'তেজপাতা', en: 'Bay leaf' },
      { bn: 'লবঙ্গ', en: 'Clove' }, { bn: 'হালকা ঝোল', en: 'Light broth' },
    ],
    kitchen: [
      { bn: 'স্টুয়ের গোড়া ব্রিটিশ হেঁশেলে — ঘন, মাখন-ক্রিম দেওয়া, ছুরি-কাঁটায় বসে খাওয়ার জিনিস। এখানে সেটা চলে না। এখানে স্টু খাওয়া হয় দাঁড়িয়ে, হাতে বাটি, পাউরুটি ডুবিয়ে। তাই ঝোল রাখা হয় পাতলা — ঘন হলে পাউরুটি চুপসে হাতেই ভেঙে পড়ে। পাতলা রাখলে পাউরুটি ঝোল টানে, অথচ আকারটা ধরে রাখে। ওই সরু সীমানার উপর দাঁড়িয়ে থাকাটাই পুরো কাজ।',
        en: 'The stew starts in a British kitchen — thick, buttered, creamed, eaten sitting down with a knife and fork. That is no use here. Here it is eaten standing up, bowl in one hand, bread going in and out of it. So the broth is kept thin. Thicken it and the bread collapses in your fingers. Keep it thin and the bread drinks and still holds its shape. The whole job is standing on that line.' },
      { bn: 'মশলাও সরেছে। অ্যাংলো-ইন্ডিয়ান স্টু মৃদু, প্রায় পথ্য — অসুস্থ মানুষের খাবার। উত্তরপাড়ার সন্ধেবেলায় সেটা পানসে ঠেকে। তাই গোলমরিচ বেড়েছে, তেজপাতা আর লবঙ্গ বেশিক্ষণ ফোটে, আর আলুটা নামে ঠিক সেই সময়ে যখন সে ভাঙে কিন্তু গলে না। ঝোল এখনও হালকা, কিন্তু আর নিরীহ নয়।',
        en: 'The seasoning moved too. An Anglo-Indian stew is mild almost to the point of being medicine — it was food for the unwell. On an Uttarpara evening that reads as flat. So the peppercorn goes up, the bay leaf and clove sit in the pot longer, and the potato comes out at the point where it breaks but has not gone to mush. The broth is still light. It is no longer polite.' },
      { bn: 'পাউরুটি সেঁকা হয় আলাদা, তাওয়ায়, দুই পিঠ। কিনারা পুড়ে কালো, মাঝখানটা নরম — ওই পোড়া ধারটাই ঝোলের মিষ্টিভাব কাটে। বাটির গায়ে হেলান দিয়ে বসানো হয়, যাতে নীচের দিকটা ভেজে আর উপরের দিকটা মুচমুচে থাকে। কেউ শিখিয়ে দেয়নি, দোকান নিজেই শিখেছে।',
        en: 'The bread is griddled separately, both sides, on a hot tawa. Black at the edges, soft in the middle — the burnt rim is what cuts the sweetness in the broth. It goes on the bowl leaning against the rim so the underside soaks and the top stays crisp. Nobody taught that. The shop worked it out.' },
    ],
  },

  {
    slug: 'toast',
    covers: ['malai', 'butter', 'eggtoast'],
    clip: 'toast',
    art: 'd-pauruti',
    tone: 'warm',
    price: '₹20 – ₹30',
    priceNote: { bn: 'মাখন · ডিম · মালাই', en: 'butter · egg · malai' },
    name: { bn: 'পাউরুটি ও টোস্ট', en: 'Pauruti, and toast' },
    sub: { bn: 'একটা শব্দ, যার অর্ধেক পর্তুগিজ', en: 'A word that is half Portuguese' },
    lede: {
      bn: 'বাংলার সবচেয়ে সুন্দর শব্দগুলোর একটা — কারণ ইতিহাসটা শব্দের ভিতরেই রয়ে গেছে। <strong>পাউরুটি</strong> = পর্তুগিজ <i>pão</i> + বাংলা <i>রুটি</i>। দুই ভাষার দুটো শব্দ, মানে একই, জুড়ে গিয়ে বোঝাতে শুরু করল তৃতীয় একটা জিনিস — যে রুটি চ্যাপ্টা নয়, ফুলে ওঠে।',
      en: 'One of the loveliest words in Bengali, because the history is inside the word itself. <strong>পাউরুটি</strong> = Portuguese <i>pão</i> (bread) + Bengali <i>ruti</i> (bread). Two words from two languages, both meaning the same thing, welded together to name a third — the bread that rises, as opposed to the flatbread that does not.',
    },
    route: [
      { when: '16–17c', where: { bn: 'পর্তুগিজ বাংলা', en: 'Portuguese Bengal' },
        what: { bn: 'কলকাতা ও তার আশপাশে পর্তুগিজ জনগোষ্ঠী থিতু হয় — সঙ্গে আসে খামিরের রুটি, আর <i>pão</i> শব্দটা।',
                en: 'A Portuguese community settled in and around Calcutta, bringing leavened bread — and the word <i>pão</i>.' } },
      { when: '—', where: { bn: 'শব্দটা জোড়া লাগে', en: 'The word fuses' },
        what: { bn: 'বাংলা <i>রুটি</i>-র সঙ্গে জুড়ে হয় <i>পাউরুটি</i>, আর তা আলাদা করে বোঝাতে থাকে পাউরুটির লোফ-কে।',
                en: 'It joins Bengali <i>ruti</i> to make <i>pauruti</i>, which comes to mean specifically the loaf.' } },
      { when: '1960s–70s', where: { bn: 'বাঙালি বাড়ি', en: 'The Bengali household' },
        what: { bn: 'এক পোয়া পাউরুটি আর এক কাপ চা — মধ্যবিত্ত বাড়ির সবচেয়ে চেনা জোড়।',
                en: 'A quarter-pound of pauruti and a cup of tea: as ordinary a pairing as a middle-class household had.' } },
    ],
    chips: [],
    kitchen: [
      { bn: 'মালাই টোস্টের মালাই কেনা যায় না, জমাতে হয়। দুধ ফুটিয়ে ঠান্ডা হতে দিলে উপরে যে সর পড়ে, সেটা তুলে রাখা — রোজ একটু একটু করে। তাড়াহুড়োয় হয় না; ফুটন্ত দুধ থেকে তুললে ওটা সর নয়, ছেঁড়া চামড়া। তাই কাজটা শুরু হয় দোকান খোলার আগে, আর শেষ হয় পরের দিনের জন্য কিছু সরিয়ে রেখে।',
        en: 'The malai on a malai toast cannot be bought. It has to be collected. Milk boiled and then left alone; the skin that forms as it cools is lifted off and kept, a little each day. It will not be hurried — take it off milk that is still boiling and what you have is torn skin, not cream. So the work starts before the shutter goes up, and ends by putting something aside for tomorrow.' },
      { bn: 'মাখন পাউরুটি শুনতে সবচেয়ে সহজ, বানাতে সবচেয়ে কঠিন। দুটো উপকরণ, লুকোনোর জায়গা নেই। তাওয়া বেশি গরম হলে মাখন ধরে গিয়ে তেতো লাগে; কম গরম হলে পাউরুটি তেল টেনে ভারী হয়ে যায়। ঠিক তাপটা ঘড়ি দেখে হয় না, শব্দ শুনে হয় — মাখন পড়ার সময়ের ওই চড়চড় আওয়াজ। ওটা ঠিক হলে বাকিটা ঠিক।',
        en: 'Butter toast sounds like the easy one and is the hardest thing on the shelf. Two ingredients and nowhere to hide. Too hot and the butter catches and turns bitter; too cool and the bread drinks the fat and goes heavy. The right heat is not read off a clock, it is heard — the particular hiss when the butter goes down. Get that sound right and the rest follows.' },
      { bn: 'ডিম পাউরুটির কুসুম ভাঙা হয় একেবারে শেষে, প্লেটে যাওয়ার ঠিক আগে। আগে ভাঙলে পাউরুটি ভিজে যায়, আর কামড়ে সেই টানটা আর পাওয়া যায় না। এই চারটে টোস্টই আসলে একটা জিনিস নিয়ে — কখন নামাতে হবে।',
        en: 'On an egg toast the yolk is broken at the last moment, just before it goes out. Break it earlier and the bread is wet by the time it reaches anybody, and the pull has gone out of the bite. All four toasts on this card are really about one thing: knowing when to take it off.' },
    ],
  },

  {
    slug: 'egg',
    covers: ['boiled', 'poach', 'omlet', 'cheeseomlet'],
    art: 'd-egg',
    still: 'omlet',
    tone: 'ink',
    price: '₹12 – ₹30',
    priceNote: { bn: 'সেদ্ধ · পোচ · ওমলেট · চীজ ওমলেট', en: 'boiled · poach · omlet · cheese omlet' },
    name: { bn: 'ডিম', en: 'Eggs' },
    sub: {
      bn: 'বারো টাকা থেকে তিরিশ — একটাই জিনিস, চারটে চেহারা',
      en: 'Twelve rupees to thirty — one ingredient, four answers',
    },
    lede: {
      bn: 'ডিমের আবার উৎসের গল্প কী — ওটা তো সব রাস্তার খাবারেরই মেরুদণ্ড। বরং <em>নামগুলো</em> খেয়াল করার মতো। ‘পোচ’ আর ‘ওমলেট’ ইংরেজি থেকে এসে দিব্যি বাংলা শব্দ হয়ে বসে আছে — ঠিক যেমন পাউরুটি এসেছিল পর্তুগিজ থেকে।',
      en: 'The egg needs no origin story; it is the spine of every street food anywhere. What is worth noticing is the <em>names</em>. “Poach” and “omlet” walked out of English and settled down as Bengali words, exactly the way <i>pauruti</i> came in from Portuguese.',
    },
    route: [],
    chips: [],
    kitchen: [
      { bn: 'বাংলার রাস্তার ওমলেট ফরাসি ওমলেট নয়, আর হওয়ার চেষ্টাও করে না। ফরাসিটা ফ্যাকাশে, নরম, ভাঁজে মসৃণ। এটার কিনারা খয়েরি, ফিতের মতো ফুলে ওঠা, ভিতরে পেঁয়াজ-কাঁচালঙ্কা-ধনেপাতা কুচি। তেল ধোঁয়া ওঠা অবস্থায় ডিম পড়ে — ওই ধাক্কাটাই কিনারাটা বানায়। ধীরে রাঁধলে ওটা আর এই পদ থাকে না।',
        en: 'A Bengali street omelette is not a French omelette and is not trying to be. The French one is pale, soft, folded smooth. This one has a brown lacy edge, and onion, green chilli and coriander chopped through it. The egg goes into oil that is already smoking, and it is that shock which makes the edge. Cook it gently and it stops being this dish.' },
      { bn: 'পোচ আরও নিষ্ঠুর, কারণ সেখানে ভুল লুকোনোর জায়গা নেই। কুসুম গড়াতে হবে, অথচ সাদাটা কাঁচা থাকলে চলবে না। জানলাটা সেকেন্ড কুড়ির। এক দিকে বেশি গেলে সাদাটা লালচে, অন্য দিকে গেলে কুসুম জমাট — আর দুটোই চামচে থাকতেই বোঝা যায়। বোঝা গেলে ওটা আর প্লেটে যায় না।',
        en: 'A poach is crueller, because there is nowhere to put the mistake. The yolk has to run and the white cannot be raw. The window is about twenty seconds. Miss it one way and the white browns; miss it the other and the yolk sets — and either way you can see it on the spoon before it reaches the plate. When you can see it, it does not go out.' },
      { bn: 'চীজ ওমলেটে চীজ পড়ে ভাঁজ করার ঠিক আগের মুহূর্তে, যাতে ভিতরে গলে, বেরিয়ে এসে কড়াইয়ে পুড়ে না যায়। ডিম শস্তা বলে যত্ন কম লাগে — এই ভুলটা এই তাকের চারটে পদই ধরিয়ে দেয়।',
        en: 'On a cheese omelette the cheese goes on in the last moment before the fold, so it melts inside instead of leaking out and burning on the pan. Eggs are cheap, so people assume they are forgiving. All four things on this shelf will correct you.' },
    ],
  },

  {
    slug: 'maggi',
    covers: ['plainmag', 'eggmag', 'cheesemag', 'eggcheesemag'],
    clip: 'maggi',
    art: 'd-maggi',
    tone: 'paper',
    price: '₹30 – ₹50',
    priceNote: { bn: 'প্লেন · ডিম · চীজ · দুটোই', en: 'plain · egg · cheese · both' },
    name: { bn: 'ম্যাগি', en: 'Maggie' },
    sub: {
      bn: '১৯৮৩ সালে ভারতে নামা একটা সম্পূর্ণ অচেনা খাবার',
      en: 'A completely foreign food that landed in 1983',
    },
    lede: {
      bn: 'মেনুর সবচেয়ে নতুন পদ। আর সবচেয়ে অপ্রত্যাশিত সাফল্যও। ১৯৮৩-তে নেসলে যখন ভারতে ম্যাগি আনল, দেশের অর্থনীতি তখনও বন্ধ — উদারীকরণ আসতে আরও আট বছর বাকি। আর ভারতীয় হেঁশেলে নুডলস বলে কোনও ধারণাই ছিল না।',
      en: 'The newest thing on the menu and the least likely success on it. When Nestlé brought Maggi to India in 1983, this was a closed economy — liberalisation was still eight years away — and noodles were not a thing Indian households ate at all.',
    },
    route: [
      { when: '1983', where: { bn: 'ভারতে আসে', en: 'It lands' },
        what: { bn: 'মশলা, টম্যাটো আর চিকেন — এই তিন স্বাদে শুরু। বিজ্ঞাপনের কথা ছিল “fast to cook, good to eat”।',
                en: 'Launched in masala, tomato and chicken. The line was “fast to cook, good to eat”.' } },
      { when: 'Then', where: { bn: 'লক্ষ্য বদলায়', en: 'The aim shifts' },
        what: { bn: 'প্রথমে ভাবা হয়েছিল কর্মরত মহিলাদের কথা। কিন্তু দেখা গেল স্বাদটা বাচ্চাদের ভালো লাগছে — আর তখনই জিনিসটা ধরে যায়।',
                en: 'It was aimed at working women. Children turned out to like the taste, and that is when it caught.' } },
      { when: 'Now', where: { bn: 'পাড়ার দোকান', en: 'The para shop' },
        what: { bn: 'চল্লিশ বছর পরে সেটা আর বিদেশি খাবার নয় — স্কুলের পাশের দোকানে যা পাওয়া যায়, তাই।',
                en: 'Forty years on it is not a foreign food. It is what you get at the shop beside the school.' } },
    ],
    chips: [
      { bn: 'প্লেন', en: 'Plain' }, { bn: 'ডিম', en: 'Egg' },
      { bn: 'চীজ', en: 'Cheese' }, { bn: 'দুটোই', en: 'Both' },
    ],
    kitchen: [
      { bn: 'প্যাকেটে লেখা দু’মিনিট। ওটা বাড়ির রান্নার হিসেব, দোকানের নয়। এখানে নুডলস আধসেদ্ধ অবস্থাতেই জল থেকে উঠে যায়, তারপর যায় গরম কড়াইয়ে — পেঁয়াজ, কাঁচালঙ্কা, একটু মশলা, আর শেষ জলটুকু টেনে নেওয়া। সেদ্ধ নুডলস আর রান্না করা নুডলসের তফাত ওখানেই। প্যাকেট মেনে করলে ওটা ম্যাগি; কড়াইয়ে গেলে ওটা এই পাড়ার ম্যাগি।',
        en: 'The packet says two minutes. That is for a kitchen at home, not a counter. Here the noodles come out of the water while they are still short of done and go into a hot pan — onion, green chilli, a little masala, and the last of the water pulled in. That is the whole difference between boiled noodles and cooked ones. Follow the packet and you have made Maggi. Take it to the pan and you have made the neighbourhood\'s.' },
      { bn: 'ডিমেরও নিজের সময় আছে। ডিম ভাজা হয় আলাদা, তারপর বসানো হয় নুডলসের উপর — মিশিয়ে দিলে কুসুম সসের মধ্যে হারিয়ে যায়। চীজ পড়ে একেবারে শেষে, আঁচ নিভিয়ে, কারণ জ্বলন্ত আঁচে চীজ পড়লে সেটা টানে না — ফেটে যায়, তেল ছাড়ে।',
        en: 'The egg has its own timing. It is fried separately and set on top, not stirred through — mix it in and the yolk disappears into the sauce. The cheese goes on last of all, off the flame, because cheese dropped onto live heat does not pull into strands. It splits and gives up its oil.' },
    ],
  },

  {
    slug: 'ghugni',
    covers: ['charbighugni'],
    art: 'd-ghugni',
    still: 'charbighugni',
    tone: 'warm',
    price: '₹50',
    priceNote: { bn: 'এখন কার্ডেই আছে', en: 'now on the card' },
    name: { bn: 'ঘুগনি', en: 'Ghugni' },
    sub: { bn: 'স্লেট থেকে কার্ডে', en: 'Off the slate, onto the card' },
    lede: {
      bn: 'পূর্ব ভারতের সবচেয়ে চেনা রাস্তার খাবার। শুকনো মটর, ধীরে সেদ্ধ, মশলার ঝোলে। বাংলা, ওড়িশা, বিহার, ঝাড়খণ্ড — প্রত্যেকের নিজের নিজের ঘুগনি। বিহারে হয় কালো ছোলায়, বাংলা আর ওড়িশায় সাদা মটরে।',
      en: 'The most familiar street food in eastern India — dried peas, cooked slow, in a spiced gravy. Bengal, Odisha, Bihar and Jharkhand each have their own (Bihar’s with black chana, Bengal’s and Odisha’s with white peas).',
    },
    route: [],
    chips: [],
    kitchen: [
      { bn: 'ঘুগনি বাংলার সবচেয়ে সাধারণ রাস্তার খাবার, আর প্রায় সর্বত্র নিরামিষ — শুকনো মটর, আলু, একটু মশলা। এখানে সেটা ঘুরিয়ে দেওয়া হয়েছে। মটর সারা রাত ভেজে, তারপর ধীরে সেদ্ধ হয়, আর একেবারে শেষে পড়ে খাসির চর্বি। ওই চর্বিটাই গোটা পদটাকে অন্য দিকে নিয়ে যায় — একই মটর, কিন্তু আরও গভীর, আরও মাংসল।',
        en: 'Ghugni is the most ordinary street food in Bengal and almost everywhere it is vegetarian: dried peas, potato, a little spice. Here it has been turned round. The peas soak overnight, cook slow, and mutton fat goes in at the end. That fat takes the whole dish somewhere else — the same peas, gone deeper and meatier.' },
      { bn: 'চর্বি সস্তা নয়, আর রোজ পাওয়াও যায় না। মাংসের দোকান থেকে যেদিন যেমন আসে। তাই ঘুগনি রোজ ঠিক একই রকম হয় না, একই পরিমাণেও হয় না। এটা দুর্বলতা নয় — যে রান্নার একটা উপকরণ বাজারের উপর দাঁড়িয়ে, সেই রান্না বাজারের সঙ্গেই ওঠে-নামে।',
        en: 'Fat is not cheap and it is not there every day. It comes from the butcher as and when it comes. So the ghugni is not identical every day, and there is not the same amount of it every day. That is not a failing. A dish with one ingredient that stands on the market moves with the market.' },
      { bn: 'প্রথম দিন এটা ছিল স্লেটের পদ — যেদিন রান্না হয়েছে সেদিন আছে, ফুরোলে নেই। এখন ছাপানো কার্ডে উঠে এসেছে। তবু ফুরোয়, আর ফুরোলে ফুরোয়। বেরোনোর আগে একটা ফোন কোনওদিন বৃথা যায় না।',
        en: 'On the first day it was a slate dish: there when it had been cooked, gone when it was gone. It is on the printed card now. It still runs out, and when it runs out it is out. A call before you set off is never wasted.' },
    ],
  },

  {
    slug: 'cha',
    covers: ['tea', 'coffee'],
    clip: 'chai',
    art: 'd-cha',
    tone: 'ink',
    price: '₹10 / ₹15',
    priceNote: { bn: 'চা / কফি', en: 'tea / coffee' },
    name: { bn: 'চা ও কফি', en: 'Tea, and coffee' },
    sub: { bn: 'দশ টাকা — নামের অর্ধেকটা', en: 'Ten rupees — and half the name' },
    lede: {
      bn: 'দোকানের নাম <em>Bite &amp; Brew</em>। ‘বাইট’ জুড়ে আছে মেনুর প্রায় গোটাটা, আর ‘ব্রু’-র ভাগে মোটে দুটো লাইন — চা ১০, কফি ১৫। তবু নামের অর্ধেকটা ওদেরই। ঠিকই আছে: পাড়ার দোকানে বেশির ভাগ লোক আসেন চায়ের টানে, বাকিটা তারপর।',
      en: 'The shop is called <em>Bite &amp; Brew</em>. The bite takes up most of the menu; the brew is two lines — tea 10, coffee 15. But it owns half the name, and rightly: most people come to a para shop for the tea, and order the rest afterwards.',
    },
    route: [],
    chips: [],
    kitchen: [
      { bn: 'দশ টাকার চায়ে কিছু লুকোনো যায় না। পাতা বেশি দিলে লোকসান, কম দিলে গরম জল। তাই মাপটা সারাদিন এক, আর মাপা হয় হাতে — চামচে নয়, আঙুলের চিমটিতে। কেটলি বসে সকাল ন’টায়, নামে রাত ন’টায়, আর মাঝের বারো ঘণ্টায় ওই চিমটিটা একবারও বদলায় না।',
        en: 'There is nothing to hide behind in a ten-rupee tea. Too much leaf and you lose money; too little and you have sold somebody hot water. So the measure stays the same all day, and it is measured by hand — a pinch, not a spoon. The kettle goes on at nine in the morning and comes off at nine at night, and across those twelve hours that pinch does not change.' },
      { bn: 'দুধ ফোটে আলাদা, আর ঢালা হয় উঁচু থেকে — ফেনাটা ওই ঢালা থেকেই আসে, কোনও যন্ত্র থেকে নয়। কাপের উপরে যে সরটা জমে, সেটা ফেলে দেওয়ার জিনিস নয়। ওটাই প্রমাণ যে দুধ সত্যিই ফুটেছে।',
        en: 'The milk is boiled separately and poured from a height — the froth comes from the pour, not from a machine. The skin that gathers on top of the cup is not something to skim off. It is the proof that the milk was actually boiled.' },
      { bn: 'কফির মেশিন কাউন্টারের পিছনেই আছে, আর সে কাজটা তাড়াতাড়ি করে দেয়। কিন্তু বেশির ভাগ লোক চা-ই চায়। উত্তরপাড়ায় সকাল কফি দিয়ে শুরু হয় না — এখানে সকাল শুরু হয় এক কাপ চায়ে, আর সেটা বদলানোর চেষ্টা করে লাভ নেই।',
        en: 'The coffee machine sits behind the counter and it does its job quickly. But most people want the tea. Uttarpara does not start its mornings on coffee — it starts them on a cup of cha, and there is no percentage in trying to change that.' },
    ],
  },
];
