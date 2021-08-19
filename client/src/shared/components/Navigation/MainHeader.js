import React from 'react';

const MainHeader = props => {
  return (
    <>
      {/* props.children is a special prop => will always refer to the things which we pass in the opening and closing tag of the component => I intended to use it in Main Navigation */}
      {props.children}
    </>
  );
};

export default MainHeader;
