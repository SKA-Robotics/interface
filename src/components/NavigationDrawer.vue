<script setup>
import panelViewConfig from '@/assets/panelViewConfig.json'
import { useForceNavDrawerStore } from '@/stores'
import { getCurrentInstance, onMounted, ref } from 'vue'

const items = ref(panelViewConfig)

const forceNavDrawer = useForceNavDrawerStore()
onMounted(() => {
    const currentInstance = getCurrentInstance()
    const $vuetify = currentInstance.proxy.$vuetify

    forceNavDrawer.set($vuetify.breakpoint.mdAndUp)
})

const isOpen = ref(false)
const onTransitionEnd = (event) =>
    (isOpen.value = event.target.clientWidth !== 56)
</script>
<template>
    <v-navigation-drawer
        color="primary"
        clipped
        app
        v-model="forceNavDrawer.opened"
        :mini-variant="$vuetify.breakpoint.mdAndUp"
        :expand-on-hover="$vuetify.breakpoint.mdAndUp"
        :permanent="$vuetify.breakpoint.mdAndUp"
        @transitionend="onTransitionEnd"
    >
        <v-list
            dense
            shaped
        >
            <v-list-item-group
                color="secondary"
                active-class="selected"
            >
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    :to="{
                        name: 'panel',
                        params: {
                            screen: $route.params.screen,
                            variant: item.name,
                        },
                    }"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <template v-slot:append>
            <v-pagination
                :value="parseInt($route.params.screen)"
                @input="
                    (value) =>
                        $router.push({
                            name: 'panel',
                            params: {
                                screen: value,
                                variant: $route.params.variant,
                            },
                        })
                "
                v-if="isOpen"
                :length="3"
                color="secondary"
            ></v-pagination>
            <ul
                class="v-pagination theme--light"
                v-if="!isOpen"
            >
                <li>
                    <button
                        class="v-pagination__item v-pagination__item--active secondary"
                    >
                        {{ $route.params.screen }}
                    </button>
                </li>
            </ul>
            <v-list-item
                dense
                link
                color="secondary"
                style="margin-bottom: 8px"
            >
                <v-list-item-icon>
                    <v-icon>mdi-cog</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Settings</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>
<style scoped>
.selected {
    color: var(--v-primary-base);
    background-color: var(--v-secondary-base);
}
</style>
