import { computed, ComputedRef } from "vue"
import { useRoute, useSiteData, joinPath, Route } from "vitepress"
import { default as demoPathMap } from "../../page-route"

export function useURL() {
  const site = useSiteData()
  const baseURL = site.value.base

  function withBase(path: string): string {
    return joinPath(site.value.base, path)
  }

  return {
    baseURL,
    withBase
  }
}

export function useHome() {
  const route = useRoute()
  const site = useSiteData()
  const isHome = computed(() => route.path === site.value.base)

  return {
    isHome
  }
}

interface CustomRoute extends Route {
  demoPath: ComputedRef<string>
}

export function useCustomRoute(): CustomRoute {
  const route = useRoute()


  const demoPath = computed(() => {
    const pathname = route.data.relativePath.replace(".md", "")
    const key = pathname.split('/')[1]
    return demoPathMap[key]
  })

  return {
    ...route,
    demoPath
  }
}