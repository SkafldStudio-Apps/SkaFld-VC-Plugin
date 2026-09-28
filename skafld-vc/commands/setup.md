---
description: Set up SkaFld VC - the look of your exported files (keep the SkaFld default or use your firm's brand) and, optionally, your firm's details and thesis so the agents stop asking. Run it again to change any part.
argument-hint: "[website, or what to change]"
---

Load the `skafld-vc:firm-setup` skill and follow it in this conversation, starting with `setup_status`. If the arguments name a website, use it for the brand (and to suggest the firm's details). If they name a change (a colour, the logo, the thesis, the cheque range), go straight to that part and change only it after confirming. Pass `project_dir`, the absolute path of the folder you are working in, to every setup tool.
