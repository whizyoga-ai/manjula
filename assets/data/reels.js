/* ==========================================================================
   The reel — the whole card, moving.

   TWENTY-EIGHT SCENES: the two sisters at either end, the six pictures of
   them actually working, and every single dish on the printed menu.

   THE COOKING SCENES LEAD THEIR FAMILY, ON PURPOSE. A reel of twenty
   plates that nobody appears to cook is a catalogue. Steamer first, then
   the five momos; the pan, then the four maggis; the kettle, then the
   tea. Whoever made it, then what they made.

   THE RULE THIS FILE EXISTS TO ENFORCE: every scene is either a dish the shop
   actually sells or the two people who cook it. Nothing else goes in.

   It had to be written down because the reel broke it. Two scenes used to sit
   at the bottom — `roll`, captioned "on the griddle", and `puchka`, "out on
   the street". Both were generated street food atmosphere and the shop sells
   neither; there is no griddle here and puchka has never been on the card.
   Carrying no price does not make a picture harmless. A reel is read as
   "this is what they make", and somebody who walks twenty minutes for a roll
   they saw on the front page has been told something untrue by the website.

   THE TWO SISTERS ARE PHOTOGRAPHS, NOT RENDERS. Every earlier attempt to put
   the owners in here went through an image generator and twice came back as
   somebody else's face. There is no render more theirs than their own
   picture, so those two scenes are the real photographs, cropped, and nothing
   else done to them. No caption names anybody.

   HOW A SCENE IS PUT TOGETHER
     f       file slug. Clip at assets/video/reel/{f}.mp4, still (and video
             poster) at assets/img/reel/{f}.jpg. The slug is the dish's id in
             menu.js, so a dish cannot end up with another dish's picture.
     vid     set `vid: true, secs: 4.1` on a dish once its clip exists at
             assets/video/reel/{f}.mp4. Until then the scene is the still and
             nothing else needs changing — the slug already points at both.
     secs    how long the scene holds. Stills hold the default five seconds.
     price   set for a dish on the card; the player prints the name and price.
             Left off for the two photographs, which are not for sale.

   TO CHANGE A DISH'S SCENE: rerender assets/img/dish/{id}.png and its clip,
   rebuild the derived jpg/mp4, and change nothing here. The slug does the
   joining.
   ========================================================================== */

'use strict';

