<template>
  <UContainer>
    <h1 class="text-4xl font-semibold mb-3 mt-12">Classes</h1>
    <p class="text-lg">Manage your classes.</p>

    <div class="mt-14">
      <UButton @click="toggleModalByRole">
        {{ classActionBtnText }}
      </UButton>
      <div class="mt-14">
        <h2 class="text-2xl mb-8">Your Classes</h2>
        <div v-if="!classes?.length">
          <p>No classes yet.</p>
        </div>
        <p v-if="isClassesError" class="text-red-500">
          Error loading your classes.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <UCard
            v-for="classItem in classes"
            @click="navigateTo(`/classes/${classItem._id}`)"
            class="cursor-pointer"
          >
            <h2 class="text-xl font-medium">
              {{ classItem.name }}
            </h2>
            <p>Code: {{ classItem.classCode }}</p>
            <p>Students: {{ classItem.students.length }}</p>
            <p v-if="userRole === UserRole.STUDENT">
              Teacher:
              {{
                `${classItem?.teacher.firstName} ${classItem?.teacher.lastName}`
              }}
            </p>
          </UCard>
        </div>
      </div>
    </div>

    <UModal v-model="joinClassModalOpen" prevent-close>
      <UCard>
        <template #header> <div class="text-xl">Join class</div> </template>
        <div v-if="!joiningClassSuccess">
          <UFormGroup label="Class code" required class="my-6">
            <UInput
              v-model="classCodeInput"
              placeholder="ABCD-1234"
              size="xl"
            />
          </UFormGroup>
          <UAlert
            v-if="isJoinClassError"
            color="red"
            :title="joinClassErrorMessage"
            icon="i-heroicons-exclamation-triangle-solid"
            variant="outline"
          />
          <div class="mt-14 flex justify-center">
            <UButton
              class="mx-4"
              :disabled="isJoinClassLoading"
              :loading="isJoinClassLoading"
              @click="handleJoinClass"
            >
              Join class
            </UButton>
            <UButton
              @click="closeModal"
              class="mx-4"
              variant="outline"
              color="red"
              :disabled="isJoinClassLoading"
            >
              Cancel
            </UButton>
          </div>
        </div>
        <div v-else>
          <p class="text-center">Successfully joined class!</p>
          <div class="mt-5 ml-7">
            <p>Class name: {{ joinedClass?.name }}</p>
            <p>
              Teacher:
              {{
                `${joinedClass?.teacher.firstName} ${joinedClass?.teacher.lastName}`
              }}
            </p>
          </div>
          <div class="flex justify-center mt-8">
            <UButton @click="closeFinishedModal" variant="outline">
              Close
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>

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
import { type SchoolClass, UserRole } from "~/types/common.types";

const createClassModalOpen = ref<boolean>(false);
const className = ref<string>("");
const creatingClassSuccess = ref<boolean>(false);
const isCreateClassError = ref<boolean>(false);

const classCodeInput = ref<string>("");
const joinClassModalOpen = ref<boolean>(false);
const joiningClassSuccess = ref<boolean>(false);
const isJoinClassError = ref<boolean>(false);
const joinClassErrorMessage = ref<string>("");
const joinedClass = ref<SchoolClass>();

const userStore = useUserStore();

const {
  classes,
  getClasses,
  isClassesError,
  createClass,
  joinClass,
  isCreateClassLoading,
  isJoinClassLoading,
} = await useClasses();

const userRole = computed(() => userStore.currentUser?.role);

const classActionBtnText = computed(() =>
  userStore.currentUser?.role === UserRole.TEACHER
    ? "Create class"
    : "Join class"
);

const toggleModalByRole = () => {
  if (userRole.value === UserRole.TEACHER) {
    createClassModalOpen.value = !createClassModalOpen.value;
  } else {
    joinClassModalOpen.value = !joinClassModalOpen.value;
  }
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

const handleJoinClass = async () => {
  isJoinClassError.value = false;

  try {
    const res = await joinClass(classCodeInput.value);
    joinedClass.value = res.class;

    joiningClassSuccess.value = true;
  } catch (error: any) {
    isJoinClassError.value = true;

    let errorMessage: string;

    switch (error.data.error) {
      case JoinClassErrorName.NoClassFound:
        errorMessage = JoinClassErrorMessage.NoClassFound;
        break;
      case JoinClassErrorName.AlreadyEnrolled:
        errorMessage = JoinClassErrorMessage.AlreadyEnrolled;
        break;
      default:
        errorMessage = JoinClassErrorMessage.Default;
    }

    joinClassErrorMessage.value = errorMessage;
  }
};

const resetDefaultData = () => {
  creatingClassSuccess.value = false;
  isCreateClassError.value = false;
  joiningClassSuccess.value = false;
  isJoinClassError.value = false;
  className.value = "";
  classCodeInput.value = "";
};

const closeModal = () => {
  createClassModalOpen.value = false;
  joinClassModalOpen.value = false;
  resetDefaultData();
};

const closeFinishedModal = async () => {
  closeModal();
  await getClasses();
};
</script>
