import { VideoRTC } from './video-rtc'
import { SessionState } from './video-state'

export class VideoStream extends VideoRTC {
    constructor() {
        super()

        this.state = SessionState.idle
        this.onChangeState = () => {}
    }

    changeState(state) {
        this.state = state
        this.onChangeState(state)
    }

    oninit() {
        super.oninit()
    }

    onconnect() {
        const result = super.onconnect()

        if (result) {
            this.changeState(SessionState.loading)
        }

        return result
    }

    ondisconnect() {
        super.ondisconnect()

        this.changeState(SessionState.closed)
    }

    onopen() {
        const result = super.onopen()

        this.changeState(SessionState.streaming)

        return result
    }

    onclose() {
        this.changeState(SessionState.closed)

        return super.onclose()
    }
}
