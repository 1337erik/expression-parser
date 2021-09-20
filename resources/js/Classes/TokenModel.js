import EquationModel from "./EquationModel";

/**
 * This class has the most room for refactoring, as I can expand this by making each Token a node within a linked-list
 *  which will allow Tokens to apply a generic rule-set for conditions and grammars to determine whether or not they are indeed valid without having
 *  validity to purely be derived from the parent classes or a brittle "type-check"
 * 
 * This improvement will also lead to more intelligent UI that can detect problems with each individual Token and display them to the end-user,
 *  also assisting in making the expression-calculation simpler
 */
export default class TokenModel {

    static topTierOperators    = [ '(', ')' ]; // not in use
    static midTierOperators    = [ '*', '/' ]; // not in use but belongs here => ^
    static bottomTierOperators = [ '+', '-' ];
    static validOperators      = this.midTierOperators.concat( this.bottomTierOperators );

    static TYPE_VARIABLE = 'variable';
    static TYPE_OPERATOR = 'operator';
    static TYPE_NUMBER   = 'number';

    constructor({ symbol: symbol = null, parentEquation: parentEquation = new EquationModel() } = {}){

        this.type = TokenModel.validOperators.includes( symbol ) ? TokenModel.TYPE_OPERATOR
            : !isNaN( symbol ) ? TokenModel.TYPE_NUMBER
            : (/[a-z]/).test( symbol ) ? TokenModel.TYPE_VARIABLE
            : null;

        this.rawValue = symbol;

        this.parentEquation = parentEquation;
    }

    trueValue( externalEquations = [] ){

        switch( this.type ){

            case TokenModel.TYPE_VARIABLE:
                // attempt to find the value of the variable in question

                const index = externalEquations.findIndex( eq => ( eq.variable == this.rawValue && eq.id != this.parentEquation.id ) );
                if( index != -1 ) return externalEquations[ index ].trueValue( externalEquations );

                return this.rawValue; // treat it as just an unsolved string, know to handle this
            case TokenModel.TYPE_NUMBER:

                return Number( this.rawValue );
            case TokenModel.TYPE_OPERATOR:

                return this.rawValue;
            default:

                return null;
        }
    }


    isValid( externalEquations = [] ){
        // TODO establish tokens as linked list, establish ruleset for validity and algorithm for checking

        if( this.type == TokenModel.TYPE_VARIABLE ){

            const index = externalEquations.findIndex( eq => ( eq.variable == this.rawValue && eq.id != this.parentEquation.id ) );
            if( index == -1 ) return false;
        }

        return !!this.type;
    }
}