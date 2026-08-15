/* ==========================================================================
   THE SLATE — আজকের স্পেশাল

   This is the one file the shop edits. It mirrors the real chalkboard that
   stands on the pavement outside 17/A Banerjee Para Street.

   THE RULE THIS FILE EXISTS TO ENFORCE:
   the website never claims to know today's specials.

   `date` is the day the board was actually written, in YYYY-MM-DD. The page
   compares it to today in Kolkata time. If they match, the board is shown as
   today's. If they do not, the page says so plainly — "this board is from
   Tuesday, call to hear today's" — and keeps the number to call in front of
   the reader.

   That is the whole trick. A restaurant site that quietly serves last week's
   specials as though they were today's is lying in a small way every day.
   This one would rather admit it does not know. The cost of admitting it is
   one honest sentence; the cost of guessing is a customer who walks 20
   minutes for a ghugni that was finished on Tuesday.

   TO UPDATE THE BOARD:
     1. change `date` to today
     2. rewrite `items`
     3. commit
   Nothing else. No build step, no admin login, no CMS.
   ========================================================================== */

'use strict';

const SLATE = {
  // The board as photographed on the shop's opening day.
  date: '2026-08-14',

  // A headline the shop chalks above the list. Optional — set both to null
  // and the page simply omits the line.
  //
  // THE FREE TEA WAS ONE DAY ONLY — the inauguration, and never since. The
  // wording below is past tense on purpose. A visitor who reads "tea and
  // coffee are free" and walks over expecting it has been misled by us, not
  // by the shop, so this line must never be written in the present tense
  // again. It survives only because the board is a dated record of what was
  // chalked that morning.
  headline: {
    bn: 'উদ্বোধনের দিন চা ও কফি বিনামূল্যে দেওয়া হয়েছিল — শুধু সেই একটি দিনই।',
    en: 'Tea and coffee were free on the opening day. That one day only.',
  },

  // The board is a record of the inauguration, not a live offer.
  occasion: false,

  items: [
    {
      bn: 'খাসির চর্বির ঘুগনি',
      en: 'Ghugni cooked in mutton fat',
      // Two sizes, so `price` is a list rather than a number.
      sizes: [
        { bn: 'ছোট', en: 'Small', price: 15 },
        { bn: 'বড়', en: 'Large', price: 30 },
      ],
      bn_note: 'রবিবারের যত্নে রাঁধা, রোজকার দামে।',
      en_note: 'Sunday cooking at a weekday price. Dried peas, slow, and finished in mutton fat.',
    },
    {
      bn: 'চিকেন মোমো',
      en: 'Chicken momo',
      price: 50,
      pieces: 5,
    },
    {
      bn: 'মাটন মোমো',
      en: 'Mutton momo',
      price: 90,
      pieces: 5,
    },
  ],

  // The photograph of the actual board. Shown beside the transcription, so a
  // reader can check the site against the chalk. If the shop stops sending
  // photographs, set this to null rather than leaving a stale one up.
  photo: 'assets/img/slate.jpg',
};
