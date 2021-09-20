<template>

    <div>

        <h3>Equations</h3>

        <equation v-for=" ( equation, i ) in equations " :key=" `equation${i}` " :equation=" equation "></equation>

        <div class="flex justify-between items-center w-1/4 my-4">

            <h3 class="">Total:</h3>
            <h3 class="font-bold text-2xl text-green-400">{{ this.runningTotal.toFixed( 2 ) }}</h3>
        </div>

        <div class="my-5 flex flex-row">

            <div class="w-16 flex items-center justify-center"><p class="mb-0">{{ `${nextVariable} = ` }}</p></div>
            <input v-model=" newEquation.expression " type="text" class="border-gray-200 rounded rounded-full shadow-md w-full" @keyup.enter=" addEquation " />
            <button @click=" addEquation() " class="bg-indigo-500 hover:bg-indigo-600 ml-4 p-2 px-4 rounded-lg shadow-md text-white disabled:opacity-50" :disabled=" isEmpty ">Add</button>
        </div>
    </div>
</template>

<script>

    import EquationManager from '../../Mixins/EquationManager';
    import Equation from './Equation.vue';

    export default {

        components: { Equation },
        mixins: [ EquationManager ],
        mounted(){

            this.getEquations();
        }
    }
</script>

<style scoped>

</style>