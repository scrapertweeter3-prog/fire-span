# Fire Span

A tiny FIRE survival tycoon that runs in the browser. You retire on a number,
pick a withdrawal rate, and then draw 30 shuffled years of market returns.
Cards arrive out of order, so the same average return can fund a retirement
or bury one depending on the sequence it shows up in. That is sequence of
returns risk, and it is the reason a flat "4% is safe" rule is a starting
point rather than an answer.

## How it works

- Enter a starting portfolio and a withdrawal rate (3% to 6% of the starting
  balance).
- Each year, draw one card from the deck you chose: a 100% stock deck
  (sharper swings both ways) or a 50/50 deck (smaller moves, less upside).
- The market move lands first, then the withdrawal comes out. Watch the
  balance through the early years; a 25% or 34% draw in years 1 through 5
  does more damage than the same card in year 25.
- Stuck? Up to 3 part-time years skip the withdrawal and add $20,000, the
  bridge-income lever real early retirees use.

## The math behind the deck

The withdrawal-rate benchmark traces to William Bengen's 1994 study of
30-year retirements and the 1998 Trinity study, which found 4 to 5 percent
survived most 30-year stretches of US stock and bond history. Both test
historical sequences; neither can test a sequence that has not happened yet,
which is exactly the gap this game makes you feel.

- [William Bengen's 1994 study](https://en.wikipedia.org/wiki/William_Bengen)
- [The Trinity study](https://en.wikipedia.org/wiki/Trinity_study)

Fire Span is the playable companion to the sequence-risk and withdrawal-rate
math covered on [Firenomics](https://firenomics.com).

MIT licensed. No tracking, no build step, one HTML file and one JS file.
