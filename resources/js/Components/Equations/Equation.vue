<template>

  <div class="mb-2 flex items-center justify-between p-4 shadow-sm">

        <div class="flex flex-1 items-center">

            <div class="flex flex-1 items-center">

                <p class="mb-0 mr-2">{{ equation.variable }} =</p>
                <input v-if=" updating " v-model=" equation.expression " type="text" class="border-gray-200 rounded rounded-full shadow-md justify-self-end" @keyup.enter=" sendUpdate( equation ) " />
                <token v-else v-for=" ( token, i ) in equationTokens( equation ) " :key=" `token${i}` " :token=" token "></token>
            </div>
            <div class="flex-1">

                <p class="font-right mb-0" :class=" equationStatusClasses( equation ) ">{{ equation.isValid( equations ) ? equationValue( equation ).toFixed( 2 ) : validityString }}</p>
            </div>
        </div>
        <div class="flex flex-1 items-center justify-end">

            <button type="button" class="bg-blue-400 py-2 px-4 rounded text-white mr-2" @click=" updating = true " v-if=" updating == false ">Edit</button>
            <button type="button" class="bg-green-400 py-2 px-4 rounded text-white mr-2" @click=" sendUpdate( equation ) " v-if=" updating == true ">Save</button>

            <button type="button" class="bg-red-400 py-2 px-4 rounded text-white" @click=" deleteEquation( equation ) ">Delete</button>
        </div>
  </div>
</template>

<script>

    import { mapGetters } from 'vuex';
    import EquationManager from '../../Mixins/EquationManager';
    import Token from './Token';

    export default {

        components: { Token },
        mixins: [ EquationManager ],
        props: {

            equation: {

                type    : Object,
                default : () => {}
            }
        },
        data(){

            return {

                updating : false
            }
        },
        computed: {

            ...mapGetters({

                equationTokens        : 'solver/equationTokens',
                equationValue         : 'solver/equationValue',
                equationStatusClasses : 'solver/equationStatusClasses'
            }),
            validityString(){ return this.updating ? '---' : 'invalid expression'; }
        },
        methods: {

            sendUpdate( eq ){

                this.updating = false;
                this.updateEquation( eq );
            }
        }
    }
</script>

<style>

</style>