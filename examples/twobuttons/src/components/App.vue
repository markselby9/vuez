<template>
    <div>
        <span>Fire actions here: </span>
        <fire-actions></fire-actions>
        <span>Get results here: </span>
        <get-results></get-results>
    </div>
</template>

<script>
    import FireActions from './FireActions.vue';
    import GetResults from './GetResults.vue';

    export default {
        components: {
            FireActions,
            GetResults,
        },
    };
</script>
