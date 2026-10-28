---
name: document-export
description: Exports a deliverable, a package or any answer as a Word document, PDF, PowerPoint or PDF deck, or an Excel request list or tracker, unbranded unless a brand is configured, with the deliverables server where Node.js is installed or with Claude's own document tools without it. Use when someone asks for a file (Word, docx, PDF, slides, deck, pptx, Excel, xlsx) or a version to send or present.
user-invocable: false
---

# Document export

Where the plugin's local `deliverables` server is running (it needs Node.js 18 or later on the person's computer), `deliverables:export_document` writes one file in `./skafld-vc/`: pure JavaScript with the fonts included, and no Word, LibreOffice, Python or browser needed. Files are unbranded (no logo, no firm or product name, neutral greys) unless a brand is configured. Without it, make the same file with Claude's own document tools, as in the last section. What goes in each file, and what never goes to a founder, is the same either way.

## Formats

| Ask                                  | `format`      | What it makes                                                                                                          |
| ------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Word, docx, "an editable report"     | `docx`        | Cover, numbered sections, tables, sources; fonts embedded                                                              |
| PDF, "to send"                       | `pdf`         | The same report as a PDF                                                                                               |
| Slides, deck, PowerPoint             | `pptx`        | 16:9 editable deck: title, statements, key numbers, tables                                                             |
| "Deck as PDF", "to present or share" | `deck_pdf`    | The same deck as a PDF, exact everywhere                                                                               |
| Excel for a Diligence plan           | `xlsx`        | `audience: "founder"`: the request list to send (see `skafld-vc:diligence-requests`); `"team"`: the internal tracker   |
| Founder feedback to send             | `docx`, `pdf` | `audience: "founder"`: the founder copy, the note and nothing internal; `"team"` (the default): the brief and the note |

The team tracker carries the Diligence findings, gap priority and evidence, and who asked for each data-room document and when it was requested and received; the founder request list never does. A founder feedback deliverable has no deck, and its founder copy is refused until `body.disclosureCheck.passed` is true: fix the lines that failed, then export again.

When someone asks for "a deck" without a format, make `pptx` and offer `deck_pdf`. When they want to send a deck to people outside the firm, make `deck_pdf`: it looks the same on every machine.

## Sources

- **A deliverable written this session:** pass its file name as `file` (for example `"harbor-robotics-ic-memo-2026-09-28.json"`, returned by `deliverables:render_deliverable`). A package from `deliverables:render_package` works the same way, for Word and PDF.
- **A deliverable you hold as JSON:** pass it as `deliverable`.
- **Any other answer** (a market map, a portfolio update, meeting notes): write it as Markdown and pass `markdown` with a `title`. Use `#` for the title, `##` for each section or slide, lists, tables, and `>` for a statement slide. Each `##` becomes a slide in a deck.

Always pass `project_dir`: the absolute path of the folder you are working in.

## Brand (deliverables server)

Files are unbranded by default: no logo, no firm or product name, neutral greys and one neutral font. A brand applies only when one is configured, in this order:

1. the platform's brand: with a platform connected, pass `skafld-vc:whoami`'s `brand.url` as `brand` (the server downloads it once and keeps it; if `brand` is null, leave `brand` out);
2. a brand folder you name as `brand` (a folder inside the project with a `brand.json`);
3. a `brand/` folder in the project;
4. the brand the person saved with `/skafld-vc:setup`.

With none of these the file is unbranded. If the platform's brand cannot be downloaded, the file still comes out with the next one in the order (or unbranded) and the reply has a note saying why; pass the note on in one line. Pass `house` as `house.short_name` so reports say "<house> company".

Off a platform, the first time a file comes out unbranded, the tool says no brand is configured. Ask the person once, in one line: keep files unbranded, or set up their firm's brand (it takes a minute, starting from their website). Setting it up is `/skafld-vc:setup`. If they keep files unbranded, call `setup:use_default_brand` so nobody asks again. If you are a subagent and cannot ask, put that one line at the end of your final message.

## Without the deliverables server

Where `deliverables:export_document` is not available, use this Claude's own way of making files: its Word, PowerPoint, Excel and PDF skills where it has them, or code execution. Do not look for or run the server's code. The look is whatever this Claude and the person's own setup give (their brand guidelines if Claude has them, else plain and unbranded); do not add a SkaFld look or ask about a brand.

- **Content** is the deliverable's: the title, "Draft for staff review" on the first page, the verdict or summary, `body.document` section by section, the tables from the structured fields, and the sources with their dates. A deck is one slide per `##` section, with the verdict and key numbers first.
- **The founder request list (`xlsx`, `audience: "founder"`)** comes from `body.requests` only, grouped by area with the required ones first, and the same columns as the deliverables server's: #, Area, Request, Details, Priority, Due, then Status (Not started, In progress, Provided, Not applicable), Your response and File or link for the company to fill. Never add the findings, gap priority, evidence or anything internal. Add a first sheet with the company, the date and who to write back to.
- **The team tracker (`audience: "team"`)** adds the findings, gap priority and evidence, and who asked for each document and when it was requested and received.
- **Founder feedback:** the founder copy is the note alone, and only once `body.disclosureCheck.passed` is true.
- Save to `./skafld-vc/<company>-<type>-<date>.<ext>` where you can write files, else offer it as a download.

Say once per conversation, in one line, that with Node.js 18 or later installed SkaFld VC makes these files itself, in the firm's own brand once one is set up.

## Then

Give the person the path of each file and say what it is: "the request list to send", "the internal tracker", "the committee deck". Everything a deliverable contains is a draft for review; the files say so.
