import React from 'react';
import { Page, Document } from '@specter-team/react-pdf-renderer';

import Fractal from './Fractal';

const Fractals = () => (
  <Document>
    <Page size="A4">
      <Fractal steps={18} />
    </Page>

    <Page orientation="landscape" size="A4">
      <Fractal steps={14} />
    </Page>

    <Page size="B4">
      <Fractal steps={10} />
    </Page>
  </Document>
);

export default {
  id: 'fractals',
  name: 'Fractals',
  description: '',
  Document: Fractals,
};
