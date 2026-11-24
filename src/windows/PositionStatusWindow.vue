<script setup>
import { useTopicSubscriber } from '@/misc/roslibExtensions'
import { defineProps, ref } from 'vue'

const props = defineProps(['windowDimensions', 'extraConfig'])

const gps = ref(null)
const slam = ref(null)

useTopicSubscriber('/gps/fix', 'sensor_msgs/NavSatFix', (msg) => {
    gps.value = msg
})
</script>
<template>
    <div
        ref="containerRef"
        :style="{
            'background-color': 'white',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            width: props.windowDimensions.width + 'px',
            height: props.windowDimensions.height + 'px',
            overflow: 'hidden',
            position: 'relative',
        }"
    >
        <span
            color="black"
            class="status-icon"
        >
            {{ JSON.stringify(slam.value) }}
        </span>
    </div>
</template>
<style scoped>
.status-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    z-index: 10;
}
</style>
