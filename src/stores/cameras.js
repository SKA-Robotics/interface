import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCameraStore = defineStore('cameras', () => {
    const address = window.location.hostname
    const port = 8100
    const url = computed(() =>
        new URL(`http://${address}:${port}/api`).toString()
    )

    const connected = ref(false)
    const producers = ref([])

    const fetchProducers = () => {
        console.log('[CAM]', 'Fetching streams...')

        fetch(`${url.value}/streams`, { cache: 'no-cache' })
            .then((raw) => {
                return raw.json()
            })
            .then((data) => {
                producers.value = []

                for (const key of Object.keys(data)) {
                    const name = key.replace(/[<">]/g, '')
                    const src = encodeURIComponent(name)

                    if (data[key].producers.length > 0) {
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
        url,
        connected,
        producers,

        connect,
    }
})
