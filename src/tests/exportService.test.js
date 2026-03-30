const exportService = require("../services/exportService");

describe("Export Service", () => {
  it("should have fullExport function", () => {
    expect(typeof exportService.fullExport).toBe("function");
  });

  it("should have incremental export function", () => {
    expect(typeof exportService.exportIncremental).toBe("function");
  });

  it("should have delta export function", () => {
    expect(typeof exportService.exportDelta).toBe("function");
  });

  it("should have watermark function", () => {
    expect(typeof exportService.getWatermark).toBe("function");
  });
});