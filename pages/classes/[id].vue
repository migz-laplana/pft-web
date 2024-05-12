<template>
  <div>
    <UContainer>
      <UBreadcrumb class="mb-5" :links="breadcumbLinks" />
      <div v-if="isClassLoading">
        <p>Loading class data...</p>
      </div>
      <div v-else-if="isClassError">
        <p>Failed to load class data.</p>
      </div>
      <div v-else>
        <h1 class="text-4xl font-bold">{{ singleClass?.name }}</h1>
        <p class="mt-4">
          Class code:
          <span class="font-bold">{{ singleClass?.classCode }}</span>
        </p>
        <p class="mt-4">
          Number of students: {{ singleClass?.students.length }}
        </p>

        <h2 class="mt-16 font-medium text-3xl">Students</h2>
        <UTable class="mt-10" :columns="tableColumns" :rows="students" />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { apiRoutes } from "~/constants/api";
import type { SchoolClass } from "~/types/common.types";

const route = useRoute();

const tableColumns = [
  {
    key: "firstName",
    label: "First name",
  },
  {
    key: "lastName",
    label: "Last name",
  },
  {
    key: "email",
    label: "Email",
  },
];

const {
  data: singleClass,
  pending: isClassLoading,
  error: isClassError,
} = await useCustomFetch<SchoolClass>(
  `${apiRoutes.classes.index}/${route.params.id}`
);

const breadcumbLinks = generateBreadcrumbs(
  route.fullPath,
  singleClass.value?.name ?? "Current class"
);

const students = computed(() => {
  if (!singleClass) return [];

  return singleClass.value?.students;
});
</script>

<style></style>
