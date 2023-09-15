const groupSlugsByName = require('./groupSlugsByName');

describe('groupSlugsByName', () => {

  it('It should group slugs by their associated skill names', () => {

    const emptyInput = [];
    const emptyOutput = {};

    const noSlugs = [{
      skillName: 'Java'
    }];

    const noSlugsOutput = {
      'Java': [undefined]
    };

  
    const oneSlugOneName = [{ 
      skillName: 'Java', 
      slug: 'java-slug' 
    }];

    const oneSlugOneNameOutput = { 
      Java: ['java-slug'] 
    };

    const emptyInputResult = groupSlugsByName(emptyInput);
    expect(emptyInputResult).toEqual(emptyOutput);

    const noSlugsResult = groupSlugsByName(noSlugs);
    expect(noSlugsResult).toEqual(noSlugsOutput);

    const oneSlugOneNameResult = groupSlugsByName(oneSlugOneName);
    expect(oneSlugOneNameResult).toEqual(oneSlugOneNameOutput);
  });
});


