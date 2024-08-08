import ImageFile from '../public/ui-design-system-dark.svg';
import FigmaLogo from '../public/figma-logo.svg';
import GithubLogo from '../public/github-logo.svg';

function Default() {
  return (
    <div style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
      <img alt="User Interviews Design System" src={ImageFile} style={{ marginBottom: '32px' }} />
      <div style={{ marginBottom: '32px', fontFamily: 'Inter' }}>
        We aim to create a system that allows us to build a user experience that is consistent,
        flexible and scalable.  This style guide is living documentation that will be
        updated as we continue to evolve and improve our design system.
      </div>
      <a
        href="https://www.figma.com/file/471iS3QrpPtXZpS1xbsJ20/Components"
        rel="noopener noreferrer"
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          margin: '10px',
        }}
        target="_blank"
        type="button"
      >
        <img alt="" src={FigmaLogo} style={{ marginRight: '8px' }} />
        <span>Figma Library</span>
      </a>
      <a
        href="https://github.com/user-interviews/ui-design-system"
        rel="noopener noreferrer"
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
        }}
        target="_blank"
        type="button"
      >
        <img alt="" src={GithubLogo} style={{ marginRight: '8px' }} />
        <span>Github Repo</span>
      </a>
    </div>
  );
}

export default {
  title: 'Intro',
  component: Default,
};

export const Primary = {};
