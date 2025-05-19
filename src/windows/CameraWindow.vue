<script setup>
import { SessionState } from '@/lib/go2rtc/video-state'
import { useCameraStore } from '@/stores'
import { computed, defineProps, onMounted, ref } from 'vue'

const cameraStore = useCameraStore()
const props = defineProps(['windowDimensions', 'extraConfig'])
const state = ref(SessionState.idle)

const containerRef = ref(null)

const statusIcon = computed(() => {
    if (!cameraStore.connected) {
        return 'mdi-power-plug-off'
    } else {
        return (
            {
                [SessionState.closed]: 'mdi-video-off',
                [SessionState.loading]: 'mdi-loading',
                [SessionState.streaming]: 'none',
            }[state.value] || 'mdi-help'
        )
    }
})

onMounted(() => {
    const container = containerRef.value

    if (!container) {
        return
    }

    const stream = document.createElement('video-stream')

    stream.onChangeStream = (newState) => {
        console.log('Change', newState)
        state.value = newState
    }

    stream.style.width = '100%'
    stream.style.height = '100%'
    stream.background = true
    stream.src = new URL(
        cameraStore.url +
            '/ws?src=' +
            encodeURIComponent(props.extraConfig.videoSource)
    ).toString()

    container.appendChild(stream)
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
video-stream {
    width: 100%;
    height: 100%;
}
</style>
