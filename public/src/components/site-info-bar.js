import React from 'react';
import SiteInfo from './site-info';

export default () => {
  return (
    <div className="container-fluid">
      <div className="row site-info-bar">
        <SiteInfo 
          classname="glyphicon-list-alt" 
          title="Custom Polls" 
          description="Create custom polls for any questions you might have. Add up to 40 choices for each poll!"
        />
        <SiteInfo 
          classname="glyphicon-user" 
          title="Real Users" 
          description="Let real users vote on your polls with or without an account. Let them add their own options for even more accurate data"
        />
        <SiteInfo 
          classname="glyphicon-signal" 
          title="Real Results" 
          description="Don't worry about confusing data. We have worked hard to simplify your results with our easy to use charts!"/>
      </div>
    </div>
  );
}