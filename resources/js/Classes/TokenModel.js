import EquationModel from "./EquationModel";

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

        if( this.type == TokenModel.TYPE_VARIABLE ){

            const index = externalEquations.findIndex( eq => ( eq.variable == this.rawValue && eq.id != this.parentEquation.id ) );
            if( index == -1 ) return false;
        }

        return !!this.type;
    }
}