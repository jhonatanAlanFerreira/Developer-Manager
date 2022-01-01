import { GenrePipe } from './genre.pipe';

describe('GenrePipe', () => {
  const pipe = new GenrePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should replace to M or F', () => {
    expect(pipe.transform('M')).toBe('Masculino');
    expect(pipe.transform('F')).toBe('Feminino');
    expect(pipe.transform('A')).toBe('A');
  });

});
