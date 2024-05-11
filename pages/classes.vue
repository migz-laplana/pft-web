<template>
  <UContainer>
    <h1 class="text-4xl font-semibold mb-3 mt-12">Classes</h1>
    <p class="text-lg">Manage your classes.</p>

    <div class="mt-14">
      <UButton @click="toggleCreateClassModal">Create a class</UButton>
      <div class="mt-14">
        <h2 class="text-2xl mb-8">Your Classes</h2>
        <div v-if="!classes?.length">
          <p>No classes yet.</p>
        </div>
        <p v-if="isClassesError" class="text-red-500">
          Error loading your classes.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <UCard v-for="classItem in classes" class="">
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
            v-if="isCreateClassError"
            color="red"
            title="Error creating class."
            icon="i-heroicons-exclamation-triangle-solid"
            variant="outline"
          />
          <div class="mt-14 flex justify-center">
            <UButton
              class="mx-4"
              :disabled="isCreateClassLoading"
              :loading="isCreateClassLoading"
              @click="handleCreateClass"
            >
              Create class
            </UButton>
            <UButton
              @click="closeModal"
              class="mx-4"
              variant="outline"
              color="red"
              :disabled="isCreateClassLoading"
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
import { useClasses } from "~/composables/useClasses";

const createClassModalOpen = ref<boolean>(false);
const className = ref<string>("");
const creatingClassSuccess = ref<boolean>(false);
const isCreateClassError = ref<boolean>(false);

const {
  classes,
  getClasses,
  isClassesError,
  createClass,
  isCreateClassLoading,
} = useClasses();

const toggleCreateClassModal = () => {
  createClassModalOpen.value = !createClassModalOpen.value;
};

const handleCreateClass = async () => {
  isCreateClassError.value = false;

  try {
    await createClass(className.value);
    creatingClassSuccess.value = true;
  } catch (error) {
    isCreateClassError.value = true;
  }
};

const resetDefaultData = () => {
  creatingClassSuccess.value = false;
  isCreateClassError.value = false;
  className.value = "";
};

const closeModal = () => {
  createClassModalOpen.value = false;
  resetDefaultData();
};

const closeFinishedModal = async () => {
  closeModal();
  await getClasses();
};
</script>
