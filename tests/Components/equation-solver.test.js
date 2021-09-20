import { mount } from '@vue/test-utils';
import EquationSolver from '../../resources/js/Components/Equations/Solver';

test( 'should mount without crashing', () => {

    const wrapper = mount( EquationSolver );
    expect( wrapper ).toMatchSnapshot();
})