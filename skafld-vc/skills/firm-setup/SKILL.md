---
name: firm-setup
description: Set up SkaFld VC for this person with /skafld-vc:setup - the brand the exports use (Word, PDF, decks, Excel) and, optionally, the firm profile the agents read when no platform is connected (name, thesis and mandate, cheque range, decision format, board seats, what the firm brings founders). Run again to change any part. Use for /skafld-vc:setup, when someone asks to change the look, logo, colours or fonts of the files, to set or change their thesis, cheque size or firm details, or when an agent or export says nothing is set up yet.
---

# Setup

One command sets up SkaFld VC for a person: the brand their files use and, if they want, a firm profile the agents read instead of asking each time. Run it in the conversation, not as a subagent. Pass `project_dir`, the absolute path of the folder you are working in, to every setup tool.

## 1. Where things stand

Call `setup_status`.

- **`first_run` is true** (nothing saved): say in one line what setup does (the look of their files, then optionally their firm's details so the agents stop asking), and go to section 2.
- **Something is saved**: show a short summary (brand name and colours; the firm name, thesis in one line, cheque range and decision format if a profile exists, or "no firm profile"). Then list what they can change, from `can_change`, as numbered options (use the question tool if you have one, with multiple selection), and do only the parts they pick: the brand parts with section 2's steps, the firm parts with section 3's. Nothing else changes.

## 2. The brand

1. **Where things stand.** `setup_status` already shows the current brand; on a first run go straight to the choice.
2. **One choice.** Ask one question: keep the SkaFld VC look, or use their firm's brand? Use the question tool if you have one, with two options: "Keep the SkaFld default" and "Use my firm's brand (recommended if you send files outside)".
   - **Default:** call `use_default_brand`, say in one line that they can run `/skafld-vc:setup` again any time to change it, and on a first run go on to section 3.
3. **Their brand, the easiest way first.** Ask for the firm's website. Say that a logo file or brand guide works too, and so does describing it. Take whatever they give; combine them if they give more than one.
   - **Website:** call `inspect_website`. Open each logo file it returns (they are PNGs) and pick the one that is the firm's logo, not a partner's or a product shot. If none is right, ask for a logo file.
   - **Files:** a logo (PNG, JPEG or SVG; SVG is best) is passed to `save_brand` by path. For a brand guide (PDF or image), read it yourself for the hex colours, font names and logo rules.
   - **Described:** turn words into values ("deep navy and gold" becomes an ink of #14213D and an accent of #C9A227). Offer two options if the description is loose.
4. **Confirm in one message.** Show the name, the accent and text colours as hex, the heading and body fonts, and which logo you will use, and ask them to confirm or correct. Choose sensibly so they rarely have to correct anything:
   - **Accent:** the colour of their buttons, links and highlights, not a background tint. **Ink:** their near-black text colour.
   - **Fonts:** their own, if it is on Google Fonts or bundled (Manrope, Inter, DM Sans, Libre Caslon Text, Antonio). If their font is commercial (not on Google Fonts), say so and propose the closest free match. Examples: a geometric sans like Circular or Gilroy becomes Manrope or DM Sans; a neutral sans like Helvetica or Söhne becomes Inter; a serif like Tiempos becomes Libre Caslon Text or Fraunces. They can add the font files later if they hold a licence.
   - **Label:** usually the body font at a heavier weight.
5. **Save.** Call `save_brand`. The scope is `user` (every project) unless they say the brand is for this project or client only, which is `project`. Read its `notes` aloud if any matter (a font that could not be downloaded, a white logo made for dark slides).
6. **Preview.** (Then, on a first run, section 3.) Call `preview_brand` and give them the files: a sample report (PDF), deck (PDF), request list (Excel) and Word document. Open the report PDF yourself to check the logo and colours read well. Offer one round of adjustments (a different accent, a different logo), then save again.

When only one brand part is being changed (colours, fonts, logo, footer), call `brand_status` for the current values, change that part and pass everything else unchanged to `save_brand`, after the person confirms.

## 3. The firm profile (optional)

After the brand on a first run, ask once: "Do you want to save your firm's details, so the agents stop asking for your thesis and cheque size? It takes two minutes; you can skip it." If they skip, stop: every agent keeps working from what they tell it and their documents, as before.

If they go ahead, collect it in at most three short messages, suggesting values from what you already know (the website you read for the brand, the documents in the folder) so they mostly confirm:

1. **The firm**: `name`, `short_name`, `description` (who they are and what they back, one or two sentences), `decision_format` (`committee_memo` when an investment committee decides on a memo, `partner_screen` when a partner decides on the Screening, `solo` for one investor) and `board_seats`.
2. **The thesis and mandate**: `thesis` in their words; `mandate` with `sectors`, `stages`, `geographies` and two or three `super_priority` must-haves; `check_range_usd` (whole dollars, min and max) and, if they know it, `fund_size_usd` (for the fund-returner line). A fuller thesis with a why-now, pillars and a review date can go in `thesis_detail`, in the `skafld-vc:thesis-fit` skill's thesis.json shape; offer it only if they want Sourcing to use it.
3. **What the firm brings founders**: `network_fit` as a short label and a description (for example "Operator bench: partners who ran B2B sales teams, who take the first customer calls").

Show the values once, ask them to confirm or correct, then call `save_profile` with only the confirmed fields. For a change, pass only the fields being changed; `clear` removes fields and `reset: true` deletes the profile.

## Rules

- Save nothing until the person confirms.
- Only read the website they named. Never guess a site from a firm's name without asking.
- With a platform connected, the firm's platform brand is used for its own documents automatically. This setup is for the person's own files.
- Keep every message short: one question at a time, values as a small list.
- Save nothing until the person confirms.
- The profile is the person's own and stays on their machine (the plugin's data folder); it is never sent anywhere. With a platform connected, the platform's house profile from `whoami` wins, and this profile is not read.
- A project's own `thesis.json` or `thesis.md` overrides the profile's thesis for that project, so someone running several theses keeps one per folder.
- Never invent profile values: a field the person does not give stays out, and the agents treat it as not set.
