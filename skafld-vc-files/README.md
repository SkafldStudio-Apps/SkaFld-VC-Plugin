# SkaFld VC Files

**Optional.** SkaFld VC works without this add-on: in Claude Desktop, Cowork and claude.ai it makes Word, PowerPoint, Excel and PDF files with Claude's own document tools, in the look your Claude is set up with, and it needs nothing installed.

Add SkaFld VC Files when you want, on a computer with **Node.js 18 or later**:

- **SkaFld VC's own files:** every Screening report, Diligence plan, IC memo, Sourcing longlist and Portfolio review as a self-contained HTML file in `./skafld-vc/`, and on request as Word, PDF, a PowerPoint deck, a PDF deck or an Excel request list, always with the same layout.
- **Your brand from your website:** `/skafld-vc:setup` reads your site for your logo, colours and fonts and uses them on every file.
- **A firm profile saved across projects**, instead of one per folder.
- **Exact rubric scoring on your computer:** the same arithmetic the SkaFld VC platform uses.

## Install

```
/plugin install skafld-vc-files@<marketplace>
```

It installs SkaFld VC with it. Node.js must be on your PATH; check with `node --version`.

Everything runs on your computer: the two local servers write only inside the folder you are working in, and the only network call is setup reading the website you give it.
