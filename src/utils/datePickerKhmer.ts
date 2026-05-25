import type { PickerLocale } from "antd/es/date-picker/generatePicker";
import enUS from "antd/es/date-picker/locale/en_US";

export const khmerDatePickerLocale: PickerLocale = {
  ...enUS,

  lang: {
    ...enUS.lang,

    locale: "km-KH",

    placeholder: "ថ្ងៃ/ខែ/ឆ្នាំ",

    rangePlaceholder: [
      "ថ្ងៃចាប់ផ្ដើម",
      "ថ្ងៃបញ្ចប់",
    ],

    today: "ថ្ងៃនេះ",

    now: "ឥឡូវនេះ",

    backToToday: "ត្រឡប់ទៅថ្ងៃនេះ",

    ok: "យល់ព្រម",

    clear: "សម្អាត",

    month: "ខែ",

    year: "ឆ្នាំ",

    timeSelect: "ជ្រើសរើសម៉ោង",

    dateSelect: "ជ្រើសរើសកាលបរិច្ឆេទ",

    monthSelect: "ជ្រើសរើសខែ",

    yearSelect: "ជ្រើសរើសឆ្នាំ",

    decadeSelect: "ជ្រើសរើសទសវត្សរ៍",

    previousMonth: "ខែមុន",

    nextMonth: "ខែបន្ទាប់",

    previousYear: "ឆ្នាំមុន",

    nextYear: "ឆ្នាំបន្ទាប់",
  },
};