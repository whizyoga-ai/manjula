/* ==========================================================================
   The reel — the kitchen, as a story.

   SIX SCENES, ALL STILLS. FIVE SECONDS EACH.

   The video came off the landing page and then off the site altogether: the
   two opening-day clips were phone footage, not filmed to be shown, and the
   owners took them down. The hero is stills, each held five seconds and
   drifting the whole time so the frame is never still.

   `vid: true` is still honoured by the player if a scene ever wants it.

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
  /* THE TWO OF THEM, FIRST, AND FROM A CAMERA.
     Every earlier attempt to put the owners in this reel went through an image
     generator, and twice the answer came back that the face was not theirs.
     There is no render that is more theirs than their own photograph, so these
     two scenes are the real pictures, cropped and nothing else done to them.
     They open the reel because a shop run by two people should look like it.
     No caption names anybody. */
  { f: 'sisters',      photo: true,
    bn: 'দুই বোন — দোকানটা এঁদের',   en: 'Two sisters. The shop is theirs',
    tabBn: 'দুই বোন',               tabEn: 'The sisters' },

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

  { f: 'stew',         price: 60,
    bn: 'স্টু বাটিতে পড়ছে',         en: 'Stew going into the bowl',
    dishBn: 'স্টু পাউরুটি',          dishEn: 'Bread & chicken stew',
    tabBn: 'স্টু',                  tabEn: 'Stew' },

  { f: 'serve',
    bn: 'কাউন্টার থেকে প্লেট',       en: 'A plate across the counter',
    tabBn: 'কাউন্টার',              tabEn: 'Counter' },

  { f: 'sisters-two',  photo: true,
    bn: 'যাঁরা রোজ রাঁধেন',          en: 'The two who cook it, every day',
    tabBn: 'ওঁরা',                  tabEn: 'Them' },
];

/* GONE FROM THIS LIST, AND WHY IT MATTERS.
   Two scenes used to sit at the bottom: `roll`, captioned "on the griddle",
   and `puchka`, captioned "out on the street". Both were generated street
   food atmosphere and neither is anything this shop sells — there is no
   griddle here and no roll, and puchka has never been on the card. Carrying
   no price does not make a picture harmless: a reel is read as "this is what
   they make", and somebody walking twenty minutes for a roll they saw on the
   front page has been told something untrue by the website.

   The rule for this file: every scene is a dish on the card, or it is the
   shop's own counter. Nothing else goes in it. */
