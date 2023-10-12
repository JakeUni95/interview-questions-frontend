const groupSlugsByName = require('./groupSlugsByName');

describe('groupSlugsByName', () => {

  describe('Typical Usage', () => {

    it.each([
      [
        [{ skillName: 'Java', slug: 'java-slug' }],
        { 'Java': ['java-slug'] }
      ],
    ])('given slugs %p, should group by skill names as %p', (input, expectedResult) => {
      expect(groupSlugsByName(input)).toEqual(expectedResult);
    });
  });

  describe('Edge Cases', () => {

    it.each([
      [
        [], 
        {}
      ],
      [  
        [{ skillName: 'Java' }],
        { 'Java': [undefined] }
      ],
      [
        [{ skillName: '', slug: 'empty-slug'}],
        { '': ['empty-slug'] }
      ],
    ])('given slugs %p, should group by skill names as %p', (input, expectedResult) => {
      expect(groupSlugsByName(input)).toEqual(expectedResult);
    });
  });

});
