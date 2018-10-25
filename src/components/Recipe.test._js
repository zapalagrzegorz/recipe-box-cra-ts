import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Recipe } from './Recipe';

it('renders without crashing with Enzyme', () => {
    shallow(<Recipe />);
});

// it('includes renders Recipe component with props', () => {
//             const recipeProps = {
//                 title: 'recipe',
//                 ingredients: 'some ingredients',
//                 directions: 'some directions',
//                 onButtonDeleteClick: (e) => {},
//                 onButtonEditClick: (e) => {},
//             }
//             const recipe = shallow( <Recipe { ...recipeProps} />);
//             // expect(recipe.containsMatchingElement(<p className='preLine'>some directions</p>)).toEqual(true)
//             expect(recipe.containsMatchingElement(<p>some ingredients</p>)).toEqual(true)
// });