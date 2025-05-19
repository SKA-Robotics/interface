/**
 * Session state
 * @typedef {enum} cameras.SessionState
 * @readonly
 * @property {0} idle - Default state when creating a new session, goes to <i>connecting</i> when starting
 * the session.
 * @property {1} loading - Stream is loading.
 * @property {2} streaming - Streaming.
 * @property {3} closed - Stream is closed.
 */
export const SessionState = Object.freeze({
    idle: 0,
    loading: 1,
    streaming: 2,
    closed: 3,
})
