<template>
  <UContainer>
    <h1 class="text-4xl font-semibold mb-3 mt-12">Classes</h1>
    <p class="text-lg">Manage your classes.</p>

    <div class="mt-14">
      <UButton @click="toggleCreateClassModal">Create a class</UButton>
      <div class="mt-14">
        <h2 class="text-2xl mb-8">Your Classes</h2>
        <div v-if="!classesData?.length">
          <p>No classes yet.</p>
        </div>
        <p v-if="classesError" class="text-red-500">
          Error loading your classes.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <UCard v-for="classItem in classesData" class="">
            {{ classItem.name }}
          </UCard>
        </div>
      </div>
    </div>

    <UModal v-model="createClassModalOpen" prevent-close>
      <UCard>
        <template #header> <div class="text-xl">Create class</div> </template>
        <div v-if="!creatingClassSuccess">
          <UFormGroup label="Class name" required class="my-6">
            <UInput v-model="className" placeholder="Section 2-A" size="xl" />
          </UFormGroup>
          <UAlert
            v-if="creatingClassError"
            color="red"
            title="Error creating class."
            icon="i-heroicons-exclamation-triangle-solid"
            variant="outline"
          />
          <div class="mt-14 flex justify-center">
            <UButton
              class="mx-4"
              :disabled="isCreatingClass"
              :loading="isCreatingClass"
              @click="createClass"
            >
              Create class
            </UButton>
            <UButton
              @click="closeModal"
              class="mx-4"
              variant="outline"
              color="red"
              :disabled="isCreatingClass"
            >
              Cancel
            </UButton>
          </div>
        </div>
        <div v-else>
          <p class="text-center">Successfully created class: {{ className }}</p>
          <div class="flex justify-center mt-8">
            <UButton @click="closeFinishedModal" variant="outline">
              Close
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
import type { Database } from "~/types/supabase.types";

const createClassModalOpen = ref<boolean>(false);
const className = ref<string>("");
const isCreatingClass = ref<boolean>(false);
const creatingClassError = ref<boolean>(false);
const creatingClassSuccess = ref<boolean>(false);
const supabase = useSupabaseClient<Database>();
const userStore = useUserStore();

const toggleCreateClassModal = () => {
  createClassModalOpen.value = !createClassModalOpen.value;
};

const {
  data: classesData,
  error: classesError,
  refresh,
} = await useAsyncData("classes", async () => {
  const { data } = await supabase.from("school_class").select().throwOnError();
  return data;
});

const resetDefaultData = () => {
  creatingClassSuccess.value = false;
  className.value = "";
};

const closeModal = () => {
  createClassModalOpen.value = false;
  resetDefaultData();
};

const closeFinishedModal = async () => {
  closeModal();
  await refresh();
};

const createClass = async () => {
  isCreatingClass.value = true;
  creatingClassError.value = false;

  try {
    await supabase
      .from("school_class")
      .insert({
        name: className.value,
        teacher_id: userStore.currentUser?.userId!,
      })
      .throwOnError();

    creatingClassSuccess.value = true;
  } catch (error) {
    creatingClassError.value = true;
  } finally {
    isCreatingClass.value = false;
  }
};
</script>
