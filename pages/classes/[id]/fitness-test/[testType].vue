<template>
  <Container>
    <NuxtLink :to="`/classes/${$route.params.id}`">
      <Button
        class="mt-4"
        severity="secondary"
        icon="pi pi-angle-left"
        label="Back to class"
        size="small"
      />
    </NuxtLink>
    <h1 class="text-5xl font-bold mb-3 mt-6 capitalize">
      {{ currentTestType }} Assessment
    </h1>
    <ProgressSpinner v-if="pending" />
    <Message v-else-if="error" severity="error">
      Error loading test details.
    </Message>
    <div v-else class="max-w-20rem mb-7">
      <div class="my-6">
        <h3 class="text-3xl">BMI</h3>

        <div class="flex flex-column gap-2 my-4">
          <label for="bmi-weight">Weight</label>
          <InputNumber
            input-id="bmi-weight"
            v-model="bmiWeight"
            suffix=" kg"
            aria-describedby="bmi-weight-help"
            :max-fraction-digits="2"
            :min="0"
          />
          <small id="bmi-weight-help">Enter your weight in kg</small>
        </div>
        <div class="flex flex-column gap-2 my-4">
          <label for="bmi-height">Height</label>
          <InputNumber
            input-id="bmi-height"
            v-model="bmiHeight"
            aria-describedby="bmi-height-help"
            suffix=" M"
            :max-fraction-digits="2"
            :min="0"
          />
          <small id="bmi-height-help">Enter your height in meters</small>
        </div>
        <p>
          BMI: <span class="font-bold">{{ bmiResult.bmi }}</span>
        </p>
        <p>
          Reading: <span class="font-bold">{{ bmiResult.classification }}</span>
        </p>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Zipper Test</h3>
        <Dropdown
          v-model="zipperTestResult"
          class="w-full"
          :options="ZIPPER_TEST_CHOICES"
          option-label="name"
          placeholder="select result"
        />
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Sit and Reach</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="sit-and-reach-dist">Distance</label>
          <InputNumber
            input-id="sit-and-reach-dist"
            v-model="sitAndReachDistance"
            aria-describedby="sit-and-reach-dist-help"
            suffix=" cm"
          />
          <small id="sit-and-reach-dist-help">Enter distance in cm</small>
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">3-minute Step Test</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="pulse-beats">Pulse Beats within 10s</label>
          <InputNumber
            input-id="pulse-beats"
            v-model="pulseBeats"
            aria-describedby="pulse-beats-help"
            suffix=" beats"
          />
          <small id="pulse-beats-help">
            Number of pulse beats within 10 seconds
          </small>
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Push-ups</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="pushups">Number of push-ups</label>
          <InputNumber
            input-id="pushups"
            v-model="pushupsCount"
            suffix=" push-ups"
          />
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Basic Plank</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="plank">Seconds held</label>
          <InputMask
            id="plank"
            v-model="plankDuration"
            mask="9:99:99"
            aria-describedby="sprint-help"
            placeholder="H:MM:SS"
          />
          <small id="plank-help">
            Enter number of seconds held during plank
          </small>
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">40-meter Sprint</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="sprint-duration">Sprint Time</label>
          <InputMask
            id="sprint-duration"
            v-model="sprintDuration"
            mask="9:99:99"
            aria-describedby="sprint-help"
            placeholder="H:MM:SS"
          />
          <small id="sprint-help"> Time in h:mm:ss </small>
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Standing Long Jump</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="long-jump">Distance in cm</label>
          <InputNumber
            input-id="long-jump"
            v-model="longJumpDistance"
            aria-describedby="long-jump-help"
            suffix=" cm"
          />
          <small id="long-jump-help">Enter distance in cm</small>
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Hexagon Agility Test</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="hexagon-first">1st Revolution Time</label>
          <InputMask
            id="hexagon-first"
            v-model="hexagonFirstRev"
            mask="9:99:99"
            aria-describedby="hexagon-first-help"
            placeholder="H:MM:SS"
          />
          <small id="hexagon-first-help"> Time in h:mm:ss </small>
        </div>
        <div class="flex flex-column gap-2 my-4">
          <label for="hexagon-second">2nd Revolution Time</label>
          <InputMask
            id="hexagon-second"
            v-model="hexagonSecondRev"
            mask="9:99:99"
            aria-describedby="hexaong-send-help"
            placeholder="H:MM:SS"
          />
          <small id="hexaong-send-help"> Time in h:mm:ss </small>
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Stick Drop Test</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="drop-first">1st Attempt Reading</label>
          <InputNumber
            id="drop-first"
            v-model="dropFirstAttempt"
            aria-describedby="drop-first-help"
          />
          <small id="drop-first-help">Stick reading on 1st attempt</small>
        </div>
        <div class="flex flex-column gap-2 my-4">
          <label for="drop-second">2nd Attempt Reading</label>
          <InputNumber
            id="drop-second"
            v-model="dropSecondAttempt"
            aria-describedby="drop-second-help"
          />
          <small id="drop-second-help">Stick reading on 2nd attempt</small>
        </div>
        <div class="flex flex-column gap-2 my-4">
          <label for="drop-third">3rd Attempt Reading</label>
          <InputNumber
            id="drop-third"
            v-model="dropThirdAttempt"
            aria-describedby="drop-third-help"
          />
          <small id="drop-third-help">Stick reading on 3rd attempt</small>
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Juggling</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="juggling-hits">Number of hits</label>
          <InputNumber
            id="juggling-hits"
            v-model="jugglingHits"
            aria-describedby="juggling-hits-help"
          />
          <small id="juggling-hits-help">Number of times material is hit</small>
        </div>
      </div>

      <div class="my-6">
        <h3 class="text-3xl">Stork Balance Stand Test</h3>
        <div class="flex flex-column gap-2 my-4">
          <label for="balance-left">Left Foot Time</label>
          <InputMask
            id="balance-left"
            v-model="balanceLeft"
            mask="9:99:99"
            aria-describedby="balance-left-help"
            placeholder="H:MM:SS"
          />
          <small id="balance-left-help"> Time in h:mm:ss </small>
        </div>
        <div class="flex flex-column gap-2 my-4">
          <label for="balance-right">Right Foot Time</label>
          <InputMask
            id="balance-right"
            v-model="balanceRight"
            mask="9:99:99"
            aria-describedby="balance-right-help"
            placeholder="H:MM:SS"
          />
          <small id="balance-right-help"> Time in h:mm:ss </small>
        </div>
      </div>

      <div>
        <Button
          class="w-full"
          label="Submit Test Results"
          @click="handleSubmitTest"
          :loading="finalSubmitLoading"
        />
        <Message v-if="finalSubmitError" severity="error">
          Error submitting your test.
        </Message>
      </div>
    </div>
    <Toast position="bottom-right" group="bottom-right" class="mt-7" />
  </Container>
