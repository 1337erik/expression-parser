<template>

    <div class="mb-0 mr-2" :class=" tokenStatusClasses( token ) ">

        {{ token.rawValue }}
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'

    export default {

        props: {

            token : Object
        },
        computed: {

            ...mapGetters({

                tokenStatusClasses : 'solver/tokenStatusClasses'
            })
        }
    }
</script>

<style>

</style>