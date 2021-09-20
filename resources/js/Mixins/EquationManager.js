import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import EquationModel from "../Classes/EquationModel";

export default {

    data(){

        return {

            baseUrl : 'equation',

            newEquation  : new EquationModel()
        }
    },
    computed: {

        ...mapGetters({

            equations    : 'solver/equations',
            nextVariable : 'solver/nextVariable',
            runningTotal : 'solver/runningTotal'
        }),
        isEmpty(){ return this.newEquation.expression.trim() == ''; }
    },
    methods: {

        getEquations(){

            axios.get( this.baseUrl )
                .then( res => {

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