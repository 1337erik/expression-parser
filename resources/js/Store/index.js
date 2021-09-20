import { Store } from 'vuex';

import Solver from './modules/equation-solver';

export const store = new Store({

    state () {

        return {

        }
    },
    modules: {

        solver : Solver
    }
})