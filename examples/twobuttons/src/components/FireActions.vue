<template>
    <div>
        <div>
            <label>Give an input, and click to see the actions!</label>
            <input v-model="something" class="twobuttons-input"/>
        </div>
        <button @click="action1" class="twobuttons-btn1"> Fire action1!</button>
        <button @click="action2" class="twobuttons-btn2"> Fire action2!</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                something: 'something'
            };
        },
        methods: {
            action1() {
                this.$store.observe('action1', this.something);
//                this.$store.observe('action1', { 'text': this.something, number: Math.random() });
            },
            action2() {
                this.$store.observe('action2', this.something);
            },
        },
    };
</script>
