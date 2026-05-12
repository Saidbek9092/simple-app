# Sprint Plan — Simple App Transformation

> **Goal:** Transform the app into a highly interactive, modern, production-quality application with premium UX, animations, dashboard homepage, API aggregation, filtering/search, responsive design, accessibility, and scalable architecture.

> **Date:** 2026-05-12

---

## Application Audit Summary

### Current State

- Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript
- 4 routes: Home (CNA boilerplate), Posts, Users, Comments
- 3 BFF API routes proxying JSONPlaceholder (`/api/posts`, `/api/users`, `/api/comments`)
- i18n support (EN/ES), dark/light theme toggle
- Header with nav links, ThemeToggle, language switcher

### UX Weaknesses

- Homepage is default CNA boilerplate — no dashboard, no data
- Loading states are plain text — no skeletons or shimmer
- No search or filtering on any list page
- No detail pages — lists are dead-end, nothing is clickable
- No empty states when API returns 0 items
- No pagination — comments dumps 500 items at once
- No active nav indicator — can't tell which page you're on
- Header nav overflows on mobile

### Missing Interactivity

- No animations or transitions
- No staggered list animations
- Cards are not interactive (no click, expand, or navigate)
- No data relationships shown (post -> comments, user -> posts)

### Architecture Gaps

- No shared data-fetching hook (3 pages duplicate fetch/loading/error pattern)
- No API response caching
- No aggregation endpoint for dashboard stats
- BFF doesn't support query params (search, pagination)
- No reusable UI components (skeletons, search inputs, etc.)

---

## Milestone 1: Foundation & Shared Infrastructure

> Establish reusable components, hooks, and backend capabilities that all subsequent milestones depend on.

### Task 1.1 — Reusable UI Components Library

| Field              | Value                           |
| ------------------ | ------------------------------- |
| **Assigned Agent** | Frontend Agent                  |
| **Branch**         | `feature/ui-components-library` |
| **Status**         | Pending                         |

**Description:** Create shared components: `SkeletonCard`, `ErrorBanner`, `EmptyState`, `SearchInput`, `PageHeader`, `CardGrid`

**Acceptance Criteria:**

- [ ] All components support dark/light mode
- [ ] All components are i18n-compatible (accept translation keys or strings)
- [ ] Skeleton components match card dimensions of posts/users/comments
- [ ] Components are accessible (proper ARIA labels, keyboard focusable)
- [ ] `npm run build` and `npm run lint` pass

---

### Task 1.2 — Shared Data Fetching Hook

| Field              | Value                    |
| ------------------ | ------------------------ |
| **Assigned Agent** | Frontend Agent           |
| **Branch**         | `feature/use-fetch-hook` |
| **Status**         | Pending                  |

**Description:** Create a `useFetch<T>` hook that encapsulates the fetch/loading/error/retry pattern used across all pages

**Acceptance Criteria:**

- [ ] Hook returns `{ data, loading, error, refetch }`
- [ ] Supports generic typing `useFetch<Post[]>("/api/posts")`
- [ ] Handles error states with typed error messages
- [ ] Existing pages (posts, users, comments) refactored to use the hook
- [ ] No behavior change in existing pages after refactor

---

### Task 1.3 — Backend API Enhancement (Search, Pagination, Stats)

| Field              | Value                      |
| ------------------ | -------------------------- |
| **Assigned Agent** | Backend Agent              |
| **Branch**         | `feature/api-enhancements` |
| **Status**         | Pending                    |

**Description:** Add query param support to existing BFF routes and create a new `/api/stats` aggregation endpoint

**Acceptance Criteria:**

- [ ] `GET /api/posts?search=foo` filters posts by title/body
- [ ] `GET /api/users?search=foo` filters users by name/email
- [ ] `GET /api/comments?search=foo` filters comments by author/body
- [ ] All endpoints support `?page=1&limit=10` with paginated response `{ data, total, page, totalPages }`
- [ ] `GET /api/stats` returns `{ totalPosts, totalUsers, totalComments, recentPosts, topCommenters }`
- [ ] Error handling preserved, TypeScript types updated
- [ ] `npm run build` passes

