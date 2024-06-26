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
      <div v-if="isClassLoading" class="mt-7 text-center">
        <ProgressSpinner />
      </div>
      <div v-else-if="isClassError">
        <p>Failed to load class data.</p>
      </div>
      <div v-else>
        <h1 class="text-5xl font-bold mb-3 mt-6">
          {{ singleClass?.className }}
        </h1>
        <p class="mt-4">
          Class code:
          <span class="font-bold">{{ singleClass?.classCode }}</span>
        </p>
        <p class="mt-4">Number of students: {{ singleClass?.studentCount }}</p>

        <h2 class="mt-7 font-bold text-3xl">Submit Test</h2>
        <div class="grid">
          <div class="p-1 col-6">
            <Card class="">
              <template #title>Pre-test</template>
              <template #content>
                <!-- <InlineMessage severity="success">Submitted!</InlineMessage> -->

                <NuxtLink
                  :to="`/classes/${$route.params.id}/fitness-test/${TestType.PRE_TEST}`"
                >
                  <Button label="Start" severity="secondary" />
                </NuxtLink>
              </template>
            </Card>
          </div>
          <div class="p-1 col-6">
            <Card class="">
              <template #title>Post-test</template>
              <template #content>
                <NuxtLink
                  :to="`/classes/${$route.params.id}/fitness-test/${TestType.POST_TEST}`"
                >
                  <Button label="Start" severity="secondary" disabled />
                </NuxtLink>
              </template>
            </Card>
          </div>
        </div>

        <h2 class="mt-7 font-bold text-3xl">Students</h2>
        <Card>
          <template #content>
            <DataTable
              :value="singleClass?.students"
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
import { TestType, type GetClassResponse } from "~/types/common.types";

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
} = await useCustomFetch<GetClassResponse>(
  `/api${apiRoutes.classes.index}/${route.params.id}`
);
</script>
