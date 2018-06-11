import { PostaddModule } from './postadd.module';

describe('PostaddModule', () => {
  let postaddModule: PostaddModule;

  beforeEach(() => {
    postaddModule = new PostaddModule();
  });

  it('should create an instance', () => {
    expect(postaddModule).toBeTruthy();
  });
});
