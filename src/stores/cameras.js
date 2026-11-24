import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCameraStore = defineStore('cameras', () => {
    const address = window.location.hostname
    const apiPort = 9997
    const streamPort = 8889
    const apiUrl = computed(() =>
        new URL(`https://${address}:${apiPort}`).toString()
    )
    const streamUrl = computed(() =>
        new URL(`https://${address}:${streamPort}`).toString()
    )

    const connected = ref(false)
    const producers = ref([])

    const fetchProducers = () => {
        console.log('[CAM]', 'Fetching streams...')

        fetch(`${apiUrl.value}v3/paths/list`, {
            cache: 'no-cache',
            headers: {
                Authorization: 'Basic ' + btoa('rover' + ':' + 'skar'),
            },
        })
            .then((raw) => {
                return raw.json()
            })
            .then((data) => {
                producers.value = []

                for (const item of data.items) {
                    const name = item.name
                    const src = item.name

                    if (item.ready) {
                        producers.value = [...producers.value, src]
                    } else {
                        console.warn(`Stream without producers: ${name}`)
                    }
                }

                connected.value = true
            })
            .catch((err) => {
                connected.value = false
                console.log(err)
            })
    }

    setInterval(() => {
        fetchProducers()
    }, 100 * 1000)

    const connect = () => {
        console.log('[CAM]', 'Connecting...')
        fetchProducers()
    }

    return {
        url: streamUrl,
        connected,
        producers,

        connect,
    }
})
