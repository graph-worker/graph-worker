import { KRequest } from "../KRequest";
describe("KRequest", function () {
    describe("constructor()", function () {
        it.only("should be instance of KRequest", function () {
            expect(new KRequest({})).toBeInstanceOf(KRequest);
        });
    });
});
