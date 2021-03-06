import EquationModel from "../../Classes/EquationModel";
import TokenModel from "../../Classes/TokenModel";
import CONSTANTS from '../../constants';

/**
 * The vuex store for persisting and running computations on the equations list
 * 
 * The getters are the real meat of this, as they are able to dynamically compute the values of
 *  equations with respect to the larger list of equations, while providing real-time updates for the UI
 *  because of the nature of vue's reactivity
 */
export default {

    namespaced : true,
    state: {

        equations     : [],
        equationModel : new EquationModel(),
        tokenModel    : new TokenModel()
    },
    mutations: {
        // basic CRUD functions

        addItem      : ( state, item  ) => state.equations.push( item ),
        removeItem   : ( state, index ) => state.equations.splice( index, 1 ),
        updateItem   : ( state, data  ) => state.equations[ data.index ] = data.item,
        setEquations : ( state, equations ) => state.equations = equations
    },
    actions: {
        // basic CRUD

        addItem( ctx, item ){

            if( item.expression == '' ) return;

            item.variable = item.variable || ctx.rootGetters[ 'solver/nextVariable' ]; // make sure the variable name is always correct and auto-incrementing

            ctx.commit( 'addItem', new EquationModel( item ));
        },
        setEquations( ctx, equations ){

            equations = equations.map( eq => new EquationModel( eq ) );
            ctx.commit( 'setEquations', equations );
        },
        deleteItem( ctx, item ){

            const index = ctx.state.equations.findIndex( eq => eq.id == item.id );
            if( index != -1 ) ctx.commit( 'removeItem', index );
        },
        updateItem( ctx, item ){

            const index = ctx.state.equations.findIndex( eq => eq.id == item.id );
            if( index != -1 ) ctx.commit( 'updateItem', { index: index, item: new EquationModel( item ) });
        }
    },
    getters: {

        equations    : state => state.equations,
        nextVariable : ( state ) => {

            const mult = Math.floor( state.equations.length / CONSTANTS.ALPHABET.length );
            let str = '';

            for( let i = 0; i <= mult; i++ ){

                str += CONSTANTS.ALPHABET[ state.equations.length % CONSTANTS.ALPHABET.length ];
            }

            return str;
        },

        // Equation Getters
        equationStatusClasses: ( state ) => ( equation ) => {

            return equation.isValid( state.equations ) ? 'text-green-500 font-bold' : 'font-light text-red-500';
        },
        equationTokens: ( state ) => ( equation ) => {

            const index = state.equations.findIndex( eq => eq.id == equation.id );

            if( index != -1 ) return state.equations[ index ].parseTokens();

            return [];
        },
        equationValue: ( state ) => ( equation ) => {

            let allEquations = state.equations;
            return equation.trueValue( allEquations );
        },
        runningTotal: ( state ) => {

            return state.equations.reduce( ( total, eq ) => {

                return total += eq.trueValue( state.equations );
            }, 0.00 );
        },

        // Token Getters
        tokenStatusClasses: ( state ) => ( token ) => {

            // TODO expand upon this "isValid" method
            if( !token.isValid( state.equations ) ) return 'text-xs text-red-500';

            switch( token.type ){

                case TokenModel.TYPE_OPERATOR:

                    return 'text-black font-bold';
                case TokenModel.TYPE_NUMBER:

                    return 'text-blue-400 font-light';
                case TokenModel.TYPE_VARIABLE:

                    return 'text-green-500 font-light';
            }
        }
    }
};