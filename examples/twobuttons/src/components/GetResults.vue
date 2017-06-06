<template>
    <div>
        <span>Result1: {{result1}}</span>
        <br>
        <span>Result2: {{result2}}</span>
    </div>
</template>

<script>
    /* eslint-disable prefer-template */

    export default {
        created() {
            this.$store.action('action1', (obj) => {
                this.result1 = 'action1 triggered with parameter: ' + JSON.stringify(obj);
//                this.result2 = '';
            });
            this.$store.action('action2', (obj) => {
                this.result2 = 'action2 triggered with parameter: ' + JSON.stringify(obj);
//                this.result1 = '';
            });
        },
        data() {
            return {
                result1: '',
                result2: '',
            };
        },
    };
</script>
