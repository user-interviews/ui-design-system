import React from 'react';

import Card, { CardSizes } from '../Card';
import { CardStack } from '../CardStack';
import Main from './Main';
import mdx from './Main.mdx';

export default {
  title: 'Layouts/Main',
  component: Main,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  navLink: {
    color: '#101010',
    padding: '8px',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#177863',
    display: 'flex',
    height: '72px',
    padding: '16px',
    width: '100%',
  },
  h1: {
    color: '#FFFFFF',
    fontSize: '1.25rem',
    fontWeight: '700',
  },
  h2: {
    fontSize: '1rem',
    fontWeight: '700',
  },
   main: {
    backgroundColor: '#F8F4F2',
    height: '350px',
  },
};

export function Default() {
  return (
    <Main>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>This is a header</h1>
      <p>With some paragraph text all wrapped in a <code>{'<Main>'}</code></p>
    </Main>
  );
}

export function PageExample() {
  return (
    <div className="App">
      <nav className="Nav" style={styles.nav}>
        <a href="https://www.userinterviews.com" style={styles.navLink}>Nav item 1</a>
        <a href="https://www.userinterviews.com" style={styles.navLink}>Nav item 2</a>
        <a href="https://www.userinterviews.com" style={styles.navLink}>Nav item 3</a>
      </nav>
      <header className="Header" style={styles.header}>
        <h1 style={styles.h1}>Some header</h1>
      </header>
      <Main style={styles.main}>
        <h2 style={styles.h2}>Main content area of this page</h2>
        <p>
          Having at least one main landmark on a page helps with accessibility and allows
          assistive technology (AT) users to orient themselves on a page.
        </p>
      </Main>
    </div>
  );
}

export function Accessibility() {
  return (
    <Main>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CardStack size={CardSizes.SMALL}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Accessibility information</h1>
          <Card size="sm" title="Why is it important to use Main?">
            <p>
              Any document needs to have a navigation point to the primary content of the page.
              Ensure all content is contained within a landmark region, designated with HTML5
              landmark elements and/or ARIA landmark regions.
            </p>
            <p>
              It is a best practice to use both HTML 5 and ARIA landmarks to ensure all content
              is contained within a navigational region.
              In HTML5, you should use elements like header, nav, main, and footer.
              Their ARIA counterparts are role="banner", role="navigation", role="main",
              and role="contentinfo", in that order.
              By using both HTML5 and ARIA markup, you make the webpage more robust and functional
              no matter what screen reader technology is used.
            </p>
            <p>
              Once added, screen reader users can navigate to a section based on its ARIA landmark
              or HTML element.
              Landmarks provide a simple replacement for a skip navigation link,
              though the replacement is only useful for users of screen readers.
              Sighted users or users of screen enlargers wouldn’t get much benefit from
              the addition, so it can’t replace skip navigation links altogether.
            </p>
            <span>
              Source:&nbsp;
              <a href="https://dequeuniversity.com/rules/axe/4.2/landmark-one-main">
                Source: Deque University - Landmark one main
              </a>
            </span>
            <br />
            <span>
              Interactive example:&nbsp;
              <a href="https://www.w3.org/WAI/ARIA/apg/example-index/landmarks/main.html">
                W3C: ARIA Landmarks Example
              </a>
            </span>
          </Card>
        </CardStack>
      </div>
    </Main>
  );
}
