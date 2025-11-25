import { expect } from 'chai';
import convict from 'convict';

describe('Sanity Check', () => {
  it('should run a basic test', () => {
    expect(convict).to.not.be.undefined;
  });
});
