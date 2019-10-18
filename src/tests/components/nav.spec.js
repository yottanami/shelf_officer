import Nav from './../../components/nav';
import React from 'react';
import { shallow } from './../enzyme';

describe('<Nav />', () => {
  const amountLinks = 2;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Nav />);
  });

  it('render the component', () => {
    expect(wrapper).toBeTruthy();
  });

  it(`render ${amountLinks} links`, () => {
    const links = wrapper.find('Link');
    expect(links.length).toEqual(amountLinks);
  });
});
