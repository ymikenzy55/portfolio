import React from 'react';
import { typographyClasses } from '../../utils/typography';

/**
 * Test component to verify typography system is working correctly
 * This component can be temporarily added to App.tsx for testing
 */
export const TypographyTest: React.FC = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Typography System Test</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>Headlines (Bold/SemiBold)</h2>
        <h1 className={typographyClasses.headline1}>Headline 1 - Bold 60px</h1>
        <h2 className={typographyClasses.headline2}>Headline 2 - Bold 48px</h2>
        <h3 className={typographyClasses.headline3}>Headline 3 - SemiBold 36px</h3>
        <h4 className={typographyClasses.headline4}>Headline 4 - SemiBold 30px</h4>
        <h5 className={typographyClasses.headline5}>Headline 5 - SemiBold 24px</h5>
        <h6 className={typographyClasses.headline6}>Headline 6 - SemiBold 20px</h6>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Body Text (Regular/Medium)</h2>
        <p className={typographyClasses.bodyLarge}>
          Body Large - Regular 18px with relaxed line height. This is perfect for introductory paragraphs and important content that needs to stand out.
        </p>
        <p className={typographyClasses.body}>
          Body - Regular 16px with normal line height. This is the standard body text used throughout the application for most content.
        </p>
        <p className={typographyClasses.bodyMedium}>
          Body Medium - Medium 16px with normal line height. This is used for emphasized body text that needs slightly more weight.
        </p>
        <p className={typographyClasses.bodySmall}>
          Body Small - Regular 14px with normal line height. This is used for secondary information and smaller text elements.
        </p>
        <p className={typographyClasses.caption}>
          Caption - Medium 12px uppercase with letter spacing. Used for labels and metadata.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Font Weight Utilities</h2>
        <p className={typographyClasses.fontRegular}>Regular weight (400)</p>
        <p className={typographyClasses.fontMedium}>Medium weight (500)</p>
        <p className={typographyClasses.fontSemibold}>SemiBold weight (600)</p>
        <p className={typographyClasses.fontBold}>Bold weight (700)</p>
      </section>

      <section>
        <h2>Font Loading Test</h2>
        <p>
          If you can see the Urbanist font properly loaded with all weights, the configuration is working correctly. 
          Check the browser's Network tab to verify the font files are loading efficiently.
        </p>
        <p style={{ fontFamily: 'serif' }}>
          This text uses serif font as a comparison to verify Urbanist is loading.
        </p>
      </section>
    </div>
  );
};