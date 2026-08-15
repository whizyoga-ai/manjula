/* ==========================================================================
   Manjula Bite & Brew — the printed menu, as data.

   Every price here is read off the two laminated cards on the shop wall
   (menu-eng.jpeg / menu-bengali.jpeg, photographed 2026-08-14). Nothing is
   estimated and nothing is rounded. If a price is not on a card, it is not
   in this file — the site says "ask at the counter" instead of guessing.

   TWO ITEMS ARE NEWER THAN THE PHOTOGRAPHED CARDS: chicken mutton momo (90)
   and mutton fat ghugni (50), both added on the client's word. The card
   scans on the home page still show the older card, and the captions there
   say so — a photograph that contradicts the list beside it is worse than no
   photograph, so the moment a new card is photographed those files should be
   replaced and the captions dropped.

   ONE KNOWN CONFLICT: the English card prices cheese maggie at 40 and the
   Bengali card at 80. The English figure is used, and `verify: true` marks
   it so the next person to stand in front of the shop knows to check.
   Do not silently pick a side on any other item.

   The Bengali names are the shop's own wording off its own card — not a
   translation of the English. Where the shop writes "পাউরুটি" for what the
   English card calls "toast", the shop wins.
   ========================================================================== */

'use strict';

const MENU = [
  {
    id: 'toast',
    en: { name: 'Toast', note: 'The morning half of the shop.' },
    bn: { name: 'টোস্ট ও পাউরুটি', note: 'সকালটা এখান থেকেই শুরু।' },
    accent: 'ink',
    items: [
      {
        id: 'stew',
        en: 'Bread & chicken stew',
        bn: 'স্টু পাউরুটি',
        price: 60,
        priceLabel: '10 + 50',
        priceLabelBn: '১০ + ৫০',
        en_note: 'Bread ₹10, stew ₹50 — priced apart on the card, eaten together.',
        bn_note: 'কার্ডে আলাদা দুটো দাম, পাতে একটাই খাবার।',
        desc: {
          bn: 'হালকা ঝোলে মুরগি, আলু, গাজর আর মটরশুঁটি — সঙ্গে তাওয়ায় সেঁকা পাউরুটি, কিনারা পোড়া। ঝোলটা পাতলা রাখাই নিয়ম, নইলে পাউরুটি ডুবিয়ে তুলতেই ভেঙে যাবে। শীতের সন্ধেয় এটাই সবচেয়ে বেশি যায়।',
          en: 'Chicken, potato, carrot and peas in a thin broth, with bread griddled on the tawa and blackened at the edge. The broth is kept thin on purpose — thicken it and the bread falls apart on the way to your mouth. It moves fastest on a cold evening.',
        },
      },
      {
        id: 'malai', en: 'Malai toast', bn: 'মালাই টোস্ট', price: 30,
        desc: {
          bn: 'দুধ জ্বাল দিয়ে ঠান্ডা হতে দিলে উপরে যে সর পড়ে, সেটাই মালাই — রোজ একটু একটু করে জমানো। পাউরুটির উপর পুরু করে দেওয়া হয়, নীচে তাওয়ার আঁচ, উপরে ঠান্ডা সর। মিষ্টি নয়, কিন্তু মোলায়েম।',
          en: 'Milk boiled and left to cool throws a skin, and that skin is the malai — collected a little at a time, every day. It goes on thick, over bread warm off the griddle, so the top is cool and the underside is hot. Not sweet. Just very soft.',
        },
      },
      {
        id: 'butter', en: 'Butter toast', bn: 'মাখন পাউরুটি', price: 20,
        desc: {
          bn: 'দুটো জিনিস — পাউরুটি আর মাখন। লুকোনোর কিছু নেই, তাই এটাই সবচেয়ে শক্ত। তাওয়া বেশি গরম হলে মাখন ধরে গিয়ে তেতো, কম হলে পাউরুটি তেল টেনে ভারী। মেনুর সবচেয়ে সস্তা খাবারগুলোর একটা, আর সবচেয়ে বেশি বিক্রি হয় এটাই।',
          en: 'Two things: bread and butter. Nothing to hide behind, which makes it the hardest thing on the shelf — too hot and the butter catches and turns bitter, too cool and the bread drinks the fat and goes heavy. One of the cheapest things on the card and the one that sells most.',
        },
      },
      {
        id: 'eggtoast', en: 'Egg toast', bn: 'ডিম পাউরুটি', price: 25,
        desc: {
          bn: 'পাউরুটির উপর ডিম ভাজা, কুসুম নরম। কুসুমটা ভাঙা হয় একেবারে শেষে, প্লেটে যাওয়ার ঠিক আগে — আগে ভাঙলে পাউরুটি ভিজে গিয়ে কামড়ের টানটাই চলে যায়। উপরে গোলমরিচ।',
          en: 'An egg fried onto the bread, yolk left soft. It is broken at the last moment before the plate goes out — break it earlier and the bread is wet by the time it reaches you, and the bite has gone out of it. Black pepper over the top.',
        },
      },
    ],
  },
  {
    id: 'eggs',
    en: { name: 'Eggs', note: 'Four ways, none of them complicated.' },
    bn: { name: 'ডিম', note: 'চার রকম। জটিল কিছু নয়।' },
    accent: 'yolk',
    items: [
      {
        id: 'boiled', en: 'Boiled egg', bn: 'ডিম সেদ্ধ', price: 12,
        desc: {
          bn: 'সেদ্ধ ডিম, সঙ্গে নুন আর গোলমরিচ। মেনুর সবচেয়ে সস্তা খাবার — বারো টাকা। স্কুলের ছুটির পর যারা কাউন্টারে ভিড় করে, তাদের অনেকের হাতে ঠিক এইটুকুই থাকে।',
          en: 'A boiled egg, with salt and pepper. The cheapest thing on the card at twelve rupees — and for a lot of the crowd that arrives when the school bell goes, twelve rupees is exactly what is in their hand.',
        },
      },
      {
        id: 'poach', en: 'Poach', bn: 'পোচ', price: 15,
        desc: {
          bn: 'সাদাটা জমাট, কুসুম গলা — আর এই দুটোর মাঝের জানলা সেকেন্ড কুড়ির। এদিক-ওদিক হলে হয় সাদা লালচে, নয় কুসুম শক্ত, আর দুটোই চামচে থাকতেই ধরা পড়ে যায়।',
          en: 'White set, yolk running — and the window between those two states is about twenty seconds wide. Miss it one way and the white browns, the other and the yolk sets, and either way you can see it on the spoon before it gets to the plate.',
        },
      },
      {
        id: 'omlet', en: 'Omlet', bn: 'ওমলেট', price: 20,
        desc: {
          bn: 'বাংলার রাস্তার ওমলেট, ফরাসিটা নয়। ভিতরে পেঁয়াজ, কাঁচালঙ্কা আর ধনেপাতা কুচি; কিনারা খয়েরি আর ফিতের মতো। ধোঁয়া-ওঠা তেলে ডিম পড়ে বলেই ওই কিনারাটা হয়।',
          en: 'The Bengali street omelette, not the French one. Onion, green chilli and coriander chopped through it, and a brown lacy edge — which is what you get when the egg goes into oil that is already smoking.',
        },
      },
      {
        id: 'cheeseomlet', en: 'Cheese omlet', bn: 'চীজ ওমলেট', price: 30,
        desc: {
          bn: 'একই ওমলেট, ভাঁজ করার ঠিক আগের মুহূর্তে চীজ পড়ে — যাতে ভিতরে গলে, বেরিয়ে এসে কড়াইয়ে পুড়ে না যায়। কেটে ফেললে টান দেয়। ডিমের তাকে সবচেয়ে ভারী খাবার।',
          en: 'The same omelette, with cheese laid in at the last moment before the fold — so it melts inside instead of leaking out and burning on the pan. It pulls when you cut it. The heaviest thing on the egg shelf.',
        },
      },
    ],
  },
  {
    id: 'noodles',
    en: { name: 'Noodles', note: 'Maggie, the way a para shop makes it.' },
    bn: { name: 'নুডলস', note: 'ম্যাগি, পাড়ার দোকানের হাতে যেমন হয়।' },
    accent: 'leaf',
    items: [
      {
        id: 'plainmag', en: 'Plain maggie', bn: 'প্লেন ম্যাগি', price: 30,
        desc: {
          bn: 'প্যাকেটে লেখা দু’মিনিট, কিন্তু এখানে নুডলস আধসেদ্ধ অবস্থায় জল থেকে উঠে যায় আর বাকিটা হয় কড়াইয়ে — পেঁয়াজ, কাঁচালঙ্কা, শেষ জলটুকু টেনে নেওয়া। সেদ্ধ নুডলস আর রান্না করা নুডলসের তফাতটা ওখানেই।',
          en: 'The packet says two minutes. Here the noodles leave the water still short of done and finish in a hot pan — onion, green chilli, the last of the water pulled in. That is the whole difference between boiled noodles and cooked ones.',
        },
      },
      {
        id: 'eggmag', en: 'Egg maggie', bn: 'এগ ম্যাগি', price: 40,
        desc: {
          bn: 'প্লেন ম্যাগির উপর একটা ভাজা ডিম, আলাদা করে ভেজে বসানো। মিশিয়ে দিলে কুসুমটা সসের মধ্যে হারিয়ে যায়, তাই মেশানো হয় না — কুসুম ভাঙার কাজটা যে খাচ্ছে তার।',
          en: 'Plain maggie with a fried egg set on top, cooked separately rather than stirred through — mix it in and the yolk disappears into the sauce. Breaking it is left to whoever is eating.',
        },
      },
      {
        id: 'cheesemag', en: 'Cheese maggie', bn: 'চীজ ম্যাগি', price: 40, verify: true,
        desc: {
          bn: 'নুডলসের উপর গ্রেট করা চীজ, আঁচ নিভিয়ে দেওয়ার পর — জ্বলন্ত আঁচে পড়লে চীজ টানে না, ফেটে গিয়ে তেল ছাড়ে। এগ ম্যাগির সঙ্গে একই দাম, কারণ কোনটা ভালো সেটা রুচির কথা, দামের নয়।',
          en: 'Grated cheese over the noodles, added after the flame is off — dropped onto live heat it does not pull into strands, it splits and gives up its oil. Same price as egg maggie, because which one is better is a matter of taste and not of money.',
        },
      },
      {
        id: 'eggcheesemag', en: 'Egg cheese maggie', bn: 'এগ চীজ ম্যাগি', price: 50,
        desc: {
          bn: 'ডিম আর চীজ, দুটোই। কুসুম গলা চীজের মধ্যে গিয়ে মেশে — নুডলসের তাকের সবচেয়ে ভারী, আর সবচেয়ে অগোছালো খাবার। একজনের রাতের খাবার হয়ে যায়।',
          en: 'Both the egg and the cheese. The yolk runs into the melted cheese — the heaviest thing on the noodle shelf and comfortably the messiest. It will do as somebody\'s dinner.',
        },
      },
    ],
  },
  {
    id: 'momo',
    en: { name: 'Momo', note: 'Five to a plate, with the soup.' },
    bn: { name: 'মোমো', note: 'প্লেটে পাঁচটা। সঙ্গে স্যুপ।' },
    accent: 'chilli',
    // The 5-piece portion is not on the laminated card. It is chalked on the
    // shop's own slate — see assets/img/slate.jpg, where chicken momo reads
    // "৫০/- (৫ পিস)" and mutton "৯০/- (৫ পিস)". Two sources, one number.
    items: [
      {
        id: 'chsteam', en: 'Chicken steam momo', bn: 'চিকেন স্টিম মোমো', price: 50, pieces: 5,
        desc: {
          bn: 'প্লেটে পাঁচটা, সঙ্গে স্যুপ আর লঙ্কা-রসুনের চাটনি। হাতে গড়া, হাতে কুঁচি দেওয়া। ভাপে বসানোয় খোলসটা পাতলা আর স্বচ্ছ থাকে, তাই ভিতরের পুরটাই সামনে আসে। দোকানের সবচেয়ে বেশি বিক্রি হওয়া পদ।',
          en: 'Five to a plate, with the soup and the chilli-garlic chutney. Pleated by hand. Steaming keeps the skin thin and translucent, which puts the filling in front — this is the plate that leaves the counter most often.',
        },
      },
      {
        id: 'chfried', en: 'Chicken fried momo', bn: 'চিকেন ফ্রাইড মোমো', price: 60,
        desc: {
          bn: 'একই পুর, একই কুঁচি — কিন্তু ভাপের বদলে ভাজা। খোলসটা সোনালি, ফোসকা পড়া, মুচমুচে; কামড়ে খোলসটাই আগে টের পাওয়া যায়। স্টিম আর ফ্রাইড আসলে দুটো আলাদা খাবার, একই পুর থেকে।',
          en: 'The same filling and the same pleat, fried instead of steamed. The skin goes golden and blistered, and it is the skin you notice first. Steamed and fried are two different dishes made out of one filling.',
        },
      },
      {
        id: 'mtsteam', en: 'Mutton steam momo', bn: 'মাটন স্টিম মোমো', price: 90, pieces: 5,
        desc: {
          bn: 'খাসির কিমার পুর — চিকেনের চেয়ে গাঢ়, রসালো, আর ভারী। প্লেটে পাঁচটা, ভাপে। মাংসটাই দামের তফাতটা, আর কামড়েই বোঝা যায় কেন।',
          en: 'Minced mutton inside — darker, juicier and heavier than the chicken. Five to a plate, steamed. The meat is the whole of the price difference and you can tell on the first bite.',
        },
      },
      {
        id: 'mtfried', en: 'Mutton fried momo', bn: 'মাটন ফ্রাইড মোমো', price: 100,
        desc: {
          bn: 'খাসির মোমো, ভাজা। কার্ডের সবচেয়ে দামি পদ — একশো টাকা। বাইরে মুচমুচে, ভিতরে খাসির চর্বি গলে পুরটাকে ভিজিয়ে রাখে।',
          en: 'The mutton momo, fried. The most expensive thing on the card at a hundred rupees. Crisp outside, and inside the mutton fat renders and keeps the filling wet.',
        },
      },
      {
        id: 'chmtmomo', en: 'Chicken mutton momo', bn: 'চিকেন মাটন মোমো', price: 90,
        desc: {
          bn: 'এক প্লেটে দু’রকম — এক দিকে ভাপের, অন্য দিকে ভাজা। কোনটা নেবেন ঠিক করতে না পারলে এটাই উত্তর। দাম মাটন স্টিম মোমোর সমান, কিন্তু পদটা আলাদা।',
          en: 'Both kinds on one plate — steamed on one side, fried on the other. This is the answer to not being able to choose. Priced the same as the mutton steam momo, but it is a different thing.',
        },
      },
    ],
  },
  {
    // Ghugni was a slate dish — chalked when it was cooked, gone when it was
    // gone. It is on the printed menu now, which is a different promise: a
    // card says "we have this", a slate says "we have this today". Its own
    // group because it belongs to none of the other five.
    id: 'ghugni',
    en: { name: 'Ghugni', note: 'Off the slate, onto the card.' },
    bn: { name: 'ঘুগনি', note: 'স্লেট থেকে উঠে এল কার্ডে।' },
    accent: 'yolk',
    items: [
      {
        id: 'charbighugni',
        en: 'Mutton fat ghugni',
        bn: 'চর্বি ঘুগনি',
        price: 50,
        en_note: 'Dried peas, slow, finished in mutton fat.',
        bn_note: 'শুকনো মটর, ধীরে রাঁধা, শেষে খাসির চর্বি।',
        desc: {
          bn: 'শুকনো মটর সারা রাত ভিজিয়ে, তারপর ধীরে সেদ্ধ, আর শেষে খাসির চর্বি। বাংলার ঘুগনি প্রায় সব জায়গায় নিরামিষ — এটা নয়, আর ওই চর্বিটাই গোটা জিনিসটাকে অন্য দিকে নিয়ে যায়। উপরে কাঁচা পেঁয়াজ, লঙ্কা, লেবু। চর্বি রোজ পাওয়া যায় না, তাই ফুরিয়েও যায়।',
          en: 'Dried peas soaked overnight, cooked slow, finished in mutton fat. Bengali ghugni is vegetarian almost everywhere; this one is not, and the fat is what takes it somewhere else entirely. Raw onion, chilli and lime on top. The fat does not arrive every day, so this runs out.',
        },
      },
    ],
  },
  {
    id: 'beverages',
    en: { name: 'Beverages', note: 'The brew half of Bite & Brew.' },
    bn: { name: 'পানীয়', note: 'নামের ব্রু-টুকু এখানেই।' },
    accent: 'brew',
    items: [
      {
        id: 'tea', en: 'Tea', bn: 'চা', price: 10,
        desc: {
          bn: 'দুধ চা, দশ টাকা। পাতার মাপ সারাদিন এক — চামচে নয়, আঙুলের চিমটিতে। দুধ ফোটে আলাদা, ঢালা হয় উঁচু থেকে, আর কাপের উপরে যে সরটা পড়ে সেটা ফেলার জিনিস নয়; ওটাই প্রমাণ যে দুধ সত্যিই ফুটেছে।',
          en: 'Milk tea, ten rupees. The leaf is measured the same way all day — a pinch, not a spoon. The milk boils separately and is poured from a height, and the skin that forms on top is not something to skim off. It is the proof the milk was actually boiled.',
        },
      },
      {
        id: 'coffee', en: 'Coffee', bn: 'কফি', price: 15,
        desc: {
          bn: 'কাউন্টারের পিছনের মেশিনে তৈরি, উপরে ফেনা। উত্তরপাড়ার সকাল কফি দিয়ে শুরু হয় না, তাই চায়ের তুলনায় কম যায় — কিন্তু যারা চান, তাদের জন্য আছে, পনেরো টাকায়।',
          en: 'Out of the machine behind the counter, froth on top. Uttarpara does not start its mornings on coffee, so it goes out less often than the tea — but it is there for whoever wants it, at fifteen rupees.',
        },
      },
    ],
  },
];
