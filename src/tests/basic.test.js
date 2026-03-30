describe("Basic sanity tests", () => {
  it("should pass basic math test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should check string", () => {
    expect("cdc").toContain("c");
  });
});