---

### Task 1.4 — QA Validation: Milestone 1

| Field              | Value                                         |
| ------------------ | --------------------------------------------- |
| **Assigned Agent** | QA Agent                                      |
| **Branch**         | _(tests against merged milestone 1 branches)_ |
| **Status**         | Pending                                       |

**Acceptance Criteria:**

- [ ] All shared components render correctly in light/dark mode
- [ ] `useFetch` hook works with all three API endpoints
- [ ] Search and pagination query params return correct results
- [ ] `/api/stats` returns valid aggregated data
- [ ] No TypeScript errors, no console errors
- [ ] Build succeeds

---

## Milestone 2: Interactive Dashboard Homepage

> Replace the boilerplate homepage with a data-driven dashboard.

### Task 2.1 — Dashboard Layout & Stat Cards

| Field              | Value                        |
| ------------------ | ---------------------------- |
| **Assigned Agent** | Frontend Agent               |
| **Branch**         | `feature/dashboard-homepage` |
| **Status**         | Pending                      |

**Description:** Build dashboard homepage with animated stat cards (Total Posts, Total Users, Total Comments), recent posts list, and top commenters widget. Uses `/api/stats` endpoint.

**Acceptance Criteria:**

- [ ] 3 stat cards with count-up animation on load
- [ ] Recent posts section showing 5 latest posts (clickable, links to posts page)
- [ ] Top commenters widget showing top 5 by comment count
- [ ] Skeleton loading states for all widgets
- [ ] Fully responsive: single column on mobile, multi-column on desktop
- [ ] Dark/light mode consistent
- [ ] i18n: all labels translated (en/es)
- [ ] Staggered fade-in animation on card load

---

### Task 2.2 — Active Nav Indicator & Mobile Nav

| Field              | Value                       |
| ------------------ | --------------------------- |
| **Assigned Agent** | Frontend Agent              |
| **Branch**         | `feature/header-navigation` |
| **Status**         | Pending                     |

**Description:** Add active route highlighting to Header nav links. Add responsive hamburger menu for mobile.

**Acceptance Criteria:**

- [ ] Active page link has visual indicator (underline or background)
- [ ] On mobile (<640px), nav collapses into hamburger menu
- [ ] Menu opens/closes with smooth animation
- [ ] Focus trap when mobile menu is open
- [ ] All existing nav functionality preserved

---

### Task 2.3 — QA Validation: Milestone 2

| Field              | Value                                         |
| ------------------ | --------------------------------------------- |
| **Assigned Agent** | QA Agent                                      |
| **Branch**         | _(tests against merged milestone 2 branches)_ |
| **Status**         | Pending                                       |

**Acceptance Criteria:**

- [ ] Dashboard loads and displays correct stats from API
- [ ] Stat cards animate on initial load
- [ ] All dashboard widgets show skeleton during loading
- [ ] Mobile hamburger menu opens/closes correctly
- [ ] Active nav indicator reflects current route
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Dark/light mode works across all new components
- [ ] i18n toggles correctly on dashboard

---

## Milestone 3: Search, Filtering & Pagination

> Make list pages interactive and performant.

### Task 3.1 — Posts Page: Search & Pagination

| Field              | Value                             |
| ------------------ | --------------------------------- |
| **Assigned Agent** | Frontend Agent                    |
| **Branch**         | `feature/posts-search-pagination` |
| **Status**         | Pending                           |

**Description:** Add search bar and pagination controls to Posts page using enhanced API endpoints

**Acceptance Criteria:**

- [ ] Search input with debounced filtering (300ms)
- [ ] Pagination controls (prev/next + page numbers)
- [ ] URL search params sync (`?search=foo&page=2`)
- [ ] Loading skeleton shown during search/page transitions
- [ ] Empty state shown when no results match search
- [ ] Keyboard accessible (Enter to search, arrow keys for pagination)

