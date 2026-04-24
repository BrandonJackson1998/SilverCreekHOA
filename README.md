# Silver Creek Townhomes HOA Website

> Silver Creek is a 162-unit townhome community in St. George, UT.

---

## Quick Links

| Section | Description |
|---------|-------------|
| [About](pages/01%20-%20About/) | Welcome info, FAQ, community contact |
| [Management](pages/02%20-%20Management/) | Board of trustees, committees, budget, insurance |
| [Meetings](pages/03%20-%20Meetings/) | Board meeting dates, agendas & minutes |
| [Governance](pages/04%20-%20Governance%20Documents/) | CC&Rs, bylaws, CCR amendments, resolutions, rules |
| [Calendar](pages/05%20-%20Calendar/) | Annual meeting & community events |
| [Newsletters](pages/06%20-%20Newsletters/) | Monthly HOA newsletters |
| [Real Estate](pages/07%20-%20Realtor%20Info/) | Agent & closing provider resources |
| [Forms](pages/08%20-%20Forms/) | ARA requests, clubhouse rental, concerns, estate sale, board candidacy |
| [Resources](pages/09%20-%20Resources/) | Additional community resources |
| [Things to Do](pages/10%20-%20Things%20to%20Do/) | Local attractions |

**HOA Contact:** SilvercreekBoardMembers@gmail.com | (435) 414-1817

---

## Docs & Media

All supporting PDFs, images, and media are stored in `HOA-Documents/`:

- `Agendas/` & `Minutes/` — monthly board meeting records
- `Resolutions/` — board resolutions (security, flag rules, architectural standards, etc.)
- `Governing-Documents/` — STA articles, bylaws, CC&Rs & amendments
- `Financial/` — budget summaries
- `Insurance/` — property & liability insurance certificates
- `Forms/` — downloadable PDF forms
- `Newsletters/` — monthly community newsletters
- `Website-Image-Carousel/` — clubhouse & amenity photos

### Syncing from Google Drive

Ensure `rclone` is installed and a Google Cloud config profile has been created (via `rclone config`) before running:

```bash
rclone sync "gdrive:¹Website-HOA-Docs" HOA-Documents --drive-shared-with-me --progress
```

```bash
rclone sync "gdrive:¹Website-HOA-Docs" HOA-Documents --drive-shared-with-me --progress
```

---

## Tech Stack

| Technology   | Purpose        |
|--------------|----------------|
| Jekyll       | Static site generator |
| GitHub Pages | Hosting & CI/CD |

The site syncs PDF documents from Google Drive weekly via `rclone`.

---

## Setup

```bash
bundle install
bundle exec jekyll serve
```

---

## HOA Details

- **Location:** 1732 W 540 N, St. George, UT 84770
- **Dues:** $250/month (water, yard maintenance, facility use, structural insurance)
- **Management:** Self-managed (no third-party property manager)
- **Resident Portal:** [PayHOA](https://app.payhoa.com/auth/login?uri=%252Fapp%252Forganization%252Fdashboard)
