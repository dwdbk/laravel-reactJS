import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from 'components/table';

Enzyme.configure({ adapter: new Adapter() });

describe('Table component', function() {

  it('should render correctly', function() {
    const wrapper = shallow(<Table headers={ ['name', 'email'] } />);
    expect(wrapper.find('table').hasClass('table')).to.equal(true);
    expect(wrapper.find('thead')).to.have.length(1);
    expect(wrapper.find('tbody')).to.have.length(1);
  });

});