const REELS = [
  { f: 'sisters',      photo: true,
    bn: 'দুই বোন — দোকানটা এঁদের',    en: 'Two sisters. The shop is theirs',
    tabBn: 'দুই বোন',                tabEn: 'The sisters' },

  /* ---- মোমো / Momo ---------------------------------------------------- */
  { f: 'cook-momo',    photo: true,
    bn: 'স্টিমারের ঢাকনা উঠছে',       en: 'The lid comes off the steamer',
    tabBn: 'রান্নাঘর',                tabEn: 'In the kitchen' },

  { f: 'chsteam',      price: 50,
    bn: 'স্টিম মোমো, ধোঁয়া উঠছে',     en: 'Steamed momo, still steaming',
    dishBn: 'চিকেন স্টিম মোমো',       dishEn: 'Chicken steam momo',
    tabBn: 'স্টিম মোমো',              tabEn: 'Steam momo' },

  { f: 'chfried',      price: 60,
    bn: 'ফ্রাইড মোমো, সোনালি খোলস',    en: 'Fried momo, gone golden',
    dishBn: 'চিকেন ফ্রাইড মোমো',      dishEn: 'Chicken fried momo',
    tabBn: 'ফ্রাইড মোমো',             tabEn: 'Fried momo' },

  { f: 'mtsteam',      price: 90,
    bn: 'মাটন মোমো, ভিতরে পুর',       en: 'Mutton momo, opened up',
    dishBn: 'মাটন স্টিম মোমো',        dishEn: 'Mutton steam momo',
    tabBn: 'মাটন মোমো',               tabEn: 'Mutton momo' },

  { f: 'mtfried',      price: 100,
    bn: 'মাটন ফ্রাইড, মুচমুচে',        en: 'Mutton fried, and crisp',
    dishBn: 'মাটন ফ্রাইড মোমো',       dishEn: 'Mutton fried momo',
    tabBn: 'মাটন ফ্রাইড',             tabEn: 'Mutton fried' },

  { f: 'chmtmomo',     price: 90,
    bn: 'একসঙ্গে — স্টিম আর ফ্রাইড',   en: 'Both at once, steamed and fried',
    dishBn: 'চিকেন মাটন মোমো',        dishEn: 'Chicken mutton momo',
    tabBn: 'চিকেন মাটন',              tabEn: 'Chicken mutton' },

  /* ---- টোস্ট ও পাউরুটি / Toast ---------------------------------------- */
  { f: 'cook-stew',    photo: true,
    bn: 'হাঁড়ি থেকে স্টু উঠছে',        en: 'Stew coming out of the pot',
    tabBn: 'হাঁড়ি',                   tabEn: 'The pot' },

  { f: 'stew',         price: 60,
    bn: 'স্টু বাটিতে, পাউরুটি কিনারায়', en: 'Stew in the bowl, bread on the rim',
    dishBn: 'স্টু পাউরুটি',           dishEn: 'Bread & chicken stew',
    tabBn: 'স্টু',                    tabEn: 'Stew' },

  { f: 'cook-toast',   photo: true,
    bn: 'তাওয়ার উপর পাউরুটি',         en: 'Bread on the tawa',
    tabBn: 'তাওয়া',                  tabEn: 'The tawa' },

  { f: 'malai',        price: 30,
    bn: 'মালাই টোস্ট, উপরে সর',       en: 'Malai toast, cream on top',
    dishBn: 'মালাই টোস্ট',            dishEn: 'Malai toast',
    tabBn: 'মালাই',                   tabEn: 'Malai' },

  { f: 'butter',       price: 20,
    bn: 'মাখন গলে নামছে',             en: 'Butter melting down the crust',
    dishBn: 'মাখন পাউরুটি',           dishEn: 'Butter toast',
    tabBn: 'মাখন টোস্ট',              tabEn: 'Butter toast' },

  { f: 'eggtoast',     price: 25,
    bn: 'কুসুম ভাঙল টোস্টের উপর',      en: 'A yolk broken over the toast',
    dishBn: 'ডিম পাউরুটি',            dishEn: 'Egg toast',
    tabBn: 'ডিম টোস্ট',               tabEn: 'Egg toast' },

  /* ---- ডিম / Eggs ------------------------------------------------------ */
  { f: 'boiled',       price: 12,
    bn: 'ডিম সেদ্ধ, নুন আর গোলমরিচ',   en: 'Boiled egg, salt and pepper',
    dishBn: 'ডিম সেদ্ধ',              dishEn: 'Boiled egg',
    tabBn: 'ডিম সেদ্ধ',               tabEn: 'Boiled egg' },

  { f: 'poach',        price: 15,
    bn: 'পোচের কুসুম গড়াচ্ছে',        en: 'The poached yolk, running',
    dishBn: 'পোচ',                    dishEn: 'Poach',
    tabBn: 'পোচ',                     tabEn: 'Poach' },

  { f: 'omlet',        price: 20,
    bn: 'ওমলেট, কাঁচালঙ্কা কুচি দিয়ে',  en: 'Omelette, green chilli through it',
    dishBn: 'ওমলেট',                  dishEn: 'Omlet',
    tabBn: 'ওমলেট',                   tabEn: 'Omlet' },

  { f: 'cheeseomlet',  price: 30,
    bn: 'চীজ ওমলেট, ভিতরে গলা চীজ',    en: 'Cheese omelette, and it pulls',
    dishBn: 'চীজ ওমলেট',              dishEn: 'Cheese omlet',
    tabBn: 'চীজ ওমলেট',               tabEn: 'Cheese omlet' },

  /* ---- নুডলস / Noodles ------------------------------------------------- */
  { f: 'cook-maggi',   photo: true,
    bn: 'কড়াই থেকে ম্যাগি',           en: 'Noodles out of the pan',
    tabBn: 'কড়াই',                   tabEn: 'The pan' },

  { f: 'plainmag',     price: 30,
    bn: 'ম্যাগি কাঁটায় জড়াচ্ছে',       en: 'Maggie, twirled on the fork',
    dishBn: 'প্লেন ম্যাগি',            dishEn: 'Plain maggie',
    tabBn: 'ম্যাগি',                  tabEn: 'Maggie' },

  { f: 'eggmag',       price: 40,
    bn: 'ম্যাগির উপর ডিম',            en: 'An egg on the noodles',
    dishBn: 'এগ ম্যাগি',              dishEn: 'Egg maggie',
    tabBn: 'এগ ম্যাগি',               tabEn: 'Egg maggie' },

  { f: 'cheesemag',    price: 40,
    bn: 'চীজ গলে ম্যাগিতে মিশছে',     en: 'Cheese melting into the noodles',
    dishBn: 'চীজ ম্যাগি',             dishEn: 'Cheese maggie',
    tabBn: 'চীজ ম্যাগি',              tabEn: 'Cheese maggie' },

  { f: 'eggcheesemag', price: 50,
    bn: 'ডিম আর চীজ, দুটোই একসঙ্গে',   en: 'Egg and cheese, both together',
    dishBn: 'এগ চীজ ম্যাগি',          dishEn: 'Egg cheese maggie',
    tabBn: 'এগ চীজ',                  tabEn: 'Egg cheese' },

  /* ---- ঘুগনি / Ghugni -------------------------------------------------- */
  { f: 'charbighugni', price: 50,
    bn: 'ঘুগনি, উপরে পেঁয়াজ-লঙ্কা',    en: 'Ghugni, onion and chilli on top',
    dishBn: 'চর্বি ঘুগনি',            dishEn: 'Mutton fat ghugni',
    tabBn: 'ঘুগনি',                   tabEn: 'Ghugni' },

  /* ---- পানীয় / Beverages ----------------------------------------------- */
  { f: 'cook-chai',    photo: true,
    bn: 'কেটলি থেকে চা পড়ছে',        en: 'Tea going into the glass',
    tabBn: 'কেটলি',                  tabEn: 'The kettle' },

  { f: 'tea',          price: 10,
    bn: 'চা, উপরে সর জমছে',           en: 'Tea, the skin just forming',
    dishBn: 'চা',                     dishEn: 'Tea',
    tabBn: 'চা',                      tabEn: 'Tea' },

  { f: 'coffee',       price: 15,
    bn: 'কফি, উপরে ফেনা',             en: 'Coffee, froth on top',
    dishBn: 'কফি',                    dishEn: 'Coffee',
    tabBn: 'কফি',                     tabEn: 'Coffee' },

  { f: 'cook-serve',   photo: true,
    bn: 'কাউন্টারের ওপারে প্লেট',      en: 'A plate over the counter',
    tabBn: 'কাউন্টার',                tabEn: 'The counter' },

  { f: 'sisters-two',  photo: true,
    bn: 'যাঁরা রোজ রাঁধেন',           en: 'The two who cook it, every day',
    tabBn: 'ওঁরা',                    tabEn: 'Them' },
];
