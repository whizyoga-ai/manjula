/* ==========================================================================
   The seven dish stories, as data.

   These used to be seven hand-written <article> blocks inside one very long
   origins page. They live here now because the site is paginated: the same
   content renders as a card on origins.html and as a full page on
   dish.html?d=<slug>, and neither should be able to drift from the other.

   TWO KINDS OF WRITING, AND THE PAGE LABELS WHICH IS WHICH.
     `route`   — sourced history. Every line is traceable to docs/SOURCES.md.
     `kitchen` — the shop's own account of how it cooks. No batch counts, no
                 suppliers nobody named. Every claim here is anchored to
                 something visible on the printed card or the chalk slate,
                 because those are the only records of this kitchen that
                 exist.

   `art` names a <symbol> in the sprite that dish.html and origins.html both
   inline. The drawings are original because there is no photograph of a
   fourteenth-century Lhasa dumpling, and stock food photography of somebody
   else's momo would be the same small lie the rest of this site avoids.
   ========================================================================== */

'use strict';

const DISHES = [
  {
    slug: 'momo',
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
      { bn: 'চারটে রাস্তা খোলা রাখা হয়েছে, আর সেটাই আসল সিদ্ধান্ত: চিকেন না মাটন, আর ভাপে না ভাজা। ভাপের মোমো পুরের স্বাদ সামনে আনে; ভাজা মোমো খোলসটাকে সামনে আনে। দুটো আলাদা খাবার, একই পুর — তাই দুটোই থাকে, আর দাম আলাদা।',
        en: 'Four doors are kept open, and that is the actual decision: chicken or mutton, steamed or fried. Steaming puts the filling in front; frying puts the skin in front. They are two different dishes made from one filling, so both stay on the card, priced apart.' },
      { bn: 'প্লেটে পাঁচটা। কথাটা ছাপানো কার্ডে নেই, আছে ফুটপাথের স্লেটে। মানে সংখ্যাটা ঠিক হয়েছে কাউন্টারে দাঁড়ানো লোকটার দিকে তাকিয়ে — ছাপাখানায় বসে নয়।',
        en: 'Five to a plate. That number is not on the printed card — it is chalked on the slate outside. Which tells you it was settled by looking at the person standing at the counter, not by a printer.' },
    ],
  },

  {
    slug: 'stew',
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
      { bn: 'কার্ডে দামটা লেখা আছে <strong>১০ + ৫০ = ৬০</strong> — একটা যোগফল নয়, একটা সিদ্ধান্ত। পাউরুটি আলাদা, স্টু আলাদা। যার হাতে ষাট টাকা নেই, সে দশ টাকার পাউরুটি নিতে পারে; যার বেশি খিদে, সে দু’টুকরো নিতে পারে। দামটাকে ভাঙা মানে খাবারটাকে সবার নাগালে রাখা।',
        en: 'The card prices it <strong>10 + 50 = 60</strong>. That is not a sum, it is a decision. The bread is one thing and the stew is another. Somebody without sixty rupees can take the ten-rupee bread; somebody hungrier can take a second piece. Breaking the price apart is how the dish stays within reach.' },
      { bn: 'ঝোলটা হালকা রাখা হয় ইচ্ছে করেই। ভারী করলে পাউরুটি গলে যায়; হালকা থাকলে পাউরুটি ঝোল টেনে নেয় আর নিজের চেহারা ধরে রাখে। এই দু’টোর মাঝখানে দাঁড়ানোটাই আসল কাজ।',
        en: 'The broth is kept light on purpose. Thicken it and the bread collapses; keep it light and the bread drinks it up while still holding its shape. Standing between those two is the whole job.' },
    ],
  },

  {
    slug: 'toast',
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
      { bn: 'চারটে টোস্ট, চারটে আলাদা কাজ — আর দাম দেখলেই বোঝা যায় কোনটা কেন। <strong>মাখন পাউরুটি ২০</strong>: সবচেয়ে সাদামাটা, তাই সবচেয়ে কঠিন — লুকোনোর কিছু নেই। <strong>ডিম পাউরুটি ২৫</strong>: পাঁচ টাকায় জলখাবার হয়ে যায়। <strong>মালাই টোস্ট ৩০</strong>: মিষ্টির দিকটা, যা চায়ের সঙ্গে বিকেলে চলে।',
        en: 'Four toasts doing four different jobs, and the price ladder tells you which is which. <strong>Butter toast at 20</strong> — the plainest, and so the hardest, because there is nothing to hide behind. <strong>Egg toast at 25</strong> — five rupees turns a snack into breakfast. <strong>Malai toast at 30</strong> — the sweet end of the shelf, which is what an afternoon tea wants.' },
      { bn: 'হিসেবটা সরল: যে জিনিস সবচেয়ে বেশি বিক্রি হবে, সেটাই সবচেয়ে সস্তা রাখতে হবে। তাই মাখন পাউরুটি বিশ টাকাতেই থেকে গেছে।',
        en: 'The arithmetic is plain: the thing that sells most has to be the thing that costs least. Which is why butter toast has stayed at twenty.' },
    ],
  },

  {
    slug: 'egg',
    art: 'd-egg',
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
      { bn: 'দামগুলো পরপর দেখুন — <strong>১২, ১৫, ২০, ৩০</strong>। এক ধাপ থেকে পরের ধাপ, তিন থেকে দশ টাকার তফাত। মানে ডিমের তাকটা ইচ্ছে করে এমনভাবে সাজানো, যাতে পকেটে যা-ই থাক, একটা ধাপ আপনার জন্য থাকবেই। সেদ্ধ ডিম বারো টাকায় স্কুলের বাচ্চার হাতের নাগালে, আর চীজ ওমলেট তিরিশে গোটা একটা জলখাবার।',
        en: 'Look at the ladder: <strong>12 · 15 · 20 · 30</strong>. Each rung is three to ten rupees above the last. The egg shelf is arranged so that whatever is in your pocket, one rung is meant for you. A boiled egg at twelve is within a schoolchild’s reach; a cheese omlet at thirty is a whole breakfast.' },
      { bn: 'চীজটা এখানে বিলাসিতা নয়, একটা সিদ্ধান্ত — ওটাই একমাত্র উপকরণ যা এই দোকানের তিনটে আলাদা তাকে (ডিম, ম্যাগি, টোস্ট) একই কাজ করে: দশ টাকা যোগ করে খাবারটাকে ‘পেট ভরা’ বানিয়ে দেয়।',
        en: 'The cheese is not a luxury here, it is a lever. It is the one ingredient that does the same job on three different shelves — eggs, maggie, toast — adding ten rupees and turning a snack into something that fills you up.' },
    ],
  },

  {
    slug: 'maggi',
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
      { bn: 'প্যাকেটের ম্যাগি সবাই বানাতে পারে। তফাত হয় তার পরে কী পড়ল তাতে — আর মঞ্জুলার কার্ডে সেই তফাতটা ধাপে ধাপে সাজানো: <strong>প্লেন ৩০ → এগ ৪০ → চীজ ৪০ → এগ চীজ ৫০</strong>।',
        en: 'Anyone can make maggie out of the packet. The difference is what goes in after, and on Manjula’s card that difference is laid out as a staircase: <strong>plain 30 → egg 40 → cheese 40 → egg-and-cheese 50</strong>.' },
      { bn: 'খেয়াল করুন, ডিম আর চীজ দুটোরই দাম চল্লিশ। ইচ্ছে করে। একটাকে অন্যটার উপরে বসানো হয়নি — কে কী চায়, সেটা খদ্দেরের রুচির ব্যাপার, দামের নয়। দশ টাকা বাড়তি লাগে কেবল যখন দুটোই একসঙ্গে চান।',
        en: 'Notice that egg and cheese are the same forty. That is deliberate. Neither is ranked above the other — which you want is a matter of taste, not of price. The extra ten rupees is only charged when you want both.' },
    ],
  },

  {
    slug: 'ghugni',
    art: 'd-ghugni',
    tone: 'warm',
    price: '₹15 / ₹30',
    priceNote: { bn: 'ছোট / বড় — স্লেটের পদ', en: 'small / large — a slate dish' },
    name: { bn: 'ঘুগনি', en: 'Ghugni' },
    sub: { bn: 'কার্ডে নেই। স্লেটে আছে।', en: 'Not on the card. On the slate.' },
    lede: {
      bn: 'পূর্ব ভারতের সবচেয়ে চেনা রাস্তার খাবার। শুকনো মটর, ধীরে সেদ্ধ, মশলার ঝোলে। বাংলা, ওড়িশা, বিহার, ঝাড়খণ্ড — প্রত্যেকের নিজের নিজের ঘুগনি। বিহারে হয় কালো ছোলায়, বাংলা আর ওড়িশায় সাদা মটরে।',
      en: 'The most familiar street food in eastern India — dried peas, cooked slow, in a spiced gravy. Bengal, Odisha, Bihar and Jharkhand each have their own (Bihar’s with black chana, Bengal’s and Odisha’s with white peas).',
    },
    route: [],
    chips: [],
    kitchen: [
      { bn: 'দোকান খোলার দিন স্লেটে যা লেখা ছিল, সেটা সাধারণ ঘুগনি নয় — <strong>খাসির চর্বির ঘুগনি</strong>। রাস্তার ঘুগনি প্রায় সবসময় নিরামিষ। চর্বিতে শেষ করা মানে পদটাকে ইচ্ছে করে অন্যদিকে নিয়ে যাওয়া: একই মটর, কিন্তু গভীরতর, মাংসল একটা শেষ।',
        en: 'What went up on the slate on opening day was not ordinary ghugni. It was <strong>ghugni finished in mutton fat</strong>. Street ghugni is almost always vegetarian. Finishing it in fat is a deliberate turn in another direction — the same peas, taken somewhere deeper and meatier.' },
      { bn: 'আর দামটা: <strong>ছোট ১৫, বড় ৩০</strong>। ঘুগনি চিরকালই সেই খাবার যেটা যে কেউ কিনতে পারে। দুটো মাপ রাখা মানে সেই কথাটা মানা — মাংসের চর্বিতে রাঁধা হলেও।',
        en: 'And the price: <strong>small 15, large 30</strong>. Ghugni has always been the dish anyone can afford. Keeping two sizes is how that stays true, even when it has been cooked in mutton fat.' },
      { bn: 'এটা ছাপানো কার্ডে নেই। এই পদগুলো স্লেটে ওঠে, রোজ বদলায় — আজ কী আছে জানতে <a href="tel:+919163538794">ফোন করুন</a>।',
        en: 'This is not on the printed card. Dishes like it go up on the slate and change from day to day — <a href="tel:+919163538794">call the shop</a> to hear what is on today.' },
    ],
  },

  {
    slug: 'cha',
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
      // Past tense, and it stays past tense. The free tea was the inauguration
      // and has never been repeated; a visitor who walks over expecting it
      // would have been misled by this page, not by the shop.
      { bn: 'দোকান খোলার দিন — শুধু সেই একটি দিনই — বোর্ডে লেখা ছিল <strong>চা ও কফি সম্পূর্ণ বিনামূল্যে</strong>। প্রথম দিনে যা বিনামূল্যে দেওয়া হয়, সেটাই বলে দেয় দোকানটা নিজেকে কী মনে করে। মঞ্জুলা বেছেছিল চা। তারপর থেকে চা দশ টাকাতেই।',
        en: 'On the opening day — and on that one day only — the board read <strong>tea and coffee, completely free</strong>. What a shop gives away on its first day tells you what it thinks it is. Manjula chose the tea. Every day since, it has been ten rupees.' },
      { bn: 'দশ টাকা মানে ছাত্রছাত্রীরাও রোজ আসতে পারে। মেনুর সবচেয়ে সস্তা জিনিসটা যদি স্কুলের বাচ্চার নাগালে থাকে, তবে বুঝতে হবে দোকানটা পাড়ারই — বাইরের কারও নয়।',
        en: 'Ten rupees means students can come every day. If the cheapest thing on the menu is within a schoolchild’s reach, the shop belongs to the neighbourhood and not to somebody passing through.' },
    ],
  },
];
