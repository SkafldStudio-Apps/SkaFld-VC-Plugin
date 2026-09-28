---
name: brand-setup
description: Set up the brand the exports use (Word, PDF, decks, Excel): keep the SkaFld VC default, or tailor it to the firm from its website, a logo or brand guide, or a description. Use for /skafld-vc:brand, when someone asks to change the look, logo, colours or fonts of the files, or when an export says no brand has been chosen and the person wants their own.
---

# Brand setup

The goal is a good-looking brand in about a minute, with one decision from the person and one confirmation. Run it in the conversation, not as a subagent: it asks the person twice at most.

## Steps

1. **Where things stand.** Call `brand_status` (with `project_dir`). If a brand is already set, say which one in a line and ask what they want to change.
2. **One choice.** Ask one question: keep the SkaFld VC look, or use their firm's brand? Use the question tool if you have one, with two options: "Keep the SkaFld default" and "Use my firm's brand (recommended if you send files outside)".
   - **Default:** call `use_default_brand` and stop with one line: they can run `/skafld-vc:brand` again any time.
3. **Their brand, the easiest way first.** Ask for the firm's website. Say that a logo file or brand guide works too, and so does describing it. Take whatever they give; combine them if they give more than one.
   - **Website:** call `inspect_website`. Open each logo file it returns (they are PNGs) and pick the one that is the firm's logo, not a partner's or a product shot. If none is right, ask for a logo file.
   - **Files:** a logo (PNG, JPEG or SVG; SVG is best) is passed to `save_brand` by path. For a brand guide (PDF or image), read it yourself for the hex colours, font names and logo rules.
   - **Described:** turn words into values ("deep navy and gold" becomes an ink of #14213D and an accent of #C9A227). Offer two options if the description is loose.
4. **Confirm in one message.** Show the name, the accent and text colours as hex, the heading and body fonts, and which logo you will use, and ask them to confirm or correct. Choose sensibly so they rarely have to correct anything:
   - **Accent:** the colour of their buttons, links and highlights, not a background tint. **Ink:** their near-black text colour.
   - **Fonts:** their own, if it is on Google Fonts or bundled (Manrope, Inter, DM Sans, Libre Caslon Text, Antonio). If their font is commercial (not on Google Fonts), say so and propose the closest free match. Examples: a geometric sans like Circular or Gilroy becomes Manrope or DM Sans; a neutral sans like Helvetica or Söhne becomes Inter; a serif like Tiempos becomes Libre Caslon Text or Fraunces. They can add the font files later if they hold a licence.
   - **Label:** usually the body font at a heavier weight.
5. **Save.** Call `save_brand`. The scope is `user` (every project) unless they say the brand is for this project or client only, which is `project`. Read its `notes` aloud if any matter (a font that could not be downloaded, a white logo made for dark slides).
6. **Preview.** Call `preview_brand` and give them the files: a sample report (PDF), deck (PDF), request list (Excel) and Word document. Open the report PDF yourself to check the logo and colours read well. Offer one round of adjustments (a different accent, a different logo), then save again.

## Rules

- Save nothing until the person confirms.
- Only read the website they named. Never guess a site from a firm's name without asking.
- With a platform connected, the firm's platform brand is used for its own documents automatically. This setup is for the person's own files.
- Keep every message short: one question at a time, values as a small list.
