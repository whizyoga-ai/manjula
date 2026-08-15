/* ==========================================================================
   The reel — the kitchen, as a story.

   NINE SCENES, AND THE FIRST THREE ARE REAL VIDEO.

   `vid: true` marks a clip cut from the shop's own footage. Thirty seconds is
   the cap: long enough to be a look around rather than a loop, short enough
   that a landing page is not shipping six megabytes of video to somebody who
   only wanted the price of a momo. The uncut originals live on movies.html,
   where a visitor asks for them.

   The rest are AI-generated stills and the faces in them are not the two
   sisters. `wok-fire` is gone for a different reason: it was a man at the
   wok, and this shop is run by two women. It is their show. `menu idea/we are the champion.jpg` is the sisters; five scenes
   were removed once that was clear — stew, fried momo, mutton steam, mutton
   fried and the counter shot, which was the worst of them because it read as
   "here are the owners". So no caption anywhere names anybody: they say what
   is happening in the kitchen, never who is doing it.

   TWO KINDS OF SCENE, AND THE DIFFERENCE IS LEGIBLE WITHOUT A DISCLAIMER.
     `price` set — a dish on the shop's printed card. Name and price shown,
                   because you can walk in and buy it.
     no `price`  — atmosphere. Caption only. Nothing implied for sale.

   Corrected renders of the styled scenes drop in over these slugs; each is a
   one-line change and nothing else moves.
   ========================================================================== */

'use strict';

const REELS = [
  { f: 'shop-tour',    vid: true, secs: 30,
    bn: 'দোকানের ভিতরটা — সাইনবোর্ড, তাক, স্লেট', en: 'Inside the shop: signs, shelves, slate',
    tabBn: 'দোকান',                tabEn: 'The shop' },

  { f: 'counter-menu', vid: true, secs: 30,
    bn: 'কার্ড, কাউন্টার, স্টিমার',  en: 'The card, the counter, the steamer',
    tabBn: 'কাউন্টার',              tabEn: 'Counter' },

  { f: 'steamer',      vid: true, secs: 6, price: 50,
    bn: 'স্টিমার খুলছে — মোমো তৈরি',  en: 'The steamer coming off',
    dishBn: 'চিকেন স্টিম মোমো',      dishEn: 'Chicken steam momo',
    tabBn: 'স্টিমার',                tabEn: 'Steamer' },

  { f: 'momo-steam',   price: 50,
    bn: 'স্টিমারে মোমো বসছে',      en: 'Momos going into the steamer',
    dishBn: 'চিকেন স্টিম মোমো',    dishEn: 'Chicken steam momo',
    tabBn: 'মোমো',                 tabEn: 'Momo' },

  { f: 'maggi',        price: 50,
    bn: 'ম্যাগি নামছে কড়াই থেকে',   en: 'Maggie coming off the flame',
    dishBn: 'এগ চীজ ম্যাগি',        dishEn: 'Egg cheese maggie',
    tabBn: 'ম্যাগি',                tabEn: 'Maggie' },

  { f: 'toast',        price: 30,
    bn: 'মালাই টোস্ট, তাওয়া থেকে',  en: 'Malai toast off the pan',
    dishBn: 'মালাই টোস্ট',          dishEn: 'Malai toast',
    tabBn: 'টোস্ট',                 tabEn: 'Toast' },

  { f: 'chai',         price: 10,
    bn: 'চা ঢালা হচ্ছে',            en: 'The tea being poured',
    dishBn: 'চা',                   dishEn: 'Tea',
    tabBn: 'চা',                    tabEn: 'Tea' },

  { f: 'roll',
    bn: 'তাওয়ার উপর, সন্ধেবেলা',    en: 'On the griddle, evening',
    tabBn: 'তাওয়া',                 tabEn: 'Griddle' },

  { f: 'puchka',
    bn: 'রাস্তার ধারে',             en: 'Out on the street',
    tabBn: 'রাস্তা',                tabEn: 'Street' },
];
