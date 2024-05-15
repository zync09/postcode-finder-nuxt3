<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Postcode Search</h1>
          <ColorScheme><USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" /></ColorScheme>
        </div>
      </template>
      <div>
        <UForm class="flex gap-2" :state="formState" @submit="handleSubmit">
          <UFormGroup class="flex-1" name="postcodes" >
              <UInput type="text" v-model="formState.postcodes" placeholder="Search for a postcode or collection of postcodes. eg. 3138,3196,3000"></UInput>
          </UFormGroup>
          <UButton type="submit">Search</UButton>
          <UButton type="reset" @click="handleClearResults">Clear</UButton>
        </UForm>
      </div>
      <template #footer>
        <div v-if="postcodeData">
          <UCard class="w-full">
            <template #header>
              Last Search Results:
            </template>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              <UCard v-for="item in postcodeData.filteredPostcodes" :key="item.postcode" class="flex-1">
                <h2 class="text-sm font-bold">{{ item.locality }}</h2>
                <h3 class="text-xs">{{ item.postcode }}</h3>
                <div class="mt-3">{{ item.state }}</div>
              </UCard>
            </div>
            <template #footer v-if="postcodeData?.unknownPostcodes?.length">
              Unknown Postcodes: {{ postcodeData.unknownPostcodes.join(', ') }}
            </template>
          </UCard>
        </div>
        <div v-if="error">
          {{ error }}
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
interface PostcodeItem {
  postcode: string;
  state: string;
  locality: string;
}
interface PostCodeResults {
  filteredPostcodes: PostcodeItem[],
  unknownPostcodes: string[]
}

const formState = ref({
  postcodes: '',
});

const {data:postcodeData, error, execute, } = await useLazyFetch<PostCodeResults>('/api/search/by-postcode', {
  method: 'GET',
  params: formState,
  watch: false,
  immediate: false
})

watch(error, (value) => {
  if (value) {
    console.error(value);
  }
})

async function handleSubmit() {
  execute();
}

function handleClearResults() {
  formState.value.postcodes = '';
  postcodeData.value = null;
}
</script>