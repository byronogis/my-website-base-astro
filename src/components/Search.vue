<script setup lang="ts">
import { ref } from 'vue'
import { NEmpty, NInput, NModal, NSpin } from 'naive-ui'

const isLoading = ref(false)

// pagefind
let pagefind: any = null
let pagefindLoaded = false

// modal
const modalProps = ref<{
  show: boolean
  autoFocus: boolean
  closable: boolean
  displayDirective: 'show' | 'if'
}>({
  show: false,
  autoFocus: true,
  closable: false,
  displayDirective: 'show',
})

// innput
const inputProps = ref<{
  value: string
  placeholder: string
  size: 'tiny' | 'small' | 'medium' | 'large'
  type: 'text' | 'password' | 'textarea'
}>({
  value: '',
  placeholder: '输入要搜索的内容',
  size: 'large',
  type: 'text',
})
const isInputComplete = ref(true)

// result
const resultList = ref<any>([])

const handleInputKeyUp = async () => {
  if (!isInputComplete.value) {
    return
  }

  if (!inputProps.value.value) {
    resultList.value = []
    return
  }

  isLoading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (!pagefindLoaded) {
      pagefind = await import(new URL('/pagefind/pagefind.js', location.origin).href)
      pagefindLoaded = true
    }

    const search = await pagefind.search(inputProps.value.value)

    const results = []
    for (const result of search.results) {
      const data = await result.data()
      results.push(data)
    }
    resultList.value = results
  } catch (err) {
    console.error(err)
    resultList.value = []
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="components-search">
    <div class="components-search-trigger" @click="modalProps.show = true">
      <slot />
    </div>

    <NModal
      v-bind="modalProps"
      class="w-75vw lt-sm:w-90vw"
      preset="card"
      @update:show="modalProps.show = $event"
    >
      <template #header>
        <NInput
          class="components-search-search"
          v-bind="inputProps"
          @update:value="inputProps.value = $event"
          @keyup="handleInputKeyUp"
          @compositionstart="isInputComplete = false"
          @compositionend="isInputComplete = true"
        />
      </template>
      <template #default>
        <div v-if="resultList.length" class="p-2">
          {{ resultList.length }} posts for type
        </div>

        <div
          class="components-search-results min-h-150px max-h-75vh lt-sm:max-h-60vh overflow-y-auto"
          :class="(isLoading || !resultList.length) ? 'flex justify-center items-center' : ''"
        >
          <template v-if="isLoading">
            <NSpin size="large" />
          </template>
          <template v-else>
            <template v-if="!resultList.length">
              <NEmpty size="large" />
            </template>
            <template v-else>
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
