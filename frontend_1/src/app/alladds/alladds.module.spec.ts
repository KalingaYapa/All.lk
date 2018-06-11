import { AlladdsModule } from './alladds.module';

describe('AlladdsModule', () => {
  let alladdsModule: AlladdsModule;

  beforeEach(() => {
    alladdsModule = new AlladdsModule();
  });

  it('should create an instance', () => {
    expect(alladdsModule).toBeTruthy();
  });
});
