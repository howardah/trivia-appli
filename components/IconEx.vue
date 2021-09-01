<template>
<svg class="w-5 inline-block -mr-2 -mt-1 ml-1" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 864 864" style="enable-background:new 0 0 864 864;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FFFFFF;}
</style>
<g>
	<circle :class="`fill-current text-${hue}-${tint.toString()} group-hover:text-${hue}-${hoverTint.toString()}`" cx="432" cy="432" r="432"/>
</g>
<polygon class="st0" points="665.4,269.4 594.6,198.6 432,361.3 269.4,198.6 198.6,269.4 361.3,432 198.6,594.6 269.4,665.4 
	432,502.7 594.6,665.4 665.4,594.6 502.7,432 "/>
</svg>

</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            hue: {
                type: String,
                default: 'gray'
            },
            tint: {
                type: Number,
                default: 700
            }
        },
        computed: {
            hoverTint():number {
                if(this.tint === 50) return 100;
                return this.tint + 100;
            }
        }
    })
</script>

<style scoped>

</style>