# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **High school Science Olympiad coaches and team captains** (Division C), mostly from PA/NJ/the Northeast but also national. They come to check the date, the registration timeline, the info document, waivers, and past results/tests.
- **Competitors and parents** checking tournament-day logistics.
- **Sponsors and Penn departments** evaluating whether to support the tournament.
- **Penn undergraduates** looking at the board or applying to volunteer with Urban Initiative.

## Product Purpose
Website of Science Olympiad at the University of Pennsylvania (SOUP), a student org that runs the annual Penn Invitational (Division C) and the Philadelphia Urban Initiative mentoring program. The site announces the next Invitational, sends teams to registration, hosts tournament info and waivers, archives past results/tests, introduces the exec board, and credits sponsors. Success = teams find the date and register, and the org reads as a credible, fun, alumni-run tournament.

## Positioning
The only Science Olympiad invitational whose acronym is SOUP: a student-run, alumni-run Ivy invitational with a long-running soup in-joke (board members list their "soup of choice"; the 10th-anniversary mark is a soup bowl).

## Operating Context
- Jekyll site on GitHub Pages at pennscienceolympiad.org (CNAME). Content lives in HTML pages plus `_data/*.json` (team, faq, hotels, events). Bootstrap 4 + jQuery are currently loaded.
- Registration runs through an external Google Form; scoring on Scilympiad; results on Duosmium; tests/keys in Google Drive.
- 11th Invitational: Saturday, February 13, 2027. Registration timeline: Sept 23 (PA teams), Sept 26 (all teams), closes Oct 9.

## Capabilities and Constraints
- Static site only; no build step beyond Jekyll/Sass that GitHub Pages runs.
- The board changes every year; team data must stay editable in `_data/team.json` with photos in `img/team/<year>/`.
- Team cards show photo, name, and position only (2026-2027 decision). Members without photos get an illustrated placeholder that's replaced by dropping in a photo.
- 2026-2027 members without headshots: Cailyn Pan, Amy Luo, Richard Zhuang, Ray Ma (advisor).

## Brand Commitments
- The SOUP wordmark (`img/transparent-logo.png`) stays.
- **Colors must stay Science Olympiad at Penn red and blue** (Penn red `rgb(169,5,51)`, Penn blue `rgb(0,71,173)` family). Everything else (type, layout, motion, soup theming) is open, and the user asked for a bold "go wild" treatment.
- The stacked "SO / UP" LOVE-sculpture mark appears on the club quarter-zips; the 10th-anniversary soup-bowl illustration (`img/soup_10.png`) exists.
- Voice: friendly, a little punny, still credible to coaches.

## Evidence on Hand
- 2026-2027 headshots and group photos: `~/Documents/SOUP headshots!` (marble-wall portraits; group shots in a Penn hallway).
- Archive facts: 10th Invitational 2026, 67 teams, Montgomery HS (NJ) champion; 9th, 2025, 63 teams; 5th, 2021, 100 teams, virtual.
- Past sponsor logos in `sponsors_20xx/`.
- No testimonials or quotes exist. Don't make any up.

## Product Principles
1. The next tournament date and how to register always come first.
2. Soup is the joke that makes the site memorable. It must never hide facts coaches need.
3. Keep it student-made and warm, not corporate.
4. Yearly upkeep (board, dates, links) must stay a data edit, not a redesign.

## Accessibility & Inclusion
Readable contrast on all text; motion honors `prefers-reduced-motion`; site works on phones (coaches check on mobile).
