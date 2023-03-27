<script setup lang="ts">
import { ref } from 'vue'
import { NEmpty, NModal } from 'naive-ui'

const show = ref(false)
const searchRef = ref<HTMLInputElement | null>(null)
const resultsRef = ref<HTMLDivElement | null>(null)
const resultList = ref<any>([])

let pagefind: any = null

const isInputComplete = ref(true)

const handleSearchInput = async (e: any) => {
  if (searchRef.value && searchRef.value.dataset.loaded !== 'true') {
    searchRef.value.dataset.loaded = 'true'
    pagefind = await import(new URL('/pagefind/pagefind.js', location.origin).href)
  }

  if (!isInputComplete.value) {
    return
  }

  const search = await pagefind.search(e.target.value)

  const results = []

  for (const result of search.results) {
    const data = await result.data()
    results.push(data)
  }

  resultList.value = results
}
</script>

<template>
  <div class="components-search">
    <div class="components-search-trigger" @click="show = !show">
      <slot />
    </div>

    <NModal
      v-model:show="show"
      class="w-75vw lt-sm:w-90vw"
      preset="card"
      :auto-focus="true"
      :closable="false"
      display-directive="show"
    >
      <template #header>
        <input
          ref="searchRef"
          class="components-search-search text-2xl w-full p-2 b-2px"
          type="text"
          tabindex="0"
          placeholder="Search..."
          @keyup="handleSearchInput"
          @compositionstart="isInputComplete = false"
          @compositionend="isInputComplete = true"
        >
      </template>
      <template #default>
        <div v-if="resultList.length" class="p-2">
          {{ resultList.length }} posts for type
        </div>

        <div
          ref="resultsRef"
          class="components-search-results max-h-75vh lt-sm:max-h-60vh overflow-y-auto"
        >
          <template v-if="resultList.length">
            <div
              v-for="(item, index) in resultList"
              :key="index"
              class="card-list-item m-b-2 last:m-b-0"
            >
              <a :href="item.url">
                <h3 class="text-lg text-current m-y-2">{{ item.meta.title }}</h3>
                <p class="text-base text-gray" v-html="item.excerpt" />
              </a>
            </div>
          </template>
          <template v-else>
            <NEmpty size="huge" />
          </template>
        </div>
      </template>
    </NModal>
  </div>
</template>

<style scoped>
.components-search {
  display: inline-block;
}

.components-search-trigger {
  cursor: pointer;
}
</style>
