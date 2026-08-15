/* ==========================================================================
   Manjula Bite & Brew — the printed menu, as data.

   Every price here is read off the two laminated cards on the shop wall
   (menu-eng.jpeg / menu-bengali.jpeg, photographed 2026-08-14). Nothing is
   estimated and nothing is rounded. If a price is not on a card, it is not
   in this file — the site says "ask at the counter" instead of guessing.

   TWO ITEMS ARE NEWER THAN THE PHOTOGRAPHED CARDS: chicken mutton momo (90)
   and mutton fat ghugni (30), both added on the client's word. The card
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
      },
      { id: 'malai', en: 'Malai toast', bn: 'মালাই টোস্ট', price: 30 },
      { id: 'butter', en: 'Butter toast', bn: 'মাখন পাউরুটি', price: 20 },
      { id: 'eggtoast', en: 'Egg toast', bn: 'ডিম পাউরুটি', price: 25 },
    ],
  },
  {
    id: 'eggs',
    en: { name: 'Eggs', note: 'Four ways, none of them complicated.' },
    bn: { name: 'ডিম', note: 'চার রকম। জটিল কিছু নয়।' },
    accent: 'yolk',
    items: [
      { id: 'boiled', en: 'Boiled egg', bn: 'ডিম সেদ্ধ', price: 12 },
      { id: 'poach', en: 'Poach', bn: 'পোচ', price: 15 },
      { id: 'omlet', en: 'Omlet', bn: 'ওমলেট', price: 20 },
      { id: 'cheeseomlet', en: 'Cheese omlet', bn: 'চীজ ওমলেট', price: 30 },
    ],
  },
  {
    id: 'noodles',
    en: { name: 'Noodles', note: 'Maggie, the way a para shop makes it.' },
    bn: { name: 'নুডলস', note: 'ম্যাগি, পাড়ার দোকানের হাতে যেমন হয়।' },
    accent: 'leaf',
    items: [
      { id: 'plainmag', en: 'Plain maggie', bn: 'প্লেন ম্যাগি', price: 30 },
      { id: 'eggmag', en: 'Egg maggie', bn: 'এগ ম্যাগি', price: 40 },
      { id: 'cheesemag', en: 'Cheese maggie', bn: 'চীজ ম্যাগি', price: 40, verify: true },
      { id: 'eggcheesemag', en: 'Egg cheese maggie', bn: 'এগ চীজ ম্যাগি', price: 50 },
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
      { id: 'chsteam', en: 'Chicken steam momo', bn: 'চিকেন স্টিম মোমো', price: 50, pieces: 5 },
      { id: 'chfried', en: 'Chicken fried momo', bn: 'চিকেন ফ্রাইড মোমো', price: 60 },
      { id: 'mtsteam', en: 'Mutton steam momo', bn: 'মাটন স্টিম মোমো', price: 90, pieces: 5 },
      { id: 'mtfried', en: 'Mutton fried momo', bn: 'মাটন ফ্রাইড মোমো', price: 100 },
      { id: 'chmtmomo', en: 'Chicken mutton momo', bn: 'চিকেন মাটন মোমো', price: 90 },
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
      { id: 'charbighugni', en: 'Mutton fat ghugni', bn: 'চর্বি ঘুগনি', price: 30,
        en_note: 'Dried peas, slow, finished in mutton fat.',
        bn_note: 'শুকনো মটর, ধীরে রাঁধা, শেষে খাসির চর্বি।' },
    ],
  },
  {
    id: 'beverages',
    en: { name: 'Beverages', note: 'The brew half of Bite & Brew.' },
    bn: { name: 'পানীয়', note: 'নামের ব্রু-টুকু এখানেই।' },
    accent: 'brew',
    items: [
      { id: 'tea', en: 'Tea', bn: 'চা', price: 10 },
      { id: 'coffee', en: 'Coffee', bn: 'কফি', price: 15 },
    ],
  },
];
