<template>
  <Container>
    <h1 class="text-5xl font-bold mb-3 mt-7">Classes</h1>
    <p class="text-lg">Manage your classes here.</p>

    <div class="my-7">
      <h2 class="text-3xl mb-4">{{ secondSectionHeadingTitle }}</h2>
      <Button @click="toggleModalByRole" size="small">
        {{ classActionBtnText }}
      </Button>
    </div>

    <div class="my-7">
      <h2 class="text-3xl mb-5">Your Classes</h2>
      <div v-if="!classes?.length">
        <p>No classes yet.</p>
      </div>
      <p v-if="isClassesError" class="text-red-500">
        Error loading your classes.
      </p>
      <div class="grid">
        <div v-for="classItem in classes" class="col-6 md:col-4">
          <NuxtLink :to="`/classes/${classItem._id}`" class="no-underline">
            <Card class="hover:shadow-4 transition-duration-300">
              <template #content>
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
              </template>
            </Card>
          </NuxtLink>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="joinClassModalOpen"
      modal
      header="Join Class"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">
        Join a class through a class code.
      </span>
      <div class="flex flex-column gap-3 my-3">
        <label for="class-code" class="font-semibold w-6rem">Class code</label>
        <InputText
          id="class-code"
          class="flex-auto"
          v-model="classCodeInput"
          placeholder="ABCD-1234"
        />
      </div>
      <Message v-if="isJoinClassError" severity="error">
        {{ joinClassErrorMessage }}
      </Message>
      <div class="flex justify-content-end gap-2 mt-5">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          :disabled="isJoinClassLoading"
          :loading="isJoinClassLoading"
          @click="closeModal"
        />
        <Button
          type="button"
          label="Join class"
          :disabled="isJoinClassLoading"
          @click="handleJoinClass"
        />
      </div>
    </Dialog>

    <Dialog
      v-model:visible="createClassModalOpen"
      modal
      header="Create Class"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">
        Create a class for students to join.
      </span>
      <div class="flex flex-column gap-3 my-3">
        <label for="class-name" class="font-semibold w-6rem">Class name</label>
        <InputText id="class-name" class="flex-auto" v-model="className" />
      </div>
      <Message v-if="isCreateClassError" severity="error">
        Error creating class
      </Message>
      <div class="flex justify-content-end gap-2 mt-5">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          :disabled="isCreateClassLoading"
          :loading="isCreateClassLoading"
          @click="closeModal"
        />
        <Button
          type="button"
          label="Create class"
          :disabled="isCreateClassLoading"
          @click="handleCreateClass"
        />
      </div>
    </Dialog>

    <Toast position="bottom-right" group="bottom-right" class="mt-7" />
  </Container>
</template>

<script setup lang="ts">
import { useClasses } from "~/composables/useClasses";
import { UserRole } from "~/types/common.types";

const createClassModalOpen = ref<boolean>(false);
const className = ref<string>("");
const creatingClassSuccess = ref<boolean>(false);
const isCreateClassError = ref<boolean>(false);

const classCodeInput = ref<string>("");
const joinClassModalOpen = ref<boolean>(false);
const joiningClassSuccess = ref<boolean>(false);
const isJoinClassError = ref<boolean>(false);
const joinClassErrorMessage = ref<string>("");

const userStore = useUserStore();
const toast = useToast();

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
  userRole.value === UserRole.TEACHER ? "Create class" : "Join class"
);

const secondSectionHeadingTitle = computed(() =>
  userRole.value === UserRole.TEACHER ? "Create a class" : "Join a class"
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

    toast.add({
      severity: "success",
      summary: "Successfully created class.",
      detail: `You just created class "${className.value}"`,
      life: 6000,
      group: "bottom-right",
    });
    closeModal();
    await getClasses();
  } catch (error) {
    isCreateClassError.value = true;
  }
};

const handleJoinClass = async () => {
  isJoinClassError.value = false;

  try {
    const res = await joinClass(classCodeInput.value);

    toast.add({
      severity: "success",
      summary: "Successfully joined class.",
      detail: `You just joined class "${res.class.name}""`,
      life: 6000,
      group: "bottom-right",
    });
    closeModal();
    await getClasses();
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
</script>