---

### Task 3.2 — Users Page: Search & Pagination

| Field              | Value                             |
| ------------------ | --------------------------------- |
| **Assigned Agent** | Frontend Agent                    |
| **Branch**         | `feature/users-search-pagination` |
| **Status**         | Pending                           |

**Description:** Add search bar and pagination to Users page

**Acceptance Criteria:**

- [ ] Same interaction pattern as Posts page (debounced search, pagination, URL sync)
- [ ] Search filters by user name or email
- [ ] Consistent UI with Posts page search/pagination components

---

### Task 3.3 — Comments Page: Search & Pagination

| Field              | Value                                |
| ------------------ | ------------------------------------ |
| **Assigned Agent** | Frontend Agent                       |
| **Branch**         | `feature/comments-search-pagination` |
| **Status**         | Pending                              |

**Description:** Add search bar and pagination to Comments page

**Acceptance Criteria:**

- [ ] Same interaction pattern as Posts/Users pages
- [ ] Search filters by author or comment body
- [ ] Consistent UI with other list pages

---

### Task 3.4 — QA Validation: Milestone 3

| Field              | Value                                         |
| ------------------ | --------------------------------------------- |
| **Assigned Agent** | QA Agent                                      |
| **Branch**         | _(tests against merged milestone 3 branches)_ |
| **Status**         | Pending                                       |

**Acceptance Criteria:**

- [ ] Search works on all 3 pages with debounced input
- [ ] Pagination navigates correctly, page counts are accurate
- [ ] URL params persist on reload
- [ ] Empty states display when no results found
- [ ] Loading states shown during transitions
- [ ] No layout shift during search/pagination
- [ ] Works on mobile viewports

---

## Milestone 4: Detail Pages & Data Relationships

> Make the app navigable with linked content.

### Task 4.1 — Post Detail API & Page

| Field              | Value                                       |
| ------------------ | ------------------------------------------- |
| **Assigned Agent** | Backend Agent (API) + Frontend Agent (page) |
| **Branch**         | `feature/post-detail-page`                  |
| **Status**         | Pending                                     |

**Description:** Create `/api/posts/[id]` endpoint returning post with its comments. Build `/posts/[id]` detail page.

**Acceptance Criteria:**

- [ ] `GET /api/posts/[id]` returns post data + associated comments
- [ ] Detail page shows full post body, author info, and comment list
- [ ] Back navigation to posts list
- [ ] Skeleton loading state
- [ ] 404 handling for invalid post IDs
- [ ] Post cards on list page and dashboard link to detail page
- [ ] i18n support for all labels

---

### Task 4.2 — User Detail API & Page

| Field              | Value                                       |
| ------------------ | ------------------------------------------- |
| **Assigned Agent** | Backend Agent (API) + Frontend Agent (page) |
| **Branch**         | `feature/user-detail-page`                  |
| **Status**         | Pending                                     |

**Description:** Create `/api/users/[id]` endpoint returning user with their posts. Build `/users/[id]` detail page.

**Acceptance Criteria:**

- [ ] `GET /api/users/[id]` returns user data + their posts
- [ ] Detail page shows user profile, avatar, and their posts list
- [ ] Posts link to post detail pages
- [ ] Back navigation, skeleton loading, 404 handling
- [ ] i18n support

---

### Task 4.3 — QA Validation: Milestone 4

| Field              | Value                                         |
| ------------------ | --------------------------------------------- |
| **Assigned Agent** | QA Agent                                      |
| **Branch**         | _(tests against merged milestone 4 branches)_ |
| **Status**         | Pending                                       |

**Acceptance Criteria:**

- [ ] Navigation flow: Dashboard -> Post list -> Post detail -> Comments works
- [ ] Navigation flow: Users list -> User detail -> User's posts -> Post detail works
- [ ] 404 pages render for invalid IDs
- [ ] Back navigation works correctly
- [ ] All detail pages responsive and dark/light mode compatible

