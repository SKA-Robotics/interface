<script setup>
import AppBar from '@/components/AppBar'
import BatteryBar from '@/components/BatteryBar.vue'
import EditDrawer from '@/components/EditDrawer'
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import PanelWindow from '@/components/PanelWindow'
import { useLayoutStore, useViewModeStore } from '@/stores'
import { computed } from 'vue'
import { GridItem, GridLayout } from 'vue-grid-layout'

const viewModeStore = useViewModeStore()
const layoutStore = useLayoutStore()

const isEditMode = computed(() => viewModeStore.mode === 'edit')
</script>
<template>
    <div style="width: 100%; flex-grow: 1; display: flex">
        <AppBar />
        <NavigationDrawer />
        <BatteryBar />
        <EditDrawer />
        <v-main>
            <div
                class="grey lighten-4 content-wrapper"
                :style="{ 'user-select': isEditMode ? 'none' : 'text' }"
            >
                <GridLayout
                    :key="`${layoutStore.panel} ${layoutStore.screen}`"
                    :layout.sync="layoutStore.layout.shape"
                    :col-num="12"
                    :row-height="100"
                    :is-draggable="isEditMode"
                    :is-resizable="isEditMode"
                    :responsive="true"
                    :use-css-transforms="true"
                >
                    <GridItem
                        v-for="item in layoutStore.layout.shape"
                        :key="item.i"
                        :static="false"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                        :i="item.i"
                        class="window-wrapper"
                        dragAllowFrom=".window-grab-handle"
                    >
                        <PanelWindow :id="item.i" />
                    </GridItem>
                </GridLayout>
            </div>
        </v-main>
    </div>
</template>
<style scoped>
.content-wrapper {
    height: calc(100vh - 64px);
    overflow: scroll;
}
.window-wrapper {
    display: flex;
    touch-action: none;
}
</style>
