<script setup>
import { useTopicSubscriber } from '@/misc/roslibExtensions'
import { defineProps, ref } from 'vue'

const props = defineProps(['windowDimensions', 'extraConfig'])

const status = ref('idle')

useTopicSubscriber('/navigation/status', 'std_msgs/String', (msg) => {
    status.value = msg.data
})

const getColor = (val) => {
    console.log(val)
    if (val === 'running') return 'red'
    if (val === 'done') return 'lime'
    return 'white'
}
</script>
<template>
    <div
        ref="containerRef"
        :style="{
            'background-color': getColor(status),
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
            {{ status }}
        </span>
    </div>
</template>
<style scoped>
.status-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 100px;
    z-index: 10;
}
</style>
