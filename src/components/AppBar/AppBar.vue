<script setup>
import FIROExpandedLogo from '@/assets/FIROExpandedLogo'
import FIROLogo from '@/assets/FIROLogo'
import FIROSmallLogo from '@/assets/FIROSmallLogo'
import { useForceNavDrawerStore, useViewModeStore } from '@/stores'
import { computed } from 'vue'

import EditTools from './EditTools.vue'
import NormalTools from './NormalTools.vue'
import AutonomousSteering from './Streering/AutonomousSteering.vue'
import ManualSteering from './Streering/ManualSteering.vue'

const forceNavDrawerStore = useForceNavDrawerStore()
const viewModeStore = useViewModeStore()
const toggleDrawer = forceNavDrawerStore.toggle

const menuIcon = computed(() =>
    forceNavDrawerStore.opened ? 'mdi-chevron-left' : 'mdi-menu'
)
</script>
<template>
    <v-app-bar
        color="secondary"
        clipped-left
        clipped-right
        app
    >
        <v-app-bar-nav-icon
            color="primary"
            @click="toggleDrawer()"
            :disabled="$vuetify.breakpoint.mdAndUp"
        >
            <v-icon>
                {{ $vuetify.breakpoint.smAndDown ? menuIcon : null }}
            </v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
            <FIROExpandedLogo
                v-if="$vuetify.breakpoint.mdAndUp"
                height="32px"
                width="auto"
                style="margin-top: 7px"
            />
            <FIROLogo
                v-if="$vuetify.breakpoint.sm"
                height="32px"
                width="auto"
                style="margin-top: 7px"
            />
            <FIROSmallLogo
                v-if="$vuetify.breakpoint.xs"
                height="32px"
                width="auto"
                style="margin-top: 7px"
            />
        </v-toolbar-title>
        <v-spacer />
        <AutonomousSteering :show="viewModeStore.mode === 'normal'" />
        <ManualSteering :show="viewModeStore.mode === 'normal'" />
        <NormalTools
            key="normalTools"
            :show="viewModeStore.mode === 'normal'"
        />
        <EditTools
            key="editTools"
            :show="viewModeStore.mode === 'edit'"
        />
    </v-app-bar>
</template>
