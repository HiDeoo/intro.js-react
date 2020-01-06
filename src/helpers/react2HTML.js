import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server'

function react2HTML(intro: React.ElementType) {
  return renderToStaticMarkup(intro);  
}

export default react2HTML;
