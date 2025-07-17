// server/tests/interpolation.test.js
const assert = require('assert');

function interpolate(ts, ts0, p0, ts1, p1) {
  const ratio = (ts - ts0) / (ts1 - ts0);
  return p0 + (p1 - p0) * ratio;
}

describe('Interpolation Function', () => {
  it('should calculate correct interpolated price', () => {
    const ts0 = 100;
    const ts1 = 200;
    const ts = 150;
    const p0 = 1.0;
    const p1 = 1.5;
    const expected = 1.25;

    const result = interpolate(ts, ts0, p0, ts1, p1);
    assert.strictEqual(result, expected);
  });
});
