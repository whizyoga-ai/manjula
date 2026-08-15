/* ==========================================================================
   The reel — scenes from the kitchen.

   Twelve scenes in a phone frame, running like a story: progress bars across
   the top, auto-advance, tap either half to go back or forward, and a slow
   drift on every frame so the screen is never once still.

   TWO KINDS OF SCENE, AND THE DIFFERENCE MATTERS.

     `price` set   — a dish on the shop's printed card. It gets its price and
                     an order button, because you can walk in and buy it.
     no `price`    — atmosphere. The wok, the counter, the rolls, the puchka.
                     Caption only, no price, no order button. These say "this
                     is what the kitchen is like", not "this is for sale",
                     and the absence of a price is what keeps that line clean
                     without needing a disclaimer to say so.

   ON THE IMAGES. These are AI-generated scenes, and the faces in them are not
   the two sisters — the client said so plainly, and better ones are being
   generated from the real reference photographs in C:\Customers\Manjula\media.
   So no caption here names anybody. They describe what is happening in the
   kitchen, never who is doing it. When the corrected scenes arrive, each is a
   one-line swap of `f` below and nothing else changes.
   ========================================================================== */

'use strict';

const REELS = [
  { f: 'momo-steam',   price: 50,
    bn: 'স্টিমারে মোমো বসছে',      en: 'Momos going into the steamer',
    dishBn: 'চিকেন স্টিম মোমো',    dishEn: 'Chicken steam momo',
    tabBn: 'মোমো',                 tabEn: 'Momo' },

  { f: 'wok-fire',
    bn: 'কড়াইয়ে আগুন উঠছে',       en: 'The wok catches',
    tabBn: 'কড়াই',                 tabEn: 'The wok' },

  { f: 'maggi',        price: 50,
    bn: 'ম্যাগি নামছে কড়াই থেকে',   en: 'Maggie coming off the flame',
    dishBn: 'এগ চীজ ম্যাগি',        dishEn: 'Egg cheese maggie',
    tabBn: 'ম্যাগি',                tabEn: 'Maggie' },

  { f: 'stew',         price: 60,
    bn: 'স্টু আর গরম পাউরুটি',      en: 'Stew, and the bread beside it',
    dishBn: 'স্টু পাউরুটি',         dishEn: 'Bread & chicken stew',
    tabBn: 'স্টু',                  tabEn: 'Stew' },

  { f: 'momo-fried',   price: 60,
    bn: 'ভাজা মোমো, সঙ্গে চাটনি',   en: 'Fried momos, with the chutney',
    dishBn: 'চিকেন ফ্রাইড মোমো',    dishEn: 'Chicken fried momo',
    tabBn: 'ফ্রাইড মোমো',           tabEn: 'Fried momo' },

  { f: 'momo-mutton',  price: 90,
    bn: 'মাটন মোমো — প্লেটে পাঁচটা', en: 'Mutton momo, five to a plate',
    dishBn: 'মাটন স্টিম মোমো',      dishEn: 'Mutton steam momo',
    tabBn: 'মাটন',                  tabEn: 'Mutton' },

  { f: 'momo-mutton-fried', price: 100,
    bn: 'মাটন ভাজা মোমো',           en: 'Mutton, fried',
    dishBn: 'মাটন ফ্রাইড মোমো',     dishEn: 'Mutton fried momo',
    tabBn: 'মাটন ফ্রাই',            tabEn: 'Mutton fried' },

  { f: 'toast',        price: 30,
    bn: 'মালাই টোস্ট, তাওয়া থেকে',  en: 'Malai toast off the pan',
    dishBn: 'মালাই টোস্ট',          dishEn: 'Malai toast',
    tabBn: 'টোস্ট',                 tabEn: 'Toast' },

  { f: 'chai',         price: 10,
    bn: 'চা ঢালা হচ্ছে',            en: 'The tea being poured',
    dishBn: 'চা',                   dishEn: 'Tea',
    tabBn: 'চা',                    tabEn: 'Tea' },

  { f: 'counter',
    bn: 'কাউন্টারের ভিড়',           en: 'A busy counter',
    tabBn: 'কাউন্টার',              tabEn: 'Counter' },

  { f: 'roll',
    bn: 'তাওয়ার উপর, সন্ধেবেলা',    en: 'On the griddle, evening',
    tabBn: 'তাওয়া',                 tabEn: 'Griddle' },

  { f: 'puchka',
    bn: 'রাস্তার ধারে',             en: 'Out on the street',
    tabBn: 'রাস্তা',                tabEn: 'Street' },
];
