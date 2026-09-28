---
name: document-export
description: Export a deliverable, a package or any answer as a branded Word document, PDF, PowerPoint deck, PDF deck, (for a Diligence plan) an Excel request list or tracker, or (for founder feedback) the founder copy. Use when someone asks for a file (Word, docx, PDF, slides, deck, PowerPoint, pptx, Excel, xlsx) or a version to send or present. Runs locally in Claude Code and Claude Desktop with nothing to install.
user-invocable: false
---

# Document export

`export_document` writes one file in `./skafld-vc/` in the brand the person chose. It uses the bundled exporter: pure JavaScript with the fonts included, and no Word, LibreOffice, Python or browser needed.

## Formats

| Ask                                  | `format`      | What it makes                                                                                                          |
| ------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Word, docx, "an editable report"     | `docx`        | Cover, numbered sections, tables, sources; brand fonts embedded                                                        |
| PDF, "to send"                       | `pdf`         | The same report as a PDF                                                                                               |
| Slides, deck, PowerPoint             | `pptx`        | 16:9 editable deck: title, statements, key numbers, tables                                                             |
| "Deck as PDF", "to present or share" | `deck_pdf`    | The same deck as a PDF, exact everywhere                                                                               |
| Excel for a Diligence plan           | `xlsx`        | `audience: "founder"`: the request list to send (see `skafld-vc:diligence-requests`); `"team"`: the internal tracker   |
| Founder feedback to send             | `docx`, `pdf` | `audience: "founder"`: the founder copy, the note and nothing internal; `"team"` (the default): the brief and the note |

The team tracker carries the Diligence findings, gap priority and evidence, and who asked for each data-room document and when it was requested and received; the founder request list never does. A founder feedback deliverable has no deck, and its founder copy is refused until `body.disclosureCheck.passed` is true: fix the lines that failed, then export again.

When someone asks for "a deck" without a format, make `pptx` and offer `deck_pdf`. When they want to send a deck to people outside the firm, make `deck_pdf`: it looks the same on every machine.

## Sources

- **A deliverable written this session:** pass its file name as `file` (for example `"harbor-robotics-ic-memo-2026-09-28.json"`, returned by `render_deliverable`). A package from `render_package` works the same way, for Word and PDF.
- **A deliverable you hold as JSON:** pass it as `deliverable`.
- **Any other answer** (a market map, a portfolio update, meeting notes): write it as Markdown and pass `markdown` with a `title`. Use `#` for the title, `##` for each section or slide, lists, tables, and `>` for a statement slide. Each `##` becomes a slide in a deck.

Always pass `project_dir`: the absolute path of the folder you are working in.

## Brand

Leave `brand` out and the file uses, in order: a `brand/` folder in the project, the brand the person saved with `/skafld-vc:setup`, or the SkaFld VC default. With a platform connected, pass `whoami`'s `house.brand` as `brand` for the firm's own documents. Pass `house` as `house.short_name` so reports say "<house> company".

The first time a file comes out in the default brand, the tool says no brand has been chosen. Ask the person once, in one line: keep the SkaFld look, or set up their firm's brand (it takes a minute, starting from their website). Setting it up is `/skafld-vc:setup`. If they keep the default, call `use_default_brand` so nobody asks again. If you are a subagent and cannot ask, put that one line at the end of your final message.

## Then

Give the person the path of each file and say what it is: "the request list to send", "the internal tracker", "the committee deck". Everything a deliverable contains is a draft for review; the files say so.
