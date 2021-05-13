<template>
  <nav class="at-nav">
    <div
      v-for="(item, index) in items"
      :key="item.name + index"
    >
      <h2 class="at-nav__title">{{ item.title }}</h2>
      <ul class="at-nav__items">
        <template v-if="item.items">
          <li
            v-for="navItem in item.items"
            class="at-nav__item"
            :key="navItem.name"
          >
            <a
              :id="`${navItem.name.toLowerCase()}`"
              :class="['at-nav__page', routeLinkClasses(navItem.name)]"
              @click="handleRouteLinkClick(navItem.name)"
            >{{ navItem.title }}</a>
          </li>
        </template>
        <template v-if="item.groups">
          <li
            v-for="(group, idx) in item.groups"
            class="at-nav__item active"
            :key="group.title"
          >
            <a
              class="at-nav__group"
              @click="toggleMenu(idx)"
            >
              {{ group.title }}
              <i :class="iconClasses(idx)" />
            </a>
            <collapse-transition :is-show="show(idx)">
              <ul class="at-nav__child-items">
                {{ ' ' }}
                <li
                  class="at-nav__child-item"
                  v-for="navItem in group.items"
                  :key="navItem.name"
                >
                  <a
                    :id="`${navItem.name.toLowerCase()}`"
                    :class="['at-nav__component', routeLinkClasses(navItem.name)]"
                    @click="handleRouteLinkClick(navItem.name)"
                  >
                    {{ navItem.name }}
                    <span>{{ navItem.title }}</span>
                  </a>
                </li>
              </ul>
            </collapse-transition>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { useRouter, useSiteData } from 'vitepress'
import { computed, ref, defineComponent, watch, onMounted } from "vue"
import { useURL } from "../composables/url"
import CollapseTransition from "../composables/CollapseTransition.vue"
import "./IconList.scss"
import "./SideBar.scss"

export default defineComponent({
  name: "SideBar",

  components: {
    CollapseTransition
  },

  setup() {
    const router = useRouter()
    const siteData = useSiteData()
    const { baseURL, withBase } = useURL()
    const items = siteData.value.themeConfig.sidebar

    const activeID = ref('introduction')
    const currentOpenMenu = ref([0, 1, 2, 3, 4, 5, 6])

    const currentPath = computed(() => router.route.path)

    const show = computed(() => (idx: number) => {
      return currentOpenMenu.value.includes(idx) && currentPath.value !== baseURL
    })

    const iconClasses = computed(() => (idx) => ({
      'at-icon': true,
      'at-icon-chevron-down': !currentOpenMenu.value.includes(idx),
      'at-icon-chevron-up': currentOpenMenu.value.includes(idx)
    }))

    const routeLinkClasses = computed(() => (navItemName: string) => {
      const isActive = navItemName.toLowerCase() === activeID.value
        && currentPath.value.includes(navItemName.toLowerCase())

      return {
        'router-link-exact-active': isActive,
        'router-link-active': isActive
      }
    })

    watch(currentPath, (path) => {
      if (path !== baseURL) {
        activeID.value = path.replace('.html', '').split('docs/')[1]
      }
    })

    onMounted(() => {
      const id = window.location.href.replace('.html', '').split('docs/')[1]
      activeID.value = id
    })

    function handleRouteLinkClick(clickedID: string) {
      clickedID = clickedID.toLowerCase()
      if (activeID.value === clickedID) return

      activeID.value = clickedID
      router.go(withBase(`docs/${clickedID.toLowerCase()}.html`))
    }

    function toggleMenu(idx) {
      if (currentOpenMenu.value.includes(idx)) {
        currentOpenMenu.value.splice(currentOpenMenu.value.indexOf(idx), 1)
      } else {
        currentOpenMenu.value.push(idx)
      }
    }

    return {
      items,
      show,
      iconClasses,
      routeLinkClasses,
      toggleMenu,
      currentOpenMenu,
      handleRouteLinkClick
    }
  }
})
</script>