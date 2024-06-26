import { BmiClassificationMap, ZIPPER_TEST_CHOICES } from "~/constants/common";

export const calculateBMI = (heightInM: number, weightInKg: number) => {
  const bmi = weightInKg / Math.pow(heightInM, 2);
  const bmiRoundedOff = parseFloat(bmi.toFixed(2));

  let classification = BmiClassificationMap[0].classification;

  for (let i = 0; i < BmiClassificationMap.length; i++) {
    if (bmi < BmiClassificationMap[i].bottomReading) {
      classification = BmiClassificationMap[i - 1].classification;
      break;
    }

    if (i === BmiClassificationMap.length - 1) {
      classification =
        BmiClassificationMap[BmiClassificationMap.length - 1].classification;
    }
  }

  return {
    bmi: bmiRoundedOff,
    classification,
  };
};

export const mapZipperPointsToZipperChoice = (points: number) => {
  return ZIPPER_TEST_CHOICES.find((choice) => choice.points === points);
};
