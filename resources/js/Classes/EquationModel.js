import TokenModel from "./TokenModel";

export default class EquationModel {

    expression = '';

    tokenSeparator = /([+-/*()^])\s*/;
    tokenValidator = /([a-z0-9+-/*()^])\w*/;

    constructor({

        id         : id         = null,
        variable   : variable   = null,
        expression : expression = null
    } = {}){

        this.variable   = variable;
        this.expression = ![ '', null ].includes( expression ) ?
            expression.split( this.tokenSeparator )
                .filter( val => this.tokenValidator.test( val ) )
                .map( val => val.trim() )
                .join( ' ' )
            : '';

        this.id = id;
    }

    isValid( externalEquations = [] ){ return this.trueValue( externalEquations, true ); }

    trueValue( externalEquations = [], validityCheck = false ){
        // we are able to use the beginning of this function as a validator, having it spare the processing for simple binary checks

        /////////// Validity Check ///////////
        let tokens = this.validTokens( externalEquations );
        if( tokens.count == 0 ) return null; // equation has no valid tokens, is invalid itself

        let numberStack   = [];
        let operatorStack = [];
        let skipFlag      = false;

        for( let i = 0; i < tokens.length; i++ ){
            let token = tokens[ i ];

            if( skipFlag ){
                // skip this digit because it was already accessed in the previous iteration

                skipFlag = !skipFlag;
                continue;
            }

            switch( token.type ){

                case TokenModel.TYPE_NUMBER:

                    numberStack.push( token.trueValue( externalEquations ) );
                    break;
                case TokenModel.TYPE_OPERATOR:

                    if( TokenModel.topTierOperators.includes( token.rawValue ) ){ 
                        // if top-tier, break into new equation and solve separately, recursively.. not in use
                    }

                    if( TokenModel.midTierOperators.includes( token.rawValue ) ){
                        // if mid-tier, solve now

                        let firstDigit  = numberStack.pop();
                        let secondDigit = tokens[ i + 1 ].trueValue( externalEquations );

                        skipFlag = true;

                        switch( token.rawValue ){

                            case '*':

                                numberStack.push( firstDigit * secondDigit )
                                break;
                            case '/':

                                numberStack.push( firstDigit / secondDigit )
                                break;
                            case '^': // not in use

                                break;
                        }
                    }

                    if( TokenModel.bottomTierOperators.includes( token.rawValue ) ){
                        // if low-tier, push and move along

                        operatorStack.push( token.trueValue( externalEquations ) );
                    }
                    break;
                case TokenModel.TYPE_VARIABLE:

                    numberStack.push( token.trueValue( externalEquations ) );
                    break;
            }
        };

        // if #numbers vs #operators dont line up, invalidate expression
        if( numberStack.length !== ( operatorStack.length + 1 ) ) return null;
        if( validityCheck ) return true;
        ////////////////////////////////////////////

        let firstDigit  = null;
        let secondDigit = null;
        let operator    = null;

        while( ![ null, undefined ].includes( operator = operatorStack.pop() ) ){
            // both stacks are initialized with addition and subtraction.. only
            // [ 3, 5, 6 ]
            // [ +, - ]

            // pop 2 off the number line
            firstDigit  = numberStack.pop();
            secondDigit = numberStack.pop();

            if( operator == '+' ) numberStack.push( secondDigit + firstDigit );
            if( operator == '-' ) numberStack.push( secondDigit - firstDigit );
        }

        return numberStack.pop();
    }

    parseTokens(){

        return this.expression.split( ' ' )
            .map( t => new TokenModel({ symbol : t, parentEquation : this }) )
    }
    validTokens( equations = [] ){

        return this.parseTokens()
            .filter( t => t.isValid( equations ) )
    }
}