import React from 'react';
import WelcomeBanner from './welcome-banner';
import SiteInfoBar from './site-info-bar';
import AllPolls from '../containers/all-polls';

export default ()=> {
  return (
    <div>
      <WelcomeBanner />
      <SiteInfoBar />
      <AllPolls />
    </div>
  );
}