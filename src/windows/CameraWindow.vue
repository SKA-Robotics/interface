<script setup>
import { useCameraStore } from '@/stores'
import { computed, defineProps } from 'vue'

const cameraStore = useCameraStore()
const props = defineProps(['windowDimensions', 'extraConfig'])

const statusIcon = computed(() => {
    if (!cameraStore.connected) {
        return 'mdi-power-plug-off'
    } else {
        return 'none'
    }
})
</script>
<template>
    <div
        ref="containerRef"
        :style="{
            'background-color': 'black',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            width: props.windowDimensions.width + 'px',
            height: props.windowDimensions.height + 'px',
            overflow: 'hidden',
            position: 'relative',
        }"
    >
        <v-icon
            color="primary"
            class="status-icon"
            v-if="statusIcon !== 'none'"
        >
            {{ statusIcon }}
        </v-icon>
        <iframe
            width="100%"
            height="100%"
            :src="`http://localhost:8100/stream.html?src=${props.extraConfig.videoSource}`"
        ></iframe>
    </div>
</template>
<style scoped>
.video-name {
    text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
        2px 2px 0 #000, -3px 0px 0 #000, 0px -3px 0 #000, 3px 0px 0 #000,
        0px 3px 0 #000;
    color: white;
    font-size: 30px;
    position: absolute;
    top: 10px;
    left: 10px;
}
.status-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 100px;
    z-index: 10;
}
</style>