</template>

<script lang="ts" setup>
import { ZIPPER_TEST_CHOICES } from "@/constants/common";
import { apiRoutes } from "~/constants/api";
import {
  TestType,
  type FitnessTest,
  type ZipperChoice,
} from "~/types/common.types";

const { $customFetch } = useNuxtApp();
const userStore = useUserStore();
const route = useRoute();
const toast = useToast();

const currentTestType = mapTestTypeToEnum(route.params.testType as string);

const {
  getOrCreateFitnessTest,
  submitFitnessTest,
  submitTestError,
  submitTestLoading,
  updateFitnessTestAnswers,
  updateTestLoading,
  updateTestError,
} = useFitnessTest();

const finalSubmitError = ref<boolean>(false);
const finalSubmitLoading = ref<boolean>(false);

const zipperTestResult = ref<ZipperChoice>();
const bmiWeight = ref<number>(0);
const bmiHeight = ref<number>(0);
const sitAndReachDistance = ref<number>(0);
const pulseBeats = ref<number>(0);
const pushupsCount = ref<number>(0);
const plankDuration = ref<string>("");
const sprintDuration = ref<string>("");
const longJumpDistance = ref<number>(0);
const hexagonFirstRev = ref<string>("");
const hexagonSecondRev = ref<string>("");
const dropFirstAttempt = ref<number>(0);
const dropSecondAttempt = ref<number>(0);
const dropThirdAttempt = ref<number>(0);
const jugglingHits = ref<number>(0);
const balanceLeft = ref<string>("");
const balanceRight = ref<string>("");

