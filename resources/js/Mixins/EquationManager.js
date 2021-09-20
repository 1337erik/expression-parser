import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import EquationModel from "../Classes/EquationModel";

/**
 * This mixin handle business logic and is the bridge between the persistence layer ( in vuex ) and the backend-api.
 *  Mixins are essentially vue's service layer class and provide extra benefits like access to vue's reactivity via vuex getters and computed properties
 * 
 * Relatively thin and simple, and the generic CRUD functionalities can stand to be abstracted out to another mixin so that
 *  the functionality doesnt have to be repeated for every model
 */
export default {

    data(){

        return {

            baseUrl     : 'equation', // the base url for the model/controller
            newEquation : new EquationModel() // for any component looking to add a new equation
        }
    },
    computed: {

        ...mapGetters({

            equations    : 'solver/equations',
            nextVariable : 'solver/nextVariable',
            runningTotal : 'solver/runningTotal'
        }),
        isEmpty(){ return this.newEquation.expression.trim() == ''; } // simple validation for a component's form input
    },
    methods: {

        getEquations(){

            axios.get( this.baseUrl )
                .then( res => {
                    // initialize the stack of items 

                    this.setEquations( res.data.equations );
                })
                .catch( err => {

                    console.error( 'fetch ERROR', err );
                })
        },
        addEquation(){

            if( this.isEmpty ) return;

            axios.post( this.baseUrl, { variable: this.nextVariable, expression: this.newEquation.expression })
                .then( res => {

                    if( res.data && res.data.newEquation && res.data.newEquation.id ){
                        // if the response is valid, add the returned itemt to the vuex store

                        this.addItem( res.data.newEquation );
                        this.newEquation = new EquationModel();
                    }
                })
                .catch( err => {

                    console.error( 'fetch ERROR', err );
                })
        },
        deleteEquation( equation ){

            axios.delete( `${this.baseUrl}/${equation.id}` )
                .then( res => {

                    if( res.data && res.data.success ){
                        // if the response is valid, delete the item in the vuex store

                        this.deleteItem( equation );
                    }
                })
                .catch( err => {

                    console.error( 'delete ERROR', err );
                });
        },
        updateEquation( equation ){

            axios.patch( `${this.baseUrl}/${equation.id}`, { variable: equation.variable, expression: equation.expression } )
                .then( res => {

                    if( res.data && res.data.updatedEquation && res.data.updatedEquation.id ){
                        // if the response is valid, update the item in the vuex store

                        this.updateItem( equation );
                    }
                })
                .catch( err => {

                    console.error( 'update ERROR', err );
                });
        },
        ...mapActions({

            setEquations : 'solver/setEquations',
            addItem      : 'solver/addItem',
            deleteItem   : 'solver/deleteItem',
            updateItem   : 'solver/updateItem'
        })
    }
}