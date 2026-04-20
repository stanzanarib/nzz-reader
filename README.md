# README: NZZ Reader Challenge

## What I Built
I have developed a robust, responsive web application for browsing, searching, and managing NZZ articles. The application utilizes a modern component-based architecture with a focus on URL-driven state management to ensure that filters, search queries, and navigation are persistent and shareable.

* **Article Feed & Search:** A paginated article feed with a debounced search implementation. Both search queries and multi-select topic filters are synced to the URL, allowing for deep-linking.
* **Article Detail View:** A comprehensive view featuring dynamic content rendering, a persistent bookmarking system (using `localStorage`), and a related-articles algorithm.
* **Persistent Bookmarks:** A dedicated route for saved articles, utilizing `storage` events to ensure that bookmarks remain in sync across multiple browser tabs.
* **UI/UX:** A fully responsive interface that leverages Tailwind’s darkMode: 'media' configuration to respect OS color preferences, ensuring a seamless, native-feeling transition between light and dark modes."
* **Resilience:** The application handles loading, error, and empty states gracefully, ensuring that network failures from the mock API do not compromise the UI integrity.

## What I Skipped and Why
* **Scroll Position Preservation on Back Navigation:** * **Reason:** While I successfully implemented URL-based state for pagination and filters, restoring the exact scroll position upon returning to the feed requires capturing the window scroll offset and managing it via the History API or a Viewport Scroll restoration service. Given the time constraints, I prioritized implementing a highly robust URL-state management system over native scroll restoration, as the former is critical for sharing and re-loading, while the latter is a secondary UX enhancement.
* **Extended Test Coverage:**
    * **Reason:** While I have implemented critical tests for the Bookmark store logic and URL-state synchronization, the testing suite for the UI components is currently limited. I focused my testing efforts on the "trickiest logic"—the data integrity and state synchronization—rather than on low-level component rendering, to ensure the core functionality is bulletproof under edge-case scenarios.

## Where I’d Go with Another Two Days
Given an additional 48 hours, I would refine the user experience and codebase stability:

1.  **Native Scroll Restoration:** Implement a `ScrollRestoration` component that saves/restores the `window.scrollY` position when navigating back to the feed, providing a seamless "native" app feeling.
2.  **Performance Optimization:** Implement virtualization (e.g., `react-window`) for the article list if the dataset were to scale significantly, and add service worker caching for a true "offline-first" experience.
3.  **Comprehensive Unit/E2E Testing:** Expand the test suite to include Cypress or Playwright end-to-end tests for the search and filtering flow, ensuring no regressions during future iterations.
4.  **Enhance Accessibility:** Perform a full audit using WCAG guidelines and implement an automated accessibility testing tool (e.g., `axe-core`) within the CI/CD pipeline.
5.  **Refactor Services:** Implement a dedicated API abstraction layer to handle caching more effectively, ensuring the application remains fast even when re-fetching data.

***

*Note: Remember to update the Service to "Bust" the Cache after working on the PermissionHandler.*