---

## Milestone 5: Animations & Premium UI Polish

> Elevate the UX with motion, transitions, and visual refinement.

### Task 5.1 — Page Transitions & List Animations

| Field              | Value                       |
| ------------------ | --------------------------- |
| **Assigned Agent** | Frontend Agent              |
| **Branch**         | `feature/animations-polish` |
| **Status**         | Pending                     |

**Description:** Add CSS transitions and animations: staggered card entrance on list pages, smooth page transitions, hover lift effects on cards, loading shimmer on skeletons

**Acceptance Criteria:**

- [ ] Cards animate in with staggered fade-up on page load
- [ ] Skeleton cards have shimmer/pulse animation
- [ ] Cards have subtle lift + shadow on hover
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No animation causes layout shift or jank
- [ ] Pure CSS/Tailwind — no animation library dependency

---

### Task 5.2 — Typography, Spacing & Visual Consistency Pass

| Field              | Value                        |
| ------------------ | ---------------------------- |
| **Assigned Agent** | Frontend Agent               |
| **Branch**         | `feature/visual-consistency` |
| **Status**         | Pending                      |

**Description:** Audit and refine typography scale, spacing rhythm, color palette consistency, and component visual weight across all pages

**Acceptance Criteria:**

- [ ] Consistent heading hierarchy across all pages
- [ ] Uniform card padding, border radius, and spacing
- [ ] Refined color palette (not raw Tailwind defaults)
- [ ] Footer with app branding
- [ ] Smooth focus ring styles for keyboard navigation
- [ ] Print-friendly basic styles

---

### Task 5.3 — QA Validation: Milestone 5

| Field              | Value                                         |
| ------------------ | --------------------------------------------- |
| **Assigned Agent** | QA Agent                                      |
| **Branch**         | _(tests against merged milestone 5 branches)_ |
| **Status**         | Pending                                       |

**Acceptance Criteria:**

- [ ] Animations play correctly on all pages
- [ ] `prefers-reduced-motion` disables animations
- [ ] No layout shift from animations
- [ ] Visual consistency across all pages in both themes
- [ ] Performance: no jank on mobile devices
- [ ] All accessibility requirements still met

---

## Milestone 6: Accessibility, Responsive Hardening & Final QA

> Production-readiness pass.

### Task 6.1 — Accessibility Audit & Fixes

| Field              | Value                             |
| ------------------ | --------------------------------- |
| **Assigned Agent** | Frontend Agent                    |
| **Branch**         | `feature/accessibility-hardening` |
| **Status**         | Pending                           |

**Description:** Full accessibility pass: ARIA landmarks, skip-to-content link, focus management on navigation, screen reader announcements for dynamic content, color contrast validation

**Acceptance Criteria:**

- [ ] Skip-to-content link on every page
- [ ] Proper ARIA landmarks (`<main>`, `<nav>`, `<aside>`)
- [ ] Dynamic content changes announced via `aria-live` regions
- [ ] Focus returns to logical element after modal/menu close
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] All interactive elements keyboard accessible

---

### Task 6.2 — Responsive Design Hardening

| Field              | Value                          |
| ------------------ | ------------------------------ |
| **Assigned Agent** | Frontend Agent                 |
| **Branch**         | `feature/responsive-hardening` |
| **Status**         | Pending                        |

**Description:** Test and fix all breakpoints: 320px, 375px, 768px, 1024px, 1440px. Fix any overflow, truncation, or layout issues.

**Acceptance Criteria:**

- [ ] No horizontal scroll at any breakpoint
- [ ] Cards reflow correctly (1 col mobile, 2 col tablet, 2-3 col desktop)
- [ ] Search and pagination controls usable on mobile
- [ ] Dashboard widgets stack properly on small screens
- [ ] Text doesn't overflow containers

---

### Task 6.3 — Final QA Validation

