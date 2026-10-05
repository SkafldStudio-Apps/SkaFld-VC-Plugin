# The house profile: where it comes from

The house profile is the firm or network an agent or skill works for: its name, thesis, mandate, cheque range, decision format, board seats and network fit. This file is the one place that says where it comes from. Every SkaFld VC agent and skill that reads `house` resolves it in this order and uses the first source that exists.

## Resolution order

1. **The platform.** Where `skafld-vc:whoami` answers (the person's firm runs a SkaFld VC platform and has connected it with the SkaFld VC Platform add-on), or where you are the platform's own chat and your instructions give you the house profile, use that `house`. Load `skafld-vc-platform:platform-access` before the first platform call; it comes with the platform add-on. The saved firm profile is not read.
2. **The saved firm profile.** Without a platform, call `setup:get_profile` (the Files add-on). Where you have no such tool, read `skafld-vc/firm-profile.md` in the working folder, or a "SkaFld VC firm profile" block in your instructions or project files. The person saved it with `/skafld-vc:setup`. Name it as the source of every house value you use.
3. **The person.** Use what the person states in the conversation. If a firm detail would change the answer and none of the above gives it, ask for that detail, and mention once per conversation that `/skafld-vc:setup` saves it so they are not asked again.

A thesis file overrides only the saved profile: a `thesis.json` or `thesis.md` in the working folder is the thesis for that project, ahead of the saved profile's `thesis` and `thesis_detail`, but never ahead of the platform's `house.thesis`. So the full order for a thesis is platform, thesis file, saved profile, the person.

Where the person names a value for the deal in hand (the cheque for this round, for example), that value is used for this deal; the house profile gives the usual range around it.

## Fields

| Field                                              | Platform (`house` from `skafld-vc:whoami`) | Saved firm profile                                                |
| -------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| Name, short name                                   | `name`, `short_name`                       | `name`, `short_name`                                              |
| Thesis                                             | `thesis`                                   | `thesis`, and `thesis_detail` in the `skafld-vc:thesis-fit` shape |
| Mandate (sectors, stages, geographies, must-haves) | inside `thesis`                            | `mandate` (`sectors`, `stages`, `geographies`, `super_priority`)  |
| Cheque range                                       | `check_range_usd`                          | `check_range_usd`                                                 |
| Fund or allocation size                            | not carried; ask                           | `fund_size_usd` where given                                       |
| Decision format                                    | `decision_format`                          | `decision_format`                                                 |
| Board seats                                        | `board_seats`                              | `board_seats`                                                     |
| Network fit                                        | `network_fit` (`label`, `description`)     | `network_fit` (`label`, `description`)                            |

## Without a platform

- Do not mention the platform unless the person asks about it, and skip every platform call.
- The company is an outside company: nothing is saved to a platform, and there is no pipeline, portfolio or member data to read.
- No platform does not mean no research: use the research connectors the person has connected (Exa, Apollo and the rest) exactly as with a platform. Only a person's explicit request for no outside research turns research off.

## Rules

- Never invent a house value. A field none of the sources gives is not set: a deliverable writes `[TBD - not found in documents]` or "not provided" for it, and a criterion that depends on it is `not_assessed`.
- Never name a network the house profile or the person did not name.
- Say which source you used (platform, thesis file, saved profile, or the person) where the output names the house or its thesis.
