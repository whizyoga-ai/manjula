/* ==========================================================================
   THE SLATE — আজকের মেনু

   This is the one file the shop edits. It mirrors the real chalkboard that
   stands on the pavement outside 17/A Banerjee Para Street.

   THE RULE THIS FILE EXISTS TO ENFORCE:
   the website never claims to know today's specials.

   `date` is the day the board was written, YYYY-MM-DD. The page compares it
   to today in Kolkata time. Same day, and the board is shown as today's.
   Different day, and the page says so plainly and keeps the phone number in
   front of the reader.

   `date: null` means the photograph is undated — which is the honest state
   right now. The board below is transcribed from a real photograph of the
   real slate, but nobody wrote down when it was taken, so the page will not
   pretend. Set a date the moment one is known and the board can be today's.

   A restaurant site that quietly serves last week's specials as though they
   were today's is lying in a small way every day. The cost of admitting it is
   one honest sentence; the cost of guessing is a customer who walks twenty
   minutes for a ghugni that was finished on Tuesday.

   TO UPDATE THE BOARD:
     1. set `date` to today
     2. rewrite `items`
     3. replace `photo` with a new picture of the board
     4. commit
   Nothing else. No build step, no admin login, no CMS.
   ========================================================================== */

'use strict';

const SLATE = {
  // Undated: photographed, but nobody recorded the day.
  date: null,

  headline: {
    bn: 'বোর্ডে যা লেখা ছিল — দাম কার্ডে।',
    en: 'What was chalked on the board. Prices are on the card.',
  },

  occasion: false,

  // Six items, exactly as the board lists them, and no prices — the board
  // carries none. Inventing prices to fill the column would be inventing.
  items: [
    { bn: 'চর্বি ঘুগনি',          en: 'Mutton fat ghugni' },
    { bn: 'চিকেন স্টিম মোমো',    en: 'Chicken steam momo' },
    { bn: 'চিকেন ফ্রাইড মোমো',   en: 'Chicken fried momo' },
    { bn: 'মাটন স্টিম মোমো',     en: 'Mutton steam momo' },
    { bn: 'মাটন ফ্রাইড মোমো',    en: 'Mutton fried momo' },
    { bn: 'ম্যাগি',               en: 'Maggie' },
  ],

  // The board itself, so a reader can check the page against the chalk.
  photo: 'assets/img/shop/slate-lit.jpg',
};