const {
  data: fetchedFitnessTest,
  pending,
  error,
} = await useLazyAsyncData("fitnessTest", async () => {
  const existingTest = await getOrCreateFitnessTest(
    userStore.currentUser!.userId,
    parseInt(route.params.id as string, 10),
    currentTestType
  );
  prefillFields(existingTest);
  return existingTest;
});

const prefillFields = (existingFitnessTest: FitnessTest) => {
  const {
    zipperTestPoints,
    weight,
    height,
    sitAndReachDistanceCm,
    pulseBeatsTenSec,
    pushupsCount: existingPushupsCount,
    plankHoldDuration,
    fortyMeterSprintDuration,
    longJumpDistCm,
    hexTestFirstRev,
    hexTestSecondRev,
    dropTestFirstRead,
    dropTestSecondRead,
    dropTestThirdRead,
    jugglingHits: existingJugglingHits,
    balanceLeft: existingBalanceLeft,
    balanceRight: existingBalanceRight,
  } = existingFitnessTest;

  zipperTestResult.value = mapZipperPointsToZipperChoice(zipperTestPoints ?? 0);
  bmiWeight.value = weight ?? 0;
  bmiHeight.value = height ?? 0;
  sitAndReachDistance.value = sitAndReachDistanceCm ?? 0;
  pulseBeats.value = pulseBeatsTenSec ?? 0;
  pushupsCount.value = existingPushupsCount ?? 0;
  plankDuration.value = plankHoldDuration ?? "";
  sprintDuration.value = fortyMeterSprintDuration ?? "";
  longJumpDistance.value = longJumpDistCm ?? 0;
  hexagonFirstRev.value = hexTestFirstRev ?? "";
  hexagonSecondRev.value = hexTestSecondRev ?? "";
  dropFirstAttempt.value = dropTestFirstRead ?? 0;
  dropSecondAttempt.value = dropTestSecondRead ?? 0;
  dropThirdAttempt.value = dropTestThirdRead ?? 0;
  jugglingHits.value = existingJugglingHits ?? 0;
  balanceLeft.value = existingBalanceLeft ?? "";
  balanceRight.value = existingBalanceRight ?? "";
};

const bmiResult = computed(() => {
  if (!bmiHeight.value || !bmiWeight.value) {
    return {
      bmi: 0,
      classification: "N/A",
    };
  }

  return calculateBMI(bmiHeight.value, bmiWeight.value);
});

const handleSubmitTest = async () => {
  if (!fetchedFitnessTest.value) return;

  finalSubmitLoading.value = true;
  finalSubmitError.value = false;

  const answersPayload = {
    zipperTestPoints: zipperTestResult.value?.points,
    weight: bmiWeight.value,
    height: bmiHeight.value,
    sitAndReachDistanceCm: sitAndReachDistance.value,
    pulseBeatsTenSec: pulseBeats.value,
    pushupsCount: pushupsCount.value,
    plankHoldDuration: plankDuration.value,
    fortyMeterSprintDuration: sprintDuration.value,
    longJumpDistCm: longJumpDistance.value,
    hexTestFirstRev: hexagonFirstRev.value,
    hexTestSecondRev: hexagonSecondRev.value,
    dropTestFirstRead: dropFirstAttempt.value,
    dropTestSecondRead: dropSecondAttempt.value,
    dropTestThirdRead: dropThirdAttempt.value,
    jugglingHits: jugglingHits.value,
    balanceLeft: balanceLeft.value,
    balanceRight: balanceRight.value,
  };

  await updateFitnessTestAnswers(fetchedFitnessTest.value.id, answersPayload);

  if (updateTestError.value) {
    finalSubmitError.value = true;
    finalSubmitLoading.value = false;
    return;
  }

  toast.add({
    severity: "info",
    summary: "Updated test answers.",
    life: 2000,
    group: "bottom-right",
  });

  await submitFitnessTest(fetchedFitnessTest.value.id);
  if (submitTestError.value) {
    finalSubmitError.value = true;
    finalSubmitLoading.value = false;
    return;
  }
  toast.add({
    severity: "success",
    summary: "Successfully submitted",
    detail: `You submitted ${currentTestType} for this class.`,
    life: 6000,
    group: "bottom-right",
  });
  finalSubmitLoading.value = false;
};
</script>
