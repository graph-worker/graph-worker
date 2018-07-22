import { KRequest } from "../KRequest";

describe("KRequest", () => {
  describe("constructor()", () => {
    it.only("should be instance of KRequest", () => {
      expect(new KRequest({} as Request)).toBeInstanceOf(KRequest);
    });
  });
});