| Field              | Value                              |
| ------------------ | ---------------------------------- |
| **Assigned Agent** | QA Agent                           |
| **Branch**         | _(comprehensive final validation)_ |
| **Status**         | Pending                            |

**Acceptance Criteria:**

- [ ] Full route walkthrough (all pages, all navigation paths)
- [ ] Dark/light mode on every page
- [ ] EN/ES translations complete and correct
- [ ] All API endpoints return expected data
- [ ] Loading, error, and empty states work everywhere
- [ ] Responsive at all target breakpoints
- [ ] Keyboard-only navigation works end-to-end
- [ ] `npm run build` succeeds with zero warnings
- [ ] `npm run lint` passes clean
- [ ] No console errors in any flow

---

## Implementation Order & Dependencies

```
Milestone 1 (Foundation)           ← START HERE
    ├── 1.1 UI Components ──┐
    ├── 1.2 useFetch Hook ──┼── 1.4 QA ──┐
    └── 1.3 API Enhancements┘            │
                                          ▼
Milestone 2 (Dashboard)
    ├── 2.1 Dashboard ──────┐
    └── 2.2 Header Nav ─────┼── 2.3 QA ──┐
                                          │
                                          ▼
Milestone 3 (Search/Filter)
    ├── 3.1 Posts Search ───┐
    ├── 3.2 Users Search ───┼── 3.4 QA ──┐
    └── 3.3 Comments Search─┘            │
                                          ▼
Milestone 4 (Detail Pages)
    ├── 4.1 Post Detail ────┐
    └── 4.2 User Detail ────┼── 4.3 QA ──┐
                                          │
                                          ▼
Milestone 5 (Polish)
    ├── 5.1 Animations ─────┐
    └── 5.2 Visual Pass ────┼── 5.3 QA ──┐
                                          │
                                          ▼
Milestone 6 (Production Ready)
    ├── 6.1 Accessibility ──┐
    └── 6.2 Responsive ─────┼── 6.3 Final QA
```

### Parallelization Notes

- **Within each milestone:** Tasks with the same number prefix (e.g., 1.1, 1.2, 1.3) can run in parallel
- **QA tasks** always run after all other tasks in their milestone are merged
- **Cross-milestone:** Milestones are sequential — each depends on the previous milestone's QA passing

---

## Agent Assignments Summary

| Agent              | Tasks                                                                         |
| ------------------ | ----------------------------------------------------------------------------- |
| **Frontend Agent** | 1.1, 1.2, 2.1, 2.2, 3.1, 3.2, 3.3, 4.1 (page), 4.2 (page), 5.1, 5.2, 6.1, 6.2 |
| **Backend Agent**  | 1.3, 4.1 (API), 4.2 (API)                                                     |
| **QA Agent**       | 1.4, 2.3, 3.4, 4.3, 5.3, 6.3                                                  |
| **Team Lead**      | Orchestration, PR reviews, merge approvals                                    |

---

## Branch Registry

| Branch                               | Milestone  | Status         |
| ------------------------------------ | ---------- | -------------- |
| `feature/comments-page`              | Pre-sprint | PR #1 Open     |
| `feature/ui-components-library`      | 1          | Merged (PR #2) |
| `feature/use-fetch-hook`             | 1          | Merged (PR #3) |
| `feature/api-enhancements`           | 1          | Merged (PR #4) |
| `feature/dashboard-homepage`         | 2          | Pending        |
| `feature/header-navigation`          | 2          | Pending        |
| `feature/posts-search-pagination`    | 3          | Pending        |
| `feature/users-search-pagination`    | 3          | Pending        |
| `feature/comments-search-pagination` | 3          | Pending        |
| `feature/post-detail-page`           | 4          | Pending        |
| `feature/user-detail-page`           | 4          | Pending        |
| `feature/animations-polish`          | 5          | Pending        |
| `feature/visual-consistency`         | 5          | Pending        |
| `feature/accessibility-hardening`    | 6          | Pending        |
| `feature/responsive-hardening`       | 6          | Pending        |
