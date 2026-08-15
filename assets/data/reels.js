/* ==========================================================================
   The reel — scenes from the kitchen.

   Seven scenes in a phone frame, running like a story: progress bars across
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

   ON THE IMAGES. These are AI-generated scenes and the faces in them are not
   the two sisters, so no caption here names anybody — they describe what is
   happening in the kitchen, never who is doing it.

   Five scenes were removed on the client's eye, not on a rule. Stew, fried
   momo, mutton steam and mutton fried all carried the same unfamiliar woman,
   spotted across all four at a glance. `counter` followed once the real
   sisters were identified — `menu idea/we are the champion.jpg` is them, and
   the two women in that scene were somebody else entirely.

   Corrected renders from the reference photographs in
   C:\Customers\Manjula\media drop in over these slugs; each is a one-line
   swap of `f` and nothing else changes.
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
