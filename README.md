# Silver Creek Townhomes HOA Website

> Silver Creek is a 162-unit townhome community in St. George, UT.

---

## File Structure

 ```
   ├── .github/             # GitHub Actions (CI/CD)
   ├── HOA-Documents/       # Synced Google Drive docs
   │   ├── Agendas/
   │   ├── Documents/       
   │   ├── Financial/
   │   ├── Forms/
   │   ├── Governing-Documents/
   │   ├── Insurance/
   │   ├── Minutes/
   │   ├── Newsletters/
   │   └── Website-Image-Carousel/
   ├── _config.yml          # Jekyll configuration
   ├── _layouts/            # Jekyll page templates
   ├── css/                 # Custom styles
   ├── js/                  # Main site logic
   ├── pages/               # Website Markdown pages
   ├── Gemfile              # Ruby dependencies
   └── LICENSE
 ```

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
