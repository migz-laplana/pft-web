<template>
  <div>
    <Container>
      <NuxtLink to="/classes">
        <Button
          class="mt-4"
          severity="secondary"
          icon="pi pi-angle-left"
          label="Back to classes"
          size="small"
        />
      </NuxtLink>
      <div v-if="isClassLoading">
        <p>Loading class data...</p>
      </div>
      <div v-else-if="isClassError">
        <p>Failed to load class data.</p>
      </div>
      <div v-else>
        <h1 class="text-5xl font-bold mb-3 mt-6">{{ singleClass?.name }}</h1>
        <p class="mt-4">
          Class code:
          <span class="font-bold">{{ singleClass?.classCode }}</span>
        </p>
        <p class="mt-4">
          Number of students: {{ singleClass?.students.length }}
        </p>

        <h2 class="mt-7 font-bold text-3xl">Students</h2>
        <UTable class="mt-10" :columns="tableColumns" :rows="students" />
        <Card>
          <template #content>
            <DataTable
              :value="students"
              paginator
              :rows="10"
              sort-field="lastName"
              :sort-order="1"
            >
              <Column
                v-for="column in tableColumns"
                :field="column.key"
                :header="column.label"
                sortable
              />
            </DataTable>
          </template>
        </Card>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import { apiRoutes } from "~/constants/api";
import type { SchoolClass } from "~/types/common.types";

const route = useRoute();

const tableColumns = [
  {
    key: "lastName",
    label: "Last name",
  },
  {
    key: "firstName",
    label: "First name",
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

const students = computed(() => {
  if (!singleClass) return [];

  return singleClass.value?.students;
});
</script>
