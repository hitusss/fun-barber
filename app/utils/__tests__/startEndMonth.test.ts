import { startEndMonth } from "~/utils/index.ts";

describe("startEndMonth", () => {
  it("should correct generate start and end date", () => {
    const { startDate, endDate } = startEndMonth(1);
    expect(startDate.getMonth()).equal(0);
    expect(endDate.getMonth()).equal(0);
    expect(startDate.getDate()).equal(1);
    expect(endDate.getDate()).equal(31);
  });

  it("should correct generate date with custom year", () => {
    const { startDate, endDate } = startEndMonth(1, 2020);
    expect(startDate.getFullYear()).equal(2020);
    expect(endDate.getFullYear()).equal(2020);
  });
});
