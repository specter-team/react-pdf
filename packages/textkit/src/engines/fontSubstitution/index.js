import { last } from '@react-pdf/fns';

import empty from '../../attributedString/empty';

/**
 * @typedef {import('../../types.js').AttributedString} AttributedString
 * @typedef {import('../../types.js').Run} Run
 */

/**
 * @param {Run} run run
 * @returns {number}
 */
const getFontSize = (run) => {
  return run.attributes.fontSize || 12;
};

/**
 * Resolve font runs in an AttributedString, grouping equal
 * runs and performing font substitution where necessary.
 */
const fontSubstitution = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return (attributedString) => {
    const { string, runs } = attributedString;

    let lastFont = null;
    let lastIndex = 0;
    let index = 0;
    const res = [];

    if (!string) return empty();

    for (const run of runs) {
      const fontSize = getFontSize(run);
      const defaultFont = run.attributes.font;

      if (string.length === 0) {
        res.push({ start: 0, end: 0, attributes: { font: defaultFont } });
        break;
      }

      for (const char of string.slice(run.start, run.end)) {
        const font = defaultFont;

        if (font !== lastFont) {
          if (lastFont) {
            res.push({
              start: lastIndex,
              end: index,
              attributes: {
                font: lastFont,
                scale: lastFont ? fontSize / lastFont.unitsPerEm : 0,
              },
            });
          }

          lastFont = font;
          lastIndex = index;
        }

        index += char.length;
      }
    }

    if (lastIndex < string.length) {
      const fontSize = getFontSize(last(runs));

      res.push({
        start: lastIndex,
        end: string.length,
        attributes: {
          font: lastFont,
          scale: lastFont ? fontSize / lastFont.unitsPerEm : 0,
        },
      });
    }

    return { string, runs: res };
  };
};

export default fontSubstitution;
