import { ZipperTestChoice, type ZipperChoice } from "~/types/common.types";

export const ZIPPER_TEST_CHOICES: ZipperChoice[] = [
  {
    name: ZipperTestChoice.NO_TOUCH,
    points: 0,
  },
  {
    name: ZipperTestChoice.TOUCHED,
    points: 1,
  },
  {
    name: ZipperTestChoice.UP_TO_2,
    points: 2,
  },
  {
    name: ZipperTestChoice.UP_TO_4,
    points: 3,
  },
  {
    name: ZipperTestChoice.UP_TO_7,
    points: 4,
  },
  {
    name: ZipperTestChoice.AT_LEAST_8,
    points: 5,
  },
];

export const BmiClassificationMap = [
  { bottomReading: 0, classification: "Underweight" },
  { bottomReading: 18.5, classification: "Normal" },
  { bottomReading: 25.0, classification: "Overweight" },
  { bottomReading: 30.0, classification: "Obese" },
];
