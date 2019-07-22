import { html, fixture, expect } from '@open-wc/testing';

import '../src/gov-button.js';

describe('<gov-button>', () => {
  it('has a default property header', async () => {
    const el = await fixture('<gov-button></gov-button>');
    expect(el.title).to.equal('open-wc');
  });

  it('allows property header to be overwritten', async () => {
    const el = await fixture(html`
      <gov-button title="different"></gov-button>
    `);
    expect(el.title).to.equal('different');
  });
});
