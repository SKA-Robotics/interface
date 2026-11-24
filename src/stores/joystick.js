import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useJoystickStore = defineStore('joystick', () => {
    const joystick = ref(null)

    const connectListener = ref(null)
    const disconnectListener = ref(null)

    const connected = computed(() => !!joystick.value)

    const findJoystick = async () => {
        const gamepads = navigator.getGamepads()
        for (const gamepad of gamepads) {
            if (gamepad && gamepad.connected) {
                joystick.value = gamepad
                return
            }
        }
        joystick.value = null
    }

    function start() {
        connectListener.value = window.addEventListener(
            'gamepadconnected',
            () => {
                findJoystick()
            }
        )
        disconnectListener.value = window.addEventListener(
            'gamepaddisconnected',
            () => {
                findJoystick()
            }
        )
    }

    function stop() {
        if (connectListener.value) {
            window.removeEventListener(
                'gamepadconnected',
                connectListener.value
            )
            connectListener.value = null
        }
        if (disconnectListener.value) {
            window.removeEventListener(
                'gamepaddisconnected',
                disconnectListener.value
            )
            disconnectListener.value = null
        }
    }

    const gamepadIds = {
        '045e-02ea-Microsoft X-Box One S pad': 'xboxOneS',
        '045e-02fd-Xbox Wireless Controller': 'xboxOneS',
        '045e-0b12-Microsoft Xbox Series S|X Controller': 'xboxSeriesSX',
        '8BitDo 8BitDo Ultimate 2C Wireless Controller (Vendor: 2dc8 Product: 310a)':
            'xboxSeriesSX',
        '8BitDo Ultimate 2C Wireless (Vendor: 2dc8 Product: 301b)': 'standard',
    }

    const getJoystick = () => navigator.getGamepads()[0]

    const getAxes = () => {
        const joystick = getJoystick()
        if (joystick.mapping === 'standard') {
            return joystick.axes
        } else {
            const axes = joystick.axes
            const gamepadType = gamepadIds[joystick.id]
            switch (gamepadType) {
                case 'xboxOneS':
                case 'xboxSeriesSX':
                    return [axes[0], axes[1], axes[3], axes[4]]
                case 'standard':
                    return axes
                default:
                    return []
            }
        }
    }

    const getButtons = () => {
        const joystick = getJoystick()
        if (joystick.mapping === 'standard') {
            return joystick.buttons.map((btn) => btn.value)
        } else {
            const axes = joystick.axes
            const buttons = joystick.buttons.map((btn) => btn.value)
            const gamepadType = gamepadIds[joystick.id]
            switch (gamepadType) {
                case 'xboxOneS':
                case 'xboxSeriesSX':
                default:
                    return [
                        buttons[0],
                        buttons[1],
                        buttons[2],
                        buttons[3],
                        buttons[4],
                        buttons[5],
                        axes[2] === 0.0 ? 0.0 : (axes[2] + 1) / 2,
                        axes[5] === 0.0 ? 0.0 : (axes[5] + 1) / 2,
                        buttons[6],
                        buttons[7],
                        buttons[9],
                        buttons[10],
                        axes[7] === -1.0 ? 1 : 0,
                        axes[7] === 1.0 ? 1 : 0,
                        axes[6] === -1.0 ? 1 : 0,
                        axes[6] === 1.0 ? 1 : 0,
                        buttons[8],
                    ]
                case 'standard':
                    return buttons
            }
        }
    }

    return {
        connected,
        joystick,

        getJoystick,
        getAxes,
        getButtons,

        start,
        stop,
    }
})
