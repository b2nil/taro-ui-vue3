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
            v-for="(navItem, itemIndex) in item.items"
            class="at-nav__item"
            :key="navItem.name"
          >
            <a
              :id="`${navItem.name}-${itemIndex}`"
              :class="routeLinkClasses(item, navItem.name, itemIndex)"
              :href="`${siteData.base + item.name.toLowerCase()}/${navItem.name.toLowerCase()}.html`"
              @click="handleRouteLinkClick(`${navItem.name}-${itemIndex}`, $event)"
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
            <collapse-transition :is-show="currentOpenMenu.includes(idx)">
              <ul class="at-nav__child-items">
                {{ ' ' }}
                <li
                  class="at-nav__child-item"
                  v-for="(navItem, itemIndex) in group.items"
                  :key="navItem.name"
                >
                  <a
                    :id="`${navItem.name}-${itemIndex}`"
                    :class="routeLinkClasses(item, navItem.name, itemIndex)"
                    :href="`${siteData.base}docs/${navItem.name.toLowerCase()}.html`"
                    @click="handleRouteLinkClick(`${navItem.name}-${itemIndex}`, $event)"
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

<script>
import { useRoute, useSiteData } from 'vitepress'
import { computed, toRef, ref, watch } from "vue"
import CollapseTransition from "../composables/CollapseTransition.vue"

import "./IconList.scss"
import "./SideBar.scss"

export default {
  name: "SideBar",

  components: {
    CollapseTransition
  },

  props: {
    data: { type: Array, default: [] }
  },

  setup(props) {
    const route = useRoute()
    const siteData = useSiteData()

    const currentOpenMenu = ref([0, 1, 2, 3, 4, 5, 6])
    const activeID = ref('Introduction-0')
    const active = ref(false)

    const iconClasses = computed(() => (idx) => ({
      'at-icon': true,
      'at-icon-chevron-down': !currentOpenMenu.value.includes(idx),
      'at-icon-chevron-up': currentOpenMenu.value.includes(idx)
    }))

    const routeLinkClasses = computed(() => (item, navItemName, itemIndex) => {
      const linkID = `${navItemName}-${itemIndex}`

      if (route.path === `${siteData.value.base}docs/introduction.html` || route.path === `${siteData.value.base}docs/resource.html`) {
        return {
          'at-nav__page': true,
          'router-link-exact-active': route.path.includes(navItemName.toLowerCase()) && route.path !== siteData.value.base,
          'router-link-active': route.path.includes(navItemName.toLowerCase()) && route.path !== siteData.value.base
        }
      }

      active.value = route.path !== siteData.value.base

      return {
        'at-nav__page': Boolean(item.items),
        'at-nav__component': Boolean(item.groups),
        'router-link-exact-active': active.value && linkID === activeID.value,
        'router-link-active': active.value && linkID === activeID.value
      }
    })

    function handleRouteLinkClick(id, event) {
      activeID.value = event.target.id
      active.value = activeID.value === id
    }

    function toggleMenu(idx) {
      if (currentOpenMenu.value.includes(idx)) {
        currentOpenMenu.value.splice(currentOpenMenu.value.indexOf(idx), 1)
      } else {
        currentOpenMenu.value.push(idx)
      }
    }

    return {
      items: toRef(props, 'data'),
      siteData,
      currentOpenMenu,
      iconClasses,
      routeLinkClasses,
      handleRouteLinkClick,
      toggleMenu
    }
  }
}
</script>