# PostHog post-wizard report

The wizard has completed a PostHog analytics integration for this React/Vite personal portfolio and Casper PM Challenge site. It installed `posthog-js`, initialized it via a shared utility module, and instrumented 12 events across 6 components — covering the Casper password gate, deck navigation, document opens, and main portfolio interactions. No existing code was restructured; all PostHog calls were added minimally alongside existing logic.

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `casper access granted` | User successfully unlocked the Casper PM Challenge section. | `src/pages/Casper.tsx` |
| `casper access denied` | User submitted an incorrect password. | `src/components/casper/PasswordGate.tsx` |
| `casper hub card clicked` | User clicked a destination card on the Casper hub. | `src/components/casper/Hub.tsx` |
| `casper executive pdf opened` | User opened the executive PDF companion from the hub. | `src/components/casper/Hub.tsx` |
| `casper walkthrough opened` | User navigated to the video walkthrough from the hub. | `src/components/casper/Hub.tsx` |
| `casper slide navigated` | User navigated to a different slide in the deck (includes `slide_index`, `slide_id`, `slide_title`, `slide_section`). | `src/components/casper/CasperDeck.tsx` |
| `casper deck completed` | User reached the final slide of the deck. | `src/components/casper/CasperDeck.tsx` |
| `casper pdf exported` | User triggered the print/export PDF action. | `src/components/casper/CasperDeck.tsx` |
| `casper toc opened` | User opened the table of contents panel in the deck. | `src/components/casper/CasperDeck.tsx` |
| `casper section jumped` | User jumped to a section using the breadcrumb navigation (includes `section`, `section_label`, `slide_index`). | `src/components/casper/CasperDeck.tsx` |
| `social link clicked` | User clicked a social/contact link with `platform` property (`linkedin`, `github`, `email`). | `src/components/Hero.tsx` |
| `project link clicked` | User clicked a project link with `project` and `url` properties. | `src/components/Projects.tsx` |

## New files

| File | Purpose |
|---|---|
| `src/lib/posthog.ts` | PostHog singleton — initializes `posthog-js` from env vars and exports the client. |
| `.env` | Holds `VITE_PUBLIC_POSTHOG_KEY` and `VITE_PUBLIC_POSTHOG_HOST`. |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard:** [Analytics basics (wizard)](https://us.posthog.com/project/502068/dashboard/1812045)
- **Casper Access Funnel:** [dN9w6I0Q](https://us.posthog.com/project/502068/insights/dN9w6I0Q)
- **Casper Deck Engagement:** [Vqi7hv9L](https://us.posthog.com/project/502068/insights/Vqi7hv9L)
- **Casper Access: Granted vs Denied:** [tbfDTaWD](https://us.posthog.com/project/502068/insights/tbfDTaWD)
- **Document & Content Opens:** [sSRTcwYz](https://us.posthog.com/project/502068/insights/sSRTcwYz)
- **Portfolio Engagement:** [Yn1PsLA8](https://us.posthog.com/project/502068/insights/Yn1PsLA8)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `VITE_PUBLIC_POSTHOG_KEY` and `VITE_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-javascript_node/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
